class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable, :recoverable, :rememberable, :trackable, :validatable

  attr_accessible :email, :password, :password_confirmation, :remember_me
  
  after_create :send_invitation
  
  validates :password, :presence => true, :length => {:minimum => 6}, :confirmation => true, :if => :password_required?

  def password_required?
    activated? && (!password.blank?)
  end
  
  # The new user (who to begin with has a dummy password) cannot log in until activated by token.
  
  def active_for_authentication?
    super && activated?
  end
  
  def after_token_authentication
    self.activated = true
    self.save(:validation => false)
  end

protected

  def send_invitation
    self.ensure_authentication_token
    invitation = UserMailer.invitation(self)
    User.transaction do
      invited_at = Time.now
      invitation.deliver
      self.save
    end
  end

end

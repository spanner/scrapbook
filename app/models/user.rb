class User < ActiveRecord::Base
  devise :database_authenticatable, :token_authenticatable, :recoverable, :rememberable, :trackable, :validatable

  has_many :scraps
  has_many :reactions
  has_many :scores, :through => :reactions
  
  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :forename, :surname
  
  after_create :send_invitation
  
  validates :password, :presence => true, :length => {:minimum => 6}, :confirmation => true, :if => :password_required?

  def password_required?
    activated? && (!password.blank?)
  end
  
  # The new user (who to begin with has a dummy password) cannot log in until activated by token.
  
  def activate!
    self.activated = true
    self.save(:validation => false)
  end
  
  def active_for_authentication?
    super && activated?
  end
  
  def after_token_authentication
    activate!
  end
  
  def name
    "#{forename} #{surname}"
  end
  
  def reaction_to(scrap)
    reactions.to_scrap(scrap)
  end
  
  def passive_observer?
    observer? && !admin?
  end
  
  def can_edit?(scrap)
    admin? || scrap.user == self
  end

  # Current user is pushed into here to make it available in models,
  # most pertinently the UserActionObserver that sets ownership before save.
  #
  def self.current
    Thread.current[:user]
  end
  
  def self.current=(user)
    Thread.current[:user] = user
  end

  def self.for_selection
    self.all.map{|u| [u.name, u.id] }
  end
  
  def as_json(options={})
    {
      :name => name,
      :email => email
    }
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

  # once the user succeeds in setting a password, the authentication token can be deleted
  # to make login possible only with their email and password.
  
  def clear_authentication_token_if_password_set
    if self.authentication_token && !self.encrypted_password.blank?
      authentication_token = nil
    end
  end

end

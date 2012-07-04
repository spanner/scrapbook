class Reaction < ActiveRecord::Base
  belongs_to :user
  belongs_to :scrap
  has_many :scores
  
  attr_accessible :scrap, :scores_attributes
  accepts_nested_attributes_for :scores

  before_save :record_creator
  before_update :record_updater

  scope :to_scrap, lambda { |scrap|
    where ["reactions.scrap_id = ?", scrap.id]
  }

  scope :from_user, lambda {|user|
    where ["reactions.user_id = ?", user.id]
  }
  
  def score_for(scale)
    scale = Scale.find_by_name(scale) unless scale.is_a? Scale
    if score = self.scores.on_scale(scale).first
      score.value
    else
      "?"
    end
  end
  
  def as_json(options={})
    json = {
      :size => 1
    }
    scores.each do |sc|
      json[sc.scale.name] = sc.value
    end
    json
  end

protected

  def record_creator
    self.user ||= User.current
  end

  def record_updater
    self.updated_by ||= User.current
  end

end



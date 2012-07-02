class Reaction < ActiveRecord::Base
  belongs_to_owners
  belongs_to :scrap
  has_many :scores
  
  attr_accessible :scrap
  
  scope :to_scrap, lambda {|scrap|
    where ["reactions.scrap_id = ?", scrap.id]
  }

  scope :by_user, lambda {|user|
    where ["reactions.created_by_id = ?", user.id]
  }
  
  def as_json(options={})
    x = scores.on_scale('')
    y = scores.on_scale('')
    {
      :x =>
      :y =>
    }
  end
end

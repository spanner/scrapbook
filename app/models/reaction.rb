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
  
  default_scope includes(:scores)
  
  def as_json(options={})
    
    json = {
      :size => 1
    }
    scores.each do |sc|
      json[sc.scale.name] = sc.value
    end
    json

  end
end



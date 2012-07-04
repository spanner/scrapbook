class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :scraps, :through => :taggings
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('tags.name like ?', fragment)
  }
  
end

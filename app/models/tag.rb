class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :scraps, :through => :taggings
  attr_accessible :name
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('tags.name like ?', fragment)
  }
  scope :in_use, joins("INNER JOIN taggings ON taggings.tag_id = tags.id").group('tags.id').having('count(taggings.tag_id) > 0')
  
end

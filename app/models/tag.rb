class Tag < ActiveRecord::Base

  belongs_to_owners
  has_many :taggings
  has_many :scraps, :through => :taggings

end

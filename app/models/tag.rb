class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :scraps, :through => :taggings
end

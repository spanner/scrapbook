class Scrap < ActiveRecord::Base

  has_owners
  has_upload :image
  has_many :taggings
  has_many :tags, :through => :taggings

end

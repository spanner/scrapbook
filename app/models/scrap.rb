class Scrap < ActiveRecord::Base

  has_owners
  has_upload :image, :geometry => "960x720#",
  has_many :taggings
  has_many :tags, :through => :taggings

end

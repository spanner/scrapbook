class Scrap < ActiveRecord::Base

  belongs_to_owners
  has_upload :image, :geometry => "960x720#"
  has_many :taggings
  has_many :tags, :through => :taggings

  attr_accessible :name, :body, :image

end

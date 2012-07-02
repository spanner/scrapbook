class Scrap < ActiveRecord::Base
  belongs_to_owners
  has_upload :image, :geometry => "960x720#"
  has_many :reactions
  has_many :scores, :through => :reactions
  has_many :taggings
  has_many :tags, :through => :taggings
  scope :with_associations, includes(:tags, :reactions)

  attr_accessible :name, :body, :image
end

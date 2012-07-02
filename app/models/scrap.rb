class Scrap < ActiveRecord::Base
  belongs_to_owners
  has_many :reactions
  has_many :scores, :through => :reactions
  has_many :taggings
  has_many :tags, :through => :taggings
  has_upload :image, 
             :geometry => "960x720#", 
             :styles => {
               :icon => "48x48#",
               :thumb => "100x100#",
               :list => "230x174#"
             }

  attr_accessible :name, :body, :image
  
  def type
    if image?
      'image'
    elsif body.length < 48
      'word'
    elsif body.length < 400
      'phrase'
    elsif body.length < 800
      'paragraph'
    else
      'text'
    end
  end
end

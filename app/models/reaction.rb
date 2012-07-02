class Reaction < ActiveRecord::Base
  belongs_to_owners
  belongs_to :scrap
  has_many :scores
  
  attr_accessible :scrap
end

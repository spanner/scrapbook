class Tagging < ActiveRecord::Base
  # attr_accessible :title, :body
  belongs_to :tag
  belongs_to :scrap
  
  accepts_nested_attributes_for :tag, :reject_if => :all_blank
  
end

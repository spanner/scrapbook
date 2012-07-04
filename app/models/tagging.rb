class Tagging < ActiveRecord::Base
  belongs_to :user
  belongs_to :tag
  belongs_to :scrap
  attr_accessible :tag_id, :scrap_id, :tag_attributes
  accepts_nested_attributes_for :tag, :reject_if => :all_blank
end

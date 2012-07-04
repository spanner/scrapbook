class Tagging < ActiveRecord::Base
  belongs_to :user
  belongs_to :tag
  belongs_to :scrap
  attr_accessible :tag_id, :scrap_id
end

class Score < ActiveRecord::Base
  belongs_to :scale
  belongs_to :reaction
  
  attr_accessible :scale, :value
end

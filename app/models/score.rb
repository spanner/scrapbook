class Score < ActiveRecord::Base
  belongs_to :scale
  belongs_to :reaction
  
  attr_accessible :scale_id, :scale, :value
  
  scope :on_scale, lambda {|scale|
    where ["scores.scale_id = ?", scale.id]
  }
  
end

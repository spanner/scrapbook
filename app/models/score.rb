class Score < ActiveRecord::Base
  belongs_to :scale
  belongs_to :reaction
end

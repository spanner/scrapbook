class Tag < ActiveRecord::Base
  has_many :taggings
  has_many :scraps, :through => :taggings
  attr_accessible :name
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('tags.name like ?', fragment)
  }
  
  scope :in_use, joins("INNER JOIN taggings ON taggings.tag_id = tags.id").group('tags.id').having('count(taggings.tag_id) > 0')
  
  ## Clouds
  #
  # The administrative interface offers a big tag cloud and drag and drop tag-merging. Tag size in the
  # cloud is based on a usage count that is retrieved here in a join with the taggings table. The cloud
  # display logic can be found in the [application_helper](../controllers/application_helper.html).
  #
  attr_accessor :cloud_size
  scope :with_usage_count, lambda { |limit|
    select("tags.*, count(tt.id) AS weight").joins("INNER JOIN taggings as tt ON tt.tag_id = tags.id").group("tt.tag_id").order("weight DESC").limit(limit)
  }

  # *self.for_cloud* uses that scope to return a list of the most popular tags, weighted for display as a tag cloud
  # and re-sorted into alphabetical order (since to select the most popular we originally had to sort by weighting).
  #
  def self.for_cloud(limit=100)
    with_usage_count(limit).sort_by(&:name)
  end

  # This is here just to make tag interpolation a bit more readable.
  #
  def to_s
    name
  end
  
end

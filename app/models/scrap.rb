class Scrap < ActiveRecord::Base
  belongs_to :user
  has_many :reactions
  has_many :scores, :through => :reactions
  has_many :taggings, :dependent => :destroy
  has_many :tags, :through => :taggings, :uniq => true
  has_upload :image, 
             :geometry => "960x720#",
             :styles => {
               :icon => "48x48#",
               :thumb => "100x100#",
               :list => "230x174#"
             }

  attr_accessor :scrap_type
  attr_accessible :user_id, :name, :body, :image, :image_offset_left, :image_offset_top, :image_upload_id, :image_scale_width, :image_scale_height, :description, :scrap_type, :taggings_attributes, :tags_attributes
  accepts_nested_attributes_for :tags, :allow_destroy => true, :reject_if => :all_blank
  accepts_nested_attributes_for :taggings, :allow_destroy => true, :reject_if => :all_blank
  
  scope :with_reactions, select("scraps.*").joins("LEFT OUTER JOIN reactions on reactions.scrap_id = scraps.id").group("scraps.id").having("count(reactions.scrap_id) > 0")
  
  before_save :record_creator
  before_save :combine_texts
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('scraps.combined_text like ?', fragment)
  }
  
  scope :tagged_with, lambda { |tag|
    tag = Tag.find_by_name(tag) unless tag.is_a?(Tag)
    select("scraps.*").joins("INNER JOIN taggings as tt on tt.scrap_id = scraps.id").where(["tt.tag_id = ?", tag]) if tag
  }

  # The *tagged_with_any_of* scope is a join on the taggings table that returns every scrap tagged with any of the given tags.
  #
  scope :tagged_with_any_of, lambda { |tags|
    placeholders = tags.map{'?'}.join(',')
    select("scraps.*").joins("INNER JOIN taggings as tt on tt.scrap_id = scraps.id").where(["tt.tag_id in(#{placeholders})"] + tags.map(&:id)).group("scraps.id").order("count(tt.id) DESC")
  }

  # The *tagged_with_all_of* scope is a join on the taggings table that returns every scrap tagged with all of the given tags.
  # It does this with an extra `having` clause requiring that the number of tagging records should equal the number of tags specified,
  # so it's possible to be wrong if we are tagged many times with the same tag, but that shouldn't happen.
  #
  scope :tagged_with_all_of, lambda { |tags|
    placeholders = tags.map{'?'}.join(',')
    tag_count = tags.size
    select("scraps.*").joins("INNER JOIN taggings as tt on tt.scrap_id = scraps.id").where(["tt.tag_id in(#{placeholders})"] + tags.map(&:id)).group("scraps.id").having("count(tt.id) = #{tag_count}")
  }

  def average_score_for(scale)
    scale = Scale.find_by_name(scale) unless scale.is_a? Scale
    scores = self.scores.on_scale(scale)
    total = 0
    unless scores.empty?
      count = scores.count
      scores.each do |score|
        unless score.value == nil 
          total += score.value
        else
          count -= 1
        end
      end
      unless count == 0
        (total/count).round(3)
      else
        "none yet"
      end
    else
      "none yet"
    end
  end

  def as_json(options={})
    count = reactions.count
    json = {
      :size => count,
      :name => name,
      :id => id
    }
    scores.each do |score|
      unless json[score.scale.name]
        json[score.scale.name] = score.value/count
      else
        json[score.scale.name] += score.value/count
      end
    end
    json
  end
  
  def type
    if image?
      'image'
    elsif body.length < 48
      'word'
    elsif body.length < 320
      'phrase'
    elsif body.length < 800
      'paragraph'
    else
      'text'
    end
  end
  
  def text_size
    if l = body.length
      ((600.0/(l+100.0)) + 0.25) / 1.5
    else
      1
    end
  end
  

protected

  def record_creator
    self.user ||= User.current
  end
  
  def combine_texts
    texts = [name, body, image_file_name] + tags.map(&:name)
    self.combined_text = texts.join(' ').searchable
  end

end

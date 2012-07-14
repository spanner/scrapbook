class Scrap < ActiveRecord::Base
  belongs_to :user
  has_many :reactions
  has_many :scores, :through => :reactions
  has_many :taggings
  has_many :tags, :through => :taggings
  has_upload :image, 
             :geometry => "960x720#",
             :styles => {
               :icon => "48x48#",
               :thumb => "100x100#",
               :list => "230x174#",
               :precrop => "1600x1200^"
             }

  attr_accessor :scrap_type
  attr_accessible :user_id, :name, :body, :image, :image_offset_left, :image_offset_top, :image_upload_id, :image_scale_width, :image_scale_height, :description, :scrap_type
  
  scope :with_reactions, select("scraps.*").joins("LEFT OUTER JOIN reactions on reactions.scrap_id = scraps.id").group("scraps.id").having("count(reactions.scrap_id) > 0")
  
  before_save :record_creator
  before_save :combine_texts
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('scraps.combined_text like ?', fragment)
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
    scores.compact.each do |score|
      unless json[score.scale.name]
        json[score.scale.name] = score.value/count
      else
        json[score.scale.name] += score.value/count
      end
    end
    json
  end
  
  # This will get more complicated
  def type
    if new_record? || image?
      'image'
    else
      'text'
    end
  end
  
  def wordiness
    if body.length < 48
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
  
  def as_json(options={})
    {
      :id => id,
      :name => name,
      :type => type,
      :wordiness => wordiness,
      :text => body,
      :thumb => image.url(:thumb),
      :image => image.url(:cropped),
      :user => user.as_json(options),
    }
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

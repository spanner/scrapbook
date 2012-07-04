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
               :list => "230x174#"
             }
             
  before_save :gather_text

  attr_accessor :scrap_type
  attr_accessible :name, :body, :image, :image_offset_left, :image_offset_top, :image_upload_id, :image_scale_width, :image_scale_height, :description, :scrap_type
  
  scope :with_reactions, select("scraps.*").joins("INNER JOIN reactions on reactions.scrap_id = scraps.id").having("count(reactions.scrap_id) > 0")
  
  before_save :record_creator
  before_update :record_updater
  default_scope includes(:reactions)
  
  scope :matching, lambda { |fragment| 
    fragment = "%#{fragment}%"
    where('scraps.body like :frag OR scraps.name like :frag', :frag => fragment)
  }
  
  scope :tagged_with_all_of, lambda { |tags|
    placeholders = tags.map{'?'}.join(',')
    tag_count = tags.size
    select("scraps.*").joins("INNER JOIN taggings as tt on tt.scrap_id = scraps.id").where(["tt.tag_id in(#{placeholders})"] + tags.map(&:id)).group("scraps.id").having("count(tt.id) = #{tag_count}")
  }
  
  def gather_text
    texts = [name, body, description] + tags.map(&:name)
    self.combined_text = texts.join(' ').searchable
  end

  def average_score_for(scale)
    scale = Scale.find_by_name(scale) unless scale.is_a? Scale
    scores = self.scores.on_scale(scale)
    scores.to_a.mean if scores.any?
  end

  def as_json(options={})
    count = reactions.count
    json = {
      :size => count,
      :name => name
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
    self.created_by ||= User.current
  end

  def record_updater
    self.updated_by ||= User.current
  end

end

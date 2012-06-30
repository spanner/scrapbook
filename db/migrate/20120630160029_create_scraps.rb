class CreateScraps < ActiveRecord::Migration
  def change
    create_table :scraps do |t|
      t.string :name
      t.string :youtube_id
      t.text :body
      t.integer :scrap_type_id
      t.has_upload :image
      t.timestamps
    end
  end
end

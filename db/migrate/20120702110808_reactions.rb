class Reactions < ActiveRecord::Migration
  def change
    create_table :reactions do |t|
      t.integer :user_id
      t.integer :scrap_id
      t.timestamps
    end
    
    create_table :scales do |t|
      t.string :name
      t.integer :max
      t.integer :min
      t.string :max_label
      t.string :min_label
      t.timestamps
    end

    create_table :scores do |t|
      t.integer :reaction_id
      t.integer :scale_id
      t.float :value
      t.timestamps
    end
  end
end

class TaggingsOwned < ActiveRecord::Migration
  def change
    add_column :taggings, :user_id, :integer
    rename_column :scraps, :created_by_id, :user_id
    rename_column :reactions, :created_by_id, :user_id
  end
end

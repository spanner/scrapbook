class Owners < ActiveRecord::Migration
  def change
    remove_column :scraps, :scrap_type_id
    add_column :scraps, :created_by_id, :integer
    add_column :scraps, :updated_by_id, :integer
  end
end

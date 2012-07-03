class ScrapDescription < ActiveRecord::Migration
  def change
    add_column :scraps, :description, :text
  end
end

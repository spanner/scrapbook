class CombineScrapText < ActiveRecord::Migration
  def change
    add_column :scraps, :combined_text, :string
  end
end

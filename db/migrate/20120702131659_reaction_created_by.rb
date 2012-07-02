class ReactionCreatedBy < ActiveRecord::Migration
  def change
    rename_column :reactions, :user_id, :created_by_id
  end
end

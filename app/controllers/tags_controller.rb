class TagsController < ApplicationController
  respond_to :html
  before_filter :require_admin!, :except => [:index]
  
  def admin
    @tags = Tag.for_cloud
    respond_with(@tags)
  end

  def merge
    @tag = Tag.find(params[:id])
    if params[:other_tag_id]
      @merged_tag = Tag.find(params[:other_tag_id])
      @tag.assimilate(@merged_tag) if @merged_tag
      render :nothing => true
    else
      # probably here we do nothing
    end
  end

end
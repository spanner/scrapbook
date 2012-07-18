class TaggingsController < ApplicationController
  respond_to :js
  before_filter :authenticate_user!
  
  def new
    @scrap = Scrap.find_by_id(params[:scrap_id]) || Scrap.new     # doesn't really matter: we only need the scrap object for building form fields
    @tag = Tag.find_or_create_by_name((params[:tag] || "").titlecase)
    render :partial => 'taggings/fields'
  end

end
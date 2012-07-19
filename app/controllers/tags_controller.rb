class TagsController < ApplicationController
  respond_to :html
  before_filter :require_admin!, :except => [:index]
  
  def index
    @tags = Tag.for_cloud
    respond_with(@tags)
  end

end
class ReactionsController < ApplicationController
  respond_to :html, :js, :json
  
  before_filter :get_reactions, :only => [:index]
  
  def index
    respond_with @scraps
  end
  
protected

  def get_reactions
    @reactions = Reaction.all
    @scraps = Scrap.with_reactions
  end
  
end

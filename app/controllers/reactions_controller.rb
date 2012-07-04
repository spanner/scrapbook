class ReactionsController < ScrapbookController
  respond_to :html, :js, :json
  
  before_filter :get_all_reactions, :only => [:index]
  before_filter :build_reaction, :only => [:new, :create]
  before_filter :set_reaction, :only => [:update, :create]
  
  def index
    respond_with @scraps
  end
  
  def create
    @scrap = @reaction.scrap
    respond_with @reaction do |format|
      format.js { render :partial => 'reactions/react' }
    end
  end
  
protected

  def get_all_reactions
    @scraps = Scrap.with_reactions
  end
  
  def build_reaction
    @scrap = Scrap.find(params[:scrap_id])
    @reaction = @scrap.reactions.build
  end

  def set_reaction
    @reaction.update_attributes(params[:reaction])
  end

end
class SuggestionsController < ApplicationController
  respond_to :json
  
  def index
    fragment = params[:term]
    suggestions = Tag.matching(fragment).in_use.limit(10)
    render :json => suggestions.map { |suggestion| {
      :type => suggestion.class.to_s.downcase,
      :text => suggestion.name
    }}.to_json
  end

end
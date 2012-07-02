class ScrapsController < ApplicationController

  before_filter :authenticate_user!
  before_filter :find_scraps, :only => [:index]
  before_filter :get_scrap, :only => [:show, :edit, :update, :destroy]
  before_filter :build_scrap, :only => [:new, :create]
  before_filter :update_scrap, :only => [:create, :update]

  def index
    respond_with(@scraps) do |format|
      format.js { render :partial => 'search_results' }
    end
  end

  def show
    respond_with(@scrap)
  end

  def edit
    respond_with(@scrap)
  end

  def update
    respond_with(@scrap)
  end

protected

  def find_scraps
    sorts = {
      :name => 'ASC',
      :date => 'DESC',
      :updated_at => 'DESC',
      :created_at => 'DESC',
      :published_at => 'DESC'
    }
    @by = params[:by] || 'date'
    @by = 'date' unless sorts[@by.to_sym]
    @order = params[:order] || sorts[@by.to_sym] || 'ASC'
    
    @scraps = Scrap.order("scraps.#{@by} #{@order}")
    @tags = [params[:tag]].flatten.map{|t| Tag.find_by_id(t) }.compact
    @fragments = []

    unless params[:q].blank?
      [params[:q]].flatten.reject(&:blank?).each do |fragment|
        if institution = Institution.find_by_name(fragment)
          @institutions.push(institution)
        elsif tag = Tag.find_by_name(fragment)
          @tags.push(tag)
        else
          @fragments += fragment.split(/\s+/)
        end
      end
    end

    @rejected_fragments = @fragments.select {|frag| STOPWORDS.include?(frag) }
    @fragments = (@fragments - @rejected_fragments).compact.uniq
    @scraps = @scraps.tagged_with_all_of(@tags) if @tags.any?
    @fragments.each { |frag| @scraps = @scraps.matching(frag) }

    # used in facet display
    @criteria = (@tags + @institutions).sort_by(&:name)

    @show = params[:show] || 20
    @page = params[:page] || 1
    @scraps = @scraps.with_associations.page(@page).per(@show) unless @show == 'all'
  end

  def get_scrap
    @scrap = scrap.find(params[:id])
  end

  def build_scrap
    @scrap = scrap.new
  end
  
  def update_scrap
    @scrap.update_attributes(params[:scrap])
  end

end

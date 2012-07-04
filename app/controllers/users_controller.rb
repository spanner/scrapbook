class UsersController < ApplicationController
  respond_to :html
  before_filter :authenticate_user!
  before_filter :get_user, :except => [:new, :create]
  before_filter :build_user, :only => [:new, :create]
  before_filter :confine_to_self, :except => [:new, :create]
  before_filter :update_user, :only => [:update, :create]
  
  def show
    respond_with @user
  end

  def edit
    respond_with @user
  end

  def update
    respond_with @user, :location => root_url
  end

  def new
    respond_with @user
  end

  def create
    if @user.valid?
      flash[:notice] = "#{@user.name} has been invited"
    end
    respond_with @user, :location => root_url
  end
  
  def welcome
    respond_with current_user
  end

protected

  def build_user
    @user = User.new
  end

  def get_user
    @user = User.find(params[:id])
  end
  
  def confine_to_self
    @user = current_user unless current_user.admin?
  end
  
  def update_user
    @user.update_attributes(params[:user])
  end

end

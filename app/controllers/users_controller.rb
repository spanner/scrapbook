class UsersController < ApplicationController
  respond_to :html
  before_filter :authenticate_user!
  before_filter :get_user
  before_filter :remember_token_auth
  before_filter :confine_to_self
  
  def show
    respond_with @user
  end

  def edit
    respond_with @user
  end

  def update
    respond_with @user, :location => root
  end

protected

  def remember_token_auth
    if params[:auth_token] && user_signed_in?
      current_user.remember_me = true 
      sign_in current_user
    end
  end

  def get_user
    @user = User.find(params[:id])
  end
  
  def confine_to_self
    @user = current_user unless current_user.admin?
  end

end

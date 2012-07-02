class UsersController < ApplicationController
  respond_to :html
  before_filter :get_user
  
  def show
    respond_with(@user)
  end

  def edit
    respond_with(@user)
  end

  def update
    respond_with(@user)
  end

protected

  def get_user
    @user = User.find(params[:id])
  end
  
end

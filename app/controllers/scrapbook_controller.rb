class ScrapbookController < ApplicationController
  respond_to :html, :js, :json
  
  before_filter :authenticate_user!
  before_filter :notice_user

protected

  def notice_user
    User.current = current_user
  end
  
  def require_active_user
    render :text => "Not Allowed!", :status => :forbidden if current_user.passive_observer?
  end

end

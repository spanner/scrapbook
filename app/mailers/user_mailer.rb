class UserMailer < ActionMailer::Base
  default from: "will@spanner.org"
  layout 'email'
  
  def invitation(user)
    @user = user
    @url  = welcome_user_url(@user, :auth_token => @user.authentication_token)
    mail(:to => "'#{@user.forename} #{@user.surname}' <#{@user.email}>", :subject => "Scrapbook!") do |format|
      format.text
      format.html
    end
  end
end





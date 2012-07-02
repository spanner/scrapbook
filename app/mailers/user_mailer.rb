class UserMailer < ActionMailer::Base
  default from: "mike@spanner.org"
  
  def invitation(user)
    @user = user
    @url  = "http://scrapbook.dev/login"
    mail(:to => "#{@user.name} <#{@user.email}>", :subject => "Welcome to My Awesome Site") do |format|
      format.text
      format.html
    end
  end
end





# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).

#will = User.create(:email => 'will@spanner.org', :forename => "Will", :surname => "Ross", :password => "foobar", :password_confirmation => "foobar", :admin => true, :activated => true)
mike = User.create(:email => 'mike@spanner.org', :forename => "Mike", :surname => "McIver", :password => "foobar", :password_confirmation => "foobar") do |u|
  u.activate!
end

jim = User.create(:email => 'jim@spanner.org', :forename => "Jim", :surname => "McIver", :password => "foobar", :password_confirmation => "foobar") do |u|
  u.activate!
end

text_scrap = Scrap.create(:name => 'text scrap', :body => "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.")
word_scrap = Scrap.create(:name => 'word scrap', :body => "Shakespeherian Rag")

upload = Upload.create(:file => File.new(Rails.root + 'app/assets/images/hunters.jpg'))
picture_scrap = Scrap.create(:name => 'picture scrap', :body => "Is this allowed a caption?")
picture_scrap.image_upload = upload
picture_scrap.image_scale_width = 960
picture_scrap.save

likeness = Scale.new do |s| 
  s.name = "affection"
  s.max = 10
  s.min = -10
  s.max_label = "Like"
  s.min_label = "Dislike"
  s.save
end

usness = Scale.new do |s| 
  s.name = "usness"
  s.max = 10
  s.min = -10
  s.max_label = "Us"
  s.min_label = "Not us"
  s.save
end

picture_scrap.reactions.build do |r|
  r.created_by = mike
  r.scores.build(:scale => likeness, :value => -5)
  r.scores.build(:scale => usness, :value => 5)
  r.save
end

picture_scrap.reactions.build do |r|
  r.created_by = jim
  r.scores.build(:scale => likeness, :value => 8)
  r.scores.build(:scale => usness, :value => 6)
  r.save
end

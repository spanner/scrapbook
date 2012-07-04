source 'https://rubygems.org'

gem 'rails', '3.2.6'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'mysql2'

# Devise for user authentication and Cancan for role-assignment.
gem 'devise'
gem 'devise-encryptable'

# Paperclip handles all our asset attachments. `cropped_paperclip` extends it greatly to 
# give us a generalised asset-upload interface.
gem "paperclip", "~> 3.0"
gem "cropped_paperclip", :git => "git://github.com/spanner/cropper.git"

# youtube_it will add some API integration to make adding a video more pleasant.
#gem "youtube_it"

# Kaminari for minimal pagination
gem 'kaminari', '~> 0.13'

# Haml for templates, instead of erb.
gem "haml-rails"
gem 'jquery-rails'
gem 'json'

# Redcarpet is a markdown parser and rocco generates our documentation.
gem 'redcarpet'
gem 'rocco'

# Asset-handling gems are not required in production because we precompile on deployment.
group :assets do
  # Sass > CSS
  gem 'sass-rails', '~> 3.2.3'
  # Coffee > Javascript
  gem 'coffee-rails', '~> 3.2.1'
  # and compass is the lazy designer's friend
  gem 'compass-rails'
  # uglifier for minification.
  gem 'uglifier', '>= 1.0.3'
  # and execjs for server side precompilation of coffeescript
  gem 'execjs'
  gem 'therubyracer'
end

# And a fairly bulky test framework:
group :development, :test do
  # `rspec` is our main test runner.
  gem "rspec-rails"
  # `shoulda` adds some nice readable matchers.
  gem 'shoulda-matchers'
  # `factory_girl` provides fixtures in a fairly clean way.
  gem "factory_girl_rails", "~> 2.0"
  # `Capybara` is our headless web client for integration testing.
  gem "capybara"
  # And `ap` is useful enough in debugging that we tolerate the name.
  gem "awesome_print"
  # watchr and spork give us realtime test updates
  gem 'watchr'
  gem 'spork', '~> 0.9.0.rc'
end

# Capistrano is our deployment engine. For scalable AWS we will eventually move to `rubber`, which can also spin up new instances.
gem 'capistrano'
# and rvm gives us a known server-side ruby version.
gem 'rvm-capistrano'

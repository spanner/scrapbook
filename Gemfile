source 'https://rubygems.org'

gem 'rails', '3.2.6'

# Bundle edge Rails instead:
# gem 'rails', :git => 'git://github.com/rails/rails.git'

gem 'sqlite3'
gem 'mysql2'

# Devise for user authentication and Cancan for role-assignment.
gem 'devise'
gem 'devise-encryptable'

# Paperclip handles all our asset attachments. `cropped_paperclip` extends it greatly to 
# give us a generalised asset-upload interface.
gem "paperclip", "~> 3.0"
gem "cropped_paperclip", :git => "git://github.com/spanner/cropper.git"

# Kaminari for minimal pagination
gem 'kaminari', '~> 0.13'

# Haml for templates, instead of erb.
gem "haml-rails"
#... with inline coffeescript for passing bootstrap data to backbone
gem "coffee-filter"

# Gems used only for assets and not required
# in production environments by default.
group :assets do
  gem 'sass-rails',   '~> 3.2.3'
  gem 'coffee-rails', '~> 3.2.1'

  # See https://github.com/sstephenson/execjs#readme for more supported runtimes
  # gem 'therubyracer', :platforms => :ruby

  gem 'uglifier', '>= 1.0.3'
end

gem 'jquery-rails'
gem 'json'

# Redcarpet is a markdown parser and rocco generates our documentation.
gem 'redcarpet'
gem 'rocco'
gem 'haml_coffee_assets'


# Asset-handling gems are not required in production because we precompile on deployment.
group :assets do
  # Sass > CSS
  gem 'sass-rails', '~> 3.2.3'
  # Coffee > Javascript
  gem 'coffee-rails', '~> 3.2.1'
  # and compass is the lazy designer's friend
  gem 'compass-rails'
  # javascript runtime on the server side for compiling coffeescript.
  gem 'therubyracer'
  # uglifier for minification.
  gem 'uglifier', '>= 1.0.3'
  # and execjs for server side precompilation of coffeescript
  gem 'execjs'
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


# Note to self: installing nokogiri on lion
# 1. source install of libiconv into homebrew build directory:
#   ./configure --prefix=/usr/local/Cellar/libiconv/1.13.1 & make & make install
# 2. link nokogiri to homebrew directories:
#   gem install nokogiri -- --with-xml2-include=/usr/local/Cellar/libxml2/2.7.8/include/libxml2 --with-xml2-lib=/usr/local/Cellar/libxml2/2.7.8/lib --with-xslt-dir=/usr/local/Cellar/libxslt/1.1.26 --with-iconv-dir=/usr/local/Cellar/libiconv/1.13.1
#
# Must use similar arguments for libxml-ruby if using that. test_xml goes through nokogiri so no need.

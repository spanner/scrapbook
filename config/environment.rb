# Load the rails application
require File.expand_path('../application', __FILE__)

# Load monkeypatches and extensions from /lib
require "scrapbook"

# Initialize the rails application
Scrapbook::Application.initialize!

require "bundler/capistrano"
require "rvm/capistrano"

set :user, 'spanner'
set :group, 'spanner'

set :rvm_type, :system 
set :rvm_ruby_string, '1.9.3'

set :application, "scrapbook"
set :repository,  "git@github.com:spanner/scrapbook.git"
set :deploy_to, "/var/www/scrapbook"
set :rails_env, "production"

set :scm, :git
ssh_options[:forward_agent] = true
set :deploy_via, :remote_cache
default_run_options[:pty] = true

role :web, "bluebottle.spanner.org"
role :app, "bluebottle.spanner.org"
role :db,  "bluebottle.spanner.org"

# if you want to clean up old releases on each deploy uncomment this:
# after "deploy:restart", "deploy:cleanup"

namespace :deploy do
  task :start do ; end
  task :stop do ; end
  task :restart, :roles => :app, :except => { :no_release => true } do
    run "#{try_sudo} touch #{File.join(current_path,'tmp','restart.txt')}"
  end
end

namespace :filing do
  task :create_symlink, :roles => :app do
    run "ln -s #{shared_path}/config/database.yml #{current_release}/config/database.yml" 
  end
end

before "deploy:assets:precompile", "filing:create_symlink"

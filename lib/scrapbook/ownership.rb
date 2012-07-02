module Scrapbook
  module Ownership
    def self.included(base)
      base.class_eval {
        extend ClassMethods
      }
    end

    module ClassMethods
      def belongs_to_owners(options={})
        options.reverse_merge!(:observe => true)
        belongs_to :created_by, :class_name => 'User'
        belongs_to :updated_by, :class_name => 'User'
        User.send :has_many, self.to_s.underscore.pluralize.intern, :foreign_key => "created_by_id"
        User.send :has_many, "updated_#{self.to_s.underscore.pluralize}".intern, :class_name => 'Message', :foreign_key => "updated_by_id"
        UserActionObserver.observe(self)
        include InstanceMethods
      end
    end

    module InstanceMethods
      def owner
        created_by
      end

      def updater
        updated_by
      end
    end
  end
end

ActiveRecord::Base.send :include, Scrapbook::Ownership
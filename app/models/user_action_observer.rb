class UserActionObserver < ActiveRecord::Observer
  def before_create(model)
    model.created_by = User.current
  end
  
  def before_update(model)
    model.updated_by = User.current
  end
  
  # We block the presumed mapping from this class name to a UserAction class, since there is none.
  class << self
    def observed_class
      nil
    end
  end
end

# This is a dumb but useful template mechanism. We use it in the API tests
# to substitute current values for awkward variables like image address, revision
# number and anything else that is local, transient or test-specific.
#
class String
  
  # *with_placeholders* is called with a hash of string => replacement pairs. Each key is replaced
  # (globally) with the associated value. 
  #
  #   "string".translate_placeholders(:this => 'that')
  #
  # will replace every instance of `{{this}}` with `that`.
  #
  def with_placeholders(values={})
    string = self.dup
    values.each_pair do |placeholder, value|
      string.gsub!(/\{\{#{placeholder.to_s}\}\}/, value.to_s)
    end
    string
  end
end

class NilClass
  def empty?
    true
  end
end

class Array
  def sum
    inject(nil) { |sum,x| sum ? sum + x.to_f : x.to_f }
  end

  def mean
    sum / size
  end
end
  
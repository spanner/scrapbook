module ApplicationHelper

  # This will apply cloud-weighting to any list of items.
  # They must have a 'weight' attribute
  # and be ready to accept a 'cloud_size' attribute.
  
  def cloud(these, threshold=0, biggest=3.0, smallest=1.3)
    counts = these.map{|t| t.weight.to_i}.compact
    if counts.any?
      max = counts.max
      min = counts.min
      if max == min
        these.each do |this|
          this.cloud_size = sprintf("%.2f", biggest/2 + smallest/2)
        end
      else
        steepness = Math.log(max - (min-1))/(biggest - smallest)
        these.each do |this|
          offset = Math.log(this.weight.to_i - (min-1))/steepness
          this.cloud_size = sprintf("%.2f", smallest + offset)
        end
      end
      if block_given?
        these.each do |this|
          yield this
        end
      end
    end
  end

end

# = require g.raphael
# = require g.dott
#= require_self

jQuery ($) ->

  $.fn.minichart = () ->
    @each () ->
      element = $(@)
      url = element.attr('rel')
      $.getJSON url, (points) ->
        xs = []
        ys = []
        sizes = []
        for point in points
          xs.push point.usness
          ys.push point.affection
          sizes.push point.size
        console.log points
        canvas = Raphael(0, 0, 120, 120)
        canvas.g.dotchart(xs, ys, sizes)
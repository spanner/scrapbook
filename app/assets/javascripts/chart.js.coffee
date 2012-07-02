#= require g.raphael
#= require g.dot
#= require_self

jQuery ($) ->

  $.fn.minichart = () ->
    @each () ->
      element = $(@)
      data = element.attr('data-points').split('|')
      points = $.map data, (pair) ->
        pair.split(',')
      canvas = Raphael(0, 0, 120, 120)
      canvas.g.dotchart(points)
      
#= require raphael
#= require g.raphael
#= require g.dott
#= require_self

jQuery ($) ->
  if c = document.getElementById("axis")
    context=c.getContext("2d")
    c.height = 120
    c.width = 120
    context.lineWidth = 2;
    context.moveTo(0,60.5)
    context.lineTo(120,60.5)
    context.moveTo(60.5,0)
    context.lineTo(60.5,120)
    context.stroke()

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
        xs.push 10
        ys.push 10
        sizes.push 0
        xs.push -10
        ys.push -10
        sizes.push 0
        canvas = Raphael('reactions')
        canvas.dotchart(0, 0, 120, 120, xs, ys, sizes, {max: 5, heat: true})

#= require raphael
#= require g.raphael
#= require g.dott
#= require_self

jQuery ($) ->
  $.fn.chart = () ->
    c = document.getElementById("axis")
    context=c.getContext("2d")
    c.height = 800
    c.width = 800
    context.lineWidth = 2;
    context.moveTo(0,400.5)
    context.lineTo(800,400.5)
    context.moveTo(400.5,0)
    context.lineTo(400.5,800)
    context.stroke()
    @each () ->
      element = $(@)
      url = element.attr('rel')
      $.getJSON url, (points) ->
        xs = []
        ys = []
        sizes = []
        name = []
        for point in points
          if point.usness
            xs.push point.usness
            ys.push point.affection
            sizes.push point.size
            names.push point.name
        xs.push 10
        ys.push 10
        sizes.push 0
        xs.push -10
        ys.push -10
        sizes.push 0
        console.log xs, ys, sizes
        canvas = Raphael('reactions')
        canvas.dotchart(0, 0, 800, 800, xs, ys, sizes, {max: 10, heat: true})
  
  $.fn.minichart = () ->
    c = document.getElementById("axis")
    context=c.getContext("2d")
    c.height = 120
    c.width = 120
    context.lineWidth = 2;
    context.moveTo(0,60.5)
    context.lineTo(120,60.5)
    context.moveTo(60.5,0)
    context.lineTo(60.5,120)
    context.stroke()
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
        canvas.dotchart(0, 0, 120, 120, xs, ys, sizes, {max: 3, heat: true})

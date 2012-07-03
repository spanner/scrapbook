#= require raphael
#= require g.raphael
#= require g.dott
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
        xs.push 10
        ys.push 10
        sizes.push 0
        xs.push -10
        ys.push -10
        sizes.push 0
        canvas = Raphael('reactions')
        canvas.dotchart(0, 0, 120, 120, xs, ys, sizes, {max: 5, heat: true})
        c = document.getElementById("axis");
        ctx=c.getContext("2d");
        ctx.moveTo(0,60);
        ctx.lineTo(120,60);
        ctx.moveTo(60,0);
        ctx.lineTo(60,120);
        ctx.stroke();
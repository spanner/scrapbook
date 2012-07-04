#= require raphael
#= require g.raphael
#= require g.dott
#= require_self

jQuery ($) ->
  $.fn.chart = () ->
    @each () ->
      c = document.getElementById("axis")
      context=c.getContext("2d")
      c.height = 800
      c.width = 800
      context.lineWidth = 1
      context.strokeStyle = '#b3b3b3'
      context.moveTo(0,400.5)
      context.lineTo(800,400.5)
      context.moveTo(400.5,0)
      context.lineTo(400.5,800)
      context.stroke()
      element = $(@)
      url = element.attr('rel')
      $.getJSON url, (points) ->
        xs = []
        ys = []
        sizes = []
        names = []
        ids = []
        for point in points
          if point.usness
            xs.push point.usness
            ys.push point.affection
            sizes.push point.size
            names.push point.name
            ids.push point.id
        xs.push 10
        ys.push 10
        sizes.push 0
        names.push null
        ids.push null
        xs.push -10
        ys.push -10
        sizes.push 0
        names.push null
        ids.push null
        canvas = Raphael('reactions')
        console.log xs
        console.log ys
        console.log sizes
        console.log names
        console.log ids
        res = canvas.dotchart(0, 0, 800, 800, xs, ys, sizes, {max: 10, heat: true}).hover () ->
          this.marker = this.marker || canvas.tag(this.x, this.y, "#{@data('id')}: #{@data('caption')}", 0, this.r + 2).insertBefore(this)
          this.marker.show()
        ,() ->
          this.marker && this.marker.hide()

        i = names.length - 1
        res.each () ->
          @data('caption', names[i]) if name?
          @data('id', ids[i]) if name?
          i--
        console.log $('svg circle')
          
  $.fn.minichart = () ->
    @each () ->
      c = document.getElementById("axis")
      context=c.getContext("2d")
      c.height = 120
      c.width = 120
      context.lineWidth = 1
      context.strokeStyle = '#b3b3b3'
      context.moveTo(0,60.5)
      context.lineTo(120,60.5)
      context.moveTo(60.5,0)
      context.lineTo(60.5,120)
      context.stroke()
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
        canvas = Raphael('reaction')
        canvas.dotchart(0, 0, 120, 120, xs, ys, sizes, {max: 4, heat: true})

$ ->
  $('.minichart').minichart()
  $('.bigchart').chart()
  

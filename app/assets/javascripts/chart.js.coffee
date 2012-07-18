#= require raphael
#= require g.raphael
#= require g.dott
#= require_self

jQuery ($) ->
  $.fn.chart = () ->
    @each () ->
      c = document.getElementById("axis")
      context=c.getContext("2d")
      width = 800
      height = 800
      c.height = height
      c.width = width
      context.lineWidth = 1
      context.strokeStyle = '#b3b3b3'
      context.moveTo(0, height/2 + 0.5)
      context.lineTo(width, height/2 + 0.5)
      context.moveTo(width/2 + 0.5, 0)
      context.lineTo(width/2 + 0.5, height)
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
        xs.push 11
        ys.push 11
        sizes.push 0
        names.push null
        ids.push null
        xs.push -11
        ys.push -11
        sizes.push 0
        names.push null
        ids.push null
        canvas = Raphael('reactions', width, height)
        res = canvas.dotchart(0, 0, width, height, xs, ys, sizes, {max: 10, heat: true}).hover () ->
          # tanA = (this.y-height/2)/(width/2-this.x)
          # if this.x > width/2
          #   angle = 180 + Math.atan(tanA)/Math.PI*180
          # else
          #   angle = Math.atan(tanA)/Math.PI*180
          
          if this.x > width/2
            angle = 180
          else
            angle = 0
          unless this.data('id') == null
            this.marker = this.marker || canvas.tag(this.x, this.y, @data('caption'), angle, this.r + 2).insertBefore(this)
            this.marker.show()
        ,() ->
          this.marker && this.marker.hide()

        res.click () ->
          if @data('id')
            window.location.href = "/scraps/#{@data('id')}"

        i = names.length - 1
        res.each () ->
          @data('caption', names[i]) if name?
          @data('id', ids[i]) if name?
          i--
        
          
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
        canvas = Raphael('reaction', 120, 120)
        canvas.dotchart(0, 0, 120, 120, xs, ys, sizes, {max: 4, heat: true})

$ ->
  $('.minichart').minichart()
  $('.bigchart').chart()
  

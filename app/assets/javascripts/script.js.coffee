jQuery ($) ->
  $.fn.slider = () ->
    @each () ->
      input = $(@)
      console.log "slider", input
      values = input.attr('data-values').split(/,\s*/)
      slider = $('<div class="sliderbar" />')
      caption = $('<span class="response" />').text(values[2])
      console.log values
      $(@).hide().after(slider)
      slider.after(caption)
      slider.noUiSlider "init",
        dontActivate: "lower"
        bar: "off"
        startMin: 0
        startMax: 50
        tracker: () ->
          value = slider.noUiSlider("getValue")[0]
          input.val(value)
          caption.text(values[Math.floor(4 * value / 100)])
          
  $.fn.activate = () ->
      console.log "activate", @

      @find("input.slider").slider()

      @

  # *activate()* can be called with any selector. On dom load we call it on the body element to get everything started.

  $ ->
    $('body').activate()
    if Modernizr.history
      $(window).bind 'popstate', $.restoreState
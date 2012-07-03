jQuery ($) ->
  $.fn.slider = () ->
    @each () ->
      input = $(@)
      values = input.attr('data-values').split(/,\s*/)
      slider = $('<div class="sliderbar" />')
      caption = $('<span class="response" />').text(values[2])
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


  $.fn.reactor = ->
    @submit (e) ->
      form = $(@)
      e.preventDefault()
      form.addClass "waiting"
      form.find("input").attr("disabled", true)
      form.post form.attr("action"), form.serialize(), (response) ->
        replacement = $(response)
        form.removeClass "waiting"
        form.hide()
        form.after(replacement)
      , "html"


$ ->
  $("input.slider").slider()
  $('.minichart').minichart()
  $('.bigchart').chart()
  $('#new_reaction').reactor()
  
  disqus_shortname = 'scrapbok'
  disqus_category_id = 'scraps'
  disqus_title = 'Scrapbook'


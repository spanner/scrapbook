#= require d3.min
#= require d3.layout.min
#= require_self

jQuery ($) ->

  $.fn.minichart = () ->
    @each () ->
      @element = $(@)
      
# A collection of interface elements and shortcuts for the Royal Society's 2012 Science Live site.

unless Array::last?
  Array::last = ->
    this[@length - 1]

unless Array::first?
  Array::first = ->
    this[0]

unless Array::max?
  Array::max = ->
    Math.max.apply Math, this

unless Array::min?
  Array::min = ->
    Math.min.apply Math, this

unless Array::toSentence?
  Array::toSentence = ->
    @join(", ").replace /,\s([^,]+)$/, " and $1"

unless Number::between?
  Number::between = (a,b)->
    this > a and this < b

unless String::truncate?
  String::truncate = (length, separator, ellipsis)->
    length ?= 100
    ellipsis ?='...'
    if @length > length
      trimmed = @substr 0, length - ellipsis.length
      trimmed = trimmed.substr(0, trimmed.lastIndexOf(separator)) if separator? 
      trimmed + '...'
    else
      @

unless Date::round?
  Date::round = (interval) ->
    interval ?= 15
    resolution = 1000 * 60 * interval
    new Date(Math.round(@getTime() / resolution) * resolution)

unless Date::ceil?
  Date::ceil = (interval) ->
    interval ?= 15
    resolution = 1000 * 60 * interval
    new Date(Math.ceil(@getTime() / resolution) * resolution)
  
unless Date::floor?
  Date::floor = (interval) ->
    interval ?= 15
    resolution = 1000 * 60 * interval
    new Date(Math.floor(@getTime() / resolution) * resolution)

unless Date::addMinutes?
  Date::addMinutes = (interval) ->
    interval ?= 15
    new Date @getTime() + 1000 * 60 * interval 

unless Date::simpleTime?
  Date::simpleTime = ->
    hours = @getHours()
    minutes = @getMinutes()
    minutes += '0' if minutes < 10
    time = "#{hours}:#{minutes}"
    time += " today" if @isToday()
    time += " tomorrow" if @isTomorrow()
    time

unless Date::isToday?
  Date::isToday = () ->
    time = new Date()
    @getDate() == time.getDate()

unless Date::isTomorrow?
  Date::isTomorrow = () ->
    time = new Date()
    time.setHours(time.getHours() + 24)
    @getDate() == time.getDate()

jQuery ($) ->
  $.fn.suggestible = (opts) ->
    options = $.extend
      submit_form: true
      threshold: 3
    , opts
    @each ->
      new Suggester(this, options)
    @

  class Suggester
    constructor: (element, opts) ->
      @prompt = $(element)
      @form = @prompt.parents("form")
      @button = @prompt.siblings("a")
      @container = $("<ul class=\"suggestions\"></ul>").appendTo(@prompt.offsetParent())
      @previously = null
      @request = null
      @visible = false
      @suggestions = []
      @suggestion = null
      @cache = {}
      @blanks = []
      @options = $.extend
        url: "/suggestions"
        fill_field: true
        empty_field: false
        submit_form: false
        threshold: 2
        afterSuggest: null
        afterSelect: null
      , opts
      @prompt.keyup @key
      @form.submit @hide
      @

    place: =>
      @container.css
        top: @prompt.position().top + @prompt.outerHeight() - 2
        left: @prompt.position().left
        width: @prompt.outerWidth() - 2

    reset: =>
      @container.empty()
      @suggestions = []
      @suggestion = null

    pend: =>
      @place()
      @reset()
      @button?.addClass "waiting"

    get: (e) =>
      @pend()
      query = @prompt.val()
      if query.length >= @options.threshold and query isnt @previously
        if @cache[query]
          @suggest @cache[query]
        else if @previously_blank(query)
          @suggest []
        else
          @request.abort() if @request
          @request = $.getJSON @options.url, "term=" + encodeURIComponent(query), (suggestions) =>
            @cache[query] = suggestions
            @blanks.push query if suggestions.length is 0
            @suggest suggestions
      else
        @hide()

    suggest: (suggestions) =>
      console.log "suggest", suggestions, @container
      @button?.removeClass "waiting"
      @show()
      if suggestions.length > 0
        $.each suggestions, (i, suggestion) =>
          link = $("<a href=\"#\" class=\"#{suggestion.type}\">#{suggestion.text}</a>")
          link.click (e) =>
            e.preventDefault() if e
            @select(link)
          link.hover (e) =>
            @hover(link)
          @container.append($("<li />").append(link))
        @suggestions = @container.find("a")
      else
        @hide()
      @options.afterSuggest?.call @, suggestions

    select: (selection) =>
      console.log "select", selection, 'with this', @
      value = selection.text()
      if @options.fill_field
        @prompt.val value
      else if @options.empty_field
        @prompt.val "" 
      if @options.submit_form
        @form.submit()  
      @options.afterSelect?.call @, value
      @hide()

    show: =>
      unless @visible
        @container.fadeIn "slow"
        @visible = true

    hide: =>
      if @visible
        @container.fadeOut "fast"
        @visible = false

    key: (e) =>
      key_code = e.which
      if @movement(key_code)
        @show() if @suggestions.length > 0
        if @visible
          e.preventDefault()
          @movement(key_code).call @, e
          e.stopPropagation()
      else
        @get e

    movement: (key_code) =>
      switch key_code
        when 27
          @hide
        when 33
          @first
        when 38
          @previous
        when 40
          @next
        when 33
          @last
        when 9
          @next
        when 13
          @select

    next: (e) =>
      if @suggestion is null or @suggestion >= @suggestions.length - 1
        @first()
      else
        @highlight @suggestion + 1

    previous: (e) =>
      if @suggestion <= 0
        @last()
      else
        @highlight @suggestion - 1

    first: (e) =>
      @highlight 0

    last: (e) =>
      @highlight @suggestions.length - 1

    hover: (suggestion) =>
      @highlight @suggestions.index(suggestion)

    highlight: (i) =>
      @unHighlight @suggestion  if @suggestion isnt null
      $(@suggestions.get(i)).addClass "hover"
      @suggestion = i

    unHighlight: (i) =>
      $(@suggestions.get(i)).removeClass "hover"
      @suggestion = null

    previously_blank: (query) =>
      if @blanks.length > 0
        blank_re = new RegExp("(" + @blanks.join("|") + ")")
        return blank_re.test(query)
      false





  class Tagger 
    constructor: (element) ->
      @container = $(element)
      @adder = @container.find("li.add")
      @prompt = @adder.find("input")
      @button = @adder.find("a")
      @url = @adder.attr("rel")
      @suggester = new Suggester @prompt,
        submit_form: false
        fill_field: false
        empty_field: true
        url: "/suggestions/tag"
        threshold: 3
        afterSelect: @addTag
      @prompt.bind "keyup", @submitOnEnter
      @button.bind "click", @submit
    
    addTag: (selected) =>
      newtag = $("<li class='newtag waiting'><a href='#' class='detag'>#{selected}</a></li>")
      @adder.before newtag
      $.ajax
        type: "GET"
        dataType: "html"
        url: @url
        data: "tag=" + encodeURIComponent(selected)
        success: (response) ->
          li = $(response)
          li.find("a.detag").detagger()
          newtag.replaceWith li

    submitOnEnter: (e) =>
      @submit(e) if e.which is 13

    submit: (e) =>
      e.preventDefault()  if e
      @addTag @prompt.val()
      @prompt.val ""



  $.fn.tagger = ->
    @each ->
      new Tagger(this)
    @

  $.fn.detagger = ->
    @click (e) ->
      e.preventDefault()
      li = $(this).parents("li")
      if li.hasClass("newtag")
        li.remove()
      else
        li.find("input.destroy").val 1
        li.hide()
    @
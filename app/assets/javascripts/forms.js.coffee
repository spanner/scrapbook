jQuery ($) ->

  $.easing.glide = (x, t, b, c, d) ->
    -c * ((t=t/d-1)*t*t*t - 1) + b

  $.easing.boing = (x, t, b, c, d, s) ->
    s ?= 1.70158;
    c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b



  $.urlParam = (name) ->
    results = new RegExp("[\\?&]" + name + "=([^&#]*)").exec(window.location.href)
    return 0  unless results
    results[1] or 0



  $.fn.flash = ->
    @each ->
      container = $(this)
      container.fadeIn "fast"
      $("<a href=\"#\" class=\"closer\">close</a>").prependTo(container).bind "click", (e) ->
        e.preventDefault()
        container.fadeOut "fast"

  $.fn.validation_error = ->
    @each ->
      container = $(this)
      container.fadeIn "fast"
      $("<a href=\"#\" class=\"closer\">close</a>").prependTo(container).bind "click", (e) ->
        e.preventDefault()
        container.fadeOut "fast"
        container.parent().removeClass "erratic"



  $.fn.click_proxy = (target_selector) ->
    this.bind "click", (e) ->
      e.preventDefault()
      $(target_selector).click()



  $.fn.self_label = ->
    @each ->
      field = $(@)
      if label = field.attr("rel")
        field.focus (e) ->
          if field.val() is label
            field.removeClass "empty"
            field.val ""
        field.blur (e) ->
          v = field.val()
          if v is label or v is ""
            field.val(label)
            field.addClass "empty"
        field.parents("form").submit (e) =>
          field.val("") if field.val() is label
        field.blur()
    @



  $.fn.toggle = ->
    @each ->
      selector = $(@).attr('data-toggled')
      $(selector).hide() unless @checked
      $(@).click (e) ->
        if @checked then $(selector).slideDown() else $(selector).slideUp()



  $.fn.overlay_remote_content = () ->
    @each ->
      self = $(this)
      container = self.parents('.holder')
      self
        .on('ajax:beforeSend', (event, xhr, settings) ->
          container.addClass('waiting')
          xhr.setRequestHeader('X-PJAX', 'true')
        )
        .on('ajax:error', (event, xhr, status) ->
          console.log "failed", xhr
          self.removeClass('waiting').addClass('erratic')
        )
        .on('ajax:success', (event, response, status) ->
          if response? && response != " "
            replacement = $(response)
            container.hide()
            container.removeClass('waiting')
            replacement.insertAfter(container).activate().slideDown()
            replacement.find('a.cancel').click (e) ->
              e.preventDefault()
              replacement.slideUp()
              container.show()
          else
            container.slideUp()
        )



  class CaptiveForm
    constructor: (element, @target_selector) ->
      @form = $(element)
      @request = null
      @form.on('ajax:beforeSend', @prepare)
      @form.on('ajax:success', @update)
      if Modernizr.history
        $(window).bind 'popstate', @revert
      
    prepare: (event, xhr, settings) =>
      xhr.setRequestHeader('X-PJAX', 'true')
      @request.abort() if @request?
      @request = xhr
      $(@target_selector).fadeTo 'fast', 0.2
    update: (event, response, status) =>
      @request = null
      @display(response) if response? && status
      url = @form.attr('action') + '?' + @form.find('input.significant').serialize()
      state = 
        html: response
        fields: @form.find('input.significant').serializeArray()
      if Modernizr.history
        history.pushState state, "Messages", url
    display: (response) =>
      $(@target_selector).replaceWith(response)
    revert: (e) =>
      event = e.originalEvent
      if event.state? && event.state.html?
        @display event.state.data.html
        
  $.fn.capture_remote_content = (target_selector) ->
    @each () ->
      new CaptiveForm(this, target_selector)
    @



  class BigCheckBox
    constructor: (element) ->
      @element = $(element)
      @link = @element.find('a')
      @field = @element.find('input')
      @link.bind 'click', @toggle
      @field.bind 'change', @reflect
    reflect: (e) =>
      if @field.is(":checked") then @link.addClass 'selected' else @link.removeClass 'selected'
    toggle: (e) =>
      e.preventDefault() if e
      if @field.is(":checked") then @deselect() else @select()
      @submit(e)
    select: (e) =>
      @field.prop "checked", true
      @link.removeClass 'off'
    deselect: (e) =>
      @field.prop "checked", false
      @link.addClass 'off'
    submit: (e) =>
      e.preventDefault() if e
      @element.parents('form').submit()

  $.fn.big_checkbox = () ->
    @each ->
      new BigCheckBox(this)
    @




  class PasswordField
    constructor: (element, opts) ->
      @options = $.extend
        length: 6
        validator: new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])")
      , opts
      @field = $(element)
      @form = @field.parents('form')
      @submit = @form.find('input.submit')
      @confirmation = $("#" + @field.attr("id") + "_confirmation")
      @confirmation_holder = @confirmation.parents("p")
      @mock_password = 'password'
      @required = @field.hasClass('required')
      @field.focus @wake
      @field.blur @sleep
      @field.keyup @check
      @confirmation.keyup @check
      @form.submit @stumbit
      # to set up initial state
      @unsubmittable() if @required
      @sleep()
    
    wake: () =>
      if @field.val() is @mock_password
        @field.removeClass "empty"
        @field.val ""
      
    sleep: () =>
      v = @field.val()
      if v is @mock_password or v is ""
        @field.val @mock_password
        @field.addClass("empty")
        # if we're not required, then both-empty is also a submittable condition
        if @confirmation.val() is "" and not @required
          @submittable()

    check: () =>
      if @valid()
        @field.addClass("ok").removeClass "notok"
        @confirmation_holder.show()
        if @matching()
          @confirmation.addClass("ok").removeClass("notok")
          @submittable()
        else
          @confirmation.addClass("notok").removeClass("ok")
          @unsubmittable()
      else
        @confirmation_holder.hide()
        @confirmation.val ""
        @unsubmittable()
        @field.addClass("notok").removeClass("ok")
        @confirmation.addClass("notok").removeClass("ok")

    submittable: () =>
      @submit.removeClass("unavailable")
      @blocked = false
      
    unsubmittable: () =>
      @submit.addClass("unavailable")
      @blocked = true

    valid: () =>
      v = @field.val()
      v.length >= @options.length and @options.validator.test(v)
      
    matching: () =>
      @confirmation.val() is @field.val()
      
    stumbit: (e) =>
      if @blocked
        e.preventDefault()
      else
        @field.val("") if @field.val() is @mock_password
        e.preventDefault() unless @matching()


  $.fn.password_field = ->
    @each ->
      new PasswordField(@)



  tabs = {}
  class Tab
    constructor: (element) ->
      @element = $(element)
      @name = @element.attr('href').replace('#', '')
      @selector = @element.attr('data-reveal')
      @showing = @element.hasClass('here')
      @element.click @show
      tabs[@name] = @
      @show() if @showing

    show: (e) =>
      e.preventDefault() if e
      Tab.hide()
      $(@selector).fadeIn()
      @element.blur().addClass('here')
      $('input.tabbed').val(@name)
      
    hide: (e) =>
      e.preventDefault() if e
      $(@selector).hide()
      @element.removeClass('here')
    @hide: ->
      tab.hide() for key, tab of tabs

  $.fn.tab = ->
    @each ->
      new Tab(@)
      

  $.size_to_fit = (e) ->
    container = $(@)
    l = container.val().length
    size = (((600.0/(l+200.0)) + 0.25) * 2).toFixed(2)
    container.animate
      'font-size': "#{size}em"
      width: 830
      height: 595
    , 
      queue: false
      duration: 100
        
  $.fn.self_sizes = () ->
    @bind "keyup", $.size_to_fit
    @bind "change", $.size_to_fit
    $.size_to_fit.apply(@)


      



$ -> 
  $('#flashes p:parent').flash()
  $('input.labelled, textarea.labelled').self_label()
  $('input.password').password_field()
  $('.error_message').validation_error()
  $('.toggle').toggle()
  $('.tab').tab()
  # $('textarea.body').self_sizes()
  $('.dropbox').uploader()

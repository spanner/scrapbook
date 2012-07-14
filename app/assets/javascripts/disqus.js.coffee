jQuery () ->

  $.fn.get_latest_posts = () ->
    @each ->
      new Forum @
    
  class Forum
    constructor: (element, opts) ->
      @options = $.extend {}, opts
      @container = $(element)
      @cursor = null
      @posts = []
      @seen = {}
      @interval = 20000
      @timer = null
      @cursor = null
      @scraps = {}
      @threads = {}
      $.disqus = @
      @getScraps()

    getFromDisqus: (url, andthen, params) =>
      params = $.extend {}, params, 
        forum: "scrapbok"
        api_key: "J1Aot3Nyri4FFTJbLF4OPFAllbujBGbra1EcZa1A1XdQ5obmQNcUZ5csM4ybHXcf"
      $.ajax
        url: url
        dataType: 'jsonp'
        data: params
        success: andthen
        error: @fail
      
    getScraps: () =>
      $.getJSON "/scraps.json", @storeScraps
        
    storeScraps: (response) =>
      for scrapdata in response
        scrap = new Scrap(scrapdata, @) 
        @scraps[scrap.id] = scrap
      @getThreads()
      
    getThreads: (cursor) =>
      @container.find('.waiting').text('2. Loading threads')
      @getFromDisqus "http://disqus.com/api/3.0/forums/listThreads.jsonp", @storeThreads,
        limit: 100
      
    storeThreads: (data) =>
      for threaddata in data.response
        thread = new Thread threaddata, @
        @threads[thread.id] = thread
      if data.cursor.hasNext
        @getThreads(data.cursor.next)
      else
        @getPosts()

    getPosts: () =>
      @container.find('.waiting').text('3. Loading messages')
      params = 
        order: "desc"
      params.cursor = @cursor if @cursor?
      if @thread?
        params.thread = @thread.id
        @getFromDisqus "http://disqus.com/api/3.0/threads/listPosts.jsonp", @showPosts, params
      else
        @getFromDisqus "http://disqus.com/api/3.0/forums/listPosts.jsonp", @showPosts, params
      
    showPosts: (data) =>
      @container.find('.waiting').hide()
      for postdata in data.response
        unless @seen[postdata.id]?
          post = new Post postdata, @
          @posts.push post
          element = post.html()
          element.appendTo(@container).slideDown()
          @seen[postdata.id] = true
      @cursor = data.cursor.next
      @timer ?= window.setInterval(@getPosts, @interval) if @options.refresh?
      
    fail: (xhr, textStatus, error) =>
      window.clearInterval @timer if @timer
      console.log 'failed!'
      console.log 'error:', error
      console.log 'status:', xhr.status
      console.log 'responseText:', xhr.responseText
      console.log 'xhr:', xhr

    minimal: () =>
      @options.minimal?
  
  class Scrap
    constructor: (data, @forum) ->
      @id = data.id
      @name = data.name
      @url = "http://scrapbook.spanner.org/scraps/" + @id
      
  class Thread
    constructor: (data, @forum) ->
      @id = parseInt(data.id, 10)
      scrap_id = data.link.replace("http://scrapbook.spanner.org/scraps/", '')
      @scrap = @forum.scraps[scrap_id]

  class Post
    constructor: (data, @forum) ->
      @id = data.id
      @author = new Author data.author
      @message = data.message
      @parent = data.parent
      @thread = @forum.threads[parseInt(data.thread, 10)]
      @scrap = @thread.scrap if @thread
      
    html: () =>
      @container = $('<div class="post" />')
      author = @author.html()
      author.append $(" <span class='post_scrap'>on <a href='#{@scrap.url}'>#{@scrap.name}</a></span>") if @scrap?
      @container.append author
      @container.append $("<div class='message'>#{@message}</div>")
      @container

  class Author
    constructor: (data) ->
      @id = data.emailHash
      @name = data.name
      @avatar_url = data.avatar.small.cache
      @url = data.profileUrl
    html: () =>
      $("<h4 class='poster'><img class='avatar' src='#{@avatar_url}' /> #{@name}</h4>")

$ ->
  $('#latest_posts').get_latest_posts()
  
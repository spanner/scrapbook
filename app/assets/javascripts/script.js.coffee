$ ->
  $("input.slider").slider()
  $('.minichart').minichart()
  $('.bigchart').chart()
  $('#new_reaction').reactor()
  $('#scrap_search .search').keyup () ->
    $(@).parent().parent().submit()
  
  disqus_shortname = 'scrapbok'
  disqus_category_id = 'scraps'
  disqus_title = 'Scrapbook'

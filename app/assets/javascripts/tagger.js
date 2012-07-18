$(function(){
  
  $.fn.suggestible = function (options) {
    options = $.extend({submit_form: true, threshold: 3}, options);
    this.each(function () {
      new Suggester(this, options);
    });
    return this;
  }
  
  var Suggester = function (element, options) {
    var self = this,
        prompt = $(element),
        form = prompt.parents('form');

    options = $.extend({
      url: '/suggestions',
      fill_field: true,
      empty_field: false,
      submit_form: false,
      threshold: 2,
      afterSuggest: null,
      afterSelect: null
    }, options);
    
    $.extend(self, {
      prompt: prompt,
      options: options,
      container: $('<ul class="suggestions"></ul>').appendTo(prompt.offsetParent()),
      form: form,
      button: form.find('a.search'),
      previously: null,
      request: null,
      visible: false,
      suggestions: [],
      suggestion: null,
      cache: {},
      blanks: [],
      place: function () {
        self.container.css({
          top: self.prompt.position().top + self.prompt.outerHeight() - 2,
          left: self.prompt.position().left,
          width: self.prompt.outerWidth() - 2
        });
      },
      reset: function () {
        self.container.empty();
        self.suggestions = [];
        self.suggestion = null;
      },
      pend: function () {
        self.place();
        self.reset();
        self.button.addClass('waiting');
      },
      get: function (e) {
        self.pend();
        var query = self.prompt.val();
        if (query.length >= self.options.threshold && query != self.previously) {
          if (self.cache[query]) {
            self.suggest(self.cache[query]);
          } else if (self.previously_blank(query)){
            self.suggest([]);
          } else {
            if (self.request) self.request.abort();
            self.request = $.getJSON(self.options.url, "term=" + encodeURIComponent(query), function (suggestions) {
              self.cache[query] = suggestions;
              if (suggestions.length == 0) self.blanks.push(query);
              self.suggest(suggestions);
            });
          }
        } else {
          self.hide();
        }
      },
      suggest: function (suggestions) {
        self.button.removeClass('waiting');
        self.show();
        if (suggestions.length > 0) {
          $.each(suggestions, function (i, suggestion) {
            var link = $('<a href="#" class="' + suggestion.type + '">' + suggestion.text + '</a>').click(self.select).hover(self.hover);
            $('<li></li>').append(link).appendTo(self.container);
          });
          self.suggestions = self.container.find('a');
        } else {
          self.hide();
        }
        if (self.options.afterSuggest) self.options.afterSuggest.call(self, suggestions);
      },
      select: function (e) {
        if (e) e.preventDefault();
        var selection =  (this == self) ? $(self.suggestions.get(self.suggestion)) : $(this);
        var value = selection.text();
        if (self.options.fill_field) self.prompt.val(value);
        else if (self.options.empty_field) self.prompt.val('');
        if (self.options.submit_form) self.form.submit();
        if (self.options.afterSelect) self.options.afterSelect.call(self, value);
        self.hide();
      },
      show: function () {
        if (!self.visible) {
          self.container.fadeIn('slow');
          self.visible = true;
        }
      },
      hide: function () {
        if (self.visible) {
          self.container.fadeOut('fast');
          self.visible = false;
        }
      },
      key: function (e) {
        var key_code = e.which;
        if (self.movement(key_code)) {
          if (self.suggestions.length > 0) self.show();
          if (self.visible) {
            self.movement(key_code).call(self, e);
            e.preventDefault();
            e.stopPropagation();
          }
        } else {
          self.get(e);
        }
      },
      movement: function (key_code) {
        switch (key_code) {
          case 27: return self.hide;        // escape
          case 33: return self.first;       // page up
          case 38: return self.previous;    // up
          case 40: return self.next;        // down
          case 33: return self.last;        // page down
          case 9: return self.next;         // tab
          case 13: return self.select;      // enter
        }
      },
      next: function (e) {
        if (self.suggestion === null || self.suggestion >= self.suggestions.length-1) self.first();
        else self.highlight(self.suggestion + 1);
      },
      previous: function (e) {
        if (self.suggestion <= 0) self.last();
        else self.highlight(self.suggestion - 1);
      },
      first: function (e) {
        self.highlight(0);
      },
      last: function (e) {
        self.highlight(self.suggestions.length-1);
      },
      hover: function () {
        self.highlight(self.suggestions.index(this));     // this will be the hovered link
      },
      highlight: function (i) {
        if (self.suggestion !== null) self.unHighlight(self.suggestion);
        $(self.suggestions.get(i)).addClass('hover');
        self.suggestion = i;
      },
      unHighlight: function (i) {
        $(self.suggestions.get(i)).removeClass('hover');
        self.suggestion = null;
      },
      previously_blank: function (query) {
        if (self.blanks.length > 0) {
          var blank_re = new RegExp("(" + self.blanks.join('|') + ")");
          return blank_re.test(query);
        }
        return false;
      }
    });
    self.prompt.keyup(self.key);
    self.form.submit(self.hide);
    return self;
  };
  
  /*
    .tagger is called on a list containing form fields.
    its input functions as a dropdown and adds a new li to the list
    with facet-like presentation to mark it as unsaved.
  */

  var Tagger = function (element) {
    var self = $(element),
        adder = self.find('li.add');
    
    $.extend(self, {
      adder: adder,
      prompt: adder.find('input'),
      button: adder.find('a'),
      url: adder.attr('rel'),
      suggester: null,
      addTag: function (selected) {
        var newtag = $('<li class="newtag waiting"><a href="#" class="detag">' + selected + '</a></li>');
        self.adder.before(newtag);
        $.ajax({
          type: 'GET',
          dataType: 'html',
          url: self.url,
          data: "tag=" + encodeURIComponent(selected),
          success: function (response) {
            var li = $(response);
            li.find('a.detag').detagger();
            newtag.replaceWith(li);
          }
        });
      },
      submitOnEnter: function (e) {
        if (e.which == 13) self.submit(e);
      },
      submit: function (e) {
        if (e) e.preventDefault();
        self.addTag(self.prompt.val());
        self.prompt.val('');
      }
    });
    self.suggester = new Suggester(self.prompt, {
      submit_form: false,
      fill_field: false,
      empty_field: true,
      url: '/suggestions/tag',
      threshold: 3,
      afterSelect: self.addTag
    });
    self.prompt.bind('keyup', self.submitOnEnter);
    self.button.bind('click', self.submit);
  };

  $.fn.tagger = function () {
    this.each(function () {
      new Tagger(this);
    });
    return this;
  }
    
  /*
    .detag links hide the <li> containing them and set their neighboring
    input.destroy to 1 so that the tagging is eventually removed.
  */
  
  $.fn.detagger = function () {
    this.click(function (e) {
      e.preventDefault();
      var li = $(this).parents('li');
      if (li.hasClass('newtag')) {
        li.remove()
      } else {
        li.find('input.destroy').val(1);
        li.hide();
      }
    });
    return this;
  };
  
});

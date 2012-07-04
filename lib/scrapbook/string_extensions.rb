require 'title_case'

STOPWORDS = %w{ a about above after again against all am and any are aren't as at be because been before being below between both by can't cannot could couldn't did didn't do does doesn't doing don't down during each few for from further had hadn't has hasn't have haven't having he he'd he'll he's her here here's hers herself himself his how how's i i'd i'll i'm i've if in into is isn't it it's its itself let's me more most mustn't my myself no nor not of off once only other ought our ours ourselves out over own same shan't she she'd she'll she's should shouldn't some such than that that's the their theirs them themselves then there there's these they they'd they'll they're they've this those through too under until up very was wasn't we we'd we'll we're we've were weren't what what's when when's where where's which while who who's whom why why's with won't would wouldn't you you'd you'll you're you've your yours yourself yourselves }
STOPWORD_RE = %r{\b(#{STOPWORDS.join('|')})\b\s* }
SMALL_WORDS = %w( is a an and as at but by en for if in of on or the to v[.]? via vs[.]? )
SMALL_RE = %r{\b(#{SMALL_WORDS.join('|')})\b}io

SMALL_WORDS.join('|')

class String
  include TitleCase

  def searchable
    downcase.remove_stopwords.flatten
  end
  
  def flatten
    split(/[^\w\d\']{1,}/).join(' ')
  end
  
  def remove_stopwords
    gsub(STOPWORD_RE, '')
  end
  
  def titlecase_nicely
    # the old method name now passes on to the Gruber method defined in title_case.rb
    # and is included here only to catch leftovers.
    self.title_case
  end
  
end
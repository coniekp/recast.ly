var searchYouTube = (options, callback) => {
  var data = {
    'maxResults': options.max,
    'q': options.query,
    'key': options.key,
    'part': 'snippet',
    'videoEmbeddable': 'true',
    'type': 'video',
    'safeSearch': 'strict'
  };

  $.get('https://www.googleapis.com/youtube/v3/search', data, function(data) {   
    callback(data.items);
  });
};


window.searchYouTube = searchYouTube;

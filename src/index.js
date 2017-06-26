if (process.env.NODE_ENV != 'production') {
  require('./index.html');
}

require('normalize.css');

require('./search.js');

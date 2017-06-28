if (process.env.NODE_ENV != 'production') {
  require('./index.html');
}

require('normalize.css');
require('font-awesome/css/font-awesome.css');
require('./scss/styles.scss');

require('./js/search.js');
require('./js/random.js');

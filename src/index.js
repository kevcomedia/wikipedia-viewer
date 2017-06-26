if (process.env.NODE_ENV != 'production') {
  require('./index.html');
}

require('normalize.css');
require('font-awesome/css/font-awesome.css');
require('./styles.scss');

require('./search.js');
require('./random.js');


'use strict'

if (process.env.NODE_ENV === 'production') {
  module.exports = require('./react-keyboard.cjs.production.min.js')
} else {
  module.exports = require('./react-keyboard.cjs.development.js')
}

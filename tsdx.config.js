const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');


module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 384,
            propList: ['*']
          }),
          cssnano({
            preset: 'default',
          }),
        ],
        inject: false,
        extract: 'react-easy-popup.min.css',
      })
    );
    return config;
  },
};
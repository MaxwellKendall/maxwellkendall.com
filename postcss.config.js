const postcssImport = require(`postcss-import`)
const postcssBrowserReporter = require(`postcss-browser-reporter`)
const postcssReporter = require(`postcss-reporter`)

module.exports = () => ({
  plugins: [
    postcssImport(),
    postcssBrowserReporter(),
    postcssReporter(),
  ],
});

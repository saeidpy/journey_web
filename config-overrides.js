/* TO get rid of "Failed to parse source map" error
  comming from stupid non-fixing idiotic stylis-rtl module
  THIS IS STUPID :| I should swear more
  maybe even take it to the next level and use a F-word here
  */

const {override} = require('customize-cra')

const ignoreWarnings = (value) => (config) => {
  config.ignoreWarnings = value
  return config
}

module.exports = override(ignoreWarnings([/Failed to parse source map/]))

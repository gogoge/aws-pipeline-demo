module.exports = function (env) {
  // If the development environment is not detected 
  // we throw an error telling the user 
  // what the correct params are.
  try {
    if (['dev', 'prod'].indexOf(env) === -1) {
      throw new Error('\'' + env + "' is not valid env flag.  Please pass '--env dev' or '--env prod'.")
    }
  } catch (e) {
    return console.error(e)
  }
  
  // This is how we include the correct environment config file
  const totalWebpackConfig = require('./webpack/' + env + '.js')({ env: env })
  console.warn(totalWebpackConfig.module)
  return totalWebpackConfig
}

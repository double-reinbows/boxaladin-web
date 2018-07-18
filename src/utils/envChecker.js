const envChecker = function (status) {
  if (process.env.REACT_APP_ENV === 'dev' && status === 'web') {
    return process.env.REACT_APP_WEB_DEVELOPMENT
  } else if (process.env.REACT_APP_ENV === 'test' && status === 'web') {
    return process.env.REACT_APP_WEB_TEST
  } else if (process.env.REACT_APP_ENV === 'prod' && status === 'web') {
    return process.env.REACT_APP_WEB_PRODUCTION
  } else if (process.env.REACT_APP_ENV === 'dev' && status === 'firebase') {
    return process.env.REACT_APP_FIREBASE_PRODUCT_DEVELOPMENT
  } else if (process.env.REACT_APP_ENV === 'test' && status === 'firebase') {
    return process.env.REACT_APP_FIREBASE_PRODUCT_TEST
  } else if (process.env.REACT_APP_ENV === 'prod' && status === 'firebase') {
    return process.env.REACT_APP_FIREBASE_PRODUCT_PRODUCTION
  } else if (process.env.REACT_APP_ENV === 'dev' && status === 'api') {
    return process.env.REACT_APP_API_HOST_DEVELOPMENT
  } else if (process.env.REACT_APP_ENV === 'test' && status === 'api') {
    return process.env.REACT_APP_API_HOST_TEST
  } else if (process.env.REACT_APP_ENV === 'prod' && status === 'api') {
    return process.env.REACT_APP_API_HOST_PRODUCTION
  } else {
    alert('your environment is not registered')
  }
}

module.exports = envChecker;

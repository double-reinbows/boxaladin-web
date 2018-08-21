// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducer from '../reducers/'
import { logger } from 'redux-logger'

const log = [thunk]
if ( process.env.NODE_ENV === 'development'){
  log.push(logger);
}

const middleware = applyMiddleware(...log)
const store = createStore(reducer, middleware, applyMiddleware(loadingBarMiddleware()))

export default store

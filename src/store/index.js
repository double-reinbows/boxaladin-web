// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducer from '../reducers/'
//-----------------------------------------------buat check data redux-------------------------------------
// import { logger } from 'redux-logger'

const middlewares = [thunk];
const middleware = applyMiddleware(...middlewares)

const store = createStore(reducer, middleware, applyMiddleware(loadingBarMiddleware()))

export default store

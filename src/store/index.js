// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducer from '../reducers/'

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware, applyMiddleware(loadingBarMiddleware()))

export default store

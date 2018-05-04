// @flow

// import { createStore, applyMiddleware } from 'redux'
// import thunk from 'redux-thunk'
// import { loadingBarMiddleware } from 'react-redux-loading-bar'
// import reducer from '../reducers/'
// import { logger } from 'redux-logger'

// const tes = [thunk]
// if ( process.env.NODE_ENV === 'development'){
//   tes.push(logger);
// }

// const middleware = applyMiddleware(...tes)
// const store = createStore(reducer, middleware, applyMiddleware(loadingBarMiddleware()))

// export default store
//-----------------------------------------------buat check data redux-------------------------------------

// @flow

import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { loadingBarMiddleware } from 'react-redux-loading-bar'
import reducer from '../reducers/'

const middleware = applyMiddleware(thunk)

const store = createStore(reducer, middleware, applyMiddleware(loadingBarMiddleware()))

export default store


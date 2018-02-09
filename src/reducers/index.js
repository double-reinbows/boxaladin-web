import { combineReducers } from 'redux'

import userReducer from './userReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'
import transactionReducer from './transactionReducer'

var Reducer = combineReducers({
  userReducer,
  productReducer,
  categoryReducer,
  brandReducer,
  transactionReducer
})

export default Reducer

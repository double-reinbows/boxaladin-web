import { combineReducers } from 'redux'

import userReducer from './userReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'

var Reducer = combineReducers({
  userReducer,
  productReducer,
  categoryReducer,
  brandReducer
})

export default Reducer

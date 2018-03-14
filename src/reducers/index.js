import { combineReducers } from 'redux'

import userReducer from './userReducer'
import productReducer from './productReducer'
import categoryReducer from './categoryReducer'
import brandReducer from './brandReducer'
import transactionReducer from './transactionReducer'
import keyReducer from './keyReducer'
import topupReducer from './topupReducer'
import winReducer from './winReducer'
import rewardReducer from './rewardReducer'
import claimReducer from './claimReducer'
import loadingReducer from './loadingReducer'
import modalReducer from './modalReducer'

var Reducer = combineReducers({
  userReducer,
  productReducer,
  categoryReducer,
  brandReducer,
  transactionReducer,
  keyReducer,
  topupReducer,
  winReducer,
  rewardReducer,
  claimReducer,
  loadingReducer,
  modalReducer,
})

export default Reducer

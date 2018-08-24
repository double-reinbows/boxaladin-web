// @flow
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
import loadingTimeReducer from './loadingTimeReducer'
import priceReducer from './priceReducer'
import walletReducer from './walletReducer'

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
  loadingTimeReducer,
  priceReducer,
  walletReducer
})

export default Reducer

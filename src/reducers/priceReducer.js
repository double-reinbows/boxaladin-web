const defaultState = {
	priceData: []
}

const priceReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_PRICES':
      return {...state, priceData: action.payload}

  default:
    return state
  }
}

export default priceReducer

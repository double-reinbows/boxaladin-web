const defaultState = {
  brands: []
}

const brandReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_BRANDS':
      return {...state, brands: action.payload}

  default:
    return state
  }
}

export default brandReducer

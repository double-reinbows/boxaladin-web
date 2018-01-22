const defaultState = {
  products: []
}

const productReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, products: action.payload}

  default:
    return state
  }
}

export default productReducer

const defaultState = {
  products: [],
  filteredProducts: []
}

const productReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, products: action.payload}

    case 'GET_FILTERED_PRODUCTS':
      return {...state, filteredProducts: action.payload}

  default:
    return state
  }
}

export default productReducer

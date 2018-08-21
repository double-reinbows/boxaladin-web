const defaultState = {
  products: [],
  filteredProducts: [],
  // cart: [],
  selectedPriceID: ''
}

const productReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_PRODUCTS':
      return {...state, products: action.payload}

    case 'GET_FILTERED_PRODUCTS':
      return {...state, filteredProducts: action.payload}

    // case 'UPDATE_CART':
    //   return {...state, cart: action.payload}

    case 'SELECT_PRICE_ID':
      return {...state, selectedPriceID: action.payload}

  default:
    return state
  }
}

export default productReducer

const defaultState = {
  categories: []
}

const categoryReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_CATEGORIES':
      return {...state, categories: action.payload}

  default:
    return state
  }
}

export default categoryReducer

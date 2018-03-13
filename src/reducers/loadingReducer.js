const defaultState = {
  isLoading: false
}

const loadingReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOADING':
      return {...state, isLoading: action.payload}

  default:
    return state
  }
}

export default loadingReducer

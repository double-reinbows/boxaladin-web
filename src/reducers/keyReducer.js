const defaultState = {
	keys: []
}

const keyReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'GET_KEYS':
      return {...state, keys: action.payload}

  default:
    return state
  }
}

export default keyReducer

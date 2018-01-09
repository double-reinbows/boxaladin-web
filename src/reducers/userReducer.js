const defaultState = {
  first_name: '',
  family_name: ''
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, first_name: action.payload.data.data.first_name, family_name: action.payload.data.data.family_name}

  default:
    return state
  }
}

export default userReducer

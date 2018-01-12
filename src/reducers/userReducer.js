const defaultState = {
  isLogin: null
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isLogin: true}

    case 'LOGOUT':
      return {...state, isLogin: false}

  default:
    return state
  }
}

export default userReducer

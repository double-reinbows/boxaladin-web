const defaultState = {
  isLogin: null,
  dataUser: null,
  phoneNumbers: [],
  userInfo: {}
}

const userReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {...state, isLogin: true}

    case 'LOGOUT':
      return {...state, isLogin: false, dataUser: null, phoneNumbers: []}

    case 'GET_PHONE_NUMBERS':
      return {...state, phoneNumbers: action.payload}

    case 'GET_USER':
      return {...state, userInfo: action.payload}

  default:
    return state
  }
}

export default userReducer

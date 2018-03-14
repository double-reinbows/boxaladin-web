const defaultState = {
  modalLogin: false,
  modalRegister: false,
}

const modalReducer = (state=defaultState, action) => {
  switch (action.type) {
    case 'SET_MODAL_LOGIN':
      return {...state, modalLogin: action.payload}

    case 'SET_MODAL_REGISTER':
      return {...state, modalRegister: action.payload}

  default:
    return state
  }
}

export default modalReducer

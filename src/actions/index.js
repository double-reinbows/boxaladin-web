// @flow
import axios from 'axios'

export const loginAction = (payload) => ({
  type: 'LOGIN',
  payload
})

export const logoutAction = (payload) => ({
  type: 'LOGOUT',
  payload
})

const getPhoneNumbersAction = (payload) => ({
  type: 'GET_PHONE_NUMBERS',
  payload
})

export const setIsLoading = (payload) => ({
  type: 'LOADING',
  payload
})

export const setModalLogin = (payload) => ({
  type: 'SET_MODAL_LOGIN',
  payload
})

export const setModalRegister = (payload) => ({
  type: 'SET_MODAL_REGISTER',
  payload
})

export const getPhoneNumbers = () => {
  return (dispatch) => {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_HOST}/phoneNumbers`,
      headers: {
        token: localStorage.getItem('token'),
        key: process.env.REACT_APP_KEY
      }
    })
    .then(({data}) => {
      dispatch(getPhoneNumbersAction(data.data))
    })
    .catch(err => console.log(err))
  }
}

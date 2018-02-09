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


  export const getPhoneNumbers = () => {
    return (dispatch) => {
      axios({
        method: 'GET',
        url: `http://localhost:3000/phoneNumbers`,
        headers: {
          token: localStorage.getItem('token')
        }
      })
      .then(({data}) => {
        dispatch(getPhoneNumbersAction(data.data))
      })
      .catch(err => console.log(err))
    }
  }

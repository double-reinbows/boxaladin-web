module.exports = {
  loginAction: (payload) => ({
    type: 'LOGIN',
    payload: payload
  }),
  logoutAction: (payload) => ({
    type: 'LOGOUT',
    payload: payload
  })
}

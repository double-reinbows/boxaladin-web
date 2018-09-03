export default function signUpInputToLowerHandler(email) {
  const user = email.split('@')[0]
  const provider = email.split('@')[1]

  if (provider === 'gmail.com') {
    let userWithoutDot = user.split('.').join('')
    const result = userWithoutDot + '@gmail.com'
    // this.setState({ email : result.trim().toLowerCase(), typedEmail: email })
    return result.trim().toLowerCase();
  }
  else {
    // const result = e.target.value
    // this.setState({ email : result.trim().toLowerCase(), typedEmail: email})
    return email.trim().toLowerCase();
  }
}

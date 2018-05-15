//@flow
import React from 'react';
// import { connect } from 'react-redux';
import ResetPasswordForm from './Components/ResetPassword/ResetPasswordForm';
import PasswordChanged from './Components/ResetPassword/PasswordChanged'

type Props = {
  location: {
    search: string,
  },
}
type State = {
  render: JSX,
}
export default class ResetPassword extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.passwordChanged = this.passwordChanged.bind(this);
  }
  state = {
    render: true,
  }

  passwordChanged = () => {
    this.setState({
      render: false,
    })
  }
  render() {
    const {match} = this.props
    // const id = match.params.id
    // const email:string = this.props.location.search.email;
    // const email_token:string = this.props.location.search.encoded;
    const email:string = match.params.email;
    const email_token:string = match.params.email_token;
    // console.log(email, email_token);
    const component = this.state.render ?
      (<ResetPasswordForm email={email} email_token={email_token} passwordChanged={this.passwordChanged }/>)
      : (<PasswordChanged />)
    return (
      <div>
        {component}
      </div>
    )
  }

}

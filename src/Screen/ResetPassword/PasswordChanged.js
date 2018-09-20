//@flow
import React from 'react'
import { withRouter } from 'react-router-dom';

type Props = {
}
type State = {
}

class PasswordChanged extends React.Component<Props, State> {

  componentDidMount() {
    this.Home()
  }

  Home() {
    setTimeout(() => {
      this.props.history.push('/');
    }, 3000)
  }

  render() {
    return (
      <div className="resetPassword">
        <div className="resetPassword__box">
          <h1 className="resetPassword__textSuccess">Password Anda telah berhasil diganti. Selamat BERBELANJA!</h1>
          <div className="resetPassword__img">
            <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/User/checked.png" alt="Check Icon"/>
          </div>
          <div className="resetPassword__wrapper__about">
            <div className="resetPassword__textWarning">
              <h1>INGAT PULSA ? INGAT</h1>
            </div>
            <div className="resetPassword__image">
              <img className="resetPassword__logo" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Logo/logoTextOnly.png" alt="Boxaladin"/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}


export default withRouter(PasswordChanged)

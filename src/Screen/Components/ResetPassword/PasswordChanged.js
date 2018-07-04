//@flow
import React from 'react'

type Props = {
}
type State = {
}
export default class PasswordChanged extends React.Component<Props, State> {
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

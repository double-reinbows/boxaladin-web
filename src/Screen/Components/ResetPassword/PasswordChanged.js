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
            <img src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/checked.png" alt="Check Icon"/>
          </div>
          <h1 className="resetPassword__textSuccess">INGAT PULSA ? INGAT
            <img className="resetPassword__logo" src="https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/logoTextOnly.png" alt="Boxaladin"/>
          </h1>
        </div>
      </div>
    )
  }

}

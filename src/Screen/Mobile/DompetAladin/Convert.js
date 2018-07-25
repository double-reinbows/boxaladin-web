//@flow
import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUser } from '../../../actions/userAction';
import envChecker from '../../../utils/envChecker'
class convert extends Component {
  constructor(props) {
    super(props)
    this.state = {
      disabled: true,
      key: 0
    }
  }

  showButton = () => {
    const buttonPrice = [
      {convert1: 1, text1:'1', convert2: 2, text2:'2'},
      {convert1: 3, text1:'3', convert2: 5, text2:'5'},
      {convert1: 10, text1:'10', convert2: this.props.userInfo.aladinKeys, text2:'MAX',},
    ]

    return buttonPrice.map((data, idx) => (
      <div key={idx} className="mobile__topup__button__container">
        <button onClick={this.convertButton} value={data.convert1} className="mobile__topup__button">{data.text1}</button>
        <button onClick={this.convertButton} value={data.convert2} className="mobile__topup__button">{data.text2}</button>
      </div>
    ))
  }

  convertButton = (e) => {
    this.setState({ 
      key:  e.target.value,
      disabled: false
    })
  }

  upCoin = (e) => {
		e.preventDefault()
		// CEK SISA ALADIN KEY LANGSUNG DARI API
    axios({
      method: 'GET',
      headers: {
        token: localStorage.getItem('token'),
      },
      url: `${envChecker('api')}/users/checkuser`,
    })
    .then(data => {
      if (data.data.message === 'not verified user') {
				return this.setState({
					notif: "Email Belum Terferivikasi.",
        })      
      } else if (this.state.key > data.data.aladinKeys) {
				return this.setState({
					notif: "Aladin Key Tidak Cukup",
				})
      } 
      else {
				// REQUEST UPDATE ALADIN KEY DAN COIN KE API
				axios({
					method: 'PUT',
          url: `${envChecker('api')}/users/upcoin`,
          headers: {
              token: localStorage.getItem('token'),
          },
					data: {
						key: this.state.key
					},
				})
				.then(response => {
					this.setState({
						key: ''
          })
          window.location.reload();

				})
				.catch(err => console.log(err))
			}
		})
		.catch(err => console.log(err))
	}

  render() {
    return (
      <div>
        <h2 className="mobile__pulsa__label">Pilih Nominal untuk Tukar</h2>
        <div style={{textAlign:'center'}}>
          {this.showButton()}
          <div >
          <button disabled={this.state.disabled} onClick={this.upCoin} className="mobile__topup__button__convert">Tukar</button>
          </div>
          <label>{this.state.notif}</label>
        </div>
        <h2 className="mobile__pulsa__label">1 = 1</h2>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    userInfo: state.userReducer.userInfo,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: () => dispatch(getUser()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(convert)

export default connectComponent

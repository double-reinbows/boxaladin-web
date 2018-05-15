
import React from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios'

import Koin from '../../../src/asset/Dompet Aladin/Koin.png'
import Key from '../../../src/asset/Dompet Aladin/Key.png'
import Troly from '../../../src/asset/Dompet Aladin/troly.png'
import Switch from '../../../src/asset/Dompet Aladin/circle.png'
// import TopUpKey from './TopupKey'

import { getUser } from '../../actions/userAction'
import { getUserWins } from '../../actions/winAction'
import { getKeys } from '../../actions/keyAction'

import FormatRupiah from '../../utils/formatRupiah'

class Dompet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idKeySelected: '',
      convertKey: '',
      key: null,
      notif: '',
      notif2: '',
      disabled: true
    }
  }

  render() {
    return (
      <div className="dompet">
        <div className="dompet__container">
          <div className="dompet__content">
            <label className="dompet__content__title">Dompet Aladin</label>
            <div className="dompet__content__info">
              <label>Kunci</label>
              <div>
                <img className="dompet__content__info__icon" src={Key} alt="key" />
                <label>: {this.props.userInfo.aladinKeys}</label>
              </div>
            </div>
            <div className="dompet__content__info">
              <label>Koin</label>
              <div>
                <img className="dompet__content__info__icon" src={Koin} alt="koin" />
                <label className="dompet__content__info__label">: {this.props.userInfo.coin}</label>
              </div>
            </div>

          </div>
          <div className="dompet__content__key">
            <div className="dompet__content__key__topup">
              <h1 className="dompet__content__key__label">Top Up Kunci Aladin</h1>
              {this.showForm()}
            </div>
            <div>
              <label className="dompet__content__key__label">Tukar Kunci Jadi Koin</label>
              {this.dropdownConvert()}
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount() {
      this.props.getUser()
      this.props.getKeys()
  }

  showForm() {
    return (
      <div>
        <div>
          <Form onSubmit={(e) => this.submitForm(e)}>
            <FormGroup>
              <Input className="dompet__content__key__topup__dropdown" type="select" name="aladinTopup" onChange={(e) => this.setState({ idKeySelected: e.target.value })}>
                <option selected="true" disabled="true" value=''>-- Select --</option>
                {this.props.keys.map((data, i) => {
                  return (
                    <option key={i} value={data.id}>{data.keyAmount} Kunci - {FormatRupiah(data.price)}</option>
                  )
                })}
              </Input>
            </FormGroup>
            <FormGroup>
                <button className="dompet__content__key__button" color="primary" type="submit">
                <img className="dompet__content__info__icon" src={Troly} alt="troly" />
                Beli</button>
            </FormGroup>
          </Form>
      </div>
        <div>
          <label className="alert__dompetAladin">{this.state.notif}</label>
        </div>
      </div>
    )
  }

  submitForm(e) {
    e.preventDefault()
    if (this.state.idKeySelected === '') {
      this.setState({
        notif: "Harus Pilih Salah Satu Voucher Aladin Key.",
      })
    } else {
        axios({
        method: 'POST',
        headers: {
            token: localStorage.getItem('token'),
            key: process.env.REACT_APP_KEY
            },
        url: `${process.env.REACT_APP_API_HOST}/topupKey`,
        data: {
            keyId: this.state.idKeySelected
        }
      })
      .then(({ data }) => {
          if (data.msg === 'not verified user') {
              return this.setState({
                  notif: "Silahkan Verifikasi Email Untuk Membeli Kunci.",
              })
          } else {
              this.props.history.push(`/topupinvoice/${data.id}`)
          }
      })
      // .catch(err => console.log('error'))
      .catch(err => console.log(err))
      }
    }

    handleChangeKey =(e) => {
      this.setState({
        key: parseInt(e.target.value, 10),
        disabled: false
      })
    }

    dropdownConvert=()=>{
      return(
      <div>
        <div>
          <Form onSubmit={this.upCoin}>
            <FormGroup>
              <Input className="dompet__content__key__topup__dropdown" type="select" id="upcoin" name="aladinConvert" onChange={(e) => this.setState({ key: parseInt(e.target.value, 10) })}>
                <option selected="true" disabled="true" value=''>-- Select --</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={5}>5</option>
                <option value={this.props.userInfo.aladinKeys}>max</option>
              </Input>
            </FormGroup>
            <label style = {{fontSize: "18px"}}>1 Kunci Aladin = 5 Koin</label>
            <FormGroup>
                <button className="dompet__content__key__button" color="primary" type="submit">
                <img className="dompet__content__info__icon" src={Switch} alt="Switch" />
                Tukar</button>
            </FormGroup>
          </Form>
        </div>
      <div>
        <label className="alert__dompetAladin">{this.state.notif2}</label>
      </div>
    </div>
      )
    }

    upCoin = (e) => {
		e.preventDefault()
		if (this.state.key <= 0) {
			return this.setState({
        notif2: "Jumlah Kunci Tidak Boleh 0",
      })
		} else if (this.state.key === null || this.state.key === '') {
			return this.setState({
				notif2: "Tidak Boleh Kosong",
			})
		}	else {
			this.setState({
				notif2:""
			})
		}

		// CEK SISA ALADIN KEY LANGSUNG DARI API
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API_HOST}/users/info`,
			headers: {
        token: localStorage.getItem('token'),
        key: process.env.REACT_APP_KEY
			}
		})
		.then(({data}) => {
			if (this.state.key > data.aladinKeys) {
				return this.setState({
					notif2: "Aladin Key Tidak Cukup",
				})
			} else {

				// REQUEST UPDATE ALADIN KEY DAN COIN KE API
				axios({
					method: 'PUT',
          url: `${process.env.REACT_APP_API_HOST}/users/upcoin`,
          headers: {
              token: localStorage.getItem('token'),
              key: process.env.REACT_APP_KEY
          },
					data: {
						key: this.state.key
					},
				})
				.then(response => {
					this.setState({
						coin: 0,
						key: null
					})
          this.props.getUser();
          window.location.reload();

				})
				.catch(err => console.log('error'))
			}
		})
		.catch(err => console.log('error'))
	}
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.userReducer.userInfo,
        userWins: state.winReducer.userWins,
        keys: state.keyReducer.keys
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: () => dispatch(getUser()),
        getUserWins: () => dispatch(getUserWins()),
        getKeys: () => dispatch(getKeys())
    }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Dompet)

export default connectComponent

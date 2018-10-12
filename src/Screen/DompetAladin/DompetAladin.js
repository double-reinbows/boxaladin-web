import React from 'react'
import { connect } from 'react-redux'
import { Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import MediaQuery from 'react-responsive';
import ModalPayment from '../Components/Modal/ModalPayment'
// import TopUpKey from './TopupKey'

// import { getUser } from '../../actions/userAction'
import { getUserWins } from '../../actions/winAction'
import { getKeys } from '../../actions/keyAction'

import FormatRupiah from '../../utils/formatRupiah'
import envChecker from '../../utils/envChecker'
import Menu from '../Mobile/DompetAladin/Menu'
class Dompet extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      idKeySelected: '',
      convertKey: '',
      key: null,
      wallet: '',
      notif: '',
      notif2: '',
      disabled: true,
      modalPayment1: false,
      modalPayment2: false
    }
  }

  render() {
    return (
      <div>
        <MediaQuery query="(max-device-width: 720px)">
          <Menu/>
        </MediaQuery>

        <MediaQuery query="(min-device-width: 721px)">
              <div className="dompet">
        <div className="dompet__container">
          <div className="dompet__content">
            <label className="dompet__content__title">Dompet Aladin</label>
            <div className="dompet__content__info">
              <label>Kunci</label>
              <div>
                <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/Key.png' alt="key" />
                <label>: {this.props.userInfo.aladinKeys}</label>
              </div>
            </div>
            <div className="dompet__content__info">
              <label>Koin</label>
              <div>
                <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/koin-v2.png' alt="koin" />
                <label className="dompet__content__info__label">: {this.props.userInfo.coin}</label>
              </div>
            </div>
            <div className="dompet__content__info">
              <label>Uang</label>
              <div>
                <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/uang.png' alt="uang" />
                <label className="dompet__content__info__label">: {this.formatRupiahSaldo()}</label>
              </div>
            </div>

          </div>
          <div className="dompet__content__key">
            <div className="dompet__content__key__topup">
              <h1 className="dompet__content__key__label">Top Up Kunci</h1>
              {this.showFormKey()}
              <label className="alert__dompetAladin">{this.state.notif}</label>
            </div>

            <div>
              <label className="dompet__content__key__label">Tukar Kunci Jadi Koin</label>
              {this.dropdownConvert()}
            </div>

            <div style={{ paddingTop: '14%' }}>
              <label className="dompet__content__key__label">Top Up Uang</label>
              {this.dropdownSaldoWallet()}
            </div>

          </div>
        </div>
        </div>
        </MediaQuery>
        </div>
    )
  }

  componentDidMount() {
      // this.props.getUser()
      this.props.getKeys()
  }

  togglePayment1 = () => {
    this.setState({
      modalPayment1: !this.state.modalPayment1
    })
  }
  togglePayment2 = () => {
    this.setState({
      modalPayment2: !this.state.modalPayment2
    })
  }

  handleInputWallet = (e) => {
    this.setState({
      wallet: parseInt(e.target.value, 10)
    });
  }

  dropdownSaldoWallet= ()=>{
    return(
    <div>
      <div>
        <Form onSubmit={this.upWallet}>
          <FormGroup>
            <Input className="dompet__content__key__topup__dropdown" type="number" id="upcoin" name="aladinConvert" placeholder="Minimal Rp. 50.000,00" value={this.state.wallet} onChange={this.handleInputWallet}/>
          </FormGroup>
          <label style = {{fontSize: "18px"}}>Uang tidak boleh melebihi Rp 2.000.000</label>
          <FormGroup>
            <button className="dompet__content__key__button" color="primary" type="submit">
            <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/troly.png' alt="troly" />
            Setor</button>
          </FormGroup>
        </Form>
      </div>
    <div>
      <label className="alert__dompetAladin">{this.state.notif3}</label>
    </div>
    <ModalPayment
      typeBuy='buy wallet'
      fixedendpoint='fixedwallet'
      retailendpoint='alfawallet'
      bcaendpoint='bca/wallet'
      isOpen={this.state.modalPayment1}
      data={this.state.wallet}
      toggle={this.togglePayment1}
      endpoint='walletstatus'
      />
  </div>
    )
  }

  upWallet = (e, payload) => {
    e.preventDefault()
    if (this.state.wallet === 0 || this.state.wallet === '') {
      this.setState({
        notif3: "Silahkan Memilih Jumlah Saldo.",
      })
    } else if (this.state.wallet < 50000) {
      this.setState({
        notif3: "Minimal setoran adalah Rp. 50.000",
      })
    } else if (this.props.userInfo.wallet + this.state.wallet > 2000000) {//Top-up greater than 2jt
      let allowedAmount = 2000000 - this.props.userInfo.wallet
      this.setState({
        notif3: "Anda hanya bisa setor hingga "+FormatRupiah(allowedAmount),
      })
    } else {
      this.setState({
        modalPayment1: true
      })
      payload ={wallet: this.state.wallet}
    }

  }

  formatRupiahSaldo() {
    return this.props.userInfo.wallet && (
      FormatRupiah(this.props.userInfo.wallet)
    )
  }

  showFormKey() {
    return (
      <div>
        <div>
          <Form onSubmit={(e) => this.submitForm(e)}>
            <FormGroup>
              <Input className="dompet__content__key__topup__dropdown" type="select" name="aladinTopup" onChange={(e) => this.setState({ idKeySelected: e.target.value })}>
                <option selected="true" disabled="true" value=''>-- Select --</option>
                {this.props.keys.filter (data => {
                  return data.keyAmount !== 0
                })
                .map((dataFilter, index) => {
                  return (
                    <option key={index} value={dataFilter.id}>{dataFilter.keyAmount} Kunci - {FormatRupiah(dataFilter.price)}</option>
                  )
                })
                }
                {/* {this.props.keys.map((data, i) => {
                  return (
                  )
                })} */}
              </Input>
            </FormGroup>
            <FormGroup>
                <button className="dompet__content__key__button" color="primary" type="submit">
                <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/troly.png' alt="troly" />
                Beli</button>
            </FormGroup>
          </Form>
      </div>
      <ModalPayment
        typeBuy='buy key'
        fixedendpoint='topupva'
        retailendpoint='topupKey'
        walletendpoint='walletkey'
        bcaendpoint='bca/key'
        isOpen={this.state.modalPayment2}
        data={this.state.idKeySelected}
        toggle={this.togglePayment2}
        endpoint='topup'
        />
      </div>
    )
  }

  submitForm(e) {
    e.preventDefault()
    if (this.state.idKeySelected === '') {
      return this.setState({
        notif: "Silahkan Memilih Jumlah Kunci.",
      })
    } else {
      this.setState({
        modalPayment2: true
      })
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
                <img className="dompet__content__info__icon" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/circle.png' alt="Switch" />
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
      headers: {
        token: localStorage.getItem('token'),
      },
      url: `${envChecker('api')}/users/checkuser`,
    })
    .then(data => {
      if (this.state.key > data.aladinKeys) {
				return this.setState({
					notif2: "Aladin Key Tidak Cukup",
				})
			} else {
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
						coin: 0,
						key: null
					})
          // this.props.getUser();
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
        // getUser: () => dispatch(getUser()),
        getUserWins: () => dispatch(getUserWins()),
        getKeys: () => dispatch(getKeys())
    }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(Dompet)

export default connectComponent

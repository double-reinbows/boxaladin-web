//@flow
import React from 'react';
import { connect } from 'react-redux';
import {
	Button,
	Form,
	FormGroup,
	Input
} from 'reactstrap';
import axios from 'axios';

import { getProducts } from '../actions/productAction';
import { detectProvider } from '../utils/phone'

class ClaimFreePulsa extends React.Component<Props, State> {

	state = {
    win: this.props.history.location.state || null,
    phone: null,
  }

	submit(e) {
    e.preventDefault();

    if (this.state.phone === null) {
      return alert('Harus masukan nomor HP.')
    } else if(detectProvider(this.state.phone)) {
      var num = this.state.phone.split('')
      if (num[0] === '0') {
        num.splice(0, 1, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.claimPulsa()})
      } else if (num[0] + num[1] + num[2] === '+62') {
        num.splice(0, 3, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.claimPulsa()})
      } else if (num[0] + num[1] === '62') {
        num.splice(0, 2, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.claimPulsa()})
      } else if (num[0] === '8') {
        num.splice(0, 0, '0')
        this.setState({
          phone: num.join('')
        },
        () => {this.claimPulsa()})
      }
    } else {
      return alert('Nomor Hp Tidak Sesuai Provider')

    }
  }

  claimPulsa(){
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/win/claimfreepulsa`,
      headers: {
        token: localStorage.getItem('token'),
        // key: process.env.REACT_APP_KEY
      },
      data: {
        phone: this.state.phone,
        winToken: this.state.win,
      }
    })
    .then(({data}) => {
      console.log('data', data)
			if (data === 'Error') {
				alert('Ada masalah dengan nomor yang Anda masukkan. Silakan hubungi CS di LINE @boxaladin');
			} else {
				alert('Selamat! Anda berhasil mendapatkan pulsa gratis! Silakan bermain lagi sampai puas!');
			}
      this.props.history.push('/game');
    })
    .catch(err => {
			alert('Ada masalah dengan nomor yang Anda masukkan. Silakan hubungi CS di LINE @boxaladin');
			this.props.history.push('/game');
    })
  }

	componentDidMount() {
		this.checkWinToken();
    this.props.getProducts();
  }

  checkWinToken() {
    if (this.state.win === null) {
			alert(`Maaf ada masalah di sistem kami. Silakan hubungi Customer Service kami
							di LINE @boxaladin`);
      this.props.history.push('/');
    }
  }

	render() {
		return (
			<div className="TopupKey">
        <h1 className="TopupKey__text">Silahkan Masukan Nomor HP dan Jenis Pulsa</h1>

        <Form onSubmit={ (e) => this.submit(e) }>
          <FormGroup>
            <Input onChange={(e) => this.setState({ phone: e.target.value })} type="number" placeholder="Nomor HP" />
          </FormGroup>

          {/* <FormGroup>
            <Input type="select" onChange={(e) => this.setState({ pulsaCode: e.target.value })}>
              <option selected disabled value={ null }>-- Pilih Pulsa --</option>
              <option value='htelkomsel10000'>Pulsa Telkomsel 10.000</option>
              <option value='xld10000'>Pulsa XL 10.000</option>
              <option value='hindosat10000'>Pulsa Indosat 10.000</option>
              <option value='hthree10000'>Pulsa Three 10.000</option>
              <option value='hsmart10000'>Pulsa Smart 10.000</option>

               {pulsa.map((data, i) => {
                return (
                  <option key={i} value={data.id}>{data.productName}</option>
                )
              })}
            </Input>
          </FormGroup> */}

          <FormGroup>
            <Button type="submit"> submit </Button>
          </FormGroup>
        </Form>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
    products: state.productReducer.products,
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
    getProducts: () => dispatch(getProducts()),
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(ClaimFreePulsa);

export default connectComponent;

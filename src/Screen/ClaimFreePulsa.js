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
import envChecker from '../utils/envChecker'

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
      url: `${envChecker('api')}/win/claimfreepulsa`,
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

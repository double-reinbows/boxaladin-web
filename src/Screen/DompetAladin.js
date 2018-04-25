
import React from 'react'
import { connect } from 'react-redux'
import { Button, Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import Coin from '../../src/asset/Game/coin.svg'
// import Star from '../../src/asset/Game/star.svg'
import { getUser } from '../actions/userAction'
import { getUserWins } from '../actions/winAction'
import { getKeys } from '../actions/keyAction'
class Dompet extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isRunning: false,
            key: null,
            freeKey: 0,
            dKeySelected: '',
            notif: '',
            notif2: '',
        }
    }

    render() {
        return (
            <div className="game">
                <div className="game__container">
                    <div className="game__slotLabel">
                        <h1 className="game__slotLabel__h1">Dompet Aladin</h1>
                    </div>

                    <div>
                        <div className="game__container2">
                            <div className="game__convert">
                                <div className="game__convert__label">
                                    <label>Aladin Key : {this.props.userInfo.aladinKeys}</label>
                                </div>
                                <div className="game__slotCoin">
                                    <img className="game__slotCoin__icon" src={Coin} alt="coin images" />
                                    <label className="game__slotCoin__label">Your Coin : {this.props.userInfo.coin}</label>
                                </div>

                                <label className="game__slotLabel__paragraph">Tukar Aladin Key Menjadi Koin :</label>

                                <div>
                                    <form onSubmit={(e) => this.upCoin(e)}>
                                        <input className="game__convert__input" min="1" id="upcoin" onChange={(e) => this.setState({ key: parseInt(e.target.value, 10) })} type="number" placeholder="1 aladin key = 5 coin" />
                                        <button className="game__convert__buttonConvert">TUKAR</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <label className="alert__dompetAladin">{this.state.notif2}</label>
                    </div>

                    <div className="TopupKey">
                        <h1 className="TopupKey__text">Isi Ulang Aladin Key</h1>
                        {this.showForm()}
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
                            <Input className="TopupKey__dropdown" type="select" name="aladinTopup" onChange={(e) => this.setState({ idKeySelected: e.target.value })}>
                                <option selected="true" disabled="true" value=''>-- Select --</option>
                                {this.props.keys.map((data, i) => {
                                    return (
                                        <option key={i} value={data.id}>{data.keyAmount} Kunci - Rp. {data.price.toLocaleString(['ban', 'id'])}</option>
                                    )
                                })}
                            </Input>
                        </FormGroup>

                        <FormGroup>
                            <Button color="primary" type="submit" size="lg" block>Beli</Button>
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
                url: `${process.env.REACT_APP_API_HOST}/topupKey`,
                data: {
                    keyId: this.state.idKeySelected
                },
                headers: {
                    token: localStorage.getItem('token')
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
                .catch(err => console.log('Error:', err))
        }
    }

    // upCoin(e) {
    //     e.preventDefault()

    //     if (this.state.key > this.props.userInfo.aladinKeys) {
    //         return this.setState({
    //             notif2: "Aladin Key Tidak Cukup",
    //         })
    //     }

    //     if (this.state.key <= 0) {
    //         return this.setState({
    //             notif2: "Harus Lebih Besar Dari 0",
    //         })
    //     }

    //     if (this.state.key) {
    //         axios({
    //             method: 'PUT',
    //             url: `${process.env.REACT_APP_API_HOST}/users/upcoin`,
    //             data: {
    //                 key: this.state.key
    //             },
    //             headers: {
    //                 token: localStorage.getItem('token')
    //             }
    //         })
    //             .then(response => {

    //                 this.setState({
    //                     coin: 0
    //                 })

    //                 document.getElementById('upcoin').value = ''
    //                 this.props.getUser()
    //                 return console.log(response.data)

    //             })
    //             .catch(err => console.log(err))

    //     } else {
    //         return alert('tidak boleh kosong')
    //     }

    // }

    upCoin(e) {
		e.preventDefault()

		if (this.state.key <= 0) {
			return this.setState({
        notif2: "Harus Lebih Besar Dari 0",
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
				token: localStorage.getItem('token')
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
					data: {
						key: this.state.key
					},
					headers: {
						token: localStorage.getItem('token')
					}
				})
				.then(response => {

					this.setState({
						coin: 0,
						key: null
					})

					document.getElementById('upcoin').value = ''
					this.props.getUser()
					return console.log(response.data)

				})
				.catch(err => console.log(err))

			}
		})
		.catch(err => console.log(err))
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

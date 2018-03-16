import React from 'react'
import { connect } from 'react-redux'
import { Modal, ModalHeader, Button, Form, FormGroup, Input  } from 'reactstrap'
import axios from 'axios'
import Coin from '../../src/asset/Game/coin.svg'
import Star from '../../src/asset/Game/star.svg'
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
            dKeySelected: ''
        }
    }

    render() {
        console.log('State:', this.state)
        console.log('Props:', this.props)

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
                                    <label>Your Aladin Key : {this.props.userInfo.aladinKeys}</label>
                                </div>
                                <div className="game__slotCoin">
                                    <img className="game__slotCoin__icon" src={Coin} alt="coin image" />
                                    <label className="game__slotCoin__label">Your Coin : {this.props.userInfo.coin}</label>
                                </div>

                                <p className="game__slotLabel__paragraph">Convert your aladin key to coin here: </p>

                                <div>
                                    <form onSubmit={(e) => this.upCoin(e)}>
                                        <input className="game__convert__input" min="1" id="upcoin" onChange={(e) => this.setState({ key: parseInt(e.target.value) })} type="number" placeholder="1 aladin key = 10 coin" />
                                        <button className="game__convert__buttonConvert">CONVERT</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="TopupKey">
                        <h1 className="TopupKey__text">Top Up Your Aladin Key</h1>
                        {this.showForm()}
                    </div>
                </div>
            </div>
        )
    }

    componentDidMount() {
        this.props.getUser(),
        this.props.getKeys()
    }

    showForm() {
        return (
            <Form onSubmit={(e) => this.submitForm(e)}>
                <FormGroup>
                    <Input type="select" name="aladinTopup" onChange={(e) => this.setState({ idKeySelected: e.target.value })}>
                        <option value=''>-- Select --</option>
                        {this.props.keys.map((data, i) => {
                            return (
                                <option key={i} value={data.id}>{data.keyAmount} keys - Rp.{data.price}</option>
                            )
                        })}
                    </Input>
                </FormGroup>

                <FormGroup>
                    <Button color="primary" type="submit" size="lg" block>Topup</Button>
                </FormGroup>
            </Form>
        )
    }

    submitForm(e) {
        e.preventDefault()

        if (this.state.idKeySelected === '') {
            alert('Harus pilih salah satu voucher aladin key.')
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
                    console.log('Response.data:', data)
                    this.props.history.push(`/topupinvoice/${data.id}`)
                })
                .catch(err => console.log('Error:', err))
        }
    }

    upCoin(e) {
        e.preventDefault()

        if (this.state.key > this.props.userInfo.aladinKeys) {
            return alert('aladin key tidak cukup')
        }

        if (this.state.key <= 0) {
            return alert('harus lebih besar dari 0')
        }

        if (this.state.key) {

            // return alert(this.state.key)

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
                        coin: 0
                    })

                    document.getElementById('upcoin').value = ''
                    this.props.getUser()
                    return console.log(response.data)

                })
                .catch(err => console.log(err))

        } else {
            return alert('tidak boleh kosong')
        }

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

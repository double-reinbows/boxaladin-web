import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col
} from 'reactstrap';

import moment from 'moment'
import classnames from 'classnames';
import Xendit from 'xendit-js-node'

import MANDIRI from '../asset/Logo/MANDIRI.svg'
import BNI from '../asset/Logo/BNI.svg'
import BRI from '../asset/Logo/BRI.svg'

class InvoiceDetail extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      invoice: '',
      activeTab: '1',
      // amount: 0,
      ccNumber: '',
      ccExpiredMonth: '',
      ccExpiredYear: '',
      cvn: '',
      isOpen3dsModal: false,
      payer_auth_url: '',
      time: ''
    }

    this.toggle = this.toggle.bind(this);
    this.toggle3dsModal = this.toggle3dsModal.bind(this)
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {

    if (this.state.invoice.createdAt === ''){
      console.log('kosong')
    } else if ( this.state.invoice.createdAt === undefined){
      console.log('undefined')
    } else {
      const time = this.state.invoice.createdAt
      var finalTime = moment(time, moment.ISO_8601).add(6, 'hours').format('D MMMM YYYY, h:mm:ss a')
    }

    return (
      <div className="pembayaran">
        <div className="pembayaran__container">
          <h1 className="pembayaran__title">Menunggu pembayaran</h1>
          {this.state.invoice ? (
              <div>
                <h1 className="pembayaran__title">Jumlah yang harus di bayarkan Rp {this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h1>
                <h2 className="pembayaran__title">Selesaikan Pembayaran Sebelum {finalTime}</h2>
                <h5 className="pembayaran__title">Silahkan melakukan pembayaran ke salah satu virtual bank account di bawah ini:</h5>

                <div className="bankz">
                  <img src={MANDIRI} className="bankz__icon" alt="Logo" />
                    {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        bank.bank_code === 'MANDIRI' ? (
                          <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                        ) : null
                      )
                    })}
                </div>

                <div className="bankz">
                  <img src={BNI} className="bankz__icon" alt="Logo" />
                  {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        bank.bank_code === 'BNI' ? (
                          <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                        ) : null
                      )
                    })}
                </div>

                <div className="bankz">
                  <img src={BRI} className="bankz__icon" alt="Logo" />
                  {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        bank.bank_code === 'BRI' ? (
                          <div className="bankz__name" key={idx}>{bank.bank_code}: {bank.bank_account_number}</div>
                        ) : null
                      )
                  })}
                </div>

                <div style = { { padding: '10px'} }>
                  <h1 className="pembayaran__title" ><b> CARA PEMBAYARAN </b></h1>
                </div>

                  <div>
                    <Nav tabs>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '1' })}
                          onClick={() => { this.toggle('1'); }}
                        >
                          <h4><button style = {{  backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            border: "none",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none" }}>Mandiri</button></h4>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '2' })}
                          onClick={() => { this.toggle('2'); }}
                        >
                          <h4><button style = {{  backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            border: "none",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none" }}>BNI</button></h4>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          className={classnames({ active: this.state.activeTab === '3' })}
                          onClick={() => { this.toggle('3'); }}
                        >
                          <h4><button style = {{  backgroundColor: "Transparent",
                            backgroundRepeat: "no-repeat",
                            border: "none",
                            cursor: "pointer",
                            overflow: "hidden",
                            outline: "none" }}>BRI</button></h4>
                        </NavLink>
                      </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                      <TabPane tabId="1">
                        <Row>
                          <Col sm="12">
                            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
                            <div>
                              <div style = {{ fontSize: "15px", padding: '20px' }}>
                                <ol>
                                  <li>
                                    Masukkan kartu ATM dan pilih "Bahasa Indonesia"
                                  </li>
                                  <li>
                                    Ketik nomor PIN kartu ATM
                                  </li>
                                  <li>
                                    Pilih menu BAYAR/BELI, kemudian pilih menu MULTI PAYMENT
                                  </li>
                                  <li>
                                    Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[0].bank_account_number}
                                  </li>
                                  <li>
                                    Isi NOMINAL sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}, kemudian tekan "BENAR"
                                  </li>
                                  <li>
                                    Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, kemudian tekan "YA"
                                  </li>
                                  <li>
                                    Muncul konfirmasi pembayaran. Tekan "YA" untuk melakukan pembayaran
                                  </li>
                                  <li>
                                    Bukti pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah dari Bank Mandiri
                                  </li>
                                  <li>
                                    Transaksi Anda sudah selesai
                                  </li>
                                  <li>
                                    Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                  </li>
                                </ol>
                              </div>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div>
                              <div style = {{ fontSize: "15px", padding: '20px' }}>
                                <ol>
                                  <li>
                                    Kunjungi website Mandiri Internet Banking dengan alamat <a href="https://ib.bankmandiri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bankmandiri.co.id/</a>
                                  </li>
                                  <li>
                                    Login dengan memasukkan USER ID dan PIN
                                  </li>
                                  <li>
                                    Masuk ke halaman Beranda, lalu pilih "Bayar"
                                  </li>
                                  <li>
                                    "Multi Payment"
                                  </li>
                                  <li>
                                    Pilih "No Rekening Anda"
                                  </li>
                                  <li>
                                    Pilih "No Virtual Account"
                                  </li>
                                  <li>
                                    Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[0].bank_account_number}
                                  </li>
                                  <li>
                                    Masuk ke halaman konfirmasi 1
                                  </li>
                                  <li>
                                    Apabila benar/sesuai, klik tombol tagihan TOTAL, kemudian klik "Lanjutkan"
                                  </li>
                                  <li>
                                    Masuk ke halaman konfirmasi 2
                                  </li>
                                  <li>
                                    Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik "Kirim"
                                  </li>
                                  <li>
                                    Masuk ke halaman konfirmasi pembayaran telah selesai
                                  </li>
                                  <li>
                                    Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                  </li>
                                </ol>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda
                                </li>
                                <li>
                                  Pilih "Menu Lainnya" lalu pilih "Transfer"
                                </li>
                                <li>
                                  Pilih "Tabungan" lalu "Rekening BNI Virtual Account"
                                </li>
                                <li>
                                  Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[1].bank_account_number} dan nominal yang Anda bayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}
                                </li>
                                <li>
                                  Periksa kembali data transaksi kemudian tekan "YA"
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit
                                </li>
                              </ol>
                            </div>


                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Login di <a href="https://ibank.bni.co.id" target="_blank" rel="noopener noreferrer">https://ibank.bni.co.id</a>, masukkan USER ID dan PASSWORD
                                </li>
                                <li>
                                  Pilih "TRANSFER" lalu pilih "Tambah Rekening Favorit"
                                </li>
                                <li>
                                  Jika Anda menggunakan desktop untuk menambah rekening, pilih "Transaksi", pilih "Info & Administrasi Transfer" lalu pilih "Atur Rekening Tujuan" kemudian "Tambah Rekening Tujuan"
                                </li>
                                <li>
                                  Masukkan nama dan nomor Virtual Account Anda {this.state.invoice.payment.availableBanks[1].bank_account_number}, lalu masukkan Kode Otentikasi Token
                                </li>
                                <li>
                                   Jika Nomor rekening tujuan berhasil ditambahkan, kembali ke menu "TRANSFER"
                                </li>
                                <li>
                                   Pilih "TRANSFER ANTAR REKENING BNI", kemudian pilih rekening tujuan
                                </li>
                                <li>
                                   Pilih Rekening Debit dan ketik nominal, lalu masukkan kode otentikasi token
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                </li>
                              </ol>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>MBANKING</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Login ke BNI Mobile Banking, masukkan USER ID dan MPIN
                                </li>
                                <li>
                                  Pilih menu "Transfer", lalu pilih "Antar Rekening BNI"
                                </li>
                                <li>
                                  Pilih "Input Rekening Baru"
                                </li>
                                <li>
                                  Masukkan "Rekening Debet", "Rekening Tujuan ({this.state.invoice.payment.availableBanks[1].bank_account_number})" dan "Nominal sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}" kemudian klik "Lanjut"
                                </li>
                                <li>
                                  Periksa kembali data transaksi Anda, masukkan "Password Transaksi", kemudian klik "Lanjut"
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                </li>
                              </ol>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda
                                </li>
                                <li>
                                  Pilih "Transaksi Lain" lalu pilih "Pembayaran"
                                </li>
                                <li>
                                  Pilih "Lainnya" lalu pilih "Briva"
                                </li>
                                <li>
                                  Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[2].bank_account_number} dan nominal yang ingin Anda bayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}
                                </li>
                                <li>
                                  Periksa kembali data transaksi kemudian tekan "YA"
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                </li>
                              </ol>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Login di <a href="https://ib.bri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bri.co.id/</a> , masukkan USER ID dan PASSWORD
                                </li>
                                <li>
                                  Pilih "Pembayaran" lalu pilih "Briva"
                                </li>
                                <li>
                                  Masukkan nomor Virtual Account Anda {this.state.invoice.payment.availableBanks[2].bank_account_number}, nominal yang akan dibayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}, lalu klik kirim
                                </li>
                                <li>
                                  Masukkan kembali PASSWORD anda serta kode otentikasi mToken internet banking
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                </li>
                              </ol>
                            </div>
                            <center><h1 style = { { padding: '10px'} }><b>MBANKING</b></h1></center>
                            <div style = {{ fontSize: "15px", padding: '20px' }}>
                              <ol>
                                <li>
                                  Login ke BRI Mobile Banking, masukkan USER ID dan PIN anda
                                </li>
                                <li>
                                  Pilih "Pembayaran" lalu pilih "Briva"
                                </li>
                                <li>
                                  Masukkan nomor Virtual Account anda {this.state.invoice.payment.availableBanks[2].bank_account_number}, serta nominal yang akan dibayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}
                                </li>
                                <li>
                                  Masukkan nomor PIN anda dan klik "Kirim"
                                </li>
                                <li>
                                  Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.
                                </li>
                              </ol>
                            </div>

                          </Col>
                        </Row>
                      </TabPane>
                    </TabContent>
                  </div>
              </div>
            ) : null
          }
        </div>
      </div>
    )
  }

  componentDidMount() {
    this.getInvoiceById()
  }

  getTime(){
    if (this.state.invoice){

    }
  }

  submitPaymentWithCC(token) {
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API_HOST}/creditcard`,
      data: {
        tokenId: token,
        externalId: this.state.invoice.paymentId.toString(),
        amount: this.state.invoice.aladinPrice,
        cardCvn: this.state.cvn
      }
    })
    .then(({data}) => {
    
    })
    .catch(err => console.log(err))
  }

  toggle3dsModal() {
    this.setState({isOpen3dsModal: !this.state.isOpen3dsModal})
  }

  show3dsModal() {
    return (
      <div>
        <Modal isOpen={this.state.isOpen3dsModal} toggle={this.toggle3dsModal} className={this.props.className}>
          <ModalHeader toggle={this.toggle3dsModal}>Modal title</ModalHeader>
          <ModalBody>
            <iframe src={this.state.payer_auth_url} title="modal3ds"/>
          </ModalBody>
        </Modal>
      </div>
    )
  }

  createCCToken() {
    Xendit.setPublishableKey('xnd_public_development_OImFfL0l07evlc5rd+AaEmTDb9L38NJ8lXbg+Rxi/Gbe8LGkBQ93hg==')
    Xendit.card.createToken({
      amount: this.state.invoice.aladinPrice,
			card_number: this.state.ccNumber,
			card_exp_month: this.state.ccExpiredMonth,
			card_exp_year: this.state.ccExpiredYear,
			card_cvn: this.state.cvn,
			is_multiple_use: false
    }, (err, creditCardCharge) => {
    	if (err) {
    		console.log(err);

    		return;
    	}

    	if (creditCardCharge.status === 'VERIFIED') {

        console.log(creditCardCharge.status);
        var token = creditCardCharge.id;
    		console.log(token);
        this.submitPaymentWithCC(token)

    	} else if (creditCardCharge.status === 'IN_REVIEW') {

        console.log(creditCardCharge.status);
        console.log(creditCardCharge);
        console.log(creditCardCharge.payer_authentication_url);
        this.setState({payer_auth_url: creditCardCharge.payer_authentication_url})
        this.toggle3dsModal()

        // console.log(creditCardCharge.status);
        // var token = creditCardCharge.id;
    		// console.log(token);
        // this.submitPaymentWithCC(token)

      } else if (creditCardCharge.status === 'FAILED') {
        console.log(creditCardCharge.status);
      }
    }

  )}

  showTabs() {
    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '1' })}
              onClick={() => { this.toggle('1'); }}
            >
              <h3>Virtual Account</h3>
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({ active: this.state.activeTab === '2' })}
              onClick={() => { this.toggle('2'); }}
            >
              <h3>Credit Card</h3>
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={this.state.activeTab}>
          <TabPane tabId="1">
            {this.state.invoice ? (
                <div>
                  <h5>Silahkan melakukan pembayaran sejumlah {this.state.invoice.payment.amount} ke salah satu virtual bank account di bawah ini:</h5>
                  <ul>
                    {this.state.invoice.payment.availableBanks.map((bank, idx) => {
                      return (
                        <li key={idx}>{bank.bank_code}: {bank.bank_account_number}</li>
                      )
                    })}
                  </ul>
                </div>
              ) : null
            }
          </TabPane>
          <TabPane tabId="2">
          <h5>Credit Card</h5>

          <Form>

            <FormGroup>
              <Input type="text" value={this.state.invoice !== null ? this.state.invoice.aladinPrice : ''} disabled />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccNumber" onChange={(e) => this.setState({ccNumber: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredMonth" onChange={(e) => this.setState({ccExpiredMonth: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="ccExpiredYear" onChange={(e) => this.setState({ccExpiredYear: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Input type="text" placeholder="cvn" onChange={(e) => this.setState({cvn: e.target.value})} />
            </FormGroup>

            <FormGroup>
              <Button onClick={() => this.createCCToken()}>Submit</Button>
            </FormGroup>

          </Form>

          </TabPane>
        </TabContent>
      </div>
    )
  }

  // toggle(tab) {
  //   if (this.state.activeTab !== tab) {
  //     this.setState({activeTab: tab})
  //   }
  // }

  getInvoiceById() {
    axios({
      method: 'GET',
      url: `${process.env.REACT_APP_API_HOST}/transaction/${this.props.match.params.id}`
    })
    .then(({data}) => {
    this.setState({
      invoice: data
    })
  })
    .catch(err => console.log(err))
  }

}

const mapStateToProps = (state) => {
  return {
    //
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    //
  }
}

const connectComponent = connect(mapStateToProps, mapDispatchToProps)(InvoiceDetail)

export default connectComponent

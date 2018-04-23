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
    console.log('Props:', this.props);
    console.log('State:', this.state);

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
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Masukkan kartu ATM dan pilih "Bahasa Indonesia"</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Ketik nomor PIN kartu ATM</h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Pilih menu BAYAR/BELI, kemudian pilih menu MULTI PAYMENT</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[0].bank_account_number}</h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Isi NOMINAL sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}, kemudian tekan "BENAR"</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float : 'left', padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Muncul konfirmasi data customer. Pilih Nomor 1 sesuai tagihan yang akan dibayar, <div style = { { paddingLeft : '16px'}}> kemudian tekan "YA" </div></h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>7.</div> Muncul konfirmasi pembayaran. Tekan "YA" untuk melakukan pembayaran</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float : 'left', padding: '10px', paddingTop: '0px',  paddingRight: '15px' } }>8.</div> Bukti pembayaran dalam bentuk struk agar disimpan sebagai bukti pembayaran yang sah <div style = { { paddingLeft : '16px'}}> dari Bank Mandiri </div></h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>9.</div> Transaksi Anda sudah selesai</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float : 'left', padding: '10px', paddingTop: '0px' } }>10.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.</h4>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Kunjungi website Mandiri Internet Banking dengan alamat <a href="https://ib.bankmandiri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bankmandiri.co.id/</a> </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Login dengan memasukkan USER ID dan PIN </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Masuk ke halaman Beranda, lalu pilih "Bayar" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Pilih "Multi Payment" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Pilih "No Rekening Anda" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Pilih "No Virtual Account" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>7.</div> Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[0].bank_account_number} </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>8.</div> Masuk ke halaman konfirmasi 1 </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>9.</div> Apabila benar/sesuai, klik tombol tagihan TOTAL, kemudian klik "Lanjutkan" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px' } }>10.</div> Masuk ke halaman konfirmasi 2 </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px' } }>11.</div> Masukkan Challenge Code yang dikirimkan ke Token Internet Banking Anda, kemudian klik "Kirim" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px' } }>12.</div> Masuk ke halaman konfirmasi pembayaran telah selesai </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px' } }>13.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit.</h4>
                            </div>
                          </Col>
                        </Row>
                      </TabPane>
                      <TabPane tabId="2">
                        <Row>
                          <Col sm="12">
                            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
                            <div>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih "Menu Lainnya" lalu pilih "Transfer"</h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Pilih "Tabungan" lalu "Rekening BNI Virtual Account"</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[1].bank_account_number} dan nominal yang Anda bayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}</h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Periksa kembali data transaksi kemudian tekan "YA"</h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float : 'left', padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit</h4>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Login di <a href="https://ibank.bni.co.id" target="_blank" rel="noopener noreferrer">https://ibank.bni.co.id</a>, masukkan USER ID dan PASSWORD </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih "TRANSFER" lalu pilih "Tambah Rekening Favorit" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Jika Anda menggunakan desktop untuk menambah rekening, pilih "Transaksi", pilih "Info & Administrasi Transfer" lalu pilih "Atur Rekening Tujuan" kemudian "Tambah Rekening Tujuan" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan nama dan nomor Virtual Account Anda {this.state.invoice.payment.availableBanks[1].bank_account_number}, lalu masukkan Kode Otentikasi Token </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Jika Nomor rekening tujuan berhasil ditambahkan, kembali ke menu "TRANSFER" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Pilih "TRANSFER ANTAR REKENING BNI", kemudian pilih rekening tujuan </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>7.</div> Pilih Rekening Debit dan ketik nominal, lalu masukkan kode otentikasi token </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>8.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit. </h4>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>MBANKING</b></h1></center>
                            <div>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Login ke BNI Mobile Banking, masukkan USER ID dan MPIN </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih menu "Transfer", lalu pilih "Antar Rekening BNI" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Pilih "Input Rekening Baru" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan "Rekening Debet", "Rekening Tujuan ({this.state.invoice.payment.availableBanks[1].bank_account_number})" dan "Nominal sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}" kemudian klik "Lanjut" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Periksa kembali data transaksi Anda, masukkan "Password Transaksi", kemudian klik "Lanjut" </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit. </h4>
                            </div>

                          </Col>
                        </Row>
                      </TabPane>

                      <TabPane tabId="3">
                        <Row>
                          <Col sm="12">
                            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
                            <div>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Masukkan kartu, pilih bahasa kemudian masukkan PIN Anda </h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih Pilih "Transaksi Lain" lalu pilih "Pembayaran" </h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Pilih "Lainnya" lalu pilih "Briva" </h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan nomor Virtual Account {this.state.invoice.payment.availableBanks[2].bank_account_number} dan nominal yang ingin Anda bayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])} </h4>
                              <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Periksa kembali data transaksi kemudian tekan "YA" </h4>
                              <h4  style = { { padding: '10px', paddingLeft: '0px' } }><div style = { { float : 'left', padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit</h4>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
                            <div>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Login di <a href="https://ib.bri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bri.co.id/</a> , masukkan USER ID dan PASSWORD </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih "Pembayaran" lalu pilih "Briva" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Masukkan nomor Virtual Account Anda {this.state.invoice.payment.availableBanks[2].bank_account_number}, nominal yang akan dibayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])}, lalu klik kirim </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan kembali PASSWORD anda serta kode otentikasi mToken internet banking </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>5.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit. </h4>
                            </div>

                            <center><h1 style = { { padding: '10px'} }><b>MBANKING</b></h1></center>
                            <div>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>1.</div> Login ke BRI Mobile Banking, masukkan USER ID dan PIN anda </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>2.</div> Pilih "Pembayaran" lalu pilih "Briva" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>3.</div> Masukkan nomor Virtual Account anda {this.state.invoice.payment.availableBanks[2].bank_account_number}, serta nominal yang akan dibayar sebesar Rp.{this.state.invoice.payment.amount.toLocaleString(['ban', 'id'])} </h4>
                                <h4  style = { { padding: '10px', paddingLeft: '0px' } } ><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>4.</div> Masukkan nomor PIN anda dan klik "Kirim" </h4>
                                <h4><div style = { { float: 'left',  padding: '10px', paddingTop: '0px', paddingRight: '15px' } }>6.</div> Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis. Ini bisa memakan waktu hingga 5 menit. </h4>
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
      console.log(data)
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

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({activeTab: tab})
    }
  }

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

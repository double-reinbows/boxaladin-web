import React from 'react'
import {
  TabContent,
  TabPane,
  Row,
  Col
} from 'reactstrap';

/*
props ={
activeTab: 1,
invoice: {
payment: [],

  }
}
*/

const Guide = (props) => {
  return (
    <TabContent activeTab={props.activeTab}>
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
                    Masukkan nomor Virtual Account {props.invoice.payment.availableBanks[0].bank_account_number}
                  </li>
                  <li>
                    Isi NOMINAL sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}, kemudian tekan "BENAR"
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
                    Masukkan nomor Virtual Account {props.invoice.payment.availableBanks[0].bank_account_number}
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
                  Masukkan nomor Virtual Account {props.invoice.payment.availableBanks[1].bank_account_number} dan nominal yang Anda bayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
                  Masukkan nama dan nomor Virtual Account Anda {props.invoice.payment.availableBanks[1].bank_account_number}, lalu masukkan Kode Otentikasi Token
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
                  Masukkan "Rekening Debet", "Rekening Tujuan ({props.invoice.payment.availableBanks[1].bank_account_number})" dan "Nominal sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}" kemudian klik "Lanjut"
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
                  Masukkan nomor Virtual Account {props.invoice.payment.availableBanks[2].bank_account_number} dan nominal yang ingin Anda bayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
                  Masukkan nomor Virtual Account Anda {props.invoice.payment.availableBanks[2].bank_account_number}, nominal yang akan dibayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}, lalu klik kirim
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
                  Masukkan nomor Virtual Account anda {props.invoice.payment.availableBanks[2].bank_account_number}, serta nominal yang akan dibayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
  )
}

export default Guide
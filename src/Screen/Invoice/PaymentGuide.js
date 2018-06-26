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
              <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%', width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
                <ol>
                  <li>
                    Masukkan kartu ATM dan PIN
                  </li>
                  <li>
                    Pilih menu BAYAR/BELI
                  </li>
                  <li>
                    Pilih menu Lainnya > Lainnya > Multipayment
                  </li>
                  <li>
                    Silahkan masukkan kode perusahaan 88908, lalu pilih Benar
                  </li>
                  <li>
                    Masukkan kode bayar dengan Nomor Virtual Account Anda: {props.invoice.payment.availableBanks}, dan klik Benar
                  </li>
                  <li>
                    Jangan lupa memeriksa informasi yang tertera di layar. pastikan Merchant adalah Xendit dan total tagihan sudah benar. Jika benar, tekan angka 1 dan pilih Ya
                  </li>
                  <li>
                    Akan muncul konfirmasi pembayaran, lalu pilih tombol Ya
                  </li>
                  <li>
                    Simpan struk sebagai bukti pembayaran Anda
                  </li>
                </ol>
              </div>
            </div>

            <center><h1 style = { { padding: '10px'} }><b>ONLINE</b></h1></center>
            <div>
              <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
                <ol>
                  <li>
                    Login Mandiri Online <a href="https://ib.bankmandiri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bankmandiri.co.id/</a> dengan memasukkan Username dan Password
                  </li>
                  <li>
                    Pilih menu "Bayar"
                  </li>
                  <li>
                    Pilih menu "Multipayment"
                  </li>
                  <li>
                    Pilih penyedia jasa "Xendit"
                  </li>
                  <li>
                    Masukkan kode bayar dengan Nomor Virtual Account: {props.invoice.payment.availableBanks} dan "Nominal" yang akan dibayarkan, lalu pilih Lanjut
                  </li>
                  <li>
                    Setelah muncul tagihan, pilih Konfirmasi
                  </li>
                  <li>
                    Masukkan PIN token Anda dan klik Kirim
                  </li>
                  <li>
                    Transaksi selesai, simpan bukti bayar Anda
                  </li>
                </ol>
              </div>
            </div>
          </Col>
        </Row>
        <a className="paymentGuide" >*Jangan gunakan fitur "Simpan Daftar Transfer" untuk pembayaran melalui Internet Banking karena dapat mengganggu proses pembayaran berikutnya</a>
      </TabPane>
      <TabPane tabId="2">
        <Row>
          <Col sm="12">
            <center><h1 style = { { padding: '10px'} }><b>ATM</b></h1></center>
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
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
                  Masukkan nomor Virtual Account {props.invoice.payment.availableBanks} dan nominal yang Anda bayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
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
                  Masukkan nama dan nomor Virtual Account Anda {props.invoice.payment.availableBanks}, lalu masukkan Kode Otentikasi Token
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
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
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
                  Masukkan "Rekening Debet", "Rekening Tujuan ({props.invoice.payment.availableBanks})" dan "Nominal sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}" kemudian klik "Lanjut"
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
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
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
                  Masukkan nomor Virtual Account {props.invoice.payment.availableBanks} dan nominal yang ingin Anda bayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
              <ol>
                <li>
                  Login di <a href="https://ib.bri.co.id/" target="_blank" rel="noopener noreferrer">https://ib.bri.co.id/</a> , masukkan USER ID dan PASSWORD
                </li>
                <li>
                  Pilih "Pembayaran" lalu pilih "Briva"
                </li>
                <li>
                  Masukkan nomor Virtual Account Anda {props.invoice.payment.availableBanks}, nominal yang akan dibayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}, lalu klik kirim
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
            <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
              <ol>
                <li>
                  Login ke BRI Mobile Banking, masukkan USER ID dan PIN anda
                </li>
                <li>
                  Pilih "Pembayaran" lalu pilih "Briva"
                </li>
                <li>
                  Masukkan nomor Virtual Account anda {props.invoice.payment.availableBanks}, serta nominal yang akan dibayar sebesar Rp.{props.invoice.payment.amount.toLocaleString(['ban', 'id'])}
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
      <TabPane tabId="4">
      <center><h1 style = { { padding: '10px', paddingTop: '13%', paddingBottom: '10%'} }>Maaf, untuk sementara pembayaran dengan debit BCA hanya dapat dilakukan melalui Transfer pada Bank lain</h1></center>
      <center><h1 style = { { padding: '10px'} }>Mobile Banking</h1></center>
      <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
        <ol>
          <li>
            Akses BCA Mobile Banking dari handphone, kemudian masukkan Kode Akses
          </li>
          <li>
            Pilih m-Transfer
          </li>
          <li>
            Masukkan {props.invoice.payment.availableBanks} pada No. Rekening Tujuan dan pilih Bank “Mandiri” ({props.invoice.payment.availableBanks} untuk bank BNI atau {props.invoice.payment.availableBanks} untuk bank BRI), lalu klik “Send”. Nomor rekening akan tercatat sebagai PT BOXALADIN ASIAPACIFIC
          </li>
          <li>
            Setelah nomor rekening terdaftar, pilih “Antar Bank” pada “Transfer”
          </li>
          <li>
            Pilih Bank “Mandiri/BNI/BRI”, Ke Rekening Tujuan PT BOXALADIN ASIAPACIFIC, dan Nominal sebesar Rp {props.invoice.payment.amount.toLocaleString(['ban', 'id'])}, kemudian pilih “Send” (Nominal yang berbeda tidak dapat diproses)
          </li>
          <li>
            Konfirmasi transaksi dan masukkan PIN m-BCA, lalu “OK”
          </li>
          <li>
            Setelah transaksi pembayaran Anda selesai, invoice ini akan diperbarui secara otomatis (memakan waktu kurang lebih 5 menit)
          </li>
        </ol>
      </div>
      </TabPane>
      <TabPane tabId="5">
      <center><h1 style = { { padding: '10px'} }><b>Alfamart</b></h1></center>
      <div style = {{ fontSize: "15px", padding: '20px', paddingLeft: '5%',  width: '95%', margin: 'auto', backgroundColor: 'lightgrey' }}>
        <ol>
          <li>
            Konfirmasi ke kasir alfamart untuk melalukan pembayaran ke "XENDIT"
          </li>
          <li>
            Staff kasir alfamart akan mencarikan penerima pembayaran yaitu "XENDIT" di sistem alfamart
          </li>
          <li>
            Setelah penerima pembayaran di temukan oleh sistem alfamart, staff kasih akan menanyakan code pembayaran yang harus di input ke sistem alfamart.
          </li>
          <li>
            Kode pembayaran tersebut adalah {props.invoice.payment.availableretail}
          </li>
          <li>
            Detail pembayaran akan keluar di sistem alfamart dan pembayaran sudah bisa dilakukan
          </li>
        </ol>
      </div>
      </TabPane>
    </TabContent>
  )
}


export default Guide

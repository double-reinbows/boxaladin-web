import React from 'react';

export default  class BannerHome extends React.Component {

  render() {
    return (
      <div>
        <div className="BannerText2">
          <h1 className="BannerText2__text1">Cara Kerja BoxAladin</h1>
          <h1 className="BannerText2__text2">
            Box Aladin telah dirancang untuk memberi para anggotanya harga termurah atas
            barang yang dijualnya dengan cara lelang yang menggunakan sistem DUTCH
            AUCTION.<br /><br />
            1. Ruang Lelang
            Anggota harus terlebih dahulu pilih Ruang Lelang yang hendak ia masuk untuk
            ketahui harga lelang terakhir dan/atau untuk melakukan transaksi. Contohnya,
            anggota hendak membeli pulsa isi ulang XL Rp. 100.000, maka Ruang Lelangnya
            adalah “XL Rp. 100.000”.<br /><br />
            2. Kunci Untuk Masuk Ruang Lelang
            Ruang Lelang adalah sebuah ruang yang hanya dapat diakses oleh Anggota.
            Untuk bisa masuk Ruang Lelang, Anggota harus menggunakan 1 buah kunci yang
            dapat diambil dari DOMPET ALADIN Anggota.
            3. Waktu Lelang <br /><br />
            Anggota yang telah memasuki Ruang Lelang akan diberi waktu 15 detik untuk
            melihat harga penawaran secara live atas benda lelang. Dalam waktu tersebut,
            Anggota dapat melakukan transaksi jika harganya sudah sesuai dengan
            keinginannya.<br /><br />
            4. Hak Pembelian Pertama
            Barang yang dilelang tiap saat hanya berjumlah 1 maka pemenang atas barang
            tersebut juga hanya bisa 1 Angggota diantara banyak Anggota dalam Ruang
            Lelang. Anggota yang melakukan transaksi pertama yang akan dapat hak atas
            harga lelang terakhir.<br /><br />
            5. Ruang Santai
            Situs Box Aladin juga menyediakan sebuah Ruang Santai yang hanya dapat
            diakses oleh para Anggotanya. Dalam Ruang ini, Anggota dapat bersantai dan
            menggunakan permainan game berhadiah yang telah disediakan.          </h1>
        </div>
      </div>
    )
  }
}

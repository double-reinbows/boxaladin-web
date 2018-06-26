//@flow
import React from 'react';
type Props = {};
export default function Faq(props: Props) {
  return (
    <div className="faq">
      <div className="faq__title">
        <h1>FAQ</h1>
      </div>
      <ul className="faq__content">
        <li>Q : Kenapa boxaladin bisa membuat harga lebih murah?</li>
        <li className="faq__content__list">
          A : Karena boxaladin menggunakan metode Lelang Belanda (Dutch Auctioning) dimana
          harga dimulai di harga tertentu dan akan berhenti saat ada anggota merasa harga
          sudah cukup murah dan menghentikan lelangnya.
        </li>
        <li>Q : Apakah dijamin saya akan dapat itemnya di harga termurah?</li>
        <li className="faq__content__list">
          A : Sistem lelang di boxaladin menjamin harga barang akan turun sesuai dengan jumlah
          peserta yang masuk dalam “Ruang Lelang”, namun hanya 1 anggota yang bisa membeli
          dan mendapatkan barang tersebut. Dengan kata lain, hanya akan ada 1 barang yang
          dilelang di setiap saat nya dan hanya 1 pemenang yang bisa membeli barangnya. Siapa
          cepat, ia yang dapat.
        </li>
        <li>Q : Bagaimana jika pada saat yang bersamaan, ada lebih dari 1 peserta yang pencet tombol beli?</li>
        <li className="faq__content__list">
          A : Sistem di boxaladin menggunakan mili-detik dalam timernya dan yang pertama
          pencet tombolnya yang diterima oleh sistem kami yang diakui sebagai pemenang.
        </li>
        <li>Q : Kapan lelang akan suatu barang akan selesai?</li>
        <li className="faq__content__list">
          A : Lelang akan selesai setelah ditemukan satu orang pemenang yang berhak
          mendapatkan pulsa sesuai dengan harga lelang terakhir. Setelah itu, harga akan
          kembali menjadi harga normal dan pelelangan akan terulang kembali dari awal.
        </li>
      </ul>
    </div>
  )
}

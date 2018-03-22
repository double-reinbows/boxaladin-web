import React from 'react';
export default class BannerHome extends React.Component {

    render() {
        return (
            <div>
                <div className="BannerText3">
                    <h1 className="BannerText3__text1">FAQ</h1>
                    <h1 className="BannerText3__text2">
                        
                            <li>
                                Q : Kenapa boxaladin bisa membuat harga lebih murah?
                            </li>
                            <li>
                                A : Karena boxaladin menggunakan metode Lelang Belanda ( Dutch Auctioning ) dimana harga dimulai di harga paling mahal dan akan berhenti saat ada anggota yg anggap harga sudah cukup murah dan hentikan lelangnya.
                            </li>
                            <li>
                                Q : Jika dijamin saya pasti akan dapat itemnya di harga termurah?
                            </li>
                            <li>
                                A : Sistem lelang di boxaladin menjamin harganya akan turun sesuai jumlah peserta yang masuk dalam “Ruang Lelang” namun hanya 1 anggota yang bisa dapat itemnya. Hanya 1 item yang dilelang di tiap saat dan hanya 1 pemenang yang bisa dapat itemnya. Siapa cepat, ia yang dapat.
                            </li>
                            <li>
                                Q : Bagaimana jika pada saat yang sama lebih dari 1 peserta yang pencet tombol beli?
                            </li>
                            <li>
                                A : Sistem di boxaladin menggunakan mili-detik dalam timernya dan yang pertama pencet tombolnya yang diterima sistem kita yang diakui sebagai pemenang.
                            </li>
                            <li>
                                Q : Apakah lelang selesai saat itemnya telah diambil?
                            </li>
                            <li>
                                A : Secara otomatis, item baru dengan harga baru akan ditayang saat item sebelumnya telah dimenangkan oleh salah satu peserta.
                            </li>
                            
                    </h1>
                </div>
            </div>
        )
    }
}

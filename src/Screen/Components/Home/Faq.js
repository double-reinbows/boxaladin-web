import React from 'react';
export default class BannerHome extends React.Component {

    render() {
        return (
            <div>
                <div className="BannerText3">
                    <h1 className="BannerText3__text1">Tanya Jawab</h1>
                
                        <ul>
                            <li className="BannerText3__Q">
                                Q : Kenapa boxaladin bisa membuat harga lebih murah?
                            </li>
                            <li className="BannerText3__A">
                                A : Karena boxaladin menggunakan metode Lelang Belanda ( Dutch Auctioning ) dimana harga dimulai di harga awal dan akan berhenti saat ada anggota yg merasa harga sudah cukup murah dan menghentikan lelangnya.
                            </li>
                            <li className="BannerText3__Q">
                                Q : Jika dijamin saya pasti akan dapat itemnya di harga termurah?
                            </li>
                            <li className="BannerText3__A">
                                A : Sistem lelang di boxaladin menjamin harganya akan turun sesuai jumlah peserta yang masuk dalam “Ruang Lelang” namun hanya 1 anggota yang bisa dapat itemnya. Hanya 1 item yang dilelang di tiap saat dan hanya 1 pemenang yang bisa dapat itemnya. Siapa cepat, ia yang dapat.
                            </li>
                            <li className="BannerText3__Q">
                                Q : Bagaimana jika pada saat yang sama lebih dari 1 peserta yang pencet tombol beli?
                            </li>
                            <li className="BannerText3__A">
                                A : Sistem di boxaladin menggunakan mili-detik dalam timernya dan yang pertama pencet tombolnya yang diterima sistem kita yang diakui sebagai pemenang.
                            </li>
                            <li className="BannerText3__Q">
                                Q : Apakah lelang selesai saat itemnya telah diambil?
                            </li>
                            <li className="BannerText3__A">
                                A : Secara otomatis, item baru dengan harga baru akan ditayang saat item sebelumnya telah dimenangkan oleh salah satu peserta.
                            </li>
                        </ul>        
                    
                </div>
            </div>
        )
    }
}

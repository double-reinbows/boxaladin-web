import React from 'react';
import { Button } from 'reactstrap';

export default class BannerHome extends React.Component {

    render() {
        return (
            <div>
                <div className="BannerText3">
                    <h1 className="BannerText3__text1">FAQ</h1>
                    <h1 className="BannerText3__text2">
                        
                            <li>
                                Q : Kenapa boxaladin bs membuat hrg lbh murah?
                            </li>
                            <li>
                                A : Karena boxaladin menggunakan metode Lelang Belanda ( Dutch Auctioning ) dimana hrg dimulai di hrg plg mahal dan akan berhenti saat ada anggota yg anggap hrg sdh cukup murah n hentikan lelangnya.
                            </li>
                            <li>
                                Q : Jika dijamin sy pasti akan dpt itemnya di hrg termurah?
                            </li>
                            <li>
                                A : Sistem lelang di boxaladin menjamin hrgnya akan turun sesuai jumlah peserta yg masuk dlm “Ruang Lelang” namun hanya 1 anggota yg bs dpt itemnya. Hanya 1 item yg dilelang di tiap saat dan hny 1 pemenang yg bs dpt itemnya. Siapa cepat, ia yg dpt.
                            </li>
                            <li>
                                Q : Bagaimana jika pada saat yg sama lbh dr 1 peserta yg pencet tombol beli?
                            </li>
                            <li>
                                A : Sistem di boxaladin menggunakan mili-detik dlm timernya dan yg pertama pencet tombolnya yg diterima sistem kita yg diakui sbg pemenang.
                            </li>
                            <li>
                                Q : Apakah lelang selesai saat itemnya telah diambil?
                            </li>
                            <li>
                                A : Secara otomatis, item baru dgn hrg baru akan ditayang saat item sebelumnya telah dimenangkan oleh salah satu peserta.
                            </li>
                            
                    </h1>
                </div>
            </div>
        )
    }
}

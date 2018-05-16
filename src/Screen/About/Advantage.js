//@flow
import React, { Component } from 'react';

class Advantage extends Component {
  render() { 
    return (  
      <div className="advantage">
        <div>
          <div className="advantage__title">
            <label className="advantage__title">Keuntungan Berbelanja di</label>
            <label className="advantage__title__bottom">boxaladin</label>
          </div>

        </div>

        <div className="advantage__content">
          <div className="advantage__content__left__1">
            <label className="advantage__title">MURAH</label>
            <p>
              Dengan menggunakan
              sistem lelang terbalik kami,
              kami menawarkan harga
              pulsa yang lebih murah dari
              nilai barang yang kamu
              dapat. Yang lebih mahal
              banyak! Yang lebih murah?
              Mana ada!
              DIJAMIN.
            </p>
          </div>
          <div className="advantage__content__mid">
            <div className="advantage__content__mid__2">
              <label className="advantage__title">MUDAH</label>
              <p>
                Tinggal beli kunci, liat
                harga pulsa, beli, dan
                pulsa akan masuk ke
                hape kamu!
              </p>
            </div>
            <div className="advantage__content__mid__3">
              <label className="advantage__title">AMAN</label>
              <p>
                Setiap transaksi di
                boxaladin dijamin aman Dan yang paling gila...bisa dapet
                gratis pulsa dari ruang game
                dari penipuan.
              </p>
            </div>
          </div>
          <div className="advantage__content__right">
            <div className="advantage__content__right__4">
              <label className="advantage__title">24/7</label>
              <p>
                Transaksi dapat dilakukan dimanapun
                dan kapanpun. Tim kami akan selalu
                siap melayani anda.
              </p>
            </div>
            <div className="advantage__content__right__5">
              <label className="advantage__title">BONUS PULSA</label>
              <p>
                Dan yang paling gila...bisa dapet
                gratis pulsa dari ruang game
                kami. Cekidot!
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Advantage;
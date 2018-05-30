//@flow
import React, { Component } from 'react';
class Welcome extends Component {
  render() { 
    return (  
      <div className="welcome">
        <div className="welcome__header">
          <h1>Selamat Datang di Boxaladin</h1>
        </div>
        <div className="welcome__content">
          <p>
            Di boxaladin, kami semua bekerja setiap hari karena kami ingin memenuhi kebutuhan utama pada
            hape, yaitu pulsa. Tidak dapat dipungkiri lagi, pulsa menjadi kebutuhan utama di era digital ini.
            Bahkan untuk sebagian besar orang, terutama kaum milenial, berpendapat bahwa pulsa untuk
            mengakses internet adalah hal ketiga terpenting di dalam hidup setelah makan dan tempat
            tinggal.
          </p>
          <p>
            Apakah kalian setuju? Begitu banyak pilihan operator di Indonesia tetapi harga pulsa tetap
            ‘melejit’! boxaladin hadir untuk memberikan kemudahan dalam hidup kalian. Kami adalah platform
            pembelian pulsa yang memberikan anda kesempatan untuk dapat harga pulsa termurah di seluruh
            dunia! Dengan sistem lelang terbalik yang kami miliki, semakin kamu lihat, semakin murah
            harganya! Tim kami akan selalu memberikan pelayanan yang terbaik untuk memberikan kepuasan
            pada masyarakat luas. Semoga kami dapat memudahkan akses komunikasi dan internet pada
            kalian.
          </p>
        </div>
      </div>
    )
  }
}

export default Welcome;
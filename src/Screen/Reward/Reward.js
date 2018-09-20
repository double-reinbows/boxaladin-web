import React, { Component } from 'react';
import Tabs from './Tabs';

class Reward extends Component {
  render() { 
    return (  
      <div className="reward">
        <Tabs>
          <div src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/cart-of-ecommerce.png' alt="Icon User">
            <div>
              <h3 className="reward-title">OROK REWARDS :</h3>
              <p className="reward-label">Selamat datang di boxaladin rewards! Dengan setiap transaksi, kamu akan mendapatkan poin di dalam rewards.Dengan tingkatan baru, anda akan membuka keuntungan dan keuntungan baru!</p>
            </div>
          </div>
          <div src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Bidding/timer.svg' alt="Icon User">
            <div>
              <h3 className="reward-title">ZOMBIE REWARDS :</h3>
              <label className="reward-label">Xiaomi Redmi Note 5A</label>
            </div>
            <div>
              <h3>Syarat dan Ketentuan</h3>
              <ul className="reward-label">
                <li>300 transaksi</li>
                <li>50 Nomor Handphone</li>
              </ul>
            </div>
          </div>
          <div src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Dompet+Aladin/Key.png' alt="Icon User">
            Nothing to see here, this tab is <em>extinct</em>!
          </div>
        </Tabs>
        <div>
          <h3>Periode :</h3>
          <label className="reward-label">November 2018</label>
        </div>
      </div>
    );
  }
}

export default Reward;
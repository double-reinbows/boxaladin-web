import React, { Component } from 'react';
import Tabs from './Tabs';

class Reward extends Component {
  render() { 
    return (  
      <div className="reward">
        <Tabs>
          <div tab='1' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/orok.png' alt="Icon User">
            <div className="reward-container">
              <h3 className="reward-title">OROK REWARDS :</h3>
              <p className="reward-label">Selamat datang di boxaladin rewards! Dengan setiap transaksi, kamu akan mendapatkan poin di dalam rewards.Dengan tingkatan baru, anda akan membuka keuntungan dan keuntungan baru!</p>
            </div>
          </div>
          <div tab='2' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/zombie.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">ZOMBIE REWARDS :</h3>
                <label className="reward-label">Xiaomi Redmi Note 5A</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>300 transaksi</li>
                  <li>50 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/Redmi+Note+5A.png' alt="Reward Hp"/>
            </div>
          </div>
          <div tab='3' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/warrior.png' alt="Icon User">
          <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">WARRIOR REWARDS :</h3>
                <label className="reward-label">Oppo A3s</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>600 transaksi</li>
                  <li>100 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/Oppo+A3s.png' alt="Reward Hp"/>
            </div>
          </div>
          <div tab='4' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/viking.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">VIKING REWARDS :</h3>
                <label className="reward-label">Oppo F3 Plus</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>900 transaksi</li>
                  <li>150 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/oppo+f3+plus.png' alt="Reward Hp"/>
            </div>
          </div>
          <div tab='5' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/zeus.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">ZEUS REWARDS :</h3>
                <label className="reward-label">Vivo V9</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>1200 transaksi</li>
                  <li>200 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/Vivo+V9.png' alt="Reward Hp"/>
            </div>
          </div>
        </Tabs>
        <div className="reward-footer-container">
          <h3>Periode :</h3>
          <label className="reward-label">November 2018</label>
        </div>
      </div>
    );
  }
}

export default Reward;
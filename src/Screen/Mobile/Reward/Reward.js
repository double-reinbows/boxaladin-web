import React, { Component } from 'react';
import Tabs from './Tabs';

class Reward extends Component {
  render() { 
    return (  
      <div className="reward">
        <Tabs>
          <div tab='1' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/orok.png' alt="Icon User">
            <div className="reward-container">
              <h3 className="reward-title">HADIAH OROK :</h3>
              <p className="reward-label">Selamat datang di hadiah boxaladin ! Dengan setiap transaksi, kamu akan mendapatkan poin .Dengan tingkatan baru, anda akan membuka hadiah dan keuntungan baru!</p>
            </div>
          </div>
          <div tab='2' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/zombie.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">HADIAH ZOMBIE :</h3>
                <label className="reward-label">Emas 1 Gram</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>300 transaksi</li>
                  <li>50 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/1gr.png' alt="Reward"/>
            </div>
          </div>
          <div tab='3' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/warrior.png' alt="Icon User">
          <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">HADIAH WARRIOR :</h3>
                <label className="reward-label">Emas 3 Gram</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>600 transaksi</li>
                  <li>100 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/3gr.png' alt="Reward"/>
            </div>
          </div>
          <div tab='4' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/viking.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">HADIAH VIKING :</h3>
                <label className="reward-label">Emas 5 Gram</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>900 transaksi</li>
                  <li>150 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/5gr.png' alt="Reward"/>
            </div>
          </div>
          <div tab='5' src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/zeus.png' alt="Icon User">
            <div className="reward-tab">
              <div className="reward-content">
                <h3 className="reward-title">HADIAH ZEUS :</h3>
                <label className="reward-label">Emas 7 Gram</label>
                <div className="reward-spacing"></div>
                <h3>Syarat dan Ketentuan</h3>
                <ul className="reward-label">
                  <li>1200 transaksi</li>
                  <li>200 Nomor Handphone</li>
                </ul>
              </div>
              <img className="reward-image" src='https://s3-ap-southeast-1.amazonaws.com/boxaladin-assets-v2/icon/Reward/7gr.png' alt="Reward"/>
            </div>
          </div>
        </Tabs>
        <div className="reward-footer-container">
          <h3>Periode :</h3>
          <label className="reward-label">1 Oktober 2018 - 31 Oktober 2018</label>
        </div>
      </div>
    );
  }
}

export default Reward;
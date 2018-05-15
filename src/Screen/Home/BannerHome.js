//@flow
import React, {Component} from 'react';
import CheckIcon from '../../asset/LandingPage/home/checkmark.png'
import MoneyIcon from '../../asset/LandingPage/home/cursor.png'
import KeyIcon from '../../asset/LandingPage/home/key.png'
import ClockIcon from '../../asset/LandingPage/home/clock-circular-outline.png'
import HandphoneIcon from '../../asset/LandingPage/home/handphone.png'
import CardIcon from '../../asset/LandingPage/home/credit-card.png'
import CoinIcon from '../../asset/LandingPage/home/token.png'
import DangerIcon from '../../asset/LandingPage/home/danger.png'


export default class BannerHome extends Component <{}> {
  render() {
    return (
      <div className="BannerText__container">
        <div className="BannerText__body">
          <div className="BannerText__header">
            <h1 className="BannerText__header__title">Cara Kerja</h1>
          </div>
          <div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={CheckIcon} alt="Check Icon" className="BannerText__icon__image"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Registrasi</h3>
                <div>
                  <p className="BannerText__content__paragraph">Kalian kalau mau ikut bermain di boxaladin ini, jangan lupa registrasi terlebih dahulu ya! Ikutin setiap step yang diminta yah, dan jangan lupa verifikasiin akun kamu dengan nomor hape kamu.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Pilih Jenis Pulsa dan Nominalnya</h3>
                <div>
                  <p className="BannerText__content__paragraph">Nah abis registrasi, langsung aja klik ke jenis pulsa dan nominalnya sesuai dengan keiinginan kalian. Tapi kalian belum bisa nih ngintip harga boxaladin karena kita kunci harganya. Hehehe, penasaran ya?</p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={MoneyIcon} alt="Money Icon" className="BannerText__icon__image"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={KeyIcon} alt="Key Icon" className="BannerText__icon__image"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Pembelian Kunci</h3>
                <div>
                  <p className="BannerText__content__paragraph">Kunci aladin dapat anda beli kapanpun. Tinggal klik “beli kunci” di halaman dompet aladin dan tinggal anda isi ulang</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Waktu Lelang</h3>
                <div>
                  <p className="BannerText__content__paragraph">Karena ini adalah sistem lelang, pastinya siapa yang cepat ia yang akan dapat. Waktu anda hanya ada <b>15 detik</b> atau saat pulsanya telah diambil oleh member lainnya tergantung yang mana yang duluan. Makanya, jangan terlalu lama mikirnya karena banyak member lain juga minat beli loh.......</p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={ClockIcon} alt="Clock Icon" className="BannerText__icon__image"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={HandphoneIcon} alt="Phone Icon" className="BannerText__icon__image"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Masukkan Nomor Hape</h3>
                <div>
                  <p className="BannerText__content__paragraph">yeay!!! Selamat, anda telah menang lelangnya dan dapatkan pulsa dengan harga spesial. Tinggal masukin nomor ponsel tujuan dan lakukan pembayaran utk terima pulsanya</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Pembayaran</h3>
                <div>
                  <p className="BannerText__content__paragraph">Jika anda melewati batas waktu yang telah di berikan, hak menang anda akan hilang dan akan di lelang ulang kepada member lainnya. Pulsa akan segera masuk ke nomor ponsel tujuan setelah kami terima pembayaran anda</p>
                </div>
              </div>
              <div className="BannerText__icon__right">
                <img src={CardIcon} alt="Card Icon" className="BannerText__icon__image"/>
              </div>
            </div>
            <div className="BannerText__content">
              <div className="BannerText__icon__left">
                <img src={CoinIcon} alt="Coin Icon" className="BannerText__icon__image"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Ruang Game</h3>
                <div>
                  <p className="BannerText__content__paragraph">Sebagai tanda appresiasi, anda akan terima sebuah token tiap kali anda intip harga pulsa. Token tersebut bisa anda adukan nasib untuk dapatkan hadiah berupa pulsa gratis choy........”Atau jika anda kehabisan token, kunci aladin anda bisa ditukar menjadi token juga. Biar lebih seru nih.......</p>
                </div>
              </div>
            </div>
          </div>

          <div className="BannerText__content__footer">
            <div className="BannerText__icon__footer">
              <img src={DangerIcon} alt="Danger Icon" className="BannerText__icon__danger"/>
            </div>
            <label><b>HATI-HATI KETAGIHAN</b></label>
          </div>

        </div>
      </div>
    )
  }
}

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
                 <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTkuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iTGF5ZXJfMSIgeD0iMHB4IiB5PSIwcHgiIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgd2lkdGg9IjEyOHB4IiBoZWlnaHQ9IjEyOHB4Ij4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNMzM0Ljk3NCwwYy05NS40MTksMC0xNzMuMDQ5LDc3LjYzLTE3My4wNDksMTczLjA0OWMwLDIxLjIxMywzLjc2OSw0MS44MjcsMTEuMjExLDYxLjQwM0w3LjY3MiwzOTkuOTI4ICAgIGMtMi4zNjUsMi4zNjYtMy42OTQsNS41NzMtMy42OTQsOC45MTd2OTAuNTQ0YzAsNi45NjUsNS42NDYsMTIuNjExLDEyLjYxMSwxMi42MTFoNzQuNjE2YzMuMzQxLDAsNi41NDUtMS4zMjUsOC45MS0zLjY4NiAgICBsMjUuMTQ1LTI1LjEwN2MyLjM3LTIuMzY2LDMuNzAxLTUuNTc3LDMuNzAxLTguOTI1di0zMC44NzZoMzAuODM3YzYuOTY1LDAsMTIuNjExLTUuNjQ2LDEyLjYxMS0xMi42MTF2LTEyLjM2aDEyLjM2MSAgICBjNi45NjQsMCwxMi42MTEtNS42NDYsMTIuNjExLTEyLjYxMXYtMjcuMTM2aDI3LjEzNmMzLjM0NCwwLDYuNTUxLTEuMzI5LDguOTE3LTMuNjk0bDQwLjEyMS00MC4xMjEgICAgYzE5LjU3OSw3LjQ0OSw0MC4xOTYsMTEuMjIzLDYxLjQxNywxMS4yMjNjOTUuNDE5LDAsMTczLjA0OS03Ny42MywxNzMuMDQ5LTE3My4wNDlDNTA4LjAyMiw3Ny42Myw0MzAuMzkzLDAsMzM0Ljk3NCwweiAgICAgTTMzNC45NzQsMzIwLjg3NGMtMjAuNjQyLDAtNDAuNjA2LTQuMTY5LTU5LjMzOS0xMi4zOTNjLTQuODQ0LTIuMTI2LTEwLjI5OS0wLjk1Ni0xMy44NzEsMi41MjUgICAgYy0wLjAzOSwwLjAzNy0wLjA3NywwLjA2Ny0wLjExNSwwLjEwNmwtNDIuMzU0LDQyLjM1NGgtMzQuNTIzYy02Ljk2NSwwLTEyLjYxMSw1LjY0Ni0xMi42MTEsMTIuNjExdjI3LjEzNkgxNTkuOCAgICBjLTYuOTY0LDAtMTIuNjExLDUuNjQ2LTEyLjYxMSwxMi42MTF2MTIuMzZoLTMwLjgzOGMtNi45NjQsMC0xMi42MTEsNS42NDYtMTIuNjExLDEyLjYxMXYzOC4yNTdsLTE3Ljc1MywxNy43MjVIMjkuMjAydi0xNy44MjEgICAgbDE1NC4xNDEtMTU0LjE0YzQuNDMzLTQuNDMzLDQuNDMzLTExLjYxOSwwLTE2LjA1MXMtMTEuNjE3LTQuNDM0LTE2LjA1MywwTDI5LjIwMiw0MzYuODU0VjQxNC4wN2wxNjcuNjk2LTE2Ny43MDggICAgYzAuMDM4LTAuMDM4LDAuMDY3LTAuMDczLDAuMTAyLTAuMTFjMy40ODItMy41NjksNC42NTYtOS4wMjQsMi41My0xMy44NzJjLTguMjE2LTE4LjczMi0xMi4zOC0zOC42OTUtMTIuMzgtNTkuMzMgICAgYzAtODEuNTEyLDY2LjMxNS0xNDcuODI3LDE0Ny44MjctMTQ3LjgyN1M0ODIuODAyLDkxLjUzNyw0ODIuODAyLDE3My4wNUM0ODIuOCwyNTQuNTYsNDE2LjQ4NCwzMjAuODc0LDMzNC45NzQsMzIwLjg3NHoiIGZpbGw9IiNGRkRBNDQiLz4KCTwvZz4KPC9nPgo8Zz4KCTxnPgoJCTxwYXRoIGQ9Ik0zODcuNjM4LDczLjE0NGMtMjYuMDQ3LDAtNDcuMjM3LDIxLjE5LTQ3LjIzNyw0Ny4yMzdzMjEuMTksNDcuMjM3LDQ3LjIzNyw0Ny4yMzdzNDcuMjM3LTIxLjE5LDQ3LjIzNy00Ny4yMzcgICAgUzQxMy42ODYsNzMuMTQ0LDM4Ny42MzgsNzMuMTQ0eiBNMzg3LjYzOCwxNDIuMzk2Yy0xMi4xMzksMC0yMi4wMTUtOS44NzYtMjIuMDE1LTIyLjAxNXM5Ljg3Ni0yMi4wMTUsMjIuMDE1LTIyLjAxNSAgICBzMjIuMDE1LDkuODc2LDIyLjAxNSwyMi4wMTVTMzk5Ljc3NywxNDIuMzk2LDM4Ny42MzgsMTQyLjM5NnoiIGZpbGw9IiNGRkRBNDQiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" alt="Key Icon" className="BannerText__icon__image__key"/>
              </div>
              <div>
                <h3 className="BannerText__content__title">Pembelian Kunci</h3>
                <div>
                  <p className="BannerText__content__paragraph">Tapi tenang aja, untuk kalian yang penasaran tinggal beli kunci aladin terus buka deh harganya. <b>Dijamin paling murah 1 dunia!</b> Oh iya, 1x mengintip harga berarti menggunakan 1 kunci aladin yah.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Waktu Lelang</h3>
                <div>
                  <p className="BannerText__content__paragraph">Jangan kebanyakan mikir, karena siapa cepat dia dapat. Waktu kalian cuman <b>15 detik</b> nih untuk memutuskan apakah kalian akan membeli harga spesial pulsa tersebut atau tidak. Kalau tidak, kalian akan nyesel deh pasti karena kalian akan kembali ke halaman awal lagi.</p>
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
                  <p className="BannerText__content__paragraph">Yeay! Kalian udah dapat harga spesial pulsa tersebut nih. Tinggal masukkin aja nomor hape kalian dan lakukan pembayarannya.</p>
                </div>
              </div>
            </div>
            <div className="BannerText__content">
              <div>
                <h3 className="BannerText__content__title">Pembayaran</h3>
                <div>
                  <p className="BannerText__content__paragraph">Ingat! <b>12 jam</b> itu batas waktu kalian untuk melakukan pembayarannya. Jika melebihi <b>12 jam</b> itu, pulsa kalian akan hangus dan kami lelang kembali. Pulsa kalian akan langsung masuk ke nomor hape tujuan setelah pembayaran berhasil dilakukan ya. </p>
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
                  <p className="BannerText__content__paragraph">Tapi tenang aja, buat kalian yang belum berhasil membeli barangnya, kalian bisa menukarkan kunci aladin kalian ke coin dan memainkannya di ruang game kami. Di ruang game ini kalian bisa menangin hadiah-hadiah menarik loh! SELAMAT MENCOBA.</p>
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

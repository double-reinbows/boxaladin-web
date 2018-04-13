// @flow
import React, {Component} from 'react'
import Footer from './Components/Footer/Footer'
export default class AboutUs extends Component <{}> {
  render() {
    return (
      <div>
        <div className="AboutUs">
          <div className="AboutUs__container">
            <h1 className="AboutUs__label__header">About Us BoxAladin.</h1>
            <h3 className="AboutUs__label">Alamat : Jalan Sultan Iskandar Muda No. 5, Kebayoran Lama Utara, Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12230</h3>
            <h3 className="AboutUs__label">No Telpon : (021) 27513435</h3>
            <h3 className="AboutUs__label">Fax : </h3>
            <h3 className="AboutUs__label">Email : admin@boxaladin.com</h3>
          </div>
        </div>
        <Footer/>
      </div>
    )
  }
}

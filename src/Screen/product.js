import React from "react";
import jwt from 'jsonwebtoken'

class Product extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category: [],
      brand:[],
      product: [],
      cbxProduct: '',
      cbxBrand: '',
      cbxCategory: '',
      isVerified: false,
    }
  }

  async componentWillMount(){
    let getPhone = null
    const dCategory = await fetch('http://localhost:3000/api/category').then(d => d.json());
    const dBrand = await fetch('http://localhost:3000/api/brand').then(d => d.json());
    const dProduct = await fetch('http://localhost:3000/api/product').then(d => d.json());

    const userInfo = jwt.decode(localStorage.getItem('token'));
    if (userInfo) {
      getPhone = await fetch(`http://localhost:3000/getPhone/${userInfo.id}`).then(d => d.json());
    }
    console.log(getPhone)
    
    this.setState({
      category: dCategory,  
      brand: dBrand,
      product: dProduct,
    })

    if (getPhone) {fetch('http://localhost:3000/verifyNumber', {
      method: 'POST',
      body: new URLSearchParams({
        number: getPhone.number,
      }),
    })
    .then(res => res.json())
    .then(d => {
      this.setState({
        isVerified: d.verified
      })
      document.getElementById('labelVerified').textContent = d.hp
    })}
  }

  handleChangeCategory = e => {
    this.setState({
      cbxCategory: e.target.value,
    })
  }

  handleChangeBrand = e => {
    this.setState({
      cbxBrand: e.target.value,
    })
  }

  handleChangeproduct = e => {
    this.setState({
      cbxProduct: e.target.value
    })
  }

  handleBuyClick = () => {
    console.log(this.state.cbxCategory, this.state.cbxBrand, this.state.cbxProduct)
    fetch('http://localhost:3000/api/product', {
      method: 'POST',
      body: new URLSearchParams({
        categoryid: this.state.cbxCategory,
        brandid: this.state.cbxBrand,
        productid: this.state.cbxProduct,
      }),
    })
    .then(res => res.json())
    .then(d => {
      console.log(d);
    })
  }

  // handleTf = () => {
  //   fetch('http://localhost:3000/phonenumbers', {
  //     method: 'POST',
  //     // headers: {

  //     // },
  //     body: new URLSearchParams({
  //       number: this.state.noHp,
  //     }),
  //   })
  //   .then(res => res.json())
  //   .then(d => {
  //     console.log(d.verified);
  //     this.setState({
  //       isVerified: d.verified
  //     })
  //     document.getElementById('labelTrueFalse').textContent = d.verified
  //     document.getElementById('labelVerified').textContent = d.hp
  //   })
  // }

  // handleChange = e => {
  //   this.setState({
  //     noHp: e.target.value
  //   })
  // }

  render() {
    const enableBuy = (!!this.state.cbxProduct && !!this.state.cbxCategory && !!this.state.cbxBrand) && this.state.isVerified
    console.log(enableBuy)
    return (
      <div className="container home">

          <select onChange={this.handleChangeCategory} value={this.state.cbxCategory}>
          <option style={{display: 'none'}} value="0">Pilih</option>      
          {this.state.category.map(d => (
            <option key={d.id} value={d.id}>{d.categoryName}</option> 
            ))}  
          </select>

          <select onChange={this.handleChangeBrand} value={this.state.cbxBrand} >
          <option style={{display: 'none'}} value="0">Pilih</option>      
          {this.state.brand.map(d => (
            <option key={d.id} value={d.id}>{d.brandName}</option> 
            ))}  
          </select>

          <select onChange={this.handleChangeproduct} value={this.state.cbxProduct}>
          <option style={{display: 'none'}} value="0">Pilih</option>      
          {this.state.product.map(d => (
            <option key={d.id} value={d.id}>{d.price}</option> 
            ))}  
          </select>

        <button onClick={this.handleBuyClick} disabled={!enableBuy}>Lihat Harga</button>
        <br />  
        <br />        
        <label id="labelVerified" style={{fontSize: '15px'}}>Your Phone Not Verified</label>
      </div>
    );
  }
}
export default Product


// pointerevent
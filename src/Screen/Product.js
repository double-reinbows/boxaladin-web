import React from "react";

class Home extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      category: [],
      brand:[],
      price: [],
      cbxPrice: '',
      cbxBrand: '',
      cbxCategory: '',

    }
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

  handleChangePrice = e => {
    this.setState({
      cbxPrice: e.target.value
    })
  }

  handleBuyClick = () => {
    console.log(this.state.cbxCategory, this.state.cbxBrand, this.state.cbxPrice)
    fetch('http://localhost:8000/api/product', {
      method: 'POST',
      // headers: {

      // },
      body: new URLSearchParams({
        categoryid: this.state.cbxCategory,
        brandid: this.state.cbxBrand,
        priceid: this.state.cbxPrice,
      }),
    })
    .then(res => {
      res.json()
    })
    .then(d => {
      console.log(d);
    })
  }

  // handleBuyClick = () => {
  //   console.log(this.state.cbxCategory, this.state.cbxBrand, this.state.cbxPrice)
  // }

  async componentWillMount(){
    const dCategory = await fetch('http://localhost:8000/api/category').then(d => d.json());
    const dBrand = await fetch('http://localhost:8000/api/brand').then(d => d.json());
    const dPrice = await fetch('http://localhost:8000/api/price').then(d => d.json());

    this.setState({
      category: dCategory,
      brand: dBrand,
      price: dPrice,
    })
  }
  render() {
    return (
      <div className="container home">

          <select onChange={this.handleChangeCategory} value={this.state.cbxCategory}>
          <option style={{display: 'none'}} value="0">Pilih</option>
          {this.state.category.map(d => (
            <option key={d.id} value={d.id}>{d.category}</option>
            ))}
          </select>

          <select onChange={this.handleChangeBrand} value={this.state.cbxBrand}>
          <option style={{display: 'none'}} value="0">Pilih</option>
          {this.state.brand.map(d => (
            <option key={d.id} value={d.id}>{d.brand}</option>
            ))}
          </select>

          <select onChange={this.handleChangePrice} value={this.state.cbxPrice}>
          <option style={{display: 'none'}} value="0">Pilih</option>
          {this.state.price.map(d => (
            <option key={d.id} value={d.id}>{d.price}</option>
            ))}
          </select>

        <button onClick={this.handleBuyClick}>Buy</button>
      </div>
    );
  }
}
export default Home

const priceProduct = function(product){
    const pulsa_split = product.split(' ').splice(2, 3)
    return pulsa_split
  }

 export default priceProduct;

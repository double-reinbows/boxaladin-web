const priceProduct = function(product){
    var pulsa_split = product.split(' ').splice(2, 3)
    return pulsa_split
  }

 export default priceProduct;

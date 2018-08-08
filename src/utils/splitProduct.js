const productName = function(product){
    const pulsa_split = product.split(' ').splice(0, 2).join(' ')
    return pulsa_split
  }

 export default productName;

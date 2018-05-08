const priceProduct = function(product){
    var pulsa_split = product.split(' ')
    var pulsa_splice= pulsa_split.splice(0, 2)
    return pulsa_split
  }

module.exports = priceProduct;

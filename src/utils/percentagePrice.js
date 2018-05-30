const percentagePrice = function(aladinPrice, productPrice){
  var SalesMargin = (aladinPrice / productPrice) * 100;
  var Persen = 100 - SalesMargin
  var result = Persen.toFixed(1) + '%';
  return result
  }

 export default percentagePrice;

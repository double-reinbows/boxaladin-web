import SplitPhone from './splitPhone'

const checkProvider = function(number){
  let phone = SplitPhone(number)
  phone = phone.substring(0, 4);
  if (['0817','0818','0819','0859','0877','0878'].includes(phone)) {
    return {provider: 'XL', id: 2};
  } else if (['0811','0812','0813','0821','0822','0823','0852','0853','0851'].includes(phone)) {
    return {provider: 'Telkomsel', id: 1};
  } else if (['0881','0882','0883','0884','0885','0886','0887','0888','0889'].includes(phone)) {
    return {provider: 'Smartfren', id: 6};
  } else if (['0814','0815','0816','0855','0856','0857','0858'].includes(phone)) {
    return {provider: 'Indosat', id: 3};
  } else if (['0895','0896','0897','0898','0899'].includes(phone)) {
    return {provider: 'Tri', id: 4};
  } else if (['0838','0837','0831','0832'].includes(phone)) {
    return {provider: 'Axis', id: 5};
  } else {
    return 'Unknown Provider'
  }
}

export default checkProvider;
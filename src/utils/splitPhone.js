const splitPhone = function(number){
  const num = number.split('')
  let phone = ''
  if (num[0] === '0') {
    num.splice(0, 1, '0')
    phone = num.join('')
  } else if (num[0] + num[1] + num[2] === '+62') {
    num.splice(0, 3, '0')
    phone = num.join('')
  } else if (num[0] + num[1] === '62') {
    num.splice(0, 2, '0')
    phone = num.join('')
  } else if (num[0] === '8') {
    num.splice(0, 0, '0')
    phone = num.join('')
  }
  return phone
}

export default splitPhone;

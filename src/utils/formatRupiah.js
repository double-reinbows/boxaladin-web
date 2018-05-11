const FormatRupiah = function (amount) {
 var reverse = amount.toString().split('').reverse()
 var result = []
 for (let i=1; i<=reverse.length; i++) {
  result.push(reverse[i-1])
  if (i % 3 === 0 && i !== reverse.length) {
    result.push('.')
  }
 }

 return 'Rp ' + result.reverse().join('') + ',-'
}

module.exports = FormatRupiah;

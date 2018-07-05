module.exports = {

  validateProvider: (detectedProvider, selectedProvider) => {
    if (detectedProvider.toUpperCase() === selectedProvider.toUpperCase()) {
      return true;
    } else {
      return false;
    }
  },

  detectProvider: (phone) => {
    if(phone[0] === '0') {
      switch (phone.slice(0, 4)) {
        case '0812':
        case '0813':
        case '0852':
        case '0853':
        case '0821':
        case '0823':
        case '0822':
        case '0851':
          return 'TELKOMSEL';
      
        case '0814':
        case '0815':
        case '0816':
        case '0855':
        case '0856':
        case '0857':
        case '0858':
          return 'INDOSAT';
          
        case '0817':
        case '0818':
        case '0819':
        case '0859':
        case '0878':
        case '0877':
          return 'XL';
          
        case '0838':
        case '0837':
        case '0831':
        case '0832':
          return 'AXIS';
          
        case '0881':
        case '0882':
        case '0883':
        case '0884':
        case '0885':
        case '0886':
        case '0887':
        case '0888':
          return 'SMARTFREN';
          
        case '0896':
        case '0897':
        case '0898':
        case '0899':
        case '0895':
          return 'TRI';
        
        default:
          return '';
      }
    } else if (phone[0] === '6') {
      switch (phone.slice(0, 5)) {
        case '62812':
        case '62813':
        case '62852':
        case '62853':
        case '62821':
        case '62823':
        case '62822':
        case '62851':
          return 'TELKOMSEL';
      
        case '62814':
        case '62815':
        case '62816':
        case '62855':
        case '62856':
        case '62857':
        case '62858':
          return 'INDOSAT';
          
        case '62817':
        case '62818':
        case '62819':
        case '62859':
        case '62878':
        case '62877':
          return 'XL';
          
        case '62838':
        case '62837':
        case '62831':
        case '62832':
          return 'AXIS';
          
        case '62881':
        case '62882':
        case '62883':
        case '62884':
        case '62885':
        case '62886':
        case '62887':
        case '62888':
          return 'SMARTFREN';
          
        case '62896':
        case '62897':
        case '62898':
        case '62899':
        case '62895':
          return 'TRI';
        
        default:
          return '';
      }
    } else if (phone[0] === '+') {
      switch (phone.slice(0, 6)) {
        case '+62812':
        case '+62813':
        case '+62852':
        case '+62853':
        case '+62821':
        case '+62823':
        case '+62822':
        case '+62851':
          return 'TELKOMSEL';
      
        case '+62814':
        case '+62815':
        case '+62816':
        case '+62855':
        case '+62856':
        case '+62857':
        case '+62858':
          return 'INDOSAT';
          
        case '+62817':
        case '+62818':
        case '+62819':
        case '+62859':
        case '+62878':
        case '+62877':
          return 'XL';
          
        case '+62838':
        case '+62837':
        case '+62831':
        case '+62832':
          return 'AXIS';
          
        case '+62881':
        case '+62882':
        case '+62883':
        case '+62884':
        case '+62885':
        case '+62886':
        case '+62887':
        case '+62888':
          return 'SMARTFREN';
          
        case '+62896':
        case '+62897':
        case '+62898':
        case '+62899':
        case '+62895':
          return 'TRI';
        
        default:
          return '';
      }
    } else if (phone[0] === '8') {
      switch (phone.slice(0, 3)) {
        case '812':
        case '813':
        case '852':
        case '853':
        case '821':
        case '823':
        case '822':
        case '851':
          return 'TELKOMSEL';
      
        case '814':
        case '815':
        case '816':
        case '855':
        case '856':
        case '857':
        case '858':
          return 'INDOSAT';
          
        case '817':
        case '818':
        case '819':
        case '859':
        case '878':
        case '877':
          return 'XL';
          
        case '838':
        case '837':
        case '831':
        case '832':
          return 'AXIS';
          
        case '881':
        case '882':
        case '883':
        case '884':
        case '885':
        case '886':
        case '887':
        case '888':
          return 'SMARTFREN';
          
        case '896':
        case '897':
        case '898':
        case '899':
        case '895':
          return 'TRI';
        
        default:
          return '';
      }
    } else {
      return false
    }
  },

}
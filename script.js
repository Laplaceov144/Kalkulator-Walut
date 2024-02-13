
const result = document.querySelector('#result');
const url = 'https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_2jBEhO0Ir0H0hELl6sV8MtV47EOt3hoa5EtITg6O';

window.onload = () => {
  fetch(url).then(response => response.json()).then(data => {
    
    document.querySelectorAll('select').forEach(element => {
      element.innerHTML = Object.keys(data.data).map(item => {
        return `<option value="${item}">${item}</option>`;
      }).join(" ");
    });
                
    document.querySelector('form').onsubmit = () => {
      const amount = parseFloat(document.querySelector('#amount').value);
      const inCurr = document.querySelector('#input-currency').value;
      const outCurr = document.querySelector('#output-currency').value;
                    
      if(data.data[inCurr] != undefined && data.data[outCurr] != undefined) {
        result.innerHTML = (data.data[outCurr] * amount / data.data[inCurr]).toFixed(2) + " " + outCurr;
      } else result.innerHTML = 'Nieprawidłowy kod waluty.';
                    
      return false;
    }
  }).catch(error => {
    result.innerHTML = `Błąd: ${error}`;
  });
}

document.addEventListener("DOMContentLoaded", fetchCurrencies)




let currencyFrom = document.getElementById('currencyFrom')
let currencyTo = document.getElementById('currencyTo')

document.getElementById('button').addEventListener('click', convertCurrency)
function fetchCurrencies() {
    const  url = 'https://free.currencyconverterapi.com/api/v5/currencies'
    fetch (url).then((response) => {
        return response.json();
    }).then(data=>{
        let currencies = data.results
        console.log(data);
        upadateSelectbox(currencies)
    });
}

function upadateSelectbox(currencies) {
    for (currency in currencies) {
        let optionFrom = document.createElement('option');
        let optionTo = document.createElement('option')
        optionTo.text = currency
        optionTo.value = currency
        currencyTo.appendChild(optionTo)


        optionFrom.value = currency
        optionFrom.text =  currency
        currencyFrom.appendChild(optionFrom)
    }
}

function convertCurrency(amount=0, fromCurrency, toCurrency) {
    amount = document.getElementById('amount').value
    fromCurrency = (currencyFrom.options[currencyFrom.selectedIndex].value)
    toCurrency = (currencyTo.options[currencyTo.selectedIndex].value)
    query = `${fromCurrency}_${toCurrency}`
    let urlc = `https://free.currencyconverterapi.com/api/v5/convert?q=${query}&compact=ultra`
    fetch(urlc).then((response)=>{
        return response.json()

    }).then((data)=> {
        console.log(data)
        let val = data[query]
        if (val){
            let total = val * amount
            document.getElementById('output').value = total.toFixed(2);
        }else {
            let err = new Error ('value not found'+ query)
            console.log(err)
        }
    });
}
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err));
}
function send(){
    navigator.serviceWorker.register('service-worker.js', {scope:'/'}).the(()=>{
        console.log('[serviceWorker] Registered Succesfully!')
    }).catch(()=> {
        console.log('[serviceWorker] Registration Failed', )
    });
}

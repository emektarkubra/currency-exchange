function getCurrencyData(url) {

    return new Promise((resolve, reject) => {
        fetch(url)
            .then((data) => {
                return data.json();
            })
            .then((data) => {
                resolve(data);
            })
            .catch((err) => {
                reject(err);
            })
    })
}

const firstCurrency = document.querySelector("#turning-into");
const secondCurrency = document.querySelector("#converted");
const quantity = document.querySelector("#value");
const convertButton = document.querySelector("#convert-btn");
const valueForm = document.querySelector("#value-form");
const resultText = document.querySelector(".result-text");
const exchangeIcon = document.querySelector("#exchange");



convertButton.addEventListener("click", getData);
valueForm.addEventListener("submit", getData);
exchangeIcon.addEventListener("click", exchangeCurrency);



let firstCurrencyData;

function getData(e) {

    let url = `https://open.er-api.com/v6/latest/${firstCurrency.value}`

    getCurrencyData(url)
        .then((data) => {
            firstCurrencyData = data;
            convertCurrencyRate(firstCurrencyData);
        })
        .catch((err) => {
            console.log(err);
        })

    e.preventDefault();
}


//exchange

function exchangeCurrency(e) {
    let value;
    let text;
    value = secondCurrency.value;
    text = secondCurrency.options[secondCurrency.selectedIndex].text;
    secondCurrency.value = firstCurrency.value;
    secondCurrency.options[secondCurrency.selectedIndex].text = firstCurrency.options[firstCurrency.selectedIndex].text
    firstCurrency.value = value;
    firstCurrency.options[firstCurrency.selectedIndex].text = text;
    getData(e);
    convertCurrencyRate();
}

function convertCurrencyRate() {

    let coefficient = firstCurrencyData.rates[secondCurrency.value];
    let quantitiy = Number(quantity.value);
    let result = (quantitiy * coefficient).toFixed(4);
    if (quantitiy == 0) resultText.textContent = "";
    else
        
    resultText.textContent = `${quantitiy} ${firstCurrency.value} = ${result} ${secondCurrency.value}`
}






// multi-exchange
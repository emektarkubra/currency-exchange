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
val = firstCurrency.value

function getData(e) {

    let url = `https://open.er-api.com/v6/latest/${val}`

    getCurrencyData(url)
        .then((data) => {
            firstCurrencyData = data;
            convertCurrencyRate(firstCurrencyData);
            console.log(firstCurrencyData)
        })
        .catch((err) => {
            console.log(err);
        })

    // e.preventDefault();
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

    val = firstCurrency.value
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
const container = document.querySelector(".container");
const multiConverter = document.querySelector(".fa-bars");
const amountBox = document.querySelector(".amount");
const currencyBox = document.querySelector(".currency");
const navbarBox = document.querySelector(".navbar");

multiConverter.addEventListener("click", createConvertPage);

function createConvertPage() {
    amountBox.style.display = "none";
    currencyBox.style.display = "none";

    const backArrowIcon = document.createElement("i");
    backArrowIcon.className = "material-icons";
    backArrowIcon.textContent = "arrow_back";
    navbarBox.prepend(backArrowIcon);

    const multiSelectBox = document.createElement("div");
    multiSelectBox.className = "multiple-select-box";

    const selectCurrencyImg = document.createElement("img");
    selectCurrencyImg.className = "select-currency-img";
    selectCurrencyImg.id = "multiple-select-img";
    selectCurrencyImg.alt = "image not found";
    selectCurrencyImg.src = "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png";



    const select = document.createElement("select");
    select.name = "multiple-select";
    select.id = "multiple-select";

    select.innerHTML = `
        <option value="select" disabled selected>Select Currency</option>
        <option value="USD">USD / Dollar (&#36)</option>
        <option value="TRY" class="option">TRY / Turkish lira (&#8378)</option>
        <option value="EUR">EUR / Euro (&#8364)</option>
        <option value="GBP">GBP / Pound (&#163)</option>
        <option value="NOK">NOK / Norwegian krone (kr)</option>
        <option value="SEK">SEK / Swedish krona (kr)</option>
    `

    container.appendChild(multiSelectBox);
    multiSelectBox.appendChild(selectCurrencyImg);
    multiSelectBox.appendChild(select);

    select.addEventListener("change", () => {










        const exchangeBox = document.createElement("div");
        exchangeBox.className = "exchange-box";

        const closeIconBox = document.createElement("div");
        closeIconBox.className = "close-icon";

        const closeIcon = document.createElement("i");
        closeIcon.className = "fa fa-close";

        const infoBox = document.createElement("div");
        infoBox.className = "info";

        const info1Box = document.createElement("div");
        info1Box.className = "info1";

        const exchangeImg = document.createElement("img");
        exchangeImg.id = "exchange-img";
        exchangeImg.alt = "image not found";

        const currencySymbol = document.createElement("p");
        currencySymbol.className = "currency-symbol";

        if (select.value == "USD") currencySymbol.innerHTML = "&#36";
        else if (select.value == "TRY") currencySymbol.innerHTML = "&#8378";
        else if (select.value == "EUR") currencySymbol.innerHTML = "&#8364";
        else if (select.value == "GBP") currencySymbol.innerHTML = "&#163";
        else if (select.value == "NOK") currencySymbol.innerHTML = "kr";
        else if (select.value == "SEK") currencySymbol.innerHTML = "kr";


        const info2Box = document.createElement("div");
        info2Box.className = "info2";

        const numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.name = "exchange-input";
        numberInput.id = "exchange-input";
        numberInput.placeholder = "0";

        const currencyInfoBox = document.createElement("div");
        currencyInfoBox.className = "currency-info";
        currencyInfoBox.textContent = select.options[select.selectedIndex].text;

        const transformInfo = document.createElement("div");
        transformInfo.className = "transform-info";
        transformInfo.innerHTML = ``;





        container.appendChild(exchangeBox);
        exchangeBox.appendChild(closeIconBox);
        closeIconBox.appendChild(closeIcon);

        exchangeBox.appendChild(infoBox);
        infoBox.appendChild(info1Box);
        info1Box.appendChild(exchangeImg);
        info1Box.appendChild(currencySymbol);

        infoBox.appendChild(info2Box);
        info2Box.appendChild(numberInput);
        info2Box.appendChild(currencyInfoBox);
        info2Box.appendChild(transformInfo);






        let value = select.options[select.selectedIndex].value;
        if (value == "USD") {
            selectCurrencyImg.src = "https://www.ppi-int.com/wp-content/uploads/2021/08/USA@2x.png";
            exchangeImg.src = "https://www.ppi-int.com/wp-content/uploads/2021/08/USA@2x.png"
        } else if (value == "TRY") {
            selectCurrencyImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Roundel_flag_of_Turkey.svg/1000px-Roundel_flag_of_Turkey.svg.png?20140314192128";
            exchangeImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Roundel_flag_of_Turkey.svg/1000px-Roundel_flag_of_Turkey.svg.png?20140314192128";
        } else if (value == "EUR") {
            selectCurrencyImg.src = "https://www.voiceofeurope.com/wp-content/uploads/2023/04/2-1000x1000.png";
            exchangeImg.src = "https://www.voiceofeurope.com/wp-content/uploads/2023/04/2-1000x1000.png";
        } else if (value == "GBP") {
            selectCurrencyImg.src = "https://www.thecakedecoratingcompany.co.uk/images/the-cake-decorating-co-union-jack-edible-image-p10306-23368_image.jpg";
            exchangeImg.src = "https://www.thecakedecoratingcompany.co.uk/images/the-cake-decorating-co-union-jack-edible-image-p10306-23368_image.jpg";
        } else if (value == "NOK") {
            selectCurrencyImg.src = "https://static.wixstatic.com/media/d593dc_81c91a2fa21247068e44ff4ccc06ca35~mv2.gif";
            exchangeImg.src = "https://static.wixstatic.com/media/d593dc_81c91a2fa21247068e44ff4ccc06ca35~mv2.gif";
        } else if (value == "SEK") {
            selectCurrencyImg.src = "https://sites.create-cdn.net/siteimages/59/9/9/599971/18/3/7/18377789/1000x1000.png?1591203751";
            exchangeImg.src = "https://sites.create-cdn.net/siteimages/59/9/9/599971/18/3/7/18377789/1000x1000.png?1591203751";
        } else {
            selectCurrencyImg.src = "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png";
            exchangeImg.src = "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png";
        }





        numberInput.addEventListener("keyup", (event) => {
            val = numberInput.nextSibling.textContent.slice(0, 3);
            getData();

            // let text = event.target.nextSibling.textContent.slice(0, 3)
            // let quantitiy = event.target.value;
            // console.log(event.target)
            // let coefficient = firstCurrencyData.rates[text];
            // let quantitiy = Number(numberInput.value); //!!! 
            // console.log(coefficient)
            // let result = (quantitiy * coefficient).toFixed(4);
            // numberInput.value = result;


        })






    })





















    multiConverter.removeEventListener("click", createConvertPage);

}
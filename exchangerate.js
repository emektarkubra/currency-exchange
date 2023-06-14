const firstCurrency = document.querySelector("#turning-into");
const secondCurrency = document.querySelector("#converted");
const firstCurrencyImg = document.querySelector("#turning-into-img");
const secondCurrencyImg = document.querySelector("#converted-img");
const quantity = document.querySelector("#value");
const convertButton = document.querySelector("#convert-btn");
const valueForm = document.querySelector("#value-form");
const resultText = document.querySelector(".result-text");
const exchangeIcon = document.querySelector("#exchange");
const darkButton = document.querySelector(".fa-moon-o");
const container = document.querySelector(".container");
const multiConverter = document.querySelector(".fa-bars");
const amountBox = document.querySelector(".amount");
const currencyBox = document.querySelector(".currency");
const navbarBox = document.querySelector(".navbar");


document.addEventListener("DOMContentLoaded", () => {
    getData("USD");
});
convertButton.addEventListener("click", convertCurrencyRate);
exchangeIcon.addEventListener("click", exchangeCurrency);
multiConverter.addEventListener("click", createConvertPage);
firstCurrency.addEventListener("change", changeFirstCurrencyImg);
secondCurrency.addEventListener("change", changeSecondCurrencyImg);


let firstCurrencyData;

async function getCurrencyData(url) {
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

async function getData(val) {
    let url = `https://open.er-api.com/v6/latest/${val}`;
    try {
        firstCurrencyData = await getCurrencyData(url);
    } catch (error) {
        console.log(error);
    }
}

function changeFirstCurrencyImg() {
    let value1 = firstCurrency.options[firstCurrency.selectedIndex].value;
    if (value1 == "USD") firstCurrencyImg.src = "https://www.ppi-int.com/wp-content/uploads/2021/08/USA@2x.png";
    else if (value1 == "TRY") firstCurrencyImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Roundel_flag_of_Turkey.svg/1000px-Roundel_flag_of_Turkey.svg.png?20140314192128";
    else if (value1 == "EUR") firstCurrencyImg.src = "https://www.voiceofeurope.com/wp-content/uploads/2023/04/2-1000x1000.png";
    else if (value1 == "GBP") firstCurrencyImg.src = "https://www.thecakedecoratingcompany.co.uk/images/the-cake-decorating-co-union-jack-edible-image-p10306-23368_image.jpg";
    else if (value1 == "NOK") firstCurrencyImg.src = "https://static.wixstatic.com/media/d593dc_81c91a2fa21247068e44ff4ccc06ca35~mv2.gif";
    else if (value1 == "SEK") firstCurrencyImg.src = "https://sites.create-cdn.net/siteimages/59/9/9/599971/18/3/7/18377789/1000x1000.png?1591203751";
    else firstCurrencyImg.src = "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png";
}

function changeSecondCurrencyImg() {
    let value2 = secondCurrency.options[secondCurrency.selectedIndex].value;
    if (value2 == "USD") secondCurrencyImg.src = "https://www.ppi-int.com/wp-content/uploads/2021/08/USA@2x.png";
    else if (value2 == "TRY") secondCurrencyImg.src = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Roundel_flag_of_Turkey.svg/1000px-Roundel_flag_of_Turkey.svg.png?20140314192128";
    else if (value2 == "EUR") secondCurrencyImg.src = "https://www.voiceofeurope.com/wp-content/uploads/2023/04/2-1000x1000.png";
    else if (value2 == "GBP") secondCurrencyImg.src = "https://www.thecakedecoratingcompany.co.uk/images/the-cake-decorating-co-union-jack-edible-image-p10306-23368_image.jpg";
    else if (value2 == "NOK") secondCurrencyImg.src = "https://static.wixstatic.com/media/d593dc_81c91a2fa21247068e44ff4ccc06ca35~mv2.gif";
    else if (value2 == "SEK") secondCurrencyImg.src = "https://sites.create-cdn.net/siteimages/59/9/9/599971/18/3/7/18377789/1000x1000.png?1591203751";
    else secondCurrencyImg.src = "https://htmlcolorcodes.com/assets/images/colors/white-color-solid-background-1920x1080.png";
}

//main-exchange page

function exchangeCurrency() {
    let value = secondCurrency.value;
    let text = secondCurrency.options[secondCurrency.selectedIndex].text;
    secondCurrency.value = firstCurrency.value;
    secondCurrency.options[secondCurrency.selectedIndex].text = firstCurrency.options[firstCurrency.selectedIndex].text
    firstCurrency.value = value;
    firstCurrency.options[firstCurrency.selectedIndex].text = text;
    convertCurrencyRate();
}

async function convertCurrencyRate() {
    this.firstCurrencyData = await getData(firstCurrency.value);
    let coefficient = firstCurrencyData.rates[secondCurrency.value];
    let quantitiy = Number(quantity.value);
    let result = (quantitiy * coefficient).toFixed(4);
    if (quantitiy == 0) resultText.textContent = "";
    else resultText.textContent = `${quantitiy} ${firstCurrency.value} = ${result} ${secondCurrency.value}`
}

// multi-exchange page

function createConvertPage() {
    darkButton.addEventListener("click", turnDarkMode);

    multiConverter.style.color = "#2252ff";
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
    selectCurrencyImg.src = "http://www.istanbulbayrak.com/image/genel/big/Products8.jpg";

    const multipleSelect = document.createElement("select");
    multipleSelect.name = "multiple-select";
    multipleSelect.id = "multiple-select";

    multipleSelect.innerHTML = `
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
    multiSelectBox.appendChild(multipleSelect);

    const exchangeContainer = document.createElement("div");
    exchangeContainer.id = "exchange-container";

    //* dark-mode
    if (container.classList == "container dark-mode") {
        multipleSelect.classList.toggle("dark-mode");
    }

    function turnDarkMode() {
        multipleSelect.classList.toggle("dark-mode");
        if (container.classList == "container dark-mode") darkButton.className = "fa fa-sun-o";
        else darkButton.className = "fa fa-moon-o";
    };

    multipleSelect.addEventListener("change", createExchange);

    function createExchange() {

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

        if (multipleSelect.value == "USD") currencySymbol.innerHTML = "&#36";
        else if (multipleSelect.value == "TRY") currencySymbol.innerHTML = "&#8378";
        else if (multipleSelect.value == "EUR") currencySymbol.innerHTML = "&#8364";
        else if (multipleSelect.value == "GBP") currencySymbol.innerHTML = "&#163";
        else if (multipleSelect.value == "NOK") currencySymbol.innerHTML = "kr";
        else if (multipleSelect.value == "SEK") currencySymbol.innerHTML = "kr";


        const info2Box = document.createElement("div");
        info2Box.className = "info2";

        const numberInput = document.createElement("input");
        numberInput.type = "number";
        numberInput.name = "exchange-input";
        numberInput.id = "exchange-input";
        numberInput.placeholder = "0.0000";

        //* dark-mode

        if (container.classList == "container dark-mode") {
            exchangeBox.classList.toggle("dark-mode");
            numberInput.classList.toggle("dark-mode");
        }
        darkButton.addEventListener("click", () => {
            exchangeBox.classList.toggle("dark-mode");
            numberInput.classList.toggle("dark-mode");
        });

        const currencyInfoBox = document.createElement("div");
        currencyInfoBox.className = "currency-info";
        currencyInfoBox.textContent = multipleSelect.options[multipleSelect.selectedIndex].text;

        const transformInfo = document.createElement("div");
        transformInfo.className = "transform-info";
        transformInfo.innerHTML = ``;

        container.appendChild(exchangeContainer);
        exchangeContainer.appendChild(exchangeBox);
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

        let value = multipleSelect.options[multipleSelect.selectedIndex].value;

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

        numberInput.addEventListener("keyup", calculateCurrencyRate);
        closeIconBox.addEventListener("click", deleteExchangeBox);

        async function calculateCurrencyRate(event) {
            val = event.target.nextSibling.textContent.slice(0, 3);
            this.firstCurrencyData = await getData(val);

            let quantitiy = event.target.value;

            for (let i = 0; i < exchangeContainer.children.length; i++) {
                let text2 = exchangeContainer.children[i].children[1].children[1].children[1].textContent.slice(0, 3)
                let coefficient = firstCurrencyData.rates[text2];
                let result = (quantitiy * coefficient).toFixed(4);
                exchangeContainer.children[i].children[1].children[1].children[0].placeholder = result;
            }
        }

        function deleteExchangeBox(e) {
            let box = e.target.parentElement.parentElement;
            box.remove();
        }
    }

    backArrowIcon.addEventListener("click", goBack);

    function goBack(e) {
        multiConverter.addEventListener("click", createConvertPage);
        backArrowIcon.remove();
        multiConverter.style.color = "#7a828c"
        multiSelectBox.style.display = "none";
        exchangeContainer.style.display = "none";
        amountBox.style.display = "block";
        currencyBox.style.display = "flex";
    }
    multiConverter.removeEventListener("click", createConvertPage);
}

//* dark-mode

darkButton.addEventListener("click", darkMode);

function darkMode() {
    const a = document.querySelector("a");
    container.classList == "container"
    container.classList.toggle("dark-mode");
    quantity.classList.toggle("dark-mode");
    firstCurrency.classList.toggle("dark-mode-currency");
    secondCurrency.classList.toggle("dark-mode-currency");
    a.classList.toggle("dark-mode-a");
    if (container.classList == "container dark-mode") {
        darkButton.className = "fa fa-sun-o"
    } else {
        darkButton.className = "fa fa-moon-o"
    }
}
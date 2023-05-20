var cardNumberInput = document.querySelector('.cardNumberInput');
var cardHolderInput = document.querySelector('.cardHolderInput');
var expDateInput = document.querySelector('.expDateInput');
var cvvInput = document.querySelector('.cvvInput');

var cardNumberBox = document.querySelector('.cardNumberBox');
var cardHolderName = document.querySelector('.cardHolderName');
var expDate = document.querySelector('.expDate');
var cvvBox = document.querySelector('.cvvBox');
var submitBtn = document.querySelector('.submitBtn');
var closeBtn = document.querySelector('.closeBtn');
var closeBtn2 = document.querySelector('.closeBtn2');
var closeBtn3 = document.querySelector('.closeBtn3');
var popupValid = document.querySelector('.popup');
var popupInvalid = document.querySelector('.popup2');
var popupError = document.querySelector('.popup3');




cardNumberInput.oninput = () => {
    let cardNumberBox = cardNumberInput.value;
    let cardNumberArry = Array.from(cardNumberBox);

    cardNumberArry.splice(4,1);
    cardNumberArry.splice(8,1);
    cardNumberArry.splice(12,1);

    let cardNumberString = cardNumberArry.join("");
    let digits = cardNumberString.split('').map(Number);

    for(let i = digits.length - 2; i >= 0; i -= 2) {
        let doubledDigit = digits[i] * 2;
        if(doubledDigit > 9) {
            doubledDigit -= 9;
        }
        digits[i] = doubledDigit;
    }

    let sum = digits.reduce((accumulator, currentValue) => accumulator + currentValue, 0);

    localStorage.setItem('sum', sum);

    console.log(cardNumberString)
    console.log(sum)
}

cardHolderInput.oninput = () => {
    cardHolderName.innerHTML = cardHolderInput.value;
    cardHolderNameValue = cardHolderInput.value;

    localStorage.setItem('cardHolderNameValue', cardHolderNameValue);

    console.log(cardHolderNameValue)
}

expDateInput.oninput = () => {
    let expDate = expDateInput.value;

    localStorage.setItem('expDate', expDate);

    console.log(expDate)
}

cvvInput.oninput = () => {
    cvvBox.innerHTML = cvvInput.value;
    cvvInputValue = cvvInput.value;

    localStorage.setItem('cvvInputValue', cvvInputValue);

    console.log(cvvInputValue)
}


cvvInput.onmouseenter = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(-180deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(0deg)';
}

cvvInput.onmouseleave = () => {
    document.querySelector('.front').style.transform = 'perspective(1000px) rotateY(0deg)';
    document.querySelector('.back').style.transform = 'perspective(1000px) rotateY(180deg)';
}

cardNumberInput.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        cardNumberBox.innerText = "**** **** **** 1234";
    } else {
        const valuesOfInput = e.target.value.replaceAll(" ", "");

        if (e.target.value.length > 14) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
            cardNumberBox.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3 $4");
        } else if (e.target.value.length > 9) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
            cardNumberBox.innerHTML = valuesOfInput.replace(/(\d{4})(\d{4})(\d{0,4})/, "$1 $2 $3");
        } else if (e.target.value.length > 4) {
            e.target.value = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
            cardNumberBox.innerHTML = valuesOfInput.replace(/(\d{4})(\d{0,4})/, "$1 $2");
        } else {
            cardNumberBox.innerHTML = valuesOfInput;
        }
    }
});

expDateInput.addEventListener("keyup", (e) => {
    if (!e.target.value) {
        expDate.innerHTML = "mm/yy";
    } else {
        const valuesOfInput = e.target.value.replace("/", "");

        if (e.target.value.length > 2) {
            e.target.value = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
            expDate.innerHTML = valuesOfInput.replace(/^(\d{2})(\d{0,2})/, "$1/$2");
        } else {
            expDate.innerHTML = valuesOfInput;
        }
    }
})

submitBtn.addEventListener("click", () => { 
    let sum = localStorage.getItem("sum");
    if(cardNumberBox.innerHTML == '**** **** **** 1234') {
        popupError.classList.add("openPopup");
    } else if(cardHolderName.innerHTML == 'Full Name') {
        popupError.classList.add("openPopup");
    } else if(expDate.innerHTML == 'mm/yy') {
        popupError.classList.add("openPopup");
    } else if(cvvBox.innerHTML == '') {
        popupError.classList.add("openPopup");
    } else {
        if(sum % 10 == 0) {
            popupValid.classList.add("openPopup");
        } else {
            popupInvalid.classList.add("openPopup");
        }
    }

    
    console.log(expDate)
})

closeBtn.addEventListener("click", () => {
    popupValid.classList.remove("openPopup");
    location.reload();
})

closeBtn2.addEventListener("click", () => {
    popupInvalid.classList.remove("openPopup");
})

closeBtn3.addEventListener("click", () => {
    popupError.classList.remove("openPopup");
})
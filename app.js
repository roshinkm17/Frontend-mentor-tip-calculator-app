var activeBtn;
const resetButton = document.querySelector("#reset-btn");
resetButton.addEventListener("click", () => {
  var billAmount = document.querySelector("#bill-amount").value;
  billAmount = parseFloat(billAmount);
  var numPeople = document.querySelector("#num-people").value;
  numPeople = parseFloat(numPeople);
  var customTipPercent = document.querySelector("#tip-percent").value;
  customTipPercent = parseFloat(customTipPercent);
  if (validate(billAmount, customTipPercent, numPeople)) {
    document.querySelector("#bill-amount").classList.remove("error-active");
     document.querySelector("#tip-percent").classList.remove("error-active");
    document.querySelector("#num-people").classList.remove("error-active");
    document.querySelector("#bill-amount-error").style.display = "none";
    document.querySelector("#num-people-error").style.display = "none";
    var tipAmount;
    try {
      if (activeBtn.classList.contains("btn-active")) {
        var btnTipPercent = parseInt(activeBtn.innerText);
        tipAmount = (btnTipPercent / 100) * billAmount;
      } else {
        tipAmount = (customTipPercent / 100) * billAmount;
      }
    } catch (e) {
      tipAmount = (customTipPercent / 100) * billAmount;
    }
    const total = billAmount + tipAmount;
    const amountPerPerson = total / numPeople;

    //set the values
    document.querySelector(
      ".total-per-person"
    ).innerText = `$ ${amountPerPerson.toFixed(1)}`;
    document.querySelector(".tip-per-person").innerText = `$ ${(
      tipAmount / numPeople
    ).toFixed(1)}`;
  }
});

//get all the buttons
var buttons = document.querySelectorAll(".btn");
//maintains the active button

const toggleState = function (btn) {
  btn.classList.toggle("btn-active");
  activeBtn = btn;
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i] != btn) {
      buttons[i].classList.remove("btn-active");
    }
  }
};

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", () => {
    toggleState(buttons[i]);
  });
}

const validate = function (billAmount, tipPercent, numPeople) {
    var flag = true;
  if (isNaN(billAmount)) {
    const errorText = document.querySelector("#bill-amount-error");
    errorText.innerText = "Cannot be Empty";
    errorText.style.display = "block";
    document.querySelector("#bill-amount").classList.toggle("error-active");
    flag = false;
  }
  if (isNaN(tipPercent)) {
    if (activeBtn && activeBtn.classList.contains("btn-active")) {

    } else {
      document.querySelector("#tip-percent").classList.toggle("error-active");
      flag = false;
    }
  } if (isNaN(numPeople) || numPeople == 0) {
    const errorText = document.querySelector("#num-people-error");
    errorText.innerText = "Cannot be 0";
    errorText.style.display = "block";
    document.querySelector("#num-people").classList.toggle("error-active");
    flag = false;
  }
  return flag;
};

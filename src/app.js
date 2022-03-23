import "./assets/scss/main.scss";
import slider from "./slider";

// Get the current theme from the localstorage

const currentTheme = localStorage.getItem("theme");
// switchTheme();
if (currentTheme === "theme--default" || currentTheme === "theme--dark") {
  document.documentElement.className = currentTheme;
} else {
  document.documentElement.className = "theme--default";
}

function switchTheme() {
  const htmlEle = document.documentElement;
  if (htmlEle.classList.contains("theme--default")) {
    htmlEle.className = "theme--dark";
    localStorage.setItem("theme", "theme--dark");
  } else {
    htmlEle.className = "theme--default";
    localStorage.setItem("theme", "theme--default");
  }
}

// Theme Switch
document
  .querySelector(".theme-switcher")
  .addEventListener("click", switchTheme);

// Initilize the slider
slider();

// Mobile Responsive Sub menu - Toggle
document.querySelector(".js-menu").addEventListener(
  "click",
  (e) => {
    const classNames = ["js-has-sub-menu", "js-sub-menu-opener"];
    if (
      classNames.some((className) => e.target.classList.contains(className))
    ) {
      e.target.closest(".menu-item").classList.toggle("show");
    } else if (e.target.tagName == "A") {
      document.querySelector("#mobile-menu-checkbox").checked = false;
    }
  },
  false
);

// tab
const tab = document.querySelector(".js-tab");

tab.addEventListener("click", function (e) {
  if (e.target.classList.contains("btn-tab")) {
    const targetTabContent = e.target.dataset.for;

    // remove active from all the tab
    document.querySelectorAll(".btn-tab").forEach((ele) => {
      ele.classList.remove("active");
    });
    // add active to clicked tab
    e.target.classList.add("active");

    // hide all the tab content
    document.querySelectorAll(".js-tab-content").forEach((ele) => {
      ele.classList.remove("active");
    });

    // Show requested tab content
    document.querySelector(`#${targetTabContent}`).classList.add("active");
  }
});

// inquiry Form
const inquiryForm = document.querySelector(".form");
const formControls = inquiryForm.querySelectorAll(".form-control");
let hasError = false;
let hasFilled = false;

// Manage Floating lables
function manageFloatingLabels(ele) {
  if (ele.value == "") {
    ele.classList.remove("focus");
  } else {
    ele.classList.add("focus");
  }
}

// Manage disable state of the submit button
function manageSubmitButton() {
  const submitButton = inquiryForm.querySelector(".js-btn-submit");

  hasFilled = Array.from(formControls).every((ele) =>
    ele.classList.contains("focus")
  );

  if (!hasFilled || hasError) {
    submitButton.setAttribute("disabled", "disabled");
  } else {
    submitButton.removeAttribute("disabled");
  }
}

// Create new span for error and assign a css class
function createErrorElement() {
  // create new element
  const errorMsgEle = document.createElement("span");
  errorMsgEle.classList.add("error-msg");

  return errorMsgEle;
}

// show the error message (span element with '.error-msg' class) on specific ".form-field" element
function showError(ele, msg) {
  // append to form-field element
  const errorEle = createErrorElement();
  errorEle.textContent = msg;
  errorEle.classList.add("error-msg");
  ele.closest(".form-field").appendChild(errorEle);
}

// Check if the element has en error, remove the error
function checkAndRemoveError(ele) {
  let errorEle = ele.closest(".form-field").querySelector(".error-msg");
  if (errorEle != null) {
    errorEle.remove();
  }
}

// compare and match the password and confirm password field
function matchPassword(passwordEle, confirmPasswordEle) {
  if (passwordEle.value != confirmPasswordEle.value) {
    if (
      !confirmPasswordEle.closest(".form-field").querySelector(".error-msg")
    ) {
      showError(confirmPasswordEle, "Password doesn't match");

      hasError = true;
    } else {
      hasError = false;
    }
  } else {
    hasError = false;
    checkAndRemoveError(confirmPasswordEle);
  }
}

// Handling on blur event for all the form controls
function onBlurHandler() {
  const ele = this;

  manageFloatingLabels(ele);
  manageSubmitButton();

  switch (ele.id) {
    case "fullName":
      break;
    case "email":
      break;
    case "password":
      if (ele.value != "") {
        checkAndRemoveError(ele);

        let confirmPasswordEle = Array.from(formControls).filter(
          (ele) => ele.id == "confirmPassword"
        )[0];

        if (confirmPasswordEle.value != "") {
          matchPassword(ele, confirmPasswordEle);
        }
      }
      break;
    case "confirmPassword":
      if (ele.value != "") {
        checkAndRemoveError(ele);

        let passwordEle = Array.from(formControls).filter(
          (ele) => ele.id == "password"
        )[0];
        if (passwordEle.value == "") {
          if (!passwordEle.classList.contains("error")) {
            passwordEle.classList.add("error");

            showError(passwordEle, "Please enter the password!");
            hasError = true;
          } else {
            hasError = false;
          }

          passwordEle.focus();
        } else {
          matchPassword(passwordEle, ele);
        }
      }
      break;
    case "comment":
      break;
  }
}

// Maange key up event for all the form controls
function onKeyUpHandler() {
  const ele = this;
  manageFloatingLabels(ele);
  manageSubmitButton();
}

// Register keyup and blur eventLister for all the form control
formControls.forEach((ele) => {
  manageFloatingLabels(ele);
  manageSubmitButton();

  // on keyup
  ele.addEventListener("keyup", onKeyUpHandler);

  // on blur
  ele.addEventListener("blur", onBlurHandler);
});

import { loginRequest } from "./requests.js";

// Modal drop down for the login page
function eventDropDown() {
  const dropDownButton = document.querySelector(".dropdown");
  const modal = document.querySelector(".modal-dropdown");
  const homeButton = document.querySelector(".home-dropdown");
  const registerButton = document.querySelector(".register-dropdown");
  const homeBtnDesktop = document.querySelector('.login')
  const registerBtnDesktop = document.querySelector('.register')

  dropDownButton.addEventListener("click", () => {
    if (
      dropDownButton.innerHTML ==
      '<img src="../assets/img/Vector (1).png" alt="">'
    ) {
      dropDownButton.innerHTML = "";
      dropDownButton.innerHTML = '<img src="../assets/img/Vector.png" alt="">';
    } else if (
      dropDownButton.innerHTML == '<img src="../assets/img/Vector.png" alt="">'
    ) {
      dropDownButton.innerHTML = "";
      dropDownButton.innerHTML =
        '<img src="../assets/img/Vector (1).png" alt="">';
    }
    homeButton.toggleAttribute("hidden");
    registerButton.toggleAttribute("hidden");
    modal.toggleAttribute("hidden");
  });

  eventLoginRegister(homeButton, "../../index.html");
  eventLoginRegister(homeBtnDesktop, "../../index.html")
  eventLoginRegister(registerButton, "../../register/register.html");
  eventLoginRegister(registerBtnDesktop, "../../register/register.html");
}

// Event listener on login and register buttons
export function eventLoginRegister(button, url) {
  button.addEventListener("click", () => {
    window.location.replace(url);
  });
}

// Event listener on login form
function loginEvent() {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.id] = element.value;
      }
    });
    await loginRequest(body);
  });
}

// Register button (on form) event listener
function registerEvent() {
  const registerButton = document.querySelector("#register");
  registerButton.addEventListener("click", () => {
    window.location.replace("../../register/register.html");
  });
}

eventDropDown();
loginEvent();
registerEvent();

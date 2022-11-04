// Had some issues importing the "eventDropDown" and "eventLoginRegister".
// So I had to create a similar function, for basically the same purpose.

import { registerRequest } from "./requests.js";

// Event drop down for the register page
function eventDropDown2() {
  const dropDownButton = document.querySelector(".dropdown");
  const modal = document.querySelector(".modal-dropdown");
  const homeButton = document.querySelector(".home-dropdown");
  const loginButton = document.querySelector(".login-dropdown");
  const homeBtnDesktop = document.querySelector('.home')
  const loginBtnDesktop = document.querySelector('.login')

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
    loginButton.toggleAttribute("hidden");
    modal.toggleAttribute("hidden");
  });

  eventLoginRegister2(homeButton, "../../index.html");
  eventLoginRegister2(homeBtnDesktop, "../../index.html");
  eventLoginRegister2(loginButton, "../../login/login.html");
  eventLoginRegister2(loginBtnDesktop, "../../login/login.html");
}

// Event listener on login and register buttons
function eventLoginRegister2(button, url) {
  button.addEventListener("click", () => {
    window.location.replace(url);
  });
}

// Event listener on register form
function registerEvent() {
  const form = document.querySelector("form");
  const elements = [...form.elements];

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "INPUT" && element.value !== "") {
        body[element.id] = element.value;
      } else if (element.tagName == "SELECT") {
        body[element.id] = element.value;
      }
    });
    await registerRequest(body);
  });
}

// Return button (on form) event listener
function returnEvent() {
  const returnButton = document.querySelector(".retornar");
  returnButton.addEventListener("click", () => {
    window.location.replace("../../index.html");
  });
}

eventDropDown2();
registerEvent();
returnEvent();

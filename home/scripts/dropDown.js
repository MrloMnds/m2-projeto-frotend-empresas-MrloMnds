// Show modal with login and register buttons
export function eventDropDown() {
  const dropDownButton = document.querySelector(".dropdown");
  const modal = document.querySelector(".modal-dropdown");
  const loginButton = document.querySelector(".login-dropdown");
  const registerButton = document.querySelector(".register-dropdown");
  const loginBtnDesktop = document.querySelector('.login')
  const registerBtnDesktop = document.querySelector('.register')

  dropDownButton.addEventListener("click", () => {
    if (
      dropDownButton.innerHTML == '<img src="./assets/img/Vector (1).png" alt="">'
    ) {
      dropDownButton.innerHTML = "";
      dropDownButton.innerHTML = '<img src="./assets/img/Vector.png" alt="">';
    } else if (
      dropDownButton.innerHTML == '<img src="./assets/img/Vector.png" alt="">'
    ) {
      dropDownButton.innerHTML = "";
      dropDownButton.innerHTML =
        '<img src="./assets/img/Vector (1).png" alt="">';
    }
    loginButton.toggleAttribute("hidden");
    registerButton.toggleAttribute("hidden");
    modal.toggleAttribute("hidden");
  });

  eventLoginRegister(loginButton, "./login/login.html");
  eventLoginRegister(loginBtnDesktop, "./login/login.html");
  eventLoginRegister(registerButton, "./register/register.html");
  eventLoginRegister(registerBtnDesktop, "./register/register.html");
}

// Event listener on login and register buttons
function eventLoginRegister(button, url) {
  button.addEventListener("click", () => {
    window.location.replace(url);
  });
}

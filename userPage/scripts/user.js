import { isAdm } from "../../login/scripts/requests.js";
import { getUserCoworkers, getUserInfo } from "./requests.js";
import { updateUserRequest } from "./requests.js";
import { getAllCompanies } from "../../home/scripts/requests.js";

// // Checks if user isnt adm to access the user page
async function validateUser() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.replace("../index.html");
  } else if (await isAdm()) {
    window.location.replace("../adminPage/admin.html");
  }
}

// Event listener on logout button
function logoutEvent() {
  const logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("../index.html");
  });
}

// Render all user info
async function renderUserInfo() {
  const userInfo = await getUserInfo();
  const section = document.querySelector(".user-info");
  const username = document.createElement("h2");
  const div = document.createElement("div");
  const email = document.createElement("p");
  const proLevel = document.createElement("p");
  const jobType = document.createElement("p");
  const editButton = document.createElement("button");

  username.innerText = userInfo.username;
  email.innerText = `Email: ${userInfo.email}`;
  proLevel.innerText = userInfo.professional_level;
  jobType.innerText = userInfo.kind_of_work;
  editButton.innerHTML = '<img src="../assets/img/Vector (5).png">';

  div.append(email, proLevel, jobType);
  section.append(username, div, editButton);

  editButton.addEventListener("click", () => editUserInfoModal());
}

// Opend and add event listener to edit user info modal
async function editUserInfoModal() {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const username = document.createElement("input");
  const email = document.createElement("input");
  const password = document.createElement("input");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal";
  confirmButton.classList = "confirm-button";
  closeButton.classList = "close-button";

  username.setAttribute("id", "username");
  username.setAttribute("placeholder", "Seu nome");
  email.setAttribute("id", "email");
  email.setAttribute("placeholder", "Seu email");
  password.setAttribute("id", "password");
  password.setAttribute("placeholder", "Sua senha");
  password.setAttribute("type", "password");
  closeButton.setAttribute("type", "button");

  h2.innerText = "Editar Perfil";
  confirmButton.innerText = "Salvar alterações";
  closeButton.innerText = "X";

  modal.append(h2, username, email, password, confirmButton, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) =>
    getDataEditUserInfoModal(event, modal)
  );
}

// Get all data from modal inputs and request to patch infos
function getDataEditUserInfoModal(event, modal) {
  event.preventDefault();

  const elements = [...modal.elements];

  const body = {};

  elements.forEach((element) => {
    if (element.tagName == "INPUT" && element.value !== "") {
      body[element.id] = element.value;
    }
  });

  updateUserRequest(body);
}

// Get user company/department and request to render
export async function getCompanyDepartment() {
  const userInfo = await getUserInfo();
  const departmentId = await userInfo.department_uuid;
  const getCoworkers = await getUserCoworkers();
  const allCompanies = await getAllCompanies();

  if (getCoworkers.length > 0) {
    const coworkers = getCoworkers[0].users;
    const depart = getCoworkers[0].name;
    const company = allCompanies.filter((company) => {
      if (getCoworkers[0].company_uuid == company.uuid) {
        if (company.name != "undefined") {
          return company.name;
        }
      }
    });

    if (departmentId != null) {
      const body = document.querySelector("body");
      const companyDepart = document.querySelector(".company-depart");
      companyDepart.remove();
      const newSection = document.createElement("section");
      const h2 = document.createElement("h2");
      const coworkersList = document.createElement("ul");

      h2.innerText = `${company[0].name} - ${depart}`;

      coworkers.forEach((user) => {
        if (user.username != userInfo.username) {
          const li = document.createElement("li");
          const coworkerName = document.createElement("h3");
          const coworkerLevel = document.createElement("p");

          coworkerName.innerText = user.username;
          coworkerLevel.innerText = user.professional_level;

          li.append(coworkerName, coworkerLevel);
          coworkersList.append(li);
        }
      });

      newSection.classList = "new-section";

      newSection.append(h2, coworkersList);
      body.append(newSection);
    }
  } else {
    const companyDepart = document.querySelector(".company-depart");
    companyDepart.insertAdjacentHTML(
      "beforeend",
      '<h2 class="nao-contratado">Você ainda não foi contratado</h2>'
    );
  }
}

validateUser();
logoutEvent();
renderUserInfo();
getCompanyDepartment();

import { getAllCompanies } from "../../home/scripts/requests.js";
import { hire } from "./admin.js";
import {
  createDepartmentRequest,
  deleteRequest,
  editRequest,
  getAllUsers,
  deleteUserRequest,
  editUserRequest,
  dismissUserRequest,
} from "./requests.js";

// Create modal and add event listener to submit and close button
export async function openModal() {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const nameInput = document.createElement("input");
  const descriptionInput = document.createElement("input");
  const select = document.createElement("select");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal";
  confirmButton.classList = "confirm-button";
  closeButton.classList = "close-button";

  h2.innerText = "Criar Departamento";
  nameInput.setAttribute("placeholder", "Nome do departamento");
  descriptionInput.setAttribute("placeholder", "Descrição");
  nameInput.setAttribute("id", "name");
  descriptionInput.setAttribute("id", "description");
  select.setAttribute("id", "company_uuid");
  closeButton.setAttribute("type", "button");

  const allCompanies = await getAllCompanies();
  const allCompNames = await allCompanies.map((element) => element.name);

  allCompNames.forEach((element) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${element}">${element}</option>`
    );
  });

  confirmButton.innerText = "Criar o departamento";
  closeButton.innerText = "X";

  modal.append(
    h2,
    nameInput,
    descriptionInput,
    select,
    confirmButton,
    closeButton
  );
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) => getdataFromModal(event, modal));
}

// Get values of input and select tags and request to create a new department
async function getdataFromModal(event, modal) {
  event.preventDefault();

  const allCompanies = await getAllCompanies();

  const elements = [...modal.elements];

  const body = {};

  elements.forEach((element) => {
    if (element.tagName == "INPUT" && element.value !== "") {
      body[element.id] = element.value;
    }
    if (element.tagName == "SELECT") {
      allCompanies.forEach((company) => {
        if (company.name == element.value) {
          body[element.id] = company.uuid;
        }
      });
    }
  });
  createDepartmentRequest(body);
}

// Get values of input tag and request to edit a department
async function getDataFromEditModal(event, modal, id) {
  event.preventDefault();

  const elements = [...modal.elements];

  const body = {};

  elements.forEach((element) => {
    if (element.tagName == "INPUT" && element.value !== "") {
      body[element.id] = element.value;
    }
  });

  editRequest(body, id);
}

// Get values of select tag and request to edit a user
async function getDataFromEditUserModal(event, modal, id) {
  event.preventDefault();

  const elements = [...modal.elements];

  const body = {};

  elements.forEach((element) => {
    if (element.tagName == "SELECT" && element.value !== "") {
      body[element.id] = element.value;
    }
  });

  editUserRequest(body, id);
}

// Create modal and add event listener to submit and close button
export function openEditModal(description, id) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const input = document.createElement("input");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal";
  confirmButton.classList = "confirm-button";
  closeButton.classList = "close-button";

  input.setAttribute("id", "description");
  closeButton.setAttribute("type", "button");

  input.value = description;

  h2.innerText = "Editar Departamento";
  confirmButton.innerText = "Salvar alterações";
  closeButton.innerText = "X";

  modal.append(h2, input, confirmButton, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) =>
    getDataFromEditModal(event, modal, id)
  );
}

// Create modal and add event listener to submit and close button
export function openDeleteModal(id, name) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal-delete";
  confirmButton.classList = "green-button";
  closeButton.classList = "close-button";

  closeButton.setAttribute("type", "button");
  h2.innerText = `Realmente deseja deletar o\nDepartamento ${name}\ne demitir seus funcionários?`;
  confirmButton.innerText = "Confirmar";
  closeButton.innerText = "X";

  modal.append(h2, confirmButton, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) => {
    event.preventDefault();

    deleteRequest(id);
  });
}

// Create modal and add event listener to submit and close button
export function openDeleteUserModal(id, name) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal-delete";
  confirmButton.classList = "green-button";
  closeButton.classList = "close-button";

  closeButton.setAttribute("type", "button");
  h2.innerText = `Realmente deseja remover o\nusuário ${name}?`;
  confirmButton.innerText = "Deletar";
  closeButton.innerText = "X";

  modal.append(h2, confirmButton, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) => {
    event.preventDefault();

    deleteUserRequest(id, name);
  });
}

// Create modal and add event listener to submit and close button
export function openEditUserModal(id) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");
  const jobType = document.createElement("select");
  const proLevel = document.createElement("select");
  const confirmButton = document.createElement("button");
  const closeButton = document.createElement("button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "modal";
  confirmButton.classList = "confirm-button";
  closeButton.classList = "close-button";

  jobType.setAttribute("id", "kind_of_work");
  proLevel.setAttribute("id", "professional_level");
  closeButton.setAttribute("type", "button");

  jobType.insertAdjacentHTML(
    "beforeend",
    '<option value="Selecionar modalidade de trabalho">Selecionar modalidade de trabalho</option>'
  );
  jobType.insertAdjacentHTML(
    "beforeend",
    '<option value="home office">home office</option>'
  );
  jobType.insertAdjacentHTML(
    "beforeend",
    '<option value="presencial">presencial</option>'
  );
  jobType.insertAdjacentHTML(
    "beforeend",
    '<option value="hibrido">hibrido</option>'
  );

  proLevel.insertAdjacentHTML(
    "beforeend",
    '<option value="estágio">estágio</option>'
  );
  proLevel.insertAdjacentHTML(
    "beforeend",
    '<option value="júnior">júnior</option>'
  );
  proLevel.insertAdjacentHTML(
    "beforeend",
    '<option value="sênior">sênior</option>'
  );
  proLevel.insertAdjacentHTML(
    "beforeend",
    '<option value="pleno">pleno</option>'
  );

  h2.innerText = "Editar Usuário";
  confirmButton.innerText = "Salvar alterações";
  closeButton.innerText = "X";

  modal.append(h2, jobType, proLevel, confirmButton, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  modal.addEventListener("submit", (event) =>
    getDataFromEditUserModal(event, modal, id)
  );
}

export async function openDepartmentModal(id, department) {
  const body = document.querySelector("body");
  const modalWrapper = document.createElement("section");
  const modal = document.createElement("form");
  const h2 = document.createElement("h2");

  const div1 = document.createElement("div");
  const description = document.createElement("h3");
  const userSelect = document.createElement("select");

  const div2 = document.createElement("div");
  const company = document.createElement("p");
  const hireButton = document.createElement("button");

  const userslist = document.createElement("ul");

  const closeButton = document.createElement("button");

  h2.innerText = department.name;
  description.innerText = department.description;
  company.innerText = department.companies.name;
  hireButton.innerText = "Contratar";
  closeButton.innerText = "X";
  closeButton.setAttribute("type", "button");

  modalWrapper.classList = "modal-wrapper";
  modal.classList = "department-modal";
  div1.classList = "descrip-select";
  div2.classList = "company-button";
  userslist.classList = "department-users-ul";
  hireButton.classList = "green-button";
  closeButton.classList = "close-button";

  div1.append(description, userSelect);
  div2.append(company, hireButton);
  modal.append(h2, div1, div2, userslist, closeButton);
  modalWrapper.append(modal);
  body.append(modalWrapper);

  const allUsers = await getAllUsers();
  allUsers.forEach((user) => {
    if (user.username != "ADMIN") {
      if (user.department_uuid == null) {
        userSelect.insertAdjacentHTML(
          "beforeend",
          `<option value="${user.uuid}">${user.username}</option>`
        );
      } else if (user.department_uuid == id) {
        const li = document.createElement("li");
        const div = document.createElement("div");
        const username = document.createElement("h3");
        const proLevel = document.createElement("p");
        const company = document.createElement("p");
        const dismissButton = document.createElement("button");

        li.setAttribute("id", user.uuid);
        dismissButton.setAttribute("type", "button");

        username.innerText = user.username;
        proLevel.innerText = user.professional_level;
        company.innerText = department.companies.name;
        dismissButton.innerText = "Desligar";

        div.append(username, proLevel, company);
        li.append(div, dismissButton);
        userslist.append(li);

        dismissButton.addEventListener("click", (event) => {
          const id = event.path[1].id;
          dismissUserRequest(id);
        });
      }
    }
  });

  closeButton.addEventListener("click", () => {
    modalWrapper.remove();
  });

  hire(modal, department.uuid);
}

import { getAllCompanies } from "../../home/scripts/requests.js";
import {
  openEditModal,
  openModal,
  openDeleteModal,
  openDeleteUserModal,
  openEditUserModal,
  openDepartmentModal,
} from "./modal.js";
import { getAllDepartments, getAllUsers, hireUserRequest } from "./requests.js";
import { isAdm } from "../../login/scripts/requests.js";

// Checks if user is adm to access the admin page
async function validateAdmin() {
  const token = localStorage.getItem("token");

  if (token == null) {
    window.location.replace("../index.html");
  } else if (!(await isAdm())) {
    window.location.replace("../userPage/user.html");
  }
}

// Generate a option on select tag for each company on the API
async function generateOptions() {
  const selectCompanies = document.querySelector("#companies");
  const allCompanies = await getAllCompanies();

  allCompanies.forEach((element) => {
    selectCompanies.insertAdjacentHTML(
      "beforeend",
      `<option value="${element.name}">${element.name}</option>`
    );
  });
}

// Event listener on select tag to render the departments
async function selectEvent() {
  const departList = document.querySelector(".departamentos");
  const selectCompanies = document.querySelector("#companies");

  selectCompanies.addEventListener("change", async () => {
    const companyName = selectCompanies.value;
    const allDepartments = await getAllDepartments();

    departList.innerHTML = "";

    if (companyName === "Selecionar empresa") {
      renderAllDeparts();
    }

    allDepartments.forEach((element) => {
      if (element.companies.name == companyName) {
        createDepartmentCard(element);
      }
    });
  });
}

// Create and append a department card
function createDepartmentCard(department) {
  const departList = document.querySelector(".departamentos");
  const li = document.createElement("li");
  const departName = document.createElement("h3");
  const departDescription = document.createElement("p");
  const companyName = document.createElement("p");
  const divButtons = document.createElement("div");
  const seeMoreButton = document.createElement("button");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  li.classList = "department-card";
  li.setAttribute("id", department.uuid);

  departName.innerText = department.name;
  departDescription.innerText = department.description;
  companyName.innerText = department.companies.name;
  seeMoreButton.innerHTML =
    '<img src="../../assets/img/Vector (2).png" alt="">';
  editButton.innerHTML = '<img src="../../assets/img/Vector (3).png" alt="">';
  deleteButton.innerHTML = '<img src="../../assets/img/Vector (4).png" alt="">';

  divButtons.append(seeMoreButton, editButton, deleteButton);
  li.append(departName, departDescription, companyName, divButtons);
  departList.append(li);

  editButton.addEventListener("click", (event) => {
    const id = event.path[3].id;
    openEditModal(department.description, id);
  });

  deleteButton.addEventListener("click", (event) => {
    const id = event.path[3].id;
    const name = department.name;
    openDeleteModal(id, name);
  });

  seeMoreButton.addEventListener("click", (event) => {
    const departmentId = event.path[3].id;
    openDepartmentModal(departmentId, department);
  });
}

// Create and append a department card
async function createUserCard(user) {
  const userList = document.querySelector("#listaUsuarios");
  const li = document.createElement("li");
  const userName = document.createElement("h3");
  const userDescription = document.createElement("p");
  const companyName = document.createElement("p");
  const divButtons = document.createElement("div");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  li.classList = "department-card";
  li.setAttribute("id", user.uuid);

  userName.innerText = user.username;
  userDescription.innerText = user.professional_level;
  editButton.innerHTML = '<img src="../../assets/img/Vector (5).png" alt="">';
  deleteButton.innerHTML = '<img src="../../assets/img/Vector (4).png" alt="">';

  divButtons.append(editButton, deleteButton);
  li.append(userName, userDescription, companyName, divButtons);
  userList.append(li);

  editButton.addEventListener("click", (event) => {
    const id = event.path[3].id;
    openEditUserModal(id);
  });

  deleteButton.addEventListener("click", (event) => {
    const id = event.path[3].id;
    const name = user.username;
    openDeleteUserModal(id, name);
  });

  const userDepartId = user.department_uuid;
  const allDeparts = await getAllDepartments();
  allDeparts.forEach((department) => {
    if (userDepartId == department.uuid) {
      companyName.innerText = department.companies.name;
    }
  });
}

// Render all departments cards
async function renderAllDeparts() {
  const allDepartments = await getAllDepartments();
  allDepartments.forEach((element) => createDepartmentCard(element));
}

// Render all users cards
async function renderAllUsers() {
  const allUsers = await getAllUsers();
  allUsers.forEach((element) => {
    if (element.username != "ADMIN") {
      createUserCard(element);
    }
  });
}

// Event listener on button "+ criar"
function createButtonEvent() {
  const createButton = document.querySelector(".criar");

  createButton.addEventListener("click", () => openModal());
}

// Event listener on logout button
function logoutEvent() {
  const logoutButton = document.querySelector(".logout");

  logoutButton.addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("../index.html");
  });
}

// Event listener hire button
export async function hire(form, departmentId) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const elements = [...form.elements];
    const body = {};

    elements.forEach((element) => {
      if (element.tagName == "SELECT") {
        body["user_uuid"] = element.value;
      }
    });

    body["department_uuid"] = departmentId;

    hireUserRequest(body);
  });
}

selectEvent();
generateOptions();
renderAllDeparts();
renderAllUsers();
createButtonEvent();
logoutEvent();
validateAdmin();

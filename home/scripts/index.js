import { eventDropDown } from "./dropDown.js";
import { getAllCompanies, getAllSectors } from "./requests.js";
import { filterBySector } from "./selectEventListener.js";

eventDropDown();
generateOptions();
listAllCompanies();
filterBySector();

// Generate a option on select tag for each sector
async function generateOptions() {
  const select = document.querySelector("#selecionarSetor");
  const sectors = await getAllSectors();

  sectors.forEach((element) => {
    select.insertAdjacentHTML(
      "beforeend",
      `<option value="${element}">${element}</option>`
    );
  });
}

// Show all companies on the home page
export async function listAllCompanies() {
  const companiesList = document.querySelector(".lista-empresas");
  const companies = await getAllCompanies();

  companies.forEach((element) => {
    const li = document.createElement('li')
    const company = document.createElement('h2')
    const hours = document.createElement('p')
    const sector = document.createElement('a')
    const div = document.createElement('div')
    const divSector = document.createElement('div')

    company.innerText = element.name
    hours.innerText = element.opening_hours
    sector.innerText = element.sectors.description

    divSector.classList = 'div-sector'

    divSector.append(sector)
    div.append(hours, divSector)
    li.append(company, div)
    companiesList.append(li)
  });
}

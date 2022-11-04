import { getCompanyBySector } from "./requests.js";
import {listAllCompanies} from './index.js'

// Event listener on select tag to filter companies by sector
export function filterBySector() {
  const select = document.querySelector("select");
  const companiesList = document.querySelector(".lista-empresas");

  select.addEventListener("change", async () => {
    const sector = select.value;
    const filter = await getCompanyBySector(sector);

    if (sector == 'Selecionar Setor') {
        companiesList.innerHTML = ''
        return listAllCompanies()
    }

    companiesList.innerHTML = "";
    filter.forEach((element) => {
      const li = document.createElement("li");
      const company = document.createElement("h2");
      const hours = document.createElement("p");
      const sector = document.createElement("a");
      const div = document.createElement("div");
      const divSector = document.createElement("div");

      company.innerText = element.name;
      hours.innerText = element.opening_hours;
      sector.innerText = element.sectors.description;

      divSector.classList = "div-sector";

      divSector.append(sector);
      div.append(hours, divSector);
      li.append(company, div);
      companiesList.append(li);
    });
  });
}

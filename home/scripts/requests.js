// Get all sectors from the API
export async function getAllSectors() {
  try {
    const request = await fetch("http://localhost:6278/sectors");

    if (request.ok) {
      const response = await request.json();
      const sectors = response.map((element) => element.description);

      return sectors;
    } else {
      //toast error
    }
  } catch (err) {
    // toast error
  }
}

// Get all companies from the API
export async function getAllCompanies() {
  try {
    const request = await fetch("http://localhost:6278/companies");

    if (request.ok) {
      const response = await request.json();

      return response;
    } else {
      //toast error
    }
  } catch (err) {
    // toast error
  }
}

// Get companies, by sector, from the API
export async function getCompanyBySector(sector) {
  try {
    const request = await fetch("http://localhost:6278/companies/" + sector);

    if (request.ok) {
      const response = await request.json();

      return response;
    } else {
      //toast error
    }
  } catch (err) {
    //toast error
  }
}

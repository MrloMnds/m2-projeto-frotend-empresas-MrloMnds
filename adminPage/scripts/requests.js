import { toast } from "../../toast.js";

// Get all departments from API
export async function getAllDepartments() {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch("http://localhost:6278/departments", options);

    if (request.ok) {
      const response = await request.json();
      return response;
    }
  } catch (err) {
    console.log(err);
  }
}

// Create new department request
export async function createDepartmentRequest(body) {
  const token = localStorage.getItem("token");
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch("http://localhost:6278/departments", options);

    if (request.ok) {
      toast("success", "Departamento criado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Edit department request
export async function editRequest(body, id) {
  const token = localStorage.getItem("token");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(
      "http://localhost:6278/departments/" + id,
      options
    );

    if (request.ok) {
      toast("success", "Departamento editado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Edit user request
export async function editUserRequest(body, id) {
  const token = localStorage.getItem("token");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(
      "http://localhost:6278/admin/update_user/" + id,
      options
    );

    if (request.ok) {
      toast("success", "Usuário editado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Delete department request
export async function deleteRequest(id) {
  const token = localStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(
      "http://localhost:6278/departments/" + id,
      options
    );

    if (request.ok) {
      toast("success", "Departamento deletado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Get all users from API
export async function getAllUsers() {
  const token = localStorage.getItem("token");

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch("http://localhost:6278/users", options);

    if (request.ok) {
      const response = await request.json();

      return response;
    } else {
      //toast error
    }
  } catch (err) {
    console.log(err);
  }
}

// Delete user request
export async function deleteUserRequest(id) {
  const token = localStorage.getItem("token");
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(
      "http://localhost:6278/admin/delete_user/" + id,
      options
    );

    if (request.ok) {
      toast("success", "Usuário deletado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Hire user request
export async function hireUserRequest(body) {
  const token = localStorage.getItem("token");
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch(
      "http://localhost:6278/departments/hire/",
      options
    );

    if (request.ok) {
      toast("success", "Usuário contratado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

// Dismiss user request
export async function dismissUserRequest(id) {
  const token = localStorage.getItem("token");
  const options = {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(
      "http://localhost:6278/departments/dismiss/" + id,
      options
    );

    if (request.ok) {
      toast("success", "Usuário demitido\n com sucesso");
      setTimeout(() => {
        window.location.replace("./admin.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntente novamente");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntente novamente");
  }
}

import { toast } from "../../toast.js";

// Request user info from API
export async function getUserInfo() {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch("http://localhost:6278/users/profile", options);

    if (request.ok) {
      return request.json();
    } else {
      // Toast error
    }
  } catch (err) {
    console.log(err);
  }
}

// Request to edit users info
export async function updateUserRequest(body) {
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
    const request = await fetch("http://localhost:6278/users", options);

    if (request.ok) {
      toast("success", "Perfil editado\n com sucesso");
      setTimeout(() => {
        window.location.replace("./user.html");
      }, 1000);
    } else {
      toast("error", "Algo deu errado\ntalvez o email ja\nesteja em uso");
    }
  } catch (err) {
    toast("error", "Algo deu errado\ntalvez o email ja\nesteja em uso");
  }
}

// Request to get all coworkers
export async function getUserCoworkers() {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(
      "http://localhost:6278/users/departments/coworkers",
      options
    );

    if (request.ok) {
      return request.json();
    } else {
      // toast error
    }
  } catch (err) {
    console.log(err);
  }
}

import { toast } from "../../toast.js";

// Check if the user infos are correct via API
export async function loginRequest(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch("http://localhost:6278/auth/login", options);

    if (request.ok) {
      const response = await request.json();

      localStorage.setItem("token", response.token);

      if (await isAdm()) {
        toast('success', 'Login efetuado com sucesso!')

        setTimeout(() => {
          window.location.replace("../../adminPage/admin.html");
        }, 1000)
      } else {
        toast('success', 'Login efetuado com sucesso!')

        setTimeout(() => {
          window.location.replace("../../userPage/user.html");;
        }, 1000)
      }
    } else {
      toast('error', 'Email ou senha invalidos')
    }
  } catch (err) {
    toast('error', 'Email ou senha invalidos')
  }
}

// Check if user is admin
export async function isAdm() {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const request = await fetch(
      "http://localhost:6278/auth/validate_user",
      options
    );

    if (request.ok) {
      const response = await request.json();
      return response.is_admin;
    } else {
      toast('error', 'Não autorizado!')
    }
  } catch (err) {
    toast('error', 'Não autorizado!')
  }
}


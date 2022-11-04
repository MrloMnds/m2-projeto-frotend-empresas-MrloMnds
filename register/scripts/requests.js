import { toast } from "../../toast.js";

// Request permission from API to create a new user
export async function registerRequest(body) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };

  try {
    const request = await fetch("http://localhost:6278/auth/register", options);

    if (request.ok) {
      toast("success", "Criação de usuário bem sucedida");

      setTimeout(() => {
        window.location.replace("../../login/login.html");
      }, 1000);
    } else {
      toast('error', 'Algo deu errado,\nTalvez este usuário já exista')
    }
  } catch (err) {
    toast('error', 'Algo deu errado,\nTalvez este usuário já exista')
  }
}

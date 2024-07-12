const loggedIn = isLoggedIn();

//écoute event click sur le bouton se connecter//
const logInForm = document.getElementById("connexion");
logInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //Récupérer les valeurs entrées par l'utilisateur//
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  //déclaration de la constante logInData avec les valeurs fournies par l'utilisateur
  const logInData = {
    email: email,
    password: password,
  };
  logIn(logInData);
});

//fonction pour stocker les valeurs du token dans le localStorage et rediriger vers la page index
async function logIn(logInData) {
  try {
    const response = await fetch("http://localhost:5678/api/users/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(logInData),
    });

    if (response.ok) {
      let errorDiv = document.getElementById("login-error");
      errorDiv.style.visibility = "hidden";

      response.json().then((data) => {
        window.localStorage.setItem("token", data.token);
        window.location.replace("index.html");
      });
    } else {
      handleErrors(response);
    }
  } catch (error) {
    console.log(error);
  }
}

//fonction pour afficher des messages d'erreurs
function handleErrors(response) {
  switch (response.status) {
    case 401:
    case 404:
      errorMessage = "Erreur dans l’identifiant ou le mot de passe";
      break;
    default:
      errorMessage = "Erreur inconnue";
  }

  let errorDiv = document.getElementById("login-error");
  errorDiv.innerText = errorMessage;
  errorDiv.style.visibility = "visible";
}

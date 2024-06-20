checkToken();
//écoute event click sur le bouton se connecter//
const logInForm = document.getElementById("connexion");
logInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //Récupérer les valeurs entrées par l'utilisateur//
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  //création de la variable logInData avec les info données par l'utilisateur
  const logInData = {
    email: email,
    password: password,
  };
  logIn(logInData);
});

async function logIn(logInData) {
  const response = await fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInData),
  });

  if (response.ok) {
    response.json().then((data) => {
      window.localStorage.setItem("token", data.token);
      window.location.replace("index.html");
    });
  } else {
    handleErrors(response);
  }
}

function handleErrors(response) {
  switch (response.status) {
    case 401:
      errorMessage = "Erreur dans l’identifiant ou le mot de passe";
      break;
    case 404:
      errorMessage = "Page introuvable";
      break;
    default:
      errorMessage = "Erreur inconnue";
  }
  let errorDiv = document.getElementById("login-error");
  errorDiv.innerText = errorMessage;
  errorDiv.style.visibility = "visible";
}

//récupération sur l api//
//on poste les données login du formulaire
/*
  fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInData),
  })
    .then((response) => {
      //si la réponse n'est pas égale à une réponse positive (200)
      //utilisation du switch/case/break pour définir 2 msgs particuliers selon l'erreur
      //mise en place d'un default pour les erreurs inconnues
      if (response.status != 200) {
        switch (response.status) {
          case 401:
            errorMessage = "Erreur dans l’identifiant ou le mot de passe";
            break;
          case 404:
            errorMessage = "Page introuvable";
            break;
          default:
            errorMessage = "Erreur inconnue";
        } //récupération de l'id login-error pour rendre visible un msg à l'utilisateur en cas d'erreur d'identifiants
        let errorDiv = document.getElementById("login-error");
        errorDiv.innerText = errorMessage;
        errorDiv.style.visibility = "visible";
      } else {
        //si aucune erreur alors un token généré par le backend et la page retourne sur index.html
        response.json().then((data) => {
          window.localStorage.setItem("token", data.token);
          window.location.replace("index.html");
        });
      }
    })
    .catch((error) => {
      console.error("Le serveur ne répond pas");
    });
});
*/

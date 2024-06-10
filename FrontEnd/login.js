const logInForm = document.getElementById("connexion");
checkToken();
//écoute event click sur le bouton se connecter//
logInForm.addEventListener("submit", function (event) {
  event.preventDefault();
  //Récupérer les valeurs entrées par l'utilisateur//
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  //Connexion valide//
  //création de la variable logInData avec les info données par l'utilisateur
  const logInData = {
    email: email,
    password: password,
  };
  //récupération sur l api//
  fetch("http://localhost:5678/api/users/login", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(logInData),
  })
    .then((response) => {
      //voir pour mettre un default
      //si la réponse n'est pas égale
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
        }
        let errorDiv = document.getElementById("login-error");
        errorDiv.innerText = errorMessage;
        errorDiv.style.visibility = "visible";
      } else {
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



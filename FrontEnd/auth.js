//fonction pour checker la présence du token et maintenir la connexion de l'utilisateur


//récupération de l'id nav-connexion et ajout d'un événement au click
//si click sur logout : le token est supprimé / si plus de token, on retourne sur la page login
document
  .getElementById("nav-connexion")
  .addEventListener("click", function (event) {
    let navConnection = event.target;
    if (navConnection.innerText == "logout") {
      window.localStorage.removeItem("token");
      checkToken();
    } else {
      window.location.replace("login.html");
    }
  });


  //si le token est stocké dans le local, on affiche logout
  //sinon, on affiche login
  //affichage du bandeau édition et du bouton modifier
function checkToken() {
  let loggedIn;
  const token = window.localStorage.getItem("token");
  if(token != null) {
    const arrayToken = token.split('.');
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    const expiration = new Date(tokenPayload.exp * 1000);
    loggedIn = expiration > Date.now();
  } else {
    loggedIn = false;
  }
  document.getElementById("nav-connexion").innerText = loggedIn ? "logout" : "login";
  showElementById("bandeau-id", loggedIn);
  showElementById("btn-modifier", loggedIn);
}

//fonction pour montrer et cacher les éléments selon login/logout
function showElementById(elementId, isShown) {
  if (document.getElementById(elementId) !== null) {
    document.getElementById(elementId).style.display = isShown ? "flex" : "none";
  }
}

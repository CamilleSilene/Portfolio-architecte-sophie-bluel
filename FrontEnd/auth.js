document
  .getElementById("nav-connexion")
  .addEventListener("click", function (event) {
    let navConnection = event.target;
    if (navConnection.innerText == "Logout") {
      window.localStorage.removeItem("token");
      checkToken();
    } else {
      window.location.replace("login.html");
    }
  });

function checkToken() {
  let loggedIn = window.localStorage.getItem("token") != null;
  document.getElementById("nav-connexion").innerText = loggedIn ? "Logout" : "Login";
  showElementById("bandeau-id", loggedIn);
}

function showElementById(elementId, isShown) {
  if (document.getElementById(elementId) !== null) {
    document.getElementById(elementId).style.display = isShown ? "block" : "none";
  }
}

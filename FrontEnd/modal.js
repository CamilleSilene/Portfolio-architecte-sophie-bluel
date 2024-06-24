createModalWorksList();

//cible les événements qui ont l'attribut href pour la function openModal (tous les liens qui peuvent ouvrir une modale)
const openModal = function (event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  //retrait du display none (html)
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector(".js-close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .addEventListener("click", stopPropagation);  ;
};

//function pour fermer la modale
const closeModal = function (event) {
  event.preventDefault();
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector(".js-close-modal")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

//fermer la modale avec un clic à l'extérieur
document.addEventListener("click", (event) => {
  if (event.target.id != "btn-modifier") {
    closeModal(event);
  }
});

//empeche la propagation de l'événement par le parent
//la modale ne se ferme plus quand on clique dedans
const stopPropagation = function (event) {
  event.stopPropagation();
};

//sélectionne tous les liens qui ont la class js-modal et ajout un eventlistener
// écoute l'événement click qui lance la fonction openModal
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//fonction pour passer d'une vue à l'autre

document.getElementById("addPhoto").addEventListener("click", (event) => {
  document.getElementById("modal-add").style.display = "flex";
  document.getElementById("modal-gallery").style.display = "none";
});

//fonction pour appeler les works dans la modale
async function createModalWorksList() {
  const response = await fetch("http://localhost:5678/api/works");
  let works = await response.json();
  let gallery = document.getElementById("modal-works-list");

  gallery.innerHTML = "";

  for (const work of works) {
    console.log(work);
    let figureElement = document.createElement("figure");
    let imgElement = document.createElement("img");

    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;

    figureElement.appendChild(imgElement);

    gallery.appendChild(figureElement);
  }
}

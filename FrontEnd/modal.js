createModalWorksList();
createCategorieSelect();

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
    .addEventListener("click", stopPropagation);
};

//const pour fermer la modale
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

//action de passage de modal-gallery à modal-add
document.getElementById("addPhoto").addEventListener("click", (event) => {
  document.getElementById("modal-add").style.display = "flex";
  document.getElementById("return").style.display = "flex";
  document.getElementById("modal-gallery").style.display = "none";
});

//action de passage de modal-add à modal-gallery
document.getElementById("return").addEventListener("click", (event) => {
  document.getElementById("modal-gallery").style.display = "flex";
  document.getElementById("modal-add").style.display = "none";
  document.getElementById("return").style.display = "none";
});

//fonction pour appeler la liste des éléments dans la modale
async function createModalWorksList() {
  const response = await fetch("http://localhost:5678/api/works");
  let works = await response.json();
  let gallery = document.getElementById("modal-works-list");

  gallery.innerHTML = "";

  for (const work of works) {
    const figureElement = createModalFigure(work)
    gallery.appendChild(figureElement);
  }
}

//fonction pour créer un élément la liste dans la modale
function createModalFigure(work) {
  let figureElement = document.createElement("figure");
     figureElement.setAttribute("id", "figure-modal-" + work.id);
     let imgElement = document.createElement("img");
 
     //création du bouton delete sur chaque éléments de la galerie dans la modale
     let corbeille = document.createElement("i");
     corbeille.setAttribute("id", "btn-delete-" + work.id);
     corbeille.addEventListener("click", deleteWork);
     corbeille.innerText = "X";
 
     imgElement.src = work.imageUrl;
     imgElement.alt = work.title;
 
     figureElement.appendChild(imgElement);
     figureElement.appendChild(corbeille);
 
     return figureElement
 }

//fonction pour supprimer un élément
async function deleteWork(event) {
  const id = event.target.getAttribute("id").split('-')[2];
  if (window.confirm("Souhaitez-vous vraiment supprimer cet élément ?")) {
    const token = window.localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works/"+id,
    {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },    
      method: "DELETE",
    });
    if(response.status === 200 || response.status === 204) {
      document.getElementById("figure-modal-" + id).remove();
      document.getElementById("figure-gallery-" + id).remove();
    }
  }

}

//fonction pour le bouton select
async function createCategorieSelect() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  let select = document.getElementById("selectCategorie");

  //création select -1
  let option = document.createElement("option");
  option.innerText = "";
  option.value = -1;
  select.appendChild(option);
  //boucle pour récupérer les id de chaque catégorie et les intégrer aux options du select
  for (const category of categories) {
    let option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.id;
    select.appendChild(option);
  }
}

//ajout des éléments
document.getElementById("modal-add").addEventListener("submit", async (event) => {
  event.preventDefault();
  let elements = event.target.elements;

  const token = window.localStorage.getItem("token");
  const file = elements["file"].files[0];

  let formData = new FormData();
  formData.append("image", file);
  formData.append("title", elements["title"].value);
  formData.append("category", elements["select-categorie"].value);

  const response = await fetch("http://localhost:5678/api/works/", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + token,
    },
    body: formData,
    method: "POST",
  });

  if(response.status === 201) {
    let work = await response.json();
    /*
    let figure = createGalleryFigure(work);
    document.getElementById("gallery-works").appendChild(figure);
    figure = createModalFigure(work);
    document.getElementById("modal-works").appendChild(figure);
    */
  }
  createModalWorksList();
  createWorksList(0);
});

//fonction de validation des champs du formulaire Add
function isFormValid() {
  const fileModal = document.getElementById("addFile");
  const titleWorkModal = document.getElementById("addTitle");
  const categorieModal = document.getElementById("selectCategorie");
  console.log(fileModal.files)
  if (
    fileModal.files.length <= 0 ||
    titleWorkModal.value === "" ||
    categorieModal.value === "-1"
  ) {
    return false;
  }
  else {
    return true;
  }
}

//déclaration de la const pour que le bouton Valider devienne cliquable si le formulaire est valide
const formAddModal = document.querySelector('#form-modal');
formAddModal.addEventListener('change', function () {
    document.getElementById("btn-save-work").disabled = !isFormValid();
});



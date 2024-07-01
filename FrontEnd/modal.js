createModalWorksList();
createCategorieSelect();
createModal();
enableButton("btn-save-work", false );

//fonction de création de modale
function createModal() {
  let asideModal = document.getElementById("modal");
  modal.style.display = "none";

  //modal wrapper
  let modalWrapper = document.createElement("div");
  modalWrapper.classList.add("modal-wrapper");
  modalWrapper.classList.add("js-stop-modal");
  asideModal.appendChild(modalWrapper);

  //button close
  let buttonClose = document.createElement("button");
  buttonClose.setAttribute("id", "js-close-modal");
  modalWrapper.appendChild(createButton("js-close-modal", "fa-xmark"));

  //buttton return
  let buttonReturn = document.createElement("button");
  buttonReturn.setAttribute("id", "return");
  modalWrapper.appendChild(createButton("return", "fa-arrow-left"));

  //modalGallery
  let modalGallery = document.createElement("div");
  modalGallery.setAttribute("id", "modal-gallery");
  titleModalGallery = document.createElement("span");
  titleModalGallery.innerText = "Galerie photo";
  modalGallery.appendChild(titleModalGallery);

  //inputModalWorksList
  let modalWorksList = document.createElement("div");
  modalWorksList.setAttribute("id", "modal-works-list");
  modalGallery.appendChild(modalWorksList);

  //input submit btn-modale addPhoto
  let inputModalWorksList = document.createElement("input");
  inputModalWorksList.setAttribute("type", "submit");
  inputModalWorksList.setAttribute("id", "addPhoto");
  inputModalWorksList.classList.add("btn-modale");
  inputModalWorksList.value = "Ajouter une photo";
  modalGallery.appendChild(inputModalWorksList);

  modalWrapper.appendChild(modalGallery);

  //modalAdd
  let modalAdd = document.createElement("div");
  modalAdd.style.display = "none";
  modalAdd.setAttribute("id", "modal-add");  
  titleModalAdd = document.createElement("span");
  titleModalAdd.innerText = "Ajout photo";
  modalAdd.appendChild(titleModalAdd);

  //modalAddForm
  let modalAddForm = document.createElement("form");
  modalAddForm.setAttribute("method", "post");
  modalAddForm.setAttribute("enctype", "multipart/form-data");
  modalAddForm.setAttribute("id", "form-modal");

  //input file
  let div = document.createElement("div");
  let inputFile = document.createElement("input");
  inputFile.setAttribute("id", "addFile");
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("name", "file");
  inputFile.setAttribute("accept", "image/png, image/jpeg");
  div.appendChild(inputFile);
  modalAddForm.appendChild(div);

  //imgPreview
  let imgPreview = document.createElement("img");
  imgPreview.setAttribute("id", "imageAddModal");
  modalAddForm.appendChild(imgPreview);

  //input title
  div = document.createElement("div");
  let labelInputTitle = document.createElement("label");
  labelInputTitle.innerText = "Titre";
  let inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "addTitle");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("value", "");
  div.appendChild(labelInputTitle);
  div.appendChild(inputTitle);
  modalAddForm.appendChild(div);

  //input select
  div = document.createElement("div");
  let labelSelectCategories = document.createElement("label");
  labelSelectCategories.innerText = "Catégories";
  let selectCategorieModal = document.createElement("select");
  selectCategorieModal.setAttribute("name", "select-categorie");
  selectCategorieModal.setAttribute("id", "selectCategorie");
  selectCategorieModal.setAttribute("value", "-1");
  div.appendChild(labelSelectCategories);
  div.appendChild(selectCategorieModal);
  modalAddForm.appendChild(div);

  //Btn-modale
  let buttonModalSave = document.createElement("input");
  buttonModalSave.setAttribute("type", "submit");
  buttonModalSave.classList.add("btn-modale");
  buttonModalSave.setAttribute("id", "btn-save-work");
  buttonModalSave.setAttribute("value", "Valider");
  modalAddForm.appendChild(buttonModalSave);

  modalAdd.appendChild(modalAddForm);
  modalWrapper.appendChild(modalAdd);

  document.getElementById("return").style.display = "none";
}

//fonction openModal
//cible les événements qui ont l'attribut href pour la function openModal (tous les liens qui peuvent ouvrir une modale)
const openModal = function (event) {
  event.preventDefault();
  const target = document.querySelector(event.target.getAttribute("href"));
  target.style.display = null;
  target.removeAttribute("aria-hidden");
  target.setAttribute("aria-modal", "true");
  modal = target;
  modal.addEventListener("click", closeModal);
  modal.querySelector("#js-close-modal").addEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .addEventListener("click", stopPropagation);
};

//fonction closeModal
const closeModal = function (event) {
  event.preventDefault();
  let modal = document.getElementById("modal");
  modal.style.display = "none";
  modal.setAttribute("aria-hidden", "true");
  modal.removeAttribute("aria-modal");
  modal.removeEventListener("click", closeModal);
  modal
    .querySelector("#js-close-modal")
    .removeEventListener("click", closeModal);
  modal
    .querySelector(".js-stop-modal")
    .removeEventListener("click", stopPropagation);
  modal = null;
};

//closeModal au click extérieur
document.addEventListener("click", (event) => {
  if (event.target.id != "btn-modifier") {
    closeModal(event);
  }
});

//fonction stopPropagation pour stopper la fermeture de la modale au click intérieur
const stopPropagation = function (event) {
  event.stopPropagation();
};

//openModal au click sur les éléments qui ont la classe js-modal
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//action de passage de modal-gallery à modal-add au click sur addPhoto
document.getElementById("addPhoto").addEventListener("click", (event) => {
  document.getElementById("modal-add").style.display = "flex";
  document.getElementById("return").style.display = "flex";
  document.getElementById("modal-gallery").style.display = "none";
});

//action de passage de modal-add à modal-gallery au click sur return
document.getElementById("return").addEventListener("click", (event) => {
  document.getElementById("modal-gallery").style.display = "flex";
  document.getElementById("modal-add").style.display = "none";
  document.getElementById("return").style.display = "none";
});

//action de passage de modal-add à modal-gallery au click sur btn-save-work
document.getElementById("btn-save-work").addEventListener("click", (event) => {
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
    const figureElement = createModalFigure(work);
    gallery.appendChild(figureElement);
  }
}

//fonction pour créer un élément la liste dans la modale + bouton delete
function createModalFigure(work) {
  let figureElement = document.createElement("div");
  figureElement.setAttribute("id", "figure-modal-" + work.id);
  figureElement.classList.add("figure");

  let imgElement = document.createElement("img");
  imgElement.classList.add("figure-img");

  //création du bouton delete sur chaque éléments de la galerie dans la modale
  let corbeille = document.createElement("button");
  corbeille.classList.add("works-corbeille");
  corbeille.setAttribute("id", "btn-delete-" + work.id);
  corbeille.addEventListener("click", deleteWork);

  let icon = document.createElement("i");
  icon.classList.add("fa-solid");
  icon.classList.add("fa-trash-can");
  icon.addEventListener("click", deleteWork);
  corbeille.appendChild(icon);

  //figureElement.appendChild(createButton("btn-delete", "fa-trash-can"));

  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  figureElement.appendChild(corbeille);
  figureElement.appendChild(imgElement);

  return figureElement;
}

//fonction pour supprimer un élément
async function deleteWork(event) {
  console.log(event.target)
  const id = event.target.getAttribute("id").split("-")[2];
  if (window.confirm("Souhaitez-vous vraiment supprimer cet élément ?")) {
    const token = window.localStorage.getItem("token");
    const response = await fetch("http://localhost:5678/api/works/" + id, {
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + token,
      },
      method: "DELETE",
    });
    if (response.status === 200 || response.status === 204) {
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
  option.value = "-1";
  select.appendChild(option);
  //boucle pour récupérer les id de chaque catégorie et les intégrer aux options du select
  for (const category of categories) {
    let option = document.createElement("option");
    option.innerText = category.name;
    option.value = category.id;
    select.appendChild(option);
  }
}

//ajout des éléments dans le form
document
  .getElementById("modal-add")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    let elements = event.target.elements;

    const token = window.localStorage.getItem("token");
    const file = elements["file"].files[0];
    console.log(file);
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

    if (response.status === 201) {
      let work = await response.json();
      let figure = createGalleryFigure(work);
      document.getElementById("gallery-works").appendChild(figure);
      figure = createModalFigure(work);
      document.getElementById("modal-works-list").appendChild(figure);
    }
    document.getElementById("form-modal").reset();
    document.getElementById("imageAddModal").reset();
  });

//fonction previewPicture
let imageAddModal = document.getElementById("imageAddModal");
document.getElementById("addFile").addEventListener("change", previewPicture);
function previewPicture(event) {
  const picture = event.target.files[0];
  if (picture) {
    const reader = new FileReader();
    reader.onload = function (loadedEvent) {
      imageAddModal.src = loadedEvent.target.result;
    };
    reader.readAsDataURL(picture);
  }
}

//fonction isFormValid > validation des champs du formulaire Add
function isFormValid() {
  const fileModal = document.getElementById("addFile");
  const titleWorkModal = document.getElementById("addTitle");
  const categorieModal = document.getElementById("selectCategorie");
  if (
    fileModal.files.length > 0 &&
    titleWorkModal.value != "" &&
    categorieModal.value != "-1"
  ) {
    console.log("valide");
    return true;
  } else {
    console.log("non valide");
    return false;
  }
}

//isFormValid > le bouton Valider devienne cliquable si le formulaire est valide
const formAddModal = document.querySelector("#form-modal");
formAddModal.addEventListener("change", function () {
  enableButton("btn-save-work", isFormValid());
});

//fonction activation bouton générique
function enableButton(elementId, enabled) {
  let element = document.getElementById(elementId);
  element.disabled = !enabled;
  if (!enabled) {
    element.classList.add("disabled");
  } else {
    element.classList.remove("disabled");
  }
}

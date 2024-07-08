createModalWorksList();
createCategorieSelect();
createModal();
enableButton("btn-save-work", false);

let imageFile;

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
  modalGallery.classList.add("modalView");
  titleModalGallery = document.createElement("h3");
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
  modalAdd.classList.add("modalView");
  titleModalAdd = document.createElement("h3");
  titleModalAdd.innerText = "Ajout photo";
  modalAdd.appendChild(titleModalAdd);

  //modalAddForm
  let modalAddForm = document.createElement("form");
  modalAddForm.setAttribute("method", "post");
  modalAddForm.setAttribute("enctype", "multipart/form-data");
  modalAddForm.setAttribute("id", "form-modal");

  //input file
  let formGroupFile = document.createElement("div");
  formGroupFile.classList.add("form-group");
  formGroupFile.setAttribute("id", "form-group-file");
  modalAddForm.appendChild(formGroupFile);
  formGroupFile.appendChild(createFormSubGroupFile());
  formGroupFile.appendChild(createModalFilePreview());

  let divErrorTypeFile = document.createElement("div");
  divErrorTypeFile.setAttribute("id", "error-type-file");
  divErrorTypeFile.classList.add("error");
  divErrorTypeFile.innerText = "Le fichier doit être en format jpg ou png";
  modalAddForm.appendChild(divErrorTypeFile);

  let divErrorSizeFile = document.createElement("div");
  divErrorSizeFile.setAttribute("id", "error-size-file");
  divErrorSizeFile.classList.add("error");
  divErrorSizeFile.innerText = "Le fichier ne doit pas dépasser 4Mo.";
  modalAddForm.appendChild(divErrorSizeFile);

  //input title
  divFormTitle = document.createElement("div");
  divFormTitle.classList.add("form-group");
  let labelInputTitle = document.createElement("label");
  labelInputTitle.classList.add("labelFormAdd");
  labelInputTitle.innerText = "Titre";
  let inputTitle = document.createElement("input");
  inputTitle.setAttribute("id", "addTitle");
  inputTitle.setAttribute("name", "title");
  inputTitle.setAttribute("value", "");
  divFormTitle.appendChild(labelInputTitle);
  divFormTitle.appendChild(inputTitle);
  modalAddForm.appendChild(divFormTitle);

  //input select
  divFormSelect = document.createElement("div");
  divFormSelect.classList.add("form-group");
  let labelSelectCategories = document.createElement("label");
  labelSelectCategories.innerText = "Catégories";
  labelSelectCategories.classList.add("labelFormAdd");
  let selectCategorieModal = document.createElement("select");
  selectCategorieModal.setAttribute("name", "select-categorie");
  selectCategorieModal.setAttribute("id", "selectCategorie");
  divFormSelect.appendChild(labelSelectCategories);
  divFormSelect.appendChild(selectCategorieModal);
  modalAddForm.appendChild(divFormSelect);

  //Btn-modale
  divFormBtn = document.createElement("div");
  divFormBtn.setAttribute("id", "formBtnDiv");
  let buttonModalSave = document.createElement("input");
  buttonModalSave.setAttribute("type", "submit");
  buttonModalSave.classList.add("btn-modale");
  buttonModalSave.setAttribute("id", "btn-save-work");
  buttonModalSave.setAttribute("value", "Valider");
  divFormBtn.appendChild(buttonModalSave);
  modalAddForm.appendChild(divFormBtn);

  modalAdd.appendChild(modalAddForm);
  modalWrapper.appendChild(modalAdd);

  document.getElementById("return").style.display = "none";
}

//fonction openModal
//cible les événements qui ont l'attribut href pour la function openModal (tous les liens qui peuvent ouvrir une modale)
function openModal (event) {
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
function closeModal(event) {
  event.preventDefault();
  resetModalForm();
  setModalView("modal-gallery");  
  document.getElementById("return").style.display = "none";
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
function stopPropagation (event) {
  event.stopPropagation();
};

//openModal au click sur les éléments qui ont la classe js-modal
document.querySelectorAll(".js-modal").forEach((a) => {
  a.addEventListener("click", openModal);
});

//fonction pour passage de vues par l'id
function setModalView(elementId) {
  let element = document.getElementById(elementId);
  let elements = document.getElementsByClassName("modalView");
  for (el of elements) {
    el.style.display = "none";
  }
  element.style.display = "flex";
}

//action de passage de modal-gallery à modal-add au click sur addPhoto
document.getElementById("addPhoto").addEventListener("click", (event) => {  
  setModalView("modal-add");
  document.getElementById("return").style.display = "flex"; 

});

//action de passage de modal-add à modal-gallery au click sur return
  document.getElementById("return").addEventListener("click", (event) => {
  setModalView("modal-gallery");
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

  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  figureElement.appendChild(corbeille);
  figureElement.appendChild(imgElement);

  return figureElement;
}

//fonction pour supprimer un élément
async function deleteWork(event) {
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
  option.setAttribute("label" ," ");
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
document.getElementById("modal-add").addEventListener("submit", async (event) => {
    event.preventDefault();
    let elements = event.target.elements;

    const token = window.localStorage.getItem("token");
    let formData = new FormData();
    formData.append("image", imageFile);
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
      closeModal(event);
    }
    document.getElementById("form-modal").reset();
    document.getElementById("imageAddModal").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
    enableButton("btn-save-work", false);
  });


//fonction previewPicture
document.getElementById("addFile").addEventListener("change", previewPicture);
function previewPicture(event) {

  if(!isFileValid()) {
    return;
  }
  const file = event.target.files[0];
  if (file) {
    imageFile = event.target.files[0];
    document.getElementById("form-subgroup-file").style.display = "none";
    document.getElementById("modal-file-preview").style.display = "flex";
    let imageAddModal = document.getElementById("imageAddModal");
    const reader = new FileReader();
    reader.onload = function (loadedEvent) {
      imageAddModal.src = loadedEvent.target.result;
    };
    reader.readAsDataURL(file); 
  }

}

document.getElementById("modal-file-preview").addEventListener("click", function(event) {
  document.getElementById("addFile").click();
});


//fonction isFormValid > validation des champs du formulaire Add
function isFormValid() {
  const titleWorkModal = document.getElementById("addTitle");
  const categorieModal = document.getElementById("selectCategorie");
  if (
    titleWorkModal.value != "" &&
    categorieModal.value != "-1" && isFileValid( )
  ) {
    return true;
  } else {
    return false;
  }
}

//fonction pour valider les valeurs de l'image à uploader
function isFileValid() {
  let isValid = true;
  const fileModal = document.getElementById("addFile");
  let errorSizeFile = document.getElementById("error-size-file");
  let errorTypeFile = document.getElementById("error-type-file");

  errorSizeFile.style.visibility = "hidden";
  errorTypeFile.style.visibility = "hidden";

  if(fileModal.files.length > 0) {
    const imageFile = fileModal.files[0];
    const imageSize = imageFile.size;
    const imageType = imageFile.type;

    if(imageSize  > 4194304 ) {
      errorSizeFile.style.visibility = "visible";
      isValid = false;
    }
    if(imageType != "image/jpeg" && imageType != "image/png") {
      errorTypeFile.style.visibility = "visible";
      isValid = false;
    }
  } else {
    isValid = false;
  }
  return isValid;
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

// input file + preview

function createFormSubGroupFile() {

  let formSubGroupFile = document.createElement("div");
  formSubGroupFile.setAttribute("id", "form-subgroup-file");

  let inputFile = document.createElement("input");
  inputFile.setAttribute("id", "addFile");
  inputFile.setAttribute("type", "file");
  inputFile.setAttribute("name", "file");
  inputFile.setAttribute("accept", "image/png, image/jpeg");

  let iconeFileFormAdd = document.createElement("i");
  iconeFileFormAdd.setAttribute("id", "iconeFile");
  iconeFileFormAdd.classList.add("fa-regular");
  iconeFileFormAdd.classList.add("fa-file-image");

  let btnUpload = document.createElement("a");
  btnUpload.innerText = "+ Ajouter photo";
  btnUpload.setAttribute("id", "uploadPhoto")
  btnUpload.classList.add("btn-bluel");
  btnUpload.addEventListener('click', (event) => {
    inputFile.click();
  });

  let rulesFile = document.createElement("span");
  rulesFile.setAttribute("id", "rulesAddFiles");
  rulesFile.innerText = "jpg, png : 4mo max";

  formSubGroupFile.appendChild(iconeFileFormAdd);
  formSubGroupFile.appendChild(btnUpload);
  formSubGroupFile.appendChild(rulesFile);
  formSubGroupFile.appendChild(inputFile);

  return formSubGroupFile;
}

function createModalFilePreview( ) {
  let divFilePreview = document.createElement("div");
  divFilePreview.setAttribute("id", "modal-file-preview");
  let imgPreview = document.createElement("img");
  imgPreview.setAttribute("id", "imageAddModal");
  imgPreview.setAttribute("alt", "image");
  imgPreview.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
  divFilePreview.appendChild(imgPreview);
  return divFilePreview;
}

function resetModalForm( ) {
  document.getElementById("form-modal").reset();
  document.getElementById("imageAddModal").src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNgYAAAAAMAASsJTYQAAAAASUVORK5CYII=";
  document.getElementById("form-subgroup-file").style.display = "flex";
  document.getElementById("modal-file-preview").style.display = "none";
}

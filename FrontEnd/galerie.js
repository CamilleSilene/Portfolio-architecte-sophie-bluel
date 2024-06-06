createWorksList(0); // (0) pour avoir un Tous au démarrage de l'appli
createWorksFilters();

console.log(window.localStorage.getItem("token"));
// on créé une fonction pour créer la liste des Works en utilisant le paramètre "idCateory" - idCategory est lié aux éléments Works
async function createWorksList(idCategory) {
  //on va chercher sur l'api le tableau des différents travaux
  const response = await fetch("http://localhost:5678/api/works");
  let works = await response.json();
  //si la catégorie n'est pas égale à 0
  if (idCategory != 0) {
    //alors on filtre le tableau works pour donner comme réponse l'idCategory de chaque élément work
    works = works.filter((work) => work.categoryId == idCategory);
  }
  //rajouter un id gallery au cas où il y a une modif html
  let gallery = document.getElementsByClassName("gallery")[0];

  //on vide la page entièrement
  gallery.innerHTML = "";
  // pour chaque work dans le tableau works
  for (const work of works) {
    // on construit un element figureElement
    let figureElement = document.createElement("figure");

    // on construit un element img , on l'ajoue à  figureElement
    let imgElement = document.createElement("img");
    // on donne la propriété X du work à l'élément X 
    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;
    //on rattache l'élément à son parent
    figureElement.appendChild(imgElement);

    // on construit un element fig caption, on l'ajoue à  figureElement
    let figCaptionElement = document.createElement("figcaption");
    // on donne la propriété X du work à l'élément X 
    figCaptionElement.innerText = work.title;
     //on rattache l'élément à son parent
    figureElement.appendChild(figCaptionElement);

    // on ajout figureElement à .gallery
    gallery.appendChild(figureElement);
  }
}

//créer la fonction pour filtrer la galerie

async function createWorksFilters() {
  //récupérer les différentes catégories via un appel API
  const response = await fetch("http://localhost:5678/api/categories");
  //transformation de la réponse en langage json
  const categories = await response.json();


  //ajouter l'objet catégorie dans le tableau - simulation que le backend a envoyé la catégorie 0
  //récupération des catégories
  //ajouter un id à categorie
  let categoriesElements = document.getElementsByClassName("categories")[0];

  //option permettant d'afficher toutes les catégories par défaut
  let div = document.createElement("div");
  //ajout d'une class au div des filtres
  div.classList.add("category-item");
  //ajout de la classe active par défaut
  div.classList.add("active");
  //ajout de la catégorie Tous
  div.innerText = "Tous";
  //ajout d'un id à la catégorie Tous
  //à revoir l'utilité
  div.id = "category-0";
  //ajout de la propriété dataset.id aux éléments filtres
  //(id="category-1" et on ne peut pas avoir juste id="1"  
  // un id doit etre unique, l'id de l'objet recupéré en backend ne sera pas suffisant
  div.dataset.id = 0;
  //ajout des div dans categoriesElements
  categoriesElements.appendChild(div);
  //ajout d'un écouteur d'événement "click" sur les div des filtres
  div.addEventListener("click", onCategoryClick);

  //création de la boucle des différents éléments de la liste
  for (const category of categories) {
    //création d'un élément de la liste ul écrite en html
    let div = document.createElement("div");
    div.classList.add("category-item");
    // attribution category.name à l'ajout de texte au contenu du li
    div.innerText = category.name;
    // un id doit etre unique, l'id de l'objet recupéré en backend ne sera pas suffisant
    //voir si besoin vu qu'il existe le dataset
    div.id = "category-" + category.id;
    div.dataset.id = category.id;
    //ajout de l'élément li à la liste ul
    categoriesElements.appendChild(div);
    //écoute de l'événement click lorsque l'utilisateur clique sur les div filtres
    div.addEventListener("click", onCategoryClick);
  }
}
//action de filtrage avec l'événement
// créer la fonction événément qui peut être écouter lors d'un clic
function onCategoryClick(event) {
  //
  const idCategory = event.target.dataset.id;
  //création d'un tableau avec en paramètre idCategory : prise en compte de la catégorie active "en cours"
  createWorksList(idCategory);
  // récupérer tous les éléments avec la classe category-item
  
  const categoriesItems = document.getElementsByClassName("category-item");
  for (let item of categoriesItems) {
    //retirer la classe active à tous les éléments
    item.classList.remove("active");
  }
  //pour ne garder que le filtre actif
  event.target.classList.add("active");
}
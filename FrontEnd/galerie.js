createWorksList(0);// (0) pour avoir un Tous au démarrage de l'appli
createWorksFilters();


async function createWorksList(idCategory) {
  const response = await fetch("http://localhost:5678/api/works");
  let works = await response.json();
  let gallery = document.getElementsByClassName("gallery")[0];
  gallery.innerHTML = "";
  //si la catégorie n'est pas "Tous" alors on filtre les works
  if(idCategory != 0) {
    works = works.filter((work) => work.categoryId == idCategory);
  }
  // pour chaque work dans works
  for (const work of works) {
    // on construit un element figureElement
    let figureElement = document.createElement("figure");

    // on construit un element img , on l'ajoue à  figureElement
    let imgElement = document.createElement("img");
    imgElement.src = work.imageUrl;
    imgElement.alt = work.title;
    figureElement.appendChild(imgElement);

    // on construit un element fig caption, on l'ajoue à  figureElement
    let figCaptionElement = document.createElement("figcaption");
    figCaptionElement.innerText = work.title;
    figureElement.appendChild(figCaptionElement);

    // on ajout figureElement à .gallery
    gallery.appendChild(figureElement);
  }
}

//créer la fonction pour filtrer la galerie

async function createWorksFilters() {
  //récupérer les différentes catégories via un appel API
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();
  
  //récupération des catégories
  let categoriesElements = document.getElementsByClassName("categories")[0];

  //option permettant d'afficher toutes les catégories par défaut
  let div = document.createElement("div");
  //ajout d'une class au div des filtres
  div.classList.add("category-item");
  //ajout de la catégorie Tous
  div.innerText = "Tous";
  //ajout d'un id à la catégorie Tous
  div.id = "category-0";
  div.dataset.id = 0;
  //ajout des div dans categoriesElements
  categoriesElements.appendChild(div);
  div.addEventListener("click", onCategoryClick);

  //création de la boucle des différents éléments de la liste
  for (const category of categories) {
    //création d'un élément de la liste ul écrite en html
    let div = document.createElement("div");
    div.classList.add("category-item");
    // attribution category.name à l'ajout de texte au contenu du li
    div.innerText = category.name;
    // un id doit etre unique, l'id de l'objet recupéré en backend ne sera pas suffisant
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
function onCategoryClick( event ) {
    createWorksList(event.target.dataset.id);
    console.log(event.target.dataset.id);
    // enlever classe 'active' à tous les category-item
    
    let categoriesItems = document.getElementsByClassName("category-item");
    for(let item of categoriesItems) {
        item.classList.remove("active");
    }
    event.target.classList.add("active");
    
}




createWorksList(0); // (0) pour avoir un Tous au démarrage de l'appli

const loggedIn = isLoggedIn();
document.getElementById("bandeau-id").style.display = loggedIn ? "flex" : "none";
document.getElementById("btn-modifier").style.display = loggedIn ? "flex" : "none";
if ( !loggedIn ) {
  createWorksFilters();
}




// on créé une fonction pour créer la liste des Works en utilisant le paramètre "idCateory" - idCategory est lié aux éléments Works
//on va chercher sur l'api le tableau des différents travaux
async function createWorksList(idCategory) {
  const response = await fetch("http://localhost:5678/api/works");
  let works = await response.json();
  //si la catégorie n'est pas égale à 0
  //alors on filtre le tableau works pour donner comme réponse l'idCategory de chaque élément work
  if (idCategory != 0) {
    works = works.filter((work) => work.categoryId == idCategory);
  }
  //rajouter un id gallery au cas où il y a une modif html
  let gallery = document.getElementById("gallery-works");

  //on vide la page entièrement

  gallery.innerHTML = "";

  // pour chaque work dans le tableau works
  // on construit un element figureElement
  // on construit un element img , on l'ajoue à  figureElement
  // on donne la propriété X du work à l'élément X
  //on rattache l'élément à son parent
  for (const work of works) {
    const figureElement = createGalleryFigure(work);
    // on ajoute figureElement à .gallery
    // gallery.appendChild(createGalleryFigure(work));
    gallery.appendChild(figureElement);
  }
}
//créer la fonction pour filtrer la galerie
//récupérer les différentes catégories via un appel API
//transformation de la réponse en langage json

async function createWorksFilters() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categories = await response.json();

  //ajouter l'objet catégorie Tous dans le tableau

  categories.unshift({
    id: 0,
    name: "Tous",
  });

  //récupération des catégories
  let categoriesElements = document.getElementById("categories-works");
  //création de la boucle des différents éléments de la liste categories
  //création d'un élément de la liste ul écrite en html
  // attribution category.name à l'ajout de texte au contenu des div filtres
  //ajouter un id à categorie
  // un id doit etre unique, l'id de l'objet recupéré en backend ne sera pas suffisant
  //écoute de l'événement click lorsque l'utilisateur clique sur les div filtres
  for (const category of categories) {
    let div = document.createElement("div");
    div.classList.add("category-item");
    div.innerText = category.name;
    div.dataset.id = category.id;
    categoriesElements.appendChild(div);
    div.addEventListener("click", onCategoryClick);
  }
  document.querySelector(".category-item[data-id='0']").classList.add("active");
}
//action de filtrage avec l'événement
// créer la fonction événément qui peut être écouter lors d'un clic
function onCategoryClick(event) {
  const idCategory = event.target.dataset.id;
  //création d'un tableau avec en paramètre idCategory : prise en compte de la catégorie active "en cours"
  // récupérer tous les éléments avec la classe category-item
  createWorksList(idCategory);

  const categoriesItems = document.getElementsByClassName("category-item");
  for (let item of categoriesItems) {
    //retirer la classe active à tous les éléments
    item.classList.remove("active");
  }
  //pour ne garder que le filtre actif
  event.target.classList.add("active");
}

function createGalleryFigure(work)
{
  let figureElement = document.createElement("figure");
  figureElement.setAttribute("id", "figure-gallery-" + work.id);
  let imgElement = document.createElement("img");

  imgElement.src = work.imageUrl;
  imgElement.alt = work.title;

  figureElement.appendChild(imgElement);

  // on construit un element fig caption, on l'ajoue à  figureElement
  // on donne la propriété X du work à l'élément X
  //on rattache l'élément à son parent
  let figCaptionElement = document.createElement("figcaption");
  figCaptionElement.innerText = work.title;
  figureElement.appendChild(figCaptionElement);

  return figureElement;
}
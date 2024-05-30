createWorksList( )

async function createWorksList( ) {
    const response = await fetch("http://localhost:5678/api/works")
    const works = await response.json()

    // pour chaque work dans works
    for(const work of works) {
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
        let gallery = document.getElementsByClassName("gallery")[0];
        gallery.appendChild(figureElement);
    }

}



//cible les événements qui ont l'attribut href pour la function openModal (tous les liens qui peuvent ouvrir une modale)
const openModal = function (event) {
    event.preventDefault();
    const target = document.querySelector(event.target.getAttribute('href'));
    //retrait du display none (html)
    target.style.display = null;
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').addEventListener('click', closeModal);
    modal.querySelector('.js-stop-modal').addEventListener('click', stopPropagation);
}

//function pour fermer la modale
const closeModal = function (event) {
    event.preventDefault();
    modal.style.display = "none";
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.js-close-modal').removeEventListener('click', closeModal);
    modal.querySelector('.js-stop-modal').removeEventListener('click', stopPropagation);
    modal = null;
}

//empeche la propagation de l'événement par le parent 
//la modale ne se ferme plus quand on clique dedans
const stopPropagation = function (event) {
event.stopPropagation()
}

//sélectionne tous les liens qui ont la class js-modal et ajout un eventlistener
// écoute l'événement click qui lance la fonction openModal
document.querySelectorAll('.js-modal').forEach(a=> {
    a.addEventListener('click', openModal)    
})
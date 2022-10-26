import { galleryItems } from './gallery-items.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const galleryRef = document.querySelector(".gallery");
const galleryMarkup = createGalleryItemMarkup(galleryItems);
galleryRef.insertAdjacentHTML(`beforeend`, galleryMarkup);

function createGalleryItemMarkup(galleryItems) {
    return galleryItems
    .map(({preview, original, description}) => {
        return`
  <a class="gallery__item" href="${original}">
    <img
      class="gallery__image"
      src="${preview}"
      alt="${description}"
    />
  </a>`;
    })
    .join("");
}

const gallery = new SimpleLightbox('.gallery a', { captionsData: 'alt', animationSpeed: 250 });





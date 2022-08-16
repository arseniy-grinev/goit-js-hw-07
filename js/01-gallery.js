import { galleryItems } from './gallery-items.js';
// Change code below this line

console.log(galleryItems);

const galleryContainer = document.querySelector('.gallery');
const galleryMarkup = createGalleryMarkup(galleryItems);

galleryContainer.insertAdjacentHTML('beforeend', galleryMarkup);

galleryContainer.addEventListener('click', onGalleryContainerClick);

const instance = basicLightbox.create(
  `
        <img src="">
    `,
  {
    onShow: (instance) => {
      window.addEventListener("keydown", onModalEsc);
    },
    onclose: (instance) => {
      window.removeEventListener("keydown", onModalEsc);
    },
  }
);


function createGalleryMarkup(items) {
    return items.map(({ description, original, preview }) => {
        return `
            <div class="gallery__item">
                <a class="gallery__link" href="${original}">
                    <img
                    class="gallery__image"
                    src="${preview}"
                    data-source="${original}"
                    alt="${description}"
                    />
                </a>
            </div>
        `;
    }).join('');
    
}

function onGalleryContainerClick(e) {
    e.preventDefault();
    if (!e.target.classList.contains("gallery__image")) return;
    
    const imgSource = e.target.dataset.source;
    instance.element().querySelector("img").src = imgSource;
    instance.show();
 }

function onModalEsc(e) {
    if (e.code === "Escape") {
        console.log("press esc");
        instance.close();
    }
}   

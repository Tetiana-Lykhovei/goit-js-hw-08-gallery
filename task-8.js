import galleryItems from './gallery-items.js';
// console.log(galleryItems);

const gallery = document.querySelector('.js-gallery');
const closeModalBtn = document.querySelector('button[data-action="close-lightbox"]');
const backDropRef = document.querySelector('.js-lightbox');
const lightboxImg = document.querySelector('.lightbox__image');
const OverlayRef = document.querySelector('.lightbox__overlay');

const createGalleryList = ({ preview, original, description }) => {
    return `
    <li class ='gallery__item'>
    <a class = "gallery__link"
    href = '${original}'>
    <img class = "gallery__image"
    src = '${preview}' data-source = '${original} ' alt = '${description}'>
    </a>
    </li>`;
};

const createHTML = galleryItems.map(createGalleryList).join('');
gallery.insertAdjacentHTML("beforeend", createHTML)
// console.log(createHTML);

gallery.addEventListener("click", onPicClick);

function onPicClick(event) {
    event.preventDefault();
    // console.log(event.target.dataset);
    // console.log(event.target.nodeName);
   
    if (event.target.nodeName !== 'IMG') {
        console.log('мимо')
        return; 
    } else {
        console.log(event.target.dataset.source)
    };

    backDropRef.classList.add('is-open');
    lightboxImg.src = event.target.dataset.source
    window.addEventListener('keydown', onPressEscape);
};

closeModalBtn.addEventListener('click', onCloseModal);
OverlayRef.addEventListener('click', onBackDropClick);

function onCloseModal() {
    window.removeEventListener('keydown', onPressEscape);
    backDropRef.classList.remove('is-open');
    lightboxImg.src = ''
}

function onBackDropClick(event) {

    if (event.target === event.currentTarget) {
        onCloseModal();
    }
    lightboxImg.src = ''
} 

function onPressEscape(event) {
    if (event.code === 'Escape') {
        onCloseModal();
    }
}
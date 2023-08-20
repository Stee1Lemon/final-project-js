import * as basicLightbox from 'basiclightbox';

export function createModal(htmlContent) {
  const instance = basicLightbox.create(htmlContent);

  function closeModal() {
    instance.close();
    removeEventListeners();
  }

  function addEventListeners() {
    instance.element().addEventListener('click', (e) => {
      if (e.target === instance.element()) {
        closeModal();
      }
    });

    const closeButton = instance.element().querySelector('.close-button');
    if (closeButton) {
      closeButton.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    });
  }

  function removeEventListeners() {
    instance.element().removeEventListener('click', closeModal);
    const closeButton = instance.element().querySelector('.close-button');
    if (closeButton) {
      closeButton.removeEventListener('click', closeModal);
    }
    document.removeEventListener('keydown', closeModal);
  }

  instance.show();
  addEventListeners();
}

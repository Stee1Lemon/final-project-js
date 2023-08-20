import * as basicLightbox from 'basiclightbox';
import 'basiclightbox/dist/basicLightbox.min.css';

export function createModal(content) {
  const instance = basicLightbox.create(
    `
    <div class="modal">
      ${content}
      <button class="close-button" aria-label="Close">&#10006;</button>
    </div>
    `,
    {
      onShow: instance => {
        instance.element().addEventListener('click', adListenerToCloseBtn);
        document.addEventListener('keydown', escListener);
      },
    }
  );

  function adListenerToCloseBtn(e) {
    if (
      e.target === instance.element() ||
      e.target.classList.contains('close-button')
    ) {
      instance.close();
    }
  }

  function escListener(e) {
    if (e.key === 'Escape') {
      removeListeners(instance, escListener);
      instance.close();
    }
  }

  function removeListeners(instance, escListener) {
    const element = instance.element();
    if (element) {
      element.removeEventListener('click', adListenerToCloseBtn);
    }
    document.removeEventListener('keydown', escListener);
  }
  

  instance.show();
}
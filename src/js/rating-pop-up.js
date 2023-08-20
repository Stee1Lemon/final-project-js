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
      onShow: (instance) => {
        instance.element().addEventListener('click', (e) => {
          if (e.target === instance.element() || e.target.classList.contains('close-button')) {
            instance.close();
          }
        });

        const escListener = (e) => {
          if (e.key === 'Escape') {
            instance.close();
          }
        };
        document.addEventListener('keydown', escListener);

        instance.on('close', () => {
          instance.element().removeEventListener('click', escListener);
          document.removeEventListener('keydown', escListener);
        });
      },
    }
  );

  instance.show();
}

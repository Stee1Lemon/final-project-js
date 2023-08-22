import { Notify } from "notiflix";
import {saveInLocalStorageModal} from './local-storage';
import {resetLocalStorageModal} from './local-storage';
import { createModal } from './open-any-modal';

const openBtn = document.querySelector('.btn-open-order');
openBtn?.addEventListener('click', openOrderModal);

function openOrderModal(){
  createModal(orderModalMarkup());
  const form = document.querySelector('.form-oder');
  form?.addEventListener('input', () => {dataForm = {
  name: name.value, 
  phone: phone.value, 
  email: email.value, 
  comment: comment.value 
  }});
  form?.addEventListener('submit', submitForm);
  const {name, phone, email, comment} = form.elements;
  function submitForm(e) {
        e.preventDefault();
        
        if(name.value === '' || phone.value === '' || email.value === '')
        return Notify.info('Please, fill name, phone and email!');
    
        // відсилання на бек
        getBack();
    
        e.currentTarget.reset();
        // resetLocalStorageModal();
        // dataForm = {};
  }
    
  function getBack() {
        console.log(dataForm);
  }
}


function orderModalMarkup(){
  return `<div class="modal-order">
  <button class="order-btn-close close-button" type="button">x</button>
  <p class="order-title">Order now</p>
  <form class="form-oder">
    <label class="order-form-label">
      <span class="order-form-span">Name</span>
      <input
        class="order-form-input"
        type="text"
        name="name"
        pattern="[A-z]{1,15}"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Phone number</span>
      <input
        class="order-form-input"
        type="text"
        name="phone"
        pattern="[0-9]{10}"
      />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Email</span>
      <input class="order-form-input" type="email" name="email" />
    </label>
    <label class="order-form-label">
      <span class="order-form-span">Comment</span>
      <textarea class="order-form-textarea" name="comment"></textarea>
    </label>
    <button class="order-submit base-btn" type="submit">Send</button>
  </form>
</div>`
}

// // form?.addEventListener('submit', resetLocalStorageModal);
// // form?.addEventListener('input', saveInLocalStorageModal);


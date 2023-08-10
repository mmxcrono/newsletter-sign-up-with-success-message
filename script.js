
const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
const state = {
  email: '',
}
const actions = {
  onEmailChange: (ev) => actions.validateEmail(ev.target.value),
  validateEmail: (value) => {
    state.email = value;

    const isBadEmail = !EMAIL_REGEX.test(value);

    utils.toggleClass('email-input', 'error', isBadEmail);
    utils.toggleClass('email-error-message', 'show', isBadEmail);
    utils.setAttribute('subscribe-button', 'disabled', isBadEmail);
    

    return !isBadEmail;
  },
  submit: (ev) => {
    ev.preventDefault();
    
    for (const item of document.getElementsByClassName('email-input')) {
      if (!actions.validateEmail(item.value)) {
        return;
      }
    }
    
    for (const item of document.getElementsByClassName('email-display')) {
      item.innerHTML = state.email;
    }

    utils.toggleClass('content', 'hide', true);
    actions.toggleModal();
  },
  toggleModal: () => utils.toggleClass('success-modal', 'show', true),
  dismiss: () => utils.toggleClass('success-modal', 'show', false),
};

const utils = {
  toggleClass: (targetClass, className, isAdd = false) => {
    for (const item of document.getElementsByClassName(targetClass)) {
      if (isAdd) {
        item.classList.add(className);
      }
      else {
        item.classList.remove(className);
      }
    }
  },
  setAttribute: (targetClass, attribute, value) => {
    for (const item of document.getElementsByClassName(targetClass)) {
      if (value === false) {
        item.removeAttribute(attribute);
      }
      else {
        item.setAttribute(attribute, value);
      }
    }
  }
}
const signupFormHandler = async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();

  if (name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
      headers: { 'Content-type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      modal.classList.remove('hide');
      return;
    }
  }
};

const modal = document.querySelector('#myModal');
const span = document.querySelector('#modal-close');

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);

span.addEventListener(
  'click',
  () => {
    modal.classList.add('hide');
  },
  false
);

window.addEventListener(
  'click',
  (event) => {
    if (event.target === modal) {
      modal.classList.add('hide');
    }
  },
  false
);

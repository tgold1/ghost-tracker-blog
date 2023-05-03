const loginFormHandler = async (event) => {
  event.preventDefault();

  const user_name = document.querySelector('#user_name-login').value.trim();
  const password = document.querySelector('#password-login').value.trim();

  if (user_name && password) {
    const response = await fetch('/api/users/login', {
      method: 'POST',
      body: JSON.stringify({ user_name, password }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

const signupFormHandler = async function (event) {
  event.preventDefault();

  const usernameEl = document.querySelector('#name-signup');
  const passwordEl = document.querySelector('#password-signup');

  const response = await fetch('/api/users', {
    method: 'POST',
    body: JSON.stringify({
      user_name: usernameEl.value,
      password: passwordEl.value,
    }),
    headers: { 'Content-Type': 'application/json' },
  });

  if (response.ok) {
    document.location.replace('/');
  } else {
    alert('Failed to sign up');
  }
};

document
  .querySelector('.login-form')
  .addEventListener('submit', loginFormHandler);

document
  .querySelector('.signup-form')
  .addEventListener('submit', signupFormHandler);
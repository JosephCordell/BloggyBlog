const postSubmission = async function (event) {
  event.preventDefault();

  const title = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;

  if (title && body) {
    try {
      const response = await fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
          title,
          body,
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        document.location.replace('/dashboard');
      }
    } catch (err) {
      res.status(500).json(err);
    }
  }
};

document
  .querySelector('#new-post-form')
  .addEventListener('submit', postSubmission);

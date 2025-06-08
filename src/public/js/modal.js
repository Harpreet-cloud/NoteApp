document.addEventListener('DOMContentLoaded', () => {
  let formToSubmit;

  document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', function (event) {
      const clickedButton = event.currentTarget;
      const noteId = clickedButton.dataset.id;
      formToSubmit = document.querySelector(`form[data-id='${noteId}']`);
      console.log('Form to submit:', formToSubmit);  // optional debug
    });
  });

  document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (formToSubmit) {
      console.log('Submitting form now'); // optional debug
      formToSubmit.submit();
    } else {
      console.warn('No form selected to submit');
    }
  });
});

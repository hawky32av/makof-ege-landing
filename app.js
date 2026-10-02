const dialog = document.querySelector('#contact-dialog');
const openers = document.querySelectorAll('.js-open-contact');
const closer = document.querySelector('[data-close-dialog]');
const toast = document.querySelector('.toast');

function openDialog() {
  if (!dialog) return;
  dialog.showModal();
  document.body.classList.add('dialog-open');
  const firstInput = dialog.querySelector('input');
  window.setTimeout(() => firstInput?.focus(), 50);
}

function closeDialog() {
  if (!dialog) return;
  dialog.close();
  document.body.classList.remove('dialog-open');
}

openers.forEach((button) => button.addEventListener('click', openDialog));
closer?.addEventListener('click', closeDialog);

dialog?.addEventListener('click', (event) => {
  const rect = dialog.getBoundingClientRect();
  const inside = event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  if (!inside) closeDialog();
});

dialog?.addEventListener('close', () => document.body.classList.remove('dialog-open'));

document.querySelectorAll('[data-demo-form]').forEach((form) => {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    if (dialog?.open) closeDialog();
    if (!toast) return;

    toast.hidden = false;
    window.clearTimeout(window.__makofToastTimer);
    window.__makofToastTimer = window.setTimeout(() => {
      toast.hidden = true;
    }, 3500);
  });
});

// Przełącznik motywu: zapisuje wybór; bez zapisu strona idzie za systemem
// (motyw startowy ustawia skrypt w <head>, żeby nie było mignięcia).
(() => {
  const root = document.documentElement;
  const button = document.querySelector('.theme-btn');
  if (!button) return;

  const label = () => {
    button.textContent = root.dataset.theme === 'dark' ? 'Jasny' : 'Ciemny';
  };

  button.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('theme', root.dataset.theme); } catch (e) { /* tryb prywatny */ }
    label();
  });

  label();
})();

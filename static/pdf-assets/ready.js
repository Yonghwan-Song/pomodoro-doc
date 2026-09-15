// Keep Docusaurus hydration out of the combined Papersaurus document.
// All dynamic content is already rendered by the portfolio-pdf build hook.
document.addEventListener('DOMContentLoaded', () => {
  document.documentElement.setAttribute('data-theme', 'light');
  document.querySelectorAll('details').forEach(element => { element.open = true; });
});

const URL = window.location.search
const URLparams = new URLSearchParams(URL);
if(URLparams.has('erreur')) document.querySelector('.erreur-login').classList.remove('hide-content');
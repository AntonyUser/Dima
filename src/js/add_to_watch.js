import { fetchMovieById } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
const myLibraryLink = document.querySelector('.header-nav__link');
const myLibraryContainer = document.querySelector('.my-libraryMarkup');

function onAddToLocalStorage() {
  const watchedBtn = document.querySelector('.watched');
  const watchedDeleteBtn = document.querySelector('.delete-watched');
  const queueBtn = document.querySelector('.queue');
  const queueDeleteBtn = document.querySelector('.delete-queue');
  watchedBtn.addEventListener('click', onWatchedClick);
  watchedDeleteBtn.addEventListener('click', onDeleteWatchedClick);
  queueBtn.addEventListener('click', onQueueClick);
  queueDeleteBtn.addEventListener('click', onDeleteQueueClick);
}

const idWatchedArray = [];

function onWatchedClick() {
  const watchedBtn = document.querySelector('.watched');
  const watchedDeleteBtn = document.querySelector('.delete-watched');
  const currentMovie = JSON.parse(localStorage.getItem('current'));
  const currentMovieId = Number(currentMovie.id);
  //   idWatchedArray.push(currentMovieId);
  if (idWatchedArray.length === 0 || !idWatchedArray.includes(currentMovieId)) {
    idWatchedArray.push(currentMovieId);
  }
  localStorage.setItem('watched', JSON.stringify(idWatchedArray));
  watchedBtn.classList.add('visually-hidden');
  watchedDeleteBtn.classList.remove('visually-hidden');
}

function onDeleteWatchedClick() {
  const watchedBtn = document.querySelector('.watched');
  const watchedDeleteBtn = document.querySelector('.delete-watched');
  const currentMovie = JSON.parse(localStorage.getItem('current'));
  const currentMovieId = currentMovie.id;
  const indexOfDeletedFilm = idWatchedArray.indexOf(currentMovieId);
  idWatchedArray.splice(indexOfDeletedFilm, 1);
  localStorage.setItem('watched', JSON.stringify(idWatchedArray));
  if (idWatchedArray.length === 0) {
    localStorage.removeItem('watched');
  }
  watchedBtn.classList.remove('visually-hidden');
  watchedDeleteBtn.classList.add('visually-hidden');
}

const idQueueArray = [];

function onQueueClick() {
  const queueBtn = document.querySelector('.queue');
  const queueDeleteBtn = document.querySelector('.delete-queue');
  const currentMovie = JSON.parse(localStorage.getItem('current'));
  const currentMovieId = Number(currentMovie.id);
  idQueueArray.push(currentMovieId);
  if (idQueueArray.length === 0 || !idQueueArray.includes(currentMovieId)) {
    idQueueArray.push(currentMovieId);
  }
  localStorage.setItem('queue', JSON.stringify(idQueueArray));
  queueBtn.classList.add('visually-hidden');
  queueDeleteBtn.classList.remove('visually-hidden');
}

function onDeleteQueueClick() {
  const queueBtn = document.querySelector('.queue');
  const queueDeleteBtn = document.querySelector('.delete-queue');
  const currentMovie = JSON.parse(localStorage.getItem('current'));
  const currentMovieId = Number(currentMovie.id);
  const indexOfDeletedFilm = idWatchedArray.indexOf(currentMovieId);
  idQueueArray.splice(indexOfDeletedFilm, 1);
  localStorage.setItem('queue', JSON.stringify(idQueueArray));
  if (idQueueArray.length === 0) {
    localStorage.removeItem('queue');
  }
  queueBtn.classList.remove('visually-hidden');
  queueDeleteBtn.classList.add('visually-hidden');
}

myLibraryLink.addEventListener('click', libraryMarkup);

function libraryMarkup() {
  const libraryMovieList = JSON.parse(localStorage.getItem('watched'));
  //   const markup = createMovieCards(libraryMovieList);
  const movies = libraryMovieList.map(id => {
    return fetchMovieById(id);
  });
  const markup = createMovieCards(movies);
  myLibraryContainer.innerHTML = markup;
}

export { onAddToLocalStorage, libraryMarkup };

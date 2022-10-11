import { fetchTrendingMovies, fetchMovieById } from './fetchAPI';
import { createMovieCards } from './moviesMarkup';
import { modalBasicLightbox } from './modalBasicLightbox';
import Pagination from 'tui-pagination';
import 'tui-pagination/dist/tui-pagination.css';
import { onAddToLocalStorage } from './add_to_watch';
import { libraryMarkup } from './add_to_watch';

const moviesContainer = document.querySelector('.movies');
// const myLibraryLink = document.querySelector('.header-nav__link');
// const myLibraryContainer = document.querySelector('.my-libraryMarkup');

async function trendingMovies() {
  try {
    const res = await fetchTrendingMovies();
    moviesContainer.innerHTML = createMovieCards(res.results);
    const options = {
      totalItems: res.total_pages,
      itemsPerPage: 20,
      visiblePages: 4,
      centerAlign: false,
    };
    const container = document.getElementById('pagination');
    const pagination = new Pagination(container, options);

    pagination.on('afterMove', ({ page }) => {
      fetchTrendingMovies(page).then(res => {
        moviesContainer.innerHTML = createMovieCards(res.results);
      });
    });
  } catch (error) {
    console.log('error', error.message);
  }
}
trendingMovies();

moviesContainer.addEventListener('click', onMovieCardClick);
// myLibraryContainer.addEventListener('click', onMovieCardClick);

async function onMovieCardClick(e) {
  const id = e.target.closest('li').dataset.id;
  if (e.target.nodeName === 'UL') {
    return;
  }
  try {
    const film = await fetchMovieById(id);
    localStorage.setItem('current', JSON.stringify(film));
    modalBasicLightbox(film);
    onAddToLocalStorage();
    const watchedBtn = document.querySelector('.watched');
    const watchedData = JSON.parse(localStorage.getItem('watched'));
    const watchedDeleteBtn = document.querySelector('.delete-watched');
    const queueBtn = document.querySelector('.queue');
    const queueDeleteBtn = document.querySelector('.delete-queue');
    const queueData = JSON.parse(localStorage.getItem('queue'));
    const idNumber = Number(id);
    if (watchedData.includes(idNumber)) {
      watchedBtn.classList.add('visually-hidden');
      watchedDeleteBtn.classList.remove('visually-hidden');
    }
    if (queueData.includes(idNumber)) {
      queueBtn.classList.add('visually-hidden');
      queueDeleteBtn.classList.remove('visually-hidden');
    }
  } catch (error) {
    console.log(error.message);
  }
}

// async function fetchMoviesByName(event) {
//   event.preventDefault();
//   const movieName = form.elements.query.value.trim();
//   if (movieName === '') {
//     return console.log('Empty search query');
//   }
//   resetPage();

//   const res = await fetchMovies(movieName);
//   moviesContainer.innerHTML = createMovieCards(res.results);

//   const options = {
//     totalItems: res.total_pages,
//     itemsPerPage: 20,
//     visiblePages: 5,
//     centerAlign: false,
//   };
//   const container = document.getElementById('pagination');
//   const pagination = new Pagination(container, options);

//   pagination.on('afterMove', ({ page }) => {
//     fetchMovies(movieName, page)
//       .then(res => {
//         moviesContainer.innerHTML = createMovieCards(res.results);
//       })
//       .catch(error => {
//         console.log(error);
//       });
//   });
// }

// function resetPage() {
//   page = DEFAULT_PAGE;
// }

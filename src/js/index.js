import '../css/styles.css';
import axios from 'axios';
import { Notify } from 'notiflix';
import { fetchPicture } from './fetch';
import { showPictures } from './show';
const search_form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
const load_more = document.querySelector('.load-more');
let page = 1;
const totalHits = 500;
const pageSize = 40;
const totalPages = totalHits / pageSize;
let query;
axios.defaults.baseURL = 'https://pixabay.com/api';
load_more.classList.add('is-hidden');
search_form.addEventListener('submit', async e => {
  load_more.classList.add('is-hidden');
  if (query !== search_form.elements.searchQuery.value) {
    gallery.innerHTML = '';
  }
  query = search_form.elements.searchQuery.value;
  e.preventDefault();
  if (query.trim() === '') {
    gallery.innerHTML = '';
    load_more.classList.add('is-hidden');
    return;
  }
  const data = await fetchPicture(query);
  showPictures(data);
  page += 1;
  load_more.classList.remove('is-hidden');
});
load_more.addEventListener('click', async () => {
  const value = search_form.elements.searchQuery.value;
  const data = await fetchPicture(value);
  showPictures(data);
  page += 1;
  const cards = gallery.querySelectorAll('.photo-card');
  if (data.totalHits - cards.length <= 40) {
    load_more.classList.add('is-hidden');
    Notify.info("We're sorry, but you've reached the end of search results.");
       
 window.scrollBy({
  top: cardHeight * 2,
  behavior: 'smooth',
  });
  }
});
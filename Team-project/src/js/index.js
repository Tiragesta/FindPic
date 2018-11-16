const refs = {
    form: document.querySelector('.form'),
    loadMore: document.querySelector('.search-load-more'),
    loadMoreBtn: document.querySelector('.search-load-more__btn'),
    input: document.querySelector('.search-form__input'),
    grid: document.querySelector('.search-answer'),
    page: document.querySelector('.page'),
    pageHeader: document.querySelector('.page-header'),
    siteLogo: document.querySelector('.site-logo'),
    mainPage: document.querySelector('.site-logo__link'),
    favoriteTitle: document.querySelector('.favorite-title'),
    imgPerPage: 12,
  };

  let currentPage = 1;
  let currentQuery = '';

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);

//======================================================================

function handleFormSubmit(evt) {
  evt.preventDefault();

  currentQuery = refs.input.value;
  if(currentQuery === '') return;
  refsModal.favoriteTitle.innerHTML = '';
   refs.pageHeader.classList.remove('page-header');
   refs.pageHeader.classList.add('is-active');
   refs.siteLogo.classList.remove('site-logo');
   refs.siteLogo.classList.add('is-click');
   refsModal.select.classList.remove('hidden');

  currentPage = 1;
  refs.grid.innerHTML = '';
  loadPhotos();
  refs.form.reset();
}

function imagesRequest(query, page = 1) {
  const url = `https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=${query}&per_page=12&page=${page}`;

    return axios.get(url)

     .then(response => response.data)
     .catch(function (error) {
        console.log(error);
    });
}

function createGridItems(items) {
  return items.reduce(
    (markup, item) =>
    markup + `<div class="search-answer__image"><img src="${item.webformatURL}" alt=""></div>`,
    '',
  );
}

function handleLoadMoreBtnClick() {
  currentPage += 1;

  loadPhotos();
}

function loadPhotos() {

  imagesRequest(currentQuery, currentPage).then(data => {
    let total = data.totalHits;
    let counter = data.hits;
    let totalPages = Math.ceil(total / refs.imgPerPage);
    if (currentPage === totalPages)  {
      refs.loadMoreBtn.textContent = "Все картинки показаны";
      refs.loadMoreBtn.disabled = true;
    } else if (currentPage !== totalPages) {
      refs.loadMoreBtn.disabled = false;
      refs.loadMoreBtn.textContent = "Показать еще";
    }
    const markup = createGridItems(counter);
    refs.grid.insertAdjacentHTML('beforeend', markup);
    refs.page.classList.add('show-btn');
  });
}

//=================================================
function loadMainPage() {
  refsModal.favoriteTitle.innerHTML = '';
  refs.grid.innerHTML = '';
  refs.page.classList.remove('show-btn');
  refsModal.pageHeader.classList.remove('is-active');
  refsModal.pageHeader.classList.add('page-header');
  refsModal.siteLogo.classList.remove('is-click');
  refsModal.siteLogo.classList.add('site-logo');
  refsModal.select.classList.remove('hidden');
}
refs.mainPage.addEventListener('click', loadMainPage);

//refs.mainPage.addEventListener('click', loadMainPage);

//const loadMainPage = () => refsModal.page.classList.remove('search-answer');

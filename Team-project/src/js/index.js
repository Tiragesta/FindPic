const refs = {
    form: document.querySelector('.form'),
    loadMoreBtn: document.querySelector('.search-load-more__btn'),
    input: document.querySelector('.search-form__input'),
    grid: document.querySelector('.search-answer'),
    page: document.querySelector('.page'),
    pageHeader: document.querySelector('.page-header'),
    siteLogo: document.querySelector('.site-logo'),
    mainPage: document.querySelector('.site-logo__link'),
  };
  
  console.log("refs.form: ", refs.form);
  let currentPage = 1;
  let currentQuery = '';
// https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=dog

// 10502586-9b5f28e8ed93518550ea5da27
refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick);


//======================================================================

function handleFormSubmit(evt) {
  evt.preventDefault();

  currentQuery = refs.input.value;
  if(currentQuery === '') return;
   refs.pageHeader.classList.remove('page-header');
   refs.pageHeader.classList.add('is-active');
   refs.siteLogo.classList.remove('site-logo');
   refs.siteLogo.classList.add('is-click');

  currentPage = 1;
  refs.grid.innerHTML = '';
  loadPhotos();
  refs.form.reset();
}

function imagesRequest(query, page = 1) {
  const url = `https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=${query}&per_page=12&page=${page}`;

    return axios.get(url)

     .then(response => response.data.hits)

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

  imagesRequest(currentQuery, currentPage).then(photos => {
    const markup = createGridItems(photos);
    refs.grid.insertAdjacentHTML('beforeend', markup);
    refs.page.classList.add('show-btn');
  });

}

//=================================================
refs.mainPage.addEventListener('click', loadMainPage);

const loadMainPage = () => refsModal.page.classList.remove('search-answer');

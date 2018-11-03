"use strict";

var refs = {
  form: document.querySelector('.form'),
  loadMoreBtn: document.querySelector('.search-load-more__btn'),
  input: document.querySelector('.search-form__input'),
  grid: document.querySelector('.search-answer'),
  page: document.querySelector('.page'),
  pageHeader: document.querySelector('.page-header'),
  siteLogo: document.querySelector('.site-logo'),
  mainPage: document.querySelector('.site-logo__link')
};
console.log("refs.form: ", refs.form);
var currentPage = 1;
var currentQuery = ''; // https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=dog
// 10502586-9b5f28e8ed93518550ea5da27

refs.form.addEventListener('submit', handleFormSubmit);
refs.loadMoreBtn.addEventListener('click', handleLoadMoreBtnClick); //======================================================================

function handleFormSubmit(evt) {
  evt.preventDefault();
  currentQuery = refs.input.value;
  if (currentQuery === '') return;
  refs.pageHeader.classList.remove('page-header');
  refs.pageHeader.classList.add('is-active');
  refs.siteLogo.classList.remove('site-logo');
  refs.siteLogo.classList.add('is-click');
  currentPage = 1;
  refs.grid.innerHTML = '';
  loadPhotos();
  refs.form.reset();
}

function imagesRequest(query) {
  var page = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
  var url = "https://pixabay.com/api/?key=10502586-9b5f28e8ed93518550ea5da27&q=".concat(query, "&per_page=12&page=").concat(page);
  return axios.get(url).then(function (response) {
    return response.data.hits;
  }).catch(function (error) {
    console.log(error);
  });
}

function createGridItems(items) {
  return items.reduce(function (markup, item) {
    return markup + "<div class=\"search-answer__image\"><img src=\"".concat(item.webformatURL, "\" alt=\"\"></div>");
  }, '');
}

function handleLoadMoreBtnClick() {
  currentPage += 1;
  loadPhotos();
}

function loadPhotos() {
  imagesRequest(currentQuery, currentPage).then(function (photos) {
    var markup = createGridItems(photos);
    refs.grid.insertAdjacentHTML('beforeend', markup);
    refs.page.classList.add('show-btn');
  });
} //=================================================


refs.mainPage.addEventListener('click', loadMainPage);

var loadMainPage = function loadMainPage() {
  return refsModal.page.classList.remove('search-answer');
};
"use strict";

var refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list: document.querySelector('.search-answer'),
  img: document.querySelector(".pop-up__img"),
  btnSearch: document.querySelector(".search-form__btn"),
  delete: document.querySelector(".js-delete"),
  more: document.querySelector(".js-more"),
  favorite: document.querySelector('.site-favorite__link'),
  prev: document.querySelector(".js-prev"),
  next: document.querySelector(".js-next"),
  select: document.querySelector(".js-select"),
  close: document.querySelector(".js-close"),
  grid: document.querySelector('.search-answer'),
  pageHeader: document.querySelector('.page-header'),
  siteLogo: document.querySelector('.site-logo')
};

var popUpClose = function popUpClose() {
  return refsModal.page.classList.remove('pop-up_active');
};

function popUpOpen(event) {
  var ls = Array.from(document.querySelectorAll(".search-answer > div > img"));
  var targetId = ls.indexOf(event.target);
  var targetImg = ls[targetId];
  var popupImageSrc = refsModal.img;
  popupImageSrc.src = targetImg.src;

  function popUpNext() {
    var nextTargetId;

    if (targetId >= ls.length - 1) {
      targetId = 0;
      nextTargetId = targetId;
    } else {
      nextTargetId = targetId + 1;
    }

    targetId = nextTargetId;
    var nextTargetImg = ls[targetId];
    var nextPopupImageSrc = refsModal.img;
    nextPopupImageSrc.src = nextTargetImg.src;
  }

  function popUpPrev() {
    var prevTargetId;

    if (!(targetId <= 0)) {
      prevTargetId = targetId - 1;
    } else {
      targetId = ls.length - 1;
      prevTargetId = targetId;
    }

    targetId = prevTargetId;
    var prevTargetImg = ls[targetId];
    var prevPopupImageSrc = refsModal.img;
    prevPopupImageSrc.src = prevTargetImg.src;
  }

  refsModal.page.classList.add('pop-up_active');
  refsModal.next.addEventListener('click', popUpNext);
  refsModal.prev.addEventListener('click', popUpPrev);
}

refsModal.list.addEventListener('click', popUpOpen, true);
refsModal.close.addEventListener('click', popUpClose);
refsModal.list.addEventListener('click', handleBtnClick, true); // ================================

var array = [];

function handleBtnClick(evt) {
  evt.preventDefault();
  var value = evt.target.src;
  array.push(value);
}

refsModal.favorite.addEventListener('click', handleFavoriteBtnClick);
refsModal.select.addEventListener('click', handleSelectBtnClick);

function handleSelectBtnClick() {
  console.log(array);
  localStorage.setItem('images', JSON.stringify(array));
}

function handleFavoriteBtnClick() {
  refsModal.grid.innerHTML = '';
  refsModal.page.classList.remove('show-btn');
  refsModal.pageHeader.classList.remove('page-header');
  refsModal.pageHeader.classList.add('is-active');
  refsModal.siteLogo.classList.remove('site-logo');
  refsModal.siteLogo.classList.add('is-click');
  var header = "<h2 class=\"site-favorite__link\">\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</h2>";
  refsModal.grid.insertAdjacentHTML('beforeend', header);
  var arrayImg = JSON.parse(localStorage.getItem('images'));
  var elem = arrayImg.reduce(function (markup, img) {
    return markup + "<div class=\"search-answer__image\"><img src=\"".concat(img, "\" alt=\"\">\n<button class=\"btn_remove\"></button></div>");
  }, '');
  refsModal.grid.insertAdjacentHTML('beforeend', elem);
}

refsModal.list.addEventListener('click', handleDeleteImage);

function handleDeleteImage(event) {
  var nodeName = event.target.nodeName;

  if (nodeName === 'BUTTON') {
    var parent = event.target.parentNode;
    parent.remove();
  }

  ;
  removeFromLocalStorage();
}

function removeFromLocalStorage(id) {
  var imgArr = JSON.parse(localStorage.getItem('images'));
  var imgToDelete = imgArr.filter(function (el) {
    return el.url === id;
  })[0];
  imgArr.splice(imgArr.indexOf(imgToDelete), 1);
  localStorage.setItem('images', JSON.stringify(imgArr));
}
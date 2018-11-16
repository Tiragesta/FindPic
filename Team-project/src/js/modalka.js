const refsModal = {
  page: document.querySelector("body"),
  form: document.querySelector(".form"),
  list:  document.querySelector('.search-answer'),
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
  siteLogo: document.querySelector('.site-logo'),
  popUp: document.querySelector('.pop-up'),
  addToFav: document.querySelector('.add-to-fav'),
  favoriteTitle: document.querySelector('.favorite-title')
};

let imgCount = 0;


function popUpClose(e) {
  if (e.target == refsModal.popUp || e.target == refsModal.close) {
    refsModal.page.classList.remove('pop-up_active');
  }
}

function popUpOpen(event) {
  const ls = Array.from(document.querySelectorAll(".search-answer > div > img"));
  const nodeName = event.target.nodeName;
  let targetId;
  if (nodeName === 'DIV') {
    targetId = ls.indexOf(event.target.firstChild);
  } else if (nodeName === 'IMG') {
    targetId = ls.indexOf(event.target);
  }
  const targetImg = ls[targetId];
  
  const popupImageSrc = refsModal.img;
  if(targetImg === undefined) return;
  popupImageSrc.src = targetImg.src;

  function popUpNext() {
    let nextTargetId;
    if (targetId >= ls.length - 1) {
      targetId = 0;
      nextTargetId = targetId;
    } else {
      nextTargetId = targetId + 1;
    }
    targetId = nextTargetId;
    const nextTargetImg = ls[targetId];
    const nextPopupImageSrc = refsModal.img;
    nextPopupImageSrc.src = nextTargetImg.src;
  }

  function popUpPrev() {
    let prevTargetId;
    if (!(targetId <= 0)) {
      prevTargetId = targetId - 1;
    } else {
      targetId = ls.length - 1;
      prevTargetId = targetId;
    }
    targetId = prevTargetId;
    const prevTargetImg = ls[targetId];
    const prevPopupImageSrc = refsModal.img;
    prevPopupImageSrc.src = prevTargetImg.src;
  }
  refsModal.page.classList.add('pop-up_active');

  refsModal.next.addEventListener('click', popUpNext);
  refsModal.prev.addEventListener('click', popUpPrev);
}

refsModal.list.addEventListener('click', popUpOpen,true);
refsModal.close.addEventListener('click', popUpClose);
refsModal.popUp.addEventListener('click', popUpClose);

const array = [];

refsModal.favorite.addEventListener('click', handleFavoriteBtnClick);
refsModal.select.addEventListener('click',  handleSelectBtnClick);

function handleSelectBtnClick() {
  const value = refsModal.img.src;
  array.push(value);
  localStorage.setItem('images', JSON.stringify(array));

  refsModal.addToFav.classList.remove('add-to-fav');
  refsModal.addToFav.classList.add('add-to-fav__active');
  function popUpSelectBtnClick() {
    refsModal.addToFav.classList.remove('add-to-fav__active');
    refsModal.addToFav.classList.add('add-to-fav');
  }
const timerId = setTimeout(popUpSelectBtnClick, 1000);
imgCount = imgCount + 1;
return imgCount;
}

function handleFavoriteBtnClick() {
  refsModal.favoriteTitle.innerHTML = '';
  refsModal.list.innerHTML = '';
  refsModal.page.classList.remove('show-btn');
  refsModal.pageHeader.classList.remove('page-header');
  refsModal.pageHeader.classList.add('is-active');
  refsModal.siteLogo.classList.remove('site-logo');
  refsModal.select.classList.add('hidden');
  refsModal.siteLogo.classList.add('is-click');

  const arrayImg = JSON.parse(localStorage.getItem('images'));
  const header = `<h2 class="site-favorite__link">Избранное</h2><br />`;
  refsModal.favoriteTitle.insertAdjacentHTML('beforeend', header);

  const elem = arrayImg.reduce((markup, img) => markup + `<div class="search-answer__image"><img src="${img}" alt="">
<button class="btn_remove"></button></div>`,
    '',);
  refsModal.list.insertAdjacentHTML('beforeend',elem);
}

refsModal.list.addEventListener('click',  handleDeleteImage);

function handleDeleteImage(event){
  const nodeName = event.target.nodeName;

  //console.log('nodeName: ', nodeName);

  if(nodeName === 'BUTTON'){
    const parent = event.target.parentNode;
    parent.remove();

    const targetToDel = parent.firstChild.src;
    removeFromLocalStorage(targetToDel);
    imgCount = imgCount - 1;
    handleFavoriteBtnClick();
  }
  return imgCount;
}

function removeFromLocalStorage(url){
  const imgArr = JSON.parse(localStorage.getItem('images'));
  
  const imgToDelete = imgArr.filter(el => el === url)
  //console.log('valueToDelete: ', imgToDelete);
  
  imgArr.splice(imgArr.indexOf(imgToDelete), 1);
  localStorage.setItem('images', JSON.stringify(imgArr));
}



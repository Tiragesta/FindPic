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
};


const popUpClose = () => refsModal.page.classList.remove('pop-up_active');

function popUpOpen(event) {
  const ls = Array.from(document.querySelectorAll(".search-answer > div > img"));

  let targetId = ls.indexOf(event.target);

  const targetImg = ls[targetId];
  const popupImageSrc = refsModal.img;
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
refsModal.list.addEventListener('click', handleBtnClick,true);
// ================================
  const array = [];
  function handleBtnClick(evt) {
    evt.preventDefault();

    const value = evt.target.src ;
    array.push(value);

}


refsModal.favorite.addEventListener('click', handleFavoriteBtnClick);
refsModal.select.addEventListener('click',  handleSelectBtnClick);

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

   const header = `<h2 class="site-favorite__link">Избранное</h2>`;
   refsModal.grid.insertAdjacentHTML('beforeend',header);
const arrayImg = JSON.parse(localStorage.getItem('images'));
const elem = arrayImg.reduce((markup, img) => markup + `<div class="search-answer__image"><img src="${img}" alt="">
<button class="btn_remove"></button></div>`,
'',);
refsModal.grid.insertAdjacentHTML('beforeend',elem);
}

refsModal.list.addEventListener('click',  handleDeleteImage);

function handleDeleteImage(event){
  const nodeName = event.target.nodeName;

  if(nodeName === 'BUTTON'){
    const parent = event.target.parentNode;
    parent.remove();
};

removeFromLocalStorage();

}
function removeFromLocalStorage(id){
  const imgArr = JSON.parse(localStorage.getItem('images'));
const imgToDelete = imgArr.filter(el => el.url === id)[0];
imgArr.splice(imgArr.indexOf(imgToDelete), 1);
localStorage.setItem('images', JSON.stringify(imgArr));
}




const body = document.querySelector('body');

const btn = document.querySelector('.mob-menu-btn');
const burger = document.querySelector('.header-burger');
const modal = document.querySelector('.mob-menu');
const menuList = document.querySelector('.mob-menu-list');

function lockScroll() {
  body.classList.add('noscroll');
}

function unLockScroll() {
  body.classList.remove('noscroll');
}

menuList.addEventListener('click', () => {
  modal.classList.remove('mob-menu-active');
  burger.classList.toggle('active');
  unLockScroll();
});

btn.addEventListener('click', () => {
  burger.classList.toggle('active');

  if (!burger.classList.contains('active')) {
    modal.classList.remove('mob-menu-active');
    unLockScroll();
  } else {
    modal.classList.add('mob-menu-active');
    lockScroll();
  }
});

// =========================Switch-Themes===================================

const switcherWrapper = document.querySelector('.switcher-wrapper');
const switcherMenu = document.querySelector('.switcher-menu');

let blackThemes = false;
const fragment = `<span class="span-themes"
        ><span class="span-circkle"></span><span class="span-moon"></span
      ></span>`;

document.addEventListener('DOMContentLoaded', screenWidth);
window.addEventListener('resize', screenWidth);

function screenWidth() {
  if (window.innerWidth <= 768) {
    switcherWrapper.innerHTML = '';
    switcherMenu.innerHTML = fragment;
  } else {
    switcherMenu.innerHTML = '';
    switcherWrapper.innerHTML = fragment;
    modal.classList.remove('mob-menu-active');
    burger.classList.remove('active');
    unLockScroll();
  }
  initDom();
}

function initDom() {
  const btnThemes = document.querySelector('.span-themes');
  const btnCirckle = document.querySelector('.span-circkle');
  const btnMoon = document.querySelector('.span-moon');

  if (btnThemes && btnCirckle && btnMoon) {
    btnThemes.addEventListener('click', () => {
      btnThemes.classList.toggle('span-active');
      btnCirckle.classList.toggle('transform');
      btnMoon.classList.toggle('transform-moon');

      if (btnThemes.classList.contains('span-active')) {
        document.body.setAttribute('dark', '');
        blackThemes = true;
      } else {
        document.body.removeAttribute('dark', '');
        blackThemes = false;
      }
      localStorage.setItem('blackThemes', blackThemes);
    });
    validation(btnThemes, btnCirckle, btnMoon);
  }
}

function validation(btnThemes, btnCirckle, btnMoon) {
  const isBlackThemes = localStorage.getItem('blackThemes') === 'true';

  if (isBlackThemes) {
    document.body.setAttribute('dark', '');

    if (btnThemes && btnCirckle && btnMoon) {
      btnThemes.classList.add('span-active');
      btnCirckle.classList.add('transform');
      btnMoon.classList.add('transform-moon');
    }
  } else {
    document.body.removeAttribute('dark', '');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const isBlackThemes = localStorage.getItem('blackThemes') === 'true';
  if (isBlackThemes) {
    document.body.setAttribute('dark', '');
  } else {
    document.body.removeAttribute('dark', '');
  }
  screenWidth();
});

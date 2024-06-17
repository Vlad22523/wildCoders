import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';
import { Navigation, Keyboard } from 'swiper/modules';

const swiper = new Swiper('.swiper-container', {
  modules: [Navigation, Keyboard],
  initialSlide: 0,
  slidesPerView: 1,
  spaceBetween: 10,
  loop: false,
  speed: 400,
  autoplay: {
    delay: 3000,
  },
  breakpoints: {
    768: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next-new',
    prevEl: '.swiper-button-prev-new',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: false,
  }  
});

swiper.on('update', function () {
  const prevButton = document.querySelector('.swiper-button-prev-new');
  const svgIconLeft = prevButton.querySelector('.icon-left');
  svgIconLeft.style.stroke = 'rgb(var(--var-gray-reviews))';
  prevButton.style.border = '1px solid rgb(var(--var-more-light-gray-reviews))';
  const nextButton = document.querySelector('.swiper-button-next-new');
  const svgIconRight = nextButton.querySelector('.icon-right');
  svgIconRight.style.stroke = 'rgb(var(--var-text))';
});

swiper.on('slideChange', function () {
  const nextButton = document.querySelector('.swiper-button-next-new');
  const svgIconRight = nextButton.querySelector('.icon-right');
  const prevButton = document.querySelector('.swiper-button-prev-new');
  const svgIconLeft = prevButton.querySelector('.icon-left');
  if (swiper.isEnd ) {
    svgIconRight.style.stroke = 'rgb(var(--var-gray-reviews))';
    nextButton.style.border = '1px solid rgb(var(--var-more-light-gray-reviews))';
  } else if (swiper.isBeginning) {
    svgIconLeft.style.stroke = 'rgb(var(--var-gray-reviews))';
    prevButton.style.border = '1px solid rgb(var(--var-more-light-gray-reviews))';
  } else {
    svgIconRight.style.stroke = 'rgb(var(--var-text))';
    svgIconLeft.style.stroke = 'rgb(var(--var-text))';
    nextButton.style.border = '1px solid rgb(var(--var-light-gray-reviews))';
    prevButton.style.border = '1px solid rgb(var(--var-light-gray-reviews))';
  }
});

fetch('https://portfolio-js.b.goit.study/api/reviews')
  .then(response => response.json())
  .then(data => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    data.forEach((review) => {
      const slideElement = document.createElement('li');
      slideElement.className = 'swiper-slide';
      slideElement.innerHTML = `
      <div class="review">${review.review}</div>
      <div class="review-img-name">
        <div> <img src="${review.avatar_url}" alt="${review.author}" width="40px" height="40px" class="review-img"> </div>
        <div class="review-name">${review.author}</div>
      </div>
      `;
      swiperWrapper.appendChild(slideElement);
    });
    swiper.update();
  })
  .catch(error => {
    const swiperWrapper = document.querySelector('.swiper-wrapper');
    const slideElement = document.createElement('div');
    slideElement.className = 'swiper-slide';
    slideElement.innerHTML = '<p>Not found</p>';
    swiperWrapper.appendChild(slideElement);
    swiper.update();
  });
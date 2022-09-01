'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(button => button.addEventListener('click', openModal));

// for (let i = 0; i < btnsOpenModal.length; i++)
//   btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Scroll smoothly
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

btnScrollTo.addEventListener('click', function () {
  section1.scrollIntoView({ behavior: 'smooth' });
});

//Event Delegation: Implementing Page Navigation

// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const linkId = el.getAttribute('href');
//     document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const linkId = e.target.getAttribute('href');
    document.querySelector(linkId).scrollIntoView({ behavior: 'smooth' });
  }
});

//Tabbed Component
const btnParents = document.querySelector('.operations__tab-container');
btnParents.addEventListener('click', function (e) {
  const clicked = e.target.classList.contains('btn');
  if (!clicked) return;
  console.log(clicked);

  [...btnParents.children].forEach(el =>
    el.classList.remove('operations__tab--active')
  );
  e.target.classList.add('operations__tab--active');

  //Active Tab Area
  const content = document.querySelectorAll('.operations__content');
  content.forEach(c => c.classList.remove('operations__content--active'));
  document
    .querySelector(`.operations__content--${e.target.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Nav links fade out and bind(this) passing Arguments to Event Handlers
const nav = document.querySelector('.nav');
const changeOpacity = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const siblings = document.querySelectorAll('.nav__link');
    siblings.forEach(el => {
      if (el !== e.target) {
        el.style.opacity = this;
      }
    });
    const logo = document.querySelector('.nav__logo');
    logo.style.opacity = this;
  }
};
nav.addEventListener('mouseover', changeOpacity.bind(0.5));

nav.addEventListener('mouseout', changeOpacity.bind(1));
// navItems.forEach(item =>
//   item.addEventListener('mouseenter', function (e) {
//     console.log(item);
//     console.log(e.target);
//     if (item !== e.target) {
//       item.style.opacity = 0.5;
//     }
//   })
// );

// The Intersection Observer API

// Sticky Header
const header = document.querySelector('.header');

const stickyNav = function (entries) {
  const entry = entries[0];
  if (!entry.isIntersecting) {
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: '-90px',
});
headerObserver.observe(header);

// Revealing Section

const sections = document.querySelectorAll('.section');
const sectionReveal = function (entries, observer) {
  const entry = entries[0];
  console.log(entry.target);
  console.log(observer);
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(sectionReveal, {
  root: null,
  threshold: 0.3,
});

sections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//Lazy image
const imgTargets = document.querySelectorAll('img[data-src]');
const loadImg = function (entries, observer) {
  const entry = entries[0];
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
};
const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
});
imgTargets.forEach(img => imgObserver.observe(img));

//Slider

const btnRight = document.querySelector('.slider__btn--right');
const btnLeft = document.querySelector('.slider__btn--left');
const slides = document.querySelectorAll('.slide');

const goToSlide = function (slide) {
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
  );
};
goToSlide(0);
let currentSlide = 0;

//dots

const dotContainer = document.querySelector('.dots');

const creatDots = function () {
  slides.forEach((s, i) =>
    dotContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    )
  );
};

creatDots();

dotContainer.addEventListener('click', function (e) {
  console.log(e.target);
  console.log(e.target.dataset.slide);
  if (e.target.classList.contains('dots__dot')) {
    goToSlide(e.target.dataset.slide);
  }
  currentDot(e.target.dataset.slide);
});

const currentDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(function (dot) {
    console.log(dot.dataset.slide);
    console.log(currentSlide);
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add('dots__dot--active');
};

currentDot(0);

const nextSlide = function () {
  currentSlide++;
  if (currentSlide === slides.length) {
    currentSlide = 0;
  }

  goToSlide(currentSlide);
  currentDot(currentSlide);
};

const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slides.length - 1;
  } else {
    currentSlide--;
  }

  goToSlide(currentSlide);
  currentDot(currentSlide);
};

btnRight.addEventListener('click', nextSlide);
btnLeft.addEventListener('click', prevSlide);

document.addEventListener('keydown', function (e) {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});

'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector(".nav");
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log("Current scroll (X/Y)", window.pageXOffset, window.pageYOffset);
  // console.log("height/width viewport", document.documentElement.clientHeight, document.documentElement.clientWidth);
  
  // window.scrollTo({
  //   left: s1coords.left + window.pageXOffset,
  //   top: s1coords.top + window.pageYOffset,
  //   behavior: "smooth"
  // });

  section1.scrollIntoView({ behavior: "smooth"} );
});

////////////////////////////////////////////////////////////////
// Page navigation

// Original way
// document.querySelectorAll(".nav__link").forEach(function(el) {
//   el.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = this.getAttribute("href");
//     console.log(id);
//     document.querySelector(id).scrollIntoView({behavior: "smooth"})
//   })
// })

// With event delegation
document.querySelector(".nav__links").addEventListener("click", function(e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    console.log(id);
    document.querySelector(id).scrollIntoView({behavior: "smooth"})
  }
})


// Tabbed component
tabsContainer.addEventListener("click", function(e) {
  const clicked = e.target.closest(".operations__tab")
  if (!clicked) return;

  // Switch tabs
  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  // Disable old content area
  tabContent.forEach(tab => tab.classList.remove("operations__content--active"));

  // Activate new content area
  document.querySelector(`.operations__content--${clicked.getAttribute("data-tab")}`).classList.add("operations__content--active");
});

// Menu fade animation
const linkHover = function(e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img")

    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
}
nav.addEventListener("mouseover", linkHover.bind(0.5));
nav.addEventListener("mouseout", linkHover.bind(1));

// Sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener("scroll", function(e) {
//   console.log(window.scrollY);

//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add("sticky")
//   } else {
//     nav.classList.remove("sticky");
//   }
// });

// Sticky navigation: Intersection Observer API
// const obsCallback = function(entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// };

// const obsOptions = {
//   root: null,
//   threshold: [0, 0.2],
// };

// const observer = new IntersectionObserver(obsCallback, obsOptions);
// observer.observe(section1);

const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect();

const stickyNav = function(entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight.height}px`
});
headerObserver.observe(header);


// Reveal sections
const allSections = document.querySelectorAll(".section")

const revealSection = function(entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function(section) {
  sectionObserver.observe(section);
  // section.classList.add("section--hidden");
})


// Lazy loading images
const imgTargets = document.querySelectorAll("img[data-src]");
console.log(imgTargets);

const loadImg = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  
  // Replace src with data-src
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img")
  })

  observer.unobserve(entry.target);
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px"
});

imgTargets.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////
// Slider

const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector('.dots');
  
  let currSlide = 0;
  const maxSlide = slides.length - 1;
  const minSlide = 0;
  
  const createDots = function () {
    slides.forEach(function(_, i) {
      dotContainer.insertAdjacentHTML("beforeend", `<button class="dots__dot" data-slide="${i}"></button>`)
    })
  }
  
  const activateDot = function(slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove("dots__dot--active"));
    document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add("dots__dot--active");
  }
  
  const goToSlide = function(slide) {
    slides.forEach((s, i) => s.style.transform = `translateX(${100 * (i - slide)}%)`);
    activateDot(slide);
  }
  
  const nextSlide = function() {
    if (currSlide === maxSlide) currSlide = 0;
    else currSlide++;
    goToSlide(currSlide);
  }
  
  const previousSlide = function() {
    if (currSlide === minSlide) currSlide = maxSlide;
    else currSlide--;
    goToSlide(currSlide);
  }
  
  // Slider initialization
  const init = function() {
    createDots();
    activateDot(currSlide);
    goToSlide(currSlide);
  }
  init();
  
  // Event listeners
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", previousSlide);
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") previousSlide();
    else if (e.key === "ArrowRight") nextSlide();
  });
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const {slide} = e.target.dataset;
      goToSlide(slide);
    }
  });
}
slider();




///////////////////////////////////////
///////////////////////////////////////
///////////////////////////////////////

/*
// Selecting, Creating, and Deleting Elements

// Selecting elements
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const header = document.querySelector('.header');
const allSections = document.querySelectorAll('.section');
console.log(allSections);

document.getElementById('section--1');
const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

// Creating and inserting elements
const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'We use cookied for improved functionality and analytics.';
message.innerHTML =
  'We use cookied for improved functionality and analytics. <button class="btn btn--close-cookie">Got it!</button>';

// header.prepend(message);
header.append(message);
// header.append(message.cloneNode(true));

// header.before(message);
// header.after(message);

// Delete elements
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });

*/




// const h1 = document.querySelector("h1");
// const alertH1 = function(e) {
//   alert("addEventListener: Great! You are reading the heading :D")

//   h1.removeEventListener("mouseenter", alertH1);
// }
// h1.addEventListener('mouseenter', alertH1)

// h1.onmouseenter = function (e) {
//   alert("addEventListener: Great! You are reading the heading :D")
// }


// // rgb(255, 255, 255)
// const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
// const randomColor = () => `rgb(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)})`
// console.log(randomColor());

// document.querySelector(".nav__link").addEventListener("click", function(e) {
//   console.log("LINK", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();

//   // e.stopPropagation();
// })

// document.querySelector(".nav__links").addEventListener("click", function(e) {
//   console.log("LINKS", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// })

// document.querySelector(".nav").addEventListener("click", function(e) {
//   console.log("NAV", e.target, e.currentTarget);
//   this.style.backgroundColor = randomColor();
// })


document.addEventListener("DOMContentLoaded", function(e) {
  console.log("HTML parsed");
})
"use strict";

const homeFunctionalities = (function () {
  const backToTop = document.querySelector("#back-to-top");
  const home = document.querySelector("#home");
  let animateUpItems = Array.from(document.querySelectorAll(".animate-up"));
  animateUpItems = animateUpItems.slice(3).concat(animateUpItems.slice(0, 3));
  let time = 0;

  animateUpItems.forEach((element) => {
    element.style.cssText = `animation-delay: ${time}s`;
    time += 0.35;
  });

  function handleHomeIntersection(entries) {
    if (entries[0].isIntersecting) {
      backToTop.style.opacity = 0;
    } else {
      backToTop.style.opacity = 1;
    }
  }

  const homeObserver = new IntersectionObserver(handleHomeIntersection, {
    threshold: 0.2,
  });

  homeObserver.observe(home);
})();

const handleAnimations = (function () {})();

const sideFunationalities = (function () {
  const menu = document.querySelector("#menu");
  const closebutton = document.querySelector("#close");
  const body = document.querySelector("body");
  const aside = document.querySelector("aside");
  const sideAnchorTags = Array.from(document.querySelectorAll("aside a"));

  function hideSidebar(event) {
    aside.classList.remove("show");
  }
  function showSidebar() {
    aside.classList.add("show");
  }

  menu.addEventListener("click", function (event) {
    event.stopPropagation();
    showSidebar();
  });

  sideAnchorTags.forEach((a) => {
    a.addEventListener("click", hideSidebar);
  });

  closebutton.addEventListener("click", hideSidebar);

  body.addEventListener("click", function (event) {
    if (!aside.contains(event.target)) {
      aside.classList.remove("show");
    }
  });
})();

const workFunctionalities = (function () {
  const spans = Array.from(document.querySelectorAll("#work span"));

  for (let span of spans) {
    span.addEventListener("mouseenter", () => {
      span.querySelector(".overlay-div").style.opacity = "1";
      span.querySelector("img").classList.add("hover");
      span.querySelector(".title").classList.add("animate");
      span.querySelector(".fa-ellipsis").classList.add("animate");
    });

    span.addEventListener("mouseleave", () => {
      span.querySelector(".overlay-div").style.opacity = "0";
      span.querySelector("img").classList.remove("hover");
      span.querySelector(".title").classList.remove("animate");
      span.querySelector(".fa-ellipsis").classList.remove("animate");
    });

    span.addEventListener("click", () => {
      const activeIndex = Number(span.id.split("").at(-1));
      slideShowFunctionalities.mainSwiper.slideTo(activeIndex, 0);

      const activeImage = Array.from(
        slideShowFunctionalities.page.querySelectorAll(".swiper-2 img")
      )[activeIndex];

      activeImage.style.transform = "scale(0)";
      activeImage.style.transition = "transform 0.5s ease";
      slideShowFunctionalities.page.classList.add("show");

      window.setTimeout(() => {
        activeImage.style.transform = "scale(1)";
      }, 100);
    });
  }

  const swiper = new Swiper(".swiper-1", {
    direction: "horizontal",
    loop: true,
    velocity: 200,
    spaceBetween: 30,
    slidesPerView: 6,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true,
      dynamicMainBullets: 3,
    },
  });
})();

const slideShowFunctionalities = (function () {
  const slideshowPage = document.querySelector("#slideshow");

  const revealBottom = slideshowPage.querySelector(".toggle-visibility");

  const bottomCarousel = slideshowPage.querySelector(".bottom-carousel");
  const overlayDivs = slideshowPage.querySelectorAll(".overlay-div");

  const counterPara = slideshowPage.querySelector(" .counter");
  const closeButton = slideshowPage.querySelector(" .close-button");

  const nextArrow = slideshowPage.querySelector(" .next");
  const prevArrow = slideshowPage.querySelector(".prev");

  const swiper3 = new Swiper(".swiper-3", {
    slidesPerView: "auto",
    spaceBetween: 7,
    loop: true,
  });

  const swiper2 = new Swiper(".swiper-2", {
    direction: "horizontal",
    loop: true,

    keyboard: {
      enabled: true,
      onlyInViewport: true,
    },

    navigation: {
      nextEl: ".swiper-2 .swiper-button-next",
      prevEl: ".swiper-2 .swiper-button-prev",
    },

    thumbs: {
      swiper: swiper3,
    },
  });

  swiper2.on("slideChange", () => {
    counterPara.textContent = `${swiper2.realIndex + 1} / 10`;
  });

  nextArrow.addEventListener("click", () => {
    swiper2.slideNext();
  });

  prevArrow.addEventListener("click", () => {
    swiper2.slidePrev();
  });

  closeButton.addEventListener("click", () => {
    slideshowPage.classList.remove("show");
  });

  revealBottom.addEventListener("click", () => {
    bottomCarousel.classList.toggle("show");
    overlayDivs.forEach(function (div) {
      div.classList.toggle("moved-up");
    });
  });

  return { page: slideshowPage, mainSwiper: swiper2 };
})();

const animations = (function () {
  let fadeInElements = Array.from(document.querySelectorAll("#about p"));
  const array2 = Array.from(document.querySelectorAll("#services *"));
  const array3 = Array.from(document.querySelectorAll(".images > div"));
  const array4 = Array.from(document.querySelectorAll("#our-partners > *"));

  const array5 = Array.from(document.querySelectorAll("#contact > *"));
  fadeInElements = fadeInElements.concat(array2, array3, array4, array5);

  fadeInElements.forEach((element) => {
    element.classList.add("fade-in");
  });

  function handleFadeInIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }

  const fadeInObserver = new IntersectionObserver(handleFadeInIntersection, {
    rootMargin: "0px 0px 150px 0px",
    threshold: 0,
  });

  fadeInElements.forEach((element) => fadeInObserver.observe(element));
})();

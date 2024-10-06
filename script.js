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
  const autoplayDelay = 3000;

  const slideshowPage = document.querySelector("#slideshow");

  const revealBottom = slideshowPage.querySelector(".toggle-visibility");

  const swiper2Element = slideshowPage.querySelector(".swiper-2");

  const bottomCarousel = slideshowPage.querySelector(".bottom-carousel");
  const overlayDivs = slideshowPage.querySelectorAll(".overlay-div");

  const counterPara = slideshowPage.querySelector(" .counter");
  const closeButton = slideshowPage.querySelector("#close-button");

  const nextArrow = slideshowPage.querySelector(" .next");
  const prevArrow = slideshowPage.querySelector(".prev");

  const loaderWatcher = slideshowPage.querySelector("#autoplay-watcher");
  const togglePlayButton = slideshowPage.querySelector("#toggle-play");
  const toggleScreenMode = slideshowPage.querySelector("#toggle-screen-mode");

  const htmlElements = {
    playElement: `<i class="fa-regular fa-circle-play"></i>`,
    pauseElement: `<i class="fa-regular fa-circle-pause"></i>`,
    fullScreenElement: `<i class="fa-solid fa-expand"></i>`,
    smallScreenElement: `<i class="fa-solid fa-compress"></i>`,
  };

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

  function stopAutoplay() {
    togglePlayButton.innerHTML = htmlElements.playElement;
    swiper2.autoplay.stop();
    loaderWatcher.classList.add("hidden");
  }

  function loadProgress() {
    const loaderFiller = slideshowPage.querySelector("#filler");

    loaderFiller.style.transition = "none";
    loaderFiller.style.width = "0";
    window.setTimeout(() => {
      loaderFiller.style.transition = `width ${autoplayDelay}ms`;
      loaderFiller.style.width = "100%";
    }, 50);
  }

  swiper2.on("slideChange", () => {
    counterPara.textContent = `${swiper2.realIndex + 1} / 10`;
    if (swiper2.autoplay.running) {
      loadProgress();
    }
  });

  swiper2.on("touchMove", stopAutoplay);

  nextArrow.addEventListener("click", () => {
    swiper2.slideNext();
    stopAutoplay();
  });

  prevArrow.addEventListener("click", () => {
    swiper2.slidePrev();
    stopAutoplay();
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

  togglePlayButton.addEventListener("click", () => {
    if (swiper2.autoplay.running) {
      stopAutoplay();
    } else {
      togglePlayButton.innerHTML = htmlElements.pauseElement;
      swiper2.params.autoplay.delay = autoplayDelay;
      loaderWatcher.classList.remove("hidden");
      swiper2.autoplay.start();
      loadProgress();
    }
  });

  Array.from(bottomCarousel.querySelectorAll(".swiper-slide")).forEach(
    (slide) => {
      slide.addEventListener("click", () => {
        stopAutoplay();
      });
    }
  );

  toggleScreenMode.addEventListener("click", () => {
    if (document.fullscreenElement) {
      toggleScreenMode.innerHTML = htmlElements.fullScreenElement;
      document.exitFullscreen();
      slideshowPage.querySelector(".swiper-2").style.width = "70%";
    } else {
      toggleScreenMode.innerHTML = htmlElements.smallScreenElement;
      slideshowPage.requestFullscreen();
      slideshowPage.querySelector(".swiper-2").style.width = "85%";
    }
  });

  const ZoomingFunctionalities = (function () {
    const zoomInButton = slideshowPage.querySelector("#zoom-in");
    const zoomOutButton = slideshowPage.querySelector("#zoom-out");
    let currentImage = Array.from(
      slideshowPage.querySelectorAll(".swiper-2 img")
    )[swiper2.realIndex];

    let isMouseDown = false;

    const panzoomInstance = Panzoom(currentImage, {
      maxScale: 7,
      minScale: 1,
      animate: true,
      panOnlyWhenZoomed: true,
      cursor: "grab",
      duration: 300,
      step: 0.5,
    });

    zoomInButton.addEventListener("click", () => {
      zoomOutButton.classList.remove("frozen");
      panzoomInstance.zoomIn();
    });

    zoomOutButton.addEventListener("click", () => {
      panzoomInstance.zoomOut();
      if (panzoomInstance.getScale() === 1) {
        panzoomInstance.reset();
        zoomOutButton.classList.add("frozen");
      }
    });

    currentImage.addEventListener("panzoomend", () => {
      const scale = panzoomInstance.getScale();
      const rect = currentImage.getBoundingClientRect();
      let top = rect.top / scale;
      let bottom = (window.innerHeight - rect.bottom) / scale;
      let left = rect.left / scale;
      let right = (window.innerWidth - rect.right) / scale;

      let panX = 0;
      let panY = 0;

      if (top > 0) {
        panY = -top;
      }

      if (bottom > 0) {
        panY = bottom;
      }

      if (left > 0) {
        panX = -left;
      }

      if (right > 0) {
        panX = right;
      }

      panzoomInstance.pan(panX, panY, { relative: true });
    });

    currentImage.addEventListener("panzoomzoom", () => {
      swiper2Element.style.width = `calc(70% * ${panzoomInstance.getScale()})`;
    });
  })();

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

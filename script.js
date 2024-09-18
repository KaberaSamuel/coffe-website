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
  }
})();

const fadeInElementsFunctionality = (function () {
  let fadeInElements = Array.from(document.querySelectorAll("#about p"));
  const array2 = Array.from(document.querySelectorAll("#services *"));
  const array3 = Array.from(document.querySelectorAll(".images span"));

  fadeInElements = fadeInElements.concat(array2);

  function handleFadeInIntersection(entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("show");
    });
  }

  const fadeInObserver = new IntersectionObserver(handleFadeInIntersection, {
    threshold: 0,
  });

  fadeInElements.forEach((element) => fadeInObserver.observe(element));

  fadeInElements.forEach((element) => {
    element.classList.add("fade-in");
  });
})();

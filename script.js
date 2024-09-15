const menu = document.querySelector("#menu");
const closebutton = document.querySelector("#close");
const aside = document.querySelector("aside");
const body = document.querySelector("body");
const home = document.querySelector("#home");
const backToTop = document.querySelector("#back-to-top");

let animateUpItems = Array.from(document.querySelectorAll(".animate-up"));
const sideAnchorTags = Array.from(document.querySelectorAll("aside a"));
let time = 0;

let fadeInElements = Array.from(document.querySelectorAll("#about p"));

const array2 = Array.from(
  document.querySelectorAll("#services > div:first-child > * ")
);

const array3 = Array.from(
  document.querySelectorAll("#services > div:last-child > *")
);

function handleHomeIntersection(entries) {
  if (entries[0].isIntersecting) {
    backToTop.style.opacity = 0;
  } else {
    backToTop.style.opacity = 1;
  }
}

function handleFadeInIntersection(entries) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add("show");
  });
}

const homeObserver = new IntersectionObserver(handleHomeIntersection, {
  threshold: 0.2,
});

homeObserver.observe(home);

fadeInElements = fadeInElements.concat(array2, array3);

function hideSidebar(event) {
  aside.classList.remove("show");
}

fadeInElements.push(document.querySelector("#services > h2"));
// fadeInElements.push(document.querySelector("iframe"));

animateUpItems = animateUpItems.slice(3).concat(animateUpItems.slice(0, 3));

const fadeInObserver = new IntersectionObserver(handleFadeInIntersection, {
  threshold: 0,
});

fadeInElements.forEach((element) => fadeInObserver.observe(element));

function showSidebar() {
  aside.classList.add("show");
}

fadeInElements.forEach((element) => {
  element.classList.add("fade-in");
});

animateUpItems.forEach((element) => {
  element.style.cssText = `animation-delay: ${time}s`;
  time += 0.35;
});

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

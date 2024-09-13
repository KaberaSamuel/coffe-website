const menu = document.querySelector("#menu");
const closebutton = document.querySelector("#close");
const aside = document.querySelector("aside");
const body = document.querySelector("body");
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

fadeInElements = fadeInElements.concat(array2, array3);
function hideSidebar(event) {
  aside.classList.remove("show");
}
fadeInElements.push(document.querySelector("#services > h2"));
fadeInElements.push(document.querySelector("iframe"));

animateUpItems = animateUpItems.slice(3).concat(animateUpItems.slice(0, 3));

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

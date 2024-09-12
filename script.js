let allAnimateUpItems = Array.from(document.querySelectorAll(".animate-up"));
let time = 0;

// console.log(allAnimateUpItems);
allAnimateUpItems = allAnimateUpItems
  .slice(3)
  .concat(allAnimateUpItems.slice(0, 3));

allAnimateUpItems.forEach((element) => {
  element.style.cssText = `animation-delay: ${time}s`;
  time += 0.4;
});

console.log(time);
// console.log(allAnimateUpItems);

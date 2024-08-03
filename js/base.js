let activeHeadingTitle = function (list, chosenItem) {
  list.forEach((element) => {
    element.firstChild.classList.remove('active');
    if (element.firstChild.getAttribute("aria-label") === chosenItem) {
      element.firstChild.classList.add('active');
    }
  })
}

let shuffleItems = function (itemsList, currentId, shuffleDirection) {
  let newSide;
  let oppositeSide;
  let nextItemIndex;
  let lastItemIndex;

  if (shuffleDirection === "left") {
    newSide = "left-side";
    oppositeSide = "right-side";
    nextItemIndex = (currentId + 1) % itemsList.length
    lastItemIndex = (nextItemIndex + 1) % itemsList.length
  } else if (shuffleDirection === "right") {
    newSide = "right-side";
    oppositeSide = "left-side";
    nextItemIndex = (currentId - 1 + itemsList.length) % itemsList.length;
    lastItemIndex = (nextItemIndex - 1 + itemsList.length) % itemsList.length;
  }

  itemsList[currentId].classList.remove("active");
  itemsList[currentId].classList.add(newSide);

  itemsList[nextItemIndex].classList.remove("left-side", "right-side");
  itemsList[nextItemIndex].classList.add("active");

  itemsList[lastItemIndex].classList.remove(newSide);
  itemsList[lastItemIndex].classList.add(oppositeSide);
};


document.addEventListener("DOMContentLoaded", () => {

  //* >>>>>>>>>>>>>>>>>>>> Heading elements <<<<<<<<<<<<<<<<<<<<

  let navList = document.querySelector("header nav ul");
  let searchForm = document.getElementById("search-from");
  let sectionsList = document.querySelectorAll("header nav ul li");
  let sections = document.querySelectorAll(".section");

  document.getElementById("toggle-menu").addEventListener("click", () => {
    navList.classList.toggle("menu");
  });

  document.getElementById("search").addEventListener("click", () => {
    searchForm.classList.toggle("active");
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        activeHeadingTitle(sectionsList, entry.target.id);
      }
    })
  }, { threshold: 0.1 });

  sections.forEach(section => {
    observer.observe(section);
  });

  //* >>>>>>>>>>>>>>>>>>>> Landing elements <<<<<<<<<<<<<<<<<<<<

  let bullets = document.querySelectorAll(".landing ul.bullets li");
  let landingContent = document.querySelectorAll(".landing .text");
  let currentIndex = 1;

  //? >>>>>>>>>> Right action <<<<<<<<<<

  document.getElementById("right-arrow").addEventListener("click", () => {

    shuffleItems(landingContent, currentIndex, "left");

    bullets[currentIndex].classList.remove("active");
    currentIndex = (currentIndex + 1) % landingContent.length;
    bullets[currentIndex].classList.add("active");
  });

  //? >>>>>>>>>> Left action <<<<<<<<<<

  document.getElementById("left-arrow").addEventListener("click", () => {

    shuffleItems(landingContent, currentIndex, "right");

    bullets[currentIndex].classList.remove("active");
    currentIndex = (currentIndex - 1 + landingContent.length) % landingContent.length;
    bullets[currentIndex].classList.add("active");
  });

  landingContent[(currentIndex - 1 + landingContent.length) % landingContent.length].classList.add("left-side");
  landingContent[currentIndex].classList.add("active");
  landingContent[(currentIndex + 1) % landingContent.length].classList.add("right-side");

  //* >>>>>>>>>>>>>>>>>>>> Shuffle elements <<<<<<<<<<<<<<<<<<<<

  let shuffleListItem = document.querySelectorAll(".shuffle li");

  shuffleListItem.forEach((e) => {
    e.addEventListener("click", () => {
      shuffleListItem.forEach((e) => {
        e.classList.remove('active');
      })
      e.classList.add('active');
    });
  })

  //* >>>>>>>>>>>>>>>>>>>> Subscription elements <<<<<<<<<<<<<<<<<<<<

  let formText = document.querySelector(".subscription .container form .input-text");
  let emailField = document.querySelector(".subscription .container form .email-field");

  emailField.addEventListener("focus", () => {
    formText.classList.add('fade-text');
  })

  emailField.addEventListener("blur", () => {
    if (emailField.value == "") formText.classList.remove('fade-text');
  })
});

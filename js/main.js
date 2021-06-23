"use strict";

const headerSearchBtn = document.querySelector(".header__search-icon");
const navSearchBtn = document.querySelector(".nav__search-button");

const nav = document.querySelector(".nav");
const body = document.querySelector("body");

headerSearchBtn.addEventListener("click", () => {
  nav.classList.add("nav--active");
  body.classList.add("body--disabled-scroll");
});

navSearchBtn.addEventListener("click", () => {
  nav.classList.remove("nav--active");
  body.classList.remove("body--disabled-scroll");
});

// Day 55

const movieDB = {
  movies: [
    "Логан",
    "Лига Справедливости",
    "Ла-ла Лэнд",
    "Одержимость",
    "Скотт Пилигрим против...",
    "Наруто",
  ],
};

function addMovies(list, className) {
  // sorts the list in alphabetical order
  let moviesSorted = list.map((item) => item.toLowerCase()).sort();

  // removes the list  from the DOM
  let listRemoved = document.querySelector(`.${className}`);
  let parentOfList = listRemoved.parentElement;
  parentOfList.removeChild(listRemoved);

  // creates a new DOM list according to the given array
  let movieList = document.createElement("ul");
  movieList.classList.add(`${className}`);
  parentOfList.appendChild(movieList);

  // appends list items to the new list
  // list items are added the same class as the previous list items
  moviesSorted.forEach((movie, index) => {
    let movieItem = document.createElement("li");
    movieItem.classList.add("watched-movies__item");

    movieItem.innerHTML = `<a href="#" class="watched-movies__link"> ${
      index + 1
    }. ${movie} </a> <a href="#" class="watched-movies__trash-icon"><i class="fas fa-trash"></i></a>`;

    movieList.appendChild(movieItem);
  });

  // #3 Task

  let trashIcons = document.querySelectorAll(".watched-movies__trash-icon");

  // all trash icons are added click event
  trashIcons.forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault();
      let item = e.target.parentElement.parentElement;

      // searches for the item that needs to be removed in the list
      let movieName = item.textContent.slice(4).trim();
      let movieIndex = moviesSorted.indexOf(movieName);

      // the item is removed from the list
      if (movieIndex > -1) {
        movieDB.movies = [
          ...moviesSorted.slice(0, movieIndex),
          ...moviesSorted.slice(movieIndex + 1),
        ];
      }

      // updates the list by calling itself
      addMovies(movieDB.movies, "watched-movies__list");
    });
  });
}

addMovies(movieDB.movies, "watched-movies__list");

// #1 Task and #2 Task

const input = document.querySelector(".new-movies__input");
const submitButton = document.querySelector(".new-movies__button");
const radioButton = document.querySelector(".new-movies__favorite");

// onclick event is added to submit button
submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  // the first checking condition
  if (input.value.length > 21) {
    input.value = input.value.slice(0, 22) + "...";
  }

  // #4 Task

  // the second checking condition
  if (radioButton.checked) {
    console.log("Adding your favorite movie to the list");
    radioButton.ariaChecked = false;
  }

  // adds a new item to the array and refreshes the input
  movieDB.movies.push(input.value.toLowerCase());
  addMovies(movieDB.movies, "watched-movies__list");
  input.value = "";
});

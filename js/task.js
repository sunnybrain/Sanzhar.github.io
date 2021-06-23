"use strict";

// #1 Task - To remove all the ad from the page

const ads = document.querySelectorAll(".aside__img-box");

ads.forEach((ad) => {
  ad.style.display = "none";
});

// #2 Task - to change the name of the genre

const genreName = document.querySelector(".entry__genre");

genreName.textContent = "Драма";

// #3 Task - to change background image of the banner

const banner = document.querySelector(".entry__movie-banner");

banner.style.background = "url('/images/2.jpeg') no-repeat top";
banner.style.backgroundSize = "cover";

/* 
// #4 Task - to form a list of movies in alphabetical order
// #5 Task - to mark list items with numbers

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

const sortedMovies = movieDB.movies.sort();
console.log(sortedMovies);

const watchedMoviesList = document.querySelector(".watched-movies__list");
const parentOfWatched = watchedMoviesList.parentElement;
parentOfWatched.removeChild(watchedMoviesList);

const sortedMoviesList = document.createElement("ol");
sortedMoviesList.classList.add("watched-movies__list");
parentOfWatched.appendChild(sortedMoviesList);

sortedMovies.forEach((el, index) => {
  let listItem = document.createElement("li");
  listItem.classList.add("watched-movies__item");

  let listLink = document.createElement("a");
  listLink.classList.add("watched-movies__link");

  let listIcon = document.createElement("a");
  listIcon.classList.add("watched-movies__trash-icon");

  let icon = document.createElement("i");
  icon.classList.add("fas", "fa-trash");

  listIcon.appendChild(icon);
  listItem.appendChild(listLink);
  listItem.appendChild(listIcon);

  listLink.textContent = `${index + 1}. ${el}`;

  sortedMoviesList.appendChild(listItem);
});

*/

// Simpler version
// #4 Task - to form a list of movies in alphabetical order
// #5 Task - to mark list items with numbers

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
      movieDB.movies = [
        ...moviesSorted.slice(0, movieIndex),
        ...moviesSorted.slice(movieIndex + 1),
      ];

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

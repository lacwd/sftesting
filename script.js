// Select DOM elements
const bodyElement = document.querySelector("body");
const navbarMenu = document.querySelector("#cs-navigation");
const hamburgerMenu = document.querySelector("#cs-navigation .cs-toggle");

// Function to toggle the aria-expanded attribute
function toggleAriaExpanded(element) {
  const isExpanded = element.getAttribute("aria-expanded");
  element.setAttribute(
    "aria-expanded",
    isExpanded === "false" ? "true" : "false"
  );
}

// Function to toggle the menu open or closed
function toggleMenu() {
  hamburgerMenu.classList.toggle("cs-active");
  navbarMenu.classList.toggle("cs-active");
  bodyElement.classList.toggle("cs-open");
  toggleAriaExpanded(hamburgerMenu);
}

// Add click event listener to the hamburger menu
hamburgerMenu.addEventListener("click", toggleMenu);

// Add click event listener to the navbar menu to handle clicks on the pseudo-element
navbarMenu.addEventListener("click", function (event) {
  if (
    event.target === navbarMenu &&
    navbarMenu.classList.contains("cs-active")
  ) {
    toggleMenu();
  }
});

// If you press Escape and the hamburger menu is open, close it
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && hamburgerMenu.classList.contains("cs-active")) {
    toggleMenu();
  }
});

// mobile nav toggle code
const dropDowns = Array.from(
  document.querySelectorAll("#cs-navigation .cs-dropdown")
);
for (const item of dropDowns) {
  const onClick = () => {
    item.classList.toggle("cs-active");
  };
  item.addEventListener("click", onClick);
}
//
//    The Dark Mode System
//

// helper functions to toggle dark mode
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
}
function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}

// determines a new users dark mode preferences
function detectColorScheme() {
  // default to the light theme
  let theme = "light";

  // check localStorage for a saved 'theme' variable. if it's there, the user has visited before, so apply the necessary theme choices
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  // if it's not there, check to see if the user has applied dark mode preferences themselves in the browser
  else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }

  // if there is no preference set, the default of light will be used. apply accordingly
  theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
  // on click, check localStorage for the dark mode value, use to apply the opposite of what's saved
  localStorage.getItem("theme") === "light"
    ? enableDarkMode()
    : disableDarkMode();
});
class CS_GalleryFilter {
  filtersSelector = ".cs-button";
  galleriesSelector = ".cs-gallery";
  activeClass = "cs-active";
  hiddenClass = "cs-hidden";

  constructor() {
    this.$galleries = document.querySelectorAll(this.galleriesSelector);
    const $filters = document.querySelectorAll(this.filtersSelector);

    this.onClick($filters[0]);

    for (const $filter of $filters) {
      $filter.addEventListener("click", () => this.onClick($filter));
    }
  }

  onClick($filter) {
    this.filter($filter.dataset.filter);

    const { activeClass } = this;

    this.$activeFilter?.classList.remove(activeClass);
    $filter.classList.add(activeClass);

    this.$activeFilter = $filter;
  }

  filter(filter) {
    const showAll = filter == "all";
    const { hiddenClass } = this;

    for (const $gallery of this.$galleries) {
      const show = showAll || $gallery.dataset.category == filter;
      $gallery.classList.toggle(hiddenClass, !show);
    }
  }
}

new CS_GalleryFilter();

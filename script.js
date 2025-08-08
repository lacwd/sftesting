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

// The Dark Mode System

// helper functions to toggle dark mode
function enableDarkMode() {
  document.body.classList.add("dark-mode");
  localStorage.setItem("theme", "dark");
}
function disableDarkMode() {
  document.body.classList.remove("dark-mode");
  localStorage.setItem("theme", "light");
}

// determines a new user's dark mode preferences
function detectColorScheme() {
  // default to the light theme
  let theme = "light";

  // check localStorage for a saved 'theme' variable
  if (localStorage.getItem("theme")) {
    theme = localStorage.getItem("theme");
  }
  // if not there, check for browser dark mode preference
  else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    theme = "dark";
  }

  // apply theme accordingly
  theme === "dark" ? enableDarkMode() : disableDarkMode();
}

// run on page load
detectColorScheme();

// add event listener to the dark mode button toggle
document.getElementById("dark-mode-toggle").addEventListener("click", () => {
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

    if ($filters.length > 0) {
      this.onClick($filters[0]);

      for (const $filter of $filters) {
        $filter.addEventListener("click", () => this.onClick($filter));
      }
    } else {
      console.warn("No filter buttons found");
    }
  }

  onClick($filter) {
    if (!$filter || !$filter.dataset) {
      console.warn("Invalid filter element", $filter);
      return;
    }

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

const headerDrawerMenu = document.querySelector(".la-menu-drawer-container");
const slidDrawerMenu = document.querySelector(".la-menu-drawer");
const bodyDrawerMenu = document.body;
const buttonClose = document.querySelector(".la-close-button-drawer-menu");
const buttonOpen = document.querySelector(".icon-hamburger-la");
const inputValue = document.querySelectorAll(".la-search-menu-drawer");
const resultsInpute = document.querySelector("#predictive-search-results-la");
const detalisLa = document.querySelector(".details-la");
const navContiner = document.querySelector(".la-menu-drawer__navigation");
const clickSearchButton = document.querySelector(".la-search-header-button");
const activeSearch = document.querySelector(".la-menu_desktop-search_continer");
const resultsDesktopInput = document.querySelector("#desktop_menu_search-la");
let lastScrollTop = 0;
const header = document.getElementById("main-header-la");
const announcementHeight = 43;
const menuItems = document.querySelectorAll(
  ".collection_header_animet_item-la"
);
const announcementLa = document.querySelector(".announcement_bar-la");

menuItems.forEach((menuItem) => {
  const itemsContainer = menuItem.querySelector(
    ".desktop_menu_collection_continer-la"
  );
  const items = itemsContainer.querySelectorAll(
    ".desktop_item_in_collection_menu"
  );

  menuItem.addEventListener("mouseenter", () => {
    menuItem.classList.add("collection_header_mouseenter-la")
    items.forEach((item, index) => {
      setTimeout(() => {
        item.classList.add("visible");
      }, index * 50);
    });
  });

  menuItem.addEventListener("mouseleave", () => {
    items.forEach((item) => item.classList.remove("visible"));
    menuItem.classList.remove("collection_header_mouseenter-la")
    
  });
});

window.addEventListener("scroll", () => {
  const currentScrollTop =
    window.pageYOffset || document.documentElement.scrollTop;

  if (currentScrollTop === 0) {
    header.classList.add("header-not-fixed");
    announcementLa.classList.remove("announcementNew");
  } else {
    header.classList.remove("header-not-fixed");
    announcementLa.classList.add("announcementNew");
  }

  if (currentScrollTop > lastScrollTop) {
    header.classList.add("header--hidden");
    announcementLa.classList.add("announcementRemove");
    header.classList.remove("bottomScroll");
  } else {
    header.classList.remove("header--hidden");
    header.classList.add("bottomScroll");
    announcementLa.classList.remove("announcementRemove");
  }

  lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
});

document
  .querySelectorAll('[id^="details-menu-"] .summary-la')
  .forEach((summary) => {
    const details = summary.closest(".details-la");

    summary &&
      summary.addEventListener("click", () => {
        details.setAttribute("open", true);
        navContiner.classList.add("navHeight");
      });

    const closeButton = details.querySelector(".la-close-menu-drawer");
    if (closeButton) {
      closeButton.addEventListener("click", () => {
        details.removeAttribute("open");
        navContiner.classList.remove("navHeight");
      });
    }

    if (summary.closest("header-drawer, drawer")) return;

    summary.parentElement.addEventListener("keyup", onKeyUpEscape);
  });
function inputeValue() {
  inputValue.forEach((el) => {
    el.value = "";
  });
}
headerDrawerMenu &&
  headerDrawerMenu.addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      slidDrawerMenu.classList.remove("active-header-drawer-la");
      bodyDrawerMenu.classList.remove("header-drawer-body-la");
      headerDrawerMenu.classList.remove("active-header-drawer_menu-la");

      detalisLa.removeAttribute("open");
      inputeValue();
      resultsInpute.style.display = "none";
      resultsInpute.innerHTML = "";
    }
  });

buttonOpen &&
  buttonOpen.addEventListener("click", () => {
    slidDrawerMenu.classList.add("active-header-drawer-la");
    bodyDrawerMenu.classList.add("header-drawer-body-la");
    headerDrawerMenu.classList.add("active-header-drawer_menu-la");
  });

buttonClose &&
  buttonClose.addEventListener("click", () => {
    slidDrawerMenu.classList.remove("active-header-drawer-la");
    bodyDrawerMenu.classList.remove("header-drawer-body-la");
    headerDrawerMenu.classList.remove("active-header-drawer_menu-la");
    detalisLa.removeAttribute("open");
    inputeValue();
    resultsInpute.style.display = "none";
    resultsInpute.innerHTML = "";
  });
clickSearchButton &&
  clickSearchButton.addEventListener("click", () => {
    activeSearch.classList.toggle("active_serach_button-la");
    resultsDesktopInput.innerHTML = "";
    inputeValue();
    resultsInpute.style.display = "none";
  });

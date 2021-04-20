// Variables
const navbar = document.querySelector(".js--nav");
const header = document.querySelector(".js--header");
const sectionSingup = document.querySelector(".section-plans");
const sectionFeatures = document.querySelector(".section-features");
const sectionSteps = document.querySelector(".section-steps");
const sectionCities = document.querySelector(".section-cities");
const sectionForm = document.querySelector(".section-form");
const sectionPlans = document.querySelector(".section-plans");
const btnContainer = document.querySelector(".hero-text-box");
const navLinks = document.querySelector(".main-nav");
const rowFeatures = document.querySelector(".animate-fade-in-features");
const rowCities = document.querySelector(".animate-fade-in-cities");
const mobile = document.querySelector(".animate-fade-in-mobile");
const plan = document.querySelector(".animate-fade-in-plan");
const mobileNavBtn = document.querySelector(".mobile-nav-icon");
const navIcon = document.querySelector(".js--nav-icon");

// Intersection Observer for sticky navbar
const obsCallback = function (entries) {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) {
      navbar.classList.add("sticky");
    } else {
      navbar.classList.remove("sticky");
    }
  });
};

const obsOptions = {
  root: null,
  threshold: 0.2,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

// Intersection Observer for sections animation
const createObserver = function (
  thresholdValue,
  addElement,
  observeElement,
  classToAdd,
  flag = true
) {
  const obsCallback = function (entries) {
    entries.forEach((entry) => {
      const yvalue = flag ? entry.boundingClientRect.y : 1;
      if (entry.isIntersecting && yvalue > 0) {
        addElement.classList.add(`${classToAdd}`);
      } else {
        addElement.classList.remove(`${classToAdd}`);
      }
    });
  };

  const obsOptions = {
    root: null,
    threshold: thresholdValue,
  };

  const observer = new IntersectionObserver(obsCallback, obsOptions);
  observer.observe(observeElement);
};

createObserver(0.4, rowFeatures, sectionFeatures, "animate__fadeIn");
createObserver(0.3, rowCities, sectionCities, "animate__fadeIn");
createObserver(0.3, mobile, sectionSteps, "animate__fadeInUp");
createObserver(0.8, plan, sectionPlans, "animate__pulse", false);

// Smooth Scrolling
const scrollTo = function (el, elClass, section) {
  if (el.closest(`.${elClass}`)) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

btnContainer.addEventListener("click", function (e) {
  e.preventDefault();
  const el = e.target;
  scrollTo(el, "btn-full", sectionSingup);
  scrollTo(el, "btn-ghost", sectionFeatures);
});

navLinks.addEventListener("click", function (e) {
  e.preventDefault();
  const el = e.target;
  scrollTo(el, "js--fd", sectionFeatures);
  scrollTo(el, "js--hiw", sectionSteps);
  scrollTo(el, "js--oc", sectionCities);
  scrollTo(el, "js--su", sectionSingup);
});

// Mobile navbar
mobileNavBtn.addEventListener("click", function () {
  const iconName = navIcon.getAttribute("name");
  if (iconName === "menu-outline") {
    //prettier-ignore
    toggleNav("animate__fadeOutUp","animate__fadeInDown","block", "close-outline");
  }
  if (iconName === "close-outline") {
    //prettier-ignore
    toggleNav("animate__fadeInDown","animate__fadeOutUp","none","menu-outline", true);
  }
});

const toggleNav = function (
  removeClass,
  addClass,
  display,
  newIconName,
  flag = false
) {
  navLinks.classList.remove(`${removeClass}`);
  navLinks.classList.add(`${addClass}`);
  navIcon.setAttribute("name", `${newIconName}`);

  flag
    ? setTimeout(function () {
        navLinks.style.display = `${display}`;
      }, 400)
    : (navLinks.style.display = `${display}`);
};

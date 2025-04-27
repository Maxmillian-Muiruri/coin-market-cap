const navToggleBtn = document.querySelector(".nav-toggle-btn");
const navbar = document.querySelector(".navbar");
const body = document.body;

navToggleBtn.addEventListener("click", () => {
  navToggleBtn.classList.toggle("active");
  navbar.classList.toggle("active");
  body.classList.toggle("active");
});

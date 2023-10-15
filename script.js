// const navbarMenu = document.querySelector(".navbar .links");
// const menuBtn = document.querySelector(".menu-btn");
// const hideMenuBtn = navbarMenu.querySelector(".close-btn");

// menuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

// hideMenuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

const getValue = async function () {
  const response = await fetch(`https://kontests.net/api/v1/codeforces`);
  const data = await response.json();
  console.log(data);
};

getValue();
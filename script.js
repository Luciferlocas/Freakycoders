const navbarMenu = document.querySelector(".navbar .links");
const menuBtn = document.querySelector(".menu-btn");
// const hideMenuBtn = navbarMenu.querySelector(".close-btn");

// menuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

// hideMenuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

const informationsAbout = document.getElementsByClassName(".inform");

const request = new XMLHttpRequest();
request.open("GET","https://kontests.net/api/v1/all");
request.send();

request.addEventListener("load", function(){
  const data = JSON.parse(this.responseText);
  console.log(data);
  const html = `
  <tr class="info">
  <td class="plat">${data[0].site}</td>
  <td>${data[0].name}</td>
  <td><a href="${data[0].url}">Register</a></td>
  <td>${data[0].start_time}</td>
  <td>${data[0].end_time}</td>
  <td>${data[0].duration}</td>
  <td>${data[0].status}</td>
  </tr>`;
  informationsAbout.insertAdjacentHTML("beforeend", html);
});

const search = () => {
  const searchbox = document.getElementById("search-name").value.toUpperCase();
  const platforms = document.getElementById("code");
  const information = document.querySelectorAll(".info");
  const pname = platforms.getElementsByClassName("plat");

  for (var i = 0; i < pname.length; i++) {
    let match = information[i].getElementsByClassName("plat")[0];

    if (match) {
      let textValue = match.textContent || match.innerHTML;

      if (textValue.toUpperCase().indexOf(searchbox) > -1) {
        information[i].style.display = "";
      } else {
        information[i].style.display = "None";
      }
    }
  }
};

document.addEventListener('DOMContentLoaded', function () {
  const content = document.querySelector('#code'); 
  const itemsPerPage = 6;
  let currentPage = 0;
  const items = Array.from(content.getElementsByTagName('tr')).slice(1);

function showPage(page) {
  const startIndex = page * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  items.forEach((item, index) => {
    item.classList.toggle('hidden', index < startIndex || index >= endIndex);
  });
  updateActiveButtonStates();
}

function createPageButtons() {
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const paginationContainer = document.createElement('div');
  const paginationDiv = document.body.appendChild(paginationContainer);
  paginationContainer.classList.add('pagination');

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement('button');
    pageButton.textContent = i + 1;
    pageButton.addEventListener('click', () => {
      currentPage = i;
      showPage(currentPage);
      updateActiveButtonStates();
    });

      content.appendChild(paginationContainer);
      paginationDiv.appendChild(pageButton);
    }
}

function updateActiveButtonStates() {
  const pageButtons = document.querySelectorAll('.pagination button');
  pageButtons.forEach((button, index) => {
    if (index === currentPage) {
      button.classList.add('active');
    } else {
      button.classList.remove('active');
    }
  });
}

  createPageButtons();
  showPage(currentPage);
});
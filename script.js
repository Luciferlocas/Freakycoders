"use strict";

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

fetch("https://kontests.net/api/v1/all")
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    let tableData = "";
    data.map((values) => {
      tableData += `<tr class="info">
      <td class="plat">${values.site}</td>
      <td>${values.name}</td>
      <td><a target = "_blank" href="${values.url}">Register</a></td>
      <td>${values.start_time}</td>
      <td>${values.end_time}</td>
      <td>${values.duration} s </td>
      <td>${values.status}</td>
  </tr>`;
    });
    document.getElementById("inform").innerHTML = tableData;
  })
  .catch((err) => {
    // alert("Error fetching the API");
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

document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector("#inform");
  const itemsPerPage = 6;
  let currentPage = 0;
  const items = Array.from(content.getElementsByTagName("tr")).slice(1);

  function showPage(page) {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    items.forEach((item, index) => {
      item.classList.toggle("hidden", index < startIndex || index >= endIndex);
    });
    updateActiveButtonStates();
  }

  function createPageButtons() {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const paginationContainer = document.createElement("div");
    const paginationDiv = document.body.appendChild(paginationContainer);
    paginationContainer.classList.add("pagination");

    for (let i = 0; i < totalPages; i++) {
      const pageButton = document.createElement("button");
      pageButton.textContent = i + 1;
      pageButton.addEventListener("click", () => {
        currentPage = i;
        showPage(currentPage);
        updateActiveButtonStates();
      });

      content.appendChild(paginationContainer);
      paginationDiv.appendChild(pageButton);
    }
  }

  function updateActiveButtonStates() {
    const pageButtons = document.querySelectorAll(".pagination button");
    pageButtons.forEach((button, index) => {
      if (index === currentPage) {
        button.classList.add("active");
      } else {
        button.classList.remove("active");
      }
    });
  }

  createPageButtons();
  showPage(currentPage);
});

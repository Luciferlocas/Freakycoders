"use strict";

// const navbarMenu = document.getElementsByClassName(".navbar .links");
// const menuBtn = document.getElementsByClassName(".menu-btn");
// console.log(menuBtn);
// const hideMenuBtn = document.getElementsByClassName(".close-btn");

// menuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

// hideMenuBtn.addEventListener("click", () => {
//   navbarMenu.classList.toggle("show-menu");
// });

// hiding everthing till load-----------------------------------------

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

// fetching API and extracting data from it----------------------------

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
      <td>${values.duration}s </td>
      <td>${values.status}</td>
  </tr>`;
    });
    document.getElementById("inform").innerHTML = tableData;
  })
  .catch((err) => {
    console.log("Error fetching the API");
  });

// downloading the API data table---------------------------------------

function htmlToCsv(filename) {
  var data = [];
  var rows = document.querySelectorAll("table tr");

  for (var i = 0; i < rows.length; i++) {
    var row = [],
      cols = rows[i].querySelectorAll("td, th");

    for (var j = 0; j < cols.length; j++) {
      row.push(cols[j].innerText);
    }
    data.push(row.join(","));
  }
  downloadCSVFile(data.join("\n"), filename);
}

function downloadCSVFile(csv, filename) {
  var csv_file, download_link;

  csv_file = new Blob([csv], { type: "text/csv" });
  download_link = document.createElement("a");
  download_link.download = filename;
  download_link.href = window.URL.createObjectURL(csv_file);
  download_link.style.display = "none";
  document.body.appendChild(download_link);
  download_link.click();
}

// making search enable for the competitions------------------------------

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

// pagination but not working properly -------------------------------------

document.addEventListener("DOMContentLoaded", function () {
  const content = document.querySelector("#code");
  console.log(content);
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

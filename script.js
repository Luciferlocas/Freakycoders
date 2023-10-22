//fetching the data fromt he API--------------------------------------

document.addEventListener("DOMContentLoaded", init, false);

let data, table, sortCol;
let sortAsc = false;
const pageSize = 5;
let curPage = 1;

async function init() {
  table = document.querySelector("#code tbody");
  let resp = await fetch("https://kontests.net/api/v1/all");
  data = await resp.json();
  renderTable();

  document.querySelectorAll("#code thead tr th").forEach((t) => {
    t.addEventListener("click", sort, false);
  });

  document
    .querySelector("#nextButton")
    .addEventListener("click", nextPage, false);
  document
    .querySelector("#prevButton")
    .addEventListener("click", previousPage, false);
}

function renderTable() {
  let result = "";
  data
    .filter((row, index) => {
      let start = (curPage - 1) * pageSize;
      let end = curPage * pageSize;
      if (index >= start && index < end) return true;
    })
    .forEach((c) => {
      result += `<tr class="info">
      <td>${c.site}</td>
      <td class="plat">${c.name}</td>
      <td><a target = "_blank" href="${c.url}">Register</a></td>
      <td>${c.start_time.slice(0, 10)}</td>
      <td>${c.end_time.slice(0, 10)}</td>
      <td>${c.duration}s </td>
      <td>${c.status}</td>
  </tr>`;
    });
  table.innerHTML = result;
}

//sorting -----------------------------------------------------------

function sort(e) {
  let thisSort = e.target.dataset.sort;
  if (sortCol === thisSort) sortAsc = !sortAsc;
  sortCol = thisSort;
  data.sort((a, b) => {
    if (a[sortCol] < b[sortCol]) return sortAsc ? 1 : -1;
    if (a[sortCol] > b[sortCol]) return sortAsc ? -1 : 1;
    return 0;
  });
  renderTable();
}

function previousPage() {
  if (curPage > 1) curPage--;
  renderTable();
}

function nextPage() {
  if (curPage * pageSize < data.length) curPage++;
  renderTable();
}

//loader -----------------------------------------------------------------

document.onreadystatechange = function () {
  if (document.readyState !== "complete") {
    document.querySelector("body").style.visibility = "hidden";
    document.querySelector("#loader").style.visibility = "visible";
  } else {
    document.querySelector("#loader").style.display = "none";
    document.querySelector("body").style.visibility = "visible";
  }
};

//file download ----------------------------------------------------------

function htmlToCsv(filename) {
  var data = [];
  var rows = document.querySelectorAll("tr");

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

// searching ----------------------------------------------------------------

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

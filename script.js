// Asynchrous function to fetch cats data

async function getCats() {
  try {
    const dataList = await fetch("https://cataas.com/api/cats", {
      method: "GET"
    });
    let data = await dataList.json();
    loadCats(data);
  } catch (error) {
    console.log(error.message);
  }
}

// function to load fetched data into HTML page

function loadCats(cats) {
  const catList = document.createElement("div");
  catList.className = "cat-list";
  //console.log(catList);
  cats.forEach((cats) => {
    const eachCat = document.createElement("div");
    eachCat.className = "each-cat";
    eachCat.innerHTML = `
    <img id="image" src="https://cataas.com/cat/${cats.id}" alt="cats_image"/>
    `;
    catList.append(eachCat);
  });
  document.body.append(catList);
}

getCats(); // calling the function to get data from given URL

// displaying search bar

const searchBox = document.createElement("div");
searchBox.className = "input-group";
searchBox.innerHTML = `
    <input id="search-input" class="searchKey" type="search" placeholder="Search">
    <button id="search-button" class="searchBtn" type="submit" >Search</button>
    <button id="reset-button" class="resetBtn" type="reset" onclick="formReset()" >Reset</button>
 `;
document.body.append(searchBox);

// onclick event of search button

document.querySelector("#search-button").addEventListener("click", () => {
  const inputValue = document.querySelector("#search-input").value;
  searchKey(inputValue);
});

// filter using the given API

function searchKey(inpVal) {
  document.querySelector(".cat-list").remove();
  fetch(`https://cataas.com/api/cats?tags=${inpVal}`, {
    method: "GET"
  })
    .then((data) => {
      return data.json();
    })
    .then((cats) => loadCats(cats));
}

//reset the searched value to original
function formReset() {
  document.querySelector(".cat-list").remove();
  getCats();
}

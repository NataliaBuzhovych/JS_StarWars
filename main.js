const btn1 = document.querySelector(".one");
const spinner = document.querySelector(".spinner");

btn1.addEventListener("click", function () {
  getNameFilms();
});

async function getNameFilms() {
  try {
    spinner.removeAttribute("hidden");
    let request = await fetch(
      "https://swapi.dev/api/films/",
      {
        method: "GET",
      },
      { mode: "no-cors" }
    );
    let response = await request.json();
    spinner.setAttribute("hidden", "");
    document.querySelector("#buttons").scrollIntoView();
    NameFilms(response.results);
  } catch (e) {
    console.log(e);
  }
}

function NameFilms(arr) {
  document.querySelector("#buttons").innerHTML = "";
  arr.forEach((el) => {
    createButton(el.episode_id).innerHTML = el.title;
  });
  document.querySelectorAll("button").forEach((el) => {
    el.addEventListener("click", (e) => {
      let elementClass = e.target.className;
      if (elementClass !== "") {
        getPeople(elementClass);
      }
    });
  });
}

async function getPeople(num) {
  try {
    spinner.removeAttribute("hidden");
    let request = await fetch(
      `https://swapi.dev/api/films/${num}`,
      {
        method: "GET",
      },
      { mode: "no-cors" }
    );
    let response = await request.json();
    let a = document.getElementById("characters");
    let people = [];
    let el = [];

    for (let i = 0; i < response.characters.length; i++) {
      el[i] = await fetch(response.characters[i]);
      people[i] = await el[i].json();
    }
    spinner.setAttribute("hidden", "");

    if (a.hasChildNodes()) {
      document.getElementById("characters").innerHTML = "";
    }
    creatListChacters(people);
  } catch (e) {
    console.log(e);
  }
}

function creatListChacters(arr, text) {
  let element = document.createElement("div");

  for (let i = 0; i < arr.length; i++) {
    let box = document.createElement("div");
    box.classList.add(i + 1);
    if (box.className % 2 == 0) {
      box.style = "background:#5c5c27a8;display:flex";
    } else {
      box.style = "background:#454845a3;display:flex";
    }
    box.append(createCell(arr[i].name, "details"));
    box.append(createCell(arr[i].birth_year, "details"));
    box.append(createCell(arr[i].gender, "details"));
    element.append(box);
  }
  document.querySelector("#characters").append(element);
}
function createCell(a, titleClass) {
  const element = document.createElement("div");
  element.appendChild(document.createTextNode(a));
  element.classList.add(titleClass);

  return element;
}

function createButton(titleClass, html) {
  let button = document.createElement("button");
  document.querySelector("#buttons").append(button);
  button.classList.add(titleClass);
  button.innerHTML = html;

  return button;
}

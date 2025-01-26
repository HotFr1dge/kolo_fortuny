//TODO:
//Dodać dźwięki
let Arraykey = [];

let pointsArray = [0, 0, 0, 0];
playerID = 0;
class Points {
  constructor() {}
  createObject() {
    const lengthPlayer = 4;
    let divElement = Object.assign(document.createElement("div"), { className: "pointsRow" });
    for (let i = 0; i < lengthPlayer; i++) {
      let moneyElement = Object.assign(document.createElement("div"), { className: "money" });
      let spanElement = Object.assign(document.createElement("span"), { textContent: pointsArray[i] });
      divElement.appendChild(moneyElement);
      moneyElement.appendChild(spanElement);
    }
    document.body.appendChild(divElement);
  }
  setActive(id) {
    if (document.querySelector(".active")) {
      document.querySelector(".active").classList.remove("active");
    }
    document.querySelectorAll(".money")[id].classList.add("active");
  }
  changePoints(points, id) {
    if (points == "b") {
      document.querySelector(".active span").innerHTML = 0;
    } else {
      pointsArray[id] = parseInt(document.querySelector(".active span").innerHTML) + parseInt(points);
      document.querySelector(".active span").innerHTML = pointsArray[id];
    }
  }
}

function newGame() {
  console.log(pointsArray);
  new Points().createObject();
  new Points().setActive(playerID);
  Arraykey.length = 0;
  const wrapElement = Object.assign(document.createElement("div"), { className: "wrap" });
  const categoryElement = Object.assign(document.createElement("div"), { className: "category" });

  document.body.appendChild(wrapElement);
  document.body.appendChild(categoryElement);
}
newGame();

class Word {
  constructor(letter, num) {
    this.letter = letter;
    this.num = num;
  }

  createObject() {
    const wrapElement = document.querySelector(".wrap");
    let divElement;

    if (this.num === 0) {
      divElement = document.createElement("div");
      divElement.className = "box";
      wrapElement.appendChild(divElement);
    }

    if (this.letter === " ") {
      divElement = document.createElement("div");
      divElement.className = "box";
      wrapElement.appendChild(divElement);
    } else {
      divElement = document.createElement("div");
      divElement.className = "letter";

      const spanElement = document.createElement("span");
      spanElement.textContent = this.letter;
      divElement.appendChild(spanElement);

      const lengthbox = document.querySelectorAll(".box");
      lengthbox[lengthbox.length - 1].appendChild(divElement);
    }
  }
}

class Category {
  constructor(name) {
    this.name = name;
  }
  createObject() {
    const categoryElement = document.querySelector(".category");
    const spanElement = Object.assign(document.createElement("span"), { textContent: this.name });
    categoryElement.appendChild(spanElement);
  }
}

async function fetchPassword(id) {
  const wrapElement = document.querySelector(".wrap");
  await fetch("passwords.json")
    .then((response) => response.json())
    .then((value) => {
      if (value[id]) {
        length = value[id].password.length;
        for (let i = 0; i < length; i++) {
          new Word(value[id].password.toUpperCase()[i], i).createObject();
        }
        wrapElement.innerHTML += "</div>";
        new Category(value[id].category.toUpperCase()).createObject();
      } else {
        window.location.href = "./thanks.html";
      }
    });
}

fetchPassword(0);
let id = 0;
let isKeyProcessed = false;
let writing = true;
document.addEventListener("keydown", function (event) {
  if (event.key != "Control" && event.key != "AltGraph" && !isKeyProcessed && writing) {
    isKeyProcessed = true;

    if (event.key == " ") {
      const divsCorrect = document.querySelectorAll(".correct");
      divsCorrect.forEach((div) => {
        div.classList.add("reveleated");
        div.classList.remove("correct");
      });
    } else if (event.key == "Enter" && confirm("Na pewno chcesz odsłonić wszystkie litery?")) {
      const letters = document.querySelectorAll(".letter");
      letters.forEach(function (letter) {
        letter.classList.add("reveleated");
      });
    } else if (event.key == "ArrowRight") {
      document.body.innerHTML = "";
      newGame();
      id++;
      fetchPassword(id);
    } else if (event.key == "ArrowLeft") {
      document.body.innerHTML = "";
      newGame();
      id--;
      if (id < 0) {
        id = 0;
      }
      fetchPassword(id);
    } else {
      if (!Arraykey.includes(event.key) && document.querySelectorAll(".correct").length == 0) {
        Arraykey.push(event.key);
        console.log(Arraykey);
        const divs = document.querySelectorAll(".letter");
        const filteredDivs = Array.from(divs).filter((div) => {
          const spans = div.querySelectorAll("span");
          return Array.from(spans).some((span) => span.textContent.trim() === event.key.toUpperCase());
        });
        if (filteredDivs.length === 0) {
          document.body.classList.add("incorrect");
          setTimeout(function () {
            document.body.classList.remove("incorrect");
          }, 800);
          const vowels = "aęeiouóy";
          if (vowels.includes(event.key)) new Points().changePoints(-200, playerID);
          playerID++;
          if (playerID >= pointsArray.length) {
            playerID = 0;
          }
          new Points().setActive(playerID);
        } else {
          writing = false;
          changeToCorrect(filteredDivs, event.key);
        }
      }
    }
  }
});

document.addEventListener("keyup", function () {
  isKeyProcessed = false;
});
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
async function changeToCorrect(divs, letter) {
  let valuePoints = 0;
  const vowels = "aęeiouóy";
  if (vowels.includes(letter)) {
    new Points().changePoints(-200, playerID);
  } else {
    valuePoints = prompt("Podaj ile punktów jest do zdobycia");
  }
  for (const div of divs) {
    div.classList.add("correct");
    if (!vowels.includes(letter)) new Points().changePoints(valuePoints, playerID);
    if (divs.length > 1) await sleep(400);
  }
  writing = true;
}

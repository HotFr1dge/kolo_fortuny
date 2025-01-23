//TODO:
//Dodać więcej haseł
//Dodać dźwięki
//Naprawić wyświetlanie bloków
//Cofanie się do poprzedniego (opcjonalnie)
//Animacja przejść między hasłami (opcjonalnie)
function newGame() {
  const wrapElement = Object.assign(document.createElement("div"), { className: "wrap" });
  const categoryElement = Object.assign(document.createElement("div"), { className: "category" });
  document.body.appendChild(categoryElement);
  document.body.appendChild(wrapElement);
}
newGame();
class Word {
  constructor(letter) {
    this.letter = letter;
  }
  createObject() {
    let divElement;
    const wrapElement = document.querySelector(".wrap");
    if (this.letter == " ") {
      divElement = Object.assign(document.createElement("div"), { className: "letter break" });
    } else {
      divElement = Object.assign(document.createElement("div"), { className: "letter" });
    }
    const spanElement = Object.assign(document.createElement("span"), { textContent: this.letter });
    divElement.appendChild(spanElement);
    wrapElement.appendChild(divElement);
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
  await fetch("passwords.json")
    .then((response) => response.json())
    .then((value) => {
      length = value[id].password.length;
      for (let i = 0; i < length; i++) {
        new Word(value[id].password.toUpperCase()[i]).createObject();
      }
      new Category(value[id].category.toUpperCase()).createObject();
    });
}

fetchPassword(0);
let id = 1;
document.addEventListener("keyup", function (event) {
  if (event.key == " " || event.key == "Enter") {
    const divsCorrect = document.querySelectorAll(".correct");
    divsCorrect.forEach((div) => {
      div.classList.add("reveleated");
      div.classList.remove("correct");
    });
  } else if (event.key == "ArrowRight") {
    document.body.innerHTML = "";
    newGame();
    fetchPassword(id++);
  } else {
    const divs = document.querySelectorAll(".letter");
    const filteredDivs = Array.from(divs).filter((div) => {
      const spans = div.querySelectorAll("span");
      return Array.from(spans).some((span) => span.textContent.trim() === event.key.toUpperCase());
    });
    if (filteredDivs.length === 0) {
      document.body.classList.add("incorrect");
      setTimeout(function () {
        document.body.classList.remove("incorrect");
      }, 1500);
    } else {
      filteredDivs.forEach((div) => {
        div.classList.add("correct");
      });
    }
  }
});

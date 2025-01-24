//TODO:
//Dodać więcej haseł
//Dodać dźwięki
//Naprawić wyświetlanie bloków
//Sprawdzanie czy to ostatni element json
//Sprawdzanie znaków specjalnych
//Animacja przejść między hasłami (opcjonalnie)
function newGame() {
  const wrapElement = Object.assign(document.createElement("div"), { className: "wrap" });
  const categoryElement = Object.assign(document.createElement("div"), { className: "category" });
  document.body.appendChild(categoryElement);
  document.body.appendChild(wrapElement);
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

    // Tworzenie nowej "box" na początku
    if (this.num === 0) {
      divElement = document.createElement("div");
      divElement.className = "box";
      wrapElement.appendChild(divElement);
    }

    // Sprawdzenie, czy litera to spacja
    if (this.letter === " ") {
      divElement = document.createElement("div");
      divElement.className = "letter break";
      wrapElement.appendChild(divElement);
      
      // Dodanie nowego boxa po spacji
      divElement = document.createElement("div");
      divElement.className = "box";
      wrapElement.appendChild(divElement);
    } else {
      divElement = document.createElement("div");
      divElement.className = "letter";
      
      // Tworzenie elementu span z literą
      const spanElement = document.createElement("span");
      spanElement.textContent = this.letter;
      divElement.appendChild(spanElement);
      
      // Dodanie litery do ostatniego boxa
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
      length = value[id].password.length;
      for (let i = 0; i < length; i++) {
        new Word(value[id].password.toUpperCase()[i], i).createObject();
      }
      wrapElement.innerHTML += "</div>"
      new Category(value[id].category.toUpperCase()).createObject();
    });
}

fetchPassword(0);
let id = 0;
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
    fetchPassword(++id);
  }else if (event.key == "ArrowLeft") {
    document.body.innerHTML = "";
    newGame();
    fetchPassword(--id);
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

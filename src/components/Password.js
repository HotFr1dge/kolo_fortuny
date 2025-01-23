import Word from "./Word.js";

export default function Password({ password, revealedLetters, selectedLetter }) {

    const words = password.split(' ');

    return (
      <div className="wrapper">
        {
          words.map((word, index) => {
            return <Word key={index} word={word} revealedLetters={revealedLetters} selectedLetter={selectedLetter} />
          })
        }
      </div>
    );

}

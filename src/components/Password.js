import Word from "./Word.js";

export default function Password({ password }) {

    const words = password.split(' ');

    return (
      <div className="wrapper">
        {
          words.map((word, index) => {
            return <Word key={index} word={word} />
          })
        }
      </div>
    );

}

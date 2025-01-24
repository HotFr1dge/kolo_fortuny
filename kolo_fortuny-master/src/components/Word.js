import Letter from "./Letter.js";

export default function Word({ word, revealedLetters, selectedLetter }) {

    const letters = word.toUpperCase().split('');

    return (
        <div className='word'>
            {
                letters.map((letter, index) => {
                    return  <Letter key={index} letter={letter} revealedLetters={revealedLetters} selectedLetter={selectedLetter} />
                })
            }
            <Letter space={true} letter={'_'} />
        </div>
    );

}

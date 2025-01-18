import Letter from "./Letter.js";

export default function Word({ word }) {

    const letters = word.toUpperCase().split('');

    return (
        <div className='word'>
            {
                letters.map((letter, index) => {
                    return  <Letter key={index} letter={letter} />
                })
            }
            <Letter space={true} letter={'_'} />
        </div>
    );

}

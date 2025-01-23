import React, { useState, useEffect } from "react";

export default function Letter({ letter, space = false, revealedLetters = [] }) {

  const [isSelected, setIsSelected] = useState(false);
  const [isRevealed, setisRevealed] = useState(false);

  useEffect(() => {

    if (revealedLetters.includes(letter.toUpperCase())) {
      setIsSelected(true);
    }

  }, [revealedLetters]);

  return (
    <div
      className={`letter ${space ? 'space' : ''} ${isSelected ? 'selected' : ''} ${isRevealed ? 'revealed' : ''}`}
    >
        <span className="content">
            {letter}
        </span>
    </div>
  );
}

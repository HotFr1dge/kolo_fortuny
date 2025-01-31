import React, { useState, useEffect } from "react";

export default function Letter({ letter, space = false, revealedLetters = [], selectedLetter = '' }) {

  const [isSelected, setIsSelected] = useState(false);
  const [isRevealed, setisRevealed] = useState(false);

  useEffect(() => {

    if (revealedLetters.includes(letter.toUpperCase())) {
      setIsSelected(false);
      setisRevealed(true);
    }

    if (selectedLetter === letter && !isRevealed) {
      setIsSelected(true);
    }

  }, [revealedLetters, selectedLetter, letter, isRevealed]);

  return (
    <div
      className={`letter ${space ? 'space' : ''} ${isSelected ? 'selected' : ''} ${isRevealed || letter === ',' ? 'revealed' : ''}`}
    >
        <span className="content">
            {letter}
        </span>
    </div>
  );
}

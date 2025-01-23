import React from "react";

export default function Letter({ letter, space = false, isSelected = false, isRevealed  = false }) {

  return (
    <div
      className={`letter ${space ? 'space' : ''} ${isSelected ? 'selected' : ''} ${isRevealed ? 'selected' : ''}`}
    >
        <span className="content">
            {letter}
        </span>
    </div>
  );
}

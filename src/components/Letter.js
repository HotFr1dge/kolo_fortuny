import React, { useState, useEffect } from "react";

export default function Letter({ letter, space = false }) {
  const [isEnabled, setIsEnabled] = useState(false);

  // Nasłuchujemy na naciśnięcie klawisza
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toUpperCase() === letter.toUpperCase()) {
        setIsEnabled(true); // Ustawienie klasy enabled, gdy klawisz pasuje do litery
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Czyszczenie nasłuchiwacza po unmountowaniu komponentu
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [letter]); // Uruchamia się przy zmianie litery

  return (
    <div
      className={`letter ${space ? 'space' : ''} ${isEnabled ? 'enabled' : ''}`}
    >
        <span className="content">
            {letter}
        </span>
    </div>
  );
}

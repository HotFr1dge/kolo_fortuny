import { useEffect, useState, useMemo } from 'react';
import './App.css';

import Password from './components/Password.js';

function App() {

  const [currentPasswordIndex, setCurrentPasswordIndex] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [selectedLetter, setSelectedLetter] = useState(false);

  const passwords = useMemo(
    () => [
      { password: "KTO POD KIM DOŁKI KOPIE TEN WPADA", category: "POWIEDZENIE" },
    ],
    []
  );

  useEffect(() => {

    const handleKeyDown = (event) => {

      const pressedLetter = event.key.toUpperCase();
      const currentPassword = passwords[currentPasswordIndex].password;

      // obłsuga tylko pojedyńczego wciśniecia
      if (!event.repeat) {

        if (/^[A-ZĄĆĘŁŃÓŚŹŻ]$/.test(pressedLetter) && !selectedLetter) {

          if (currentPassword.includes(pressedLetter)) {

            console.log(`Odkryto literę: ${pressedLetter}`);
            setSelectedLetter(pressedLetter);
    
          }
          else {
            console.log('Pudło!');

            if (!document.body.classList.contains('failed')) {

              document.body.classList.add('failed');

              setTimeout(() => {
                document.body.classList.remove('failed');
              }, 1500)

            }

          }

        }
        else {  
          console.log('Wciśnięto coś innego');
        }

      } else {

        if (pressedLetter === ' ' && /^[A-ZĄĆĘŁŃÓŚŹŻ]$/.test(selectedLetter)) {
          setRevealedLetters((prev) => [...prev, selectedLetter]);
          setSelectedLetter(false);
        }

        if (pressedLetter === 'ENTER') {
          console.log('Odryj całość.');
        }

      }

    };

    window.addEventListener("keydown", handleKeyDown);

    console.log(selectedLetter);
    console.log(revealedLetters);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPasswordIndex, revealedLetters, passwords, selectedLetter]);

  return (
    <div className="app">
      <Password password={passwords[currentPasswordIndex].password} revealedLetters={revealedLetters} selectedLetter={selectedLetter} />

      <div className="category">
          {passwords[currentPasswordIndex].category}
      </div>

    </div>
  );
}

export default App;

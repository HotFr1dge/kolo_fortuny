import { useEffect, useState } from 'react';
import './App.css';

import Password from './components/Password.js';

function App() {

  const [currentPasswordIndex, setCurrentPasswordIndex] = useState(0);
  const [revealedLetters, setRevealedLetters] = useState([]);

  const passwords = [
    { password: 'KTO POD KIM DOŁKI KOPIE TEN WPADA', category: 'POWIEDZENIE' }
  ];

  useEffect(() => {

    const handleKeyDown = (event) => {

      // obłsuga tylko pojedyńczego wciśniecia
      if (!event.repeat) {

        const pressedLetter = event.key.toUpperCase();
        const currentPassword = passwords[currentPasswordIndex].password;

        if (/^[A-ZĄĆĘŁŃÓŚŹŻ]$/.test(pressedLetter)) {

          if (currentPassword.includes(pressedLetter)) {

            console.log(`Odkryto literę: ${pressedLetter}`);
            setRevealedLetters((prev) => [...prev, pressedLetter]);

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



      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPasswordIndex, revealedLetters, passwords]);

  return (
    <div className="app">
      <Password password={passwords[currentPasswordIndex].password} revealedLetters={revealedLetters} />

      <div className="category">
          {passwords[currentPasswordIndex].category}
      </div>

    </div>
  );
}

export default App;

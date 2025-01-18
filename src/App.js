import { useEffect } from 'react';
import './App.css';

import Word from './components/Word.js';

function App() {
  const password = 'KTO POD KIM DOŁKI KOPIE TEN WPADA';
  const words = password.split(' ');

  const passwords = [
    {password: 'KTO POD KIM DOŁKI KOPIE TEN WPADA', category: 'POWIEDZENIE'}
  ]; // TODO - zrobić żeby działaó dla takiego obiektu

  // TODO - dodać okrywanie całego hasła za pomocą jakiegoś skrótu klawiaturowego
  // TODO - usunąć spacje jesli elment jest ostatnim elementem w wierszu

  return (
    <div className="app">

      <div className="wrapper">
        {
          words.map((word, index) => {
            return <Word key={index} word={word} />
          })
        }
      </div>
      <div className="category">
          POWIEDZENIE
      </div>

    </div>
  );
}

export default App;

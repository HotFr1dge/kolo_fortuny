import { useEffect } from 'react';
import './App.css';

import Word from './components/Word.js';

function App() {
  const password = 'KTO POD KIM DOŁKI KOPIE TEN WPADA';
  const words = password.split(' ');

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

    </div>
  );
}

export default App;

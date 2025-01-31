import { useEffect, useState, useMemo } from 'react';
import './App.css';

import Password from './components/Password.js';

function App() {

  const [currentPasswordIndex, setCurrentPasswordIndex] = useState(0);
  const [currentPlayerId, setCurrentPlayerId] = useState(0);
  const [userPoints, setUserPoints] = useState([0,0,0,0])
  const [revealedLetters, setRevealedLetters] = useState([]);
  const [pointsToEarn, setPointsToEarn] = useState(0);
  const [pointsMode, setPointsMode] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState(false);
  const [failed, setFaild] = useState(false);

  const passwords = useMemo(
    () => [
      { password: "ŚPIĄCA KRÓLEWNA", category: "BAJKI I BAŚNIE" },
      { password: "KTO PYTA, NIE BŁĄDZI", category: "PRZYSŁOWIE" },
      { password: "O WILKU MOWA", category: "PRZYSŁOWIE" },
      { password: "CO NAGLE, TO PO DIABLE", category: "PRZYSŁOWIE" },
      { password: "BEZ PRACY NIE MA KOŁACZY", category: "PRZYSŁOWIE" },
      { password: "DO WESELA SIĘ ZAGOI", category: "PRZYSŁOWIE" },
      { password: "KTO POD KIM DOŁKI KOPIE SAM W NIE WPADA", category: "PRZYSŁOWIE" },
      { password: "SKAZANI NA SHAWSHANK", category: "FILM" },
      { password: "ZIELONA MILA", category: "FILM" },
      { password: "LALKA", category: "LITERATURA" },
      { password: "WESELE", category: "LITERATURA" },
      { password: "DZIADY", category: "LITERATURA" },
      { password: "INNY ŚWIAT", category: "LITERATURA" },
      { password: "ZDĄŻYĆ PRZED PANEM BOGIEM", category: "LITERATURA" },
      { password: "ZBRODNIA I KARA", category: "LITERATURA" },
      { password: "BITWA POD GRUNWALDEM", category: "HISTORIA" },
      { password: "CHRZEST POLSKI", category: "HISTORIA" },
      { password: "ROSZPUNKA", category: "BAJKI I BAŚNIE" },
      { password: "OJCIEC CHRZESTNY", category: "FILM" },
      { password: "KRÓLEWNA ŚNIEŻKA", category: "BAJKI I BAŚNIE" },
      { password: "PULP FICTION", category: "FILM" },
      { password: "PIANISTA", category: "FILM" },
      { password: "KOŃ TROJAŃSKI", category: "MITOLOGIA" },
      { password: "PUSZKA PANDORY", category: "MITOLOGIA" }
    ],
    []
  );

  useEffect(() => {

    const handleKeyDown = (event) => {
      if (event.repeat) return;

      // console.log(event);

      const pressedLetter = event.key.toUpperCase();
      const isLetter = /^[A-ZĄĆĘŁŃÓŚŹŻ]$/.test(pressedLetter);
      const isNumber = /^[0-9]$/.test(pressedLetter);
      const isSamogloska = /^[AEIOUYĄĘÓ]$/.test(pressedLetter);
      const currentPassword = passwords[currentPasswordIndex].password;
      const multipler = currentPassword.split('').filter(char => char === pressedLetter).length
      const shift = event.shiftKey;
      const lettersToGuess = [...new Set(currentPassword.replaceAll(' ', '').split(''))];

      if (pressedLetter === 'CAPSLOCK' && !selectedLetter) {

        if (pointsMode === false) {
          setPointsToEarn('');
        }

        setPointsMode((prev) => !prev);

        console.log('Tryb wprowadzania: ' + !pointsMode);

      }

     if (pointsMode === true && isNumber && !selectedLetter) {
        setPointsToEarn((prev) => prev.toString() + pressedLetter);
        return console.log('Tryb wprowadzania: ' + pressedLetter);
     }
     
     if (isLetter && !selectedLetter) {

        if (revealedLetters.includes(pressedLetter)) {

          (currentPlayerId + 1) >= 4 ? setCurrentPlayerId(0) : setCurrentPlayerId(currentPlayerId + 1);
          setFaild(true);
          setTimeout(() => {
            setFaild(false);
          }, 1500)

        }
        else if (currentPassword.includes(pressedLetter)) {

          const audio = new Audio('letter_ok.mp3');
          audio.play();

          setSelectedLetter(pressedLetter);

          const updatedPoints = userPoints;
          if (isSamogloska) {
            updatedPoints[currentPlayerId] -= 200;
          } 
          else {
            updatedPoints[currentPlayerId] += Number(pointsToEarn) * multipler;
          }
          setUserPoints(updatedPoints);

          console.log(userPoints);

        }
        else {

          (currentPlayerId + 1) >= 4 ? setCurrentPlayerId(0) : setCurrentPlayerId(currentPlayerId + 1);
          setFaild(true);
          setTimeout(() => {
            setFaild(false);
          }, 1500)

        }
        // setPointsToEarn(0);
      } 
      else if (pressedLetter === ' ' && selectedLetter) {

          setRevealedLetters((prev) => [...prev, selectedLetter]);
          setSelectedLetter(false);
          //setPointsToEarn(0);

          const audio = new Audio('./reveal.mp3');
          audio.play();


          console.log(lettersToGuess);
          console.log(revealedLetters);

      }
      else if (shift && pressedLetter === ' ') {

        const audio = new Audio('pass_solved.mp3');
        audio.play();
        
        setRevealedLetters(currentPassword);

        console.log('Odryj całość.');

      }
      else if (shift && pressedLetter === 'ARROWRIGHT') {

        if (currentPasswordIndex + 1 < passwords.length) {
          setCurrentPasswordIndex((prev) => prev + 1);
        }
        
      }
      else if (shift && pressedLetter === 'ARROWLEFT') {

        if (currentPasswordIndex - 1 >= 0) {
          setCurrentPasswordIndex((prev) => prev - 1);
        }
        
      }

    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentPasswordIndex, revealedLetters, passwords, selectedLetter, currentPlayerId, userPoints, pointsToEarn, pointsMode]);

  return (
    <div className={`app ${failed ? 'failed' : ''}`}>
      <div className="header">
        <h1>Koło fortuny</h1>
        <p>Studniówka 2025</p>
      </div>

      <Password password={passwords[currentPasswordIndex].password} revealedLetters={revealedLetters} selectedLetter={selectedLetter} />

      <div className="category">
          {passwords[currentPasswordIndex].category}
      </div>

      <div className="points-row">
        <div className={`points-player ${currentPlayerId === 0 ? 'active' : ''}`}>
          {Number(userPoints[0])}
        </div>
        <div className={`points-player ${currentPlayerId === 1 ? 'active' : ''}`}>
          {Number(userPoints[1])}
        </div>
        <div className={`points-player ${currentPlayerId === 2 ? 'active' : ''}`}>
          {Number(userPoints[2])}
        </div>
        <div className={`points-player ${currentPlayerId === 3 ? 'active' : ''}`}>
          {Number(userPoints[3])}
        </div>
      </div>

      <div style={{ fontSize: 24 }}>
        Punkty do zdobycia: {pointsToEarn}
      </div>

    </div>
  );
}

export default App;

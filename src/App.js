import { useEffect, useState } from 'react';
import './App.css';

import Password from './components/Password.js';

function App() {

  const [currentPassword, setCurrentPassword] = useState(0);

  const passwords = [
    { password: 'KTO POD KIM DOŁKI KOPIE TEN WPADA', category: 'POWIEDZENIE' }
  ];

  useEffect(() => {

  }, []);

  return (
    <div className="app">
      <Password password={passwords[currentPassword].password} />

      <div className="category">
          {passwords[currentPassword].category}
      </div>

    </div>
  );
}

export default App;

import './App.css';
import Timer from './Timer';
import { useEffect, useState } from 'react';

const DURATION = 120;

const App = () => {
  const [seconds, setSeconds] = useState(DURATION)
  const [start, setStart] = useState()

  useEffect(() => {
    const id = setInterval(() => {
      if (!start) {
        return;
      }

      const secondsPassed = Math.floor((Date.now() - start) / 1000);
      setSeconds(DURATION - (secondsPassed % DURATION) - 1);
    }, 300);
    return () => clearInterval(id);
  }, [start]);

  return (<div className="App">
    <Timer seconds={seconds}/>
    <button onClick={() => {
      setSeconds(DURATION)
      setStart(Date.now())
    }}>start</button>
  </div>);
};

export default App;

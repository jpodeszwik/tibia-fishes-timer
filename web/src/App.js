import './App.css';
import Timer from './Timer';
import { useEffect, useState } from 'react';
import alarm from "./static/alarm.wav";

const DURATION = 120;

const App = () => {
  const [seconds, setSeconds] = useState(DURATION);
  const [start, setStart] = useState();
  const [audio] = useState(new Audio(alarm));

  useEffect(() => {
    const id = setInterval(() => {
      if (!start) {
        return;
      }

      const secondsPassed = Math.floor((Date.now() - start) / 1000);
      setSeconds(DURATION - (secondsPassed % DURATION) - 1);
    }, 100);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    if (seconds === 20 || seconds === 10) {
      audio.play();
    }
  }, [seconds]);

  return (<div className="App">
    <h1>Tibia fishes tracker</h1>
    <div>
      <button onClick={() => {
        setSeconds(DURATION);
        setStart(Date.now());
      }}>start</button>

      <button onClick={() => {
        setStart(null);
        setSeconds(DURATION);
      }}>stop</button>
    </div>

    <Timer seconds={seconds}/>
  </div>);
};

export default App;

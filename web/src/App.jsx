import './App.css';
import alarm from './static/alarm.wav';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import Header from './Header';
import WaterStatus from './WaterStatus';

const DURATION = 120;

const App = () => {
  const [seconds, setSeconds] = useState(DURATION);
  const [start, setStart] = useState();
  const [audio] = useState(new Audio(alarm));
  const [water, setWater] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      if (!start) {
        return;
      }
      const secondsPassed = Math.floor((Date.now() - start) / 1000);
      const cyclesPassed = Math.floor(secondsPassed / DURATION);
      console.log(cyclesPassed % 2 == 0);
      setWater(cyclesPassed % 2 == 0);
      setSeconds(DURATION - (secondsPassed % DURATION) - 1);
    }, 100);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    if (seconds === 20 || seconds === 10) {
      audio.play();
    }
  }, [seconds]);

  const startTimer = () => {
    setSeconds(DURATION);
    setStart(Date.now() - 10 * DURATION * 1000);
  };

  const stopTimer = () => {
    setStart(null);
    setSeconds(DURATION);
  };

  const addSeconds = (seconds) => {
    setStart(start + (seconds * 1000));
  };

  return (<div className="App">
    <Header/>
    <div className="button-bar">
      <button onClick={startTimer}>start</button>
      <button disabled={!start} onClick={stopTimer}>stop</button>
      <button disabled={!start} onClick={() => addSeconds(1)}>+1s</button>
      <button disabled={!start} onClick={() => addSeconds(-1)}>-1s</button>
      <button disabled={!start} onClick={() => addSeconds(-120)}>-120s</button>
    </div>

    <Timer seconds={seconds}/>
    <WaterStatus status={water}/>
  </div>);
};

export default App;

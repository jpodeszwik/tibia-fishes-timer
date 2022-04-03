import './App.css';
import alarm from './static/alarm.wav';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import Header from './Header';
import WaterStatus from './WaterStatus';
import VolumeBar from './VolumeBar';

const DURATION = 120;

const App = () => {
  const [seconds, setSeconds] = useState(DURATION);
  const [start, setStart] = useState();
  const [audio] = useState(new Audio(alarm));
  const [water, setWater] = useState(true);
  const [volume, setVolume] = useState(50);

  useEffect(() => {
    /* eslint no-restricted-globals: "off" */
    const hash = parent.location.hash;
    if (hash) {
      setStart(parseInt(hash.replace('#', '')));
    }
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      if (!start) {
        return;
      }
      const secondsPassed = Math.floor((Date.now() - start) / 1000);
      const cyclesPassed = Math.floor(secondsPassed / DURATION);
      setWater(cyclesPassed % 2 == 0);
      setSeconds(DURATION - (secondsPassed % DURATION) - 1);
    }, 100);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    if (seconds === 20 || seconds === 10) {
      audio.play();
    }
  }, [seconds, audio]);

  useEffect(() => {
    audio.volume = volume / 100;
  }, [volume, audio]);

  const startTimer = () => {
    setSeconds(DURATION);
    const newStart = Date.now() - 10 * DURATION * 1000;
    setStart(newStart);
    /* eslint no-restricted-globals: "off" */
    parent.location.hash = newStart;
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
      <button disabled={!!start} onClick={startTimer}>start</button>
      <button disabled={!start} onClick={stopTimer}>stop</button>
      <button disabled={!start} onClick={() => addSeconds(1)}>+1s</button>
      <button disabled={!start} onClick={() => addSeconds(-1)}>-1s</button>
      <button disabled={!start} onClick={() => addSeconds(-120)}>-120s</button>
    </div>
    <VolumeBar onChange={setVolume} />
    <Timer seconds={seconds}/>
    {start && <WaterStatus status={water}/>}
  </div>);
};

export default App;

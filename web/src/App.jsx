import './App.css';
import alarm1 from './static/alarm1.wav';
import alarm2 from './static/alarm2.wav';
import alarm3 from './static/alarm3.wav';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import Header from './Header';
import WaterStatus from './WaterStatus';
import VolumeBar from './VolumeBar';

const DURATION = 120;

const App = () => {
  const [seconds, setSeconds] = useState(DURATION);
  const [start, setStart] = useState();
  const [audio] = useState([new Audio(alarm1), new Audio(alarm2), new Audio(alarm3)]);
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
    if (seconds === 20) {
      audio[2].play();
    }
    if(seconds === 10) {
      audio[1].play();
    }
    if(seconds === 0) {
      audio[0].play();
    }
  }, [seconds, audio]);

  useEffect(() => {
    const newVolume = volume / 100;
    audio[0].volume = newVolume;
    audio[1].volume = newVolume;
    audio[2].volume = newVolume;
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
    const newStart = start + (seconds * 1000);
    setStart(newStart);
    parent.location.hash = newStart;
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

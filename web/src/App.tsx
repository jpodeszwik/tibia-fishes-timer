import './App.css';
import { useEffect, useState } from 'react';
import Timer from './Timer';
import Header from './Header';
import WaterStatus from './WaterStatus';
import VolumeBar from './VolumeBar';
import React from 'react';

const alarm1 = require('./static/alarm1.wav') as string;
const alarm2 = require('./static/alarm2.wav') as string;
const alarm3 = require('./static/alarm3.wav') as string;

const DURATION = 120;

const useAudio = (url: string) => {
  const [audio] = useState(() => new Audio(url));
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    audio.currentTime = 0;
    playing ? audio.play() : audio.pause();
  }, [playing, audio]);

  useEffect(() => {
    audio.addEventListener('ended', () => setPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setPlaying(false));
    };
  }, [audio]);

  return {
    play: () => setPlaying(true),
    stop: () => setPlaying(false),
    setVolume: (volume: number) => audio.volume = volume,
  };
};

const useAudios = (urls: Array<string>) => {
  const audios = urls.map(useAudio);

  return {
    play: (num: number) => {
      audios.forEach(a => a.stop());
      audios[num].play();
    },
    setVolume: (volume: number) => audios.forEach(a => a.setVolume(volume)),
  }
};

const App = () => {
  const audios = useAudios([alarm1, alarm2, alarm3]);
  const [secondsElapsed, setSecondsElapsed] = useState(0);
  const [start, setStart] = useState(0);
  const [volume, setVolume] = useState(0);

  const cyclesPassed = secondsElapsed ? Math.floor(secondsElapsed / DURATION) : 0;
  const water = cyclesPassed % 2 === 0;
  const seconds = secondsElapsed ? DURATION - (secondsElapsed % DURATION) - 1 : DURATION;

  useEffect(() => {
    /* eslint no-restricted-globals: "off" */
    const hash = parent.location.hash;
    if (hash) {
      setStart(parseInt(hash.replace('#', '')));
    }
  }, []);

  useEffect(() => {
    if (!start) {
      return;
    }
    const id = setInterval(() => {
      setSecondsElapsed(Math.floor((Date.now() - start) / 1000));
    }, 100);
    return () => clearInterval(id);
  }, [start]);

  useEffect(() => {
    if (seconds === 20) {
      audios.play(2);
    }
    if (seconds === 10) {
      audios.play(1);
    }
    if (seconds === 0) {
      audios.play(0);
    }
  }, [seconds, audios]);

  useEffect(() => {
    audios.setVolume(volume / 100);
  }, [volume, audios]);

  const startTimer = () => {
    const newStart = Date.now() - 10 * DURATION * 1000;
    setStart(newStart);
    /* eslint no-restricted-globals: "off" */
    parent.location.hash = String(newStart);
  };

  const stopTimer = () => {
    setStart(0);
    /* eslint no-restricted-globals: "off" */
    parent.location.hash = '';
  };

  const addSeconds = (seconds: number) => {
    const newStart = start + (seconds * 1000);
    setStart(newStart);
    /* eslint no-restricted-globals: "off" */
    parent.location.hash = String(newStart);
  };

  return (<div className="App">
    <Header />
    <div className="button-bar">
      <button disabled={!!start} onClick={startTimer}>start</button>
      <button disabled={!start} onClick={stopTimer}>stop</button>
      <button disabled={!start} onClick={() => addSeconds(1)}>+1s</button>
      <button disabled={!start} onClick={() => addSeconds(-1)}>-1s</button>
      <button disabled={!start} onClick={() => addSeconds(-120)}>-120s</button>
    </div>
    <VolumeBar onChange={setVolume} />
    <Timer seconds={seconds} />
    <WaterStatus status={water} />
  </div>);
};

export default App;

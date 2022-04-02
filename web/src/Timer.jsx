const Timer = ({seconds}) => (
    <h1>{Math.floor(seconds/60)}:{String(seconds%60).padStart(2, '0')}</h1>
);

export default Timer;
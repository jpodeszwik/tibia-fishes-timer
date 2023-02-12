import React from 'react';

type TimerProps = {
    seconds: number;
};

const Timer = ({ seconds }: TimerProps) =>
    (<div className="Timer">{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, '0')}</div>)

export default Timer;
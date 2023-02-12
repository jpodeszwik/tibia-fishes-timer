import React from "react";

type WaterStatusProps = {
    status: boolean,
}

const WaterStatus = ({status}: WaterStatusProps) => (<div className="WaterStatus">Water <span className={status ? 'WaterStatus-up' : 'WaterStatus-down'}>{status ? 'up' : 'down'}</span></div>);

export default WaterStatus;
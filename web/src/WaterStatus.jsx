const WaterStatus = ({status}) => (<div className="WaterStatus">Water <span className={status ? 'WaterStatus-up' : 'WaterStatus-down'}>{status ? 'up' : 'down'}</span></div>);

export default WaterStatus;
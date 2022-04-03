import { useState } from 'react';

const VolumeBar = ({onChange}) => {
    const [value, setValue] = useState(50);

    const valueChanged = val => {
        setValue(val);
        if (onChange) {
            onChange(val);
        }
    }

    return (
        <div className="volume-bar">
            <span>Volume {value}</span>
            <input type="range" min="0" max="100" value={value} onChange={e => valueChanged(e.target.value)} ></input>
        </div>
    );

};

export default VolumeBar;
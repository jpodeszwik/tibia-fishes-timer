import { useState, useEffect } from 'react';

const useLocalStorage = (defaultValue, key) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const storageVal = Number.parseInt(localStorage.getItem(key), 10);
        if (!Number.isNaN(storageVal)) {
            setValue(storageVal);
        }
    }, [key]);

    return [value, val => {
        localStorage.setItem(key, val);
        setValue(val);
    }];
};

const VolumeBar = ({ onChange }) => {
    const [value, setValue] = useLocalStorage(20, 'volume');

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value, onChange]);

    return (
        <div className="volume-bar">
            <span>Volume {value}</span>
            <input type="range" min="0" max="100" value={value} onChange={e => setValue(e.target.value)} ></input>
        </div>
    );
};

export default VolumeBar;
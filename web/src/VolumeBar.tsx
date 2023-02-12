import { useState, useEffect } from 'react';
import React from 'react';

const useLocalStorage = (defaultValue: number, key: string) => {
    const [value, setValue] = useState(defaultValue);

    useEffect(() => {
        const storageVal = Number.parseInt(localStorage.getItem(key) || '', 10);
        if (!Number.isNaN(storageVal)) {
            setValue(storageVal);
        }
    }, [key]);

    return {
        value,
        setValue: (val: number) => {
            localStorage.setItem(key, String(val));
            setValue(val);
        }
    };
};

type VolumeBarProps = {
    onChange: Function,
}

const VolumeBar = ({ onChange }: VolumeBarProps) => {
    const { value, setValue } = useLocalStorage(20, 'volume');

    useEffect(() => {
        if (onChange) {
            onChange(value);
        }
    }, [value, onChange]);

    return (
        <div className="volume-bar">
            <span>{`Volume ${value}`}</span>
            <input type="range" min="0" max="100" value={value} onChange={e => setValue(Number.parseInt(e.target.value))} ></input>
        </div>
    );
};

export default VolumeBar;
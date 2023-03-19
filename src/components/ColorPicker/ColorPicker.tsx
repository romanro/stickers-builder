import React, { FC, useMemo, useRef, useState } from 'react';
import './ColorPicker.modules.scss';
import { Color, ColorPickerProps } from './ColorPicker.models';
import { ColorIcon } from './ColorIcon';
import { useOutsideAlerter } from '../../hooks/useClickOutside';

const ColorPicker: FC<ColorPickerProps> = ({ selectedColor, colors, onChange }) => {
    const wrapperRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);

    const selectedIndex = useMemo(() => colors.findIndex((c) => c.hex === selectedColor), [selectedColor, colors]);

    useOutsideAlerter(wrapperRef, setIsOpen);

    const toggle = () => {
        setIsOpen((op) => !op);
    };

    const handleColorSelect = (color: Color) => {
        onChange(color.hex);
        setIsOpen(false);
    };

    return (
        <div className='control'>
            <label className='label'>צבע:</label>
            <div className={'container'} ref={wrapperRef}>
                <button className='picker-btn' onClick={toggle}>
                    <ColorIcon color={colors[selectedIndex]} />
                    <p className={`dropdown-icon${isOpen ? ' expanded' : ''}`}></p>
                </button>
                {isOpen && (
                    <ul className='colors-list'>
                        {colors.map((color) => (
                            <li key={color.hex} className='colors-list-item'>
                                <button
                                    className='colors-list-btn'
                                    onClick={() => {
                                        handleColorSelect(color);
                                    }}>
                                    <ColorIcon color={color} />
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export { ColorPicker };

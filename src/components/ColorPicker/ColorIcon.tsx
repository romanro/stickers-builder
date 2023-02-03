import React, { FC } from 'react';
import './ColorPicker.modules.scss';
import { ColorIconProps } from './ColorPicker.models';

export const ColorIcon: FC<ColorIconProps> = ({ color }) => {
    const { hex, label } = color;
    return (
        <div className='color-icon'>
            <div className='color' style={{ background: hex }}></div>
            {label && <p className='label'>{label}</p>}
        </div>
    );
};

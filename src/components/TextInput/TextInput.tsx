import React, { FC } from 'react';
import './TextInput.modules.scss';

interface TextInputProps {
    text: string;
    onInputChange: (text: string) => void;
}

export const TextInput: FC<TextInputProps> = ({ text, onInputChange }) => {
    return <div className="control">
        <label className='label'>הקלד\י את שם האינסטגרם שלך</label>
        <input className='input-field' type='text' value={text} onChange={(e) => onInputChange(e.target.value)} />
    </div>;
};



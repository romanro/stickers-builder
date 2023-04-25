import React, { ChangeEvent, FC, useState } from 'react';
import './TextInput.modules.scss';
import { DEFAULT_PLACEHOLDER } from '../../consts/text.consts';

interface TextInputProps {
    text: string;
    maxLength: number;
    onInputChange: (text: string) => void;
}

export const TextInput: FC<TextInputProps> = ({ text, onInputChange, maxLength }) => {

    const [remaining, setRemaining] = useState<number>(maxLength);

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value.replace(/[^A_Za-z0-9.,_-]/gi, '');;

        if (value) {
            setRemaining(maxLength - value.length)
        }

        onInputChange(value);

    }

    return <div className="control">
        <label className='label'>טקסט:</label>
        <input className='input-field'
            type='text'
            maxLength={maxLength} placeholder={DEFAULT_PLACEHOLDER}
            value={text}
            onChange={onChange} />
        <p className='additional-info'>נותרו {remaining} תווים</p>
    </div>;
};



import React, { FC } from 'react';
import { FontSettings } from '../../models/Fonts';
import './LocalFontPicker.modules.scss';
import { textCapitalizer } from './LocalFontPicker.utils';

export interface LocalFontPickerListProps {
    text: string;
    fonts: FontSettings[]
    onSelectFont: (font: FontSettings) => void
}

export const LocalFontPickerList: FC<LocalFontPickerListProps> = ({ text, fonts, onSelectFont }) => {


    return (
        <ul className='font-list'>
            {fonts.map((font) => {

                const { fontFamily, displayName, isCapsOnly } = font;

                const styles: React.HTMLAttributes<HTMLLIElement>['style'] = {
                    fontFamily
                }

                return <li className='font-list-item' style={styles} key={fontFamily}>
                    <button className='font-list-btn' onClick={() => onSelectFont(font)}>{textCapitalizer(text, displayName, isCapsOnly)}</button>
                </li>
            })}
        </ul>
    );
}

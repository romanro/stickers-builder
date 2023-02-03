import React, { FC, ReactElement } from 'react';
import { FontsListProps } from './FontPicker.models';
import { getFontId } from './FontPicker.utils';
import { Font } from '@samuelmeuli/font-manager';

const FontsList: FC<FontsListProps> = ({
    fonts = [],
    loadingStatus,
    selectorSuffix,
    activeFontFamily,
    onSelection,
}) => {
    if (loadingStatus !== 'finished') {
        return null;
    }

    const handleOnClick = (font: Font) => {
        if (font) {
            onSelection?.(font);
        }
    };

    return (
        <ul className='font-list'>
            {fonts.map((font): ReactElement => {
                const isActive = font.family === activeFontFamily;
                const fontId = getFontId(font.family);
                return (
                    <li key={fontId} className='font-list-item'>
                        <button
                            type='button'
                            id={`font-button-${fontId}${selectorSuffix}`}
                            className={`font-button ${isActive ? 'active-font' : ''}`}
                            onClick={() => handleOnClick(font)}>
                            {font.family}
                        </button>
                    </li>
                );
            })}
        </ul>
    );
};

export { FontsList };

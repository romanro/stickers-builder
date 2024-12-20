import React, { FC, useMemo, useRef, useState } from 'react';
import './LocalFontPicker.modules.scss';
import { FontSettings, SupportedFontFamily } from '../../models/Fonts';
import { LocalFontPickerList } from './LocalFontPickerList';
import { textCapitalizer } from './LocalFontPicker.utils';
import { useOutsideAlerter } from '../../hooks/useClickOutside';

interface LocalFontPickerProps {
    text: string;
    activeFontFamily: SupportedFontFamily;
    fonts: FontSettings[];
    onChange: (font: FontSettings) => void
}

export const LocalFontPicker: FC<LocalFontPickerProps> = ({ text, fonts, activeFontFamily, onChange }) => {

    const wrapperRef = useRef(null);

    const [expanded, setExpanded] = useState<boolean>(false);

    const selectedFont = useMemo(() => fonts.find(f => f.fontFamily === activeFontFamily), [activeFontFamily, fonts]);

    const displayText = useMemo(() => textCapitalizer(text, selectedFont?.displayName || '', selectedFont?.isCapsOnly), [text, selectedFont])

    useOutsideAlerter(wrapperRef, setExpanded);

    const styles: React.HTMLAttributes<HTMLLIElement>['style'] = useMemo(() => {
        return {
            fontFamily: activeFontFamily
        }
    }, [activeFontFamily]);

    const toggleExpanded = () => {
        setExpanded(exp => !exp)
    }

    const onSelectFont = (font: FontSettings) => {
        onChange(font);
        setExpanded(false);
    }

    return <div className='control'>
        <label className='label'>גופן:</label>
        <div ref={wrapperRef} className='font-picker-container'>
            <button type='button' className={`dropdown-button`} onClick={toggleExpanded}>
                <span className='dropdown-font-family' style={styles}>{displayText}</span>
                <span className={`dropdown-icon ${expanded ? 'expanded' : ''}`} />
            </button>
            {expanded && <LocalFontPickerList text={text} fonts={fonts} onSelectFont={onSelectFont} />}
        </div></div>;
};


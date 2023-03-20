import React, { FC, useEffect, useMemo, useState } from 'react';
import { FontPickerProps, LoadingStatus } from './FontPicker.models';
import { FONT_FAMILY_DEFAULT, Font, FontManager, OPTIONS_DEFAULTS, Options } from '@samuelmeuli/font-manager';
import { FontsList } from './FontsList';

const FontPicker: FC<FontPickerProps> = ({
    activeFontFamily = FONT_FAMILY_DEFAULT,
    options = OPTIONS_DEFAULTS,
    onChange,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');

    const fontManager: FontManager = useMemo(() => {
        const mergedOptions: Options = { ...OPTIONS_DEFAULTS, ...options };

        return new FontManager(process.env.REACT_APP_GFONTS_API_KEY || '', activeFontFamily, mergedOptions, onChange);
    }, [activeFontFamily, onChange, options]);

    useEffect(() => {
        fontManager
            .init()
            .then((): void => {
                setLoadingStatus('finished');
            })
            .catch((err: Error): void => {
                // On error: Log error message
                setLoadingStatus('error');
                console.error('Error trying to fetch the list of available fonts');
                console.error(err);
            });
    });

    // Extract and sort font list
    const fonts = Array.from(fontManager.getFonts().values());
    if (options.sort === 'alphabet') {
        fonts.sort((font1: Font, font2: Font): number => font1.family.localeCompare(font2.family));
    }

    /**
     * Set the specified font as the active font in the fontManager and update activeFontFamily in the
     * state
     */
    const setActiveFontFamily = (activeFontFamily: string): void => {
        fontManager.setActiveFont(activeFontFamily);
    };

    const toggleExpanded = () => {
        setExpanded((exp) => !exp);
    };

    const handleNewFontSelection = (font: Font) => {
        setActiveFontFamily(font.family);
        setExpanded(false);
    };

    return (
        <div id={`font-picker${fontManager.selectorSuffix}`} className={expanded ? 'expanded' : ''}>
            <button type='button' className='dropdown-button' onClick={toggleExpanded}>
                <span className='dropdown-font-family'>{activeFontFamily}</span>
                <span className={`dropdown-icon ${loadingStatus}`} />
            </button>
            {expanded && (
                <FontsList
                    fonts={fonts || []}
                    loadingStatus={loadingStatus}
                    selectorSuffix={fontManager.selectorSuffix}
                    onSelection={handleNewFontSelection}
                />
            )}
        </div>
    );
};

export { FontPicker };

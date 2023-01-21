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

        return new FontManager(process.env.REACT_APP_API_KEY || '', activeFontFamily, mergedOptions, onChange);
    }, [activeFontFamily, onChange, options]);

    // Extract and sort font list
    const fonts = Array.from(fontManager.getFonts().values());
    if (options.sort === 'alphabet') {
        fonts.sort((font1: Font, font2: Font): number => font1.family.localeCompare(font2.family));
    }

    const toggleExpanded = () => {
        setExpanded((exp) => !exp);
    };

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

    return (
        <div id={`font-picker${fontManager.selectorSuffix}`} className={expanded ? 'expanded' : ''}>
            <button type='button' className='dropdown-button' onClick={toggleExpanded}>
                <p className='dropdown-font-family'>{activeFontFamily}</p>
                <p className={`dropdown-icon ${loadingStatus}`} />
            </button>
            {expanded && (
                <FontsList
                    fonts={fonts || []}
                    loadingStatus={loadingStatus}
                    selectorSuffix={fontManager.selectorSuffix}
                />
            )}
        </div>
    );
};

export { FontPicker };

import React, { FC, useMemo, useState } from 'react';
import { FontPickerProps, LoadingStatus } from './FontPicker.models';
import { FontManager, Options } from '@samuelmeuli/font-manager';

const apiKey = 'AIzaSyAoSgKuhWKmv151GqhVfgT7Sb4cJe1sT7I';

const FontPicker: FC<FontPickerProps> = ({
    activeFontFamily,
    pickerId = 'font-picker',
    families = [],
    categories = ['sans-serif'],
    scripts = ['latin'],
    variants = ['regular'],
    filter = () => true,
    limit = 10,
    sort = 'alphabet',
    onChange,
}) => {
    const [expanded, setExpanded] = useState<boolean>(false);
    const [loadingStatus, setLoadingStatus] = useState<LoadingStatus>('loading');

    const fontManager: FontManager = useMemo(() => {
        const options: Options = {
            pickerId,
            families,
            categories,
            scripts,
            variants,
            filter,
            limit,
            sort,
        };
        return new FontManager(apiKey, activeFontFamily, options, onChange);
    }, [activeFontFamily, onChange]);
    return <div>FontPicker</div>;
};

export { FontPicker };

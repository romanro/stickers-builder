import React, { FC } from 'react';
import { FontPicker } from '../FontPicker/FontPicker';
import { Font, Options } from '@samuelmeuli/font-manager';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { Color, HEXColor } from '../ColorPicker/ColorPicker.models';
import { StickerFontSettings } from '../StickerPreview/StickerPreview';

type StickerTextSelectorProps = {
    fontSettings: StickerFontSettings;
    onTextChange: (fontSettings: StickerFontSettings) => void;
};

const options: Partial<Options> = {
    families: ['Anton', 'Poppins', 'Roboto'],
    scripts: ['latin'],
};

const colors: Color[] = [
    { hex: '#0D0E11', label: 'Black' },
    { hex: '#E6E9EE', label: 'White' },
    { hex: '#B0000D', label: 'Red' },
    { hex: '#3DA1D2', label: 'Blue' },
];

const StickerTextSelector: FC<StickerTextSelectorProps> = ({ onTextChange, fontSettings }) => {
    const { fontFamily, textColor } = fontSettings;

    const onFontSelection = (f: Font) => {
        const fs = { fontFamily: f.family, textColor };
        onTextChange(fs);
    };

    const onColorSelection = (c: HEXColor) => {
        const fs = { fontFamily, textColor: c };
        onTextChange(fs);
    };

    return (
        <div>
            <div>
                <ColorPicker selectedColor={textColor} colors={colors} onChange={onColorSelection} />
            </div>
            <div>
                <FontPicker activeFontFamily={fontFamily} onChange={onFontSelection} options={options} />
            </div>
        </div>
    );
};

export { StickerTextSelector };

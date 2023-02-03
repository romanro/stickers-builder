import React, { FC, useState } from 'react';
import { FontPicker } from '../FontPicker/FontPicker';
import { Font, Options } from '@samuelmeuli/font-manager';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { Color, HEXColor } from '../ColorPicker/ColorPicker.models';

interface StickerTextSelectorProps {}

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

const StickerTextSelector: FC<StickerTextSelectorProps> = (props) => {
    const [color, setColor] = useState<HEXColor>(colors[2].hex);
    const [fontFamily, setFontFamily] = useState<string>('Poppins');

    const onFontSelection = (f: Font) => {
        setFontFamily(f.family);
    };

    const onColorSelection = (c: HEXColor) => {
        setColor(c);
    };

    return (
        <div>
            <ColorPicker selectedColor={color} colors={colors} onChange={onColorSelection} />
            <FontPicker activeFontFamily={fontFamily} onChange={onFontSelection} options={options} />
        </div>
    );
};

export { StickerTextSelector };

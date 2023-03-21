import React, { FC, } from 'react';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { StickerFontSettings } from '../StickerPreview/StickerPreview';
import { LocalFontPicker } from '../LocalFontPicker/LocalFontPicker';
import { FontSettings } from '../../models/Fonts';
import { colors, fonts } from '../../consts/config.consts';

type StickerTextSelectorProps = {
    text: string;
    fontSettings: StickerFontSettings;
    onTextChange: (fontSettings: StickerFontSettings) => void;
};

// const options: Partial<Options> = {
//     families: ['Anton', 'Poppins', 'Roboto'],
//     scripts: ['latin'],
// };



const StickerTextSelector: FC<StickerTextSelectorProps> = ({ onTextChange, fontSettings, text }) => {
    const { fontFamily, textColor, isCapsOnly = false } = fontSettings;

    // const onFontSelection = (f: Font) => {
    //     const fs = { fontFamily: f.family, textColor };
    //     onTextChange(fs);
    // };



    const onFontSelection = (font: FontSettings) => {
        const { fontFamily, isCapsOnly = false } = font;
        const fs = { fontFamily, isCapsOnly, textColor };
        onTextChange(fs);
    };

    const onColorSelection = (c: HEXColor) => {
        const fs = { fontFamily, textColor: c, isCapsOnly };
        onTextChange(fs);
    };

    return (
        <>
            <ColorPicker selectedColor={textColor} colors={colors} onChange={onColorSelection} />
            <LocalFontPicker text={text} fonts={fonts} activeFontFamily={fontFamily} onChange={onFontSelection} />
        </>
    );
};

export { StickerTextSelector };

import React, { FC } from 'react';
import './StickerPreview.modules.scss';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { InstagramIcon } from './InstagramIcon';

export type StickerFontSettings = {
    fontFamily: string;
    textColor: HEXColor;
};

export type StickerPreviewProps = {
    showIcon?: boolean;
    text?: string;
    fontSettings: StickerFontSettings;
};

const StickerPreview: FC<StickerPreviewProps> = ({ showIcon = true, text, fontSettings }) => {
    const { fontFamily, textColor } = fontSettings;
    return (
        <svg xmlns='http://www.w3.org/2000/svg' width='800' height='80'>
            {showIcon && <InstagramIcon textColor={textColor} />}
            <text
                x={showIcon ? '52' : '0'}
                y='50'
                style={{ fill: textColor, fontFamily, fontWeight: 600, stroke: 'none', fontSize: 50, lineHeight: 0 }}>
                {text}
            </text>
        </svg>
    );
};

export { StickerPreview };

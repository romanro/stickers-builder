import React, { FC } from 'react';
import './StickerPreview.modules.scss';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { SupportedFontFamily } from '../../models/Fonts';
import { SupportedIcon } from './Icons/Icons.models';
import { Icon } from './Icons/Icon';

export type StickerFontSettings = {
    fontFamily: SupportedFontFamily;
    isCapsOnly?: boolean;
    textColor: HEXColor;
};

export type StickerPreviewProps = {
    icon?: SupportedIcon;
    text?: string;
    fontSettings: StickerFontSettings;
};

const StickerPreview: FC<StickerPreviewProps> = ({ text, fontSettings, icon }) => {
    const { fontFamily, textColor } = fontSettings;
    return (
        <div className='sticker-preview' style={{ padding: 5 }}>
            <svg xmlns='http://www.w3.org/2000/svg' width={'100%'} height={45}>
                {icon && <Icon icon={icon} textColor={textColor} />}
                <text
                    x={icon ? '52' : '0'}
                    y='42'
                    style={{ fill: textColor, fontFamily, fontWeight: 600, stroke: 'none', fontSize: 48, lineHeight: 1 }}>
                    {text}
                </text>
            </svg>
        </div>
    );
};

export { StickerPreview };

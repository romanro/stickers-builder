import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import './StickerPreview.modules.scss';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { SupportedFontFamily } from '../../models/Fonts';
import { SupportedIcon } from './Icons/Icons.models';
import { Icon } from './Icons/Icon';
import { StickerSize, StickerSizeId } from '../../models/Sticker';

export type StickerFontSettings = {
    fontFamily: SupportedFontFamily;
    isCapsOnly?: boolean;
    textColor: HEXColor;
};

export type StickerPreviewProps = {
    size: StickerSizeId;
    sizes: StickerSize[];
    icon?: SupportedIcon;
    text?: string;
    fontSettings: StickerFontSettings;
};

const StickerPreview: FC<StickerPreviewProps> = ({ size, sizes, text, fontSettings, icon }) => {
    const { fontFamily, textColor } = fontSettings;

    const [scaleRatio, setScaleRatio] = useState<number>(0.1);

    const containerRef = useRef<HTMLDivElement>(null);

    const selectedSize = useMemo(() => sizes.find(s => s.id === size)
        , [size, sizes])

    useEffect(() => {

        if (containerRef?.current?.offsetWidth) {
            setScaleRatio(containerRef?.current?.offsetWidth / 3000)
        }
    }, [containerRef?.current?.offsetWidth])

    return (
        <div className='preview-container' ref={containerRef}>
            <div className='sticker-preview' style={{
                position: 'absolute',
                transform: `scale(${scaleRatio})`,
                transformOrigin: '0 0',
                height: selectedSize?.height,
                padding: 20
            }}>
                <svg xmlns='http://www.w3.org/2000/svg' width={'100%'} height={selectedSize?.iconSize}>
                    {icon && <Icon size={selectedSize?.iconSize} icon={icon} textColor={textColor} />}
                    <text
                        x={icon && selectedSize ? selectedSize.afterLogoMargin + selectedSize.iconSize : '0'}
                        y='0'
                        transform={`translate(0 ${selectedSize?.fontSize})`}
                        style={{ fill: textColor, fontFamily, fontWeight: 600, stroke: 'none', fontSize: selectedSize?.fontSize, lineHeight: 1 }}>
                        {text}
                    </text>
                </svg>
            </div>
        </div>
    );
};

export { StickerPreview };

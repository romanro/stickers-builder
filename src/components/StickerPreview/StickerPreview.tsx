import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './StickerPreview.modules.scss';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { SupportedFontFamily } from '../../models/Fonts';
import { SupportedIcon } from './Icons/Icons.models';
import { Icon } from './Icons/Icon';
import { StickerSize, StickerSizeId } from '../../models/Sticker';
import { lightOrDark } from '../../utils/color.utils';
import { DEFAULT_PLACEHOLDER } from '../../consts/text.consts';

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


    const isLight = lightOrDark(textColor);

    const calculateScaleRatio = useCallback(() => {
        if (containerRef?.current?.offsetWidth) {
            setScaleRatio(containerRef?.current?.offsetWidth / 3000)
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', calculateScaleRatio);
        calculateScaleRatio();
        return () => window.removeEventListener('resize', calculateScaleRatio);
    }, [])




    return (
        <div className='preview-container' ref={containerRef} style={{ height: (selectedSize?.height || 1) * scaleRatio }}>
            <div className='sticker-preview' style={{
                position: 'absolute',
                transform: `scale(${scaleRatio})`,
                transformOrigin: '0 0',
                height: selectedSize?.height,
                padding: 20,
                backgroundColor: isLight ? 'white' : '#54595f',
                backgroundSize: `${(20 / scaleRatio)}px`
            }}>
                <svg xmlns='http://www.w3.org/2000/svg' width={'100%'} height={selectedSize?.iconSize}>
                    {icon && <Icon size={selectedSize?.iconSize} icon={icon} textColor={textColor} />}
                    <text
                        x={icon && selectedSize ? selectedSize.afterLogoMargin + selectedSize.iconSize : '0'}
                        y={(selectedSize?.fontSize || 12) / 12}
                        height={selectedSize?.fontSize}
                        transform={`translate(0 ${selectedSize?.fontSize})`}
                        style={{ fill: textColor, fontFamily, stroke: 'none', fontSize: selectedSize?.fontSize, lineHeight: 1, fontWeight: 500 }}>
                        {text ? text : DEFAULT_PLACEHOLDER}
                    </text>
                </svg>
            </div>
        </div>
    );
};

export { StickerPreview };

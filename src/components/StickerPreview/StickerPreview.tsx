import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import './StickerPreview.modules.scss';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import { SupportedFontFamily } from '../../models/Fonts';
import { SupportedIcon } from './Icons/Icons.models';
import { Icon } from './Icons/Icon';
import { Dimensions, StickerSize, StickerSizeId } from '../../models/Sticker';
import { DEFAULT_PLACEHOLDER } from '../../consts/text.consts';
import { textCapitalizer } from '../LocalFontPicker/LocalFontPicker.utils';
import { StickerPreviewContainer } from './StickerPreviewContainer';


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

    const [scaleRatio, setScaleRatio] = useState<number>(1);
    const [dimensions, setDetentions] = useState<Dimensions>({ width: 3000, height: 390 });

    const containerRef = useRef<HTMLDivElement>(null);

    const selectedSize = useMemo(() => sizes.find(s => s.id === size)
        , [size, sizes])


    const calculateScaleRatio = useCallback(() => {
        const contWidth = containerRef?.current?.offsetWidth;
        if (contWidth) {
            const width = (contWidth < 601 ? selectedSize?.mobile.width : selectedSize?.desktop.width) || 3000;
            const height = (contWidth < 601 ? selectedSize?.mobile.height : selectedSize?.desktop.height) || 290;
            setDetentions({ width, height });
            setScaleRatio(contWidth / width);
        }
    }, [])

    useEffect(() => {
        window.addEventListener('resize', calculateScaleRatio);
        calculateScaleRatio();
        return () => window.removeEventListener('resize', calculateScaleRatio);
    }, [calculateScaleRatio])


    const displayText = textCapitalizer(text || '', DEFAULT_PLACEHOLDER, fontSettings.isCapsOnly);


    return (
        <div className='preview-container' ref={containerRef} style={{ height: (dimensions.height || 1) * scaleRatio }}>
            <StickerPreviewContainer scaleRatio={scaleRatio} textColor={textColor} dimensions={dimensions}>
                <svg xmlns='http://www.w3.org/2000/svg' width={'100%'} height={selectedSize?.iconSize}>
                    {icon && <Icon size={selectedSize?.iconSize} icon={icon} textColor={textColor} />}
                    <text
                        x={icon && selectedSize ? selectedSize.afterLogoMargin + selectedSize.iconSize : '0'}
                        y={(selectedSize?.fontSize || 12) / 12}
                        height={selectedSize?.fontSize}
                        transform={`translate(0 ${selectedSize?.fontSize})`}
                        style={{ fill: textColor, fontFamily, stroke: 'none', fontSize: selectedSize?.fontSize, lineHeight: 1, fontWeight: 500 }}>
                        {displayText}
                    </text>
                </svg>
            </StickerPreviewContainer>
        </div>
    );
};

export { StickerPreview };

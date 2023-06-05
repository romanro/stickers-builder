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
import { DEFAULT_FONT_SIZE, DEFAULT_HEIGHT, DEFAULT_WIDTH, marginTopFixMapper } from '../../consts/config.consts';
// import { useQuery } from 'react-query';
// import API from '../../api/api';
// import { GetAPIResponse } from '../../api/api.models';


export type StickerFontSettings = {
    fontFamily: SupportedFontFamily;
    isCapsOnly?: boolean;
    textColor: HEXColor;
};

export type StickerPreviewProps = {
    size: StickerSizeId;
    sizes: StickerSize[];
    icon: SupportedIcon;
    text?: string;
    fontSettings: StickerFontSettings;
};

const StickerPreview: FC<StickerPreviewProps> = ({ size, sizes, text, fontSettings, icon }) => {
    const { fontFamily, textColor } = fontSettings;

    // const { data, isError, error } = useQuery('getProducts', async () => await API.get<GetAPIResponse<any[]>>("products/4971", {
    //     per_page: 100,
    // }))

    // console.log(data)

    const [scaleRatio, setScaleRatio] = useState<number>(1);
    const [textScaleRatio, setTextScaleRatio] = useState<number>(1);
    const [dimensions, setDimensions] = useState<Dimensions>({ width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });



    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    const selectedSize = useMemo(() => sizes.find(s => s.id === size)
        , [size, sizes]);

    const [fontSize] = useState<number>(selectedSize?.fontSize || DEFAULT_FONT_SIZE);


    const calculateScaleRatio = useCallback(() => {
        const contWidth = containerRef?.current?.offsetWidth;
        if (contWidth) {
            const width = selectedSize?.size.width || 3000;
            const height = selectedSize?.size.height || 290;
            setDimensions({ width, height });
            setScaleRatio(contWidth / width);
        }
    }, [selectedSize?.size.width, selectedSize?.size.height])

    useEffect(() => {
        window.addEventListener('resize', calculateScaleRatio);
        calculateScaleRatio();
        return () => window.removeEventListener('resize', calculateScaleRatio);
    }, [calculateScaleRatio]);

    useEffect(() => {
        scaleText();
    }, [text, dimensions, selectedSize, fontFamily])

    const scaleText = () => {
        if (selectedSize) {
            const availableText = dimensions.width - selectedSize?.iconSize - selectedSize?.afterLogoMargin - 40;
            const textWidth = textRef?.current?.offsetWidth || 200;
            if (textWidth) {

                if (textWidth > availableText) {
                    setTextScaleRatio(availableText / textWidth)
                } else {
                    setTextScaleRatio(1)
                }

            }
        }
    }


    const displayText = textCapitalizer(text || '', DEFAULT_PLACEHOLDER, fontSettings.isCapsOnly);


    return (
        <div className='preview-container' ref={containerRef} style={{ height: (dimensions.height || 1) * scaleRatio }}>
            <StickerPreviewContainer scaleRatio={scaleRatio} textColor={textColor} dimensions={dimensions}>
                <div className="preview-bg" style={{ width: '100%', height: dimensions.height - 20 }} >
                    {icon && <Icon size={selectedSize?.iconSize} icon={icon} textColor={textColor} />}
                    <div
                        id='preview-text'
                        //x={icon && selectedSize ? selectedSize.afterLogoMargin + selectedSize.iconSize : '0'}
                        // y={fontSize - 10}
                        style={{
                            color: textColor,
                            fontFamily,
                            stroke: 'none',
                            fontSize, fontWeight: 500,
                            transformOrigin: '0 50%',
                            transform: `scale(${textScaleRatio})`,
                            marginTop: marginTopFixMapper[fontFamily],
                            marginLeft: icon && selectedSize ? selectedSize.afterLogoMargin : 0
                        }}
                        ref={textRef}
                    >
                        {displayText}
                    </div>
                </div>
            </StickerPreviewContainer>
        </div>
    );
};

export { StickerPreview };

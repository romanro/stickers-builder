import React, { FC, useEffect, useState, } from 'react';
import { ColorPicker } from '../ColorPicker/ColorPicker';
import { Color, HEXColor, ServerColor } from '../ColorPicker/ColorPicker.models';
import { StickerFontSettings } from '../StickerPreview/StickerPreview';
import { LocalFontPicker } from '../LocalFontPicker/LocalFontPicker';
import { FontSettings } from '../../models/Fonts';
import { defaultColors, fonts } from '../../consts/config.consts';
import { useQuery } from 'react-query';
import API from '../../api/api';
import { GetAPIResponse } from '../../api/api.models';
import { Product } from '../../models/Product';

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

    const [colors, setColors] = useState<Color[]>([])

    const { fontFamily, textColor, isCapsOnly = false } = fontSettings;

    // const onFontSelection = (f: Font) => {
    //     const fs = { fontFamily: f.family, textColor };
    //     onTextChange(fs);
    // };

    const { data, isError, error } = useQuery('getPColors', async () => await API.get<GetAPIResponse<ServerColor[]>>("products/attributes/4/terms", {
        per_page: 100,
    }));

    const { data: product } = useQuery('getProduct', async () => await API.get<GetAPIResponse<Product>>("products/5458", {}));



    useEffect(() => {
        if (data?.data && product?.data) {
            const prodColors = product.data?.attributes?.find((a) => a.id === 4)?.options;

            if (prodColors) {
                const loadedColors: Color[] = [];
                prodColors.forEach(c => {
                    const color = data?.data.find(d => d.name === c);

                    if (color) {
                        loadedColors.push({ hex: color.description, label: color.name })
                    }
                })
                setColors(loadedColors);
            }
        }

    }, [data, product])

    useEffect(() => {
        if (isError) {
            console.error(error);
            setColors(defaultColors);
        }
    }, [isError, error]);



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

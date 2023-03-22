import React, { FC, ReactNode, useMemo } from 'react';
import { Dimensions } from '../../models/Sticker';
import { lightOrDark } from '../../utils/color.utils';
import { HEXColor } from '../ColorPicker/ColorPicker.models';

interface StickerPreviewContainerProps {
    children: ReactNode;
    scaleRatio: number;
    textColor: HEXColor;
    dimensions: Dimensions;
}

export const StickerPreviewContainer: FC<StickerPreviewContainerProps> = ({ children, scaleRatio, textColor, dimensions }) => {

    const isLight = useMemo(() => lightOrDark(textColor), [textColor]);

    const { height, width } = dimensions;

    return <div className='sticker-preview' style={{
        transform: `scale(${scaleRatio})`,
        height,
        width,
        backgroundColor: isLight ? 'white' : '#54595f',
        backgroundSize: `${(30 / scaleRatio)}px`
    }}>{children}</div>;


};



import React, { FC } from 'react';
import './StickerSizePicker.modules.scss';
import { StickerSize, StickerSizeId } from '../../models/Sticker';

type StickerSizePickerProps = {
    size: StickerSizeId;
    sizes: StickerSize[];
    onSizeSelected: (id: StickerSizeId) => void;
};

export const StickerSizePicker: FC<StickerSizePickerProps> = ({ size, sizes, onSizeSelected }) => {
    return <>{sizes.map((s) => {
        const { label, id } = s;
        return <button className={`size-button${id === size ? ' selected' : ''}`} onClick={() => onSizeSelected(id)}>{label}</button>
    })}
    </>;
};



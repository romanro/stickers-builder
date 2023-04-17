export type StickerSizeId = 'mini' | 'standard';

export type Dimensions = {
    height: number;
    width: number;
}


export type StickerSize = {
    id: StickerSizeId;
    label: string;
    iconSize: number;
    afterLogoMargin: number;
    fontSize: number;
    size: Dimensions;
}


export type StickerSizeId = 'mini' | 'standard'

export type StickerSize = {
    id: StickerSizeId;
    label: string;
    iconSize: number;
    afterLogoMargin: number;
    fontSize: number;
    height: number;
}
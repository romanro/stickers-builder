import { SupportedIcon } from '../components/StickerPreview/Icons/Icons.models';
import { StickerFontSettings } from '../components/StickerPreview/StickerPreview';
import { SupportedFontFamily } from '../models/Fonts';
import { StickerSizeId } from '../models/Sticker';

export const DEFAULT_TEXT = 'Your Text Here';
export const DEFAULT_FONT_FAMILY: SupportedFontFamily = 'applied_sans';
export const DEFAULT_ICON: SupportedIcon = 'instagram';
export const DEFAULT_FONT_SETTINGS: StickerFontSettings = {
    fontFamily: DEFAULT_FONT_FAMILY,
    textColor: '#B0000D',
}
export const DEFAULT_SIZE: StickerSizeId = 'standard'
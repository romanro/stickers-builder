import { SupportedIcon } from '../components/StickerPreview/Icons/Icons.models';
import { StickerFontSettings } from '../components/StickerPreview/StickerPreview';
import { SupportedFontFamily } from '../models/Fonts';
import { StickerSizeId } from '../models/Sticker';

export const DEFAULT_TEXT = '';
export const DEFAULT_FONT_FAMILY: SupportedFontFamily = 'applied_sans';
export const DEFAULT_ICON: SupportedIcon = 'instagram';
export const DEFAULT_FONT_SETTINGS: StickerFontSettings = {
    fontFamily: DEFAULT_FONT_FAMILY,
    textColor: '#b0000d',
}
export const DEFAULT_SIZE: StickerSizeId = 'standard';
export const DEFAULT_PLACEHOLDER = 'Your text';
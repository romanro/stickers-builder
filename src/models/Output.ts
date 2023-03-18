import { SupportedIcon } from './../components/StickerPreview/Icons/Icons.models';
import { StickerFontSettings } from '../components/StickerPreview/StickerPreview';

export type Output = {
    fontSettings: StickerFontSettings;
    text: string;
    icon: SupportedIcon | undefined;
}
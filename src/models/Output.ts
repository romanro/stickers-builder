import { SupportedIcon } from './../components/StickerPreview/Icons/Icons.models';
import { StickerFontSettings } from '../components/StickerPreview/StickerPreview';

export type Output = {
    text: string;
    icon: SupportedIcon | undefined;
} & StickerFontSettings
import { StickerSize } from './../models/Sticker';
import { Color } from '../components/ColorPicker/ColorPicker.models';
import { SupportedIcon } from '../components/StickerPreview/Icons/Icons.models';
import { FontSettings, SupportedFontFamily } from '../models/Fonts';

export const icons: SupportedIcon[] = ['instagram', 'facebook'];


export const defaultColors: Color[] = [
    { label: "אדום", hex: "#b0000d" },
    { label: "ורוד", hex: "#ed84b6" },
    { label: "ירוק מט", hex: "#c9dd60" },
    { label: "כסוף", hex: "#C3C3C3" },
    { label: "לבן", hex: "#FFFFFF" },
    { label: "נחושת מט", hex: "#8c7234" },
    { label: "צהוב", hex: "#fec500" },
    { label: "שחור", hex: "#0d0e11" },
    { label: "שחור מט", hex: "#292a2c" },
    { label: "תכלת", hex: "#3da1d2" },
    { label: "כחול רויאל", hex: "#1114EB" },
    { label: "כתום", hex: "#F15719" }
]

export const fonts: FontSettings[] = [
    {
        displayName: 'Font 1',
        charsets: ['latin'],
        fontFamily: 'applied_sans'
    },
    {
        displayName: 'Font 2',
        charsets: ['latin'],
        fontFamily: 'hemi_head'
    },
    {
        displayName: 'Font 3',
        charsets: ['latin'],
        fontFamily: 'impact',
        isCapsOnly: true
    },
    {
        displayName: 'Font 4',
        charsets: ['latin'],
        fontFamily: 'poppins',
    }

]

export const marginTopFixMapper: Record<SupportedFontFamily, number> = {
    'poppins': 38,
    'applied_sans': 0,
    'hemi_head': 0,
    'impact': 0
}

export const DEFAULT_HEIGHT = 261;
export const DEFAULT_WIDTH = 1018;
export const DEFAULT_FONT_SIZE = 150;

export const sizes: StickerSize[] = [
    {
        id: 'mini',
        label: 'Mini',
        iconSize: 152,
        afterLogoMargin: 10,
        fontSize: 150,
        size: {
            height: 280,
            width: 3000,
        },

    },
    {
        id: 'standard',
        label: 'Standard',
        iconSize: 152,
        afterLogoMargin: 10,
        fontSize: DEFAULT_FONT_SIZE,
        size: {
            height: DEFAULT_HEIGHT,
            width: DEFAULT_WIDTH,
        },

    },


];
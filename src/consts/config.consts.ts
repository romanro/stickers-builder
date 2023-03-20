import { StickerSize } from './../models/Sticker';
import { Color } from '../components/ColorPicker/ColorPicker.models';
import { SupportedIcon } from '../components/StickerPreview/Icons/Icons.models';
import { FontSettings } from '../models/Fonts';

export const icons: SupportedIcon[] = ['instagram', 'facebook'];

export const colors: Color[] = [
    { hex: '#0D0E11', label: 'שחור' },
    { hex: '#FFFFFF', label: 'לבן' },
    { hex: '#B0000D', label: 'אדום' },
    { hex: '#3DA1D2', label: 'כחול' },
];

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

export const sizes: StickerSize[] = [
    {
        id: 'mini',
        label: 'Mini',
        iconSize: 250,
        afterLogoMargin: 30,
        fontSize: 200,
        desktop: {
            height: 280,
            width: 3000,
        },
        mobile: {
            height: 280,
            width: 1900,
        }

    },
    {
        id: 'standard',
        label: 'Standard',
        iconSize: 350,
        afterLogoMargin: 40,
        fontSize: 250,
        desktop: {
            height: 390,
            width: 3000,
        },
        mobile: {
            height: 390,
            width: 1900,
        }
    },


];
import { Color } from '../components/ColorPicker/ColorPicker.models';
import { SupportedIcon } from '../components/StickerPreview/Icons/Icons.models';
import { FontSettings } from '../models/Fonts';

export const icons: SupportedIcon[] = ['instagram', 'facebook'];

export const colors: Color[] = [
    { hex: '#0D0E11', label: 'Black' },
    { hex: '#E6E9EE', label: 'White' },
    { hex: '#B0000D', label: 'Red' },
    { hex: '#3DA1D2', label: 'Blue' },
];

export const fonts: FontSettings[] = [
    {
        displayName: 'Aplied Sans',
        charsets: ['latin'],
        fontFamily: 'applied_sans'
    },
    {
        displayName: 'Hemi Head',
        charsets: ['latin'],
        fontFamily: 'hemi_head'
    },
    {
        displayName: 'IMPACT',
        charsets: ['latin'],
        fontFamily: 'impact',
        isCapsOnly: true
    },
    {
        displayName: 'Poppins',
        charsets: ['latin'],
        fontFamily: 'poppins',
    }

]
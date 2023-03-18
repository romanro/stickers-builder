import { CSSProperties } from 'react';

export type SupportedFontFamily = 'hemi_head' | 'impact' | 'poppins' | 'applied_sans';
export type SupportedCharSet = 'latin' | 'hebrew';

export type FontSettings = {
    displayName: string;
    charsets: SupportedCharSet[];
    fontFamily: SupportedFontFamily;
    fontWeight?: CSSProperties['fontWeight'];
    fontStyle?: CSSProperties['fontStyle'];
    isCapsOnly?: boolean;
}
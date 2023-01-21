/**
 * Return the fontId based on the provided font family
 */
export const getFontId = (fontFamily: string): string => {
    return fontFamily.replace(/\s+/g, '-').toLowerCase();
};

import { Category, Font, Script, SortOption, Variant } from '@samuelmeuli/font-manager';

export type LoadingStatus = 'loading' | 'finished' | 'error';

export type FontPickerProps = {
    // Optional props
    activeFontFamily?: string;
    onChange?: (font: Font) => void;
    pickerId?: string;
    families?: string[];
    categories?: Category[];
    scripts?: Script[];
    variants?: Variant[];
    filter?: (font: Font) => boolean;
    limit?: number;
    sort?: SortOption;
};

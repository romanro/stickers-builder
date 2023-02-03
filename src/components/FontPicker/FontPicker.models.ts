import { Font, Options } from '@samuelmeuli/font-manager';

export type LoadingStatus = 'loading' | 'finished' | 'error';

export type FontPickerProps = {
    // Optional props
    activeFontFamily?: string;
    options?: Partial<Options>;
    onChange?: (font: Font) => void;
};

export type FontsListProps = {
    fonts?: Font[];
    activeFontFamily?: string;
    selectorSuffix?: string;
    loadingStatus?: LoadingStatus;
    onSelection?: FontPickerProps['onChange'];
};

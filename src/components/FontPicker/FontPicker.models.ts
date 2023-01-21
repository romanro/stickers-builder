import { Font, Options } from '@samuelmeuli/font-manager';

export type LoadingStatus = 'loading' | 'finished' | 'error';

export type FontPickerProps = {
    // Optional props
    activeFontFamily?: string;
    options?: Partial<Options>;
    onChange?: (font: Font) => void;
};

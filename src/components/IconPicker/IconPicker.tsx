import React, { FC } from 'react';
import { icons } from '../../consts/config.consts';
import { Icon } from '../StickerPreview/Icons/Icon';
import { HEXColor } from '../ColorPicker/ColorPicker.models';
import './IconPicker.modules.scss';
import { SupportedIcon } from '../StickerPreview/Icons/Icons.models';

interface IconPickerProps {
    selectedIcon: SupportedIcon;
    textColor: HEXColor;
    selectIcon: (icon: SupportedIcon) => void;
}

export const IconPicker: FC<IconPickerProps> = ({ textColor, selectedIcon, selectIcon }) => {

    if (icons.length === 0) {
        return null;
    }

    return <div className="control">
        <label className='label'>אינסטגרם</label>
        {icons.map(icon => <button className={`icon-button${icon === selectedIcon ? ' selected' : ''}`} key={icon} onClick={() => selectIcon(icon)}>
            <Icon icon={icon} textColor={textColor} />
        </button>)}
        <button className={`icon-button${selectedIcon === undefined ? ' selected' : ''}`} onClick={() => selectIcon('none')}>No Icon</button>
    </div>;
};


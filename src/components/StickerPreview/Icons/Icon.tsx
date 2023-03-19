import React, { FC, ReactNode } from 'react';
import { IconsProps, SupportedIcon } from './Icons.models';
import { InstagramIcon } from './InstagramIcon';
import { FacebookIcon } from './FacebookIcon';

export type IconProps = {
    icon: SupportedIcon;
} & IconsProps


export const Icon: FC<IconProps> = ({ icon, textColor, size = 50 }) => {

    if (!icon) {
        return null;
    }

    const getIcon: Record<SupportedIcon, ReactNode> = {
        'instagram': <InstagramIcon textColor={textColor} size={size} />,
        'facebook': <FacebookIcon textColor={textColor} size={size} />
    }

    return (
        < >{getIcon[icon]}</>
    );
}

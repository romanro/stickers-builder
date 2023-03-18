import React, { FC, ReactNode } from 'react';
import { IconsProps, SupportedIcon } from './Icons.models';
import { InstagramIcon } from './InstagramIcon';
import { FacebookIcon } from './FacebookIcon';

export type IconProps = {
    icon: SupportedIcon
} & IconsProps



export const Icon: FC<IconProps> = ({ icon, textColor }) => {

    if (!icon) {
        return null;
    }

    const getIcon: Record<SupportedIcon, ReactNode> = {
        'instagram': <InstagramIcon textColor={textColor} />,
        'facebook': <FacebookIcon textColor={textColor} />
    }

    return (
        < >{getIcon[icon]}</>
    );
}

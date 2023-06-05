import React, { FC } from 'react';
import styles from './AddToCart.module.scss';

export type LoadingButtonProps = {
    label: string,
    isDisabled: boolean,
    isLoading: boolean,
    onClick: () => void
}

export const LoadingButton: FC<LoadingButtonProps> = ({ label, isDisabled, isLoading, onClick }) => {

    return (
        <button className={`${styles.addButton} ${isDisabled ? styles.disabled : ''}`} disabled={isDisabled} onClick={onClick}>
            {isLoading && <div className={styles.ldsDualRing} />}
            <span>{label}</span>
        </button>
    );
}

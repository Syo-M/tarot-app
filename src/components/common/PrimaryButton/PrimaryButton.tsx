import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './PrimaryButton.module.css';

type PrimaryButtonVariant = 'primary' | 'secondary' | 'ghost';

interface PrimaryButtonProps extends PropsWithChildren, ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: PrimaryButtonVariant;
  fullWidth?: boolean;
}

export const PrimaryButton = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...buttonProps
}: PrimaryButtonProps) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${fullWidth ? styles.fullWidth : ''} ${className}`.trim()}
      {...buttonProps}
    >
      {children}
    </button>
  );
};

import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';
import styles from './PrimaryButton.module.css';

type Variant = 'primary' | 'secondary' | 'ghost';

interface PrimaryButtonProps
  extends PropsWithChildren,
    ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  fullWidth?: boolean;
}

export const PrimaryButton = ({
  children,
  variant = 'primary',
  fullWidth = false,
  className = '',
  ...props
}: PrimaryButtonProps) => {
  return (
    <button
      className={[
        styles.button,
        styles[variant],
        fullWidth ? styles.fullWidth : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </button>
  );
};

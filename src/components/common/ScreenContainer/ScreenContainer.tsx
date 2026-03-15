import type { PropsWithChildren, ReactNode } from 'react';
import styles from './ScreenContainer.module.css';

interface ScreenContainerProps extends PropsWithChildren {
  title: string;
  subtitle?: string;
  footer?: ReactNode;
}

export const ScreenContainer = ({ title, subtitle, footer, children }: ScreenContainerProps) => {
  return (
    <main className={styles.screen}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <p className={styles.eyebrow}>Moonlit Tarot</p>
          <h1 className={styles.title}>{title}</h1>
          {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
        </header>
        <section className={styles.content}>{children}</section>
        {footer ? <footer className={styles.footer}>{footer}</footer> : null}
      </div>
    </main>
  );
};

import type { PropsWithChildren } from 'react';
import styles from './ScreenContainer.module.css';

interface ScreenContainerProps extends PropsWithChildren {
  title?: string;
  description?: string;
}

export const ScreenContainer = ({
  title,
  description,
  children,
}: ScreenContainerProps) => {
  return (
    <main className={styles.shell}>
      <section className={styles.card}>
        {(title || description) && (
          <header className={styles.header}>
            {title ? <h1 className={styles.title}>{title}</h1> : null}
            {description ? <p className={styles.description}>{description}</p> : null}
          </header>
        )}
        {children}
      </section>
    </main>
  );
};

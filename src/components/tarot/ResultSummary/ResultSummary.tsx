import type { ResultMode } from '../../../types/tarot';
import styles from './ResultSummary.module.css';

interface ResultSummaryProps {
  summary: string;
  resultMode: ResultMode;
}

export const ResultSummary = ({ summary, resultMode }: ResultSummaryProps) => {
  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <span className={styles.badge}>{resultMode === 'summary' ? 'シンプル表示' : '総合結果'}</span>
        <h2>今回のリーディング</h2>
      </div>
      <p className={styles.text}>{summary}</p>
    </section>
  );
};

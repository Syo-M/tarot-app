import { useMemo, useState } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import styles from './AiAssistPanel.module.css';

interface AiAssistPanelProps {
  prompt: string;
}

export const AiAssistPanel = ({ prompt }: AiAssistPanelProps) => {
  const [copied, setCopied] = useState(false);

  const encodedPrompt = useMemo(() => encodeURIComponent(prompt), [prompt]);
  const chatgptUrl = useMemo(() => `https://chatgpt.com/?q=${encodedPrompt}`, [encodedPrompt]);
  const geminiUrl = useMemo(() => 'https://gemini.google.com/app', []);

  const handleCopy = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(prompt);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>AIに相談する</h2>
        <p>プロンプト本文は表示せず、そのままコピーや外部AIへの移動ができるようにしています。</p>
      </div>

      <div className={styles.actions}>
        <PrimaryButton type="button" onClick={handleCopy}>
          {copied ? 'コピーしました' : 'プロンプトをコピー'}
        </PrimaryButton>
        <a className={styles.linkButton} href={chatgptUrl} target="_blank" rel="noreferrer">
          ChatGPTで相談する
        </a>
        <a className={styles.linkButtonSecondary} href={geminiUrl} target="_blank" rel="noreferrer">
          Geminiで相談する
        </a>
      </div>

      <ul className={styles.notes}>
        <li>ChatGPT は入力済みURLとして動く場合があります。</li>
        <li>Gemini はコピー後の貼り付け利用を想定しています。</li>
      </ul>
    </section>
  );
};

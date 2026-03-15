import { useMemo, useState } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import styles from './AiAssistPanel.module.css';

interface AiAssistPanelProps {
  prompt: string;
  question: string;
}

export const AiAssistPanel = ({ prompt, question }: AiAssistPanelProps) => {
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

  const handleGemini = async (): Promise<void> => {
    await handleCopy();
    window.open(geminiUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className={styles.panel}>
      <div className={styles.header}>
        <h2>AIに相談する</h2>
        <p>
          {question.trim() ? `「${question.trim()}」` : '今回の結果'} をそのまま相談しやすいよう、コピーと外部AIへの導線だけを残しています。
        </p>
      </div>

      <div className={styles.actions}>
        <PrimaryButton type="button" onClick={handleCopy}>
          {copied ? 'コピーしました' : 'プロンプトをコピー'}
        </PrimaryButton>
        <a className={styles.linkButton} href={chatgptUrl} target="_blank" rel="noreferrer" onClick={handleCopy}>
          ChatGPTで相談する
        </a>
        <button className={styles.linkButtonSecondary} type="button" onClick={handleGemini}>
          Geminiで相談する
        </button>
      </div>

      <p className={styles.note}>
        ChatGPTは入力済みURLが反映される場合があります。Geminiは安定した事前入力リンクがないため、コピー後に開く動線にしています。
      </p>
    </section>
  );
};

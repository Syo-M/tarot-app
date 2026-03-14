import { useMemo, useState } from 'react';
import { DECKS, SPREADS } from '../../../constants/spreads';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import type { DrawnCard, ReadingOptions } from '../../../types/tarot';
import { buildAiPromptMarkdown } from '../../../utils/promptBuilder';
import styles from './AiPromptPanel.module.css';

interface AiPromptPanelProps {
    options: ReadingOptions;
    drawnCards: DrawnCard[];
}

const CHATGPT_URL = 'https://chatgpt.com/';
const GEMINI_URL = 'https://gemini.google.com/';

export const AiPromptPanel = ({ options, drawnCards }: AiPromptPanelProps) => {
    const [copied, setCopied] = useState(false);

    const markdown = useMemo(() => buildAiPromptMarkdown(options, drawnCards), [options, drawnCards]);

    const spreadName = SPREADS.find((item) => item.key === options.spreadType)?.name;
    const deckName = DECKS.find((item) => item.key === options.deckType)?.name;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(markdown);
            setCopied(true);
            window.setTimeout(() => setCopied(false), 1800);
        } catch (error) {
            console.error('Failed to copy markdown prompt.', error);
        }
    };

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <div>
                    <p className={styles.eyebrow}>AI Prompt</p>
                    <h2>総合鑑定用の Markdown をコピー</h2>
                </div>
                <p className={styles.note}>
                    {spreadName} / {deckName}
                </p>
            </div>

            <p className={styles.description}>
                このテキストをコピーして、ChatGPT や Gemini にそのまま貼り付けると、
                引いたカードの組み合わせをもとに総合評価を依頼できます。
            </p>

            <textarea className={styles.textarea} value={markdown} readOnly />

            <div className={styles.actions}>
                <PrimaryButton onClick={handleCopy}>{copied ? 'コピーしました' : 'Markdownをコピー'}</PrimaryButton>
                <a className={styles.linkButton} href={CHATGPT_URL} target="_blank" rel="noreferrer">
                    ChatGPTを開く
                </a>
                <a className={styles.linkButton} href={GEMINI_URL} target="_blank" rel="noreferrer">
                    Geminiを開く
                </a>
            </div>
        </section>
    );
};

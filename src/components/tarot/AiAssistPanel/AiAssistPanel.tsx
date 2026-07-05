import { useEffect, useState } from 'react';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import styles from './AiAssistPanel.module.css';

interface AiAssistPanelProps {
    prompt: string;
}

const CHATGPT_BASE_URL = 'https://chatgpt.com/';

// URL は new URL + searchParams で組み立てる（文字列連結による URL 構築を避ける）
const buildChatGptUrl = (prompt: string): string => {
    const url = new URL(CHATGPT_BASE_URL);
    url.searchParams.set('q', prompt);
    return url.toString();
};

type CopyStatus = 'idle' | 'copied' | 'failed';

const copyStatusMessageMap: Record<CopyStatus, string> = {
    idle: '',
    copied: 'プロンプトをコピーしました。',
    failed: 'コピーに失敗しました。プロンプトを手動で選択してコピーしてください。',
};

export const AiAssistPanel = ({ prompt }: AiAssistPanelProps) => {
    const [copyStatus, setCopyStatus] = useState<CopyStatus>('idle');

    // 通知は数秒後に自動で消す（タイマーとの同期）
    useEffect(() => {
        if (copyStatus === 'idle') {
            return;
        }

        const timerId = window.setTimeout(() => {
            setCopyStatus('idle');
        }, 4000);

        return () => {
            window.clearTimeout(timerId);
        };
    }, [copyStatus]);

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            setCopyStatus('copied');
        } catch (error) {
            console.error(error);
            setCopyStatus('failed');
        }
    };

    const chatGptUrl = buildChatGptUrl(prompt);

    // ケルト十字など長大なプロンプトは URL で渡しきれないことがある
    const isLongPrompt = chatGptUrl.length > 6000;

    return (
        <section className={styles.panel}>
            <div className={styles.header}>
                <h2 className={styles.title}>AIで相談する</h2>
                <p className={styles.description}>
                    ChatGPT以外の生成AIで占う場合は「プロンプトをコピー」ボタンを押して、使用したい生成AIサービスにコピーしたプロンプトを貼り付けて使用してください。
                    <br />
                    <br />
                    「Chat GPTで相談する」ボタンを押せば、プロンプトが入力された状態でChat GPTを開くことができます。
                </p>
            </div>

            <div className={styles.buttonRow}>
                <PrimaryButton onClick={() => void handleCopyPrompt()}>プロンプトをコピー</PrimaryButton>
                <a className={styles.linkButton} href={chatGptUrl} target="_blank" rel="noreferrer">
                    ChatGPTで相談する
                </a>
            </div>

            {isLongPrompt ? (
                <p className={styles.note}>
                    プロンプトが長いため、リンクから開けない場合は「プロンプトをコピー」で貼り付けてご利用ください。
                </p>
            ) : null}

            {/* コピー結果をスクリーンリーダーにも通知する（aria-live: 常時 DOM に存在） */}
            <p className={styles.copyStatus} role="status">
                {copyStatusMessageMap[copyStatus]}
            </p>
        </section>
    );
};

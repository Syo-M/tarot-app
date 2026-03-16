import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import styles from './AiAssistPanel.module.css';

interface AiAssistPanelProps {
    prompt: string;
}

const CHATGPT_BASE_URL = 'https://chatgpt.com/';

export const AiAssistPanel = ({ prompt }: AiAssistPanelProps) => {
    const encodedPrompt = encodeURIComponent(prompt);
    const chatgptUrl = `${CHATGPT_BASE_URL}?q=${encodedPrompt}`;

    const handleCopyPrompt = async () => {
        try {
            await navigator.clipboard.writeText(prompt);
            window.alert('プロンプトをコピーしました。');
        } catch (error) {
            console.error(error);
            window.alert('コピーに失敗しました。');
        }
    };

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

            <div className={styles.buttonRow} style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <PrimaryButton onClick={handleCopyPrompt}>プロンプトをコピー</PrimaryButton>
                <a className={styles.linkButton} href={chatgptUrl} target="_blank" rel="noreferrer">
                    ChatGPTで相談する
                </a>
            </div>
        </section>
    );
};

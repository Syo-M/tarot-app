import type { Preview } from '@storybook/react-vite';

// アプリと同じフォント・デザイントークン・グローバルスタイルでレンダリングする
import '@fontsource-variable/noto-serif-jp';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import '../src/styles/tokens.css';
import '../src/styles/globals.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // serious/critical の violation はテスト失敗として扱う（Playwright axe ゲートと同じ閾値）
      test: 'error',
    },
  },
};

export default preview;

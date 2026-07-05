import React from 'react';
import ReactDOM from 'react-dom/client';
// セルフホストのセリフフォント（woff2 + unicode-range サブセット + font-display: swap）
// 日本語見出し/本文は可変ウェイトの Noto Serif JP、英字は Cormorant Garamond。
import '@fontsource-variable/noto-serif-jp';
import '@fontsource/cormorant-garamond/500.css';
import '@fontsource/cormorant-garamond/600.css';
import { App } from './App';
import './styles/tokens.css';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);

import type { DeckDefinition, SpreadDefinition } from '../types/tarot';

export const SPREADS: SpreadDefinition[] = [
  {
    key: 'single',
    name: '1枚引き',
    description: '今の流れや今日のメッセージをシンプルに見るスプレッドです。',
    drawCount: 1,
    positions: [
      { key: 'single', label: 'メッセージ', hint: '今のあなたに必要な示唆' },
    ],
  },
  {
    key: 'two',
    name: '2枚引き',
    description: '選択肢Aと選択肢Bの比較や、二面性を見たい時に向いています。',
    drawCount: 2,
    positions: [
      { key: 'option-a', label: '選択肢A', hint: 'Aを選んだ場合の流れ' },
      { key: 'option-b', label: '選択肢B', hint: 'Bを選んだ場合の流れ' },
    ],
  },
  {
    key: 'three',
    name: '3枚引き',
    description: '過去・現在・未来の流れをなめらかに見通せる定番スプレッドです。',
    drawCount: 3,
    positions: [
      { key: 'past', label: '過去', hint: '背景や土台になった流れ' },
      { key: 'present', label: '現在', hint: 'いま直面しているテーマ' },
      { key: 'future', label: '未来', hint: 'この先に現れやすい展開' },
    ],
  },
  {
    key: 'four',
    name: '4枚引き',
    description: '状況整理をしながら、対策まで見たい時に扱いやすいスプレッドです。',
    drawCount: 4,
    positions: [
      { key: 'situation', label: '現状', hint: '今の状況そのもの' },
      { key: 'challenge', label: '課題', hint: '引っかかりや障害' },
      { key: 'advice', label: '対策', hint: '動き方や整え方のヒント' },
      { key: 'outcome', label: '結果', hint: 'この先の着地点' },
    ],
  },
  {
    key: 'celtic-cross',
    name: 'ケルト十字',
    description: '背景・障害・周囲・最終結果まで多面的に読める本格派スプレッドです。',
    drawCount: 10,
    positions: [
      { key: 'situation', label: '現状', hint: 'いま中心にあるテーマ' },
      { key: 'challenge', label: '障害', hint: '交差している課題' },
      { key: 'foundation', label: '土台', hint: '無意識や根底にあるもの' },
      { key: 'recent-past', label: '過去', hint: '最近までの流れ' },
      { key: 'present', label: '顕在意識', hint: '本人が意識していること' },
      { key: 'near-future', label: '近未来', hint: 'まもなく現れやすい流れ' },
      { key: 'self', label: '本人', hint: 'あなたの立場や姿勢' },
      { key: 'environment', label: '周囲', hint: '環境や他者の影響' },
      { key: 'hopes-fears', label: '希望と不安', hint: '願望と恐れの混在' },
      { key: 'final-outcome', label: '最終結果', hint: '全体を通した結末' },
    ],
  },
];

export const DECKS: DeckDefinition[] = [
  {
    key: 'major',
    name: '大アルカナのみ',
    description: '人生の転機や大きなテーマを読み取りやすい構成です。',
  },
  {
    key: 'minor',
    name: '小アルカナのみ',
    description: '日常の感情や実務的な動きなど、細かな流れを見やすい構成です。',
  },
  {
    key: 'mixed',
    name: '複合（全78枚）',
    description: '大きな転機と日常の流れを合わせて読みやすい標準構成です。',
  },
];

import type { CardOrientation, CardPosition } from '../types/tarot';

/**
 * 向き・ポジションの日本語ラベルの単一情報源。
 * 画面表示と AI プロンプトの両方がここを参照する（表記の分裂を防ぐ）。
 */
export const orientationLabelMap: Record<CardOrientation, string> = {
    upright: '正位置',
    reversed: '逆位置',
};

export const positionLabelMap: Record<CardPosition, string> = {
    single: '今回のテーマ',
    first: '1枚目',
    second: '2枚目',
    third: '3枚目',
    fourth: '4枚目',
    past: '過去',
    present: '現在',
    future: 'これから',
    situation: '現状',
    challenge: '障害',
    conscious: '顕在意識',
    subconscious: '潜在意識',
    pastFoundation: '過去の土台',
    nearFuture: '近未来',
    self: '本人',
    environment: '周囲',
    hopesFears: '希望と不安',
    outcome: '最終結果',
};

export const getOrientationLabel = (orientation: CardOrientation): string =>
    orientationLabelMap[orientation];

export const getPositionLabel = (position: CardPosition): string => positionLabelMap[position];

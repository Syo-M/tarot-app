export type SpreadType = 'single' | 'two' | 'three' | 'four' | 'celtic-cross';
export type DeckType = 'major' | 'minor' | 'mixed';
export type Suit = 'wands' | 'cups' | 'swords' | 'pentacles' | 'major';
export type ArcanaType = 'major' | 'minor';
export type CardOrientation = 'upright' | 'reversed';
export type AppScreen = 'home' | 'shuffle' | 'result';

export type CardPosition =
  | 'single'
  | 'option-a'
  | 'option-b'
  | 'past'
  | 'present'
  | 'future'
  | 'situation'
  | 'challenge'
  | 'advice'
  | 'outcome'
  | 'self'
  | 'environment'
  | 'hopes-fears'
  | 'final-outcome'
  | 'foundation'
  | 'recent-past'
  | 'near-future';

export interface TarotCard {
  id: string;
  arcana: ArcanaType;
  suit: Suit;
  rank: string;
  number: number;
  nameJa: string;
  nameEn: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
}

export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: CardPosition;
  label: string;
}

export interface ReadingOptions {
  spreadType: SpreadType;
  deckType: DeckType;
  question: string;
}

export interface ReadingState {
  screen: AppScreen;
  spreadType: SpreadType;
  deckType: DeckType;
  question: string;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
}

export interface SpreadDefinition {
  key: SpreadType;
  name: string;
  description: string;
  drawCount: number;
  positions: Array<{
    key: CardPosition;
    label: string;
    hint: string;
  }>;
}

export interface DeckDefinition {
  key: DeckType;
  name: string;
  description: string;
}

export interface AiPromptPayload {
  question: string;
  spreadName: string;
  deckName: string;
  cards: Array<{
    position: string;
    nameJa: string;
    nameEn: string;
    orientation: string;
    keywords: string[];
    meaning: string;
  }>;
}

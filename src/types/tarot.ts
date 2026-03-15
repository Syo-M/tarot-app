export type SpreadType = 'single' | 'two' | 'three' | 'four' | 'celticCross';
export type CardOrientation = 'upright' | 'reversed';
export type AppScreen = 'home' | 'shuffle' | 'result';
export type ResultMode = 'full' | 'summary';
export type DeckMode = 'major' | 'minor' | 'mixed';
export type ArcanaType = 'major' | 'minor';
export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles';
export type CardPosition =
  | 'single'
  | 'first'
  | 'second'
  | 'third'
  | 'fourth'
  | 'past'
  | 'present'
  | 'future'
  | 'situation'
  | 'challenge'
  | 'conscious'
  | 'subconscious'
  | 'pastFoundation'
  | 'nearFuture'
  | 'self'
  | 'environment'
  | 'hopesFears'
  | 'outcome';

export interface TarotCard {
  id: number;
  nameJa: string;
  nameEn: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  arcana: ArcanaType;
  suit?: CardSuit;
  rank?: string;
}

export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: CardPosition;
}

export interface ReadingState {
  screen: AppScreen;
  spreadType: SpreadType;
  deckMode: DeckMode;
  question: string;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
}

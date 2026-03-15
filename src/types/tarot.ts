export type SpreadType = 'single' | 'two' | 'three' | 'four' | 'celticCross';
export type DeckType = 'major' | 'minor' | 'mixed';
export type CardOrientation = 'upright' | 'reversed';
export type CardPosition =
  | 'single'
  | 'left'
  | 'right'
  | 'past'
  | 'present'
  | 'future'
  | 'advice'
  | 'current'
  | 'challenge'
  | 'foundation'
  | 'recentPast'
  | 'conscious'
  | 'nearFuture'
  | 'self'
  | 'environment'
  | 'hopeAndFear'
  | 'outcome';
export type AppScreen = 'home' | 'shuffle' | 'result';
export type ResultMode = 'full' | 'summary';

export interface TarotCard {
  id: number;
  nameJa: string;
  nameEn: string;
  image: string;
  uprightMeaning: string;
  reversedMeaning: string;
  keywords: string[];
  arcana?: 'major' | 'minor';
}

export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: CardPosition;
}

export interface ReadingState {
  screen: AppScreen;
  spreadType: SpreadType;
  deckType: DeckType;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
  consultationTopic: string;
}

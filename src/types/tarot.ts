export type SpreadType = 'single' | 'three';
export type CardOrientation = 'upright' | 'reversed';
export type CardPosition = 'single' | 'past' | 'present' | 'future';
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
}

export interface DrawnCard {
  card: TarotCard;
  orientation: CardOrientation;
  position: CardPosition;
}

export interface ReadingState {
  screen: AppScreen;
  spreadType: SpreadType;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
  consultationTopic: string;
}

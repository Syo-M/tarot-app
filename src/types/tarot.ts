export type SpreadType = 'single' | 'two' | 'three' | 'four' | 'celticCross';

export type DeckType = 'major' | 'minor' | 'mixed';
export type DeckMode = DeckType;

export type ResultMode = 'full' | 'summary';
export type AppScreen = 'home' | 'shuffle' | 'result';
export type CardOrientation = 'upright' | 'reversed';

export type CardSuit = 'wands' | 'cups' | 'swords' | 'pentacles';

export type ArcanaType = 'major' | 'minor';

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
    deckType: DeckType;
    drawnCards: DrawnCard[];
    isShuffling: boolean;
    resultMode: ResultMode;
    consultationTopic: string;
}

export interface DeckDefinition {
    id: DeckType;
    label: string;
    description?: string;
}

export interface SpreadDefinition {
    id: SpreadType;
    label: string;
    description?: string;
    cardCount: number;
}

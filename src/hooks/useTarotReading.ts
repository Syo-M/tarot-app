import { useMemo, useState } from 'react';
import { tarotCards } from '../data/tarotCards';
import type { DeckType, DrawnCard, ReadingState, ResultMode, SpreadType } from '../types/tarot';
import { drawCards } from '../utils/drawCards';

const initialState: ReadingState = {
  screen: 'home',
  spreadType: 'single',
  deckType: 'mixed',
  drawnCards: [],
  isShuffling: false,
  resultMode: 'full',
  consultationTopic: '',
};

interface UseTarotReadingReturn {
  screen: ReadingState['screen'];
  spreadType: SpreadType;
  deckType: DeckType;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
  consultationTopic: string;
  availableCardsCount: number;
  setSpreadType: (spreadType: SpreadType) => void;
  setDeckType: (deckType: DeckType) => void;
  setResultMode: (resultMode: ResultMode) => void;
  setConsultationTopic: (topic: string) => void;
  startReading: () => void;
  startQuickReading: () => void;
  finishShuffleAndReveal: () => void;
  resetToHome: () => void;
}

const quickSpreadCandidates: SpreadType[] = ['single', 'three', 'four', 'celticCross'];
const quickDeckCandidates: DeckType[] = ['major', 'minor', 'mixed'];

const getRandomItem = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const useTarotReading = (): UseTarotReadingReturn => {
  const [readingState, setReadingState] = useState<ReadingState>(initialState);

  const availableCardsCount = useMemo(() => tarotCards.length, []);

  const setSpreadType = (spreadType: SpreadType): void => {
    setReadingState((prevState) => ({ ...prevState, spreadType }));
  };

  const setDeckType = (deckType: DeckType): void => {
    setReadingState((prevState) => ({ ...prevState, deckType }));
  };

  const setResultMode = (resultMode: ResultMode): void => {
    setReadingState((prevState) => ({ ...prevState, resultMode }));
  };

  const setConsultationTopic = (consultationTopic: string): void => {
    setReadingState((prevState) => ({ ...prevState, consultationTopic }));
  };

  const moveToShuffle = (spreadType: SpreadType, resultMode: ResultMode, deckType: DeckType): void => {
    setReadingState((prevState) => ({
      ...prevState,
      spreadType,
      resultMode,
      deckType,
      screen: 'shuffle',
      isShuffling: true,
      drawnCards: [],
    }));
  };

  const startReading = (): void => {
    moveToShuffle(readingState.spreadType, readingState.resultMode, readingState.deckType);
  };

  const startQuickReading = (): void => {
    moveToShuffle(getRandomItem(quickSpreadCandidates), 'summary', getRandomItem(quickDeckCandidates));
  };

  const finishShuffleAndReveal = (): void => {
    setReadingState((prevState) => {
      const safeDrawCards = drawCards as unknown as (
        cards: typeof tarotCards,
        spreadType: SpreadType,
        deckType?: DeckType,
      ) => DrawnCard[];

      return {
        ...prevState,
        screen: 'result',
        isShuffling: false,
        drawnCards: safeDrawCards(tarotCards, prevState.spreadType, prevState.deckType),
      };
    });
  };

  const resetToHome = (): void => {
    setReadingState(initialState);
  };

  return {
    screen: readingState.screen,
    spreadType: readingState.spreadType,
    deckType: readingState.deckType,
    drawnCards: readingState.drawnCards,
    isShuffling: readingState.isShuffling,
    resultMode: readingState.resultMode,
    consultationTopic: readingState.consultationTopic,
    availableCardsCount,
    setSpreadType,
    setDeckType,
    setResultMode,
    setConsultationTopic,
    startReading,
    startQuickReading,
    finishShuffleAndReveal,
    resetToHome,
  };
};

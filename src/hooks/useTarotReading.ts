import { useMemo, useState } from 'react';
import { tarotCards } from '../data/tarotCards';
import type { DeckMode, DrawnCard, ReadingState, ResultMode, SpreadType } from '../types/tarot';
import { drawCards, filterCardsByDeckMode } from '../utils/drawCards';

const initialState: ReadingState = {
  screen: 'home',
  spreadType: 'single',
  deckMode: 'major',
  question: '',
  drawnCards: [],
  isShuffling: false,
  resultMode: 'full',
};

interface UseTarotReadingReturn {
  screen: ReadingState['screen'];
  spreadType: SpreadType;
  deckMode: DeckMode;
  question: string;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
  availableCardsCount: number;
  setSpreadType: (spreadType: SpreadType) => void;
  setDeckMode: (deckMode: DeckMode) => void;
  setQuestion: (question: string) => void;
  setResultMode: (resultMode: ResultMode) => void;
  startReading: () => void;
  startQuickReading: () => void;
  finishShuffleAndReveal: () => void;
  resetToHome: () => void;
}

export const useTarotReading = (): UseTarotReadingReturn => {
  const [readingState, setReadingState] = useState<ReadingState>(initialState);

  const availableCardsCount = useMemo(
    () => filterCardsByDeckMode(tarotCards, readingState.deckMode).length,
    [readingState.deckMode],
  );

  const setSpreadType = (spreadType: SpreadType): void => {
    setReadingState((prevState) => ({ ...prevState, spreadType }));
  };

  const setDeckMode = (deckMode: DeckMode): void => {
    setReadingState((prevState) => ({ ...prevState, deckMode }));
  };

  const setQuestion = (question: string): void => {
    setReadingState((prevState) => ({ ...prevState, question }));
  };

  const setResultMode = (resultMode: ResultMode): void => {
    setReadingState((prevState) => ({ ...prevState, resultMode }));
  };

  const moveToShuffle = (spreadType: SpreadType, resultMode: ResultMode, deckMode: DeckMode): void => {
    setReadingState((prevState) => ({
      ...prevState,
      spreadType,
      resultMode,
      deckMode,
      screen: 'shuffle',
      isShuffling: true,
      drawnCards: [],
    }));
  };

  const startReading = (): void => {
    moveToShuffle(readingState.spreadType, readingState.resultMode, readingState.deckMode);
  };

  const startQuickReading = (): void => {
    moveToShuffle('single', 'summary', 'major');
  };

  const finishShuffleAndReveal = (): void => {
    setReadingState((prevState) => ({
      ...prevState,
      screen: 'result',
      isShuffling: false,
      drawnCards: drawCards(tarotCards, prevState.spreadType, prevState.deckMode),
    }));
  };

  const resetToHome = (): void => {
    setReadingState((prevState) => ({ ...initialState, question: prevState.question }));
  };

  return {
    screen: readingState.screen,
    spreadType: readingState.spreadType,
    deckMode: readingState.deckMode,
    question: readingState.question,
    drawnCards: readingState.drawnCards,
    isShuffling: readingState.isShuffling,
    resultMode: readingState.resultMode,
    availableCardsCount,
    setSpreadType,
    setDeckMode,
    setQuestion,
    setResultMode,
    startReading,
    startQuickReading,
    finishShuffleAndReveal,
    resetToHome,
  };
};

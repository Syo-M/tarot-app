import { useMemo, useState } from 'react';
import { tarotCards } from '../data/tarotCards';
import type { DrawnCard, ReadingState, ResultMode, SpreadType } from '../types/tarot';
import { drawCards } from '../utils/drawCards';

const initialState: ReadingState = {
  screen: 'home',
  spreadType: 'single',
  drawnCards: [],
  isShuffling: false,
  resultMode: 'full',
  consultationTopic: '',
};

interface UseTarotReadingReturn {
  screen: ReadingState['screen'];
  spreadType: SpreadType;
  drawnCards: DrawnCard[];
  isShuffling: boolean;
  resultMode: ResultMode;
  consultationTopic: string;
  availableCardsCount: number;
  setSpreadType: (spreadType: SpreadType) => void;
  setResultMode: (resultMode: ResultMode) => void;
  setConsultationTopic: (topic: string) => void;
  startReading: () => void;
  startQuickReading: () => void;
  finishShuffleAndReveal: () => void;
  resetToHome: () => void;
}

export const useTarotReading = (): UseTarotReadingReturn => {
  const [readingState, setReadingState] = useState<ReadingState>(initialState);

  const availableCardsCount = useMemo(() => tarotCards.length, []);

  const setSpreadType = (spreadType: SpreadType): void => {
    setReadingState((prevState) => ({ ...prevState, spreadType }));
  };

  const setResultMode = (resultMode: ResultMode): void => {
    setReadingState((prevState) => ({ ...prevState, resultMode }));
  };

  const setConsultationTopic = (consultationTopic: string): void => {
    setReadingState((prevState) => ({ ...prevState, consultationTopic }));
  };

  const moveToShuffle = (spreadType: SpreadType, resultMode: ResultMode): void => {
    setReadingState((prevState) => ({
      ...prevState,
      spreadType,
      resultMode,
      screen: 'shuffle',
      isShuffling: true,
      drawnCards: [],
    }));
  };

  const startReading = (): void => {
    moveToShuffle(readingState.spreadType, readingState.resultMode);
  };

  const startQuickReading = (): void => {
    const spreadCandidates: SpreadType[] = ['single', 'three'];
    const randomSpreadType = spreadCandidates[Math.floor(Math.random() * spreadCandidates.length)];
    moveToShuffle(randomSpreadType, 'summary');
  };

  const finishShuffleAndReveal = (): void => {
    setReadingState((prevState) => ({
      ...prevState,
      screen: 'result',
      isShuffling: false,
      drawnCards: drawCards(tarotCards, prevState.spreadType),
    }));
  };

  const resetToHome = (): void => {
    setReadingState(initialState);
  };

  return {
    screen: readingState.screen,
    spreadType: readingState.spreadType,
    drawnCards: readingState.drawnCards,
    isShuffling: readingState.isShuffling,
    resultMode: readingState.resultMode,
    consultationTopic: readingState.consultationTopic,
    availableCardsCount,
    setSpreadType,
    setResultMode,
    setConsultationTopic,
    startReading,
    startQuickReading,
    finishShuffleAndReveal,
    resetToHome,
  };
};

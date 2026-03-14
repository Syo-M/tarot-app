import { useMemo, useState } from 'react';
import { drawCards, getAvailableCardsCount } from '../utils/drawCards';
import type { DeckType, DrawnCard, ReadingOptions, SpreadType } from '../types/tarot';

const INITIAL_SPREAD: SpreadType = 'single';
const INITIAL_DECK: DeckType = 'major';

export const useTarotReading = () => {
  const [screen, setScreen] = useState<'home' | 'shuffle' | 'result'>('home');
  const [spreadType, setSpreadType] = useState<SpreadType>(INITIAL_SPREAD);
  const [deckType, setDeckType] = useState<DeckType>(INITIAL_DECK);
  const [question, setQuestion] = useState('');
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([]);
  const [isShuffling, setIsShuffling] = useState(false);

  const availableCardsCount = useMemo(
    () => getAvailableCardsCount(deckType),
    [deckType],
  );

  const readingOptions: ReadingOptions = {
    spreadType,
    deckType,
    question,
  };

  const startReading = () => {
    const nextCards = drawCards({ spreadType, deckType });
    setDrawnCards(nextCards);
    setIsShuffling(true);
    setScreen('shuffle');
  };

  const finishShuffleAndReveal = () => {
    setIsShuffling(false);
    setScreen('result');
  };

  const redrawReading = () => {
    startReading();
  };

  const resetToHome = () => {
    setScreen('home');
    setDrawnCards([]);
    setIsShuffling(false);
  };

  return {
    screen,
    spreadType,
    deckType,
    question,
    drawnCards,
    isShuffling,
    availableCardsCount,
    readingOptions,
    setSpreadType,
    setDeckType,
    setQuestion,
    startReading,
    finishShuffleAndReveal,
    redrawReading,
    resetToHome,
  };
};

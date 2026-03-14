import { HomePage } from './pages/HomePage/HomePage';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ShufflePage } from './pages/ShufflePage/ShufflePage';
import { useTarotReading } from './hooks/useTarotReading';

const App = () => {
  const {
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
  } = useTarotReading();

  if (screen === 'shuffle') {
    return (
      <ShufflePage
        spreadType={spreadType}
        isShuffling={isShuffling}
        onComplete={finishShuffleAndReveal}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultPage
        readingOptions={readingOptions}
        drawnCards={drawnCards}
        onRedraw={redrawReading}
        onReset={resetToHome}
      />
    );
  }

  return (
    <HomePage
      spreadType={spreadType}
      deckType={deckType}
      question={question}
      availableCardsCount={availableCardsCount}
      onSpreadChange={setSpreadType}
      onDeckChange={setDeckType}
      onQuestionChange={setQuestion}
      onStart={startReading}
    />
  );
};

export default App;

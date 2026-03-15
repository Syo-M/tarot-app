import { HomePage } from './pages/HomePage/HomePage';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ShufflePage } from './pages/ShufflePage/ShufflePage';
import { useTarotReading } from './hooks/useTarotReading';

const App = () => {
  const {
    screen,
    spreadType,
    deckMode,
    question,
    drawnCards,
    availableCardsCount,
    resultMode,
    setSpreadType,
    setDeckMode,
    setQuestion,
    setResultMode,
    startReading,
    startQuickReading,
    finishShuffleAndReveal,
    resetToHome,
  } = useTarotReading();

  if (screen === 'shuffle') {
    return (
      <ShufflePage
        spreadType={spreadType}
        deckMode={deckMode}
        resultMode={resultMode}
        onComplete={finishShuffleAndReveal}
      />
    );
  }

  if (screen === 'result') {
    return (
      <ResultPage
        spreadType={spreadType}
        deckMode={deckMode}
        question={question}
        drawnCards={drawnCards}
        resultMode={resultMode}
        onRetry={startReading}
        onBackHome={resetToHome}
      />
    );
  }

  return (
    <HomePage
      spreadType={spreadType}
      deckMode={deckMode}
      question={question}
      resultMode={resultMode}
      availableCardsCount={availableCardsCount}
      onChangeSpreadType={setSpreadType}
      onChangeDeckMode={setDeckMode}
      onChangeQuestion={setQuestion}
      onChangeResultMode={setResultMode}
      onStartReading={startReading}
      onStartQuickReading={startQuickReading}
    />
  );
};

export default App;

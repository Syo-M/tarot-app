import { HomePage } from './pages/HomePage/HomePage';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ShufflePage } from './pages/ShufflePage/ShufflePage';
import { useTarotReading } from './hooks/useTarotReading';

const App = () => {
    const {
        screen,
        spreadType,
        deckType,
        drawnCards,
        availableCardsCount,
        resultMode,
        consultationTopic,
        setSpreadType,
        setDeckType,
        setResultMode,
        setConsultationTopic,
        startReading,
        startQuickReading,
        finishShuffleAndReveal,
        resetToHome,
    } = useTarotReading();

    if (screen === 'shuffle') {
        return (
            <ShufflePage
                spreadType={spreadType}
                deckMode={deckType}
                resultMode={resultMode}
                onComplete={finishShuffleAndReveal}
            />
        );
    }

    if (screen === 'result') {
        return (
            <ResultPage
                spreadType={spreadType}
                deckType={deckType}
                drawnCards={drawnCards}
                resultMode={resultMode}
                consultationTopic={consultationTopic}
                onRetry={resetToHome}
                onBackHome={resetToHome}
            />
        );
    }

    return (
        <HomePage
            spreadType={spreadType}
            deckType={deckType}
            resultMode={resultMode}
            availableCardsCount={availableCardsCount}
            consultationTopic={consultationTopic}
            onChangeSpreadType={setSpreadType}
            onChangeDeckType={setDeckType}
            onChangeResultMode={setResultMode}
            onChangeConsultationTopic={setConsultationTopic}
            onStartReading={startReading}
            onStartQuickReading={startQuickReading}
        />
    );
};

export default App;

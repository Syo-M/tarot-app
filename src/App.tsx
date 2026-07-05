import { useEffect, useRef } from 'react';
import { HomePage } from './pages/HomePage/HomePage';
import { ResultPage } from './pages/ResultPage/ResultPage';
import { ShufflePage } from './pages/ShufflePage/ShufflePage';
import { useTarotReading } from './hooks/useTarotReading';

export const App = () => {
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

    // 画面切替時に新しい画面の見出しへフォーカスを移す
    // （SPA の遷移はスクリーンリーダーに伝わらないため。a11y: focus management）
    const previousScreenRef = useRef(screen);

    useEffect(() => {
        if (previousScreenRef.current === screen) {
            return;
        }

        previousScreenRef.current = screen;
        document.querySelector<HTMLHeadingElement>('h1')?.focus();
    }, [screen]);

    if (screen === 'shuffle') {
        return (
            <ShufflePage spreadType={spreadType} deckType={deckType} onComplete={finishShuffleAndReveal} />
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

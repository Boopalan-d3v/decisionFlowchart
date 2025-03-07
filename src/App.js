import { useState, useEffect } from "react";
import questions from "./questions";
import HistoryModal from "./HistoryModal";

export default function App() {
  const [currentId, setCurrentId] = useState(1);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [hasLoggedEnd, setHasLoggedEnd] = useState(false); 

  const currentQuestion = questions.find((q) => q.id === currentId);

  useEffect(() => {
    if (
      currentQuestion &&
      currentQuestion.type !== "yesno" &&
      !currentQuestion.next
    ) {
      setIsEnd(true);

      if (!hasLoggedEnd) {
        setHistory((prevHistory) => [
          ...prevHistory,
          { id: currentQuestion.id, question: currentQuestion.text, answer: "End" },
        ]);
        setHasLoggedEnd(true);
      }
    } else {
      setIsEnd(false);
      setHasLoggedEnd(false);
    }
  }, [currentQuestion, hasLoggedEnd]); 

  const handleAnswer = (answer) => {
    setHistory([
      ...history,
      { id: currentQuestion.id, question: currentQuestion.text, answer },
    ]);
    const nextId = currentQuestion[answer];
    if (nextId) {
      setCurrentId(nextId);
    } else {
      setIsEnd(true);
    }
  };

  const handleNext = () => {
    setHistory([
      ...history,
      { id: currentQuestion.id, question: currentQuestion.text, answer: "Next" },
    ]);
    const nextId = currentQuestion.next;
    if (nextId) {
      setCurrentId(nextId);
    } else {
      setIsEnd(true);
    }
  };

  const handleBack = () => {
    if (history.length === 0) return;

    const newHistory = [...history];

    // Remove "End" entry if it's the last one and we're at the end
    if (isEnd && newHistory[newHistory.length - 1].answer === "End") {
      newHistory.pop();
    }

    if (newHistory.length === 0) {
      setHistory(newHistory);
      setCurrentId(1); // Restart if nothing left
      setIsEnd(false);
      return;
    }

    const previousEntry = newHistory.pop();
    setHistory(newHistory);
    setCurrentId(previousEntry.id);
    setIsEnd(false);
  };

  const handleRestart = () => {
    setCurrentId(1);
    setHistory([]);
    setIsEnd(false);
    setHasLoggedEnd(false); 
  };

  return (
    <div>
      <header className="header">
        <h1 className="header-title">LTF / 510k Submission Decision Process</h1>
        <div className="button-group">
          <button className="btn-restart" onClick={handleRestart}>
            Restart
          </button>
          <button className="btn-history" onClick={() => setShowHistory(true)}>
            History
          </button>
        </div>
      </header>

      <div className="app-container">
        {currentQuestion?.subheading && (
          <h2 className="subheading">{currentQuestion.subheading}</h2>
        )}
        {currentQuestion && (
          <h1 className="question">{currentQuestion.text}</h1>
        )}
        {isEnd && <p className="end-message">End of the flowchart!</p>}

        <div className="button-group">
          {!isEnd && currentQuestion.type === "yesno" && (
            <>
              <button onClick={() => handleAnswer("yes")} className="yes">
                Yes
              </button>
              <button onClick={() => handleAnswer("no")} className="no">
                No
              </button>
            </>
          )}

          {!isEnd &&
            (currentQuestion.type === "next" ||
              (currentQuestion.type === "info" && currentQuestion.next)) && (
              <button onClick={handleNext} className="next">
                Next
              </button>
          )}

          {history.length > 0 && (
            <button onClick={handleBack} className="back">
              Back
            </button>
          )}
        </div>
      </div>

      {showHistory && (
        <HistoryModal
          history={history}
          onClose={() => setShowHistory(false)}
        />
      )}
    </div>
  );
}

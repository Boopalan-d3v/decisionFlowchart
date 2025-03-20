
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import NewNode from "./NewNode";
import HistoryModal from "./HistoryModal";
import { fetchDataFromS3 } from "../awsConfig";
import "./App.css";

export default function App() {
  const [questions, setQuestions] = useState([]);
  const [currentText, setCurrentText] = useState("Modification to an already cleared / licensed device?");
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const [hasLoggedEnd, setHasLoggedEnd] = useState(false);

  // Load Questions from S3 Bucket on App Load
  useEffect(() => {
    const loadQuestions = async () => {
      const storedQuestions = await fetchDataFromS3();
  
      if (storedQuestions.length > 0) {
        setQuestions(storedQuestions);
      }
    };
  
    loadQuestions();
  }, []); // Add currentId as a dependency
  
  const currentQuestion = questions.find((q) => q.text === currentText) || {};

  console.log("Current Question:", currentQuestion);

  useEffect(() => {
    if (currentQuestion && currentQuestion.type !== "yesno" && !currentQuestion.next) {
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

  // Handle Answer Click
  const handleAnswer = (answer) => {
    setHistory([...history, { id: currentQuestion.id, question: currentQuestion.text, answer }]);
    const nextText = currentQuestion[answer];
    if (nextText) {
      setCurrentText(nextText);
    } else {
      setIsEnd(true);
    }
  };

  // Handle Next Button
  const handleNext = () => {
    if (currentQuestion.next) {
      setHistory([...history, { id: currentQuestion.id, question: currentQuestion.text, answer: "Next" }]);
      setCurrentText(currentQuestion.next);
    } else {
      setIsEnd(true);
    }
  };

  // Handle Back Button
  const handleBack = () => {
    if (history.length === 0) return;

    const newHistory = [...history];
    if (isEnd && newHistory[newHistory.length - 1]?.answer === "End") {
      newHistory.pop();
    }

    if (newHistory.length === 0) {
      setHistory(newHistory);
      setCurrentText("Modification to an already cleared / licensed device?");
      setIsEnd(false);
      return;
    }

    const previousEntry = newHistory.pop();
    setHistory(newHistory);
    setCurrentText(previousEntry.question);
    setIsEnd(false);
  };

  // Handle Restart Button
  const handleRestart = () => {
    setCurrentText("Modification to an already cleared / licensed device?");
    setHistory([]);
    setIsEnd(false);
    setHasLoggedEnd(false);
  };

  return (
    <Router>
      <div className="app">
        <Sidebar />
        <Routes>
          <Route
            path="/"
            element={
              <div>
                <header className="header">
                  <h1 className="header-title">LTF / 510k Submission Decision Process</h1>
                  <div className="header-buttons">
                    <button onClick={handleRestart}>Restart</button>
                    <button onClick={() => setShowHistory(true)}>History</button>
                  </div>
                </header>

                <div className="app-container">
                  {currentQuestion?.subheading && <h2>{currentQuestion.subheading}</h2>}
                  {currentQuestion && <p>{currentQuestion.text}</p>}
                  {isEnd && <p>End of the flowchart!</p>}

                  <div className="button-group">
                  {!isEnd && currentQuestion && currentQuestion.type === "yesno" && (
                    <>
                      <button className="yes" onClick={() => handleAnswer("yes")}>
                        Yes
                      </button>
                      <button className="no" onClick={() => handleAnswer("no")}>
                        No
                      </button>
                    </>
                  )}  
                  {!isEnd && currentQuestion.type === "info" && currentQuestion.next && (
                      <button className="next" onClick={handleNext}>
                        Next
                      </button>
                    )}

                    {history.length > 0 && (
                      <button className="back" onClick={handleBack}>
                        Back
                      </button>
                    )}
                  </div>
                </div>
              </div>
            }
          />
          <Route path="/new-node" element={<NewNode questions={questions} setQuestions={setQuestions} />} />
        </Routes>

        {showHistory && <HistoryModal history={history} onClose={() => setShowHistory(false)} />}
      </div>
    </Router>
  );
}

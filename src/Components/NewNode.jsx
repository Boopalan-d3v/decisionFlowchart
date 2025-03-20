import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromS3, uploadDataToS3 } from "../awsConfig";
import { v4 as uuidv4 } from "uuid";
import "./NewNode.css";

export default function NewNode({ questions, setQuestions }) {
  const navigate = useNavigate();
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "yesno",
    yes: "",
    no: "",
    next: "",
  });
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [message, setMessage] = useState("");
  const [otherYes, setOtherYes] = useState(false);
  const [otherNo, setOtherNo] = useState(false);
  const [otherNext, setOtherNext] = useState(false);
  const [otherYesText, setOtherYesText] = useState("");
  const [otherNoText, setOtherNoText] = useState("");
  const [otherNextText, setOtherNextText] = useState("");

  useEffect(() => {
    if (selectedQuestion) {
      const nodeToEdit = questions.find((q) => q.id === selectedQuestion);
      if (nodeToEdit) {
        setNewQuestion({
          text: nodeToEdit.text,
          type: nodeToEdit.type,
          yes: nodeToEdit.yes || "",
          no: nodeToEdit.no || "",
          next: nodeToEdit.next || "",
        });
      }
    } else {
      resetForm();
    }
  }, [selectedQuestion]);

  const resetForm = () => {
    setNewQuestion({
      text: "",
      type: "yesno",
      yes: "",
      no: "",
      next: "",
    });
    setOtherYes(false);
    setOtherNo(false);
    setOtherNext(false);
    setOtherYesText("");
    setOtherNoText("");
    setOtherNextText("");
  };

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedQuestions;

    if (otherYes) newQuestion.yes = otherYesText;
    if (otherNo) newQuestion.no = otherNoText;
    if (otherNext) newQuestion.next = otherNextText;

    if (selectedQuestion) {
      updatedQuestions = questions.map((q) =>
        q.id === selectedQuestion
          ? { ...q, ...newQuestion }
          : q
      );
      setMessage("Node updated successfully!");
    } else {
      const newNode = {
        id: uuidv4(),
        text: newQuestion.text,
        type: newQuestion.type,
        yes: newQuestion.yes || null,
        no: newQuestion.no || null,
        next: newQuestion.next || null,
      };
      updatedQuestions = [...questions, newNode];
      setMessage("New node added successfully!");
    }

    await uploadDataToS3(updatedQuestions);
    setQuestions(updatedQuestions);
    setTimeout(() => setMessage(""), 3000);
  };

  const handleDelete = async () => {
    const updatedQuestions = questions.filter((q) => q.id !== selectedQuestion);
    await uploadDataToS3(updatedQuestions);
    setQuestions(updatedQuestions);
    setMessage("Node deleted successfully!");
    window.alert("Node deleted successfully!");
    resetForm();
    setSelectedQuestion("");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="new-node-container">
      <h2>{selectedQuestion ? "Edit Existing Node" : "Add New Node"}</h2>
      <label>Select Existing Node (Optional):</label>
      <select
        value={selectedQuestion}
        onChange={(e) => setSelectedQuestion(e.target.value)}
      >
        <option value="">Select a question...</option>
        {questions.map((q) => (
          <option key={q.id} value={q.id}>
            {q.text}
          </option>
        ))}
      </select>

      <form onSubmit={handleSubmit}>
        <label>Question Text:</label>
        <input
          type="text"
          name="text"
          value={newQuestion.text}
          onChange={handleChange}
          required
        />
        <label>Type:</label>
        <select name="type" value={newQuestion.type} onChange={handleChange}>
          <option value="yesno">Yes/No</option>
          <option value="info">Info</option>
        </select>

        {newQuestion.type === "yesno" && (
          <>
            <label>Yes (Next Question):</label>
            <select
              value={otherYes ? "other" : newQuestion.yes}
              onChange={(e) =>
                e.target.value === "other"
                  ? setOtherYes(true)
                  : (setOtherYes(false), handleChange(e))
              }
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.text}>
                  {q.text}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
            {otherYes && (
              <input
                type="text"
                placeholder="Enter new Yes option"
                value={otherYesText}
                onChange={(e) => setOtherYesText(e.target.value)}
              />
            )}

            <label>No (Next Question):</label>
            <select
              value={otherNo ? "other" : newQuestion.no}
              onChange={(e) =>
                e.target.value === "other"
                  ? setOtherNo(true)
                  : (setOtherNo(false), handleChange(e))
              }
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.text}>
                  {q.text}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
            {otherNo && (
              <input
                type="text"
                placeholder="Enter new No option"
                value={otherNoText}
                onChange={(e) => setOtherNoText(e.target.value)}
              />
            )}
          </>
        )}

        {newQuestion.type === "info" && (
          <>
            <label>Next (Next Question):</label>
            <select
              value={otherNext ? "other" : newQuestion.next}
              onChange={(e) =>
                e.target.value === "other"
                  ? setOtherNext(true)
                  : (setOtherNext(false), handleChange(e))
              }
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.text}>
                  {q.text}
                </option>
              ))}
              <option value="other">Other</option>
            </select>
            {otherNext && (
              <input
                type="text"
                placeholder="Enter new Next option"
                value={otherNextText}
                onChange={(e) => setOtherNextText(e.target.value)}
              />
            )}
          </>
        )}

        <button type="submit">
          {selectedQuestion ? "Update Node" : "Add Node"}
        </button>

        {selectedQuestion && (
          <button type="button" onClick={handleDelete} className="delete-button">
            Delete Node
          </button>
        )}
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}
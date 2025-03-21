import { useState, useEffect } from "react";
import { uploadDataToS3 } from "../awsConfig";
import { v4 as uuidv4 } from "uuid";
import "./NewNode.css";

export default function NewNode({ questions, setQuestions }) {
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "yesno",
    yes: "",
    no: "",
    next: "",
  });
  const [selectedQuestion, setSelectedQuestion] = useState("");
  const [message, setMessage] = useState("");

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
  }, [selectedQuestion, questions]);

  const resetForm = () => {
    setNewQuestion({
      text: "",
      type: "yesno",
      yes: "",
      no: "",
      next: "",
    });
  };

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let updatedQuestions;

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
    resetForm();
    setSelectedQuestion("");
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

      {/* Select Existing Node Dropdown */}
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
        {/* Question Text */}
        <label>Question Text:</label>
        <input
          type="text"
          name="text"
          value={newQuestion.text}
          onChange={handleChange}
          required
        />

        {/* Type Dropdown */}
        <label>Type:</label>
        <select name="type" value={newQuestion.type} onChange={handleChange}>
          <option value="yesno">Yes/No</option>
          <option value="info">Info</option>
        </select>

        {/* Yes/No Type Handling */}
        {newQuestion.type === "yesno" && (
          <>
            <label>Yes (Next Question):</label>
            <select
              name="yes"
              value={newQuestion.yes || ""}
              onChange={handleChange}
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.text}
                </option>
              ))}
            </select>

            <label>No (Next Question):</label>
            <select
              name="no"
              value={newQuestion.no || ""}
              onChange={handleChange}
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.text}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Info Type Handling */}
        {newQuestion.type === "info" && (
          <>
            <label>Next (Next Question):</label>
            <select
              name="next"
              value={newQuestion.next || ""}
              onChange={handleChange}
            >
              <option value="">Select a question...</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>
                  {q.text}
                </option>
              ))}
            </select>
          </>
        )}

        {/* Submit & Delete Buttons */}
        <button type="submit">
          {selectedQuestion ? "Update Node" : "Add Node"}
        </button>

        {selectedQuestion && (
          <button
            type="button"
            onClick={handleDelete}
            className="delete-button"
          >
            Delete Node
          </button>
        )}
      </form>

      {/* Success Message */}
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}


import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchDataFromS3, uploadDataToS3 } from "../awsConfig";
import { v4 as uuidv4 } from "uuid";
import "./NewNode.css";

export default function NewNode({ questions, setQuestions }) {
  const navigate = useNavigate();
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "yesno",
    yes: "",
    no: "",
    next: "",
  });
  const [message, setMessage] = useState(""); // For success/error messages

  useEffect(() => {
    const loadQuestions = async () => {
      const storedQuestions = await fetchDataFromS3();
      setQuestions(storedQuestions);
    };
    loadQuestions();
  }, [setQuestions]);

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let updatedQuestions;
      if (selectedQuestionId) {
        updatedQuestions = questions.map((q) =>
          q.id === selectedQuestionId
            ? {
                ...q,
                text: newQuestion.text,
                type: newQuestion.type,
                yes: newQuestion.yes || null,
                no: newQuestion.no || null,
                next: newQuestion.next || null,
              }
            : q
        );
        setMessage("Question updated successfully!");
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
      navigate("/");
    } catch (error) {
      console.error("Error saving question:", error);
      setMessage("Error saving question!");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="new-node-container">
      <h2>{selectedQuestionId ? "Edit Question" : "Add New Node"}</h2>
      <form onSubmit={handleSubmit}>
        <label>Question Text:</label>
        <input type="text" name="text" value={newQuestion.text} onChange={handleChange} required />
        <label>Type:</label>
        <select name="type" value={newQuestion.type} onChange={handleChange}>
          <option value="yesno">Yes/No</option>
          <option value="info">Info</option>
        </select>
        {newQuestion.type === "yesno" && (
          <>
            <label>Yes (Next Question Text or ID):</label>
            <input type="text" name="yes" value={newQuestion.yes} onChange={handleChange} />
            <label>No (Next Question Text or ID):</label>
            <input type="text" name="no" value={newQuestion.no} onChange={handleChange} />
          </>
        )}
        {newQuestion.type === "info" && (
          <>
            <label>Next (Next Question Text or ID):</label>
            <input type="text" name="next" value={newQuestion.next} onChange={handleChange} />
          </>
        )}
        <button type="submit">{selectedQuestionId ? "Update Question" : "Add Node"}</button>
      </form>
      {message && <p className="success-message">{message}</p>}
    </div>
  );
}

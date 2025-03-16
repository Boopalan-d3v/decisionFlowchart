import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions, { saveQuestionsToLocalStorage } from "../Data/questions";
import { v4 as uuidv4 } from "uuid";
import "./NewNode.css";

export default function NewNode() {
  const navigate = useNavigate();
  
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "yesno",
    yes: "",
    no: "",
    next: "",
  });

  const [parentId, setParentId] = useState(""); // ID of the parent question
  const [parentAnswer, setParentAnswer] = useState("yes"); // Which path to link it to

  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEntry = {
      id: uuidv4(),
      text: newQuestion.text,
      type: newQuestion.type,
      yes: newQuestion.yes || null,
      no: newQuestion.no || null,
      next: newQuestion.next || null,
    };

    // Add new node to questions array
    questions.push(newEntry);

    // Link new node to the selected parent question
    if (parentId) {
      const parentQuestion = questions.find((q) => q.id === parentId);
      if (parentQuestion) {
        parentQuestion[parentAnswer] = newQuestion.text; // Set Yes/No/Next to the new question text
      }
    }

    // Save to localStorage
    saveQuestionsToLocalStorage();

    alert("New node added and linked successfully!");
    navigate("/"); // Redirect back to flowchart page
  };

  return (
    <div className="new-node-container">
      <h2>Add New Node</h2>
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

        <h3>Link to an Existing Question</h3>
        <label>Select Parent Question:</label>
        <select value={parentId} onChange={(e) => setParentId(e.target.value)}>
          <option value="">None</option>
          {questions.map((q) => (
            <option key={q.id} value={q.id}>{q.text}</option>
          ))}
        </select>

        <label>Connect as:</label>
        <select value={parentAnswer} onChange={(e) => setParentAnswer(e.target.value)}>
          <option value="yes">Yes Path</option>
          <option value="no">No Path</option>
          <option value="next">Next Step</option>
        </select>

        <button type="submit">Add Node</button>
      </form>
    </div>
  );
}

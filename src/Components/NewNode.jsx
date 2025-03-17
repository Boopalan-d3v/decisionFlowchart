import { useState } from "react";
import { useNavigate } from "react-router-dom";
import questions, { saveQuestionsToLocalStorage } from "../Data/questions";
import { v4 as uuidv4 } from "uuid";
import "./NewNode.css";

export default function NewNode() {
  const navigate = useNavigate();

  // State for new/edit question
  const [selectedQuestionId, setSelectedQuestionId] = useState("");
  const [newQuestion, setNewQuestion] = useState({
    text: "",
    type: "yesno",
    yes: "",
    no: "",
    next: "",
  });

  const [yesParentId, setYesParentId] = useState("");
  const [noParentId, setNoParentId] = useState("");
  const [nextParentId, setNextParentId] = useState("");

  // Handle input change
  const handleChange = (e) => {
    setNewQuestion({ ...newQuestion, [e.target.name]: e.target.value });
  };

  // Handle selecting an existing question to edit
  const handleSelectQuestion = (e) => {
    const questionId = e.target.value;
    setSelectedQuestionId(questionId);

    if (questionId) {
      const existingQuestion = questions.find((q) => q.id === questionId);
      setNewQuestion({
        text: existingQuestion.text,
        type: existingQuestion.type,
        yes: existingQuestion.yes || "",
        no: existingQuestion.no || "",
        next: existingQuestion.next || "",
      });
    } else {
      // Reset form if "None" is selected
      setNewQuestion({
        text: "",
        type: "yesno",
        yes: "",
        no: "",
        next: "",
      });
    }
  };

  // Handle form submission (Add or Update)
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedQuestionId) {
      // Update existing question
      const existingQuestion = questions.find((q) => q.id === selectedQuestionId);
      if (existingQuestion) {
        existingQuestion.text = newQuestion.text;
        existingQuestion.type = newQuestion.type;
        existingQuestion.yes = newQuestion.yes || null;
        existingQuestion.no = newQuestion.no || null;
        existingQuestion.next = newQuestion.next || null;
      }
    } else {
      // Add new question
      const newEntry = {
        id: uuidv4(),
        text: newQuestion.text,
        type: newQuestion.type,
        yes: newQuestion.yes || null,
        no: newQuestion.no || null,
        next: newQuestion.next || null,
      };
      questions.push(newEntry);
    }

    // Save changes
    saveQuestionsToLocalStorage();

    alert(selectedQuestionId ? "Question updated successfully!" : "New node added successfully!");
    navigate("/");
  };

  return (
    <div className="new-node-container">
      <h2>{selectedQuestionId ? "Edit Question" : "Add New Node"}</h2>

      <label>Select an Existing Question to Edit (Optional):</label>
      <select value={selectedQuestionId} onChange={handleSelectQuestion}>
        <option value="">None</option>
        {questions.map((q) => (
          <option key={q.id} value={q.id}>{q.text}</option>
        ))}
      </select>

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

            <h3>Link to an Existing Question</h3>
            <label>Select Parent Question for Yes Path:</label>
            <select id="existingQuestionSelect" value={yesParentId} onChange={(e) => setYesParentId(e.target.value)}>
              <option value="">None</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>{q.text}</option>
              ))}
            </select>

            <label>Select Parent Question for No Path:</label>
            <select value={noParentId} onChange={(e) => setNoParentId(e.target.value)}>
              <option value="">None</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>{q.text}</option>
              ))}
            </select>
          </>
        )}

        {newQuestion.type === "info" && (
          <>
            <label>Next (Next Question Text or ID):</label>
            <input type="text" name="next" value={newQuestion.next} onChange={handleChange} />

            <h3>Link to an Existing Question</h3>
            <label>Select Parent Question for Next Path:</label>
            <select value={nextParentId} onChange={(e) => setNextParentId(e.target.value)}>
              <option value="">None</option>
              {questions.map((q) => (
                <option key={q.id} value={q.id}>{q.text}</option>
              ))}
            </select>
          </>
        )}

        <button type="submit">{selectedQuestionId ? "Update Question" : "Add Node"}</button>
      </form>
    </div>
  );
}

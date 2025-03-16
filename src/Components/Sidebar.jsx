import { Link } from "react-router-dom";
import "./App.css"; // Add styles for sidebar

export default function Sidebar() {
  return (
    <div className="sidebar">
      <Link to="/" className="sidebar-btn">Flowchart</Link>
      <Link to="/new-node" className="sidebar-btn add-node">+ New Node</Link>
    </div>
  );
}

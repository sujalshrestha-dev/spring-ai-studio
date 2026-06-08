import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import ImagePage from "./pages/ImagePage";
import RecipePage from "./pages/RecipePage";
import "./App.css";

const tabs = [
  { id: "chat", label: "Chat AI", icon: "◈" },
  { id: "image", label: "Image Gen", icon: "◉" },
  { id: "recipe", label: "Recipe", icon: "◍" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="app">
      <div className="bg-grid" />
      <div className="bg-glow" />

      <header className="header">
        <div className="logo">
          <span className="logo-icon">⬡</span>
          <span className="logo-text">Spring<em>AI</em></span>
        </div>
        <nav className="nav">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`nav-btn ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="nav-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </header>

      <main className="main">
        {activeTab === "chat" && <ChatPage />}
        {activeTab === "image" && <ImagePage />}
        {activeTab === "recipe" && <RecipePage />}
      </main>
    </div>
  );
}
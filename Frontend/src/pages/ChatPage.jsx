import { useState, useRef, useEffect } from "react";
import axios from "axios";

const BASE = "http://localhost:8080";

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hello! I'm your AI assistant. Ask me anything." }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [useOptions, setUseOptions] = useState(false);
  const [error, setError] = useState("");
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = input.trim();
    setInput("");
    setError("");
    setMessages(prev => [...prev, { role: "user", text: userMsg }]);
    setLoading(true);

    try {
      const endpoint = useOptions ? "/ask-ai-options" : "/ask-ai";
      const { data } = await axios.get(`${BASE}${endpoint}`, {
        params: { prompt: userMsg }
      });
      setMessages(prev => [...prev, { role: "ai", text: data }]);
    } catch {
      setError("Failed to get response. Make sure the backend is running on port 8080.");
    } finally {
      setLoading(false);
    }
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); }
  };

  return (
    <div>
      <div className="page-title">
        <span className="accent">◈</span> Chat <span className="accent3">AI</span>
      </div>
      <p className="page-sub">// CONVERSATIONAL INTELLIGENCE</p>

      <div className="card">
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
          <span className="tag tag-cyan">GPT-4o</span>
          <span className="tag tag-purple">gpt-3.5-turbo</span>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginLeft: "auto", cursor: "pointer", fontSize: "0.78rem", color: "var(--text2)" }}>
            <input
              type="checkbox"
              checked={useOptions}
              onChange={e => setUseOptions(e.target.checked)}
              style={{ accentColor: "var(--accent)" }}
            />
            Use GPT-4o + options
          </label>
        </div>

        <div className="messages">
          {messages.map((msg, i) => (
            <div key={i} className={`msg ${msg.role}`}>
              <div className="msg-avatar">
                {msg.role === "user" ? "U" : "AI"}
              </div>
              <div className="msg-bubble">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="msg ai">
              <div className="msg-avatar">AI</div>
              <div className="msg-bubble">
                <div className="loading">
                  <div className="dot" /><div className="dot" /><div className="dot" />
                  <span>Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {error && <div className="error">{error}</div>}

        <div className="chat-input-row">
          <input
            className="input"
            placeholder="Ask anything..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            disabled={loading}
          />
          <button className="btn btn-primary" onClick={send} disabled={loading || !input.trim()}>
            Send →
          </button>
        </div>

        <div style={{ marginTop: "0.75rem", display: "flex", gap: "0.5rem" }}>
          <button className="btn btn-secondary" onClick={() => setMessages([{ role: "ai", text: "Hello! I'm your AI assistant. Ask me anything." }])} style={{ fontSize: "0.72rem", padding: "0.45rem 0.9rem" }}>
            Clear chat
          </button>
        </div>
      </div>
    </div>
  );
}
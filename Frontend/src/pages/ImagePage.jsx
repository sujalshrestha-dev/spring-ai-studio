import { useState } from "react";
import axios from "axios";

const BASE = "http://localhost:8080";

export default function ImagePage() {
  const [prompt, setPrompt] = useState("");
  const [quality, setQuality] = useState("hd");
  const [width, setWidth] = useState("1024");
  const [height, setHeight] = useState("1024");
  const [n, setN] = useState("1");
  const [model, setModel] = useState("gpt-image-1");
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const generate = async () => {
    if (!prompt.trim()) return;
    setError("");
    setImages([]);
    setLoading(true);

    try {
      const { data } = await axios.get(`${BASE}/generate-image`, {
        params: { prompt, quality, width, height, n, model }
      });
      setImages(data);
    } catch {
      setError("Image generation failed. Check your backend and OpenAI API key.");
    } finally {
      setLoading(false);
    }
  };

  const sizes = ["256", "512", "1024", "1792"];

  return (
    <div>
      <div className="page-title">
        <span className="accent2">◉</span> Image <span className="accent">Gen</span>
      </div>
      <p className="page-sub">// AI-POWERED IMAGE GENERATION</p>

      <div className="card">
        <div className="field">
          <label className="label">Prompt</label>
          <textarea
            className="textarea"
            placeholder="A futuristic city at night with neon lights and flying cars..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            style={{ minHeight: "100px" }}
          />
        </div>

        <div className="row3">
          <div className="field">
            <label className="label">Model</label>
            <select className="select" value={model} onChange={e => setModel(e.target.value)}>
              <option value="gpt-image-1">gpt-image-1</option>
              <option value="dall-e-3">dall-e-3</option>
              <option value="dall-e-2">dall-e-2</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Quality</label>
            <select className="select" value={quality} onChange={e => setQuality(e.target.value)}>
              <option value="hd">hd</option>
              <option value="standard">standard</option>
            </select>
          </div>
          <div className="field">
            <label className="label">Count (N)</label>
            <select className="select" value={n} onChange={e => setN(e.target.value)}>
              {[1,2,3,4].map(v => <option key={v} value={v}>{v}</option>)}
            </select>
          </div>
        </div>

        <div className="row">
          <div className="field">
            <label className="label">Width (px)</label>
            <select className="select" value={width} onChange={e => setWidth(e.target.value)}>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="field">
            <label className="label">Height (px)</label>
            <select className="select" value={height} onChange={e => setHeight(e.target.value)}>
              {sizes.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn btn-primary" onClick={generate} disabled={loading || !prompt.trim()}>
          {loading ? "Generating..." : "Generate Image →"}
        </button>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: "center", padding: "2.5rem" }}>
          <div className="loading" style={{ justifyContent: "center", marginBottom: "0.75rem" }}>
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text3)" }}>Generating your image, this may take a moment...</span>
        </div>
      )}

      {images.length > 0 && (
        <div className="card">
          <div className="response-label">Generated Images</div>
          <div className="image-grid">
            {images.map((url, i) => (
              <div key={i} className="image-card">
                {url ? (
                  <img src={url} alt={`Generated ${i + 1}`} />
                ) : (
                  <div className="image-placeholder">No URL returned</div>
                )}
              </div>
            ))}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
            {images.map((url, i) => url && (
              <a key={i} href={url} target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ fontSize: "0.72rem", padding: "0.45rem 0.9rem" }}>
                Open #{i + 1} ↗
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
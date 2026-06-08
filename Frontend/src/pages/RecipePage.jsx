import { useState } from "react";
import axios from "axios";

const BASE = "http://localhost:8080";

const CUISINES = ["any", "Italian", "Japanese", "Indian", "Mexican", "Chinese", "French", "Thai", "Mediterranean", "American", "Korean", "Middle Eastern"];
const RESTRICTIONS = ["Vegetarian", "Vegan", "Gluten-free", "Dairy-free", "Nut-free", "Keto", "Paleo", "Low-carb", "Halal", "Kosher"];

export default function RecipePage() {
  const [ingredients, setIngredients] = useState("");
  const [cuisine, setCuisine] = useState("any");
  const [selected, setSelected] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const toggleRestriction = (r) => {
    setSelected(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
  };

  const generate = async () => {
    if (!ingredients.trim()) return;
    setError("");
    setRecipe("");
    setLoading(true);

    try {
      const { data } = await axios.get(`${BASE}/create-recipe`, {
        params: {
          ingredients: ingredients.trim(),
          cuisine,
          dietaryRestrictions: selected.join(", ")
        }
      });
      setRecipe(data);
    } catch {
      setError("Failed to generate recipe. Make sure the backend is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="page-title">
        <span className="accent3">◍</span> Recipe <span className="accent2">AI</span>
      </div>
      <p className="page-sub">// INTELLIGENT RECIPE GENERATION</p>

      <div className="card">
        <div className="field">
          <label className="label">Ingredients *</label>
          <input
            className="input"
            placeholder="chicken, garlic, lemon, olive oil, rosemary..."
            value={ingredients}
            onChange={e => setIngredients(e.target.value)}
          />
          <div style={{ fontSize: "0.7rem", color: "var(--text3)", marginTop: "0.4rem" }}>
            Separate with commas
          </div>
        </div>

        <div className="field">
          <label className="label">Cuisine Type</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {CUISINES.map(c => (
              <button
                key={c}
                className={`tag ${cuisine === c ? "tag-cyan" : ""}`}
                style={{
                  cursor: "pointer",
                  border: cuisine === c ? "1px solid rgba(0,229,255,0.3)" : "1px solid var(--border)",
                  background: cuisine === c ? "rgba(0,229,255,0.08)" : "transparent",
                  color: cuisine === c ? "var(--accent)" : "var(--text2)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontFamily: "inherit",
                  transition: "all 0.15s"
                }}
                onClick={() => setCuisine(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="field">
          <label className="label">Dietary Restrictions</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {RESTRICTIONS.map(r => (
              <button
                key={r}
                style={{
                  cursor: "pointer",
                  border: selected.includes(r) ? "1px solid rgba(162,89,255,0.3)" : "1px solid var(--border)",
                  background: selected.includes(r) ? "rgba(162,89,255,0.08)" : "transparent",
                  color: selected.includes(r) ? "var(--accent3)" : "var(--text2)",
                  padding: "0.35rem 0.75rem",
                  borderRadius: "8px",
                  fontSize: "0.75rem",
                  fontFamily: "inherit",
                  transition: "all 0.15s"
                }}
                onClick={() => toggleRestriction(r)}
              >
                {selected.includes(r) ? "✓ " : ""}{r}
              </button>
            ))}
          </div>
          {selected.length > 0 && (
            <div style={{ fontSize: "0.7rem", color: "var(--text3)", marginTop: "0.5rem" }}>
              Selected: {selected.join(", ")}
            </div>
          )}
        </div>

        {error && <div className="error">{error}</div>}

        <button className="btn btn-primary" onClick={generate} disabled={loading || !ingredients.trim()}>
          {loading ? "Creating recipe..." : "Create Recipe →"}
        </button>
      </div>

      {loading && (
        <div className="card" style={{ textAlign: "center", padding: "2.5rem" }}>
          <div className="loading" style={{ justifyContent: "center", marginBottom: "0.75rem" }}>
            <div className="dot" /><div className="dot" /><div className="dot" />
          </div>
          <span style={{ fontSize: "0.78rem", color: "var(--text3)" }}>Crafting your perfect recipe...</span>
        </div>
      )}

      {recipe && (
        <div className="card">
          <div className="response-label">
            <span className="accent3">◍</span> Your Recipe
            {cuisine !== "any" && <span className="tag tag-cyan" style={{ marginLeft: "0.75rem" }}>{cuisine}</span>}
            {selected.map(r => <span key={r} className="tag tag-purple" style={{ marginLeft: "0.4rem" }}>{r}</span>)}
          </div>
          <div className="response-box has-content" style={{ maxHeight: "600px", overflowY: "auto" }}>
            {recipe}
          </div>
          <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <button
              className="btn btn-secondary"
              style={{ fontSize: "0.72rem", padding: "0.45rem 0.9rem" }}
              onClick={() => navigator.clipboard.writeText(recipe)}
            >
              Copy Recipe
            </button>
            <button
              className="btn btn-secondary"
              style={{ fontSize: "0.72rem", padding: "0.45rem 0.9rem" }}
              onClick={() => setRecipe("")}
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
import { type Product } from "../data/mockData";
import { type Page } from "../App";

interface CompareProps {
  compareList: Product[];
  onNavigate: (page: Page) => void;
  onAddCart: (product: Product) => void;
  cartItems: Product[];
}

function pick(a: string, b: string, preferHigher = true): "a" | "b" | "tie" {
  const numA = parseFloat(a.replace(/[^0-9.]/g, ""));
  const numB = parseFloat(b.replace(/[^0-9.]/g, ""));
  if (isNaN(numA) || isNaN(numB)) return "tie";
  if (numA === numB) return "tie";
  return (numA > numB) === preferHigher ? "a" : "b";
}

export default function Compare({ compareList, onNavigate, onAddCart, cartItems }: CompareProps) {
  if (compareList.length < 2) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8" style={{ background: "var(--background)" }}>
        <div className="text-6xl">⚖️</div>
        <div className="text-center">
          <h2 className="font-display text-2xl font-bold mb-2" style={{ color: "var(--foreground)" }}>No Products Selected</h2>
          <p className="text-sm mb-6" style={{ color: "var(--muted-foreground)" }}>
            Select at least 2 products from the shopping page to compare them.
          </p>
          <button
            onClick={() => onNavigate("shopping")}
            className="px-6 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
          >
            Go to Shopping →
          </button>
        </div>
      </div>
    );
  }

  const [a, b] = compareList;

  const allSpecKeys = Array.from(new Set([...Object.keys(a.specs), ...Object.keys(b.specs)]));

  const priceWinner = pick(`${a.price}`, `${b.price}`, false);
  const ratingWinner = pick(`${a.rating}`, `${b.rating}`);
  const matchWinner = a.aiMatch > b.aiMatch ? "a" : a.aiMatch < b.aiMatch ? "b" : "tie";

  const aWins = [priceWinner === "a", ratingWinner === "a", matchWinner === "a"].filter(Boolean).length;
  const bWins = [priceWinner === "b", ratingWinner === "b", matchWinner === "b"].filter(Boolean).length;
  const winner = aWins > bWins ? a : b;

  const highlight = (val: "a" | "b" | "tie", side: "a" | "b") => {
    if (val === "tie") return {};
    if (val === side) return { color: "#10b981", fontWeight: "700" };
    return { color: "var(--muted-foreground)" };
  };

  const isInCart = (p: Product) => cartItems.some(c => c.id === p.id);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Product Comparison</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Side-by-side comparison powered by AI analysis</p>
        </div>

        {/* Product Headers */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div />
          {[a, b].map((p, i) => (
            <div key={p.id} className="p-5 rounded-2xl text-center" style={{ background: "var(--card)", border: `2px solid ${i === 0 ? "#6366f1" : "var(--border)"}` }}>
              <div className="relative h-36 rounded-xl overflow-hidden mb-4" style={{ background: "var(--muted)" }}>
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                {i === 0 && <div className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "#6366f1", color: "#fff" }}>A</div>}
                {i === 1 && <div className="absolute top-2 left-2 text-xs px-2 py-0.5 rounded-full font-bold" style={{ background: "var(--muted-foreground)", color: "#fff" }}>B</div>}
              </div>
              <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>{p.brand}</div>
              <h3 className="font-display font-bold text-sm mb-2 leading-tight" style={{ color: "var(--foreground)" }}>{p.name}</h3>
              <div className="font-display font-bold text-xl mb-1 gradient-text">₹{p.price.toLocaleString("en-IN")}</div>
              <div className="flex items-center justify-center gap-1 text-xs">
                <span className="text-yellow-400">{"★".repeat(Math.floor(p.rating))}</span>
                <span style={{ color: "var(--foreground)" }}>{p.rating}</span>
              </div>
              <button
                onClick={() => onAddCart(p)}
                disabled={isInCart(p)}
                className="mt-4 w-full py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-50"
                style={{ background: isInCart(p) ? "var(--muted)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: isInCart(p) ? "var(--muted-foreground)" : "#fff" }}
              >
                {isInCart(p) ? "In Cart ✓" : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>

        {/* Key Stats */}
        <div className="p-5 rounded-2xl mb-5" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h3 className="font-display font-semibold text-sm mb-4" style={{ color: "var(--muted-foreground)" }}>KEY METRICS</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: "Price", a: `₹${a.price.toLocaleString("en-IN")}`, b: `₹${b.price.toLocaleString("en-IN")}`, winner: priceWinner, note: "Lower is better" },
              { label: "Rating", a: `${a.rating} / 5`, b: `${b.rating} / 5`, winner: ratingWinner, note: "Higher is better" },
              { label: "AI Match", a: `${a.aiMatch}%`, b: `${b.aiMatch}%`, winner: matchWinner, note: "For your query" },
            ].map(row => (
              <div key={row.label}>
                <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>{row.label}</div>
                <div className="flex gap-4">
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>A</div>
                    <div className="text-sm font-bold" style={highlight(row.winner, "a")}>{row.a}</div>
                  </div>
                  <div>
                    <div className="text-xs mb-0.5" style={{ color: "var(--muted-foreground)" }}>B</div>
                    <div className="text-sm font-bold" style={highlight(row.winner, "b")}>{row.b}</div>
                  </div>
                </div>
                <div className="text-xs mt-1" style={{ color: "var(--muted-foreground)" }}>{row.note}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Full Spec Comparison */}
        <div className="rounded-2xl overflow-hidden mb-6" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="grid grid-cols-3 gap-0">
            <div className="px-5 py-3 font-semibold text-xs uppercase tracking-wider" style={{ color: "var(--muted-foreground)", background: "var(--muted)" }}>Specification</div>
            <div className="px-5 py-3 font-semibold text-xs uppercase tracking-wider text-center" style={{ color: "#6366f1", background: "var(--muted)" }}>Product A · {a.name.split(" ").slice(0, 2).join(" ")}</div>
            <div className="px-5 py-3 font-semibold text-xs uppercase tracking-wider text-center" style={{ color: "var(--muted-foreground)", background: "var(--muted)" }}>Product B · {b.name.split(" ").slice(0, 2).join(" ")}</div>
          </div>
          {allSpecKeys.map((key, i) => (
            <div key={key} className="grid grid-cols-3 gap-0 border-t" style={{ borderColor: "var(--border)", background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,0.02)" }}>
              <div className="px-5 py-3 text-sm" style={{ color: "var(--muted-foreground)" }}>{key}</div>
              <div className="px-5 py-3 text-sm text-center font-medium" style={{ color: a.specs[key] ? "var(--foreground)" : "var(--muted-foreground)" }}>
                {a.specs[key] || "—"}
              </div>
              <div className="px-5 py-3 text-sm text-center font-medium" style={{ color: b.specs[key] ? "var(--foreground)" : "var(--muted-foreground)" }}>
                {b.specs[key] || "—"}
              </div>
            </div>
          ))}
        </div>

        {/* AI Recommendation */}
        <div className="p-6 rounded-2xl gradient-border" style={{ background: "rgba(99,102,241,0.06)" }}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>🧠</div>
            <div>
              <div className="font-display font-bold text-base" style={{ color: "var(--foreground)" }}>AI Recommendation</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Based on your requirements and specifications</div>
            </div>
          </div>
          <div className="p-4 rounded-xl mb-4 text-sm leading-relaxed" style={{ background: "rgba(99,102,241,0.1)", color: "#c4b5fd" }}>
            <strong style={{ color: "#a78bfa" }}>{winner.name}</strong> is the better choice for your requirements.
            {winner.id === a.id
              ? ` It offers higher AI compatibility (${a.aiMatch}% vs ${b.aiMatch}%), better rating (${a.rating} vs ${b.rating}), and superior ${Object.keys(a.specs)[2]?.toLowerCase() || "specifications"} while ${a.price < b.price ? "being more affordable" : "delivering premium value"}.`
              : ` It provides a ${b.aiMatch > a.aiMatch ? `higher AI match (${b.aiMatch}%)` : `better value at ₹${b.price.toLocaleString("en-IN")}`} and ${b.rating >= a.rating ? `stronger user satisfaction (${b.rating}★)` : "solid overall performance"} for your use case.`
            }
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onAddCart(winner)}
              disabled={isInCart(winner)}
              className="flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
              style={{ background: isInCart(winner) ? "var(--muted)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: isInCart(winner) ? "var(--muted-foreground)" : "#fff" }}
            >
              {isInCart(winner) ? "Added to Cart ✓" : `Add ${winner.name.split(" ").slice(0, 2).join(" ")} to Cart`}
            </button>
            <button
              onClick={() => onNavigate("shopping")}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              Back to Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

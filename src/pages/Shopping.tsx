import { useState, useEffect } from "react";
import { products, aiUnderstandingExamples, type Product } from "../data/mockData";
import { type Page } from "../App";

interface ShoppingProps {
  onNavigate: (page: Page) => void;
  onProductsFound: (products: Product[], query: string) => void;
  compareList: Product[];
  onAddCompare: (product: Product) => void;
  onAddCart: (product: Product) => void;
  cartItems: Product[];
}

const quickSuggestions = [
  { label: "Best laptop for coding", query: "Find me a laptop for coding under ₹70,000 with good battery life", category: "laptop" },
  { label: "Headphones under ₹5,000", query: "Find headphones under ₹5,000 with good sound quality", category: "headphones" },
  { label: "Smartphone for photography", query: "Best smartphone for photography and content creation", category: "smartphone" },
  { label: "Best laptop for students", query: "Affordable laptop for students under ₹65,000", category: "laptop" },
];

const agentSteps = [
  { id: "understanding", label: "Customer Understanding Agent", desc: "Analyzing your requirements and extracting intent...", icon: "💡", delay: 0 },
  { id: "discovery", label: "Product Discovery Agent", desc: "Searching relevant products from catalog...", icon: "🔍", delay: 1000 },
  { id: "recommendation", label: "Recommendation Agent", desc: "Ranking products based on your preferences...", icon: "✨", delay: 2000 },
  { id: "assistant", label: "Commerce Assistant", desc: "Preparing personalized recommendations...", icon: "🤝", delay: 3000 },
];

function detectCategory(query: string): string {
  const q = query.toLowerCase();
  if (q.includes("laptop") || q.includes("notebook") || q.includes("macbook")) return "laptop";
  if (q.includes("headphone") || q.includes("earphone") || q.includes("audio")) return "headphones";
  if (q.includes("phone") || q.includes("smartphone") || q.includes("mobile")) return "smartphone";
  if (q.includes("watch") || q.includes("smartwatch")) return "smartwatch";
  return "laptop";
}

function getFilteredProducts(query: string): Product[] {
  const category = detectCategory(query);
  const catMap: Record<string, string> = { laptop: "Laptop", headphones: "Headphones", smartphone: "Smartphone", smartwatch: "Smartwatch" };
  const filtered = products.filter(p => p.category === catMap[category]);
  return filtered.sort((a, b) => b.aiMatch - a.aiMatch);
}

export default function Shopping({ onNavigate, onProductsFound, compareList, onAddCompare, onAddCart, cartItems }: ShoppingProps) {
  const [query, setQuery] = useState("");
  const [agentStatus, setAgentStatus] = useState<Record<string, "idle" | "running" | "done">>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [understanding, setUnderstanding] = useState<null | { category: string; budget: string; useCase: string; priorities: string[] }>(null);
  const [results, setResults] = useState<Product[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = (q: string = query) => {
    if (!q.trim()) return;
    setQuery(q);
    setIsProcessing(true);
    setHasSearched(true);
    setAgentStatus({});
    setResults([]);
    setUnderstanding(null);

    const category = detectCategory(q);
    const understood = aiUnderstandingExamples[category] || aiUnderstandingExamples.laptop;

    agentSteps.forEach((step, i) => {
      setTimeout(() => {
        setAgentStatus(prev => ({ ...prev, [step.id]: "running" }));
        setTimeout(() => {
          setAgentStatus(prev => ({ ...prev, [step.id]: "done" }));
          if (i === 1) setUnderstanding(understood);
          if (i === agentSteps.length - 1) {
            const found = getFilteredProducts(q);
            setResults(found);
            setIsProcessing(false);
            onProductsFound(found, q);
          }
        }, 800);
      }, step.delay);
    });
  };

  const isInCompare = (p: Product) => compareList.some(c => c.id === p.id);
  const isInCart = (p: Product) => cartItems.some(c => c.id === p.id);

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>
            How can I help you shop today?
          </h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>
            Describe what you're looking for and our AI agents will find the perfect match
          </p>
        </div>

        {/* Search Box */}
        <div className="mb-6">
          <div className="relative rounded-2xl overflow-hidden" style={{ background: "var(--card)", border: "2px solid var(--border)" }}>
            <textarea
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSearch(); } }}
              placeholder="Find me a laptop for coding under ₹70,000 with good battery life..."
              rows={3}
              className="w-full px-5 pt-4 pb-3 bg-transparent text-base resize-none outline-none"
              style={{ color: "var(--foreground)" }}
            />
            <div className="flex items-center justify-between px-5 py-3 border-t" style={{ borderColor: "var(--border)" }}>
              <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>Press Enter to search · Shift+Enter for new line</span>
              <button
                onClick={() => handleSearch()}
                disabled={isProcessing || !query.trim()}
                className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90 disabled:opacity-40"
                style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
              >
                {isProcessing ? "Searching..." : "Search with AI →"}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Suggestions */}
        {!hasSearched && (
          <div className="flex flex-wrap gap-3 mb-8">
            {quickSuggestions.map((s) => (
              <button
                key={s.label}
                onClick={() => handleSearch(s.query)}
                className="px-4 py-2 rounded-xl text-sm font-medium transition-all hover:border-indigo-500"
                style={{ background: "var(--card)", border: "1px solid var(--border)", color: "var(--muted-foreground)" }}
              >
                {s.label}
              </button>
            ))}
          </div>
        )}

        {/* Agent Activity + Understanding */}
        {hasSearched && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Agent Activity Panel */}
            <div className="lg:col-span-2 p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <h2 className="font-display font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <span className="text-lg">🤖</span> AI Agent Activity
              </h2>
              <div className="space-y-3">
                {agentSteps.map((step) => {
                  const status = agentStatus[step.id] || "idle";
                  return (
                    <div key={step.id} className="flex items-start gap-3 p-3 rounded-xl transition-all" style={{
                      background: status === "done" ? "rgba(99,102,241,0.08)" : status === "running" ? "rgba(99,102,241,0.04)" : "transparent"
                    }}>
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs shrink-0 mt-0.5 transition-all" style={{
                        background: status === "done" ? "#6366f1" : status === "running" ? "rgba(99,102,241,0.3)" : "var(--muted)",
                        color: status === "done" ? "#fff" : "var(--muted-foreground)"
                      }}>
                        {status === "done" ? "✓" : status === "running" ? <span className="animate-spin-slow">⟳</span> : "○"}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium" style={{ color: status !== "idle" ? "var(--foreground)" : "var(--muted-foreground)" }}>
                            {step.icon} {step.label}
                          </span>
                          {status === "running" && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono-data" style={{ background: "rgba(99,102,241,0.15)", color: "#6366f1" }}>Running</span>
                          )}
                          {status === "done" && (
                            <span className="text-xs px-2 py-0.5 rounded-full font-mono-data" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>Done</span>
                          )}
                        </div>
                        <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>{step.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* AI Understanding Panel */}
            <div className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <h2 className="font-display font-semibold text-base mb-4 flex items-center gap-2" style={{ color: "var(--foreground)" }}>
                <span className="text-lg">💡</span> AI Understanding
              </h2>
              {understanding ? (
                <div className="space-y-4 animate-fade-in-up">
                  {[
                    { label: "Category", value: understanding.category },
                    { label: "Budget", value: understanding.budget },
                    { label: "Use Case", value: understanding.useCase },
                  ].map(item => (
                    <div key={item.label}>
                      <div className="text-xs font-medium mb-1" style={{ color: "var(--muted-foreground)" }}>{item.label}</div>
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{item.value}</div>
                    </div>
                  ))}
                  <div>
                    <div className="text-xs font-medium mb-2" style={{ color: "var(--muted-foreground)" }}>Priorities</div>
                    <div className="flex flex-wrap gap-1.5">
                      {understanding.priorities.map(p => (
                        <span key={p} className="text-xs px-2.5 py-1 rounded-lg font-medium" style={{ background: "rgba(99,102,241,0.12)", color: "#a78bfa" }}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 mt-2 pt-3 border-t" style={{ borderColor: "var(--border)" }}>
                    <span className="text-green-400 text-sm">✓</span>
                    <span className="text-xs font-medium text-green-400">Intent successfully understood</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {[60, 80, 45, 90].map((w, i) => (
                    <div key={i} className="h-3 rounded-full" style={{ width: `${w}%`, background: "var(--muted)" }} />
                  ))}
                  <p className="text-xs" style={{ color: "var(--muted-foreground)" }}>Analyzing your query...</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results */}
        {results.length > 0 && (
          <div className="animate-fade-in-up">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="font-display font-bold text-xl" style={{ color: "var(--foreground)" }}>Personalized Recommendations</h2>
                <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>{results.length} products found · Ranked by AI match</p>
              </div>
              {compareList.length >= 2 && (
                <button
                  onClick={() => onNavigate("compare")}
                  className="px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                >
                  Compare ({compareList.length}) →
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {results.map((product, idx) => (
                <div
                  key={product.id}
                  className="rounded-2xl overflow-hidden hover-lift animate-fade-in-up"
                  style={{ background: "var(--card)", border: "1px solid var(--border)", animationDelay: `${idx * 80}ms` }}
                >
                  <div className="relative h-44 overflow-hidden" style={{ background: "var(--muted)" }}>
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold" style={{ background: "rgba(99,102,241,0.9)", color: "#fff" }}>
                      {product.aiMatch}% Match
                    </div>
                    {idx === 0 && (
                      <div className="absolute top-3 left-3 px-2 py-0.5 rounded-full text-xs font-bold" style={{ background: "#10b981", color: "#fff" }}>Best Pick</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="text-xs font-medium mb-0.5" style={{ color: "var(--muted-foreground)" }}>{product.brand}</div>
                        <h3 className="font-display font-semibold text-sm leading-tight" style={{ color: "var(--foreground)" }}>{product.name}</h3>
                      </div>
                      <div className="text-right shrink-0 ml-2">
                        <div className="font-display font-bold text-base" style={{ color: "var(--foreground)" }}>₹{product.price.toLocaleString("en-IN")}</div>
                        {product.originalPrice && (
                          <div className="text-xs line-through" style={{ color: "var(--muted-foreground)" }}>₹{product.originalPrice.toLocaleString("en-IN")}</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mb-3">
                      <span className="text-yellow-400 text-xs">{"★".repeat(Math.floor(product.rating))}</span>
                      <span className="text-xs font-medium" style={{ color: "var(--foreground)" }}>{product.rating}</span>
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>({product.reviews.toLocaleString()})</span>
                    </div>

                    {/* AI Match Bar */}
                    <div className="mb-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span style={{ color: "var(--muted-foreground)" }}>AI Match</span>
                        <span style={{ color: "#6366f1" }}>{product.aiMatch}%</span>
                      </div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "var(--muted)" }}>
                        <div className="match-bar h-full rounded-full transition-all duration-700" style={{ width: `${product.aiMatch}%` }} />
                      </div>
                    </div>

                    {/* Key Specs */}
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1 mb-3">
                      {Object.entries(product.specs).slice(0, 4).map(([k, v]) => (
                        <div key={k}>
                          <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{k}</div>
                          <div className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>{v}</div>
                        </div>
                      ))}
                    </div>

                    {/* Why recommended */}
                    <div className="p-2.5 rounded-xl mb-4 text-xs leading-relaxed" style={{ background: "rgba(99,102,241,0.08)", color: "#a78bfa" }}>
                      <span className="font-semibold">Why recommended: </span>{product.whyRecommended}
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => onAddCart(product)}
                        disabled={isInCart(product)}
                        className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90 disabled:opacity-60"
                        style={{ background: isInCart(product) ? "var(--muted)" : "linear-gradient(135deg, #6366f1, #8b5cf6)", color: isInCart(product) ? "var(--muted-foreground)" : "#fff" }}
                      >
                        {isInCart(product) ? "In Cart ✓" : "Add to Cart"}
                      </button>
                      <button
                        onClick={() => onAddCompare(product)}
                        disabled={isInCompare(product) || (compareList.length >= 2 && !isInCompare(product))}
                        className="px-3 py-2 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: isInCompare(product) ? "rgba(99,102,241,0.2)" : "var(--secondary)",
                          color: isInCompare(product) ? "#6366f1" : "var(--foreground)",
                          border: `1px solid ${isInCompare(product) ? "#6366f1" : "var(--border)"}`
                        }}
                      >
                        {isInCompare(product) ? "✓ Compare" : "Compare"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {compareList.length >= 2 && (
              <div className="mt-6 p-4 rounded-2xl flex items-center justify-between" style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.3)" }}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">⚖️</span>
                  <div>
                    <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>Ready to compare {compareList.length} products</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{compareList.map(p => p.name).join(" vs. ")}</div>
                  </div>
                </div>
                <button
                  onClick={() => onNavigate("compare")}
                  className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
                >
                  Compare Now →
                </button>
              </div>
            )}
          </div>
        )}

        {/* Empty state */}
        {!hasSearched && (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🛍️</div>
            <h3 className="font-display text-xl font-semibold mb-2" style={{ color: "var(--foreground)" }}>AI-Powered Product Discovery</h3>
            <p className="text-sm max-w-sm mx-auto" style={{ color: "var(--muted-foreground)" }}>
              Type your requirements in natural language and our AI agents will find the perfect products for you.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

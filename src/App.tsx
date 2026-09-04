import { useState } from "react";
import Landing from "./pages/Landing";
import Shopping from "./pages/Shopping";
import Compare from "./pages/Compare";
import Agents from "./pages/Agents";
import Dashboard from "./pages/Dashboard";
import CustomerJourney from "./pages/CustomerJourney";
import Sidebar from "./components/Sidebar";
import { type Product } from "./data/mockData";

export type Page = "landing" | "shopping" | "recommendations" | "compare" | "agents" | "dashboard" | "journey";

export default function App() {
  const [page, setPage] = useState<Page>("landing");
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);
  const [cartItems, setCartItems] = useState<Product[]>([]);
  const [lastQuery, setLastQuery] = useState("");
  const [cartToast, setCartToast] = useState<string | null>(null);

  const navigate = (p: Page) => setPage(p);

  const handleProductsFound = (products: Product[], query: string) => {
    setFoundProducts(products);
    setLastQuery(query);
  };

  const handleAddCompare = (product: Product) => {
    setCompareList(prev => {
      if (prev.some(p => p.id === product.id)) return prev.filter(p => p.id !== product.id);
      if (prev.length >= 2) return [prev[1], product];
      return [...prev, product];
    });
  };

  const handleAddCart = (product: Product) => {
    setCartItems(prev => {
      if (prev.some(p => p.id === product.id)) return prev;
      return [...prev, product];
    });
    setCartToast(product.name);
    setTimeout(() => setCartToast(null), 3000);
  };

  if (page === "landing") {
    return <Landing onNavigate={navigate} />;
  }

  return (
    <div className="flex h-full overflow-hidden">
      <Sidebar currentPage={page} onNavigate={navigate} />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="flex items-center justify-between px-6 py-3.5 shrink-0" style={{ background: "var(--card)", borderBottom: "1px solid var(--border)" }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("landing")}
              className="text-xs font-medium transition-colors hover:text-white"
              style={{ color: "var(--muted-foreground)" }}
            >
              ← Home
            </button>
            <span style={{ color: "var(--border)" }}>|</span>
            <div>
              <span className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>
                {{
                  shopping: "AI Shopping Assistant",
                  recommendations: "Recommendations",
                  compare: "Compare Products",
                  agents: "AI Agent Network",
                  dashboard: "Growth Intelligence",
                  journey: "Customer Journey",
                }[page]}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {compareList.length > 0 && (
              <button
                onClick={() => navigate("compare")}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all hover:opacity-90"
                style={{ background: "rgba(99,102,241,0.15)", color: "#a78bfa", border: "1px solid rgba(99,102,241,0.3)" }}
              >
                ⚖️ Compare ({compareList.length})
              </button>
            )}
            {cartItems.length > 0 && (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>
                🛒 Cart ({cartItems.length})
              </div>
            )}
            <div className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#10b981" }} />
            <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>5 Agents Online</span>
          </div>
        </header>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {page === "shopping" && (
            <Shopping
              onNavigate={navigate}
              onProductsFound={handleProductsFound}
              compareList={compareList}
              onAddCompare={handleAddCompare}
              onAddCart={handleAddCart}
              cartItems={cartItems}
            />
          )}
          {page === "recommendations" && (
            <Shopping
              onNavigate={navigate}
              onProductsFound={handleProductsFound}
              compareList={compareList}
              onAddCompare={handleAddCompare}
              onAddCart={handleAddCart}
              cartItems={cartItems}
            />
          )}
          {page === "compare" && (
            <Compare
              compareList={compareList}
              onNavigate={navigate}
              onAddCart={handleAddCart}
              cartItems={cartItems}
            />
          )}
          {page === "agents" && <Agents />}
          {page === "dashboard" && <Dashboard />}
          {page === "journey" && <CustomerJourney />}
        </div>
      </div>

      {/* Cart Toast */}
      {cartToast && (
        <div
          className="fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium animate-slide-in"
          style={{ background: "var(--card)", border: "1px solid rgba(16,185,129,0.4)", boxShadow: "0 8px 32px rgba(0,0,0,0.4)", color: "var(--foreground)", zIndex: 999 }}
        >
          <span className="text-green-400 text-base">✓</span>
          <span><strong>{cartToast.slice(0, 30)}{cartToast.length > 30 ? "…" : ""}</strong> added to cart</span>
        </div>
      )}
    </div>
  );
}

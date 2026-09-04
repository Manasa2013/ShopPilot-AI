import { type Page } from "../App";

interface SidebarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const navItems = [
  { id: "dashboard" as Page, label: "Growth Intelligence", icon: "📊" },
  { id: "shopping" as Page, label: "AI Shopping", icon: "🛍️" },
  { id: "recommendations" as Page, label: "Recommendations", icon: "✨" },
  { id: "compare" as Page, label: "Compare Products", icon: "⚖️" },
  { id: "agents" as Page, label: "AI Agents", icon: "🤖" },
  { id: "journey" as Page, label: "Customer Journey", icon: "🗺️" },
];

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  return (
    <aside className="w-64 shrink-0 h-full flex flex-col" style={{ background: "var(--card)", borderRight: "1px solid var(--border)" }}>
      <div className="p-6 border-b" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center text-lg" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>
            🛒
          </div>
          <div>
            <div className="font-display font-bold text-base" style={{ color: "var(--foreground)" }}>ShopPilot AI</div>
            <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Commerce Platform</div>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 text-left"
            style={{
              background: currentPage === item.id ? "rgba(99,102,241,0.15)" : "transparent",
              color: currentPage === item.id ? "#6366f1" : "var(--muted-foreground)",
              borderLeft: currentPage === item.id ? "2px solid #6366f1" : "2px solid transparent"
            }}
          >
            <span className="text-base">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t" style={{ borderColor: "var(--border)" }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl" style={{ background: "var(--muted)" }}>
          <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}>
            A
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-xs font-medium truncate" style={{ color: "var(--foreground)" }}>Admin User</div>
            <div className="text-xs truncate" style={{ color: "var(--muted-foreground)" }}>admin@shoppilot.ai</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

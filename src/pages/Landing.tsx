import { type Page } from "../App";

interface LandingProps {
  onNavigate: (page: Page) => void;
}

const agentFlow = [
  { label: "Customer", icon: "👤", desc: "Submits shopping query" },
  { label: "AI Orchestrator", icon: "🧠", desc: "Routes to specialized agents" },
  { label: "Understanding Agent", icon: "💡", desc: "Extracts intent & budget" },
  { label: "Discovery Agent", icon: "🔍", desc: "Finds matching products" },
  { label: "Recommendation Agent", icon: "✨", desc: "Ranks by relevance" },
  { label: "Commerce Assistant", icon: "🤝", desc: "Guides purchase decision" },
  { label: "Personalized Result", icon: "🎯", desc: "Tailored recommendations" },
];

const features = [
  { icon: "🧠", title: "Intent Understanding", desc: "AI extracts your exact needs, budget, and preferences from natural language." },
  { icon: "🔍", title: "Smart Discovery", desc: "Product agents scan thousands of items to surface the most relevant matches." },
  { icon: "⚖️", title: "AI Comparison", desc: "Side-by-side comparisons with AI-powered purchase recommendations." },
  { icon: "📊", title: "Growth Intelligence", desc: "Turn customer behavior into actionable business insights and revenue opportunities." },
  { icon: "🎯", title: "Personalization", desc: "Every interaction learns and adapts to deliver hyper-relevant experiences." },
  { icon: "🤖", title: "Multi-Agent Network", desc: "5 specialized AI agents working in concert for superior commerce outcomes." },
];

export default function Landing({ onNavigate }: LandingProps) {
  return (
    <div className="min-h-screen" style={{ background: "var(--background)" }}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4" style={{ background: "rgba(10,14,26,0.9)", borderBottom: "1px solid var(--border)", backdropFilter: "blur(12px)" }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base" style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)" }}>🛒</div>
          <span className="font-display font-bold text-lg gradient-text">ShopPilot AI</span>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          {["Products", "How It Works", "AI Agents", "Business Growth"].map((item) => (
            <a key={item} href="#" className="text-sm font-medium transition-colors hover:text-white" style={{ color: "var(--muted-foreground)" }}>{item}</a>
          ))}
        </nav>
        <button
          onClick={() => onNavigate("shopping")}
          className="px-5 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
          style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
        >
          Sign In
        </button>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: "radial-gradient(ellipse 80% 60% at 50% -10%, rgba(99,102,241,0.18) 0%, transparent 70%)"
        }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold mb-8" style={{ background: "rgba(99,102,241,0.12)", border: "1px solid rgba(99,102,241,0.3)", color: "#a78bfa" }}>
            <span className="w-2 h-2 rounded-full animate-pulse-dot" style={{ background: "#6366f1" }} />
            5 AI Agents Working Together
          </div>
          <h1 className="font-display text-5xl md:text-6xl font-extrabold leading-tight mb-6" style={{ color: "var(--foreground)" }}>
            Shop Smarter. Grow Faster.{" "}
            <span className="gradient-text">Powered by AI Agents.</span>
          </h1>
          <p className="text-lg md:text-xl leading-relaxed mb-10 max-w-2xl mx-auto" style={{ color: "var(--muted-foreground)" }}>
            ShopPilot AI transforms e-commerce with intelligent agents that understand customer intent, personalize product discovery, and turn shopping behavior into actionable growth insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate("shopping")}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all hover:opacity-90 hover-lift"
              style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 24px rgba(99,102,241,0.35)" }}
            >
              Start Shopping →
            </button>
            <button
              onClick={() => onNavigate("dashboard")}
              className="px-8 py-3.5 rounded-xl font-semibold text-base transition-all"
              style={{ background: "var(--secondary)", color: "var(--foreground)", border: "1px solid var(--border)" }}
            >
              View Business Insights
            </button>
          </div>
        </div>
      </section>

      {/* Agent Flow Visual */}
      <section className="pb-24 px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Multi-Agent AI Workflow</h2>
            <p className="text-base" style={{ color: "var(--muted-foreground)" }}>Specialized agents collaborate in real-time to deliver personalized commerce experiences</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-0">
            {agentFlow.map((step, i) => (
              <div key={step.label} className="flex flex-col md:flex-row items-center">
                <div className="flex flex-col items-center text-center p-5 rounded-2xl hover-lift cursor-default w-36" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                  <div className="text-2xl mb-2">{step.icon}</div>
                  <div className="text-xs font-semibold mb-1" style={{ color: "var(--foreground)" }}>{step.label}</div>
                  <div className="text-xs leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{step.desc}</div>
                </div>
                {i < agentFlow.length - 1 && (
                  <div className="flex items-center md:flex-col">
                    <div className="hidden md:block w-8 h-0.5 mx-1" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                    <span className="hidden md:block text-lg" style={{ color: "#6366f1" }}>▶</span>
                    <div className="md:hidden h-4 w-0.5 my-1" style={{ background: "linear-gradient(180deg, #6366f1, #8b5cf6)" }} />
                    <span className="md:hidden text-base" style={{ color: "#6366f1" }}>▼</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="pb-24 px-8" style={{ background: "var(--card)" }}>
        <div className="max-w-5xl mx-auto py-16">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl font-bold mb-3" style={{ color: "var(--foreground)" }}>Everything You Need to Win in Commerce</h2>
            <p className="text-base" style={{ color: "var(--muted-foreground)" }}>From customer intent to business growth, ShopPilot AI covers the entire commerce lifecycle</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div key={f.title} className="p-6 rounded-2xl hover-lift" style={{ background: "var(--muted)", border: "1px solid var(--border)" }}>
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-display font-semibold text-base mb-2" style={{ color: "var(--foreground)" }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-8 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.1) 0%, transparent 70%)" }} />
        <div className="relative max-w-2xl mx-auto">
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "var(--foreground)" }}>Ready to transform your commerce?</h2>
          <p className="text-base mb-8" style={{ color: "var(--muted-foreground)" }}>Join thousands of businesses using ShopPilot AI to understand customers and accelerate growth.</p>
          <button
            onClick={() => onNavigate("shopping")}
            className="px-10 py-4 rounded-xl font-semibold text-base transition-all hover:opacity-90 hover-lift"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff", boxShadow: "0 4px 32px rgba(99,102,241,0.4)" }}
          >
            Start Shopping for Free →
          </button>
        </div>
      </section>

      <footer className="border-t py-8 px-8 text-center text-sm" style={{ borderColor: "var(--border)", color: "var(--muted-foreground)" }}>
        © 2026 ShopPilot AI · Multi-Agent AI Commerce & Growth Platform
      </footer>
    </div>
  );
}

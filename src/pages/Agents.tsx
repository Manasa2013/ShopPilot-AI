const agents = [
  {
    id: 1,
    name: "Customer Understanding Agent",
    icon: "💡",
    color: "#6366f1",
    bg: "rgba(99,102,241,0.12)",
    purpose: "Extracts customer intent, budget, and preferences from natural language queries using NLP and context modeling.",
    capabilities: ["Intent classification", "Budget extraction", "Preference mapping", "Context understanding"],
    status: "Active",
    requests: "12,840"
  },
  {
    id: 2,
    name: "Product Discovery Agent",
    icon: "🔍",
    color: "#8b5cf6",
    bg: "rgba(139,92,246,0.12)",
    purpose: "Finds relevant products from the catalog by matching extracted customer requirements against product specifications.",
    capabilities: ["Semantic search", "Specification matching", "Category filtering", "Price range optimization"],
    status: "Active",
    requests: "10,920"
  },
  {
    id: 3,
    name: "Recommendation Agent",
    icon: "✨",
    color: "#a78bfa",
    bg: "rgba(167,139,250,0.12)",
    purpose: "Ranks and scores products according to customer requirements, computing AI match percentages for each result.",
    capabilities: ["Multi-factor ranking", "AI match scoring", "Preference weighting", "Personalized ordering"],
    status: "Active",
    requests: "9,410"
  },
  {
    id: 4,
    name: "Commerce Assistant",
    icon: "🤝",
    color: "#10b981",
    bg: "rgba(16,185,129,0.12)",
    purpose: "Answers customer questions and provides purchase guidance throughout the shopping journey with contextual responses.",
    capabilities: ["Q&A handling", "Purchase guidance", "Comparison insights", "Cart optimization"],
    status: "Active",
    requests: "7,280"
  },
  {
    id: 5,
    name: "Growth Intelligence Agent",
    icon: "📊",
    color: "#f59e0b",
    bg: "rgba(245,158,11,0.12)",
    purpose: "Analyzes customer behavior patterns and identifies business growth opportunities from aggregated shopping data.",
    capabilities: ["Behavior analysis", "Trend detection", "Revenue forecasting", "Action recommendations"],
    status: "Active",
    requests: "4,190"
  }
];

const flowSteps = [
  { label: "Customer", icon: "👤" },
  { label: "Orchestrator", icon: "🧠" },
  { label: "Specialized Agents", icon: "🤖", multi: true },
  { label: "Personalized Commerce", icon: "🎯" }
];

export default function Agents() {
  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="mb-10">
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>AI Agent Network</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>5 specialized agents working in concert to deliver personalized commerce experiences</p>
        </div>

        {/* Workflow Visual */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="font-display font-semibold text-sm uppercase tracking-wider mb-6" style={{ color: "var(--muted-foreground)" }}>Agent Orchestration Flow</h2>
          <div className="flex items-center justify-center gap-0 flex-wrap">
            {flowSteps.map((step, i) => (
              <div key={step.label} className="flex items-center">
                <div className="flex flex-col items-center text-center px-4 py-3 rounded-xl min-w-[100px]" style={{ background: "var(--muted)" }}>
                  <div className="text-2xl mb-1">{step.icon}</div>
                  <div className="text-xs font-semibold" style={{ color: "var(--foreground)" }}>{step.label}</div>
                  {step.multi && <div className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>5 agents</div>}
                </div>
                {i < flowSteps.length - 1 && (
                  <div className="flex items-center px-2">
                    <div className="h-0.5 w-8" style={{ background: "linear-gradient(90deg, #6366f1, #8b5cf6)" }} />
                    <span style={{ color: "#8b5cf6", fontSize: "12px" }}>▶</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 mb-8">
          {agents.map((agent) => (
            <div key={agent.id} className="p-5 rounded-2xl hover-lift" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0" style={{ background: agent.bg }}>
                  {agent.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-display font-bold text-sm leading-tight mb-1" style={{ color: "var(--foreground)" }}>{agent.name}</div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-0.5 rounded-full font-semibold" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>● {agent.status}</span>
                    <span className="text-xs font-mono-data" style={{ color: "var(--muted-foreground)" }}>{agent.requests} req/day</span>
                  </div>
                </div>
              </div>

              <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>{agent.purpose}</p>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--muted-foreground)" }}>Capabilities</div>
                <div className="flex flex-wrap gap-1.5">
                  {agent.capabilities.map(cap => (
                    <span key={cap} className="text-xs px-2 py-1 rounded-lg" style={{ background: agent.bg, color: agent.color }}>{cap}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: "Total Agent Requests", value: "44,640", icon: "⚡", color: "#6366f1" },
            { label: "Average Response Time", value: "1.2s", icon: "⏱️", color: "#10b981" },
            { label: "Accuracy Rate", value: "94.7%", icon: "🎯", color: "#f59e0b" },
            { label: "Uptime", value: "99.9%", icon: "🟢", color: "#8b5cf6" },
          ].map(stat => (
            <div key={stat.label} className="p-4 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
              <div className="text-xl mb-2">{stat.icon}</div>
              <div className="font-display font-bold text-xl mb-1" style={{ color: stat.color }}>{stat.value}</div>
              <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

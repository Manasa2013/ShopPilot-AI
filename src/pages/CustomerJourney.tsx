const journeySteps = [
  { stage: "Search", icon: "🔍", count: 89420, pct: 100, color: "#6366f1", desc: "Customers enter natural language queries" },
  { stage: "Product Discovery", icon: "📦", count: 62140, pct: 69.5, color: "#7c3aed", desc: "AI agents surface relevant products" },
  { stage: "Recommendation", icon: "✨", count: 41890, pct: 46.8, color: "#8b5cf6", desc: "Personalized results ranked by AI match" },
  { stage: "Comparison", icon: "⚖️", count: 24210, pct: 27.1, color: "#a78bfa", desc: "Customers compare shortlisted products" },
  { stage: "Cart", icon: "🛒", count: 14820, pct: 16.6, color: "#c4b5fd", desc: "Products added to cart" },
  { stage: "Purchase", icon: "✅", count: 8920, pct: 9.98, color: "#10b981", desc: "Successful transactions completed" },
];

export default function CustomerJourney() {
  const maxCount = journeySteps[0].count;

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-2" style={{ color: "var(--foreground)" }}>Customer Journey</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Full funnel analysis — from search to purchase — with AI-driven conversion insights</p>
        </div>

        {/* Funnel Visual */}
        <div className="p-6 rounded-2xl mb-8" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="font-display font-semibold text-base mb-6" style={{ color: "var(--foreground)" }}>Conversion Funnel</h2>
          <div className="space-y-3">
            {journeySteps.map((step, i) => {
              const dropOff = i > 0 ? ((journeySteps[i - 1].count - step.count) / journeySteps[i - 1].count * 100).toFixed(1) : null;
              return (
                <div key={step.stage}>
                  {dropOff && (
                    <div className="flex items-center gap-2 py-1 pl-4">
                      <div className="w-0.5 h-4" style={{ background: "var(--border)" }} />
                      <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>−{dropOff}% drop-off</span>
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <div className="w-36 text-right shrink-0">
                      <div className="text-sm font-semibold" style={{ color: "var(--foreground)" }}>{step.stage}</div>
                      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{step.count.toLocaleString()}</div>
                    </div>
                    <div className="flex-1 relative h-10 rounded-xl overflow-hidden" style={{ background: "var(--muted)" }}>
                      <div
                        className="h-full rounded-xl flex items-center px-3 transition-all duration-700"
                        style={{ width: `${(step.count / maxCount) * 100}%`, background: `linear-gradient(90deg, ${step.color}cc, ${step.color})` }}
                      >
                        <span className="text-sm">{step.icon}</span>
                      </div>
                    </div>
                    <div className="w-16 shrink-0 text-right">
                      <span className="font-mono-data text-sm font-bold" style={{ color: step.color }}>{step.pct}%</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Journey Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
          {journeySteps.map((step, i) => {
            const dropOff = i > 0 ? ((journeySteps[i - 1].count - step.count) / journeySteps[i - 1].count * 100).toFixed(1) : null;
            return (
              <div key={step.stage} className="p-5 rounded-2xl hover-lift" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl" style={{ background: `${step.color}20` }}>
                    {step.icon}
                  </div>
                  <div>
                    <div className="font-display font-bold text-sm" style={{ color: "var(--foreground)" }}>{step.stage}</div>
                    <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>Step {i + 1}</div>
                  </div>
                </div>
                <div className="font-display font-bold text-2xl mb-1" style={{ color: step.color }}>{step.count.toLocaleString()}</div>
                <div className="text-xs mb-3" style={{ color: "var(--muted-foreground)" }}>{step.desc}</div>
                <div className="flex items-center justify-between">
                  <div className="text-xs font-semibold" style={{ color: step.color }}>{step.pct}% of total</div>
                  {dropOff && <div className="text-xs" style={{ color: "#ef4444" }}>−{dropOff}% from prev</div>}
                </div>
              </div>
            );
          })}
        </div>

        {/* Insights */}
        <div className="p-6 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <h2 className="font-display font-semibold text-base mb-4" style={{ color: "var(--foreground)" }}>Journey Insights</h2>
          <div className="space-y-3">
            {[
              { icon: "🎯", text: "Search → Purchase overall conversion is 9.98%, above the industry average of 2–4% for e-commerce.", color: "#10b981" },
              { icon: "⚡", text: "Largest drop-off occurs at Comparison → Cart (38.8%). AI-assisted comparison guidance could close this gap.", color: "#f59e0b" },
              { icon: "🔍", text: "69.5% of searches result in meaningful product discovery — reflecting strong AI understanding accuracy.", color: "#6366f1" },
              { icon: "🛒", text: "Cart-to-purchase rate of 60.2% indicates strong purchase intent — focus on reducing comparison friction.", color: "#8b5cf6" },
            ].map((insight, i) => (
              <div key={i} className="flex items-start gap-3 p-3 rounded-xl" style={{ background: "var(--muted)" }}>
                <span className="text-lg shrink-0">{insight.icon}</span>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted-foreground)" }}>{insight.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid
} from "recharts";
import { analyticsData, insights } from "../data/mockData";

const { metrics, customerActivity, conversionByCategory, topCategories, funnel, topProducts } = analyticsData;

const COLORS = ["#6366f1", "#8b5cf6", "#a78bfa", "#c4b5fd", "#ddd6fe"];

function MetricCard({ label, value, growth, icon, prefix = "" }: { label: string; value: string; growth: number; icon: string; prefix?: string }) {
  return (
    <div className="p-5 rounded-2xl hover-lift" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
      <div className="flex items-start justify-between mb-4">
        <div className="text-2xl">{icon}</div>
        <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${growth >= 0 ? "metric-trend-up" : "metric-trend-down"}`}
          style={{ background: growth >= 0 ? "rgba(16,185,129,0.1)" : "rgba(239,68,68,0.1)" }}>
          {growth >= 0 ? "▲" : "▼"} {Math.abs(growth)}%
        </div>
      </div>
      <div className="font-display font-bold text-2xl mb-1" style={{ color: "var(--foreground)" }}>
        {prefix}{value}
      </div>
      <div className="text-xs" style={{ color: "var(--muted-foreground)" }}>{label}</div>
    </div>
  );
}

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="p-3 rounded-xl text-xs" style={{ background: "#1e2537", border: "1px solid rgba(255,255,255,0.1)", color: "var(--foreground)" }}>
      <div className="font-semibold mb-2" style={{ color: "var(--muted-foreground)" }}>{label}</div>
      {payload.map((p: any) => (
        <div key={p.dataKey} className="flex items-center gap-2">
          <span style={{ color: p.color }}>●</span>
          <span>{p.name}: <strong>{p.value?.toLocaleString()}</strong></span>
        </div>
      ))}
    </div>
  );
}

export default function Dashboard() {
  const [approvalState, setApprovalState] = useState<"pending" | "approved" | "rejected">("pending");
  const [approvalState2, setApprovalState2] = useState<"pending" | "approved" | "rejected">("pending");

  return (
    <div className="flex-1 overflow-y-auto" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl font-bold mb-1" style={{ color: "var(--foreground)" }}>AI Growth Intelligence</h1>
          <p className="text-sm" style={{ color: "var(--muted-foreground)" }}>Turn customer behavior into actionable business decisions</p>
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <MetricCard label="Total Customers" value="24,850" growth={18.4} icon="👥" />
          <MetricCard label="Product Searches" value="89,420" growth={24.7} icon="🔍" />
          <MetricCard label="Conversion Rate" value="27.4%" growth={5.8} icon="🎯" />
          <MetricCard label="Revenue Opportunity" value="18.6L" growth={12.3} icon="💰" prefix="₹" />
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {/* Activity Chart */}
          <div className="lg:col-span-2 p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-display font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>Customer Activity</h2>
            <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Daily searches and purchases over 14 days</p>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={customerActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="date" tick={{ fill: "#718096", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#718096", fontSize: 10 }} tickLine={false} axisLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Line type="monotone" dataKey="searches" name="Searches" stroke="#6366f1" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="purchases" name="Purchases" stroke="#10b981" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
            <div className="flex gap-5 mt-2">
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}><span className="w-3 h-0.5 rounded" style={{ background: "#6366f1", display: "inline-block" }} /> Searches</div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--muted-foreground)" }}><span className="w-3 h-0.5 rounded" style={{ background: "#10b981", display: "inline-block" }} /> Purchases</div>
            </div>
          </div>

          {/* Category Pie */}
          <div className="p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-display font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>Top Categories</h2>
            <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Search distribution by category</p>
            <ResponsiveContainer width="100%" height={140}>
              <PieChart>
                <Pie data={topCategories} cx="50%" cy="50%" innerRadius={40} outerRadius={65} dataKey="searches" nameKey="name" strokeWidth={0}>
                  {topCategories.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip formatter={(v: any) => v.toLocaleString()} contentStyle={{ background: "#1e2537", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-1.5 mt-2">
              {topCategories.map((cat, i) => (
                <div key={cat.name} className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full shrink-0" style={{ background: COLORS[i] }} />
                  <span className="text-xs flex-1" style={{ color: "var(--muted-foreground)" }}>{cat.name}</span>
                  <span className="text-xs font-mono-data font-medium" style={{ color: "var(--foreground)" }}>{cat.searches.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* Conversion by Category */}
          <div className="p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-display font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>Conversion Rate by Category</h2>
            <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Search-to-purchase percentage per category</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={conversionByCategory} barSize={32}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="category" tick={{ fill: "#718096", fontSize: 10 }} tickLine={false} axisLine={false} />
                <YAxis tick={{ fill: "#718096", fontSize: 10 }} tickLine={false} axisLine={false} unit="%" />
                <Tooltip formatter={(v: any) => `${v}%`} contentStyle={{ background: "#1e2537", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }} />
                <Bar dataKey="rate" name="Conversion" radius={[4, 4, 0, 0]}>
                  {conversionByCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Funnel */}
          <div className="p-5 rounded-2xl" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
            <h2 className="font-display font-semibold text-base mb-1" style={{ color: "var(--foreground)" }}>Search-to-Purchase Funnel</h2>
            <p className="text-xs mb-4" style={{ color: "var(--muted-foreground)" }}>Customer progression through the funnel</p>
            <div className="space-y-2">
              {funnel.map((step, i) => (
                <div key={step.stage} className="flex items-center gap-3">
                  <div className="w-24 text-xs text-right shrink-0" style={{ color: "var(--muted-foreground)" }}>{step.stage}</div>
                  <div className="flex-1 h-6 rounded-lg overflow-hidden" style={{ background: "var(--muted)" }}>
                    <div className="h-full rounded-lg flex items-center px-2" style={{ width: `${step.percentage}%`, background: COLORS[i] }}>
                      <span className="text-xs font-bold text-white truncate">{step.count.toLocaleString()}</span>
                    </div>
                  </div>
                  <div className="w-12 text-xs font-mono-data text-right shrink-0" style={{ color: COLORS[i] }}>{step.percentage}%</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Products Table */}
        <div className="rounded-2xl mb-8 overflow-hidden" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
          <div className="px-6 py-4 border-b" style={{ borderColor: "var(--border)" }}>
            <h2 className="font-display font-semibold text-base" style={{ color: "var(--foreground)" }}>Top Products Performance</h2>
            <p className="text-xs mt-0.5" style={{ color: "var(--muted-foreground)" }}>Views, engagement, and conversion metrics</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ background: "var(--muted)" }}>
                  {["Product", "Views", "Comparisons", "Cart Adds", "Purchases", "Conversion"].map(h => (
                    <th key={h} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--muted-foreground)" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topProducts.map((p, i) => (
                  <tr key={p.product} className="border-t" style={{ borderColor: "var(--border)" }}>
                    <td className="px-5 py-3 font-medium text-sm" style={{ color: "var(--foreground)" }}>{p.product}</td>
                    <td className="px-5 py-3 font-mono-data text-xs" style={{ color: "var(--muted-foreground)" }}>{p.views.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono-data text-xs" style={{ color: "var(--muted-foreground)" }}>{p.comparisons.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono-data text-xs" style={{ color: "var(--muted-foreground)" }}>{p.cartAdds.toLocaleString()}</td>
                    <td className="px-5 py-3 font-mono-data text-xs" style={{ color: "var(--muted-foreground)" }}>{p.purchases.toLocaleString()}</td>
                    <td className="px-5 py-3">
                      <span className="font-mono-data text-xs font-bold px-2 py-1 rounded-lg" style={{ background: "rgba(16,185,129,0.1)", color: "#10b981" }}>{p.conversion}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* AI Growth Insights */}
        <div className="mb-8">
          <div className="mb-5">
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--foreground)" }}>AI-Generated Growth Insights</h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Automated analysis of customer behavior patterns</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {insights.map((insight) => (
              <div key={insight.id} className="p-5 rounded-2xl hover-lift" style={{ background: "var(--card)", border: "1px solid var(--border)" }}>
                <div className="flex items-start gap-4">
                  <div className="text-2xl shrink-0">{insight.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: `${insight.color}20`, color: insight.color }}>
                        {insight.priority}
                      </span>
                      <span className="text-xs font-medium" style={{ color: "var(--muted-foreground)" }}>{insight.category}</span>
                      <span className="ml-auto text-xs font-mono-data font-semibold" style={{ color: insight.color }}>{insight.metric}</span>
                    </div>
                    <h3 className="font-display font-semibold text-sm mb-2" style={{ color: "var(--foreground)" }}>{insight.title}</h3>
                    <p className="text-xs leading-relaxed mb-3" style={{ color: "var(--muted-foreground)" }}>{insight.insight}</p>
                    <div className="p-3 rounded-xl text-xs leading-relaxed" style={{ background: "var(--muted)" }}>
                      <span className="font-semibold" style={{ color: "var(--foreground)" }}>Suggested Action: </span>
                      <span style={{ color: "var(--muted-foreground)" }}>{insight.action}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Human-in-the-Loop Actions */}
        <div className="mb-6">
          <div className="mb-5">
            <h2 className="font-display font-bold text-xl" style={{ color: "var(--foreground)" }}>AI Recommended Business Actions</h2>
            <p className="text-sm mt-1" style={{ color: "var(--muted-foreground)" }}>Human-in-the-loop approval for AI-suggested business decisions</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <ActionCard
              title="Boost visibility of ₹50K–₹70K laptops"
              reason="High search volume (31.2K searches) + supply gap in top results. Estimated +18% conversion uplift."
              priority="High"
              state={approvalState}
              onApprove={() => setApprovalState("approved")}
              onReject={() => setApprovalState("rejected")}
            />
            <ActionCard
              title="Enable EMI breakdown on comparison page"
              reason="Comparison-to-cart drop-off is 38.8%. EMI transparency reduces purchase hesitation for high-value items."
              priority="Medium"
              state={approvalState2}
              onApprove={() => setApprovalState2("approved")}
              onReject={() => setApprovalState2("rejected")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

interface ActionCardProps {
  title: string;
  reason: string;
  priority: string;
  state: "pending" | "approved" | "rejected";
  onApprove: () => void;
  onReject: () => void;
}

function ActionCard({ title, reason, priority, state, onApprove, onReject }: ActionCardProps) {
  return (
    <div className="p-5 rounded-2xl" style={{ background: "var(--card)", border: `1px solid ${state === "approved" ? "rgba(16,185,129,0.3)" : state === "rejected" ? "rgba(239,68,68,0.2)" : "var(--border)"}` }}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold px-2 py-0.5 rounded-full" style={{ background: priority === "High" ? "rgba(239,68,68,0.12)" : "rgba(245,158,11,0.12)", color: priority === "High" ? "#ef4444" : "#f59e0b" }}>
            {priority}
          </span>
          <span className="text-xs" style={{ color: "var(--muted-foreground)" }}>AI Action</span>
        </div>
        {state === "approved" && <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(16,185,129,0.12)", color: "#10b981" }}>✓ Approved</span>}
        {state === "rejected" && <span className="text-xs font-semibold px-2 py-1 rounded-full" style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444" }}>✗ Rejected</span>}
      </div>
      <h3 className="font-display font-semibold text-sm mb-2" style={{ color: "var(--foreground)" }}>{title}</h3>
      <p className="text-xs leading-relaxed mb-4" style={{ color: "var(--muted-foreground)" }}>
        <span className="font-semibold" style={{ color: "var(--foreground)" }}>Reason: </span>{reason}
      </p>
      {state === "pending" && (
        <div className="flex gap-2">
          <button
            onClick={onApprove}
            className="flex-1 py-2 rounded-xl text-xs font-semibold transition-all hover:opacity-90"
            style={{ background: "linear-gradient(135deg, #6366f1, #8b5cf6)", color: "#fff" }}
          >
            Approve Action
          </button>
          <button
            onClick={onReject}
            className="px-4 py-2 rounded-xl text-xs font-semibold transition-all"
            style={{ background: "rgba(239,68,68,0.1)", color: "#ef4444", border: "1px solid rgba(239,68,68,0.2)" }}
          >
            Reject
          </button>
        </div>
      )}
      {state !== "pending" && (
        <div className="py-2 text-center text-xs" style={{ color: "var(--muted-foreground)" }}>
          {state === "approved" ? "Action has been sent to your team for implementation." : "Action dismissed. AI will not suggest this again for 30 days."}
        </div>
      )}
    </div>
  );
}

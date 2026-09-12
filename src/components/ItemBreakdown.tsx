import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import type { SaleRow } from '../types';

const COLORS = ['#1F6F5C', '#3B5169', '#8C6D2F', '#7C877E', '#B5652D', '#5A7A8C'];

function formatWon(n: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
}

export function ItemBreakdown({ rows }: { rows: SaleRow[] }) {
  const byItem = new Map<string, number>();
  for (const r of rows) {
    const name = r.item?.name ?? '미지정';
    byItem.set(name, (byItem.get(name) ?? 0) + r.amount);
  }
  const sorted = Array.from(byItem.entries()).sort((a, b) => b[1] - a[1]);
  const top = sorted.slice(0, 5);
  const rest = sorted.slice(5).reduce((sum, [, v]) => sum + v, 0);
  const data = rest > 0 ? [...top, ['기타', rest] as [string, number]] : top;
  const chartData = data.map(([name, value]) => ({ name, value }));
  const total = chartData.reduce((s, d) => s + d.value, 0);

  return (
    <div className="panel">
      <div className="panel-title">품목별 매출 비중</div>
      {chartData.length === 0 ? (
        <div className="empty-state">표시할 데이터가 없습니다.</div>
      ) : (
        <div className="donut-layout">
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="value"
                nameKey="name"
                innerRadius={56}
                outerRadius={86}
                paddingAngle={2}
                stroke="var(--surface)"
                strokeWidth={2}
              >
                {chartData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => formatWon(value)}
                contentStyle={{
                  background: 'var(--surface)',
                  border: '1px solid var(--line)',
                  borderRadius: 8,
                  fontSize: 12,
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <ul className="legend-list">
            {chartData.map((d, i) => (
              <li key={d.name} className="legend-row">
                <span className="legend-dot" style={{ background: COLORS[i % COLORS.length] }} />
                <span className="legend-name">{d.name}</span>
                <span className="legend-pct">
                  {total > 0 ? Math.round((d.value / total) * 100) : 0}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

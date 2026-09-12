import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import type { SaleRow } from '../types';

function monthKey(dateStr: string) {
  return dateStr.slice(0, 7);
}

function formatMonthLabel(key: string) {
  const [, m] = key.split('-');
  return `${Number(m)}월`;
}

function formatWon(n: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
}

export function TrendChart({ rows }: { rows: SaleRow[] }) {
  const byMonth = new Map<string, number>();
  for (const r of rows) {
    const key = monthKey(r.sale_date);
    byMonth.set(key, (byMonth.get(key) ?? 0) + r.amount);
  }
  const data = Array.from(byMonth.entries())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([key, amount]) => ({ key, label: formatMonthLabel(key), amount }));

  return (
    <div className="panel">
      <div className="panel-title">기간별 매출 추이</div>
      {data.length === 0 ? (
        <div className="empty-state">표시할 데이터가 없습니다.</div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="var(--line)" vertical={false} />
            <XAxis
              dataKey="label"
              tick={{ fill: 'var(--ink-soft)', fontSize: 12 }}
              axisLine={{ stroke: 'var(--line)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: 'var(--ink-soft)', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${Math.round(v / 10000)}만`}
              width={48}
            />
            <Tooltip
              formatter={(value: number) => formatWon(value)}
              contentStyle={{
                background: 'var(--surface)',
                border: '1px solid var(--line)',
                borderRadius: 8,
                fontSize: 12,
              }}
              labelStyle={{ color: 'var(--ink)' }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#trendFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

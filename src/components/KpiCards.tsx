import type { SaleRow } from '../types';

function formatWon(n: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
}

export function KpiCards({ rows }: { rows: SaleRow[] }) {
  const totalAmount = rows.reduce((sum, r) => sum + r.amount, 0);
  const count = rows.length;
  const avgTicket = count > 0 ? totalAmount / count : 0;
  const activeAgencies = new Set(rows.map((r) => r.agency?.id).filter(Boolean)).size;

  const items = [
    { label: '총매출', value: formatWon(totalAmount) },
    { label: '매출건수', value: `${count.toLocaleString('ko-KR')}건` },
    { label: '평균 객단가', value: formatWon(avgTicket) },
    { label: '거래 대리점 수', value: `${activeAgencies}곳` },
  ];

  return (
    <div className="kpi-row">
      {items.map((it) => (
        <div className="kpi-card" key={it.label}>
          <div className="kpi-label">{it.label}</div>
          <div className="kpi-value">{it.value}</div>
        </div>
      ))}
    </div>
  );
}

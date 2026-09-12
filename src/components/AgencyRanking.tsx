import type { SaleRow } from '../types';

function formatWon(n: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
}

export function AgencyRanking({ rows }: { rows: SaleRow[] }) {
  const byAgency = new Map<string, number>();
  for (const r of rows) {
    const name = r.agency?.name ?? '미지정';
    byAgency.set(name, (byAgency.get(name) ?? 0) + r.amount);
  }
  const ranked = Array.from(byAgency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);
  const max = ranked.length > 0 ? ranked[0][1] : 0;

  return (
    <div className="panel">
      <div className="panel-title">대리점별 매출 순위</div>
      {ranked.length === 0 ? (
        <div className="empty-state">표시할 데이터가 없습니다.</div>
      ) : (
        <ol className="rank-list">
          {ranked.map(([name, amount], i) => (
            <li className="rank-row" key={name}>
              <span className="rank-idx">{i + 1}</span>
              <div className="rank-body">
                <div className="rank-head">
                  <span className="rank-name">{name}</span>
                  <span className="rank-amount">{formatWon(amount)}</span>
                </div>
                <div className="rank-bar-track">
                  <div
                    className="rank-bar-fill"
                    style={{ width: max > 0 ? `${(amount / max) * 100}%` : '0%' }}
                  />
                </div>
              </div>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}

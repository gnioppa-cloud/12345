import { useMemo, useState } from 'react';
import type { SaleRow } from '../types';

type SortKey = 'sale_date' | 'amount';

function formatWon(n: number) {
  return new Intl.NumberFormat('ko-KR').format(Math.round(n)) + '원';
}

export function SalesTable({ rows }: { rows: SaleRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>('sale_date');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base = q
      ? rows.filter(
          (r) =>
            r.agency?.name.toLowerCase().includes(q) ||
            r.item?.name.toLowerCase().includes(q)
        )
      : rows;
    const sorted = [...base].sort((a, b) => {
      const av = sortKey === 'sale_date' ? a.sale_date : a.amount;
      const bv = sortKey === 'sale_date' ? b.sale_date : b.amount;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });
    return sorted;
  }, [rows, query, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  }

  return (
    <div className="panel">
      <div className="panel-head-row">
        <div className="panel-title">매출 상세</div>
        <input
          className="table-search"
          type="text"
          placeholder="대리점 · 품목 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
      <div className="table-wrap-scroll">
        <table className="data-table">
          <thead>
            <tr>
              <th className="sortable" onClick={() => toggleSort('sale_date')}>
                일자 {sortKey === 'sale_date' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
              <th>대리점</th>
              <th>품목</th>
              <th className="num">수량</th>
              <th className="sortable num" onClick={() => toggleSort('amount')}>
                금액 {sortKey === 'amount' ? (sortDir === 'asc' ? '↑' : '↓') : ''}
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="empty-state">
                  조건에 맞는 매출 내역이 없습니다.
                </td>
              </tr>
            ) : (
              filtered.map((r) => (
                <tr key={r.id}>
                  <td className="mono">{r.sale_date}</td>
                  <td>{r.agency?.name ?? '-'}</td>
                  <td>{r.item?.name ?? '-'}</td>
                  <td className="num mono">{r.quantity.toLocaleString('ko-KR')}</td>
                  <td className="num mono">{formatWon(r.amount)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

import { useMemo, useState } from 'react';
import './App.css';
import { useSalesData } from './hooks/useSalesData';
import { FilterBar, type Filters } from './components/FilterBar';
import { KpiCards } from './components/KpiCards';
import { TrendChart } from './components/TrendChart';
import { AgencyRanking } from './components/AgencyRanking';
import { ItemBreakdown } from './components/ItemBreakdown';
import { SalesTable } from './components/SalesTable';

const DEFAULT_START = '2026-01-01';
const DEFAULT_END = '2026-09-12';

function App() {
  const { rows, loading, error } = useSalesData();
  const [filters, setFilters] = useState<Filters>({
    start: DEFAULT_START,
    end: DEFAULT_END,
    agencyId: 'all',
    category: 'all',
  });

  const agencies = useMemo(() => {
    const map = new Map<number, { id: number; name: string; region: string; status: string }>();
    for (const r of rows) {
      if (r.agency) map.set(r.agency.id, r.agency);
    }
    return Array.from(map.values()).sort((a, b) => a.name.localeCompare(b.name));
  }, [rows]);

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const r of rows) {
      if (r.item?.category) set.add(r.item.category);
    }
    return Array.from(set).sort();
  }, [rows]);

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      if (r.sale_date < filters.start || r.sale_date > filters.end) return false;
      if (filters.agencyId !== 'all' && r.agency?.id !== filters.agencyId) return false;
      if (filters.category !== 'all' && r.item?.category !== filters.category) return false;
      return true;
    });
  }, [rows, filters]);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div className="app-title-group">
          <span className="app-eyebrow">Sales Dashboard</span>
          <h1>매출현황 대시보드</h1>
        </div>
        <FilterBar filters={filters} onChange={setFilters} agencies={agencies} categories={categories} />
      </header>

      {loading && <div className="status-banner">데이터를 불러오는 중입니다…</div>}
      {error && (
        <div className="status-banner status-error">
          데이터를 불러오지 못했습니다: {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <KpiCards rows={filteredRows} />
          <div className="chart-grid">
            <div className="chart-grid-main">
              <TrendChart rows={filteredRows} />
            </div>
            <div className="chart-grid-side">
              <AgencyRanking rows={filteredRows} />
            </div>
          </div>
          <div className="chart-grid chart-grid-reverse">
            <div className="chart-grid-side">
              <ItemBreakdown rows={filteredRows} />
            </div>
            <div className="chart-grid-main">
              <SalesTable rows={filteredRows} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;

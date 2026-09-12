import type { Agency } from '../types';

export interface Filters {
  start: string;
  end: string;
  agencyId: number | 'all';
  category: string | 'all';
}

interface Props {
  filters: Filters;
  onChange: (next: Filters) => void;
  agencies: Agency[];
  categories: string[];
}

export function FilterBar({ filters, onChange, agencies, categories }: Props) {
  return (
    <div className="filter-bar">
      <div className="filter-field">
        <label htmlFor="f-start">기간</label>
        <div className="filter-range">
          <input
            id="f-start"
            type="date"
            value={filters.start}
            max={filters.end}
            onChange={(e) => onChange({ ...filters, start: e.target.value })}
          />
          <span>~</span>
          <input
            type="date"
            value={filters.end}
            min={filters.start}
            onChange={(e) => onChange({ ...filters, end: e.target.value })}
          />
        </div>
      </div>

      <div className="filter-field">
        <label htmlFor="f-agency">대리점</label>
        <select
          id="f-agency"
          value={filters.agencyId}
          onChange={(e) =>
            onChange({
              ...filters,
              agencyId: e.target.value === 'all' ? 'all' : Number(e.target.value),
            })
          }
        >
          <option value="all">전체 대리점</option>
          {agencies.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-category">품목 분류</label>
        <select
          id="f-category"
          value={filters.category}
          onChange={(e) => onChange({ ...filters, category: e.target.value })}
        >
          <option value="all">전체 분류</option>
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

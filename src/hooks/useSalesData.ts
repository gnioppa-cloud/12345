import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import type { SaleRow } from '../types';

interface RawRow {
  id: number;
  sale_date: string;
  quantity: number;
  unit_price: number;
  amount: number;
  agency: { id: number; name: string; region: string; status: string } | null;
  item: { id: number; name: string; category: string; item_code: string } | null;
}

export function useSalesData() {
  const [rows, setRows] = useState<SaleRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);
      const { data, error } = await supabase
        .from('sales')
        .select(
          'id, sale_date, quantity, unit_price, amount, agency:agency_id(id,name,region,status), item:item_id(id,name,category,item_code)'
        )
        .order('sale_date', { ascending: true })
        .returns<RawRow[]>();

      if (cancelled) return;

      if (error) {
        setError(error.message);
        setRows([]);
      } else {
        setRows(data ?? []);
      }
      setLoading(false);
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  return { rows, loading, error };
}

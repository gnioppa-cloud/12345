export interface Agency {
  id: number;
  name: string;
  region: string;
  status: string;
}

export interface Item {
  id: number;
  name: string;
  category: string;
  item_code: string;
}

export interface SaleRow {
  id: number;
  sale_date: string;
  quantity: number;
  unit_price: number;
  amount: number;
  agency: Agency | null;
  item: Item | null;
}

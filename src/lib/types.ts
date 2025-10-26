export type Item = {
  id: string;
  name: string;
  description?: string;
  price: number; // in major currency units (e.g., 19.99)
  unit?: string; // e.g., 'each', 'kg'
  category?: string; // optional category label
};

export type SelectedItem = {
  item: Item;
  quantity: number;
};

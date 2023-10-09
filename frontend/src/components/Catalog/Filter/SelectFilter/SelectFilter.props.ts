export interface SelectFilterProps {
  title: string;
  items: SelectItem[];
  selectedItems: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
}

export interface SelectItem {
  id: number;
  title: string;
}

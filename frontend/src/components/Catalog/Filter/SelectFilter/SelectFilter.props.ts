export interface SelectFilterProps {
  title: string;
  items: SelectItem[];
  selectedItems: SelectItem[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  clearItems: () => void;
}

export interface SelectItem {
  id: number;
  title: string;
}

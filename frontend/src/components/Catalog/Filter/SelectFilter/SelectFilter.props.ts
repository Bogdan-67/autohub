export interface SelectFilterProps {
  title: string;
  items: string[];
  selectedItems: string[];
  addItem: (item: string) => void;
  removeItem: (item: string) => void;
  clearItems: () => void;
}

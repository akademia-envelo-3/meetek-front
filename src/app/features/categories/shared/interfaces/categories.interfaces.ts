export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export interface CategoryUpdate {
  id: number;
  active: boolean;
}
export interface Category {
  id: number;
  name: string;
  active: boolean;
}

export interface UpdateCategory {
  name: string;
  id: number;
}


export interface CategoryStatus {
  id: number;
  active: boolean;
}

export interface IProduct {
  stt?: string | number;
  _id?: string;
  name?: string;
  description?: string;
  promotion?: number | string;
  price: number | string;
  sizes?: string[];
  importPrice?: number | string;
  images?: any;
  productType?: any;
  category?: any;
  brand?: any;
  Stock: number;
  status: boolean;
  flashDeal: boolean;
  featured: boolean;
  isNew: boolean;
  todayDeal: boolean;
}

export interface ISearchProduct {
  name?: string;
  productType?: string;
  category?: string;
  brand?: string;
  page?: any;
  size?: any;
}

export interface IProductTable {
  products: IProduct[];
  pagination: {
    page: number;
    size: number;
    total: number;
  };
}

export interface IAddProduct {
  name: string;
  description: string;
  promotion?: number | string;
  price: number | string;
  sizes?: string[];
  importPrice?: number | string;
  images?: string;
  productType: string;
  category: string;
  brand: string;
  Stock: number;
  status: boolean;
}

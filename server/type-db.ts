import { Timestamp } from "firebase/firestore";

export interface Store {
  id: string;
  name: string;
  userId: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Billboards {
  id: string;
  label: string;
  imageUrl: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Category {
  id: string;
  billboardId: string;
  billboardLabel: string;
  name: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Size {
  id: string;
  name: string;
  value: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Cuisine {
  id: string;
  name: string;
  value: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  discountPrice: number;
  qty: number;
  images: { url: string }[];
  isFeatured: boolean;
  isArchived: boolean;
  size: string;
  cuisine: string;
  category: string;
  sold_out: number;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}


export interface Order {
  id: string;
  isPaid: boolean;
  phone: string;
  orderItems: Product[];
  address: string;
  order_status: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
  image?: string;
  shipperId?: string;
}
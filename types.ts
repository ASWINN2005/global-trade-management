export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  stock: number;
  sku: string;
  image: string;
  videoUrl?: string; // New field for video support
}

export interface Order {
  id: string;
  customer: string;
  date: string;
  total: number;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: number;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  eta: string;
  status: 'In Transit' | 'Customs' | 'Delivered' | 'Delayed';
  carrier: string;
}

export interface Vendor {
  id: string;
  name: string;
  country: string;
  rating: number;
  contact: string;
  status: 'Active' | 'Inactive';
}

export interface Invoice {
  id: string;
  client: string;
  amount: number;
  status: 'Paid' | 'Pending' | 'Overdue';
  dueDate: string;
  issuedDate: string;
}

export type ViewState = 'dashboard' | 'products' | 'orders' | 'vendors' | 'invoices' | 'search';

export type UserRole = 'admin' | 'manager' | 'staff';

export interface User {
  username: string;
  role: UserRole;
  name: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}
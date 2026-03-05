import { Product, Order, Shipment, Vendor, Invoice } from './types';

export const MOCK_PRODUCTS: Product[] = [
  { id: 'P001', name: 'Industrial Hydraulic Pump', category: 'Machinery', price: 1250.00, stock: 45, sku: 'MCH-HYD-001', image: 'https://picsum.photos/400/300?random=1', videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: 'P002', name: 'Precision Circuit Board', category: 'Electronics', price: 85.50, stock: 1200, sku: 'ELC-PCB-002', image: 'https://picsum.photos/400/300?random=2' },
  { id: 'P003', name: 'Raw Cotton Bales (1 Ton)', category: 'Textiles', price: 2400.00, stock: 12, sku: 'TEX-COT-003', image: 'https://picsum.photos/400/300?random=3' },
  { id: 'P004', name: 'Solar Panel Array 500W', category: 'Energy', price: 350.00, stock: 300, sku: 'NRG-SOL-004', image: 'https://picsum.photos/400/300?random=4' },
  { id: 'P005', name: 'Steel Beams (H-Section)', category: 'Construction', price: 560.00, stock: 150, sku: 'CON-STL-005', image: 'https://picsum.photos/400/300?random=5' },
  { id: 'P006', name: 'Organic Coffee Beans (50kg)', category: 'Agriculture', price: 420.00, stock: 80, sku: 'AGR-COF-006', image: 'https://picsum.photos/400/300?random=6' },
];

export const MOCK_ORDERS: Order[] = [
  { id: 'ORD-7829', customer: 'Global Logistics Inc.', date: '2023-10-25', total: 15400.00, status: 'Shipped', items: 12 },
  { id: 'ORD-7830', customer: 'TechSolutions Ltd.', date: '2023-10-26', total: 2450.50, status: 'Processing', items: 5 },
  { id: 'ORD-7831', customer: 'BuildRight Corp.', date: '2023-10-26', total: 8900.00, status: 'Pending', items: 20 },
  { id: 'ORD-7832', customer: 'Green Energy Systems', date: '2023-10-24', total: 35000.00, status: 'Delivered', items: 100 },
  { id: 'ORD-7833', customer: 'Fashion Forward', date: '2023-10-27', total: 1200.00, status: 'Cancelled', items: 2 },
];

export const MOCK_SHIPMENTS: Shipment[] = [
  { id: 'SHP-9001', origin: 'Shanghai, CN', destination: 'Los Angeles, USA', eta: '2023-11-05', status: 'In Transit', carrier: 'Maersk' },
  { id: 'SHP-9002', origin: 'Hamburg, DE', destination: 'New York, USA', eta: '2023-11-02', status: 'Customs', carrier: 'Hapag-Lloyd' },
  { id: 'SHP-9003', origin: 'Mumbai, IN', destination: 'Dubai, UAE', eta: '2023-10-30', status: 'Delivered', carrier: 'MSC' },
  { id: 'SHP-9004', origin: 'Tokyo, JP', destination: 'Sydney, AU', eta: '2023-11-10', status: 'In Transit', carrier: 'ONE' },
];

export const MOCK_VENDORS: Vendor[] = [
  { id: 'V001', name: 'Shenzhen Electronics Co.', country: 'China', rating: 4.8, contact: 'contact@sz-elec.com', status: 'Active' },
  { id: 'V002', name: 'Deutsche Maschinenbau', country: 'Germany', rating: 4.9, contact: 'info@dm-bau.de', status: 'Active' },
  { id: 'V003', name: 'Vietnam Textiles Group', country: 'Vietnam', rating: 4.5, contact: 'sales@vt-group.vn', status: 'Active' },
  { id: 'V004', name: 'Brazil Agro Exports', country: 'Brazil', rating: 4.2, contact: 'export@brazil-agro.br', status: 'Inactive' },
];

export const MOCK_INVOICES: Invoice[] = [
  { id: 'INV-2024-001', client: 'Global Logistics Inc.', amount: 15400.00, status: 'Paid', dueDate: '2023-11-01', issuedDate: '2023-10-25' },
  { id: 'INV-2024-002', client: 'TechSolutions Ltd.', amount: 2450.50, status: 'Pending', dueDate: '2023-11-15', issuedDate: '2023-10-26' },
  { id: 'INV-2024-003', client: 'BuildRight Corp.', amount: 8900.00, status: 'Overdue', dueDate: '2023-10-20', issuedDate: '2023-09-26' },
  { id: 'INV-2024-004', client: 'Green Energy Systems', amount: 35000.00, status: 'Paid', dueDate: '2023-10-24', issuedDate: '2023-09-24' },
];

export const REVENUE_DATA = [
  { name: 'Jan', revenue: 40000, profit: 24000 },
  { name: 'Feb', revenue: 30000, profit: 13980 },
  { name: 'Mar', revenue: 20000, profit: 9800 },
  { name: 'Apr', revenue: 27800, profit: 3908 },
  { name: 'May', revenue: 18900, profit: 4800 },
  { name: 'Jun', revenue: 23900, profit: 3800 },
  { name: 'Jul', revenue: 34900, profit: 4300 },
  { name: 'Aug', revenue: 42000, profit: 20000 },
  { name: 'Sep', revenue: 51000, profit: 30000 },
  { name: 'Oct', revenue: 64000, profit: 42000 },
];
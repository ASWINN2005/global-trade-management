import React from 'react';
import { Product, Order, Vendor } from '../types';
import { Package, ShoppingCart, Users, ArrowRight, SearchX } from 'lucide-react';
import { Badge } from './ui/Badge';

interface SearchResultsProps {
  term: string;
  products: Product[];
  orders: Order[];
  vendors: Vendor[];
  onNavigate: (view: 'products' | 'orders' | 'vendors') => void;
}

export const SearchResults: React.FC<SearchResultsProps> = ({ term, products, orders, vendors, onNavigate }) => {
  const hasResults = products.length > 0 || orders.length > 0 || vendors.length > 0;

  if (!hasResults) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-fade-in">
        <div className="bg-slate-100 p-6 rounded-full mb-4">
          <SearchX className="h-10 w-10 text-slate-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">No results found</h2>
        <p className="text-slate-500 mt-2">We couldn't find anything matching "{term}"</p>
        <button 
          onClick={() => window.location.reload()} // Simple reset or could use a clear function
          className="mt-6 text-blue-600 hover:text-blue-700 font-medium"
        >
          Clear search
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="pb-4 border-b border-slate-200">
        <h1 className="text-2xl font-bold text-slate-900">Search Results</h1>
        <p className="text-slate-500">Found matches for "{term}"</p>
      </div>

      {products.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Package className="h-4 w-4" /> Products ({products.length})
            </h2>
            <button onClick={() => onNavigate('products')} className="text-xs text-blue-600 hover:underline flex items-center">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {products.map(product => (
              <div key={product.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
                <img src={product.image} alt={product.name} className="h-12 w-12 object-cover rounded-lg bg-slate-100" />
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-slate-900">{product.name}</h3>
                  <p className="text-xs text-slate-500">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-slate-900">${product.price.toLocaleString()}</p>
                  <p className="text-xs text-slate-500">{product.stock} in stock</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {orders.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <ShoppingCart className="h-4 w-4" /> Orders ({orders.length})
            </h2>
            <button onClick={() => onNavigate('orders')} className="text-xs text-blue-600 hover:underline flex items-center">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {orders.map(order => (
              <div key={order.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">{order.id}</h3>
                  <p className="text-xs text-slate-500">{order.customer}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium">${order.total.toLocaleString()}</span>
                  <Badge variant={order.status === 'Delivered' ? 'success' : 'warning'}>{order.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {vendors.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          <div className="p-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
            <h2 className="font-semibold text-slate-800 flex items-center gap-2">
              <Users className="h-4 w-4" /> Vendors ({vendors.length})
            </h2>
            <button onClick={() => onNavigate('vendors')} className="text-xs text-blue-600 hover:underline flex items-center">
              View All <ArrowRight className="h-3 w-3 ml-1" />
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {vendors.map(vendor => (
              <div key={vendor.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                <div>
                  <h3 className="text-sm font-medium text-slate-900">{vendor.name}</h3>
                  <p className="text-xs text-slate-500">{vendor.country}</p>
                </div>
                <Badge variant={vendor.status === 'Active' ? 'success' : 'neutral'}>{vendor.status}</Badge>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
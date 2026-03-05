import React, { useState, useEffect } from 'react';
import { Badge } from './ui/Badge';

export const Orders: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:5001/api/orders')
      .then(res => res.json())
      .then(data => { setOrders(data); setLoading(false); });
  }, []);

  if (loading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="bg-white rounded-xl border overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 text-xs font-semibold text-gray-500 uppercase">
          <tr>
            <th className="px-6 py-4">ID</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Total</th>
            <th className="px-6 py-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map(o => (
            <tr key={o.id}>
              <td className="px-6 py-4 font-medium">#{o.id}</td>
              <td className="px-6 py-4">{o.customer}</td>
              <td className="px-6 py-4 font-bold">${o.total}</td>
              <td className="px-6 py-4">
                <Badge variant={o.status === 'Delivered' ? 'success' : 'info'}>{o.status}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
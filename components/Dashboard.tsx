import React, { useState, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { DollarSign, Truck, ClipboardList, AlertTriangle, Activity, Globe } from 'lucide-react';

interface DashboardProps {
  userRole: string;
}

export const Dashboard: React.FC<DashboardProps> = ({ userRole }) => {
  const [stats, setStats] = useState<any>({ revenue: 0, activeShipments: 0, pendingOrders: 0, customsAlerts: 0 });
  const [shipments, setShipments] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);

  const isAdminOrManager = userRole === 'admin' || userRole === 'manager';

  useEffect(() => {
    // 1. Fetch Top Cards Stats
    fetch('http://127.0.0.1:5001/api/dashboard/stats')
      .then(res => res.json())
      .then(data => setStats(data));

    // 2. Fetch Shipments & History only if authorized
    if (isAdminOrManager) {
      fetch('http://127.0.0.1:5001/api/shipments')
        .then(res => res.json())
        .then(data => setShipments(data));

      fetch('http://127.0.0.1:5001/api/history')
        .then(res => res.json())
        .then(data => setHistory(data));
    }
  }, [isAdminOrManager]);

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Dashboard Overview</h1>

      {/* --- STAT CARDS (Visible to Everyone) --- */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-slate-900">${stats.revenue.toLocaleString()}</p>
            </div>
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><DollarSign size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium">Active Shipments</p>
              <p className="text-2xl font-bold text-slate-900">{stats.activeShipments}</p>
            </div>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Truck size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium">Pending Orders</p>
              <p className="text-2xl font-bold text-slate-900">{stats.pendingOrders}</p>
            </div>
            <div className="p-2 bg-orange-50 text-orange-600 rounded-lg"><ClipboardList size={20}/></div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-slate-500 font-medium">Customs Alerts</p>
              <p className="text-2xl font-bold text-slate-900">{stats.customsAlerts}</p>
            </div>
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20}/></div>
          </div>
        </div>
      </div>

      {/* --- RESTRICTED AREA (Admin & Manager Only) --- */}
      {isAdminOrManager && (
        <div className="grid grid-cols-1 gap-6">
          
          {/* SYSTEM HISTORY / ACTIVITY LOG */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-6">
            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
              <Activity className="h-5 w-5 text-blue-600" /> Recent System Activity (History)
            </h3>
            <div className="space-y-3">
              {history.length > 0 ? history.map((log, i) => (
                <div key={i} className="flex justify-between items-center text-sm p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex gap-3 items-center">
                    <span className="text-blue-600 font-bold">[{log.time}]</span>
                    <span className="text-slate-700">
                      <b>{log.user}</b> updated <b>{log.item}</b> from ${log.oldPrice} to ${log.newPrice}
                    </span>
                  </div>
                  <span className="text-xs text-slate-400 font-mono">IP: {log.ip}</span>
                </div>
              )) : <p className="text-slate-400 italic text-sm">No recent activity detected.</p>}
            </div>
          </div>

          {/* SHIPMENT DETAILS TABLE */}
          <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-slate-50 font-bold text-slate-800 flex items-center gap-2">
              <Globe className="h-5 w-5 text-blue-600" /> Live Shipment Tracking
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-medium">
                  <tr>
                    <th className="px-6 py-4">Order ID</th>
                    <th className="px-6 py-4">Route</th>
                    <th className="px-6 py-4">Carrier</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {shipments.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50">
                      <td className="px-6 py-4 font-bold text-slate-900">{s.order_id}</td>
                      <td className="px-6 py-4 text-slate-600">{s.origin} → {s.destination}</td>
                      <td className="px-6 py-4 text-slate-600">{s.carrier}</td>
                      <td className="px-6 py-4">
                        <Badge variant={s.status === 'Delivered' ? 'success' : s.status === 'Customs' ? 'danger' : 'primary'}>
                          {s.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
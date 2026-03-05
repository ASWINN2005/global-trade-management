import React, { useState, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { FileText, Download, Plus, DollarSign, AlertCircle, Search } from 'lucide-react';
import { UserRole } from '../types';

interface InvoicesProps {
  userRole: UserRole;
}

export const Invoices: React.FC<InvoicesProps> = ({ userRole }) => {
  const [invoices, setInvoices] = useState<any[]>([]); // Real DB State
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Real Data from PostgreSQL
  const fetchInvoices = () => {
    fetch('http://127.0.0.1:5001/api/invoices')
      .then(res => res.json())
      .then(data => {
        setInvoices(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Database connection failed:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  // 2. Filter logic updated for your DB column names
  const filteredInvoices = invoices.filter(invoice => {
     const matchesFilter = filter === 'All' || invoice.status === filter;
     const matchesSearch = 
        (invoice.invoice_no?.toLowerCase().includes(searchTerm.toLowerCase())) || 
        (invoice.status?.toLowerCase().includes(searchTerm.toLowerCase()));
     return matchesFilter && matchesSearch;
  });

  // 3. Calculate Summary Stats Mathematically from DB Data
  const totalPaid = invoices
    .filter(i => i.status === 'Paid')
    .reduce((sum, i) => sum + parseFloat(i.amount), 0);
    
  const totalPending = invoices
    .filter(i => i.status === 'Pending')
    .reduce((sum, i) => sum + parseFloat(i.amount), 0);

  const totalOverdue = invoices
    .filter(i => i.status === 'Overdue')
    .reduce((sum, i) => sum + parseFloat(i.amount), 0);

  if (loading) return <div className="p-10 text-slate-500 text-center">Synchronizing Financial Records...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices & Payments</h1>
          <p className="text-slate-500">Live financial tracking from Global Trade DB.</p>
        </div>
        <div className="flex gap-2">
          {userRole !== 'staff' && (
            <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              <Plus className="h-4 w-4" /> Create Invoice
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards with Live DB Totals */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
           <div className="h-12 w-12 bg-green-50 text-green-600 rounded-full flex items-center justify-center">
             <DollarSign className="h-6 w-6" />
           </div>
           <div>
             <p className="text-sm text-slate-500 font-medium">Total Collected</p>
             <p className="text-2xl font-bold text-slate-900">${totalPaid.toLocaleString()}</p>
           </div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
           <div className="h-12 w-12 bg-yellow-50 text-yellow-600 rounded-full flex items-center justify-center">
             <FileText className="h-6 w-6" />
           </div>
           <div>
             <p className="text-sm text-slate-500 font-medium">Pending Payments</p>
             <p className="text-2xl font-bold text-slate-900">${totalPending.toLocaleString()}</p>
           </div>
        </div>
         <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex items-center gap-4">
           <div className="h-12 w-12 bg-red-50 text-red-600 rounded-full flex items-center justify-center">
             <AlertCircle className="h-6 w-6" />
           </div>
           <div>
             <p className="text-sm text-slate-500 font-medium">Overdue</p>
             <p className="text-2xl font-bold text-slate-900">${totalOverdue.toLocaleString()}</p>
           </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input 
              type="text"
              placeholder="Search by Invoice No..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 rounded-lg border border-slate-200 bg-white text-sm"
          >
            <option value="All">All Status</option>
            <option value="Paid">Paid</option>
            <option value="Pending">Pending</option>
            <option value="Overdue">Overdue</option>
          </select>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b">
              <tr>
                <th className="px-6 py-4">Invoice No</th>
                <th className="px-6 py-4">Due Date</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredInvoices.map((invoice) => (
                <tr key={invoice.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-slate-900">{invoice.invoice_no}</td>
                  <td className="px-6 py-4 text-slate-500">{new Date(invoice.due_date).toLocaleDateString()}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">${parseFloat(invoice.amount).toLocaleString()}</td>
                  <td className="px-6 py-4">
                    <Badge variant={
                      invoice.status === 'Paid' ? 'success' :
                      invoice.status === 'Pending' ? 'warning' : 'danger'
                    }>
                      {invoice.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-blue-600 hover:underline font-medium text-xs">View PDF</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
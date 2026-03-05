import React, { useState, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { Mail, Phone, MapPin, Star, Search, Plus } from 'lucide-react';

export const Vendors: React.FC = () => {
  const [vendors, setVendors] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // 1. Fetch Real Data from PostgreSQL
  const fetchVendors = () => {
    fetch('http://127.0.0.1:5001/api/vendors')
      .then(res => res.json())
      .then(data => {
        setVendors(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("❌ Vendor sync failed:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  // 2. Filter logic for DB results
  const filteredVendors = vendors.filter(vendor => 
    vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    vendor.country?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <div className="p-10 text-center text-slate-500">Retrieving Vendor Directory...</div>;

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Vendor Management</h1>
          <p className="text-slate-500">Live supplier data from Global Trade DB.</p>
        </div>
        <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          <Plus className="h-4 w-4" /> Add Vendor
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
        <input
          type="text"
          placeholder="Search vendors by name or country..."
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 text-sm"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {filteredVendors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div>
                     <h3 className="text-lg font-bold text-slate-900">{vendor.name}</h3>
                     <div className="flex items-center text-slate-500 text-sm mt-1">
                       <MapPin className="h-3 w-3 mr-1" /> {vendor.country}
                     </div>
                  </div>
                  <Badge variant={vendor.status === 'Active' ? 'success' : 'neutral'}>
                    {vendor.status}
                  </Badge>
                </div>

                <div className="space-y-2 mb-6">
                   <div className="flex items-center text-sm text-slate-600">
                     <Mail className="h-4 w-4 mr-2 text-slate-400" />
                     contact@{vendor.name?.toLowerCase().split(' ')[0]}.com
                   </div>
                   <div className="flex items-center text-sm text-slate-600">
                     <Phone className="h-4 w-4 mr-2 text-slate-400" />
                     +1 (Trade Support)
                   </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-50">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-4 w-4 ${i < Math.floor(parseFloat(vendor.rating)) ? 'text-yellow-400 fill-yellow-400' : 'text-slate-200'}`} 
                    />
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-1">{vendor.rating}</span>
                </div>
                <button className="text-sm text-blue-600 font-medium hover:bg-blue-50 px-3 py-1 rounded transition-colors">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 bg-white rounded-xl border border-slate-100">
          <p className="text-slate-500">No vendors found in database.</p>
        </div>
      )}
    </div>
  );
};
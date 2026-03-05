import React, { useState, useEffect } from 'react';
import { Badge } from './ui/Badge';
import { Edit2, Check, X } from 'lucide-react';

export const Products: React.FC<{ userRole: string }> = ({ userRole }) => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newPrice, setNewPrice] = useState<string>("");

  const canEdit = userRole === 'admin' || userRole === 'manager';

  // Function to pull fresh data from PostgreSQL
  const loadData = () => {
    fetch('http://127.0.0.1:5001/api/products')
      .then(res => res.json())
      .then(data => { 
        setProducts(data); 
        setLoading(false); 
      })
      .catch(err => console.error("❌ Sync Error:", err));
  };

  useEffect(() => { loadData(); }, []);

  const handleUpdate = async (id: string) => {
    try {
      const res = await fetch(`http://127.0.0.1:5001/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          price: parseFloat(newPrice), 
          role: userRole 
        }),
      });

      if (res.ok) {
        setEditingId(null);
        // CRITICAL: Pull data from DB again to confirm the update worked
        loadData(); 
      } else {
        const errorMsg = await res.json();
        alert(`Update Failed: ${errorMsg.error}`);
      }
    } catch (err) {
      console.error("Connection lost:", err);
    }
  };

  if (loading) return <div className="p-10">Syncing with Global Database...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {products.map(p => (
        <div key={String(p.id)} className="bg-white rounded-xl border p-4 shadow-sm">
          <img src={p.image} className="h-32 w-full object-cover rounded-lg mb-4" alt={p.name} />
          <h3 className="font-bold text-slate-800">{p.name}</h3>
          <div className="flex justify-between items-center mt-4">
            {editingId === p.id ? (
              <div className="flex gap-1">
                <input 
                  type="number"
                  className="w-20 border rounded px-1" 
                  value={newPrice} 
                  onChange={e => setNewPrice(e.target.value)}
                />
                <button onClick={() => handleUpdate(p.id)} className="text-green-600"><Check size={18}/></button>
                <button onClick={() => setEditingId(null)} className="text-red-500"><X size={18}/></button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg">${p.price}</span>
                {canEdit && (
                  <Edit2 
                    size={14} 
                    className="cursor-pointer text-slate-400 hover:text-blue-600" 
                    onClick={() => { setEditingId(p.id); setNewPrice(p.price.toString()); }} 
                  />
                )}
              </div>
            )}
            <Badge variant={p.stock > 0 ? 'success' : 'danger'}>{p.stock} In Stock</Badge>
          </div>
        </div>
      ))}
    </div>
  );
};
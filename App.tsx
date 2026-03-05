import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { Products } from './components/Products';
import { Orders } from './components/Orders';
import { Vendors } from './components/Vendors';
import { Invoices } from './components/Invoices';
import { Login } from './components/Login';
import { SearchResults } from './components/SearchResults';
import { ViewState, User, Product, Order, Vendor } from './types';
import { Search, Menu } from 'lucide-react';
import { MOCK_PRODUCTS, MOCK_ORDERS, MOCK_VENDORS } from './constan';

const App: React.FC = () => {
  // --- 1. PERSISTENCE LOGIC ---
  // Initialize user from localStorage so refresh doesn't log you out
  const [user, setUser] = useState<User | null>(() => {
    const savedUser = localStorage.getItem('trade_user_session');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [currentView, setView] = useState<ViewState>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Global Search State
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [foundProducts, setFoundProducts] = useState<Product[]>([]);
  const [foundOrders, setFoundOrders] = useState<Order[]>([]);
  const [foundVendors, setFoundVendors] = useState<Vendor[]>([]);

  // --- 2. WRAPPER FOR LOGIN ---
  const handleLogin = (userData: User) => {
    setUser(userData);
    localStorage.setItem('trade_user_session', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('trade_user_session'); // Clear session
    setView('dashboard');
    setGlobalSearchTerm('');
    setSidebarOpen(false);
  };

  const handleGlobalSearch = (term: string) => {
    setGlobalSearchTerm(term);
    if (term.trim() === '') {
      if (currentView === 'search') setView('dashboard');
      return;
    }

    const lowerTerm = term.toLowerCase();
    
    // Perform search
    const pResults = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(lowerTerm) || p.sku.toLowerCase().includes(lowerTerm));
    const oResults = MOCK_ORDERS.filter(o => o.id.toLowerCase().includes(lowerTerm) || o.customer.toLowerCase().includes(lowerTerm));
    const vResults = MOCK_VENDORS.filter(v => v.name.toLowerCase().includes(lowerTerm) || v.country.toLowerCase().includes(lowerTerm));

    setFoundProducts(pResults);
    setFoundOrders(oResults);
    setFoundVendors(vResults);
    
    if (currentView !== 'search') {
      setView('search');
    }
  };

  const renderView = () => {
    if (!user) return null;

    // Security check
    if (user.role === 'staff' && (currentView === 'invoices' || currentView === 'vendors')) {
      setView('dashboard');
      return <Dashboard userRole={user.role} />;
    }

    switch (currentView) {
      case 'dashboard': return <Dashboard userRole={user.role} />;
      case 'products': return <Products userRole={user.role} />;
      case 'orders': return <Orders />;
      case 'invoices': return <Invoices userRole={user.role} />;
      case 'vendors': return <Vendors />;
      case 'search': return (
        <SearchResults 
          term={globalSearchTerm}
          products={foundProducts}
          orders={foundOrders}
          vendors={foundVendors}
          onNavigate={(view) => setView(view)}
        />
      );
      default: return <Dashboard userRole={user.role} />;
    }
  };

  // Use handleLogin instead of setUser directly
  if (!user) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 font-sans overflow-hidden">
      <Sidebar 
        currentView={currentView} 
        setView={setView} 
        user={user} 
        onLogout={handleLogout}
        isOpen={isSidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      
      <main className="flex-1 flex flex-col min-w-0 relative lg:ml-64 h-full transition-all duration-300 ease-in-out">
        {/* Header Content remains same */}
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-20 px-4 md:px-8 flex items-center justify-between shadow-sm">
           <div className="flex items-center gap-4 flex-1">
             <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors">
               <Menu className="h-6 w-6" />
             </button>

             <div className="relative flex-1 max-w-md group">
               <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
               <input 
                 type="text" 
                 placeholder="Search..." 
                 className="w-full pl-11 pr-4 py-2 md:py-2.5 rounded-full bg-slate-100/50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm transition-all outline-none"
                 value={globalSearchTerm}
                 onChange={(e) => handleGlobalSearch(e.target.value)}
               />
             </div>
           </div>

           <div className="flex items-center gap-4 ml-4">
             <div className="flex items-center gap-3">
               <div className="text-right hidden md:block">
                 <div className="text-sm font-bold text-slate-900 leading-none">{user.name}</div>
                 <div className="text-[11px] text-slate-500 uppercase tracking-wider font-medium mt-1">{user.role}</div>
               </div>
               <div className="h-9 w-9 md:h-10 md:w-10 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-white text-sm font-bold shadow-lg">
                 {user.username.substring(0, 2).toUpperCase()}
               </div>
             </div>
           </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 scroll-smooth">
          <div className="max-w-7xl mx-auto pb-8">
            {renderView()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
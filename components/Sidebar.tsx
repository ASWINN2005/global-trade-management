import React from 'react';
import { LayoutDashboard, Package, ShoppingCart, Users, Ship, FileText, LogOut, ChevronRight, Globe, X } from 'lucide-react';
import { ViewState, UserRole, User } from '../types';

interface SidebarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
  user: User;
  onLogout: () => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, setView, user, onLogout, isOpen, onClose }) => {
  // Define available navigation items
  const allNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, roles: ['admin', 'manager', 'staff'] },
    { id: 'products', label: 'Products', icon: Package, roles: ['admin', 'manager', 'staff'] },
    { id: 'orders', label: 'Orders', icon: ShoppingCart, roles: ['admin', 'manager', 'staff'] },
    { id: 'invoices', label: 'Invoices & Pay', icon: FileText, roles: ['admin', 'manager'] },
    { id: 'vendors', label: 'Vendors', icon: Users, roles: ['admin', 'manager'] },
  ];

  // Filter items based on user role
  const allowedNavItems = allNavItems.filter(item => item.roles.includes(user.role));

  const handleNavigation = (view: ViewState) => {
    setView(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/60 z-30 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed top-0 left-0 h-full w-72 bg-[#0B1120] text-slate-300 shadow-2xl z-40 
        transform transition-transform duration-300 ease-in-out flex flex-col border-r border-slate-800/50
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:w-64
      `}>
        <div className="h-20 flex items-center justify-between px-6 border-b border-slate-800/50 bg-[#0F172A]">
          <div className="flex items-center gap-3 text-white">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-1.5 rounded-lg shadow-lg shadow-blue-500/30">
               <Globe className="h-6 w-6" />
            </div>
            <span className="text-sm font-bold tracking-tight leading-tight">Global Trade<br/>Platform</span>
          </div>
          <button 
            onClick={onClose}
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto mt-2 custom-scrollbar">
          <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-3">Main Menu</p>
          {allowedNavItems.map((item) => {
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id as ViewState)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-white border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`h-5 w-5 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive && <ChevronRight className="h-4 w-4 opacity-50" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50 bg-[#0F172A]">
          <div className="mb-4 px-2">
            <div className="text-xs font-semibold text-slate-500 mb-1">Signed in as</div>
            <div className="text-sm font-medium text-white truncate">{user.name}</div>
            <div className="text-xs text-blue-400 capitalize">{user.role}</div>
          </div>
          <button 
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition-all duration-200 text-xs font-semibold border border-slate-700"
          >
            <LogOut className="h-4 w-4" />
            Sign Out
          </button>
        </div>
      </div>
    </>
  );
};
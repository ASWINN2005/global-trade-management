import React, { useState } from 'react';
import { Globe, Lock, User as UserIcon, ArrowRight, LayoutGrid } from 'lucide-react';
import { User } from '../types';

interface LoginProps {
  onLogin: (user: User) => void;
}

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate network delay for realism
    setTimeout(() => {
      if (username === 'admin' && password === 'admin') {
        onLogin({ username: 'admin', role: 'admin', name: 'Administrator' });
      } else if (username === 'manager' && password === 'manager') {
        onLogin({ username: 'manager', role: 'manager', name: 'Ops Manager' });
      } else if (username === 'staff' && password === 'staff') {
        onLogin({ username: 'staff', role: 'staff', name: 'Staff Member' });
      } else {
        setError('Invalid credentials. Please check your username and password.');
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="min-h-screen flex bg-slate-900 font-sans">
      {/* Background Graphic */}
      <div className="absolute inset-0 z-0 overflow-hidden">
          <div className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full bg-blue-600/10 blur-[120px]"></div>
          <div className="absolute top-[40%] -right-[10%] w-[60%] h-[60%] rounded-full bg-indigo-600/10 blur-[100px]"></div>
      </div>

      {/* Left Side - Hero Content */}
      <div className="hidden lg:flex lg:w-3/5 relative z-10 flex-col justify-between p-16">
         <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 text-white text-sm font-medium mb-8">
               <LayoutGrid className="h-4 w-4 text-blue-400" />
               <span>Enterprise Logistics OS v2.4</span>
            </div>
            <h1 className="text-6xl font-bold text-white tracking-tight leading-[1.1] mb-6">
               Global Trade <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Management Platform</span>
            </h1>
            <p className="text-slate-400 text-xl max-w-xl leading-relaxed">
               Orchestrate your entire supply chain from a single, intelligent command center. 
               Track shipments, manage global vendors, and automate complex workflows.
            </p>
         </div>
         
         <div className="grid grid-cols-3 gap-8">
            <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-2xl">
               <div className="text-3xl font-bold text-white mb-1">120+</div>
               <div className="text-slate-400 text-sm">Countries Supported</div>
            </div>
             <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-2xl">
               <div className="text-3xl font-bold text-white mb-1">$4.2B</div>
               <div className="text-slate-400 text-sm">Trade Volume Processed</div>
            </div>
             <div className="bg-white/5 backdrop-blur-sm border border-white/5 p-6 rounded-2xl">
               <div className="text-3xl font-bold text-white mb-1">99.9%</div>
               <div className="text-slate-400 text-sm">Uptime SLA</div>
            </div>
         </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 z-10">
        <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl shadow-black/20 p-10 animate-fade-in">
          <div className="mb-8">
            <div className="h-12 w-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30 mb-6">
              <Globe className="h-7 w-7 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">Sign in to Platform</h2>
            <p className="text-slate-500 mt-2">Enter your credentials to access the secure portal.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Username</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white text-sm font-medium"
                  placeholder="e.g., admin"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-11 pr-4 py-3.5 border border-slate-200 rounded-xl text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all bg-slate-50 focus:bg-white text-sm font-medium"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                <span className="ml-2 text-sm text-slate-600">Remember device</span>
              </label>
              <a href="#" className="text-sm font-semibold text-blue-600 hover:text-blue-700">Forgot password?</a>
            </div>

            {error && (
              <div className="p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100 flex items-center gap-3 animate-shake">
                <div className="h-1.5 w-1.5 rounded-full bg-red-500 shrink-0" />
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl transition-all duration-200 shadow-xl shadow-slate-900/20 hover:shadow-slate-900/30 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Sign In <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <p className="text-xs font-semibold text-slate-400 mb-3 uppercase tracking-wider">Demo Access</p>
             <div className="flex justify-center gap-3">
               <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-mono rounded-lg cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => {setUsername('admin'); setPassword('admin')}}>admin</span>
               <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-mono rounded-lg cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => {setUsername('manager'); setPassword('manager')}}>manager</span>
               <span className="px-3 py-1.5 bg-slate-100 text-slate-600 text-xs font-mono rounded-lg cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => {setUsername('staff'); setPassword('staff')}}>staff</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
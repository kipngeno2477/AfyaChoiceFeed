import React, { useState } from 'react';
import { X, Lock, Mail, User, Phone, MapPin } from 'lucide-react';
import { BRANCHES } from '../data/feedsData';
import AfyaLogo from './AfyaLogo';

export default function AuthModal({ isOpen, onClose, onLoginSuccess, onOpenAdminPortal }) {
  const [isRegister, setIsRegister] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [preferredBranch, setPreferredBranch] = useState('Marurui (Headquarters & Plant)');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name || (email.split('@')[0]),
      email,
      phone,
      preferredBranch
    };
    onLoginSuccess(user);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden animate-fadeIn">
        
        {/* Modal Header */}
        <div className="bg-farm-primary text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="mb-4">
            <AfyaLogo variant="mark" size="sm" />
          </div>

          <h3 className="text-xl font-bold">
            {isRegister ? 'Join Afyachoice Feeds' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-emerald-100 mt-1">
            {isRegister 
              ? 'Register to manage orders and receive bulk supply pricing.' 
              : 'Sign in with your registered phone or email.'}
          </p>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Full Name / Farm Name</label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="text"
                  required
                  placeholder="e.g. Kiprono Dairy Farm"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-farm-primary"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="email"
                required
                placeholder="farmer@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-farm-primary"
              />
            </div>
          </div>

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp / Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <input
                  type="tel"
                  required
                  placeholder="0792 764 002"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-farm-primary"
                />
              </div>
            </div>
          )}

          {isRegister && (
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Nearest Branch</label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                <select
                  value={preferredBranch}
                  onChange={(e) => setPreferredBranch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-farm-primary font-medium"
                >
                  {BRANCHES.map(b => (
                    <option key={b.id} value={b.name}>{b.name}</option>
                  ))}
                </select>
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-farm-primary"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-farm-primary hover:bg-farm-dark text-white font-bold py-2.5 rounded-xl transition shadow"
          >
            {isRegister ? 'Create Account' : 'Sign In'}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsRegister(!isRegister)}
              className="text-xs text-farm-primary hover:underline font-semibold"
            >
              {isRegister 
                ? 'Already have an account? Sign In here' 
                : "Don't have an account? Sign Up here"}
            </button>
          </div>

          {/* Discreet Staff & Admin Sign In Link */}
          <div className="pt-3 mt-1 border-t border-slate-100 text-center">
            <button
              type="button"
              onClick={() => {
                onClose();
                if (onOpenAdminPortal) onOpenAdminPortal();
              }}
              className="text-[11px] text-slate-400 hover:text-farm-primary flex items-center justify-center gap-1.5 mx-auto transition"
            >
              <Lock className="w-3 h-3 text-slate-400" />
              <span>Store Management & Admin Sign In</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}

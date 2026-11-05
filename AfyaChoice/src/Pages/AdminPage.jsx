import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  ShieldCheck, 
  LogOut, 
  PlusCircle, 
  Trash2, 
  Check, 
  AlertCircle, 
  Key, 
  ArrowLeft, 
  ArrowRight,
  User,
  Phone,
  Building,
  Layers,
  Sparkles,
  Truck,
  PackageCheck
} from 'lucide-react';
import { CATEGORIES } from '../data/feedsData';
import AfyaLogo from '../components/AfyaLogo';

// Master Default Admin Credentials
const DEFAULT_ADMIN = {
  email: 'admin@afyachoicefeeds.co.ke',
  password: 'Admin@2026',
  role: 'Super Administrator',
  name: 'Afyachoice Store Administrator'
};

// Security Passcode required to register a new admin (prevents public customer registration)
const ADMIN_SECURITY_PASSCODE = 'AFYA2026';

export default function AdminPage({ 
  products, 
  onAddProduct, 
  onDeleteProduct, 
  setCurrentPage,
  adminUser,
  setAdminUser 
}) {
  // --- Admin Authentication State ---
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(adminUser));
  const [authTab, setAuthTab] = useState('signin'); // 'signin' | 'signup'

  // Sign In Form State
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loginError, setLoginError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sign Up (Admin Registration) Form State
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regRole, setRegRole] = useState('Operations Administrator');
  const [regPasscode, setRegPasscode] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regError, setRegError] = useState('');
  const [regSuccess, setRegSuccess] = useState('');

  // Change Password Modal State
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [currentPasswordInput, setCurrentPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [passwordChangeMessage, setPasswordChangeMessage] = useState({ type: '', text: '' });

  // --- Product Management Form State ---
  const [name, setName] = useState('');
  const [category, setCategory] = useState('poultry');
  const [animal, setAnimal] = useState('poultry');
  const [packaging, setPackaging] = useState('50 Kg Bag');
  const [weightKg, setWeightKg] = useState(50);
  const [pricePerKg, setPricePerKg] = useState('');
  const [pricePerBag, setPricePerBag] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [benefit1, setBenefit1] = useState('');
  const [benefit2, setBenefit2] = useState('');
  const [successNotice, setSuccessNotice] = useState(false);
  const [searchFilter, setSearchFilter] = useState('');

  // 1. Check existing session on mount or when adminUser prop changes
  useEffect(() => {
    if (adminUser) {
      setIsAuthenticated(true);
      return;
    }
    try {
      const savedSession = localStorage.getItem('afya_admin_session');
      if (savedSession) {
        const parsed = JSON.parse(savedSession);
        if (parsed && parsed.email) {
          setIsAuthenticated(true);
          if (setAdminUser) setAdminUser(parsed);
        }
      }
    } catch (e) {
      console.error('Failed to read admin session from localStorage', e);
    }
  }, [adminUser, setAdminUser]);

  // Helper: Retrieve all registered admin accounts
  const getRegisteredAdmins = () => {
    try {
      const stored = localStorage.getItem('afya_admin_registered_accounts');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (e) {
      console.error('Failed to parse admin accounts', e);
    }
    return [DEFAULT_ADMIN];
  };

  // 2. Handle Admin Sign In
  const handleLogin = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError('');

    setTimeout(() => {
      const registered = getRegisteredAdmins();
      const enteredEmail = loginEmail.trim().toLowerCase();
      const enteredPassword = loginPassword.trim();

      const matchedAdmin = registered.find(
        acc => acc.email.toLowerCase() === enteredEmail && acc.password === enteredPassword
      );

      if (matchedAdmin) {
        const sessionData = {
          email: matchedAdmin.email,
          role: matchedAdmin.role || 'Super Administrator',
          name: matchedAdmin.name || 'Store Admin',
          loggedInAt: new Date().toISOString()
        };

        if (rememberMe) {
          localStorage.setItem('afya_admin_session', JSON.stringify(sessionData));
        }

        setIsAuthenticated(true);
        if (setAdminUser) setAdminUser(sessionData);
        setLoginError('');
      } else {
        setLoginError('Invalid administrator email or password. Please verify your credentials.');
      }
      setIsSubmitting(false);
    }, 350);
  };

  // 3. Handle Admin Registration (Sign Up)
  const handleRegisterAdmin = (e) => {
    e.preventDefault();
    setRegError('');
    setRegSuccess('');

    // Check Security Passcode
    if (regPasscode.trim() !== ADMIN_SECURITY_PASSCODE) {
      setRegError(`Invalid Admin Authorization Passcode. (Hint: Use "${ADMIN_SECURITY_PASSCODE}" for staff authorization)`);
      return;
    }

    if (regPassword.length < 6) {
      setRegError('Password must be at least 6 characters.');
      return;
    }

    if (regPassword !== regConfirmPassword) {
      setRegError('Passwords do not match.');
      return;
    }

    const registered = getRegisteredAdmins();
    const emailLower = regEmail.trim().toLowerCase();

    if (registered.some(a => a.email.toLowerCase() === emailLower)) {
      setRegError('An admin account with this email address already exists. Please sign in instead.');
      return;
    }

    const newAdmin = {
      name: regName.trim(),
      email: emailLower,
      phone: regPhone.trim(),
      role: regRole,
      password: regPassword.trim(),
      createdAt: new Date().toISOString()
    };

    const updatedList = [...registered, newAdmin];
    localStorage.setItem('afya_admin_registered_accounts', JSON.stringify(updatedList));

    const sessionData = {
      email: newAdmin.email,
      role: newAdmin.role,
      name: newAdmin.name,
      loggedInAt: new Date().toISOString()
    };

    localStorage.setItem('afya_admin_session', JSON.stringify(sessionData));
    setRegSuccess('Admin account created successfully! Leading you to the Dashboard...');

    setTimeout(() => {
      setIsAuthenticated(true);
      if (setAdminUser) setAdminUser(sessionData);
    }, 600);
  };

  // 4. Handle Admin Logout
  const handleLogout = () => {
    localStorage.removeItem('afya_admin_session');
    setIsAuthenticated(false);
    if (setAdminUser) setAdminUser(null);
    setLoginPassword('');
    setLoginError('');
    if (setCurrentPage) setCurrentPage('home');
  };

  // 5. Quick Demo Autofill
  const handleFillDemo = () => {
    setLoginEmail(DEFAULT_ADMIN.email);
    setLoginPassword(DEFAULT_ADMIN.password);
    setLoginError('');
  };

  // 6. Handle Change Admin Password
  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordChangeMessage({ type: '', text: '' });

    const registered = getRegisteredAdmins();
    const currentEmail = (adminUser?.email || DEFAULT_ADMIN.email).toLowerCase();
    const adminIndex = registered.findIndex(a => a.email.toLowerCase() === currentEmail);

    if (adminIndex === -1) {
      setPasswordChangeMessage({ type: 'error', text: 'Admin account not found.' });
      return;
    }

    if (currentPasswordInput !== registered[adminIndex].password) {
      setPasswordChangeMessage({ type: 'error', text: 'Current password is incorrect.' });
      return;
    }

    if (newPasswordInput.length < 6) {
      setPasswordChangeMessage({ type: 'error', text: 'New password must be at least 6 characters.' });
      return;
    }

    if (newPasswordInput !== confirmPasswordInput) {
      setPasswordChangeMessage({ type: 'error', text: 'New password and confirmation do not match.' });
      return;
    }

    registered[adminIndex].password = newPasswordInput;
    localStorage.setItem('afya_admin_registered_accounts', JSON.stringify(registered));

    setPasswordChangeMessage({ type: 'success', text: 'Password successfully updated!' });
    setCurrentPasswordInput('');
    setNewPasswordInput('');
    setConfirmPasswordInput('');

    setTimeout(() => {
      setIsChangePasswordOpen(false);
      setPasswordChangeMessage({ type: '', text: '' });
    }, 1800);
  };

  // 7. Handle Product Submission
  const handleProductSubmit = (e) => {
    e.preventDefault();
    if (!name || !pricePerBag) {
      alert("Please provide the feed name and price per bag.");
      return;
    }

    const newProd = {
      id: 'prod_' + Date.now(),
      name,
      category,
      animal,
      packaging,
      weightKg: Number(weightKg),
      pricePerKg: Number(pricePerKg) || Math.round(Number(pricePerBag) / Number(weightKg)),
      pricePerBag: Number(pricePerBag),
      image: imageUrl || "https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?auto=format&fit=crop&w=700&q=80",
      description,
      benefits: [benefit1, benefit2].filter(Boolean),
      featured: true
    };

    onAddProduct(newProd);
    setSuccessNotice(true);
    setTimeout(() => setSuccessNotice(false), 3000);

    // Reset Form
    setName('');
    setPricePerBag('');
    setPricePerKg('');
    setDescription('');
    setImageUrl('');
    setBenefit1('');
    setBenefit2('');
  };

  const handlePricePerBagChange = (val) => {
    setPricePerBag(val);
    if (val && weightKg && Number(weightKg) > 0) {
      setPricePerKg(Math.round(Number(val) / Number(weightKg)));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
    p.category.toLowerCase().includes(searchFilter.toLowerCase())
  );

  // ========================================================
  // VIEW 1: DEDICATED ADMIN SIGN-IN & SIGN-UP PORTAL GATE
  // (Shown to Unauthenticated Users / Non-Admins)
  // ========================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] bg-gradient-to-br from-[#063319] via-[#0b542c] to-[#042813] py-12 px-4 sm:px-6 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-emerald-800/40 overflow-hidden">
          
          {/* Header with Brand Logo & Restricted Access Warning */}
          <div className="bg-[#042813] text-white p-6 sm:p-7 relative overflow-hidden border-b border-emerald-900">
            <div className="relative z-10 space-y-2.5">
              <div className="flex items-center justify-between">
                <div className="inline-flex items-center gap-1.5 bg-emerald-900/60 border border-emerald-500/40 px-3 py-1 rounded-full text-emerald-200 text-[11px] font-bold">
                  <Lock className="w-3.5 h-3.5 text-[#e86014]" />
                  <span>Authorized Personnel Only</span>
                </div>
                <button
                  type="button"
                  onClick={() => setCurrentPage && setCurrentPage('home')}
                  className="text-xs text-emerald-300 hover:text-white transition flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Storefront</span>
                </button>
              </div>

              <div className="pt-1">
                <h2 className="text-2xl font-black text-white tracking-tight">
                  Afyachoice Store Portal
                </h2>
                <p className="text-xs text-emerald-100/80 leading-relaxed mt-0.5">
                  Sign in or register to manage product prices, 50kg bag inventories, and farm orders.
                </p>
              </div>
            </div>

            {/* Subtle background glow */}
            <div className="absolute -right-8 -bottom-8 w-28 h-28 bg-[#e86014]/20 rounded-full blur-xl pointer-events-none" />
          </div>

          {/* Tab Selector: Sign In vs Sign Up */}
          <div className="flex border-b border-gray-100 bg-gray-50/80 p-1.5">
            <button
              type="button"
              onClick={() => { setAuthTab('signin'); setLoginError(''); setRegError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authTab === 'signin'
                  ? 'bg-white text-[#0b542c] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Admin Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthTab('signup'); setLoginError(''); setRegError(''); }}
              className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                authTab === 'signup'
                  ? 'bg-white text-[#0b542c] shadow-sm'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              Register Admin (Sign Up)
            </button>
          </div>

          {/* Tab 1: Admin Sign In */}
          {authTab === 'signin' && (
            <div className="p-6 sm:p-7 space-y-5">
              {loginError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Admin Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      required
                      placeholder="admin@afyachoicefeeds.co.ke"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/50 text-slate-900 focus:outline-none focus:border-[#0b542c] focus:bg-white transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Admin Password
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-10 pr-11 py-2.5 text-sm rounded-xl border border-gray-200 bg-gray-50/50 text-slate-900 focus:outline-none focus:border-[#0b542c] focus:bg-white transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-slate-600 transition"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-slate-600">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="rounded border-gray-300 text-[#0b542c] focus:ring-[#0b542c] w-4 h-4"
                    />
                    <span>Keep me logged in</span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#0b542c] hover:bg-[#073d1f] text-white font-bold py-3 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                >
                  <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>

              {/* Quick Demo Credentials Assistant Box */}
              <div className="bg-[#f0f9f3] border border-[#cce8dc] rounded-2xl p-3.5 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#0b542c] flex items-center gap-1">
                    <Key className="w-3.5 h-3.5 text-[#e86014]" />
                    <span>Demo Admin Credentials:</span>
                  </span>
                  <button
                    type="button"
                    onClick={handleFillDemo}
                    className="bg-[#0b542c] hover:bg-[#073d1f] text-white px-2 py-0.5 rounded-md text-[10px] font-bold transition shadow-xs"
                  >
                    Auto-fill
                  </button>
                </div>
                <div className="text-slate-600 space-y-0.5 text-[11px] font-mono bg-white/90 p-2 rounded-lg border border-emerald-100">
                  <div><span className="text-slate-400">Email:</span> <strong className="text-slate-800">admin@afyachoicefeeds.co.ke</strong></div>
                  <div><span className="text-slate-400">Password:</span> <strong className="text-slate-800">Admin@2026</strong></div>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Admin Registration (Sign Up) */}
          {authTab === 'signup' && (
            <div className="p-6 sm:p-7 space-y-4">
              {regError && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                  <span>{regError}</span>
                </div>
              )}

              {regSuccess && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-medium flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>{regSuccess}</span>
                </div>
              )}

              <form onSubmit={handleRegisterAdmin} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Full Name</label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      required
                      placeholder="e.g. Kiprono Mutai"
                      value={regName}
                      onChange={(e) => setRegName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Official Email</label>
                    <input
                      type="email"
                      required
                      placeholder="staff@afyachoice.co.ke"
                      value={regEmail}
                      onChange={(e) => setRegEmail(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      required
                      placeholder="0792 764 002"
                      value={regPhone}
                      onChange={(e) => setRegPhone(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Admin Department / Role</label>
                  <select
                    value={regRole}
                    onChange={(e) => setRegRole(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c] bg-white font-medium"
                  >
                    <option value="Operations Administrator">Operations Administrator</option>
                    <option value="Inventory & Depot Manager">Inventory & Depot Manager</option>
                    <option value="Feed Formulation Specialist">Feed Formulation Specialist</option>
                    <option value="Super Administrator">Super Administrator</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-slate-700">Security Passcode</label>
                    <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-1.5 py-0.5 rounded">
                      Passcode: AFYA2026
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Enter staff security passcode"
                    value={regPasscode}
                    onChange={(e) => setRegPasscode(e.target.value)}
                    className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c] font-mono tracking-wider"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Password</label>
                    <input
                      type="password"
                      required
                      placeholder="At least 6 chars"
                      value={regPassword}
                      onChange={(e) => setRegPassword(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Confirm Password</label>
                    <input
                      type="password"
                      required
                      placeholder="Repeat password"
                      value={regConfirmPassword}
                      onChange={(e) => setRegConfirmPassword(e.target.value)}
                      className="w-full p-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0b542c] hover:bg-[#073d1f] text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition flex items-center justify-center gap-2 text-xs mt-2"
                >
                  <span>Create Admin Account & Open Dashboard</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          )}

          {/* Footer of the Portal Box */}
          <div className="bg-gray-50 p-3.5 text-center border-t border-gray-100">
            <button
              type="button"
              onClick={() => setCurrentPage && setCurrentPage('home')}
              className="text-xs text-slate-500 hover:text-[#0b542c] font-medium inline-flex items-center gap-1 transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to Public Afyachoice Store</span>
            </button>
          </div>

        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: AUTHENTICATED ADMIN MANAGEMENT DASHBOARD
  // (Only rendered when user has signed in as Admin)
  // ========================================================
  return (
    <div className="py-8 bg-slate-50 min-h-screen">
      <div className="max-w-[1536px] mx-auto px-4 sm:px-6">
        
        {/* Admin Navigation & Status Header */}
        <div className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Left Title & Status */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#f0f9f3] border border-emerald-200 flex items-center justify-center text-[#0b542c] flex-shrink-0">
              <ShieldCheck className="w-7 h-7 text-[#0b542c]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[#0b542c]">
                  Afyachoice Store Administrator
                </span>
                <span className="inline-flex items-center gap-1 bg-emerald-100 text-[#0b542c] text-[10px] font-bold px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Active Session
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 mt-0.5">
                Feed Products & Pricing Inventory Dashboard
              </h1>
              <p className="text-xs text-slate-500">
                Logged in as <strong className="text-slate-800">{adminUser?.email || DEFAULT_ADMIN.email}</strong> ({adminUser?.role || 'Super Administrator'})
              </p>
            </div>
          </div>

          {/* Right Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsChangePasswordOpen(true)}
              className="inline-flex items-center gap-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-3.5 py-2 rounded-xl transition"
            >
              <Key className="w-3.5 h-3.5 text-slate-500" />
              <span>Change Password</span>
            </button>

            <button
              onClick={() => setCurrentPage && setCurrentPage('home')}
              className="inline-flex items-center gap-1.5 bg-[#f0f9f3] hover:bg-emerald-100 text-[#0b542c] text-xs font-bold px-3.5 py-2 rounded-xl transition border border-emerald-200"
            >
              <span>View Customer Storefront</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-3.5 py-2 rounded-xl transition border border-red-200"
            >
              <LogOut className="w-3.5 h-3.5 text-red-600" />
              <span>Log Out</span>
            </button>
          </div>

        </div>

        {/* Quick Analytics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0b542c] flex items-center justify-center flex-shrink-0">
              <PackageCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">{products.length}</div>
              <div className="text-xs text-slate-500 font-medium">Catalog Feeds</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#e86014] flex items-center justify-center flex-shrink-0">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">4 Categories</div>
              <div className="text-xs text-slate-500 font-medium">Dairy, Poultry, Pigs, Conc.</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[#0b542c] flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">Nuscience</div>
              <div className="text-xs text-slate-500 font-medium">5% & 25% Formulas</div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xl font-extrabold text-slate-900">5 Depots</div>
              <div className="text-xs text-slate-500 font-medium">Countrywide Delivery</div>
            </div>
          </div>
        </div>

        {/* Change Password Modal */}
        {isChangePasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-6 border border-gray-100 space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                  <Key className="w-4 h-4 text-[#0b542c]" />
                  <span>Update Admin Password</span>
                </h3>
                <button
                  onClick={() => setIsChangePasswordOpen(false)}
                  className="text-gray-400 hover:text-slate-600 text-sm font-bold p-1"
                >
                  ✕
                </button>
              </div>

              {passwordChangeMessage.text && (
                <div className={`p-3 rounded-xl text-xs font-semibold ${
                  passwordChangeMessage.type === 'success' 
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  {passwordChangeMessage.text}
                </div>
              )}

              <form onSubmit={handleChangePassword} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPasswordInput}
                    onChange={(e) => setCurrentPasswordInput(e.target.value)}
                    placeholder="Enter current password"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPasswordInput}
                    onChange={(e) => setNewPasswordInput(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPasswordInput}
                    onChange={(e) => setConfirmPasswordInput(e.target.value)}
                    placeholder="Re-type new password"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsChangePasswordOpen(false)}
                    className="px-4 py-2 bg-gray-100 text-slate-700 rounded-xl font-medium hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#0b542c] text-white rounded-xl font-bold hover:bg-[#073d1f] shadow-sm"
                  >
                    Save New Password
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Dashboard Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Product Upload Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
              <PlusCircle className="w-5 h-5 text-[#0b542c]" />
              <span>Add New Feed Product</span>
            </h2>

            {successNotice && (
              <div className="mb-4 p-3 bg-emerald-50 text-[#0b542c] border border-emerald-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-fadeIn">
                <Check className="w-4 h-4 text-emerald-600" />
                <span>Product successfully added to live store!</span>
              </div>
            )}

            <form onSubmit={handleProductSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Feed Product Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Afyachoice Layer 165 Mash (50Kg)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c] bg-white font-medium"
                  >
                    <option value="poultry">Poultry Feeds</option>
                    <option value="pig">Pig Feeds</option>
                    <option value="dairy">Dairy & Cattle</option>
                    <option value="concentrate">Nuscience Concentrates</option>
                    <option value="other">Other Livestock</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Packaging</label>
                  <input
                    type="text"
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    placeholder="50 Kg Bag"
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price per Bag (KES) *</label>
                  <input
                    type="number"
                    required
                    placeholder="3250"
                    value={pricePerBag}
                    onChange={(e) => handlePricePerBagChange(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c] font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Price per Kg (KES)</label>
                  <input
                    type="number"
                    placeholder="65"
                    value={pricePerKg}
                    onChange={(e) => setPricePerKg(e.target.value)}
                    className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Product Image URL (Optional)</label>
                <input
                  type="text"
                  placeholder="https://... or leave blank for default sack"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Feed Description & Target Stages</label>
                <textarea
                  rows="2"
                  placeholder="Suitable for layers from week 18 onwards. Boosts egg size and shell hardness."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Benefit 1</label>
                  <input
                    type="text"
                    placeholder="e.g. 18% Crude Protein"
                    value={benefit1}
                    onChange={(e) => setBenefit1(e.target.value)}
                    className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Key Benefit 2</label>
                  <input
                    type="text"
                    placeholder="e.g. Enriched with Calcium"
                    value={benefit2}
                    onChange={(e) => setBenefit2(e.target.value)}
                    className="w-full p-2 rounded-xl border border-gray-200 focus:outline-none focus:border-[#0b542c]"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-[#0b542c] hover:bg-[#073d1f] text-white font-bold py-3 rounded-xl shadow-md transition flex items-center justify-center gap-2 mt-2"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Save Feed to Live Catalog</span>
              </button>
            </form>
          </div>

          {/* Right Column: Current Live Products Inventory Table */}
          <div className="lg:col-span-2 bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Live Products Catalog ({products.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Manage stock items visible to farmers across Kenya.
                </p>
              </div>

              {/* Quick Search */}
              <input
                type="text"
                placeholder="Filter by name or category..."
                value={searchFilter}
                onChange={(e) => setSearchFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:border-[#0b542c]"
              />
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400 uppercase font-bold text-[11px]">
                    <th className="py-2.5">Feed Name</th>
                    <th className="py-2.5">Category</th>
                    <th className="py-2.5">Packaging</th>
                    <th className="py-2.5">Price/Bag</th>
                    <th className="py-2.5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map(p => (
                    <tr key={p.id} className="hover:bg-slate-50/80 transition">
                      <td className="py-3 font-bold text-slate-900 flex items-center gap-2">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-8 h-8 rounded-lg object-contain flex-shrink-0 border border-gray-200 bg-slate-50 p-0.5"
                        />
                        <div>
                          <span className="line-clamp-1">{p.name}</span>
                          {p.label && (
                            <span className="text-[10px] text-emerald-700 font-semibold block">
                              {p.label}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="bg-[#f0f9f3] text-[#0b542c] px-2 py-0.5 rounded-full font-bold uppercase text-[10px] border border-emerald-200">
                          {p.category}
                        </span>
                      </td>
                      <td className="py-3 text-slate-600 font-medium">
                        {p.packaging}
                      </td>
                      <td className="py-3 font-extrabold text-slate-900">
                        KES {p.pricePerBag.toLocaleString()}
                        <span className="text-[10px] font-normal text-slate-400 block">
                          KES {p.pricePerKg}/kg
                        </span>
                      </td>
                      <td className="py-3 text-right">
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${p.name}"?`)) {
                              onDeleteProduct(p.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition"
                          title="Delete feed item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredProducts.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-8 text-slate-400 text-xs">
                        No feeds found matching "{searchFilter}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

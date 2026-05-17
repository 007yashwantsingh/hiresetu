import React, { useEffect, useState } from "react";
import {
  Briefcase, Building2, Users, ShieldCheck, ArrowRight, Search,
  Stethoscope, Landmark, Headphones, TrendingUp, Pill, Code2,
  CheckCircle2, MapPin, IndianRupee, Clock3, UserCheck, BarChart3,
  Bell, Bookmark, CalendarCheck, Sparkles, Zap, Eye, Send, Menu, X,
  ChevronRight, LogOut, LayoutDashboard, PlusCircle, ClipboardList,
  UserCog, LockKeyhole, Mail, Filter, FileText, AlertCircle,
  Star, Trophy, Target, Globe, Phone, Activity, RefreshCw, Trash2,
} from "lucide-react";

const API = "https://backend-gamma-one-40.vercel.app";

const categories = [
  { title: "Pharma", icon: Pill, desc: "Production, QA, R&D, Medical Rep", gradient: "from-blue-500 to-cyan-400" },
  { title: "IT / Software", icon: Code2, desc: "Developers, QA, Cloud, AI, Support", gradient: "from-indigo-500 to-blue-500" },
  { title: "Banking / Finance", icon: Landmark, desc: "Sales, Credit, Operations, Accounts", gradient: "from-emerald-500 to-teal-400" },
  { title: "Sales & Marketing", icon: TrendingUp, desc: "Field Sales, Digital, B2B, Retail", gradient: "from-orange-500 to-amber-400" },
  { title: "Healthcare", icon: Stethoscope, desc: "Nurses, Technicians, Admin, Clinics", gradient: "from-rose-500 to-pink-400" },
  { title: "BPO / Customer Support", icon: Headphones, desc: "Voice, Non-Voice, Chat, Backend", gradient: "from-violet-500 to-purple-400" },
];

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
    * { font-family: 'DM Sans', sans-serif; }
    .font-display { font-family: 'Sora', sans-serif; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-glow { 0%,100%{opacity:.15} 50%{opacity:.3} }
    @keyframes fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes slide-in { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
    .animate-float { animation: float 5s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-fade-up { animation: fade-up .5s ease both; }
    .animate-slide-in { animation: slide-in .35s cubic-bezier(.2,.8,.2,1) both; }
    .animate-spin { animation: spin 1s linear infinite; }
    .card-hover { transition: all .25s cubic-bezier(.2,.8,.2,1); }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px -10px rgba(15,23,42,.15); }
    .btn-press:active { transform: scale(.97); }
    .hero-grid { background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 40px 40px; }
    .nav-link { position:relative; } .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#3b82f6; transition:.3s; border-radius:2px; } .nav-link:hover::after { width:100%; }
    ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }
    .tag-new { background:linear-gradient(135deg,#dbeafe,#bfdbfe); color:#1e40af; }
    .tag-urgent { background:linear-gradient(135deg,#fee2e2,#fecaca); color:#991b1b; }
    .tag-active { background:linear-gradient(135deg,#dcfce7,#bbf7d0); color:#166534; }
    .tag-verified { background:linear-gradient(135deg,#ede9fe,#ddd6fe); color:#5b21b6; }
    .tag-freshers { background:linear-gradient(135deg,#fef9c3,#fef08a); color:#854d0e; }
    .tag-walk { background:linear-gradient(135deg,#ffedd5,#fed7aa); color:#9a3412; }
  `}</style>
);

function JobTag({ tag }) {
  const map = { "Actively Hiring":"tag-active","New":"tag-new","Urgent":"tag-urgent","Verified":"tag-verified","Freshers":"tag-freshers","Walk-in":"tag-walk" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[tag] || "bg-slate-100 text-slate-600"}`}>{tag}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────
function Navbar({ setPage, role, setRole }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = Boolean(role);
  function logout() { setRole(null); setPage("home"); setMenuOpen(false); }
  function goDashboard() { setPage(role === "admin" ? "admin" : role === "employer" ? "employer" : "candidate"); setMenuOpen(false); }
  function navTo(p) { setPage(p); setMenuOpen(false); }
  const roleColor = { candidate:"from-blue-600 to-indigo-600", employer:"from-emerald-500 to-teal-600", admin:"from-rose-500 to-orange-500" };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-2xl shadow-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={() => navTo("home")} className="flex items-center gap-3 btn-press">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-800 text-white shadow-lg"><Briefcase size={20} /></div>
            <div className="text-left">
              <h1 className="font-display text-lg font-black tracking-tight text-slate-950 leading-none">HireSetu</h1>
              <p className="text-[10px] font-semibold text-slate-400 tracking-wide">Premium Hiring Network</p>
            </div>
          </button>
          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            {["home","jobs","categories"].map((p) => (
              <button key={p} onClick={() => navTo(p)} className="nav-link capitalize hover:text-slate-950 transition-colors">
                {p === "home" ? "Home" : p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
            {loggedIn && <button onClick={goDashboard} className="nav-link hover:text-slate-950 transition-colors">Dashboard</button>}
          </nav>
          <div className="flex items-center gap-2">
            {!loggedIn ? (
              <>
                <button onClick={() => navTo("login")} className="hidden rounded-xl px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-100 transition-colors sm:block btn-press">Login</button>
                <button onClick={() => navTo("register")} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 transition-all btn-press">Register</button>
              </>
            ) : (
              <>
                <button onClick={goDashboard} className={`rounded-xl bg-gradient-to-r ${roleColor[role]} px-4 py-2 text-xs font-black text-white uppercase tracking-wider btn-press`}>{role}</button>
                <button onClick={logout} className="rounded-xl bg-slate-100 p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors btn-press"><LogOut size={18} /></button>
              </>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl bg-slate-100 p-2.5 text-slate-700 hover:bg-slate-200 md:hidden btn-press">
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden" onClick={() => setMenuOpen(false)}>
          <div className="absolute inset-0 bg-slate-950/30 backdrop-blur-sm" />
          <div className="absolute right-0 top-0 h-full w-72 bg-white shadow-2xl animate-slide-in" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <span className="font-display font-black text-slate-950">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="rounded-xl bg-slate-100 p-2"><X size={18} /></button>
            </div>
            <div className="p-5 space-y-2">
              {[{label:"Home",page:"home"},{label:"Find Jobs",page:"jobs"},{label:"Categories",page:"categories"}].map(item => (
                <button key={item.page} onClick={() => navTo(item.page)} className="w-full rounded-2xl px-5 py-3.5 text-left font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-between">
                  {item.label}<ChevronRight size={16} className="text-slate-400" />
                </button>
              ))}
              {loggedIn ? (
                <>
                  <button onClick={goDashboard} className="w-full rounded-2xl px-5 py-3.5 text-left font-semibold text-blue-600 bg-blue-50 flex items-center justify-between">Dashboard<ChevronRight size={16} /></button>
                  <button onClick={logout} className="w-full rounded-2xl px-5 py-3.5 text-left font-semibold text-red-600 bg-red-50 flex items-center gap-2"><LogOut size={16} /> Logout</button>
                </>
              ) : (
                <button onClick={() => navTo("register")} className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-center font-bold text-white mt-4 btn-press">Get Started</button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Login Page ───────────────────────────────────────────────────
function LoginPage({ setRole, setPage, showToast }) {
  const [selRole, setSelRole] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  async function handleLogin() {
    if (!email || !password) { setError("Email and password are required"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/login`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ email, password, role:selRole }) });
      const data = await res.json();
      if (!data.ok) { setError(data.message || "Invalid credentials"); setLoading(false); return; }
      localStorage.setItem("hs_user", JSON.stringify({ name:data.user?.name, email, role:data.user?.role||selRole, token:data.token }));
      setRole(data.user?.role || selRole);
      showToast?.("Welcome back!", "success");
      const r = data.user?.role || selRole;
      setPage(r === "admin" ? "admin" : r === "employer" ? "employer" : "candidate");
    } catch { setError("Backend offline — use Demo Login below"); setShowDemo(true); }
    setLoading(false);
  }

  function demoLogin(r) { setRole(r); showToast?.(`Logged in as ${r}`, "success"); setPage(r === "admin" ? "admin" : r === "employer" ? "employer" : "candidate"); }

  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-200 animate-fade-up">
          <div className="mb-7 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-800 text-white shadow-lg"><Briefcase size={26} /></div>
            <h2 className="font-display text-2xl font-black text-slate-950">Sign in to HireSetu</h2>
            <p className="mt-1.5 text-sm font-semibold text-slate-400">New here? <button onClick={() => setPage("register")} className="font-bold text-blue-600 hover:underline">Create an account</button></p>
          </div>
          <div className="mb-5 flex gap-2 rounded-2xl bg-slate-100 p-1">
            {["candidate","employer"].map((r) => (
              <button key={r} onClick={() => setSelRole(r)} className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all btn-press ${selRole===r ? "bg-white text-slate-950 shadow-md" : "text-slate-500"}`}>
                {r === "candidate" ? "👤 Candidate" : "🏢 Employer"}
              </button>
            ))}
          </div>
          {error && <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100"><AlertCircle size={17} className="text-red-500 shrink-0" /><p className="text-sm font-bold text-red-700">{error}</p></div>}
          <div className="space-y-3">
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-200 focus-within:ring-blue-500 transition-all">
              <Mail size={17} className="text-slate-400 shrink-0" />
              <input type="email" placeholder="you@example.com" value={email} onChange={(e) => { setEmail(e.target.value); setError(""); }} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" />
            </div>
            <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-200 focus-within:ring-blue-500 transition-all">
              <LockKeyhole size={17} className="text-slate-400 shrink-0" />
              <input type={showPass?"text":"password"} placeholder="Enter your password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" />
              <button onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600 shrink-0"><Eye size={17} /></button>
            </div>
          </div>
          <button onClick={handleLogin} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white text-sm shadow-lg shadow-blue-600/25 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2">
            {loading ? <><RefreshCw size={16} className="animate-spin" /> Signing in...</> : <>Sign In <ArrowRight size={17} /></>}
          </button>
          <div className="mt-5 flex items-center gap-3"><div className="h-px flex-1 bg-slate-200" /><span className="text-xs font-bold text-slate-400">or</span><div className="h-px flex-1 bg-slate-200" /></div>
          <button onClick={() => setShowDemo(!showDemo)} className="mt-4 w-full flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors ring-1 ring-slate-200">
            <span>Demo Login (Testing)</span>
            <ChevronRight size={16} className={`transition-transform ${showDemo?"rotate-90":""}`} />
          </button>
          {showDemo && (
            <div className="mt-2 grid gap-2 animate-fade-up">
              {[{r:"candidate",label:"👤 Login as Candidate",cls:"bg-blue-50 text-blue-700 ring-blue-100"},
                {r:"employer",label:"🏢 Login as Employer",cls:"bg-emerald-50 text-emerald-700 ring-emerald-100"},
                {r:"admin",label:"🛡️ Login as Admin",cls:"bg-slate-950 text-white ring-slate-800"}
              ].map((d) => (
                <button key={d.r} onClick={() => demoLogin(d.r)} className={`rounded-2xl px-5 py-3 text-sm font-bold ring-1 transition-all btn-press ${d.cls}`}>{d.label}</button>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── Register Page ────────────────────────────────────────────────
function RegisterPage({ setRole, setPage, showToast }) {
  const [selRole, setSelRole] = useState("candidate");
  const [form, setForm] = useState({ name:"", email:"", phone:"", password:"", confirm:"" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function upd(f, v) { setForm((p) => ({...p,[f]:v})); setErrors((p) => ({...p,[f]:""})); }

  function validate() {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.phone || form.phone.length < 10) e.phone = "10-digit phone required";
    if (!form.password || form.password.length < 6) e.password = "Min 6 characters";
    if (form.password !== form.confirm) e.confirm = "Passwords don't match";
    return e;
  }

  async function handleRegister() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/auth/register`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ name:form.name.trim(), email:form.email, phone:form.phone, password:form.password, role:selRole }) });
      const data = await res.json();
      if (!data.ok) { setErrors({ general:data.message||"Registration failed" }); setLoading(false); return; }
      localStorage.setItem("hs_user", JSON.stringify({ name:form.name.trim(), email:form.email, role:selRole, token:data.token }));
      setDone(true);
      showToast?.(`Welcome, ${form.name}!`, "success");
      setTimeout(() => { setRole(selRole); setPage(selRole==="employer"?"employer":"candidate"); }, 1800);
    } catch {
      setDone(true);
      showToast?.("Account created!", "success");
      setTimeout(() => { setRole(selRole); setPage(selRole==="employer"?"employer":"candidate"); }, 1800);
    }
    setLoading(false);
  }

  if (done) return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 flex items-center justify-center px-4">
      <div className="text-center animate-fade-up">
        <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/30"><CheckCircle2 size={40} className="text-white" /></div>
        <h2 className="font-display text-3xl font-black text-slate-950">You're all set!</h2>
        <p className="mt-3 text-base font-semibold text-slate-500">Taking you to your dashboard...</p>
      </div>
    </section>
  );

  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-[2rem] bg-white p-8 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-200 animate-fade-up">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg"><UserCheck size={26} /></div>
            <h2 className="font-display text-2xl font-black text-slate-950">Create your account</h2>
            <p className="mt-1.5 text-sm font-semibold text-slate-400">Already have one? <button onClick={() => setPage("login")} className="font-bold text-blue-600 hover:underline">Sign in</button></p>
          </div>
          <div className="mb-5 flex gap-2 rounded-2xl bg-slate-100 p-1">
            {["candidate","employer"].map((r) => (
              <button key={r} onClick={() => setSelRole(r)} className={`flex-1 rounded-xl py-2.5 text-sm font-bold transition-all btn-press ${selRole===r ? "bg-white text-slate-950 shadow-md" : "text-slate-500"}`}>
                {r === "candidate" ? "👤 Job Seeker" : "🏢 Employer"}
              </button>
            ))}
          </div>
          {errors.general && <div className="mb-4 flex items-center gap-2.5 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100"><AlertCircle size={17} className="text-red-500 shrink-0" /><p className="text-sm font-bold text-red-700">{errors.general}</p></div>}
          <div className="space-y-3">
            {[{f:"name",placeholder:"Full Name",icon:UserCheck},{f:"email",placeholder:"Email Address",icon:Mail,type:"email"},{f:"phone",placeholder:"Mobile Number (10 digits)",icon:Phone}].map(({f,placeholder,icon:Icon,type="text"}) => (
              <div key={f}>
                <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 transition-all ${errors[f]?"ring-red-400 bg-red-50":"ring-slate-200 focus-within:ring-blue-500"}`}>
                  <Icon size={17} className="text-slate-400 shrink-0" />
                  <input type={type} placeholder={placeholder} value={form[f]} onChange={(e) => upd(f,e.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" />
                </div>
                {errors[f] && <p className="mt-1 text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors[f]}</p>}
              </div>
            ))}
            <div>
              <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 transition-all ${errors.password?"ring-red-400 bg-red-50":"ring-slate-200 focus-within:ring-blue-500"}`}>
                <LockKeyhole size={17} className="text-slate-400 shrink-0" />
                <input type={showPass?"text":"password"} placeholder="Password (min 6 chars)" value={form.password} onChange={(e) => upd("password",e.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" />
                <button onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600 shrink-0"><Eye size={17} /></button>
              </div>
              {errors.password && <p className="mt-1 text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.password}</p>}
            </div>
            <div>
              <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 transition-all ${errors.confirm?"ring-red-400 bg-red-50":"ring-slate-200 focus-within:ring-blue-500"}`}>
                <LockKeyhole size={17} className="text-slate-400 shrink-0" />
                <input type="password" placeholder="Confirm Password" value={form.confirm} onChange={(e) => upd("confirm",e.target.value)} className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400" />
              </div>
              {errors.confirm && <p className="mt-1 text-xs font-bold text-red-500 flex items-center gap-1"><AlertCircle size={11} /> {errors.confirm}</p>}
            </div>
          </div>
          <button onClick={handleRegister} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white text-sm shadow-lg shadow-blue-600/25 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2">
            {loading ? <><RefreshCw size={16} className="animate-spin" /> Creating account...</> : <>Create Account <ArrowRight size={17} /></>}
          </button>
          <p className="mt-4 text-center text-xs font-semibold text-slate-400">🔒 Data secure. Never sold to third parties.</p>
        </div>
      </div>
    </section>
  );
}

// ─── Home Page ────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedCategory }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-[#0d1b3e] to-blue-950 text-white hero-grid">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-y-1/4 rounded-full bg-blue-600/20 blur-[100px] animate-pulse-glow" />
        <div className="absolute right-1/4 bottom-0 h-96 w-96 translate-y-1/4 rounded-full bg-violet-500/15 blur-[80px] animate-pulse-glow" style={{animationDelay:"2s"}} />
        <div className="relative mx-auto grid max-w-7xl items-center gap-14 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-2">
          <div className="animate-fade-up">
            <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/8 px-5 py-2.5 text-xs font-bold text-blue-200 backdrop-blur">
              <ShieldCheck size={15} className="text-blue-400" /> Verified hiring across 6 focused industries
            </div>
            <h2 className="font-display max-w-3xl text-5xl font-black leading-[1.05] tracking-tight sm:text-6xl md:text-7xl">
              Your Career.<br /><span className="text-blue-300">One Smart</span><br />Platform.
            </h2>
            <p className="mt-6 max-w-lg text-base leading-8 text-slate-400">
              Discover category-based jobs across Pharma, IT, Banking, Sales, Healthcare and BPO — with pre-screened candidates and expert placement support.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage("jobs")} className="flex items-center justify-center gap-2.5 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-4 text-base font-bold text-white shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 transition-all btn-press">
                Find Jobs <Search size={18} />
              </button>
              <button onClick={() => setPage("register")} className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/8 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/15 transition-all btn-press">
                Post a Job <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[{icon:ShieldCheck,text:"Pre-screened candidates"},{icon:Zap,text:"6 industry verticals"},{icon:CheckCircle2,text:"Commission-only model"}].map(item => (
                <div key={item.text} className="flex items-center gap-3 rounded-2xl border border-white/8 bg-white/5 px-4 py-3 backdrop-blur">
                  <item.icon size={16} className="text-blue-300 shrink-0" />
                  <p className="text-xs font-bold text-slate-300">{item.text}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Hiring Board Widget */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-fade-up" style={{animationDelay:".15s"}}>
            <div className="animate-float rounded-[2.5rem] border border-white/10 bg-white/8 p-3 shadow-2xl backdrop-blur-xl">
              <div className="overflow-hidden rounded-[2rem] bg-slate-50">
                <div className="bg-gradient-to-br from-slate-950 to-blue-950 p-5 text-white">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 shadow-lg"><Briefcase size={22} /></div>
                      <div><h3 className="font-display text-lg font-black">Live Hiring Board</h3><p className="text-xs font-semibold text-blue-200">Fresh jobs across top industries</p></div>
                    </div>
                    <div className="rounded-2xl bg-white/10 p-2.5"><Bell size={18} /></div>
                  </div>
                  <div className="mt-4 rounded-2xl bg-emerald-500/20 px-4 py-3 ring-1 ring-emerald-400/30">
                    <p className="text-xs font-black text-emerald-300">🚀 Beta Launch — Accepting testers</p>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">Register now and explore all features</p>
                  </div>
                </div>
                <div className="p-4">
                  <div className="rounded-2xl bg-amber-50 p-3.5 ring-1 ring-amber-100">
                    <div className="flex items-start gap-3">
                      <Zap className="mt-0.5 text-orange-500 shrink-0" size={18} />
                      <div><p className="text-sm font-black text-amber-900">6 industry categories live</p><p className="text-xs font-semibold text-amber-700 mt-0.5">Pharma · IT · Banking · Sales · Healthcare · BPO</p></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {categories.slice(0,4).map(cat => {
                      const Icon = cat.icon;
                      return (
                        <button key={cat.title} onClick={() => { setSelectedCategory(cat.title); setPage("jobs"); }} className="rounded-2xl bg-white p-3.5 text-left shadow-sm ring-1 ring-slate-200 card-hover btn-press">
                          <div className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}><Icon size={16} /></div>
                          <p className="text-xs font-black text-slate-950">{cat.title}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <CategorySection setPage={setPage} setSelectedCategory={setSelectedCategory} />
      <WhyUsSection />
    </>
  );
}

function CategorySection({ setPage, setSelectedCategory }) {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Industry First" title="Explore Jobs By Category" desc="Six focused hiring lanes. Find the right opportunity in your industry." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <button key={cat.title} onClick={() => { setSelectedCategory(cat.title); setPage("jobs"); }} className="group relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-6 text-left shadow-sm card-hover btn-press">
                <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${cat.gradient} opacity-8 blur-2xl group-hover:opacity-15 transition-opacity duration-500`} />
                <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}><Icon size={26} /></div>
                <h3 className="font-display relative mt-5 text-2xl font-black text-slate-950">{cat.title}</h3>
                <p className="relative mt-3 text-sm leading-7 text-slate-500">{cat.desc}</p>
                <span className="relative mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-950 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  Explore Jobs <ArrowRight size={16} />
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function WhyUsSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Why Companies Choose Us</p>
          <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pre-screened candidates. Zero hiring noise.</h2>
          <p className="mt-5 text-base leading-8 text-slate-500">HireSetu's team screens every candidate — aptitude tested, 1st round interviewed — before you ever speak to them. Save time. Hire better.</p>
          <div className="mt-8 space-y-3">
            {["Pre-screened & aptitude-tested candidates only","1st round interview done by HireSetu team","Industry-focused search across 6 key sectors","Commission-only — pay only when you hire"].map((point) => (
              <div key={point} className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                <CheckCircle2 className="text-emerald-500 shrink-0" size={20} />
                <p className="font-semibold text-slate-700 text-sm">{point}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-[2rem] bg-slate-50 p-4">
          <div className="rounded-[1.6rem] bg-white p-6 shadow-xl ring-1 ring-slate-200">
            <div className="flex items-center justify-between mb-6">
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Hiring Process</p><h3 className="font-display text-xl font-black text-slate-950">How HireSetu Works</h3></div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Sparkles size={20} /></div>
            </div>
            <div className="space-y-3">
              {[
                { icon:Users, title:"Candidate Registers", desc:"Creates profile, applies for jobs" },
                { icon:ShieldCheck, title:"HireSetu Screens", desc:"Aptitude test + 1st round interview" },
                { icon:Building2, title:"Sent to Company HR", desc:"Only verified candidates shown" },
                { icon:Trophy, title:"Successful Placement", desc:"Commission charged to company" },
              ].map((step) => (
                <div key={step.title} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><step.icon size={18} /></div>
                  <div><p className="font-black text-slate-950 text-sm">{step.title}</p><p className="text-xs font-bold text-slate-400">{step.desc}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Jobs Page ────────────────────────────────────────────────────
function JobsPage({ jobs, selectedCategory, setSelectedCategory, role, setRole, setPage, applyToJob }) {
  const [query, setQuery] = useState("");
  const filtered = jobs.filter((j) => j.status==="Approved" && (!selectedCategory||j.category===selectedCategory) && `${j.title} ${j.company} ${j.location}`.toLowerCase().includes(query.toLowerCase()));

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="rounded-[2rem] bg-gradient-to-br from-slate-950 via-[#0d1b3e] to-blue-950 p-6 text-white shadow-2xl sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-300">Job Search</p>
          <h2 className="font-display mt-3 text-4xl font-black tracking-tight sm:text-5xl">Find the right job faster.</h2>
          <p className="mt-3 text-slate-400 max-w-xl">Pre-screened opportunities from verified employers across 6 industry categories.</p>
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[260px_1fr]">
          <aside>
            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 sticky top-24">
              <div className="mb-4 flex items-center gap-2 font-black text-slate-950"><Filter size={17} /><span className="font-display">Categories</span></div>
              <button onClick={() => setSelectedCategory("")} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors ${!selectedCategory?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg":"bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>All Categories</button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return <button key={cat.title} onClick={() => setSelectedCategory(cat.title)} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors flex items-center gap-2.5 ${selectedCategory===cat.title?"bg-gradient-to-r from-blue-600 to-indigo-600 text-white":"bg-slate-50 text-slate-600 hover:bg-slate-100"}`}><Icon size={15} />{cat.title}</button>;
              })}
            </div>
          </aside>
          <main>
            <div className="mb-5 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-200 focus-within:ring-blue-500 transition-all">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, title, location..." className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400" />
              </div>
              {filtered.length > 0 && <p className="mt-3 px-1 text-xs font-bold text-slate-400">{filtered.length} job{filtered.length!==1?"s":""} found</p>}
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {filtered.map((job) => (
                <div key={job._id||job.id} className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm card-hover">
                  <div className="mb-4 flex items-start justify-between gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100"><Building2 size={22} /></div>
                    <JobTag tag={job.tag} />
                  </div>
                  <h3 className="font-display text-lg font-black text-slate-950">{job.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-slate-500">
                     {role === "candidate" ? "Confidential Hiring Partner" : job.company}
                   </p>
                  {job.description && <p className="mt-3 text-sm leading-6 text-slate-500">{job.description}</p>}
                  <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
                    {job.location && <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>}
                    {job.salary && <span className="flex items-center gap-1.5"><IndianRupee size={13} />{job.salary}</span>}
                    {job.exp && <span className="flex items-center gap-1.5"><Clock3 size={13} />{job.exp}</span>}
                    <span className="flex items-center gap-1.5"><Briefcase size={13} />{job.category}</span>
                  </div>
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors btn-press">Details</button>
                    <button onClick={() => { if(role!=="candidate"){setRole("candidate");setPage("candidate");setTimeout(()=>applyToJob(job),0);}else{applyToJob(job);setPage("candidate");} }} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 transition-all btn-press">Apply Now</button>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-slate-200">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100"><Briefcase size={28} className="text-slate-300" /></div>
                <p className="font-display font-black text-slate-700 text-lg">No jobs posted yet</p>
                <p className="mt-2 text-sm font-semibold text-slate-400">Check back soon — new opportunities are added regularly</p>
                <button onClick={() => { setQuery(""); setSelectedCategory(""); }} className="mt-5 rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white btn-press">View All Categories</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

// ─── Candidate Dashboard ──────────────────────────────────────────
function CandidateDashboard({
  applications,
  candidateResume,
  setCandidateResume,
  candidateProfile,
  setCandidateProfile,
  showToast,
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [uploadingResume, setUploadingResume] = useState(false);
  const [deletingResume, setDeletingResume] = useState(false);

  const currentUser = (() => {
    try {
      const saved = JSON.parse(localStorage.getItem("hs_user") || "{}");
      return {
        id: saved.id || saved._id || saved.email || "demo-user",
        name: saved.name || "Candidate User",
        email: saved.email || "candidate@test.com",
        phone: saved.phone || "",
      };
    } catch {
      return {
        id: "demo-user",
        name: "Candidate User",
        email: "candidate@test.com",
        phone: "",
      };
    }
  })();

  const emptyForm = {
    phone: currentUser.phone || "",
    skills: "",
    currentCompany: "",
    expectedSalary: "",
    preferredCategory: "IT / Software",
    experience: "",
    summary: "",
  };

  const [profileForm, setProfileForm] = useState(emptyForm);

  function updateProfileForm(field, value) {
    setProfileForm((prev) => ({ ...prev, [field]: value }));
  }

  function hydrateProfileForm(profile) {
    if (!profile) return;

    setProfileForm({
      phone: profile.phone || currentUser.phone || "",
      skills: Array.isArray(profile.skills)
        ? profile.skills.join(", ")
        : profile.skills || "",
      currentCompany: profile.currentCompany || "",
      expectedSalary: profile.expectedSalary || "",
      preferredCategory: profile.preferredCategory || "IT / Software",
      experience: profile.experience || "",
      summary: profile.summary || "",
    });
  }

  function calculateProfileStrength(profile) {
    if (!profile) return 0;

    const completed = [
      profile.email,
      profile.phone,
      Array.isArray(profile.skills) ? profile.skills.length > 0 : Boolean(profile.skills),
      profile.currentCompany,
      profile.expectedSalary,
      profile.preferredCategory,
      profile.experience,
      profile.summary,
      profile.resumeUrl || profile.resumeFileName || candidateResume?.name,
    ].filter(Boolean).length;

    return Math.min(100, Math.round((completed / 9) * 100));
  }

  const profileStrength =
    candidateProfile?.profileStrength || calculateProfileStrength(candidateProfile);

  const hasSavedProfile = Boolean(
    candidateProfile &&
      (candidateProfile.skills?.length ||
        candidateProfile.currentCompany ||
        candidateProfile.expectedSalary ||
        candidateProfile.experience ||
        candidateProfile.summary)
  );

  const resumeName =
    candidateProfile?.resumeFileName || candidateResume?.name || "";

  useEffect(() => {
    async function fetchCandidateProfile() {
      if (!currentUser.email) return;

      setLoadingProfile(true);

      try {
        const res = await fetch(
          `${API}/api/candidate/profile/${encodeURIComponent(currentUser.email)}`
        );
        const data = await res.json();

        if (data.ok && data.profile) {
          setCandidateProfile?.(data.profile);
          hydrateProfileForm(data.profile);

          if (data.profile.resumeFileName) {
            setCandidateResume?.({
              name: data.profile.resumeFileName,
              url: data.profile.resumeUrl,
              uploaded: true,
            });
          }
        }
      } catch (err) {
        console.log("Candidate profile not loaded yet", err);
      }

      setLoadingProfile(false);
    }

    fetchCandidateProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function uploadResume(file) {
    if (!file) return;

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const allowedExt = [".pdf", ".doc", ".docx"].some((ext) =>
      file.name.toLowerCase().endsWith(ext)
    );

    if (!allowedTypes.includes(file.type) && !allowedExt) {
      showToast?.("Only PDF, DOC or DOCX resume allowed", "error");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast?.("Resume must be under 5 MB", "error");
      return;
    }

    setUploadingResume(true);

    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("email", currentUser.email);
      formData.append("userId", currentUser.id);
      formData.append("name", currentUser.name);
      formData.append("phone", profileForm.phone || currentUser.phone || "");

      const res = await fetch(`${API}/api/candidate/resume`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (!data.ok) {
        showToast?.(data.message || "Resume upload failed", "error");
        setUploadingResume(false);
        return;
      }

      setCandidateResume?.({
        name: data.profile?.resumeFileName || file.name,
        url: data.profile?.resumeUrl,
        uploaded: true,
      });

      setCandidateProfile?.(data.profile);
      hydrateProfileForm(data.profile);
      showToast?.("Resume uploaded successfully", "success");
    } catch (err) {
      console.error(err);
      showToast?.("Resume upload failed. Check backend/Cloudinary.", "error");
    }

    setUploadingResume(false);
  }

  async function deleteResume() {
    if (!currentUser.email) {
      showToast?.("Please login again before deleting resume", "error");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this resume? You will need to upload a resume again before applying to jobs."
    );

    if (!confirmed) return;

    setDeletingResume(true);

    try {
      const res = await fetch(
        `${API}/api/candidate/resume/${encodeURIComponent(currentUser.email)}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (!data.ok) {
        showToast?.(data.message || "Failed to delete resume", "error");
        setDeletingResume(false);
        return;
      }

      setCandidateResume?.(null);
      setCandidateProfile?.(data.profile || null);
      hydrateProfileForm(data.profile);
      showToast?.("Resume deleted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast?.("Resume delete failed. Check backend connection.", "error");
    }

    setDeletingResume(false);
  }

  async function saveCandidateProfile() {
    if (!currentUser.email) {
      showToast?.("Please login again before saving profile", "error");
      return;
    }

    const skills = profileForm.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (!profileForm.phone.trim()) {
      showToast?.("Phone number is required", "error");
      return;
    }

    if (!skills.length) {
      showToast?.("Please add at least one skill", "error");
      return;
    }

    if (!profileForm.experience.trim()) {
      showToast?.("Experience is required", "error");
      return;
    }

    setSavingProfile(true);

    try {
      const res = await fetch(`${API}/api/candidate/profile`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: currentUser.id,
          name: currentUser.name,
          email: currentUser.email,
          phone: profileForm.phone.trim(),
          skills,
          currentCompany: profileForm.currentCompany.trim(),
          expectedSalary: profileForm.expectedSalary.trim(),
          preferredCategory: profileForm.preferredCategory,
          experience: profileForm.experience.trim(),
          summary: profileForm.summary.trim(),
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast?.(data.message || "Failed to save profile", "error");
        setSavingProfile(false);
        return;
      }

      setCandidateProfile?.(data.profile);
      hydrateProfileForm(data.profile);
      setProfileOpen(false);
      showToast?.("Profile saved successfully", "success");
    } catch (err) {
      console.error(err);
      showToast?.("Profile save failed. Check backend connection.", "error");
    }

    setSavingProfile(false);
  }

  return (
    <>
      <DashboardShell
        title="Candidate Dashboard"
        subtitle="Apply, save and track your job applications"
        badge="Candidate"
        badgeColor="from-blue-600 to-indigo-600"
      >
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          <StatCard icon={Send} value={applications.length} label="Applications" color="bg-blue-600" />
          <StatCard icon={Eye} value={profileStrength ? 1 : 0} label="Profile Views" color="bg-emerald-600" />
          <StatCard icon={CalendarCheck} value={0} label="Interviews" color="bg-orange-500" />
          <StatCard icon={Bookmark} value={0} label="Saved Jobs" color="bg-violet-600" />
        </div>

        <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="font-display text-lg font-black text-slate-950">
                Resume Upload
              </h3>

              <p className="mt-1 text-sm font-semibold text-slate-500">
                Resume is mandatory before applying to jobs.
              </p>

              {resumeName ? (
                <div className="mt-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="break-all text-sm font-bold text-emerald-600">
                      Uploaded: {resumeName}
                    </p>

                    <button
                      type="button"
                      onClick={deleteResume}
                      disabled={deletingResume}
                      title="Delete resume"
                      className="inline-flex h-6 min-w-6 items-center justify-center rounded-full bg-red-50 px-2 text-xs font-black text-red-600 ring-1 ring-red-100 hover:bg-red-100 disabled:opacity-60"
                    >
                      {deletingResume ? "..." : "✕"}
                    </button>
                  </div>

                  {candidateProfile?.resumeUrl && (
                    <a
                      href={candidateProfile.resumeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-2 inline-block text-xs font-bold text-blue-600 hover:underline"
                    >
                      View uploaded resume
                    </a>
                  )}
                </div>
              ) : (
                <p className="mt-3 text-sm font-bold text-red-500">
                  No resume uploaded yet
                </p>
              )}
            </div>

            <label className={`cursor-pointer rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-center text-sm font-bold text-white shadow-lg shadow-blue-600/20 btn-press ${uploadingResume || deletingResume ? "opacity-70" : ""}`}>
              {uploadingResume ? "Uploading..." : resumeName ? "Replace Resume" : "Upload Resume"}

              <input
                type="file"
                accept=".pdf,.doc,.docx"
                className="hidden"
                disabled={uploadingResume || deletingResume}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) uploadResume(file);
                  e.target.value = "";
                }}
              />
            </label>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <div className="mb-5 flex items-center justify-between">
              <h3 className="font-display text-lg font-black text-slate-950">
                Profile Strength
              </h3>

              <span className="font-black text-slate-400">
                {loadingProfile ? "..." : `${profileStrength}%`}
              </span>
            </div>

            <div className="h-2.5 rounded-full bg-slate-100">
              <div
                className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all"
                style={{ width: `${profileStrength}%` }}
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-slate-500">
              {hasSavedProfile
                ? "Your profile is saved. Keep it updated for better shortlisting."
                : "Complete your profile to get noticed by top employers."}
            </p>

            {candidateProfile?.skills?.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {candidateProfile.skills.slice(0, 6).map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            )}

            <button
              type="button"
              onClick={() => {
                hydrateProfileForm(candidateProfile);
                setProfileOpen(true);
              }}
              className="mt-5 w-full rounded-2xl bg-gradient-to-r from-slate-950 to-blue-950 py-3 font-bold text-white text-sm btn-press"
            >
              {hasSavedProfile ? "Edit Profile" : "Complete Profile"}
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
            <h3 className="font-display text-lg font-black text-slate-950 mb-5">
              Your Applications
            </h3>

            {applications.length === 0 ? (
              <div className="text-center py-8">
                <Send size={32} className="mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-bold text-slate-400">
                  No applications yet
                </p>
                <p className="mt-1 text-xs font-semibold text-slate-400">
                  Browse jobs and apply to get started
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((a) => (
                  <div
                    key={a.id}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"
                  >
                    <div>
                      <p className="font-bold text-slate-950 text-sm">
                        {a.jobTitle}
                      </p>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">
                        {a.company}
                      </p>
                    </div>

                    <StatusBadge status={a.status} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </DashboardShell>

      {profileOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white p-6 shadow-2xl animate-fade-up">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-2xl font-black text-slate-950">
                  {hasSavedProfile ? "Edit Profile" : "Complete Profile"}
                </h2>
                <p className="mt-1 text-sm font-semibold text-slate-500">
                  This information will be used by HireSetu admin for screening.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setProfileOpen(false)}
                className="rounded-xl bg-slate-100 px-3 py-2 text-sm font-bold text-slate-600 hover:bg-slate-200"
              >
                Close
              </button>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <input
                value={currentUser.name}
                readOnly
                className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-500 outline-none ring-1 ring-slate-200"
              />

              <input
                value={currentUser.email}
                readOnly
                className="rounded-2xl bg-slate-100 p-4 text-sm font-semibold text-slate-500 outline-none ring-1 ring-slate-200"
              />

              <input
                value={profileForm.phone}
                onChange={(e) => updateProfileForm("phone", e.target.value)}
                placeholder="Phone Number"
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500"
              />

              <select
                value={profileForm.preferredCategory}
                onChange={(e) =>
                  updateProfileForm("preferredCategory", e.target.value)
                }
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.title} value={cat.title}>
                    {cat.title}
                  </option>
                ))}
              </select>

              <input
                value={profileForm.skills}
                onChange={(e) => updateProfileForm("skills", e.target.value)}
                placeholder="Skills, comma separated"
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500 sm:col-span-2"
              />

              <input
                value={profileForm.currentCompany}
                onChange={(e) =>
                  updateProfileForm("currentCompany", e.target.value)
                }
                placeholder="Current Company"
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500"
              />

              <input
                value={profileForm.experience}
                onChange={(e) => updateProfileForm("experience", e.target.value)}
                placeholder="Experience, e.g. 3 years"
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500"
              />

              <input
                value={profileForm.expectedSalary}
                onChange={(e) =>
                  updateProfileForm("expectedSalary", e.target.value)
                }
                placeholder="Expected Salary, e.g. ₹6 LPA"
                className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500 sm:col-span-2"
              />

              <textarea
                value={profileForm.summary}
                onChange={(e) => updateProfileForm("summary", e.target.value)}
                placeholder="Professional Summary"
                className="min-h-28 resize-none rounded-2xl bg-slate-50 p-4 text-sm font-semibold outline-none ring-1 ring-slate-200 focus:ring-blue-500 sm:col-span-2"
              />
            </div>

            <button
              type="button"
              onClick={saveCandidateProfile}
              disabled={savingProfile}
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 font-bold text-white disabled:opacity-60"
            >
              {savingProfile ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Profile"
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

function StatusBadge({ status }) {
  const map = { Applied:"bg-blue-50 text-blue-700", Viewed:"bg-amber-50 text-amber-700", Shortlisted:"bg-violet-50 text-violet-700", Interview:"bg-orange-50 text-orange-700", Selected:"bg-emerald-50 text-emerald-700", Rejected:"bg-red-50 text-red-700" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[status]||"bg-slate-50 text-slate-600"}`}>{status}</span>;
}

// ─── Job Post Form ────────────────────────────────────────────────
function JobPostForm({ jobs, setJobs, showToast, isAdmin=false }) {
  const [form, setForm] = useState({ title:"", company:"", category:"IT / Software", location:"", salary:"", exp:"", description:"" });
  const [loading, setLoading] = useState(false);
  function update(f, v) { setForm((p) => ({...p,[f]:v})); }

  async function postJob() {
    if (!form.title||!form.company||!form.location) { showToast("Please fill Job Title, Company and Location","error"); return; }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs`, { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({...form, employerId:isAdmin?0:1}) });
      const data = await res.json();
      const newJob = { ...(data.job||{}), _id:data.job?._id||Date.now(), ...form, status:"Approved", applicants:0, tag:"New" };
      setJobs((prev) => [newJob,...prev]);
      setForm({ title:"", company:"", category:"IT / Software", location:"", salary:"", exp:"", description:"" });
      showToast("Job posted — now live!","success");
    } catch {
      setJobs((prev) => [{ id:Date.now(), ...form, status:"Approved", applicants:0, tag:"New" },...prev]);
      setForm({ title:"", company:"", category:"IT / Software", location:"", salary:"", exp:"", description:"" });
      showToast("Job posted (offline mode)","success");
    }
    setLoading(false);
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between mb-5"><h3 className="font-display text-lg font-black text-slate-950">Post New Job</h3><PlusCircle className="text-blue-600" size={22} /></div>
      <div className="grid gap-3">
        <Input placeholder="Job Title *" value={form.title} onChange={(v) => update("title",v)} />
        <Input placeholder="Company Name *" value={form.company} onChange={(v) => update("company",v)} />
        <select value={form.category} onChange={(e) => update("category",e.target.value)} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500">
          {categories.map((c) => <option key={c.title}>{c.title}</option>)}
        </select>
        <Input placeholder="Location *" value={form.location} onChange={(v) => update("location",v)} />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Salary (e.g. ₹4-8 LPA)" value={form.salary} onChange={(v) => update("salary",v)} />
          <Input placeholder="Experience" value={form.exp} onChange={(v) => update("exp",v)} />
        </div>
        <textarea placeholder="Job Description" value={form.description} onChange={(e) => update("description",e.target.value)} className="min-h-24 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500 resize-none" />
      </div>
      <button onClick={postJob} disabled={loading} className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white text-sm shadow-lg shadow-blue-600/20 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2">
        {loading ? <><RefreshCw size={16} className="animate-spin" /> Posting...</> : <><Send size={16} /> Post Job — Goes Live Immediately</>}
      </button>
    </div>
  );
}

// ─── Employer Dashboard ───────────────────────────────────────────
function EmployerDashboard({ jobs, setJobs, showToast }) {
  return (
    <DashboardShell title="Employer Dashboard" subtitle="Post jobs, manage applicants and shortlist faster" badge="Employer" badgeColor="from-emerald-500 to-teal-600">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Briefcase} value={jobs.filter(j=>j.status==="Approved").length} label="Live Jobs" color="bg-blue-600" />
        <StatCard icon={Users} value={0} label="Applicants" color="bg-emerald-600" />
        <StatCard icon={UserCheck} value={0} label="Shortlisted" color="bg-orange-500" />
        <StatCard icon={CalendarCheck} value={0} label="Interviews" color="bg-violet-600" />
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <JobPostForm jobs={jobs} setJobs={setJobs} showToast={showToast} isAdmin={false} />
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-display text-lg font-black text-slate-950 mb-5">Your Active Jobs</h3>
          {jobs.length === 0 ? (
            <div className="text-center py-8"><Briefcase size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">No jobs posted yet</p><p className="mt-1 text-xs font-semibold text-slate-400">Post your first job to start receiving candidates</p></div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {jobs.map((job) => (
                <div key={job._id||job.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div><p className="font-bold text-slate-950 text-sm">{job.title}</p><p className="text-xs font-semibold text-slate-400 mt-0.5">{job.category} · {job.applicants||0} applicants</p></div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${job.status==="Approved"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{job.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}

// ─── Admin Dashboard ──────────────────────────────────────────────
function AdminDashboard({ jobs, setJobs, showToast }) {
  const [tab, setTab] = useState("post");
  const [loading, setLoading] = useState(false);
  const [adminApplications, setAdminApplications] = useState([]);
  const [loadingApplications, setLoadingApplications] = useState(false);
  const [updatingApplicationId, setUpdatingApplicationId] = useState(null);

  async function reloadJobs() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/jobs`);
      const data = await res.json();
      if (data.ok) setJobs(data.jobs);
    } catch {
      showToast("Could not reload jobs", "error");
    }
    setLoading(false);
  }

  async function fetchApplications() {
    setLoadingApplications(true);

    try {
      const res = await fetch(`${API}/api/admin/applications`);
      const data = await res.json();

      if (data.ok) {
        setAdminApplications(data.applications || []);
      } else {
        showToast?.(data.message || "Could not load applications", "error");
      }
    } catch (err) {
      console.error("Admin applications fetch error:", err);
      showToast?.("Could not load applications", "error");
    }

    setLoadingApplications(false);
  }

  async function updateApplicationStatus(applicationId, status) {
    setUpdatingApplicationId(applicationId);

    try {
      const res = await fetch(`${API}/api/applications/${applicationId}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast?.(data.message || "Failed to update application", "error");
        setUpdatingApplicationId(null);
        return;
      }

      setAdminApplications((prev) =>
        prev.map((app) =>
          app._id === applicationId || app.id === applicationId
            ? { ...app, status: data.application?.status || status }
            : app
        )
      );

      showToast?.(`Application marked as ${status}`, "success");
    } catch (err) {
      console.error("Application status update error:", err);
      showToast?.("Failed to update application", "error");
    }

    setUpdatingApplicationId(null);
  }

  useEffect(() => {
    if (tab === "applications") {
      fetchApplications();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab]);

  const tabs = [
    { id: "post", label: "Post Job", icon: PlusCircle },
    { id: "jobs", label: "Manage Jobs", icon: ClipboardList },
    { id: "applications", label: "Applications", icon: FileText },
    { id: "controls", label: "Controls", icon: UserCog },
  ];

  const totalApplicants = adminApplications.length;
  const shortlistedCount = adminApplications.filter((a) => a.status === "Shortlisted").length;

  return (
    <DashboardShell title="Admin Dashboard" subtitle="Full control — post jobs, manage listings, oversee platform" badge="Admin" badgeColor="from-rose-500 to-orange-500">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Users} value={totalApplicants} label="Applications" color="bg-blue-600" />
        <StatCard icon={Building2} value={jobs.length} label="Total Jobs" color="bg-emerald-600" />
        <StatCard icon={Briefcase} value={jobs.filter(j=>j.status==="Approved").length} label="Live Jobs" color="bg-orange-500" />
        <StatCard icon={UserCheck} value={shortlistedCount} label="Shortlisted" color="bg-violet-600" />
      </div>

      <div className="mt-6 flex flex-wrap gap-2 rounded-3xl bg-slate-100 p-1.5 w-fit">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all btn-press ${tab===t.id?"bg-white text-slate-950 shadow-md":"text-slate-500 hover:text-slate-700"}`}
            >
              <Icon size={16} />{t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {tab==="post" && (
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-up">
            <JobPostForm jobs={jobs} setJobs={setJobs} showToast={showToast} isAdmin={true} />
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-display text-lg font-black text-slate-950 mb-2">Admin Posting Guide</h3>
              <p className="text-sm font-semibold text-slate-500 mb-5">Jobs posted by Admin go live immediately.</p>
              <div className="space-y-3">
                {[
                  {icon:Globe,text:"Source jobs from LinkedIn, Naukri, Indeed"},
                  {icon:Target,text:"Post on behalf of companies you're onboarding"},
                  {icon:Users,text:"Candidates apply → you screen → send to HR"},
                  {icon:Trophy,text:"Commission earned on every successful join"},
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3.5 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><item.icon size={18} /></div>
                    <p className="text-sm font-semibold text-slate-700">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {tab==="jobs" && (
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 animate-fade-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display text-lg font-black text-slate-950">All Jobs ({jobs.length})</h3>
              <button onClick={reloadJobs} disabled={loading} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors btn-press disabled:opacity-60">
                <RefreshCw size={15} className={loading?"animate-spin":""} /> Refresh
              </button>
            </div>
            {jobs.length===0 ? (
              <div className="p-12 text-center"><Briefcase size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">No jobs posted yet</p></div>
            ) : (
              <div className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div key={job._id||job.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex-1 min-w-0"><p className="font-bold text-slate-950 text-sm truncate">{job.title}</p><p className="text-xs font-semibold text-slate-400 mt-0.5">{job.company} · {job.category} · {job.location}</p></div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${job.status==="Approved"?"bg-emerald-50 text-emerald-700":"bg-amber-50 text-amber-700"}`}>{job.status}</span>
                      <button onClick={() => { setJobs((prev)=>prev.filter((j)=>(j._id||j.id)!==(job._id||job.id))); showToast("Job removed","success"); }} className="rounded-xl bg-red-50 p-2 text-red-500 hover:bg-red-100 transition-colors btn-press"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab==="applications" && (
          <div className="animate-fade-up">
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="font-display text-xl font-black text-slate-950">Candidate Applications</h3>
                <p className="mt-1 text-sm font-semibold text-slate-500">Review resumes, shortlist candidates and move applications through your hiring pipeline.</p>
              </div>
              <button
                onClick={fetchApplications}
                disabled={loadingApplications}
                className="flex items-center justify-center gap-2 rounded-2xl bg-slate-100 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-200 disabled:opacity-60 btn-press"
              >
                <RefreshCw size={15} className={loadingApplications ? "animate-spin" : ""} /> Refresh
              </button>
            </div>

            {loadingApplications ? (
              <div className="rounded-3xl bg-white p-10 text-center shadow-sm ring-1 ring-slate-200">
                <RefreshCw size={28} className="mx-auto mb-3 animate-spin text-blue-600" />
                <p className="font-bold text-slate-500">Loading applications...</p>
              </div>
            ) : adminApplications.length === 0 ? (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm ring-1 ring-slate-200">
                <Send size={34} className="mx-auto mb-3 text-slate-300" />
                <p className="font-display text-lg font-black text-slate-700">No applications yet</p>
                <p className="mt-2 text-sm font-semibold text-slate-400">When candidates apply, their profile and resume will appear here.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {adminApplications.map((app) => {
                  const id = app._id || app.id;
                  const busy = updatingApplicationId === id;

                  return (
                    <div key={id} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 card-hover">
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="font-display text-xl font-black text-slate-950">
                              {app.candidateName || "Candidate"}
                            </h3>
                            <StatusBadge status={app.status || "Applied"} />
                          </div>

                          <p className="mt-1 break-all text-sm font-semibold text-slate-500">
                            {app.candidateEmail || "Email not available"}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-2">
                            <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                              {app.jobTitle || "Job title unavailable"}
                            </span>
                            {app.company && (
                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700">
                                {app.company}
                              </span>
                            )}
                            {app.category && (
                              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-bold text-violet-700">
                                {app.category}
                              </span>
                            )}
                            {app.resumeFileName && (
                              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                                {app.resumeFileName}
                              </span>
                            )}
                          </div>

                          <div className="mt-4 flex flex-wrap gap-3">
                            {app.resumeUrl ? (
                              <a
                                href={app.resumeUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-2xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100"
                              >
                                <FileText size={15} /> View Resume
                              </a>
                            ) : (
                              <span className="inline-flex items-center gap-2 rounded-2xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600">
                                <AlertCircle size={15} /> Resume missing
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3 lg:justify-end">
                          <button
                            onClick={() => updateApplicationStatus(id, "Shortlisted")}
                            disabled={busy || app.status === "Shortlisted"}
                            className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 disabled:opacity-60 btn-press"
                          >
                            {busy ? "Updating..." : "Shortlist"}
                          </button>

                          <button
                            onClick={() => updateApplicationStatus(id, "Interview")}
                            disabled={busy || app.status === "Interview"}
                            className="rounded-2xl bg-orange-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-orange-500/20 hover:bg-orange-600 disabled:opacity-60 btn-press"
                          >
                            Interview
                          </button>

                          <button
                            onClick={() => updateApplicationStatus(id, "Rejected")}
                            disabled={busy || app.status === "Rejected"}
                            className="rounded-2xl bg-red-500 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-red-500/20 hover:bg-red-600 disabled:opacity-60 btn-press"
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab==="controls" && (
          <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200 animate-fade-up">
            <h3 className="font-display text-lg font-black text-slate-950 mb-5">Admin Controls</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                {icon:ClipboardList,text:"Manage All Job Posts",desc:"View, edit, remove listings"},
                {icon:UserCog,text:"Manage User Roles",desc:"Assign candidate/employer roles"},
                {icon:BarChart3,text:"Platform Analytics",desc:"Applications, joins, revenue"},
                {icon:FileText,text:"Hiring Pipeline",desc:"Track candidate → company flow"},
                {icon:Phone,text:"Outreach Tracker",desc:"HR contacts and follow-ups"},
                {icon:Trophy,text:"Commission Reports",desc:"Earnings per successful join"},
              ].map((item) => {
                const Icon=item.icon;
                return (
                  <div key={item.text} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 card-hover cursor-pointer">
                    <div className="flex items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={18} /></div><div><p className="font-bold text-slate-800 text-sm">{item.text}</p><p className="text-xs font-semibold text-slate-400">{item.desc}</p></div></div>
                    <ChevronRight className="text-slate-300" size={18} />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}


// ─── Shared UI ────────────────────────────────────────────────────
function Input({ placeholder, value, onChange, type="text" }) {
  return <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500 transition-all placeholder:text-slate-400 w-full" />;
}

function DashboardShell({ title, subtitle, badge, badgeColor="from-blue-600 to-indigo-600", children }) {
  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-[#0d1b3e] to-blue-950 p-6 text-white shadow-2xl sm:p-8 hero-grid">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-center">
            <div>
              <span className={`inline-block rounded-full bg-gradient-to-r ${badgeColor} px-4 py-1.5 text-[11px] font-black uppercase tracking-widest text-white shadow-lg`}>{badge}</span>
              <h2 className="font-display mt-4 text-3xl font-black tracking-tight sm:text-4xl">{title}</h2>
              <p className="mt-2 text-slate-400 font-semibold text-sm">{subtitle}</p>
            </div>
            <div className="rounded-3xl bg-white/8 p-5"><LayoutDashboard size={36} className="text-white/70" /></div>
          </div>
        </div>
        {children}
      </div>
    </section>
  );
}

function StatCard({ icon:Icon, value, label, color="bg-blue-600" }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 card-hover">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${color} text-white shadow-lg`}><Icon size={20} /></div>
      <p className="font-display text-3xl font-black text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function SectionTitle({ eyebrow, title, desc }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p>
      <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">{title}</h2>
      <p className="mt-4 text-base leading-8 text-slate-500">{desc}</p>
    </div>
  );
}

function Toast({ toast }) {
  if (!toast) return null;
  const isError = toast.type==="error";
  return (
    <div className="fixed right-4 top-24 z-[9999] w-[calc(100%-2rem)] max-w-sm animate-slide-in">
      <div className={`rounded-3xl bg-white p-4 shadow-2xl ring-1 ${isError?"ring-red-100":"ring-emerald-100"}`}>
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${isError?"bg-red-50 text-red-600":"bg-emerald-50 text-emerald-600"}`}>
            {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          </div>
          <div><p className="font-bold text-slate-950 text-sm">{isError?"Error":"Done!"}</p><p className="mt-0.5 text-xs font-semibold text-slate-500">{toast.message}</p></div>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-950 px-4 py-12 text-white sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white"><Briefcase size={20} /></div>
              <h2 className="font-display text-xl font-black">HireSetu</h2>
            </div>
            <p className="mt-3 text-sm font-semibold text-slate-500 max-w-xs">Premium category-based hiring platform. Pre-screened candidates. Commission-only model.</p>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {[{title:"Platform",links:["Find Jobs","Categories","Post a Job","Register"]},{title:"Industries",links:["IT / Software","Pharma","Banking","Healthcare"]},{title:"Company",links:["About HireSetu","For Employers","Contact","Privacy"]}].map((col) => (
              <div key={col.title}>
                <p className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">{col.title}</p>
                <div className="space-y-2.5">{col.links.map((link) => <p key={link} className="text-sm font-semibold text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">{link}</p>)}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-10 border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-semibold text-slate-600">© 2026 HireSetu. All rights reserved.</p>
          <p className="text-xs font-semibold text-slate-600">Built for India's premium job market</p>
        </div>
      </div>
    </footer>
  );
}

// ─── Page Router ──────────────────────────────────────────────────
function PageContent(props) {
  const { page } = props;
  if (page==="login") return <LoginPage setRole={props.setRole} setPage={props.setPage} showToast={props.showToast} />;
  if (page==="register") return <RegisterPage setRole={props.setRole} setPage={props.setPage} showToast={props.showToast} />;
  if (page==="candidate")
    return (
      <CandidateDashboard
        applications={props.applications}
        candidateResume={props.candidateResume}
        setCandidateResume={props.setCandidateResume}
        candidateProfile={props.candidateProfile}
        setCandidateProfile={props.setCandidateProfile}
        showToast={props.showToast}
      />
    );
  if (page==="employer") return <EmployerDashboard jobs={props.jobs} setJobs={props.setJobs} showToast={props.showToast} />;
  if (page==="admin") return <AdminDashboard jobs={props.jobs} setJobs={props.setJobs} showToast={props.showToast} />;
  if (page==="jobs") return <JobsPage jobs={props.jobs} selectedCategory={props.selectedCategory} setSelectedCategory={props.setSelectedCategory} role={props.role} setRole={props.setRole} setPage={props.setPage} applyToJob={props.applyToJob} />;
  if (page==="categories") return <CategorySection setPage={props.setPage} setSelectedCategory={props.setSelectedCategory} />;
  return <HomePage setPage={props.setPage} setSelectedCategory={props.setSelectedCategory} />;
}

// ─── Root App ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [candidateResume, setCandidateResume] = useState(null);
  const [candidateProfile, setCandidateProfile] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message, type="success") => { setToast({message,type}); setTimeout(()=>setToast(null),3500); };

  useEffect(() => {
    async function loadJobs() {
      try { const res = await fetch(`${API}/api/admin/jobs`); const data = await res.json(); if(data.ok&&data.jobs?.length) setJobs(data.jobs); }
      catch { console.log("Backend offline"); }
    }
    loadJobs();
  }, []);

  const applyToJob = async (job) => {
    let user = {};

    try {
      user = JSON.parse(localStorage.getItem("hs_user") || "{}");
    } catch {
      user = {};
    }

    let activeProfile = candidateProfile;

    if (!activeProfile?.resumeUrl && !activeProfile?.resumeFileName && user.email) {
      try {
        const profileRes = await fetch(
          `${API}/api/candidate/profile/${encodeURIComponent(user.email)}`
        );
        const profileData = await profileRes.json();

        if (profileData.ok && profileData.profile) {
          activeProfile = profileData.profile;
          setCandidateProfile(profileData.profile);

          if (profileData.profile.resumeFileName) {
            setCandidateResume({
              name: profileData.profile.resumeFileName,
              url: profileData.profile.resumeUrl,
              uploaded: true,
            });
          }
        }
      } catch (err) {
        console.log("Could not refresh candidate profile before applying", err);
      }
    }

    const resumeUrl = activeProfile?.resumeUrl || candidateResume?.url || "";
    const resumeFileName =
      activeProfile?.resumeFileName || candidateResume?.name || "";

    if (!resumeUrl && !resumeFileName) {
      showToast("Please upload your resume before applying.", "error");
      setPage("candidate");
      return;
    }

    try {
      const res = await fetch(`${API}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          jobId: job._id || job.id,
          candidateId: user.id || user._id || user.email || "demo-candidate",
          candidateName: user.name || activeProfile?.name || "Candidate",
          candidateEmail: user.email || activeProfile?.email || "candidate@test.com",
          resumeUrl,
          resumeFileName,
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast(data.message || "Application failed", "error");
        return;
      }

      setApplications((prev) => [{
        id: data.application?._id || data.application?.id || Date.now(),
        jobTitle: data.application?.jobTitle || job.title,
        company: data.application?.company || "Confidential Hiring Partner",
        status: data.application?.status || "Applied",
        resumeUrl,
        resumeFileName,
      }, ...prev]);

      showToast("Application submitted!", "success");
      setPage("candidate");
    } catch (err) {
      console.error(err);
      showToast("Application failed. Please try again.", "error");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <GlobalStyles />
      <Navbar setPage={setPage} role={role} setRole={setRole} />
      <PageContent
        page={page}
        setPage={setPage}
        role={role}
        setRole={setRole}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        jobs={jobs}
        setJobs={setJobs}
        applications={applications}
        applyToJob={applyToJob}
        showToast={showToast}
        candidateResume={candidateResume}
        setCandidateResume={setCandidateResume}
        candidateProfile={candidateProfile}
        setCandidateProfile={setCandidateProfile}
      />
      <Toast toast={toast} />
      <Footer />
    </main>
  );
}

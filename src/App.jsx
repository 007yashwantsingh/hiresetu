import React, { useEffect, useState } from "react";
import {
  Briefcase, Building2, Users, ShieldCheck, ArrowRight, Search,
  Stethoscope, Landmark, Headphones, TrendingUp, Pill, Code2,
  CheckCircle2, MapPin, IndianRupee, Clock3, UserCheck, BarChart3,
  Bell, Bookmark, CalendarCheck, Sparkles, Zap, Eye, Send, Menu, X,
  ChevronRight, LogOut, LayoutDashboard, PlusCircle, ClipboardList,
  UserCog, LockKeyhole, Mail, Check, Filter, FileText, AlertCircle,
  Star, Trophy, Flame, Target, Globe, Phone, TrendingDown, Activity,
  ChevronDown, RefreshCw, Trash2,
} from "lucide-react";

const API = "https://hiresetu-u4ot.onrender.com";

const categories = [
  { title: "Pharma", icon: Pill, jobs: "1,240", desc: "Production, QA, R&D, Medical Rep", gradient: "from-blue-500 to-cyan-400", bg: "bg-blue-50", text: "text-blue-600" },
  { title: "IT / Software", icon: Code2, jobs: "3,120", desc: "Developers, QA, Cloud, AI, Support", gradient: "from-indigo-500 to-blue-500", bg: "bg-indigo-50", text: "text-indigo-600" },
  { title: "Banking / Finance", icon: Landmark, jobs: "860", desc: "Sales, Credit, Operations, Accounts", gradient: "from-emerald-500 to-teal-400", bg: "bg-emerald-50", text: "text-emerald-600" },
  { title: "Sales & Marketing", icon: TrendingUp, jobs: "2,050", desc: "Field Sales, Digital, B2B, Retail", gradient: "from-orange-500 to-amber-400", bg: "bg-orange-50", text: "text-orange-600" },
  { title: "Healthcare", icon: Stethoscope, jobs: "970", desc: "Nurses, Technicians, Admin, Clinics", gradient: "from-rose-500 to-pink-400", bg: "bg-rose-50", text: "text-rose-600" },
  { title: "BPO / Customer Support", icon: Headphones, jobs: "1,780", desc: "Voice, Non-Voice, Chat, Backend", gradient: "from-violet-500 to-purple-400", bg: "bg-violet-50", text: "text-violet-600" },
];

const starterJobs = [
  { id: 1, title: "Software QA Tester", company: "TechNova Solutions", category: "IT / Software", location: "Bengaluru", salary: "₹6-10 LPA", exp: "2-5 Years", tag: "Actively Hiring", status: "Approved", applicants: 18, description: "Manual and automation testing role for web and mobile applications." },
  { id: 2, title: "Medical Representative", company: "Apex Pharma", category: "Pharma", location: "Lucknow", salary: "₹3-5 LPA", exp: "1-3 Years", tag: "New", status: "Approved", applicants: 24, description: "Promote pharma products and manage doctor relationships." },
  { id: 3, title: "Relationship Manager", company: "Prime Bank Services", category: "Banking / Finance", location: "Delhi NCR", salary: "₹4-8 LPA", exp: "2-4 Years", tag: "Verified", status: "Approved", applicants: 31, description: "Manage customer portfolio and banking product sales." },
  { id: 4, title: "Sales Executive", company: "GrowthEdge", category: "Sales & Marketing", location: "Mumbai", salary: "₹3-7 LPA", exp: "1-4 Years", tag: "Urgent", status: "Approved", applicants: 16, description: "Field sales role for B2B customer acquisition." },
  { id: 5, title: "Hospital Front Desk Executive", company: "CarePlus Clinic", category: "Healthcare", location: "Pune", salary: "₹2-4 LPA", exp: "0-2 Years", tag: "Freshers", status: "Approved", applicants: 22, description: "Patient handling, appointment management and billing support." },
  { id: 6, title: "Customer Support Associate", company: "VoiceBridge", category: "BPO / Customer Support", location: "Noida", salary: "₹2.5-4.5 LPA", exp: "0-3 Years", tag: "Walk-in", status: "Approved", applicants: 40, description: "Voice and chat support for domestic customers." },
];

const initialApplications = [
  { id: 101, jobTitle: "Software QA Tester", company: "TechNova Solutions", status: "Viewed" },
  { id: 102, jobTitle: "Relationship Manager", company: "Prime Bank Services", status: "Interview" },
];

// ─── Global Styles ────────────────────────────────────────────────
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap');
    * { font-family: 'DM Sans', sans-serif; }
    .font-display { font-family: 'Sora', sans-serif; }
    @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-12px)} }
    @keyframes pulse-glow { 0%,100%{opacity:.15} 50%{opacity:.3} }
    @keyframes fade-up { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
    @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
    @keyframes slide-in { from{transform:translateX(100%);opacity:0} to{transform:translateX(0);opacity:1} }
    @keyframes count-up { from{opacity:0;transform:scale(.8)} to{opacity:1;transform:scale(1)} }
    .animate-float { animation: float 5s ease-in-out infinite; }
    .animate-pulse-glow { animation: pulse-glow 4s ease-in-out infinite; }
    .animate-fade-up { animation: fade-up .5s ease both; }
    .animate-slide-in { animation: slide-in .35s cubic-bezier(.2,.8,.2,1) both; }
    .animate-count { animation: count-up .6s ease both; }
    .card-hover { transition: all .25s cubic-bezier(.2,.8,.2,1); }
    .card-hover:hover { transform: translateY(-4px); box-shadow: 0 20px 60px -10px rgba(15,23,42,.15); }
    .btn-press:active { transform: scale(.97); }
    .gradient-text { background: linear-gradient(135deg, #3b82f6, #8b5cf6); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }
    .hero-grid { background-image: linear-gradient(rgba(255,255,255,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.03) 1px, transparent 1px); background-size: 40px 40px; }
    .shimmer-skeleton { background: linear-gradient(90deg,#f1f5f9 25%,#e2e8f0 50%,#f1f5f9 75%); background-size: 200% 100%; animation: shimmer 1.5s infinite; }
    .nav-link { position:relative; } .nav-link::after { content:''; position:absolute; bottom:-2px; left:0; width:0; height:2px; background:#3b82f6; transition:.3s; border-radius:2px; } .nav-link:hover::after { width:100%; }
    ::-webkit-scrollbar { width:6px; } ::-webkit-scrollbar-track { background:transparent; } ::-webkit-scrollbar-thumb { background:#cbd5e1; border-radius:99px; }
    .tag-active { background: linear-gradient(135deg,#dcfce7,#bbf7d0); color:#166534; }
    .tag-new { background: linear-gradient(135deg,#dbeafe,#bfdbfe); color:#1e40af; }
    .tag-urgent { background: linear-gradient(135deg,#fee2e2,#fecaca); color:#991b1b; }
    .tag-verified { background: linear-gradient(135deg,#ede9fe,#ddd6fe); color:#5b21b6; }
    .tag-freshers { background: linear-gradient(135deg,#fef9c3,#fef08a); color:#854d0e; }
    .tag-walk { background: linear-gradient(135deg,#ffedd5,#fed7aa); color:#9a3412; }
  `}</style>
);

// ─── Tag Helper ───────────────────────────────────────────────────
function JobTag({ tag }) {
  const map = { "Actively Hiring": "tag-active", "New": "tag-new", "Urgent": "tag-urgent", "Verified": "tag-verified", "Freshers": "tag-freshers", "Walk-in": "tag-walk" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[tag] || "bg-slate-100 text-slate-600"}`}>{tag}</span>;
}

// ─── Navbar ───────────────────────────────────────────────────────
function Navbar({ setPage, role, setRole }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const loggedIn = Boolean(role);

  function logout() { setRole(null); setPage("home"); setMenuOpen(false); }
  function goDashboard() {
    if (role === "candidate") setPage("candidate");
    if (role === "employer") setPage("employer");
    if (role === "admin") setPage("admin");
    setMenuOpen(false);
  }
  function navTo(p) { setPage(p); setMenuOpen(false); }

  const roleColor = { candidate: "from-blue-600 to-indigo-600", employer: "from-emerald-500 to-teal-600", admin: "from-rose-500 to-orange-500" };

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur-2xl shadow-sm shadow-slate-950/5">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <button onClick={() => navTo("home")} className="flex items-center gap-3 btn-press">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-800 text-white shadow-lg shadow-blue-950/20">
              <Briefcase size={20} />
            </div>
            <div className="text-left">
              <h1 className="font-display text-lg font-black tracking-tight text-slate-950 leading-none">HireSetu</h1>
              <p className="text-[10px] font-semibold text-slate-400 tracking-wide">Premium Hiring Network</p>
            </div>
          </button>

          <nav className="hidden items-center gap-7 text-sm font-semibold text-slate-500 md:flex">
            {["home", "jobs", "categories"].map((p) => (
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
                <button onClick={() => navTo("login")} className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all btn-press">Register</button>
              </>
            ) : (
              <>
                <button onClick={goDashboard} className={`rounded-xl bg-gradient-to-r ${roleColor[role] || "from-blue-600 to-indigo-600"} px-4 py-2 text-xs font-black text-white uppercase tracking-wider btn-press`}>{role}</button>
                <button onClick={logout} className="rounded-xl bg-slate-100 p-2.5 text-slate-500 hover:bg-red-50 hover:text-red-600 transition-colors btn-press"><LogOut size={18} /></button>
              </>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="rounded-xl bg-slate-100 p-2.5 text-slate-700 transition-colors hover:bg-slate-200 md:hidden btn-press">
              {menuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
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
              {loggedIn && (
                <>
                  <button onClick={goDashboard} className="w-full rounded-2xl px-5 py-3.5 text-left font-semibold text-blue-600 bg-blue-50 flex items-center justify-between">
                    Dashboard<ChevronRight size={16} />
                  </button>
                  <button onClick={logout} className="w-full rounded-2xl px-5 py-3.5 text-left font-semibold text-red-600 bg-red-50 flex items-center gap-2">
                    <LogOut size={16} /> Logout
                  </button>
                </>
              )}
              {!loggedIn && (
                <button onClick={() => navTo("login")} className="w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3.5 text-center font-bold text-white mt-4 btn-press">
                  Get Started
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// ─── Home Page ────────────────────────────────────────────────────
function HomePage({ setPage, setSelectedCategory }) {
  return (
    <>
      {/* Hero */}
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
              <button onClick={() => setPage("login")} className="flex items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/8 px-8 py-4 text-base font-bold text-white backdrop-blur hover:bg-white/15 transition-all btn-press">
                Post a Job <ArrowRight size={18} />
              </button>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{ label: "Verified HRs", value: "850+", icon: Star }, { label: "Active Jobs", value: "10K+", icon: Briefcase }, { label: "Applications", value: "75K+", icon: Send }, { label: "Successful Joins", value: "2.5K+", icon: Trophy }].map((item, i) => (
                <div key={item.label} className="rounded-2xl border border-white/8 bg-white/5 p-4 backdrop-blur animate-count" style={{ animationDelay: `${i * 0.1}s` }}>
                  <p className="font-display text-2xl font-black text-white">{item.value}</p>
                  <p className="mt-1 text-xs font-semibold text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Live Hiring Board Widget */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none animate-fade-up" style={{ animationDelay: ".15s" }}>
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
                  <div className="mt-5 grid grid-cols-3 gap-3">
                    {[{v:"10K+",l:"Jobs"},{v:"850+",l:"HRs"},{v:"6",l:"Sectors"}].map(s => (
                      <div key={s.l} className="rounded-2xl bg-white/10 p-3 text-center"><p className="font-display text-xl font-black">{s.v}</p><p className="text-[11px] font-bold text-blue-200">{s.l}</p></div>
                    ))}
                  </div>
                </div>
                <div className="p-4">
                  <div className="rounded-2xl bg-amber-50 p-3.5 ring-1 ring-amber-100">
                    <div className="flex items-start gap-3">
                      <Zap className="mt-0.5 text-orange-500 shrink-0" size={18} />
                      <div><p className="text-sm font-black text-amber-900">New openings added today</p><p className="text-xs font-semibold text-amber-700 mt-0.5">Explore by your preferred industry.</p></div>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {categories.slice(0, 4).map((cat) => <MiniCategory key={cat.title} cat={cat} onClick={() => { setSelectedCategory(cat.title); setPage("jobs"); }} />)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CategorySection setPage={setPage} setSelectedCategory={setSelectedCategory} />
      <JobsSection setPage={setPage} />
      <DashboardPreview />
      <EmployerSection />
    </>
  );
}

function MiniCategory({ cat, onClick }) {
  const Icon = cat.icon;
  return (
    <button onClick={onClick} className="rounded-2xl bg-white p-3.5 text-left shadow-sm ring-1 ring-slate-200 card-hover btn-press">
      <div className={`mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}><Icon size={16} /></div>
      <p className="text-xs font-black text-slate-950">{cat.title}</p>
      <p className="mt-0.5 text-[11px] font-bold text-blue-600">{cat.jobs} jobs</p>
    </button>
  );
}

// ─── Category Section ─────────────────────────────────────────────
function CategorySection({ setPage, setSelectedCategory }) {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Industry First" title="Explore Jobs By Category" desc="Six focused hiring lanes. Cleaner search for candidates and better applicant quality for employers." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.title} cat={cat} i={i} onClick={() => { setSelectedCategory(cat.title); setPage("jobs"); }} />
          ))}
        </div>
      </div>
    </section>
  );
}

function CategoryCard({ cat, onClick, i }) {
  const Icon = cat.icon;
  return (
    <button onClick={onClick} className="group relative overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white p-6 text-left shadow-sm card-hover btn-press" style={{ animationDelay: `${i * 0.07}s` }}>
      <div className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${cat.gradient} opacity-8 blur-2xl group-hover:opacity-15 transition-opacity duration-500`} />
      <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}>
        <Icon size={26} />
      </div>
      <h3 className="font-display relative mt-5 text-2xl font-black text-slate-950">{cat.title}</h3>
      <p className="relative mt-1.5 text-sm font-bold text-blue-600">{cat.jobs} Active Jobs</p>
      <p className="relative mt-3 text-sm leading-7 text-slate-500">{cat.desc}</p>
      <span className="relative mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-bold text-slate-950 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
        Explore Jobs <ArrowRight size={16} />
      </span>
    </button>
  );
}

// ─── Jobs Page ────────────────────────────────────────────────────
function JobsPage({ jobs, selectedCategory, setSelectedCategory, role, setRole, setPage, applyToJob }) {
  const [query, setQuery] = useState("");
  const approvedJobs = jobs.filter((j) => j.status === "Approved");
  const filtered = approvedJobs.filter((job) =>
    (!selectedCategory || job.category === selectedCategory) &&
    `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query.toLowerCase())
  );

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
              <div className="mb-4 flex items-center gap-2 font-black text-slate-950"><Filter size={17} /> <span className="font-display">Categories</span></div>
              <button onClick={() => setSelectedCategory("")} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors ${!selectedCategory ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>
                All Categories
              </button>
              {categories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <button key={cat.title} onClick={() => setSelectedCategory(cat.title)}
                    className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-bold transition-colors flex items-center gap-2.5 ${selectedCategory === cat.title ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}>
                    <Icon size={15} /> {cat.title}
                  </button>
                );
              })}
            </div>
          </aside>

          <main>
            <div className="mb-5 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200">
              <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 ring-slate-200 focus-within:ring-blue-500 transition-all">
                <Search size={18} className="text-slate-400 shrink-0" />
                <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, company, location..."
                  className="w-full bg-transparent text-sm font-semibold text-slate-700 outline-none placeholder:text-slate-400" />
              </div>
              {filtered.length > 0 && <p className="mt-3 px-1 text-xs font-bold text-slate-400">{filtered.length} jobs found</p>}
            </div>
            <div className="grid gap-5 lg:grid-cols-2">
              {filtered.map((job) => <JobCard key={job._id || job.id} job={job} role={role} setRole={setRole} setPage={setPage} applyToJob={applyToJob} />)}
            </div>
            {filtered.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center ring-1 ring-slate-200">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-3xl bg-slate-100"><Search size={28} className="text-slate-400" /></div>
                <p className="font-display font-black text-slate-700 text-lg">No jobs found</p>
                <p className="mt-2 text-sm font-semibold text-slate-400">Try a different category or search term</p>
                <button onClick={() => { setQuery(""); setSelectedCategory(""); }} className="mt-5 rounded-2xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white btn-press">Clear Filters</button>
              </div>
            )}
          </main>
        </div>
      </div>
    </section>
  );
}

function JobCard({ job, role, setRole, setPage, applyToJob }) {
  function handleApply() {
    if (role !== "candidate") {
      setRole("candidate"); setPage("candidate");
      setTimeout(() => applyToJob(job), 0);
    } else {
      applyToJob(job); setPage("candidate");
    }
  }
  return (
    <div className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm card-hover">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 text-blue-600 ring-1 ring-blue-100">
          <Building2 size={22} />
        </div>
        <JobTag tag={job.tag} />
      </div>
      <h3 className="font-display text-lg font-black text-slate-950">{job.title}</h3>
      <p className="mt-1 text-sm font-semibold text-slate-500">{job.company}</p>
      <p className="mt-3 text-sm leading-6 text-slate-500">{job.description}</p>
      <JobMeta job={job} />
      <div className="mt-5 grid grid-cols-2 gap-3">
        <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors btn-press">Details</button>
        <button onClick={handleApply} className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/20 hover:shadow-blue-600/40 transition-all btn-press">Apply Now</button>
      </div>
    </div>
  );
}

function JobMeta({ job }) {
  return (
    <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
      <span className="flex items-center gap-1.5"><MapPin size={13} /> {job.location}</span>
      <span className="flex items-center gap-1.5"><IndianRupee size={13} /> {job.salary}</span>
      <span className="flex items-center gap-1.5"><Clock3 size={13} /> {job.exp}</span>
      <span className="flex items-center gap-1.5"><Briefcase size={13} /> {job.category}</span>
    </div>
  );
}

// ─── Featured Jobs (Home) ─────────────────────────────────────────
function JobsSection({ setPage }) {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Featured Jobs</p>
            <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Fresh Opportunities</h2>
            <p className="mt-3 max-w-xl text-slate-500">Clean job cards with only the useful information. No clutter, no noise.</p>
          </div>
          <button onClick={() => setPage("jobs")} className="w-fit rounded-2xl bg-slate-950 px-6 py-3 text-sm font-bold text-white hover:bg-blue-600 transition-colors btn-press">View All Jobs</button>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {starterJobs.slice(0, 3).map((job) => (
            <div key={job.id} className="group rounded-[1.8rem] border border-slate-200 bg-white p-5 shadow-sm card-hover">
              <div className="mb-4 flex items-start justify-between"><div className="rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 p-3 text-blue-600 ring-1 ring-blue-100"><Building2 size={22} /></div><JobTag tag={job.tag} /></div>
              <h3 className="font-display text-lg font-black text-slate-950">{job.title}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-500">{job.company}</p>
              <JobMeta job={job} />
              <div className="mt-5 grid grid-cols-2 gap-3">
                <button className="rounded-2xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-slate-700 hover:bg-slate-50 transition-colors btn-press">Details</button>
                <button className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-sm font-bold text-white btn-press">Apply</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Login Page ───────────────────────────────────────────────────
function LoginPage({ setRole, setPage }) {
  function loginAs(nextRole) {
    setRole(nextRole);
    if (nextRole === "candidate") setPage("candidate");
    if (nextRole === "employer") setPage("employer");
    if (nextRole === "admin") setPage("admin");
  }
  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-14 sm:px-6">
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div className="animate-fade-up">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Role Based Access</p>
          <h2 className="font-display mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-5xl">Login to your dashboard.</h2>
          <p className="mt-5 text-base leading-8 text-slate-500">Candidate, Employer, and Admin each get their own tailored dashboard with exactly the right tools.</p>
          <div className="mt-8 rounded-3xl bg-blue-50 p-5 ring-1 ring-blue-100">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 text-blue-600 shrink-0" size={20} />
              <div>
                <p className="font-bold text-slate-950">Access is controlled by user role</p>
                <p className="mt-1 text-sm font-semibold text-slate-500">Role-based dashboards with Firebase Auth — demo mode active.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-[2rem] bg-white p-6 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-200 animate-fade-up" style={{ animationDelay: ".1s" }}>
          <h3 className="font-display text-2xl font-black text-slate-950">Choose your role</h3>
          <p className="mt-1.5 text-sm font-semibold text-slate-400">Demo login for role-based dashboard routing</p>
          <div className="mt-6 grid gap-4">
            <RoleButton onClick={() => loginAs("candidate")} icon={Users} title="Login as Candidate" desc="Apply, save jobs, track applications" color="blue" />
            <RoleButton onClick={() => loginAs("employer")} icon={Building2} title="Login as Employer" desc="Post jobs, view applicants, shortlist" color="emerald" />
            <RoleButton onClick={() => loginAs("admin")} icon={UserCog} title="Login as Admin" desc="Manage candidates, jobs, post directly" dark />
          </div>
          <div className="mt-6 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200 space-y-3">
            {[{icon: Mail, text: "Email input coming here"},{icon: LockKeyhole, text: "Password input coming here"}].map((item) => (
              <div key={item.text} className="flex items-center gap-3 rounded-2xl bg-white p-3 ring-1 ring-slate-100">
                <item.icon size={17} className="text-slate-400" />
                <span className="text-sm font-semibold text-slate-400">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function RoleButton({ onClick, icon: Icon, title, desc, dark, color }) {
  const base = dark
    ? "bg-slate-950 text-white ring-slate-900 hover:bg-blue-950"
    : color === "emerald"
    ? "bg-emerald-50 ring-emerald-100 hover:bg-emerald-600 hover:text-white group"
    : "bg-blue-50 ring-blue-100 hover:bg-blue-600 hover:text-white group";
  return (
    <button onClick={onClick} className={`flex items-center justify-between rounded-3xl p-5 text-left ring-1 transition-all duration-200 btn-press ${base}`}>
      <div className="flex items-center gap-4">
        <div className={`rounded-2xl p-3 ${dark ? "bg-white/10 text-white" : "bg-white text-blue-600"}`}><Icon size={22} /></div>
        <div>
          <p className="font-display text-lg font-black">{title}</p>
          <p className={`text-sm font-semibold ${dark ? "text-slate-400" : "opacity-70"}`}>{desc}</p>
        </div>
      </div>
      <ArrowRight size={18} className="shrink-0" />
    </button>
  );
}

// ─── Candidate Dashboard ──────────────────────────────────────────
function CandidateDashboard({ applications }) {
  return (
    <DashboardShell title="Candidate Dashboard" subtitle="Apply, save and track your job applications" badge="Candidate" badgeColor="from-blue-600 to-indigo-600">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Send} value={applications.length} label="Applications" color="bg-blue-600" />
        <StatCard icon={Eye} value="4" label="Profile Views" color="bg-emerald-600" />
        <StatCard icon={CalendarCheck} value="2" label="Interviews" color="bg-orange-500" />
        <StatCard icon={Bookmark} value="8" label="Saved Jobs" color="bg-violet-600" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-display text-lg font-black text-slate-950">Profile Strength</h3>
            <span className="font-black text-blue-600">72%</span>
          </div>
          <div className="h-2.5 rounded-full bg-slate-100"><div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all" style={{ width: "72%" }} /></div>
          <p className="mt-4 text-sm font-semibold text-slate-500">Add skills, current company and expected salary to improve visibility.</p>
          <button className="mt-5 w-full rounded-2xl bg-gradient-to-r from-slate-950 to-blue-950 py-3 font-bold text-white text-sm btn-press">Complete Profile</button>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-display text-lg font-black text-slate-950 mb-5">Your Applications</h3>
          {applications.length === 0 ? (
            <div className="text-center py-8"><Send size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">No applications yet</p></div>
          ) : (
            <div className="space-y-3">
              {applications.map((a) => (
                <div key={a.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div><p className="font-bold text-slate-950 text-sm">{a.jobTitle}</p><p className="text-xs font-semibold text-slate-400 mt-0.5">{a.company}</p></div>
                  <StatusBadge status={a.status} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <h3 className="font-display text-lg font-black text-slate-950 mb-5">Application Timeline</h3>
        <div className="grid gap-3 sm:grid-cols-5">
          {["Applied", "Viewed", "Shortlisted", "Interview", "Selected"].map((s, i) => (
            <div key={s} className={`rounded-2xl p-4 text-center ${i < 3 ? "bg-blue-50 text-blue-700 ring-1 ring-blue-100" : "bg-slate-50 text-slate-400"}`}>
              {i < 3 ? <CheckCircle2 size={20} className="mx-auto" /> : <div className="h-5 w-5 rounded-full border-2 border-slate-300 mx-auto" />}
              <p className="mt-2 text-xs font-black">{s}</p>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

function StatusBadge({ status }) {
  const map = { Applied: "bg-blue-50 text-blue-700", Viewed: "bg-amber-50 text-amber-700", Shortlisted: "bg-violet-50 text-violet-700", Interview: "bg-orange-50 text-orange-700", Selected: "bg-emerald-50 text-emerald-700", Rejected: "bg-red-50 text-red-700" };
  return <span className={`rounded-full px-3 py-1 text-xs font-bold ${map[status] || "bg-slate-50 text-slate-600"}`}>{status}</span>;
}

// ─── Shared Job Post Form ─────────────────────────────────────────
function JobPostForm({ jobs, setJobs, showToast, isAdmin = false }) {
  const [form, setForm] = useState({ title: "", company: "", category: "IT / Software", location: "", salary: "", exp: "", description: "" });
  const [loading, setLoading] = useState(false);
  function update(field, value) { setForm((prev) => ({ ...prev, [field]: value })); }

  async function postJob() {
    if (!form.title || !form.company || !form.location) {
      showToast("Please fill Job Title, Company and Location", "error"); return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, employerId: isAdmin ? 0 : 1 }),
      });
      const data = await res.json();
      // Add to jobs list as Approved directly (no approval needed)
      const newJob = {
        ...(data.job || {}),
        _id: data.job?._id || Date.now(),
        ...form,
        status: "Approved",
        applicants: 0,
        tag: "New",
      };
      setJobs((prev) => [newJob, ...prev]);
      setForm({ title: "", company: "", category: "IT / Software", location: "", salary: "", exp: "", description: "" });
      showToast("Job posted successfully — now live!", "success");
    } catch (err) {
      // Still add locally if backend fails
      const newJob = { id: Date.now(), ...form, status: "Approved", applicants: 0, tag: "New" };
      setJobs((prev) => [newJob, ...prev]);
      setForm({ title: "", company: "", category: "IT / Software", location: "", salary: "", exp: "", description: "" });
      showToast("Job posted (offline mode)", "success");
    }
    setLoading(false);
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-display text-lg font-black text-slate-950">Post New Job</h3>
        <PlusCircle className="text-blue-600" size={22} />
      </div>
      <div className="grid gap-3">
        <Input placeholder="Job Title *" value={form.title} onChange={(v) => update("title", v)} />
        <Input placeholder="Company Name *" value={form.company} onChange={(v) => update("company", v)} />
        <select value={form.category} onChange={(e) => update("category", e.target.value)} className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500">
          {categories.map((c) => <option key={c.title}>{c.title}</option>)}
        </select>
        <Input placeholder="Location *" value={form.location} onChange={(v) => update("location", v)} />
        <div className="grid grid-cols-2 gap-3">
          <Input placeholder="Salary (e.g. ₹4-8 LPA)" value={form.salary} onChange={(v) => update("salary", v)} />
          <Input placeholder="Experience" value={form.exp} onChange={(v) => update("exp", v)} />
        </div>
        <textarea placeholder="Job Description" value={form.description} onChange={(e) => update("description", e.target.value)}
          className="min-h-24 rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500 resize-none" />
      </div>
      <button onClick={postJob} disabled={loading}
        className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 font-bold text-white text-sm shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2">
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
        <StatCard icon={Briefcase} value={jobs.filter(j => j.status === "Approved").length} label="Live Jobs" color="bg-blue-600" />
        <StatCard icon={Users} value="248" label="Applicants" color="bg-emerald-600" />
        <StatCard icon={UserCheck} value="36" label="Shortlisted" color="bg-orange-500" />
        <StatCard icon={CalendarCheck} value="9" label="Interviews" color="bg-violet-600" />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <JobPostForm jobs={jobs} setJobs={setJobs} showToast={showToast} isAdmin={false} />

        <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
          <h3 className="font-display text-lg font-black text-slate-950 mb-5">Your Active Jobs</h3>
          {jobs.length === 0 ? (
            <div className="text-center py-8"><Briefcase size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">No jobs posted yet</p></div>
          ) : (
            <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
              {jobs.map((job) => (
                <div key={job._id || job.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100">
                  <div>
                    <p className="font-bold text-slate-950 text-sm">{job.title}</p>
                    <p className="text-xs font-semibold text-slate-400 mt-0.5">{job.category} · {job.applicants || 0} applicants</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-bold ${job.status === "Approved" ? "bg-emerald-50 text-emerald-700" : job.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>
                    {job.status}
                  </span>
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
  const [tab, setTab] = useState("post"); // post | jobs | controls
  const [loading, setLoading] = useState(false);

  async function reloadJobs() {
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/admin/jobs`);
      const data = await res.json();
      if (data.ok) setJobs(data.jobs);
    } catch (e) { showToast("Could not reload jobs", "error"); }
    setLoading(false);
  }

  async function deleteJob(id) {
    setJobs((prev) => prev.filter((j) => (j._id || j.id) !== id));
    showToast("Job removed", "success");
  }

  const tabs = [{ id: "post", label: "Post Job", icon: PlusCircle }, { id: "jobs", label: "Manage Jobs", icon: ClipboardList }, { id: "controls", label: "Controls", icon: UserCog }];

  return (
    <DashboardShell title="Admin Dashboard" subtitle="Full control — post jobs, manage listings, oversee platform" badge="Admin" badgeColor="from-rose-500 to-orange-500">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        <StatCard icon={Users} value="4.8K" label="Candidates" color="bg-blue-600" />
        <StatCard icon={Building2} value="850" label="Employers" color="bg-emerald-600" />
        <StatCard icon={Briefcase} value={jobs.length} label="Total Jobs" color="bg-orange-500" />
        <StatCard icon={Activity} value={jobs.filter(j => j.status === "Approved").length} label="Live Jobs" color="bg-violet-600" />
      </div>

      {/* Tab Switcher */}
      <div className="mt-6 flex gap-2 rounded-3xl bg-slate-100 p-1.5 w-fit">
        {tabs.map((t) => {
          const Icon = t.icon;
          return (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-bold transition-all btn-press ${tab === t.id ? "bg-white text-slate-950 shadow-md" : "text-slate-500 hover:text-slate-700"}`}>
              <Icon size={16} /> {t.label}
            </button>
          );
        })}
      </div>

      <div className="mt-5">
        {/* Post Job Tab */}
        {tab === "post" && (
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-up">
            <JobPostForm jobs={jobs} setJobs={setJobs} showToast={showToast} isAdmin={true} />
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-display text-lg font-black text-slate-950 mb-2">Admin Posting Guide</h3>
              <p className="text-sm font-semibold text-slate-500 mb-5">Jobs posted by Admin go live immediately without any approval step.</p>
              <div className="space-y-3">
                {[
                  { icon: Globe, text: "Source jobs from LinkedIn, Naukri, Indeed" },
                  { icon: Target, text: "Post on behalf of companies you're onboarding" },
                  { icon: Users, text: "Candidates apply → you screen → send to HR" },
                  { icon: Trophy, text: "Commission earned on every successful join" },
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

        {/* Manage Jobs Tab */}
        {tab === "jobs" && (
          <div className="rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 animate-fade-up">
            <div className="flex items-center justify-between p-6 border-b border-slate-100">
              <h3 className="font-display text-lg font-black text-slate-950">All Jobs ({jobs.length})</h3>
              <button onClick={reloadJobs} disabled={loading} className="flex items-center gap-2 rounded-2xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-700 hover:bg-slate-200 transition-colors btn-press disabled:opacity-60">
                <RefreshCw size={15} className={loading ? "animate-spin" : ""} /> Refresh
              </button>
            </div>
            {jobs.length === 0 ? (
              <div className="p-12 text-center"><Briefcase size={32} className="mx-auto text-slate-300 mb-3" /><p className="text-sm font-bold text-slate-400">No jobs yet</p></div>
            ) : (
              <div className="divide-y divide-slate-100">
                {jobs.map((job) => (
                  <div key={job._id || job.id} className="flex items-center justify-between p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-slate-950 text-sm truncate">{job.title}</p>
                      <p className="text-xs font-semibold text-slate-400 mt-0.5">{job.company} · {job.category} · {job.location}</p>
                    </div>
                    <div className="flex items-center gap-3 ml-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold whitespace-nowrap ${job.status === "Approved" ? "bg-emerald-50 text-emerald-700" : job.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{job.status}</span>
                      <button onClick={() => deleteJob(job._id || job.id)} className="rounded-xl bg-red-50 p-2 text-red-500 hover:bg-red-100 transition-colors btn-press"><Trash2 size={15} /></button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Controls Tab */}
        {tab === "controls" && (
          <div className="grid gap-6 lg:grid-cols-2 animate-fade-up">
            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-display text-lg font-black text-slate-950 mb-5">Admin Controls</h3>
              <div className="space-y-3">
                {[
                  { icon: ClipboardList, text: "Manage All Job Posts", desc: "View, edit, remove listings" },
                  { icon: UserCog, text: "Manage User Roles", desc: "Assign candidate/employer roles" },
                  { icon: BarChart3, text: "Platform Analytics", desc: "Applications, joins, revenue" },
                  { icon: FileText, text: "Hiring Pipeline", desc: "Track candidate → company flow" },
                  { icon: Phone, text: "Outreach Tracker", desc: "HR contacts and follow-ups" },
                  { icon: Trophy, text: "Commission Reports", desc: "Earnings per successful join" },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.text} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 card-hover cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={18} /></div>
                        <div><p className="font-bold text-slate-800 text-sm">{item.text}</p><p className="text-xs font-semibold text-slate-400">{item.desc}</p></div>
                      </div>
                      <ChevronRight className="text-slate-300" size={18} />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="font-display text-lg font-black text-slate-950 mb-5">Platform Health</h3>
              <div className="space-y-4">
                {[
                  { label: "Candidate Conversion", value: 68, color: "from-blue-500 to-indigo-600" },
                  { label: "Employer Satisfaction", value: 84, color: "from-emerald-500 to-teal-600" },
                  { label: "Successful Placements", value: 42, color: "from-orange-500 to-amber-500" },
                  { label: "HR Response Rate", value: 55, color: "from-violet-500 to-purple-600" },
                ].map((m) => (
                  <div key={m.label}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-bold text-slate-700">{m.label}</p>
                      <p className="text-sm font-black text-slate-950">{m.value}%</p>
                    </div>
                    <div className="h-2 rounded-full bg-slate-100"><div className={`h-2 rounded-full bg-gradient-to-r ${m.color} transition-all`} style={{ width: `${m.value}%` }} /></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardShell>
  );
}

// ─── Shared UI Components ─────────────────────────────────────────
function Input({ placeholder, value, onChange, type = "text" }) {
  return (
    <input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      className="rounded-2xl bg-slate-50 p-4 text-sm font-semibold text-slate-700 outline-none ring-1 ring-slate-200 focus:ring-blue-500 transition-all placeholder:text-slate-400 w-full" />
  );
}

function DashboardShell({ title, subtitle, badge, badgeColor = "from-blue-600 to-indigo-600", children }) {
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

function StatCard({ icon: Icon, value, label, color = "bg-blue-600" }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 card-hover">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl ${color} text-white shadow-lg`}><Icon size={20} /></div>
      <p className="font-display text-3xl font-black text-slate-950 animate-count">{value}</p>
      <p className="mt-1 text-xs font-bold text-slate-400 uppercase tracking-wide">{label}</p>
    </div>
  );
}

function DashboardPreview() {
  return (
    <section className="bg-slate-50 px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto max-w-7xl">
        <SectionTitle eyebrow="Premium UX" title="Role-Based Dashboards" desc="Every user sees only the dashboard meant for them." />
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {[
            { icon: Users, title: "Candidate Dashboard", desc: "Apply, track applications", color: "bg-blue-600" },
            { icon: Building2, title: "Employer Dashboard", desc: "Post jobs, view applicants", color: "bg-emerald-600" },
            { icon: UserCog, title: "Admin Dashboard", desc: "Post jobs, manage platform", color: "bg-orange-500" },
          ].map((item) => (
            <div key={item.title} className="flex items-center justify-between rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200 card-hover">
              <div className="flex items-center gap-4">
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${item.color} text-white shadow-lg`}><item.icon size={22} /></div>
                <div><p className="font-display font-black text-slate-950">{item.title}</p><p className="text-sm font-semibold text-slate-400">{item.desc}</p></div>
              </div>
              <ChevronRight className="text-slate-300 shrink-0" size={20} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EmployerSection() {
  return (
    <section className="bg-white px-4 py-16 sm:px-6 sm:py-20">
      <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600">Why Companies Choose Us</p>
          <h2 className="font-display mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Pre-screened candidates. Zero hiring noise.</h2>
          <p className="mt-5 text-base leading-8 text-slate-500">HireSetu's team screens every candidate — aptitude tested, 1st round interviewed — before you ever speak to them. Save time. Hire better.</p>
          <div className="mt-8 space-y-3">
            {["Pre-screened & aptitude-tested candidates only", "1st round interview done by HireSetu team", "Industry-focused search across 6 key sectors", "Commission-only — pay only when you hire"].map((point) => (
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
              <div><p className="text-xs font-bold text-slate-400 uppercase tracking-wide">Quality Hiring</p><h3 className="font-display text-xl font-black text-slate-950">Category Pipeline</h3></div>
              <div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Sparkles size={20} /></div>
            </div>
            <div className="space-y-3">
              {categories.slice(0, 4).map((cat) => {
                const Icon = cat.icon;
                return (
                  <div key={cat.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 card-hover cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white shadow-sm`}><Icon size={18} /></div>
                      <div><p className="font-black text-slate-950 text-sm">{cat.title}</p><p className="text-xs font-bold text-slate-400">{cat.jobs} active jobs</p></div>
                    </div>
                    <ChevronRight className="text-slate-300" size={18} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
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

// ─── Toast ────────────────────────────────────────────────────────
function Toast({ toast }) {
  if (!toast) return null;
  const isError = toast.type === "error";
  return (
    <div className="fixed right-4 top-24 z-[9999] w-[calc(100%-2rem)] max-w-sm animate-slide-in">
      <div className={`rounded-3xl bg-white p-4 shadow-2xl ring-1 ${isError ? "ring-red-100" : "ring-emerald-100"}`}>
        <div className="flex items-start gap-3">
          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl ${isError ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
            {isError ? <AlertCircle size={20} /> : <CheckCircle2 size={20} />}
          </div>
          <div>
            <p className="font-bold text-slate-950 text-sm">{isError ? "Action needed" : "Done!"}</p>
            <p className="mt-0.5 text-xs font-semibold text-slate-500">{toast.message}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Footer ───────────────────────────────────────────────────────
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
            {[
              { title: "Platform", links: ["Find Jobs", "Categories", "Post a Job", "Register"] },
              { title: "Industries", links: ["IT / Software", "Pharma", "Banking", "Healthcare"] },
              { title: "Company", links: ["About HireSetu", "For Employers", "Contact", "Privacy"] },
            ].map((col) => (
              <div key={col.title}>
                <p className="font-black text-slate-300 text-xs uppercase tracking-widest mb-4">{col.title}</p>
                <div className="space-y-2.5">
                  {col.links.map((link) => <p key={link} className="text-sm font-semibold text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">{link}</p>)}
                </div>
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
  if (page === "login") return <LoginPage setRole={props.setRole} setPage={props.setPage} />;
  if (page === "candidate") return <CandidateDashboard applications={props.applications} />;
  if (page === "employer") return <EmployerDashboard jobs={props.jobs} setJobs={props.setJobs} showToast={props.showToast} />;
  if (page === "admin") return <AdminDashboard jobs={props.jobs} setJobs={props.setJobs} showToast={props.showToast} />;
  if (page === "jobs") return <JobsPage jobs={props.jobs} selectedCategory={props.selectedCategory} setSelectedCategory={props.setSelectedCategory} role={props.role} setRole={props.setRole} setPage={props.setPage} applyToJob={props.applyToJob} />;
  if (page === "categories") return <CategorySection setPage={props.setPage} setSelectedCategory={props.setSelectedCategory} />;
  return <HomePage setPage={props.setPage} setSelectedCategory={props.setSelectedCategory} />;
}

// ─── Root App ─────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState(starterJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch(`${API}/api/admin/jobs`);
        const data = await res.json();
        if (data.ok && data.jobs?.length) setJobs(data.jobs);
      } catch (err) {
        console.log("Using starter jobs (backend offline)");
      }
    }
    loadJobs();
  }, []);

  const applyToJob = async (job) => {
    try {
      const res = await fetch(`${API}/api/applications`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jobId: job._id || job.id, candidateId: 1, candidateName: "Demo Candidate", candidateEmail: "demo@gmail.com" }),
      });
      const data = await res.json();
      if (!data.ok) { showToast(data.message || "Application failed", "error"); return; }
      setApplications((prev) => [{ id: data.application.id, jobTitle: data.application.jobTitle, company: data.application.company, status: data.application.status }, ...prev]);
      showToast("Application submitted successfully!", "success");
    } catch (err) {
      // Offline fallback
      setApplications((prev) => [{ id: Date.now(), jobTitle: job.title, company: job.company, status: "Applied" }, ...prev]);
      showToast("Application submitted (offline mode)", "success");
    }
  };

  return (
    <main className="min-h-screen bg-white">
      <GlobalStyles />
      <Navbar setPage={setPage} role={role} setRole={setRole} />
      <PageContent page={page} setPage={setPage} role={role} setRole={setRole} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} jobs={jobs} setJobs={setJobs} applications={applications} applyToJob={applyToJob} showToast={showToast} />
      <Toast toast={toast} />
      <Footer />
    </main>
  );
}

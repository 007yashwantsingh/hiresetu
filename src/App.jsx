import React, { useEffect, useState } from "react";
import {
  Briefcase,
  Building2,
  Users,
  ShieldCheck,
  ArrowRight,
  Search,
  Stethoscope,
  Landmark,
  Headphones,
  TrendingUp,
  Pill,
  Code2,
  CheckCircle2,
  MapPin,
  IndianRupee,
  Clock3,
  UserCheck,
  BarChart3,
  Bell,
  Bookmark,
  CalendarCheck,
  Sparkles,
  Zap,
  Eye,
  Send,
  Menu,
  ChevronRight,
  LogOut,
  LayoutDashboard,
  PlusCircle,
  ClipboardList,
  UserCog,
  LockKeyhole,
  Mail,
  Check,
  X,
  Filter,
  FileText,
  AlertCircle,
} from "lucide-react";

const API = "http://localhost:3001";

const categories = [
  { title: "Pharma", icon: Pill, jobs: "1,240", desc: "Production, QA, R&D, Medical Rep", gradient: "from-blue-500 to-cyan-400" },
  { title: "IT / Software", icon: Code2, jobs: "3,120", desc: "Developers, QA, Cloud, AI, Support", gradient: "from-indigo-500 to-blue-500" },
  { title: "Banking / Finance", icon: Landmark, jobs: "860", desc: "Sales, Credit, Operations, Accounts", gradient: "from-emerald-500 to-teal-400" },
  { title: "Sales & Marketing", icon: TrendingUp, jobs: "2,050", desc: "Field Sales, Digital, B2B, Retail", gradient: "from-orange-500 to-amber-400" },
  { title: "Healthcare", icon: Stethoscope, jobs: "970", desc: "Nurses, Technicians, Admin, Clinics", gradient: "from-rose-500 to-pink-400" },
  { title: "BPO / Customer Support", icon: Headphones, jobs: "1,780", desc: "Voice, Non-Voice, Chat, Backend", gradient: "from-violet-500 to-purple-400" },
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

function Navbar({ setPage, role, setRole }) {
  const loggedIn = Boolean(role);
  function logout() {
    setRole(null);
    setPage("home");
  }
  function goDashboard() {
    if (role === "candidate") setPage("candidate");
    if (role === "employer") setPage("employer");
    if (role === "admin") setPage("admin");
  }
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-5 sm:py-4">
        <button onClick={() => setPage("home")} className="flex items-center gap-3 text-left">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-950 to-blue-800 text-white shadow-lg shadow-blue-950/20"><Briefcase size={22} /></div>
          <div><h1 className="text-xl font-black tracking-tight text-slate-950">HireSetu</h1><p className="text-xs font-bold text-slate-500">Premium Hiring Network</p></div>
        </button>
        <nav className="hidden items-center gap-8 text-sm font-bold text-slate-600 md:flex">
          <button onClick={() => setPage("home")} className="hover:text-blue-600">Home</button>
          <button onClick={() => setPage("jobs")} className="hover:text-blue-600">Jobs</button>
          <button onClick={() => setPage("categories")} className="hover:text-blue-600">Categories</button>
          {loggedIn && <button onClick={goDashboard} className="hover:text-blue-600">Dashboard</button>}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          {!loggedIn ? (
            <>
              <button onClick={() => setPage("login")} className="hidden rounded-xl px-4 py-2 text-sm font-black text-slate-700 hover:bg-slate-100 sm:block">Login</button>
              <button onClick={() => setPage("login")} className="rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-black text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 sm:px-5">Register</button>
            </>
          ) : (
            <>
              <button onClick={goDashboard} className="rounded-xl bg-blue-50 px-4 py-2.5 text-sm font-black text-blue-700">{role.toUpperCase()}</button>
              <button onClick={logout} className="rounded-xl bg-slate-100 p-2.5 text-slate-700 hover:bg-red-50 hover:text-red-600"><LogOut size={19} /></button>
            </>
          )}
          <button className="rounded-xl bg-slate-100 p-2.5 text-slate-700 md:hidden"><Menu size={20} /></button>
        </div>
      </div>
    </header>
  );
}

function HomePage({ setPage, setSelectedCategory }) {
  return (
    <>
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white">
        <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute right-0 top-32 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-5 sm:py-20 lg:grid-cols-2 lg:py-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-black text-blue-100 backdrop-blur sm:text-sm"><ShieldCheck size={16} /> Verified hiring across 6 focused industries</div>
            <h2 className="max-w-3xl text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-7xl">Your Career. <span className="text-blue-300">One Smart Platform.</span></h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">Discover category-based jobs across Pharma, IT, Banking, Sales, Healthcare and BPO with a clean app-like experience.</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => setPage("jobs")} className="flex items-center justify-center gap-2 rounded-2xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-2xl shadow-blue-600/30 hover:bg-blue-500">Find Jobs <Search size={18} /></button>
              <button onClick={() => setPage("login")} className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/10 px-7 py-4 text-base font-black text-white backdrop-blur hover:bg-white/15">Post a Job <ArrowRight size={18} /></button>
            </div>
            <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[{ label: "Verified HRs", value: "850+" }, { label: "Active Jobs", value: "10K+" }, { label: "Applications", value: "75K+" }, { label: "Successful Joins", value: "2.5K+" }].map((item) => <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur"><p className="text-2xl font-black text-white">{item.value}</p><p className="mt-1 text-xs font-bold text-slate-300">{item.label}</p></div>)}
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <div className="rounded-[2.2rem] border border-white/10 bg-white/10 p-3 shadow-2xl backdrop-blur-xl sm:p-5">
              <div className="overflow-hidden rounded-[1.8rem] bg-slate-100 text-slate-950">
                <div className="bg-gradient-to-br from-slate-950 to-blue-950 p-5 text-white">
                  <div className="flex items-center justify-between"><div className="flex items-center gap-3"><div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-500 text-white shadow-lg"><Briefcase size={24} /></div><div><h3 className="text-xl font-black">Live Hiring Board</h3><p className="text-sm font-semibold text-blue-100">Fresh jobs across top industries</p></div></div><div className="rounded-2xl bg-white/10 p-3"><Bell size={20} /></div></div>
                  <div className="mt-5 grid grid-cols-3 gap-3"><div className="rounded-2xl bg-white/10 p-3 text-center"><p className="text-xl font-black">10K+</p><p className="text-[11px] font-bold text-blue-100">Jobs</p></div><div className="rounded-2xl bg-white/10 p-3 text-center"><p className="text-xl font-black">850+</p><p className="text-[11px] font-bold text-blue-100">HRs</p></div><div className="rounded-2xl bg-white/10 p-3 text-center"><p className="text-xl font-black">6</p><p className="text-[11px] font-bold text-blue-100">Sectors</p></div></div>
                </div>
                <div className="p-4 sm:p-5">
                  <div className="rounded-2xl bg-amber-50 p-4 text-amber-900 ring-1 ring-amber-100"><div className="flex items-start gap-3"><Zap className="mt-1 text-orange-500" size={21} /><div><p className="font-black">New openings added today</p><p className="text-sm font-semibold text-amber-800">Explore jobs by your preferred industry.</p></div></div></div>
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
  return <button onClick={onClick} className="rounded-2xl bg-white p-4 text-left shadow-sm ring-1 ring-slate-200 hover:-translate-y-1 hover:shadow-lg"><div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}><Icon size={18} /></div><p className="text-sm font-black text-slate-950">{cat.title}</p><p className="mt-1 text-xs font-bold text-blue-600">{cat.jobs} jobs</p></button>;
}

function LoginPage({ setRole, setPage }) {
  function loginAs(nextRole) {
    setRole(nextRole);
    if (nextRole === "candidate") setPage("candidate");
    if (nextRole === "employer") setPage("employer");
    if (nextRole === "admin") setPage("admin");
  }
  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-12 sm:px-5">
      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1fr_1.1fr] lg:items-center">
        <div><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Role Based Access</p><h2 className="mt-3 text-4xl font-black tracking-tight text-slate-950 md:text-6xl">Login to your correct dashboard.</h2><p className="mt-5 text-lg leading-8 text-slate-600">Candidate sees only candidate dashboard. Employer sees only employer dashboard. Admin can manage the full platform.</p><div className="mt-8 rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="flex items-start gap-3"><LockKeyhole className="mt-1 text-blue-600" /><div><p className="font-black text-slate-950">Access is controlled by user role</p><p className="mt-1 text-sm font-semibold text-slate-500">Later this will connect to Firebase/Auth database. For now this is a working frontend prototype.</p></div></div></div></div>
        <div className="rounded-[2rem] bg-white p-5 shadow-2xl shadow-slate-950/10 ring-1 ring-slate-200 sm:p-7">
          <h3 className="text-2xl font-black text-slate-950">Choose login type</h3><p className="mt-2 text-sm font-bold text-slate-500">Demo buttons for role-based dashboard routing</p>
          <div className="mt-6 grid gap-4"><RoleButton onClick={() => loginAs("candidate")} icon={Users} title="Login as Candidate" desc="Apply, save jobs, track applications" color="blue" /><RoleButton onClick={() => loginAs("employer")} icon={Building2} title="Login as Employer" desc="Post jobs, view applicants, shortlist" color="emerald" /><RoleButton onClick={() => loginAs("admin")} icon={UserCog} title="Login as Admin" desc="Manage HR, candidates, jobs, approvals" dark /></div>
          <div className="mt-6 grid gap-3 rounded-3xl bg-slate-50 p-4 ring-1 ring-slate-200"><div className="flex items-center gap-3 rounded-2xl bg-white p-3"><Mail size={18} className="text-slate-400" /><span className="text-sm font-bold text-slate-500">Email input will come here</span></div><div className="flex items-center gap-3 rounded-2xl bg-white p-3"><LockKeyhole size={18} className="text-slate-400" /><span className="text-sm font-bold text-slate-500">Password input will come here</span></div></div>
        </div>
      </div>
    </section>
  );
}

function RoleButton({ onClick, icon: Icon, title, desc, dark, color }) {
  const style = dark ? "bg-slate-950 text-white ring-slate-900 hover:bg-blue-950" : color === "emerald" ? "bg-emerald-50 ring-emerald-100 hover:bg-emerald-600 hover:text-white" : "bg-blue-50 ring-blue-100 hover:bg-blue-600 hover:text-white";
  return <button onClick={onClick} className={`group flex items-center justify-between rounded-3xl p-5 text-left ring-1 ${style}`}><div className="flex items-center gap-4"><div className={`rounded-2xl p-3 ${dark ? "bg-white/10 text-white" : "bg-white text-blue-600"}`}><Icon size={24} /></div><div><p className="text-xl font-black">{title}</p><p className={`text-sm font-bold ${dark ? "text-slate-300" : "opacity-80"}`}>{desc}</p></div></div><ArrowRight /></button>;
}

function CategorySection({ setPage, setSelectedCategory }) {
  return <section className="bg-slate-50 px-4 py-16 sm:px-5 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Industry First" title="Explore Jobs By Category" desc="Six focused hiring lanes. Cleaner search for candidates and better applicant quality for HRs." /><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{categories.map((cat) => <CategoryCard key={cat.title} cat={cat} onClick={() => { setSelectedCategory(cat.title); setPage("jobs"); }} />)}</div></div></section>;
}

function CategoryCard({ cat, onClick }) {
  const Icon = cat.icon;
  return <button onClick={onClick} className="group relative overflow-hidden rounded-[1.7rem] border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-blue-950/10 sm:p-6"><div className={`absolute right-0 top-0 h-28 w-28 translate-x-10 -translate-y-10 rounded-full bg-gradient-to-br ${cat.gradient} opacity-10 blur-2xl`} /><div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.gradient} text-white shadow-lg`}><Icon size={26} /></div><h3 className="relative mt-5 text-2xl font-black text-slate-950">{cat.title}</h3><p className="relative mt-2 text-sm font-black text-blue-600">{cat.jobs} Active Jobs</p><p className="relative mt-3 text-sm leading-7 text-slate-600 sm:text-base">{cat.desc}</p><span className="relative mt-5 inline-flex items-center gap-2 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-black text-slate-950 group-hover:bg-blue-600 group-hover:text-white">Explore Jobs <ArrowRight size={17} /></span></button>;
}

function JobsPage({ jobs, selectedCategory, setSelectedCategory, role, setRole, setPage, applyToJob }) {
  const [query, setQuery] = useState("");
  const approvedJobs = jobs.filter((j) => j.status === "Approved");
  const filtered = approvedJobs.filter((job) => (!selectedCategory || job.category === selectedCategory) && `${job.title} ${job.company} ${job.location}`.toLowerCase().includes(query.toLowerCase()));
  return <section className="bg-slate-50 px-4 py-10 sm:px-5"><div className="mx-auto max-w-7xl"><div className="rounded-[2rem] bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8"><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-200">Job Search</p><h2 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">Find the right job faster.</h2><p className="mt-3 text-slate-300">Search by category, company or location.</p></div><div className="mt-6 grid gap-4 lg:grid-cols-[280px_1fr]"><aside className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className="mb-4 flex items-center gap-2 font-black text-slate-950"><Filter size={18} /> Categories</div><button onClick={() => setSelectedCategory("")} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-black ${!selectedCategory ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700"}`}>All Categories</button>{categories.map((cat) => <button key={cat.title} onClick={() => setSelectedCategory(cat.title)} className={`mb-2 w-full rounded-2xl px-4 py-3 text-left text-sm font-black ${selectedCategory === cat.title ? "bg-blue-600 text-white" : "bg-slate-50 text-slate-700 hover:bg-blue-50"}`}>{cat.title}</button>)}</aside><main><div className="mb-5 rounded-3xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3"><Search size={19} className="text-slate-400" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search jobs, company, location..." className="w-full bg-transparent text-sm font-bold outline-none" /></div></div><div className="grid gap-5 lg:grid-cols-2">{filtered.map((job) => <JobCard key={job.id} job={job} role={role} setRole={setRole} setPage={setPage} applyToJob={applyToJob} />)}</div>{filtered.length === 0 && <div className="rounded-3xl bg-white p-8 text-center font-black text-slate-500 ring-1 ring-slate-200">No jobs found in this category.</div>}</main></div></div></section>;
}

function JobsSection({ setPage }) {
  return <section className="bg-white px-4 py-16 sm:px-5 sm:py-20"><div className="mx-auto max-w-7xl"><div className="flex flex-col justify-between gap-6 md:flex-row md:items-end"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Featured Jobs</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">Fresh Opportunities</h2><p className="mt-3 max-w-2xl text-slate-600">Clean job cards with only useful information. No clutter.</p></div><button onClick={() => setPage("jobs")} className="w-fit rounded-2xl bg-slate-950 px-6 py-3 text-sm font-black text-white hover:bg-blue-600">View All Jobs</button></div><div className="mt-10 grid gap-5 lg:grid-cols-3">{starterJobs.slice(0, 3).map((job) => <JobPreview key={job.id} job={job} />)}</div></div></section>;
}

function JobPreview({ job }) {
  return <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Building2 size={24} /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{job.tag}</span></div><h3 className="text-xl font-black text-slate-950">{job.title}</h3><p className="mt-1 font-bold text-slate-500">{job.company}</p><JobMeta job={job} /><div className="mt-6 grid grid-cols-2 gap-3"><button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Details</button><button className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">Apply</button></div></div>;
}

function JobCard({ job, role, setRole, setPage, applyToJob }) {
  function handleApply() {
    if (role !== "candidate") {
      setRole("candidate");
      setPage("candidate");
      setTimeout(() => applyToJob(job), 0);
    } else {
      applyToJob(job);
      setPage("candidate");
    }
  }
  return <div className="rounded-[1.7rem] border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl sm:p-6"><div className="mb-5 flex items-start justify-between gap-4"><div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Building2 size={24} /></div><span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-black text-emerald-700">{job.tag}</span></div><h3 className="text-xl font-black text-slate-950">{job.title}</h3><p className="mt-1 font-bold text-slate-500">{job.company}</p><p className="mt-3 text-sm leading-6 text-slate-600">{job.description}</p><JobMeta job={job} /><div className="mt-6 grid grid-cols-2 gap-3"><button className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-black text-slate-700 hover:bg-slate-50">Details</button><button onClick={handleApply} className="rounded-xl bg-blue-600 px-4 py-3 text-sm font-black text-white hover:bg-blue-700">Apply</button></div></div>;
}

function JobMeta({ job }) {
  return <div className="mt-5 space-y-3 text-sm font-bold text-slate-600"><p className="flex items-center gap-2"><MapPin size={16} /> {job.location}</p><p className="flex items-center gap-2"><IndianRupee size={16} /> {job.salary}</p><p className="flex items-center gap-2"><Clock3 size={16} /> {job.exp}</p><p className="flex items-center gap-2"><Briefcase size={16} /> {job.category}</p></div>;
}

function CandidateDashboard({ applications }) {
  return <DashboardShell title="Candidate Dashboard" subtitle="Apply, save and track your job applications" badge="Candidate"><div className="grid gap-5 md:grid-cols-4"><StatCard icon={Send} value={applications.length} label="Applications" /><StatCard icon={Eye} value="4" label="Viewed" color="bg-emerald-600" /><StatCard icon={CalendarCheck} value="2" label="Interviews" color="bg-orange-500" /><StatCard icon={Bookmark} value="8" label="Saved Jobs" color="bg-violet-600" /></div><div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.3fr]"><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="mb-4 flex items-center justify-between"><h3 className="text-xl font-black text-slate-950">Profile Strength</h3><span className="font-black text-blue-600">72%</span></div><div className="h-3 rounded-full bg-slate-100"><div className="h-3 w-[72%] rounded-full bg-blue-600" /></div><p className="mt-4 text-sm font-bold text-slate-500">Add skills, latest company and expected salary to improve visibility.</p><button className="mt-5 w-full rounded-2xl bg-slate-950 py-3 font-black text-white">Complete Profile</button></div><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-black text-slate-950">Your Applications</h3><div className="mt-5 space-y-3">{applications.map((a) => <div key={a.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><div><p className="font-black text-slate-950">{a.jobTitle}</p><p className="text-sm font-bold text-slate-500">{a.company}</p></div><span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-black text-blue-700">{a.status}</span></div>)}</div></div></div><ApplicationTimeline /></DashboardShell>;
}

function ApplicationTimeline() {
  return <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-black text-slate-950">Application Tracker</h3><div className="mt-5 grid gap-3 md:grid-cols-5">{["Applied", "Viewed", "Shortlisted", "Interview", "Selected"].map((s, i) => <div key={s} className={`rounded-2xl p-4 ${i < 3 ? "bg-blue-50 text-blue-700" : "bg-slate-50 text-slate-500"}`}><CheckCircle2 size={20} /><p className="mt-2 text-sm font-black">{s}</p></div>)}</div></div>;
}

function EmployerDashboard({ jobs, setJobs, showToast }) {
  const [form, setForm] = useState({
    title: "",
    company: "",
    category: "IT / Software",
    location: "",
    salary: "",
    exp: "",
    description: "",
  });

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function postJob() {
    if (!form.title || !form.company || !form.location) {
      showToast("Please fill Job Title, Company and Location", "error");
      return;
    }

    try {
      const res = await fetch(`${API}/api/jobs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, employerId: 1 }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast(data.message || "Job posting failed", "error");
        return;
      }

      setJobs((prev) => [data.job, ...prev]);
      setForm({
        title: "",
        company: "",
        category: "IT / Software",
        location: "",
        salary: "",
        exp: "",
        description: "",
      });
      showToast("Job submitted for admin approval", "success");
    } catch (err) {
      console.error(err);
      showToast("Backend connection failed", "error");
    }
  }

  return <DashboardShell title="Employer Dashboard" subtitle="Post jobs, manage applicants and shortlist faster" badge="Employer"><div className="grid gap-5 md:grid-cols-4"><StatCard icon={Briefcase} value={jobs.length} label="Your Jobs" /><StatCard icon={Users} value="248" label="Applicants" color="bg-emerald-600" /><StatCard icon={UserCheck} value="36" label="Shortlisted" color="bg-orange-500" /><StatCard icon={CalendarCheck} value="9" label="Interviews" color="bg-violet-600" /></div><div className="mt-6 grid gap-6 lg:grid-cols-[1fr_1.2fr]"><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><div className="flex items-center justify-between"><h3 className="text-xl font-black text-slate-950">Post New Job</h3><PlusCircle className="text-blue-600" /></div><div className="mt-5 grid gap-3"><Input placeholder="Job Title" value={form.title} onChange={(v) => update("title", v)} /><Input placeholder="Company Name" value={form.company} onChange={(v) => update("company", v)} /><select value={form.category} onChange={(e) => update("category", e.target.value)} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 outline-none ring-1 ring-slate-100">{categories.map((c) => <option key={c.title}>{c.title}</option>)}</select><Input placeholder="Location" value={form.location} onChange={(v) => update("location", v)} /><Input placeholder="Salary Range" value={form.salary} onChange={(v) => update("salary", v)} /><Input placeholder="Experience" value={form.exp} onChange={(v) => update("exp", v)} /><textarea placeholder="Job Description" value={form.description} onChange={(e) => update("description", e.target.value)} className="min-h-24 rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 outline-none ring-1 ring-slate-100" /></div><button onClick={postJob} className="mt-5 w-full rounded-2xl bg-blue-600 py-3 font-black text-white hover:bg-blue-700">Submit For Approval</button></div><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-black text-slate-950">Your Job Posts</h3><div className="mt-5 space-y-3">{jobs.slice(0, 6).map((job) => <div key={job.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><div><p className="font-black text-slate-950">{job.title}</p><p className="text-sm font-bold text-slate-500">{job.category} • {job.applicants || 0} applicants</p></div><span className={`rounded-full px-3 py-1 text-xs font-black ${job.status === "Approved" ? "bg-emerald-50 text-emerald-700" : job.status === "Rejected" ? "bg-red-50 text-red-700" : "bg-amber-50 text-amber-700"}`}>{job.status}</span></div>)}</div></div></div></DashboardShell>;
}

function Input({ placeholder, value, onChange }) {
  return <input placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)} className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-700 outline-none ring-1 ring-slate-100" />;
}

function AdminDashboard({ jobs, setJobs, showToast }) {
  const pending = jobs.filter((j) => j.status === "Pending");

  async function setStatus(id, status) {
    try {
      const res = await fetch(`${API}/api/admin/jobs/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast(data.message || "Status update failed", "error");
        return;
      }

      setJobs((prev) => prev.map((j) => (j.id === id ? { ...j, status } : j)));
      showToast(`Job ${status}`, "success");
    } catch (err) {
      console.error(err);
      showToast("Backend connection failed", "error");
    }
  }

  return <DashboardShell title="Admin Dashboard" subtitle="Full control over candidates, employers, jobs and approvals" badge="Admin"><div className="grid gap-5 md:grid-cols-4"><StatCard icon={Users} value="4.8K" label="Candidates" /><StatCard icon={Building2} value="850" label="Employers" color="bg-emerald-600" /><StatCard icon={Briefcase} value={jobs.length} label="Total Jobs" color="bg-orange-500" /><StatCard icon={ShieldCheck} value={pending.length} label="Pending Jobs" color="bg-violet-600" /></div><div className="mt-6 grid gap-6 lg:grid-cols-2"><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-black text-slate-950">Pending Job Approvals</h3><div className="mt-5 space-y-3">{pending.length === 0 && <p className="rounded-2xl bg-slate-50 p-4 text-sm font-bold text-slate-500">No pending jobs right now.</p>}{pending.map((job) => <div key={job.id} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div><p className="font-black text-slate-950">{job.title}</p><p className="text-sm font-bold text-slate-500">{job.company} • {job.category}</p></div><div className="flex gap-2"><button onClick={() => setStatus(job.id, "Approved")} className="rounded-xl bg-emerald-50 p-2 text-emerald-700 hover:bg-emerald-100"><Check size={18} /></button><button onClick={() => setStatus(job.id, "Rejected")} className="rounded-xl bg-red-50 p-2 text-red-700 hover:bg-red-100"><X size={18} /></button></div></div>)}</div></div><div className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-slate-200"><h3 className="text-xl font-black text-slate-950">Admin Controls</h3><div className="mt-5 grid gap-3">{[{ icon: ClipboardList, text: "Approve Job Posts" }, { icon: UserCog, text: "Manage User Roles" }, { icon: BarChart3, text: "View Platform Analytics" }, { icon: FileText, text: "Track Hiring Status" }].map((item) => { const Icon = item.icon; return <div key={item.text} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"><div className="flex items-center gap-3"><Icon className="text-blue-600" size={20} /><p className="font-black text-slate-800">{item.text}</p></div><ChevronRight className="text-slate-400" /></div>; })}</div></div></div></DashboardShell>;
}

function DashboardShell({ title, subtitle, badge, children }) {
  return <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-8 sm:px-5 sm:py-10"><div className="mx-auto max-w-7xl"><div className="mb-7 overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 to-blue-950 p-6 text-white shadow-2xl shadow-slate-950/20 sm:p-8"><div className="flex flex-col justify-between gap-5 md:flex-row md:items-center"><div><span className="rounded-full bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-wider text-blue-100">{badge}</span><h2 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{title}</h2><p className="mt-3 text-slate-300">{subtitle}</p></div><div className="rounded-3xl bg-white/10 p-5"><LayoutDashboard size={40} /></div></div></div>{children}</div></section>;
}

function StatCard({ icon: Icon, value, label, color = "bg-blue-600" }) {
  return <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200"><div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${color} text-white`}><Icon size={22} /></div><p className="text-3xl font-black text-slate-950">{value}</p><p className="mt-1 text-sm font-black text-slate-500">{label}</p></div>;
}

function DashboardPreview() {
  return <section className="bg-slate-50 px-4 py-16 sm:px-5 sm:py-20"><div className="mx-auto max-w-7xl"><SectionTitle eyebrow="Premium UX" title="Role-Based Dashboards" desc="Every user sees only the dashboard meant for them." /><div className="mt-10 grid gap-5 md:grid-cols-3"><RolePreview icon={Users} title="Candidate Dashboard" desc="Apply and track applications" /><RolePreview icon={Building2} title="Employer Dashboard" desc="Post jobs and view applicants" /><RolePreview icon={UserCog} title="Admin Dashboard" desc="Control all platform activity" /></div></div></section>;
}

function RolePreview({ icon: Icon, title, desc }) {
  return <div className="flex items-center justify-between rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-200"><div className="flex items-center gap-3"><div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><Icon size={21} /></div><div><p className="font-black text-slate-950">{title}</p><p className="text-sm font-bold text-slate-500">{desc}</p></div></div><ChevronRight className="text-slate-400" size={20} /></div>;
}

function EmployerSection() {
  return <section className="bg-white px-4 py-16 sm:px-5 sm:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">Why Employers Choose Us</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">Cleaner hiring. Better applicants. Faster decisions.</h2><p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">A premium hiring experience designed for companies that want quality applicants without noisy job-board clutter.</p><div className="mt-8 space-y-4">{["Verified employer and candidate experience", "Focused hiring inside only 6 strong categories", "Clean applicant tracking from applied to selected", "Mobile-first dashboard for fast recruitment actions"].map((point) => <div key={point} className="flex items-start gap-3 rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><CheckCircle2 className="mt-0.5 text-emerald-600" size={21} /><p className="font-bold text-slate-700">{point}</p></div>)}</div></div><div className="rounded-[2rem] bg-slate-50 p-4 sm:p-5"><div className="rounded-[1.6rem] bg-white p-5 shadow-xl sm:p-6"><div className="flex items-center justify-between"><div><p className="font-bold text-slate-500">Quality Hiring</p><h3 className="text-2xl font-black text-slate-950">Category Pipeline</h3></div><div className="rounded-2xl bg-blue-50 p-3 text-blue-600"><Sparkles size={23} /></div></div><div className="mt-6 space-y-4">{categories.slice(0, 4).map((cat) => { const Icon = cat.icon; return <div key={cat.title} className="flex items-center justify-between rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100"><div className="flex items-center gap-3"><div className={`flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br ${cat.gradient} text-white`}><Icon size={20} /></div><div><p className="font-black text-slate-950">{cat.title}</p><p className="text-xs font-bold text-slate-500">{cat.jobs} active jobs</p></div></div><ChevronRight className="text-slate-400" size={20} /></div>; })}</div></div></div></div></section>;
}

function SectionTitle({ eyebrow, title, desc }) {
  return <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">{eyebrow}</p><h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-4xl md:text-5xl">{title}</h2><p className="mt-5 text-base leading-8 text-slate-600 sm:text-lg">{desc}</p></div>;
}

function Footer() {
  return <footer className="bg-slate-950 px-4 pb-10 pt-10 text-white sm:px-5"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 md:flex-row md:items-center"><div><h2 className="text-2xl font-black">HireSetu</h2><p className="mt-2 text-slate-400">Premium category-based hiring platform.</p></div><p className="text-sm text-slate-500">© 2026 HireSetu. All rights reserved.</p></div></footer>;
}

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

function Toast({ toast }) {
  if (!toast) return null;

  const isError = toast.type === "error";

  return (
    <div className="fixed right-4 top-24 z-[9999] w-[calc(100%-2rem)] max-w-sm rounded-3xl bg-white p-4 shadow-2xl ring-1 ring-slate-200">
      <div className="flex items-start gap-3">
        <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${isError ? "bg-red-50 text-red-600" : "bg-emerald-50 text-emerald-600"}`}>
          {isError ? <AlertCircle size={22} /> : <CheckCircle2 size={22} />}
        </div>
        <div>
          <p className="font-black text-slate-950">{isError ? "Action needed" : "Success"}</p>
          <p className="mt-1 text-sm font-bold text-slate-500">{toast.message}</p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const [role, setRole] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [jobs, setJobs] = useState(starterJobs);
  const [applications, setApplications] = useState(initialApplications);
  const [toast, setToast] = useState(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  useEffect(() => {
    async function loadJobs() {
      try {
        const res = await fetch(`${API}/api/admin/jobs`);
        const data = await res.json();
        if (data.ok) setJobs(data.jobs);
      } catch (err) {
        console.error("Could not load backend jobs", err);
      }
    }

    loadJobs();
  }, []);

  const applyToJob = async (job) => {
    try {
      const res = await fetch(`${API}/api/applications`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          jobId: job.id,
          candidateId: 1,
          candidateName: "Demo Candidate",
          candidateEmail: "demo@gmail.com",
        }),
      });

      const data = await res.json();

      if (!data.ok) {
        showToast(data.message || "Application failed", "error");
        return;
      }

      setApplications((prev) => [
        {
          id: data.application.id,
          jobTitle: data.application.jobTitle,
          company: data.application.company,
          status: data.application.status,
        },
        ...prev,
      ]);

      showToast("Application submitted successfully", "success");
    } catch (err) {
      console.error(err);
      showToast("Backend connection failed", "error");
    }
  };

  return (
    <main className="min-h-screen bg-white font-sans">
      <Navbar setPage={setPage} role={role} setRole={setRole} />
      <PageContent page={page} setPage={setPage} role={role} setRole={setRole} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} jobs={jobs} setJobs={setJobs} applications={applications} applyToJob={applyToJob} showToast={showToast} />
      <Toast toast={toast} />
      <Footer />
    </main>
  );
}

// ─────────────────────────────────────────────────────────────────
// HireSetu — AuthPages.jsx
// Drop-in replacement for LoginPage in App.jsx
// Includes: LoginPage + RegisterPage + useAuth hook
//
// HOW TO INTEGRATE:
// 1. Copy these components into your App.jsx (or import from this file)
// 2. In PageContent, replace:
//      if (page === "login") return <LoginPage ... />
//    with:
//      if (page === "login") return <LoginPage setRole={props.setRole} setPage={props.setPage} showToast={props.showToast} />
//      if (page === "register") return <RegisterPage setRole={props.setRole} setPage={props.setPage} showToast={props.showToast} />
// 3. Add showToast to PageContent props
// ─────────────────────────────────────────────────────────────────

import React, { useState } from "react";
import {
  Briefcase, Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight,
  CheckCircle2, ShieldCheck, Users, Building2, Zap, Star,
  AlertCircle, Loader2, ChevronRight, Globe, Trophy, Target,
} from "lucide-react";

const API = "https://hiresetu-u4ot.onrender.com";

// ─── Helpers ──────────────────────────────────────────────────────
function validate(form, isRegister) {
  const errors = {};
  if (!form.email) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = "Enter a valid email";
  if (!form.password) errors.password = "Password is required";
  else if (form.password.length < 6) errors.password = "Minimum 6 characters";
  if (isRegister) {
    if (!form.name || form.name.trim().length < 2) errors.name = "Full name is required";
    if (!form.phone || form.phone.length < 10) errors.phone = "Enter valid 10-digit phone";
    if (form.password !== form.confirmPassword) errors.confirmPassword = "Passwords do not match";
    if (!form.terms) errors.terms = "Please accept terms to continue";
  }
  return errors;
}

function saveSession(user) {
  localStorage.setItem("hs_user", JSON.stringify(user));
}

// ─── Shared Form Components ───────────────────────────────────────
function FormField({ label, icon: Icon, type = "text", placeholder, value, onChange, error, rightEl }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-bold text-slate-600 uppercase tracking-wide">{label}</label>
      <div className={`flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3.5 ring-1 transition-all ${error ? "ring-red-400 bg-red-50" : "ring-slate-200 focus-within:ring-blue-500 focus-within:bg-white"}`}>
        <Icon size={17} className={error ? "text-red-400 shrink-0" : "text-slate-400 shrink-0"} />
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-semibold text-slate-800 outline-none placeholder:text-slate-400"
        />
        {rightEl}
      </div>
      {error && (
        <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-red-500">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
}

function RoleTab({ role, selected, onClick, icon: Icon, desc }) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 rounded-2xl p-4 text-left transition-all btn-press ${selected ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25" : "bg-slate-50 text-slate-600 hover:bg-slate-100"}`}
    >
      <Icon size={20} className={selected ? "text-white" : "text-slate-400"} />
      <p className={`mt-2 text-sm font-black ${selected ? "text-white" : "text-slate-800"}`}>{role}</p>
      <p className={`text-xs font-semibold mt-0.5 ${selected ? "text-blue-100" : "text-slate-400"}`}>{desc}</p>
    </button>
  );
}

// ─── Left Branding Panel ──────────────────────────────────────────
function BrandPanel({ isRegister }) {
  const features = isRegister
    ? [
        { icon: ShieldCheck, text: "Free to register — no hidden fees", sub: "Candidates always free on HireSetu" },
        { icon: Zap, text: "Get matched within 48 hours", sub: "Our team screens and contacts you" },
        { icon: Star, text: "Pre-screened by our team", sub: "Aptitude tested before employer sees you" },
        { icon: Trophy, text: "2,500+ successful placements", sub: "Real joins across 6 industries" },
      ]
    : [
        { icon: Target, text: "Your pre-screened dashboard", sub: "See only what matters to you" },
        { icon: ShieldCheck, text: "Verified employers only", sub: "No spam, no fake listings" },
        { icon: Zap, text: "Fast-track applications", sub: "Admin team supports your journey" },
        { icon: Globe, text: "Jobs across 6 industries", sub: "IT, Pharma, Banking, BPO and more" },
      ];

  return (
    <div className="relative hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-[#0d1b3e] to-blue-950 p-8 text-white lg:flex lg:flex-col lg:justify-between">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid opacity-40" />
      {/* Glow orbs */}
      <div className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-blue-500/20 blur-[80px] animate-pulse-glow" />
      <div className="absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-violet-500/15 blur-[80px] animate-pulse-glow" style={{ animationDelay: "2s" }} />

      <div className="relative">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 shadow-lg">
            <Briefcase size={22} />
          </div>
          <div>
            <h1 className="font-display text-xl font-black tracking-tight">HireSetu</h1>
            <p className="text-[11px] font-semibold text-slate-400 tracking-wide">Premium Hiring Network</p>
          </div>
        </div>

        <h2 className="font-display text-3xl font-black leading-tight">
          {isRegister ? "Start your career journey today." : "Welcome back."}
        </h2>
        <p className="mt-3 text-sm font-semibold text-slate-400 leading-7">
          {isRegister
            ? "Join thousands of candidates placed across India's top companies."
            : "Your pre-screened job opportunities are waiting."}
        </p>

        <div className="mt-8 space-y-4">
          {features.map((f) => (
            <div key={f.text} className="flex items-start gap-3.5">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <f.icon size={17} className="text-blue-300" />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{f.text}</p>
                <p className="text-xs font-semibold text-slate-500">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom stats */}
      <div className="relative mt-10 grid grid-cols-3 gap-3">
        {[{ v: "10K+", l: "Active Jobs" }, { v: "850+", l: "Verified HRs" }, { v: "2.5K+", l: "Placed" }].map((s) => (
          <div key={s.l} className="rounded-2xl bg-white/8 p-3 text-center ring-1 ring-white/10">
            <p className="font-display text-xl font-black">{s.v}</p>
            <p className="text-[11px] font-semibold text-slate-500 mt-0.5">{s.l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── LOGIN PAGE ───────────────────────────────────────────────────
export function LoginPage({ setRole, setPage, showToast }) {
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPass, setShowPass] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  function update(field, val) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  }

  async function handleLogin() {
    const errs = validate(form, false);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email, password: form.password, role: selectedRole }),
      });
      const data = await res.json();

      if (!data.ok) {
        setErrors({ general: data.message || "Invalid credentials" });
        setLoading(false);
        return;
      }

      saveSession({ name: data.user?.name || "User", email: form.email, role: data.user?.role || selectedRole, token: data.token });
      setRole(data.user?.role || selectedRole);
      showToast?.(`Welcome back, ${data.user?.name || "User"}!`, "success");
      if ((data.user?.role || selectedRole) === "candidate") setPage("candidate");
      else if ((data.user?.role || selectedRole) === "employer") setPage("employer");
      else setPage("admin");
    } catch (err) {
      // Demo fallback
      setErrors({ general: "Backend offline — use Demo Login below" });
      setShowDemo(true);
    }
    setLoading(false);
  }

  function demoLogin(role) {
    setRole(role);
    showToast?.(`Logged in as ${role}`, "success");
    if (role === "candidate") setPage("candidate");
    else if (role === "employer") setPage("employer");
    else setPage("admin");
  }

  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.1fr] lg:items-stretch min-h-[600px]">
        <BrandPanel isRegister={false} />

        {/* Form Panel */}
        <div className="rounded-[2rem] bg-white p-7 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-200 animate-fade-up">
          <div className="mb-7">
            <h2 className="font-display text-2xl font-black text-slate-950">Sign in to HireSetu</h2>
            <p className="mt-1.5 text-sm font-semibold text-slate-400">
              New here?{" "}
              <button onClick={() => setPage("register")} className="font-bold text-blue-600 hover:underline">Create an account</button>
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-6">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">I am a</p>
            <div className="flex gap-3">
              <RoleTab role="Candidate" selected={selectedRole === "candidate"} onClick={() => setSelectedRole("candidate")} icon={Users} desc="Looking for jobs" />
              <RoleTab role="Employer" selected={selectedRole === "employer"} onClick={() => setSelectedRole("employer")} icon={Building2} desc="Hiring talent" />
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-red-700">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <FormField
              label="Email Address"
              icon={Mail}
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(v) => update("email", v)}
              error={errors.email}
            />
            <FormField
              label="Password"
              icon={Lock}
              type={showPass ? "text" : "password"}
              placeholder="Enter your password"
              value={form.password}
              onChange={(v) => update("password", v)}
              error={errors.password}
              rightEl={
                <button onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600 shrink-0 transition-colors">
                  {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />
          </div>

          <div className="mt-4 flex items-center justify-between">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded accent-blue-600" />
              <span className="text-xs font-semibold text-slate-500">Remember me</span>
            </label>
            <button className="text-xs font-bold text-blue-600 hover:underline">Forgot password?</button>
          </div>

          <button
            onClick={handleLogin}
            disabled={loading}
            className="mt-6 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={17} className="animate-spin" /> Signing in...</> : <>Sign In <ArrowRight size={17} /></>}
          </button>

          {/* Divider */}
          <div className="mt-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-slate-200" />
            <span className="text-xs font-bold text-slate-400">or</span>
            <div className="h-px flex-1 bg-slate-200" />
          </div>

          {/* Demo Login */}
          <div className="mt-5">
            <button
              onClick={() => setShowDemo(!showDemo)}
              className="w-full flex items-center justify-between rounded-2xl bg-slate-50 px-5 py-3.5 text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors ring-1 ring-slate-200"
            >
              <span>Demo Login (Testing)</span>
              <ChevronRight size={16} className={`transition-transform ${showDemo ? "rotate-90" : ""}`} />
            </button>
            {showDemo && (
              <div className="mt-3 grid gap-2 animate-fade-up">
                {[
                  { role: "candidate", label: "Login as Candidate", color: "bg-blue-50 text-blue-700 hover:bg-blue-100 ring-blue-100", icon: Users },
                  { role: "employer", label: "Login as Employer", color: "bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ring-emerald-100", icon: Building2 },
                  { role: "admin", label: "Login as Admin", color: "bg-slate-950 text-white hover:bg-blue-950 ring-slate-800", icon: ShieldCheck },
                ].map((d) => (
                  <button key={d.role} onClick={() => demoLogin(d.role)}
                    className={`flex items-center gap-3 rounded-2xl px-5 py-3.5 text-sm font-bold ring-1 transition-all btn-press ${d.color}`}>
                    <d.icon size={17} /> {d.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── REGISTER PAGE ────────────────────────────────────────────────
export function RegisterPage({ setRole, setPage, showToast }) {
  const [selectedRole, setSelectedRole] = useState("candidate");
  const [form, setForm] = useState({ name: "", email: "", phone: "", password: "", confirmPassword: "", terms: false });
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function update(field, val) {
    setForm((p) => ({ ...p, [field]: val }));
    if (errors[field]) setErrors((p) => ({ ...p, [field]: null }));
  }

  // Password strength
  const strength = (() => {
    const p = form.password;
    if (!p) return 0;
    let s = 0;
    if (p.length >= 6) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    return s;
  })();
  const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"];
  const strengthColor = ["", "bg-red-400", "bg-amber-400", "bg-blue-500", "bg-emerald-500"];

  async function handleRegister() {
    const errs = validate(form, true);
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setLoading(true);

    try {
      const res = await fetch(`${API}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: selectedRole,
        }),
      });
      const data = await res.json();

      if (!data.ok) {
        setErrors({ general: data.message || "Registration failed. Try again." });
        setLoading(false);
        return;
      }

      saveSession({ name: form.name.trim(), email: form.email, role: selectedRole, token: data.token });
      setSuccess(true);
      showToast?.(`Welcome to HireSetu, ${form.name.trim()}!`, "success");
      setTimeout(() => {
        setRole(selectedRole);
        if (selectedRole === "candidate") setPage("candidate");
        else setPage("employer");
      }, 1800);
    } catch (err) {
      setErrors({ general: "Backend offline — try demo login on sign in page." });
    }
    setLoading(false);
  }

  if (success) {
    return (
      <section className="min-h-[calc(100vh-76px)] bg-slate-50 flex items-center justify-center px-4">
        <div className="text-center animate-fade-up">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-emerald-500 to-teal-600 shadow-2xl shadow-emerald-500/30">
            <CheckCircle2 size={40} className="text-white" />
          </div>
          <h2 className="font-display text-3xl font-black text-slate-950">You're all set!</h2>
          <p className="mt-3 text-base font-semibold text-slate-500">Account created. Taking you to your dashboard...</p>
          <div className="mt-6 flex items-center justify-center gap-2">
            <Loader2 size={18} className="animate-spin text-blue-600" />
            <span className="text-sm font-bold text-blue-600">Redirecting...</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-[calc(100vh-76px)] bg-slate-50 px-4 py-10 sm:px-6">
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-[1fr_1.2fr] lg:items-stretch">
        <BrandPanel isRegister={true} />

        {/* Form Panel */}
        <div className="rounded-[2rem] bg-white p-7 shadow-2xl shadow-slate-950/8 ring-1 ring-slate-200 animate-fade-up">
          <div className="mb-6">
            <h2 className="font-display text-2xl font-black text-slate-950">Create your account</h2>
            <p className="mt-1.5 text-sm font-semibold text-slate-400">
              Already have one?{" "}
              <button onClick={() => setPage("login")} className="font-bold text-blue-600 hover:underline">Sign in</button>
            </p>
          </div>

          {/* Role Selector */}
          <div className="mb-5">
            <p className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">I am a</p>
            <div className="flex gap-3">
              <RoleTab role="Candidate" selected={selectedRole === "candidate"} onClick={() => setSelectedRole("candidate")} icon={Users} desc="Looking for jobs" />
              <RoleTab role="Employer" selected={selectedRole === "employer"} onClick={() => setSelectedRole("employer")} icon={Building2} desc="Hiring talent" />
            </div>
          </div>

          {/* General Error */}
          {errors.general && (
            <div className="mb-5 flex items-start gap-3 rounded-2xl bg-red-50 p-4 ring-1 ring-red-100">
              <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
              <p className="text-sm font-bold text-red-700">{errors.general}</p>
            </div>
          )}

          <div className="space-y-4">
            <FormField
              label="Full Name"
              icon={User}
              placeholder="Rahul Sharma"
              value={form.name}
              onChange={(v) => update("name", v)}
              error={errors.name}
            />

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <FormField
                label="Email Address"
                icon={Mail}
                type="email"
                placeholder="you@example.com"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
              />
              <FormField
                label="Mobile Number"
                icon={Phone}
                type="tel"
                placeholder="9876543210"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
              />
            </div>

            <div>
              <FormField
                label="Password"
                icon={Lock}
                type={showPass ? "text" : "password"}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={(v) => update("password", v)}
                error={errors.password}
                rightEl={
                  <button onClick={() => setShowPass(!showPass)} className="text-slate-400 hover:text-slate-600 shrink-0">
                    {showPass ? <EyeOff size={17} /> : <Eye size={17} />}
                  </button>
                }
              />
              {/* Password Strength */}
              {form.password && (
                <div className="mt-2 flex items-center gap-2">
                  <div className="flex flex-1 gap-1">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className={`h-1.5 flex-1 rounded-full transition-all ${i <= strength ? strengthColor[strength] : "bg-slate-200"}`} />
                    ))}
                  </div>
                  <span className={`text-xs font-bold ${strength >= 3 ? "text-emerald-600" : strength >= 2 ? "text-amber-600" : "text-red-500"}`}>
                    {strengthLabel[strength]}
                  </span>
                </div>
              )}
            </div>

            <FormField
              label="Confirm Password"
              icon={Lock}
              type={showConfirm ? "text" : "password"}
              placeholder="Repeat your password"
              value={form.confirmPassword}
              onChange={(v) => update("confirmPassword", v)}
              error={errors.confirmPassword}
              rightEl={
                <button onClick={() => setShowConfirm(!showConfirm)} className="text-slate-400 hover:text-slate-600 shrink-0">
                  {showConfirm ? <EyeOff size={17} /> : <Eye size={17} />}
                </button>
              }
            />
          </div>

          {/* Terms */}
          <div className="mt-4">
            <label className={`flex items-start gap-3 cursor-pointer rounded-2xl p-3.5 ring-1 transition-all ${errors.terms ? "bg-red-50 ring-red-200" : "bg-slate-50 ring-slate-200 hover:ring-blue-300"}`}>
              <input
                type="checkbox"
                checked={form.terms}
                onChange={(e) => update("terms", e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded accent-blue-600 shrink-0"
              />
              <span className="text-xs font-semibold text-slate-600 leading-5">
                I agree to HireSetu's{" "}
                <span className="text-blue-600 font-bold cursor-pointer hover:underline">Terms of Service</span>
                {" "}and{" "}
                <span className="text-blue-600 font-bold cursor-pointer hover:underline">Privacy Policy</span>.
                My data will be used for job matching.
              </span>
            </label>
            {errors.terms && <p className="mt-1.5 flex items-center gap-1.5 text-xs font-bold text-red-500"><AlertCircle size={12} /> {errors.terms}</p>}
          </div>

          <button
            onClick={handleRegister}
            disabled={loading}
            className="mt-5 w-full rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 py-4 font-bold text-white text-sm shadow-lg shadow-blue-600/25 hover:shadow-blue-600/40 transition-all disabled:opacity-60 btn-press flex items-center justify-center gap-2"
          >
            {loading ? <><Loader2 size={17} className="animate-spin" /> Creating account...</> : <>Create Account <ArrowRight size={17} /></>}
          </button>

          <p className="mt-4 text-center text-xs font-semibold text-slate-400">
            🔒 Your data is secure and never sold to third parties
          </p>
        </div>
      </div>
    </section>
  );
}

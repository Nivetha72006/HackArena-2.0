import { useState, useRef } from "react";
import {
  Home, FolderUp, Bot, Inbox, CheckCircle2, Brain, RotateCw, ShieldAlert,
  FileText, ClipboardCheck, Send, BarChart3, MessageSquare, UserCircle2,
  Settings, ChevronRight, ChevronLeft, ChevronDown, Upload, FileSpreadsheet,
  Mail, Image as ImageIcon, Search, Bell, TrendingUp, TrendingDown,
  AlertTriangle, Check, X, Clock, IndianRupee, Users, Activity, Download,
  Eye, Sparkles, ArrowRight, FileCheck2, FileX2, ShieldCheck, Building2,
  Wallet, SlidersHorizontal, Cpu, Menu, Filter, MoreHorizontal, Calendar,
  ThumbsUp, ThumbsDown, ScanLine, Layers
} from "lucide-react";
import {
  AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

/* ---------------------------------------------------------------- */
/*  MOCK DATA                                                        */
/* ---------------------------------------------------------------- */

const STAGES = [
  { key: "upload", label: "Upload", icon: FolderUp },
  { key: "intake", label: "Intake", icon: Inbox },
  { key: "validation", label: "Validation", icon: CheckCircle2 },
  { key: "reasoning", label: "Reasoning", icon: Brain },
  { key: "autoresolve", label: "Auto Resolve", icon: RotateCw },
  { key: "fraud", label: "Fraud Check", icon: ShieldAlert },
  { key: "invoice", label: "Generate", icon: FileText },
  { key: "approval", label: "Approval", icon: ClipboardCheck },
  { key: "dispatch", label: "Dispatch", icon: Send },
];

const NAV_ITEMS = [
  { type: "single", key: "dashboard", label: "Dashboard", icon: Home },
  { type: "single", key: "pipeline", label: "Upload Timesheet", icon: FolderUp, stage: 0 },
  {
    type: "group", label: "AI Agents", icon: Bot,
    children: [
      { label: "Intake Agent", icon: Inbox, stage: 1 },
      { label: "Validation Agent", icon: CheckCircle2, stage: 2 },
      { label: "Reasoning Agent", icon: Brain, stage: 3 },
      { label: "Auto Resolve Agent", icon: RotateCw, stage: 4 },
      { label: "Fraud Detection Agent", icon: ShieldAlert, stage: 5 },
      { label: "Invoice Generator Agent", icon: FileText, stage: 6 },
      { label: "Approval Agent", icon: ClipboardCheck, stage: 7 },
    ],
  },
  { type: "single", key: "pipeline", label: "Dispatch Center", icon: Send, stage: 8 },
  { type: "single", key: "analytics", label: "Analytics", icon: BarChart3 },
  { type: "single", key: "assistant", label: "AI Assistant", icon: MessageSquare },
  { type: "single", key: "portal", label: "Client Portal", icon: UserCircle2 },
  { type: "single", key: "admin", label: "Admin Settings", icon: Settings },
];

const STATS = [
  { label: "Today's Invoices", value: "128", delta: "+12%", up: true, icon: FileText, tone: "violet" },
  { label: "Pending", value: "34", delta: "-5%", up: false, icon: Clock, tone: "amber" },
  { label: "Revenue", value: "\u20B918.4L", delta: "+8.2%", up: true, icon: IndianRupee, tone: "emerald" },
  { label: "AI Accuracy", value: "96.8%", delta: "+0.6%", up: true, icon: Cpu, tone: "sky" },
  { label: "Fraud Alerts", value: "3", delta: "+2", up: false, icon: ShieldAlert, tone: "rose" },
];

const RECENT_ACTIVITY = [
  { time: "2 min ago", text: "Invoice INV-2031 cleared Fraud Detection", tone: "emerald", icon: ShieldCheck },
  { time: "9 min ago", text: "Auto Resolve fixed a missing punch-out time on TS-118", tone: "violet", icon: RotateCw },
  { time: "21 min ago", text: "Reasoning Agent flagged INV-2028 for manual approval", tone: "amber", icon: Brain },
  { time: "40 min ago", text: "Dispatch delivered 14 invoices to Client Portal", tone: "sky", icon: Send },
  { time: "1 hr ago", text: "Fraud Agent caught a duplicate claim on TS-104", tone: "rose", icon: AlertTriangle },
];

const REVENUE_TREND = [
  { day: "Mon", value: 2.1 }, { day: "Tue", value: 2.6 }, { day: "Wed", value: 2.3 },
  { day: "Thu", value: 3.1 }, { day: "Fri", value: 2.9 }, { day: "Sat", value: 1.8 },
  { day: "Sun", value: 2.4 },
];

const MONTHLY_TREND = [
  { month: "Jan", revenue: 14.2, fraud: 5 }, { month: "Feb", revenue: 15.8, fraud: 4 },
  { month: "Mar", revenue: 16.1, fraud: 6 }, { month: "Apr", revenue: 17.4, fraud: 3 },
  { month: "May", revenue: 18.4, fraud: 3 }, { month: "Jun", revenue: 19.2, fraud: 2 },
];

const PROCESSING_TIME = [
  { stage: "Intake", seconds: 4 }, { stage: "Validate", seconds: 7 },
  { stage: "Reason", seconds: 9 }, { stage: "Resolve", seconds: 5 },
  { stage: "Fraud", seconds: 6 }, { stage: "Invoice", seconds: 3 },
  { stage: "Approve", seconds: 11 }, { stage: "Dispatch", seconds: 2 },
];

const CLIENT_STATS = [
  { client: "Meridian Logistics", invoices: 412, revenue: "\u20B96.2L", accuracy: "97.4%" },
  { client: "Orbit Retail Group", invoices: 318, revenue: "\u20B94.8L", accuracy: "95.1%" },
  { client: "Northbridge Foods", invoices: 266, revenue: "\u20B93.6L", accuracy: "98.0%" },
  { client: "Solis Manufacturing", invoices: 204, revenue: "\u20B92.9L", accuracy: "94.6%" },
  { client: "Harbor & Co.", invoices: 151, revenue: "\u20B91.9L", accuracy: "96.9%" },
];

const TONE = {
  violet: { bg: "bg-violet-50", text: "text-violet-700", ring: "ring-violet-200", solid: "bg-violet-600", bar: "bg-violet-500" },
  emerald: { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200", solid: "bg-emerald-600", bar: "bg-emerald-500" },
  amber: { bg: "bg-amber-50", text: "text-amber-700", ring: "ring-amber-200", solid: "bg-amber-600", bar: "bg-amber-500" },
  rose: { bg: "bg-rose-50", text: "text-rose-700", ring: "ring-rose-200", solid: "bg-rose-600", bar: "bg-rose-500" },
  sky: { bg: "bg-sky-50", text: "text-sky-700", ring: "ring-sky-200", solid: "bg-sky-600", bar: "bg-sky-500" },
  slate: { bg: "bg-slate-100", text: "text-slate-700", ring: "ring-slate-200", solid: "bg-slate-600", bar: "bg-slate-500" },
};

/* ---------------------------------------------------------------- */
/*  SMALL HELPERS                                                    */
/* ---------------------------------------------------------------- */

function Eyebrow({ children }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-wider text-violet-600 mb-1">
      {children}
    </p>
  );
}

function Card({ children, className = "", ...rest }) {
  return (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm ${className}`} {...rest}>
      {children}
    </div>
  );
}

function Badge({ tone = "slate", children, icon: Icon }) {
  const t = TONE[tone] || TONE.slate;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${t.bg} ${t.text}`}>
      {Icon && <Icon className="w-3.5 h-3.5" />}
      {children}
    </span>
  );
}

function ProgressBar({ value, tone = "violet" }) {
  const t = TONE[tone] || TONE.violet;
  return (
    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
      <div
        className={`h-full rounded-full ${t.bar} transition-all duration-700 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );
}

function CircularScore({ value, label, tone = "violet" }) {
  const t = TONE[tone] || TONE.violet;
  const circumference = 2 * Math.PI * 34;
  const offset = circumference - (value / 100) * circumference;
  const strokeMap = {
    violet: "#7c3aed", emerald: "#059669", amber: "#d97706", rose: "#e11d48", sky: "#0284c7", slate: "#475569",
  };
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative w-24 h-24">
        <svg viewBox="0 0 80 80" className="w-24 h-24 -rotate-90">
          <circle cx="40" cy="40" r="34" fill="none" stroke="#f1f5f9" strokeWidth="8" />
          <circle
            cx="40" cy="40" r="34" fill="none" stroke={strokeMap[tone] || strokeMap.violet}
            strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference}
            strokeDashoffset={offset} className="transition-all duration-700 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xl font-bold text-slate-800">{value}%</span>
        </div>
      </div>
      {label && <span className="text-xs font-medium text-slate-500">{label}</span>}
    </div>
  );
}

function Field({ label, value, icon: Icon, tone }) {
  return (
    <div className="flex items-center justify-between py-2.5 border-b border-slate-100 last:border-0">
      <div className="flex items-center gap-2 text-sm text-slate-500">
        {Icon && <Icon className="w-4 h-4 text-slate-400" />}
        {label}
      </div>
      {tone ? <Badge tone={tone}>{value}</Badge> : <span className="text-sm font-semibold text-slate-800">{value}</span>}
    </div>
  );
}

function SectionHeading({ title, subtitle, icon: Icon, tone = "violet" }) {
  const t = TONE[tone] || TONE.violet;
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.bg}`}>
        <Icon className={`w-4 h-4 ${t.text}`} />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-slate-800">{title}</h3>
        {subtitle && <p className="text-xs text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  SIDEBAR + TOPBAR                                                 */
/* ---------------------------------------------------------------- */

function SidebarContent({ active, stage, onNavigate, onStage }) {
  const [agentsOpen, setAgentsOpen] = useState(true);
  return (
    <div className="flex flex-col h-full bg-slate-900 text-slate-300">
      <div className="flex items-center gap-2 px-5 h-16 border-b border-slate-800 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-violet-600 flex items-center justify-center">
          <Layers className="w-4 h-4 text-white" />
        </div>
        <span className="text-white font-semibold tracking-tight">InvoiceOS</span>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {NAV_ITEMS.map((item, idx) => {
          if (item.type === "single") {
            const isActive = active === item.key && (item.stage === undefined || (active === "pipeline" && stage === item.stage));
            return (
              <button
                key={item.label + idx}
                onClick={() => {
                  onNavigate(item.key);
                  if (item.stage !== undefined) onStage(item.stage);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive ? "bg-violet-600 text-white" : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            );
          }
          return (
            <div key={item.label}>
              <button
                onClick={() => setAgentsOpen((o) => !o)}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span className="flex items-center gap-3"><item.icon className="w-4 h-4" />{item.label}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${agentsOpen ? "rotate-180" : ""}`} />
              </button>
              {agentsOpen && (
                <div className="mt-1 ml-3 pl-3 border-l border-slate-800 space-y-1">
                  {item.children.map((child) => {
                    const isActive = active === "pipeline" && stage === child.stage;
                    return (
                      <button
                        key={child.label}
                        onClick={() => { onNavigate("pipeline"); onStage(child.stage); }}
                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                          isActive ? "bg-violet-600/20 text-violet-300" : "text-slate-400 hover:text-white hover:bg-slate-800"
                        }`}
                      >
                        <child.icon className="w-3.5 h-3.5" />
                        {child.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-3 px-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-sky-500 flex items-center justify-center text-white text-xs font-semibold">NM</div>
          <div className="min-w-0">
            <p className="text-sm font-medium text-white truncate">Nivi Mehra</p>
            <p className="text-xs text-slate-500 truncate">Ops Administrator</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Topbar({ title, onMenu }) {
  return (
    <div className="h-16 shrink-0 border-b border-slate-200 bg-white flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button onClick={onMenu} className="md:hidden p-2 rounded-lg hover:bg-slate-100">
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <h1 className="text-lg font-semibold text-slate-800">{title}</h1>
      </div>
      <div className="flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 bg-slate-100 rounded-xl px-3 py-2 w-56">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            placeholder="Search invoices, clients..."
            className="bg-transparent text-sm outline-none w-full placeholder:text-slate-400"
          />
        </div>
        <button className="relative p-2 rounded-xl hover:bg-slate-100">
          <Bell className="w-5 h-5 text-slate-500" />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-rose-500" />
        </button>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  DASHBOARD                                                         */
/* ---------------------------------------------------------------- */

function Dashboard({ onNavigate, onStage }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {STATS.map((s) => {
          const t = TONE[s.tone];
          return (
            <Card key={s.label} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${t.bg}`}>
                  <s.icon className={`w-4 h-4 ${t.text}`} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${s.up ? "text-emerald-600" : "text-rose-500"}`}>
                  {s.up ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                  {s.delta}
                </span>
              </div>
              <p className="text-2xl font-bold text-slate-800">{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <Eyebrow>This week</Eyebrow>
              <h3 className="text-base font-semibold text-slate-800">Revenue processed</h3>
            </div>
            <Badge tone="emerald" icon={TrendingUp}>+8.2% vs last week</Badge>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={REVENUE_TREND}>
              <defs>
                <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`\u20B9${v}L`, "Revenue"]} />
              <Area type="monotone" dataKey="value" stroke="#7c3aed" strokeWidth={2.5} fill="url(#rev)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <Eyebrow>Live</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">AI accuracy</h3>
          <div className="flex justify-center">
            <CircularScore value={96.8} label="across all agents" tone="sky" />
          </div>
          <div className="mt-5 space-y-2">
            <div className="flex justify-between text-xs text-slate-500"><span>Validation Agent</span><span className="font-semibold text-slate-700">98.1%</span></div>
            <ProgressBar value={98.1} tone="sky" />
            <div className="flex justify-between text-xs text-slate-500 mt-2"><span>Fraud Agent</span><span className="font-semibold text-slate-700">95.4%</span></div>
            <ProgressBar value={95.4} tone="sky" />
          </div>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-5">
        <Card className="p-5 lg:col-span-2">
          <Eyebrow>Activity feed</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">Recent activity</h3>
          <div className="space-y-4">
            {RECENT_ACTIVITY.map((a, i) => {
              const t = TONE[a.tone];
              return (
                <div key={i} className="flex items-start gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${t.bg}`}>
                    <a.icon className={`w-4 h-4 ${t.text}`} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-slate-700">{a.text}</p>
                    <p className="text-xs text-slate-400">{a.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        <Card className="p-5">
          <Eyebrow>Shortcuts</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">Quick actions</h3>
          <div className="space-y-2.5">
            {[
              { label: "Upload new document", icon: FolderUp, action: () => { onNavigate("pipeline"); onStage(0); } },
              { label: "Review pending approvals", icon: ClipboardCheck, action: () => { onNavigate("pipeline"); onStage(7); } },
              { label: "Open fraud queue", icon: ShieldAlert, action: () => { onNavigate("pipeline"); onStage(5); } },
              { label: "View analytics", icon: BarChart3, action: () => onNavigate("analytics") },
            ].map((q) => (
              <button
                key={q.label}
                onClick={q.action}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl border border-slate-200 hover:border-violet-300 hover:bg-violet-50 transition-colors group"
              >
                <span className="flex items-center gap-2.5 text-sm font-medium text-slate-700">
                  <q.icon className="w-4 h-4 text-slate-400 group-hover:text-violet-600" />
                  {q.label}
                </span>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-violet-600 group-hover:translate-x-0.5 transition-all" />
              </button>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  PIPELINE (the grand finale)                                      */
/* ---------------------------------------------------------------- */

function Stepper({ stage, onStage }) {
  return (
    <div className="overflow-x-auto pb-1">
      <div className="flex items-center min-w-max px-1">
        {STAGES.map((s, i) => {
          const done = i < stage;
          const current = i === stage;
          return (
            <div key={s.key} className="flex items-center">
              <button onClick={() => onStage(i)} className="flex flex-col items-center gap-1.5 group">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    current ? "border-violet-600 bg-violet-600 text-white shadow-lg shadow-violet-200" :
                    done ? "border-emerald-500 bg-emerald-500 text-white" :
                    "border-slate-200 bg-white text-slate-400 group-hover:border-violet-300"
                  }`}
                >
                  {done ? <Check className="w-4 h-4" /> : <s.icon className="w-4 h-4" />}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${current ? "text-violet-700" : done ? "text-emerald-600" : "text-slate-400"}`}>
                  {s.label}
                </span>
              </button>
              {i < STAGES.length - 1 && (
                <div className={`w-8 sm:w-12 h-0.5 mx-1 mb-5 rounded-full transition-colors ${i < stage ? "bg-emerald-400" : "bg-slate-200"}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function StageFooter({ stage, onStage }) {
  return (
    <div className="flex items-center justify-between mt-6 pt-5 border-t border-slate-100">
      <button
        onClick={() => onStage(Math.max(0, stage - 1))}
        disabled={stage === 0}
        className="flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-800 disabled:opacity-0 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" /> Back
      </button>
      <span className="text-xs text-slate-400">Step {stage + 1} of {STAGES.length}</span>
      <button
        onClick={() => onStage(Math.min(STAGES.length - 1, stage + 1))}
        disabled={stage === STAGES.length - 1}
        className="flex items-center gap-1.5 text-sm font-semibold text-white bg-violet-600 hover:bg-violet-700 px-4 py-2 rounded-xl disabled:opacity-0 transition-colors"
      >
        Next <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

const FILE_TYPES = [
  { label: "PDF", icon: FileText, accept: ".pdf,application/pdf" },
  { label: "Image", icon: ImageIcon, accept: "image/*" },
  { label: "Excel", icon: FileSpreadsheet, accept: ".xlsx,.xls,.csv" },
  { label: "Email", icon: Mail, accept: ".eml,.msg" },
];

const KIND_ICON = { image: ImageIcon, pdf: FileText, spreadsheet: FileSpreadsheet, email: Mail, other: FileText };

function detectKind(file) {
  const name = (file.name || "").toLowerCase();
  if ((file.type || "").startsWith("image/")) return "image";
  if (file.type === "application/pdf" || name.endsWith(".pdf")) return "pdf";
  if (name.endsWith(".xlsx") || name.endsWith(".xls") || name.endsWith(".csv") || (file.type || "").includes("sheet")) return "spreadsheet";
  if (name.endsWith(".eml") || name.endsWith(".msg")) return "email";
  return "other";
}

function formatSize(bytes) {
  if (!bytes) return "sample file";
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function UploadStage({ onStage, uploadedFile, setUploadedFile }) {
  const inputRef = useRef(null);
  const [dragOver, setDragOver] = useState(false);

  function handleFile(file) {
    if (!file) return;
    const previewUrl = file.type?.startsWith("image/") ? URL.createObjectURL(file) : null;
    setUploadedFile({ name: file.name, size: file.size, type: file.type, kind: detectKind(file), previewUrl });
  }

  function openPicker(accept) {
    if (inputRef.current) {
      inputRef.current.setAttribute("accept", accept);
      inputRef.current.click();
    }
  }

  return (
    <div>
      <SectionHeading title="Document intake" subtitle="Drop a timesheet to start the pipeline" icon={FolderUp} />

      <div
        onClick={() => openPicker(".pdf,.png,.jpg,.jpeg,.xlsx,.xls,.csv,.eml,.msg")}
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files?.[0]); }}
        className={`border-2 border-dashed rounded-2xl py-10 flex flex-col items-center justify-center text-center cursor-pointer transition-colors ${
          dragOver ? "border-violet-500 bg-violet-50" : "border-slate-200 hover:border-violet-300 hover:bg-violet-50/30"
        }`}
      >
        <Upload className="w-8 h-8 text-violet-400 mb-3" />
        <p className="text-sm font-medium text-slate-700">Drag and drop a file here</p>
        <p className="text-xs text-slate-400 mt-1">or click to browse from your computer</p>
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => { handleFile(e.target.files?.[0]); e.target.value = ""; }}
        />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-5">
        {FILE_TYPES.map((f) => (
          <button
            key={f.label}
            onClick={() => openPicker(f.accept)}
            className="flex items-center gap-2 justify-center px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 hover:border-violet-300 hover:bg-violet-50 hover:text-violet-700 text-sm font-medium transition-colors"
          >
            <f.icon className="w-4 h-4" /> Upload {f.label}
          </button>
        ))}
      </div>

      {uploadedFile ? (
        <div className="mt-5 flex items-center justify-between bg-slate-50 rounded-xl p-3.5 border border-slate-100">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
              {uploadedFile.kind === "image" && uploadedFile.previewUrl ? (
                <img src={uploadedFile.previewUrl} alt={uploadedFile.name} className="w-full h-full object-cover" />
              ) : (
                (() => { const K = KIND_ICON[uploadedFile.kind] || FileText; return <K className="w-4 h-4 text-violet-600" />; })()
              )}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-medium text-slate-700 truncate">{uploadedFile.name}</p>
              <p className="text-xs text-slate-400">{formatSize(uploadedFile.size)} &middot; ready to submit</p>
            </div>
          </div>
          <button onClick={() => setUploadedFile(null)} className="text-xs font-medium text-slate-400 hover:text-rose-500 shrink-0 ml-3">
            Remove
          </button>
        </div>
      ) : (
        <div className="mt-5 flex items-center justify-between bg-slate-50 rounded-xl p-3.5 border border-dashed border-slate-200">
          <p className="text-xs text-slate-400">No file selected yet</p>
          <button
            onClick={() => setUploadedFile({ name: "timesheet_may_sample.xlsx", size: 0, type: "", kind: "spreadsheet", previewUrl: null })}
            className="text-xs font-medium text-violet-600 hover:text-violet-800"
          >
            Use a sample file instead
          </button>
        </div>
      )}

      <button
        onClick={() => uploadedFile && onStage(1)}
        disabled={!uploadedFile}
        className={`w-full mt-5 flex items-center justify-center gap-2 text-sm font-semibold py-3 rounded-xl transition-colors ${
          uploadedFile ? "bg-violet-600 hover:bg-violet-700 text-white" : "bg-slate-100 text-slate-400 cursor-not-allowed"
        }`}
      >
        Submit to Intake Agent <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function IntakeStage({ uploadedFile, onStage }) {
  return (
    <div>
      <SectionHeading title="Intake Agent" subtitle="Reads, classifies, and structures the raw document" icon={Inbox} />

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100 mb-4">
        <p className="text-xs font-semibold text-slate-500 mb-2">Original document</p>
        {uploadedFile ? (
          <div className="bg-white rounded-lg border border-slate-200 h-48 flex items-center justify-center overflow-hidden">
            {uploadedFile.kind === "image" && uploadedFile.previewUrl ? (
              <img src={uploadedFile.previewUrl} alt={uploadedFile.name} className="max-h-full max-w-full object-contain" />
            ) : (
              <div className="flex flex-col items-center gap-2 text-slate-400">
                {(() => { const K = KIND_ICON[uploadedFile.kind] || FileText; return <K className="w-9 h-9" />; })()}
                <span className="text-xs font-medium text-slate-500">{uploadedFile.name}</span>
                <span className="text-xs text-slate-300">{formatSize(uploadedFile.size)}</span>
              </div>
            )}
          </div>
        ) : (
          <div className="bg-white rounded-lg border border-dashed border-slate-200 h-40 flex flex-col items-center justify-center gap-2 text-center px-4">
            <ScanLine className="w-6 h-6 text-slate-300" />
            <p className="text-xs text-slate-400">No document yet &mdash; upload one in the Upload step first.</p>
            <button onClick={() => onStage(0)} className="text-xs font-medium text-violet-600 hover:text-violet-800">Go to Upload</button>
          </div>
        )}
      </div>

      <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
        <p className="text-xs font-semibold text-slate-500 mb-2">OCR result</p>
        <div className="bg-white rounded-lg border border-slate-200 p-3 text-xs font-mono text-slate-600 leading-relaxed">
          Employee: Rohan Mehta<br />ID: EMP-2287<br />Period: 01 May - 31 May 2026<br />
          Days worked: 22<br />Overtime hrs: 6<br />Leave: 1 (casual)
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mt-4">
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 mb-3">Classification</p>
          <div className="flex flex-wrap gap-2">
            <Badge tone="violet" icon={FileText}>Monthly Timesheet</Badge>
            <Badge tone="sky">Department: Logistics</Badge>
            <Badge tone="slate">Source: Email</Badge>
          </div>
          <p className="text-xs font-semibold text-slate-500 mt-4 mb-2">Confidence score</p>
          <div className="flex items-center gap-3">
            <ProgressBar value={94} tone="violet" />
            <span className="text-sm font-semibold text-slate-700">94%</span>
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xs font-semibold text-slate-500 mb-2">JSON output</p>
          <pre className="bg-slate-900 text-emerald-300 text-xs rounded-lg p-3 overflow-x-auto leading-relaxed">{`{
  "employee": "Rohan Mehta",
  "employee_id": "EMP-2287",
  "period": "2026-05",
  "days_worked": 22,
  "overtime_hrs": 6,
  "leave_days": 1
}`}</pre>
        </Card>
      </div>
    </div>
  );
}

function ValidationStage() {
  return (
    <div>
      <SectionHeading title="Validation Agent" subtitle="Cross-checks the record against payroll and policy" icon={CheckCircle2} tone="emerald" />
      <Card className="p-4">
        <Field label="Employee found" value="Matched" tone="emerald" icon={Users} />
        <Field label="Payroll match" value="Matched" tone="emerald" icon={Wallet} />
        <Field label="Business rules" value="3/3 passed" tone="emerald" icon={ClipboardCheck} />
        <Field label="GST" value="18% applied" tone="slate" icon={Building2} />
        <Field label="Working days" value="22 of 22" tone="emerald" icon={Calendar} />
        <Field label="Leave" value="1 day (approved)" tone="slate" icon={Clock} />
      </Card>
      <div className="mt-4 flex items-center justify-between bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3.5">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="w-5 h-5 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-700">Validation result: Passed</span>
        </div>
        <span className="text-xs text-emerald-600">All checks cleared automatically</span>
      </div>
    </div>
  );
}

function ReasoningStage() {
  const [tab, setTab] = useState("approved");
  return (
    <div>
      <SectionHeading title="Reasoning Agent" subtitle="Explains the decision in plain language" icon={Brain} tone="sky" />
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 sm:col-span-2">
          <p className="text-xs font-semibold text-slate-500 mb-1.5">Executive summary</p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Rohan's May timesheet matches payroll records exactly, all 22 working days are accounted
            for, and the single leave day was pre-approved. No anomalies were found against the last
            6 months of history.
          </p>
        </Card>
        <Card className="p-4 flex flex-col items-center justify-center">
          <CircularScore value={92} label="Trust score" tone="sky" />
        </Card>
      </div>

      <Card className="p-4">
        <div className="flex gap-2 mb-3">
          <button onClick={() => setTab("approved")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tab === "approved" ? "bg-emerald-600 text-white" : "bg-slate-100 text-slate-500"}`}>Why approved</button>
          <button onClick={() => setTab("rejected")} className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${tab === "rejected" ? "bg-rose-600 text-white" : "bg-slate-100 text-slate-500"}`}>Why it could be rejected</button>
        </div>
        {tab === "approved" ? (
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />Working days match the payroll calendar exactly</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />Leave was logged and pre-approved by the manager</li>
            <li className="flex gap-2"><Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />No overlap with duplicate submissions this period</li>
          </ul>
        ) : (
          <ul className="space-y-2 text-sm text-slate-600">
            <li className="flex gap-2"><X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />Overtime hours would need a manager note if they exceeded 8</li>
            <li className="flex gap-2"><X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />A mismatch with biometric logs would trigger a hold</li>
          </ul>
        )}
      </Card>

      <Card className="p-4 mt-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Historical comparison (trust score, last 6 cycles)</p>
        <ResponsiveContainer width="100%" height={120}>
          <LineChart data={[{ m: "Dec", v: 88 }, { m: "Jan", v: 90 }, { m: "Feb", v: 89 }, { m: "Mar", v: 93 }, { m: "Apr", v: 91 }, { m: "May", v: 92 }]}>
            <XAxis dataKey="m" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis hide domain={[80, 100]} />
            <Tooltip />
            <Line type="monotone" dataKey="v" stroke="#0284c7" strokeWidth={2.5} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function AutoResolveStage() {
  const [fixed, setFixed] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [escalated, setEscalated] = useState(false);
  const locked = fixed || escalated;

  function handleRetry() {
    setRetrying(true);
    setTimeout(() => {
      setRetrying(false);
      setRetryCount((c) => c + 1);
    }, 900);
  }

  return (
    <div>
      <SectionHeading title="Auto Resolve Agent" subtitle="Catches small problems before they reach a human" icon={RotateCw} tone="amber" />
      <Card className="p-4 mb-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Detected problems</p>
        <div className="flex items-start gap-2.5 text-sm text-slate-700 bg-amber-50 border border-amber-100 rounded-lg p-3">
          <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          Punch-out time missing for 22 May &mdash; likely a forgotten badge swap.
        </div>
      </Card>
      <Card className="p-4 mb-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Suggested fix</p>
        <p className="text-sm text-slate-600">
          Infer punch-out from the standard 9-hour shift pattern observed across the last 30 days, and
          flag the entry as system-estimated.
        </p>
      </Card>
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={() => setFixed(true)}
          disabled={locked}
          className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          <Sparkles className="w-4 h-4" /> Auto fix
        </button>
        <button
          onClick={handleRetry}
          disabled={locked || retrying}
          className="flex items-center justify-center gap-1.5 border border-slate-200 text-slate-600 hover:bg-slate-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          <RotateCw className={`w-4 h-4 ${retrying ? "animate-spin" : ""}`} /> {retrying ? "Retrying" : "Retry"}
        </button>
        <button
          onClick={() => setEscalated(true)}
          disabled={locked}
          className="flex items-center justify-center gap-1.5 border border-slate-200 text-rose-600 hover:bg-rose-50 disabled:opacity-40 disabled:cursor-not-allowed text-sm font-semibold py-2.5 rounded-xl transition-colors"
        >
          <AlertTriangle className="w-4 h-4" /> Escalate
        </button>
      </div>
      {retryCount > 0 && !locked && (
        <div className="mt-4 flex items-center gap-2.5 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-sm font-medium text-sky-700">
          <RotateCw className="w-4 h-4" /> Retry #{retryCount}: detection re-ran, the same issue was found again. Auto Fix is recommended.
        </div>
      )}
      {fixed && (
        <div className="mt-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm font-medium text-emerald-700">
          <Check className="w-4 h-4" /> Fixed automatically &mdash; punch-out estimated at 6:42 PM
        </div>
      )}
      {escalated && (
        <div className="mt-4 flex items-center gap-2.5 bg-rose-50 border border-rose-100 rounded-xl px-4 py-3 text-sm font-medium text-rose-700">
          <AlertTriangle className="w-4 h-4" /> Escalated to a manager &mdash; ticket #ESC-4471 created, Priya Nair notified.
        </div>
      )}
    </div>
  );
}

function FraudStage() {
  return (
    <div>
      <SectionHeading title="Fraud Detection Agent" subtitle="Screens for patterns that look like abuse" icon={ShieldAlert} tone="rose" />
      <div className="grid sm:grid-cols-3 gap-4 mb-4">
        <Card className="p-4 flex flex-col items-center justify-center">
          <CircularScore value={12} label="Fraud risk" tone="emerald" />
        </Card>
        <Card className="p-4 sm:col-span-2">
          <Field label="Duplicate claims" value="None found" tone="emerald" icon={FileCheck2} />
          <Field label="Impossible hours" value="None found" tone="emerald" icon={Clock} />
          <Field label="Ghost employee check" value="Verified active" tone="emerald" icon={Users} />
        </Card>
      </div>
      <Card className="p-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Risk graph &mdash; flagged invoices per month</p>
        <ResponsiveContainer width="100%" height={140}>
          <BarChart data={MONTHLY_TREND}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip />
            <Bar dataKey="fraud" radius={[6, 6, 0, 0]} fill="#e11d48" />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}

function InvoiceStage() {
  const [format, setFormat] = useState("PDF");
  return (
    <div>
      <SectionHeading title="Invoice Generator Agent" subtitle="Builds the final invoice in any format you need" icon={FileText} />
      <Card className="p-5 mb-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm font-semibold text-slate-800">INV-2031</p>
            <p className="text-xs text-slate-400">Meridian Logistics &middot; May 2026</p>
          </div>
          <Badge tone="violet">Draft</Badge>
        </div>
        <div className="space-y-1.5 text-sm">
          <div className="flex justify-between text-slate-500"><span>Base pay</span><span className="text-slate-700 font-medium">&#8377;48,200</span></div>
          <div className="flex justify-between text-slate-500"><span>Overtime (6 hrs)</span><span className="text-slate-700 font-medium">&#8377;3,600</span></div>
          <div className="flex justify-between text-slate-500"><span>GST (18%)</span><span className="text-slate-700 font-medium">&#8377;9,324</span></div>
          <div className="flex justify-between pt-2 border-t border-slate-100 font-semibold text-slate-800"><span>Total</span><span>&#8377;61,124</span></div>
        </div>
      </Card>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: "PDF", icon: FileText }, { label: "Excel", icon: FileSpreadsheet },
          { label: "Email Draft", icon: Mail }, { label: "ERP Format", icon: Layers },
        ].map((f) => (
          <button
            key={f.label}
            onClick={() => setFormat(f.label)}
            className={`flex items-center gap-2 justify-center px-3 py-2.5 rounded-xl border text-sm font-medium transition-colors ${
              format === f.label ? "border-violet-600 bg-violet-50 text-violet-700" : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            <f.icon className="w-4 h-4" /> {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function ApprovalStage() {
  const [comment, setComment] = useState("");
  const [decision, setDecision] = useState(null);
  return (
    <div>
      <SectionHeading title="Approval Agent" subtitle="Final human-in-the-loop sign-off" icon={ClipboardCheck} />
      <Card className="p-4 mb-4">
        <p className="text-xs font-semibold text-slate-500 mb-2">Comments</p>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a note for the record (optional)"
          rows={3}
          className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-violet-400 resize-none"
        />
        <div className="grid grid-cols-2 gap-3 mt-3">
          <button onClick={() => setDecision("approved")} className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-semibold py-2.5 rounded-xl">
            <ThumbsUp className="w-4 h-4" /> Approve
          </button>
          <button onClick={() => setDecision("rejected")} className="flex items-center justify-center gap-1.5 border border-rose-200 text-rose-600 hover:bg-rose-50 text-sm font-semibold py-2.5 rounded-xl">
            <ThumbsDown className="w-4 h-4" /> Reject
          </button>
        </div>
        {decision && (
          <div className={`mt-3 text-sm font-medium px-3 py-2.5 rounded-xl ${decision === "approved" ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
            Invoice marked as {decision} {comment && `\u2014 "${comment}"`}
          </div>
        )}
      </Card>
      <Card className="p-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Approval timeline</p>
        <div className="space-y-4">
          {[
            { label: "Submitted by Reasoning Agent", time: "Today, 9:02 AM", tone: "violet" },
            { label: "Auto-cleared by Validation Agent", time: "Today, 9:03 AM", tone: "emerald" },
            { label: "Awaiting manager review", time: "Today, 9:05 AM", tone: "amber" },
          ].map((t, i) => {
            const tone = TONE[t.tone];
            return (
              <div key={i} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className={`w-2.5 h-2.5 rounded-full ${tone.solid}`} />
                  {i < 2 && <div className="w-px flex-1 bg-slate-200 mt-1" />}
                </div>
                <div className="pb-1">
                  <p className="text-sm text-slate-700">{t.label}</p>
                  <p className="text-xs text-slate-400">{t.time}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

function DispatchStage() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentTime, setSentTime] = useState(null);
  const [portalSent, setPortalSent] = useState(false);

  function handleSendEmail() {
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setSentTime(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    }, 1100);
  }

  return (
    <div>
      <SectionHeading title="Dispatch Center" subtitle="Delivers the finished invoice to its destination" icon={Send} />
      <div className="grid sm:grid-cols-2 gap-3 mb-4">
        <button
          onClick={handleSendEmail}
          disabled={sending || sent}
          className="flex items-center justify-center gap-2 bg-violet-600 hover:bg-violet-700 disabled:opacity-60 text-white text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          <Mail className={`w-4 h-4 ${sending ? "animate-pulse" : ""}`} /> {sending ? "Sending..." : sent ? "Email sent" : "Send email"}
        </button>
        <button
          onClick={() => setPortalSent(true)}
          disabled={portalSent}
          className="flex items-center justify-center gap-2 border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-60 text-sm font-semibold py-3 rounded-xl transition-colors"
        >
          <UserCircle2 className="w-4 h-4" /> {portalSent ? "Posted to portal" : "Portal delivery"}
        </button>
      </div>

      {sent && (
        <div className="mb-4 flex items-center gap-2.5 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 text-sm font-medium text-emerald-700">
          <Check className="w-4 h-4" /> Sent to rohan.mehta@meridianlogistics.com at {sentTime}
        </div>
      )}

      <Card className="p-4">
        <p className="text-xs font-semibold text-slate-500 mb-3">Delivery status</p>
        <Field label="Delivered" value={sent ? sentTime : "Not sent yet"} tone={sent ? "emerald" : "slate"} icon={Check} />
        <Field label="Opened" value={sent ? "Just now" : "\u2014"} tone={sent ? "sky" : "slate"} icon={Eye} />
        <Field label="Approved by client" value="Pending" tone="amber" icon={Clock} />
      </Card>

      <p className="text-xs text-slate-400 mt-3 leading-relaxed">
        This preview simulates delivery so you can demo the flow. A real send needs a backend with
        mail credentials &mdash; see the Nodemailer service in the downloadable project.
      </p>
    </div>
  );
}

function Pipeline({ stage, onStage, uploadedFile, setUploadedFile }) {
  const renderers = [UploadStage, IntakeStage, ValidationStage, ReasoningStage, AutoResolveStage, FraudStage, InvoiceStage, ApprovalStage, DispatchStage];
  const Active = renderers[stage];
  return (
    <div className="space-y-5">
      <Card className="p-4 sm:p-5">
        <Stepper stage={stage} onStage={onStage} />
      </Card>
      <Card className="p-5 sm:p-6">
        <Active
  onStage={onStage}
  uploadedFile={uploadedFile}
  setUploadedFile={setUploadedFile}
/>
        <StageFooter stage={stage} onStage={onStage} />
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  ANALYTICS                                                         */
/* ---------------------------------------------------------------- */

function Analytics() {
  return (
    <div className="space-y-5">
      <div className="grid lg:grid-cols-2 gap-5">
        <Card className="p-5">
          <Eyebrow>Trend</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">Revenue (6 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={MONTHLY_TREND}>
              <defs>
                <linearGradient id="rev2" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7c3aed" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#7c3aed" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip formatter={(v) => [`\u20B9${v}L`, "Revenue"]} />
              <Area type="monotone" dataKey="revenue" stroke="#7c3aed" strokeWidth={2.5} fill="url(#rev2)" />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <Eyebrow>Per agent</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">Processing time (seconds)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PROCESSING_TIME}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="stage" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Bar dataKey="seconds" radius={[6, 6, 0, 0]} fill="#0284c7" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5">
          <Eyebrow>Risk</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">Fraud flags (6 months)</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={MONTHLY_TREND}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
              <Tooltip />
              <Line type="monotone" dataKey="fraud" stroke="#e11d48" strokeWidth={2.5} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-5 flex flex-col items-center justify-center">
          <Eyebrow>Overall</Eyebrow>
          <h3 className="text-base font-semibold text-slate-800 mb-4">AI accuracy</h3>
          <CircularScore value={96.8} label="weighted across agents" tone="violet" />
        </Card>
      </div>

      <Card className="p-5">
        <Eyebrow>Top accounts</Eyebrow>
        <h3 className="text-base font-semibold text-slate-800 mb-4">Client statistics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-xs text-slate-400 border-b border-slate-100">
                <th className="py-2 font-medium">Client</th>
                <th className="py-2 font-medium">Invoices</th>
                <th className="py-2 font-medium">Revenue</th>
                <th className="py-2 font-medium">Avg. accuracy</th>
              </tr>
            </thead>
            <tbody>
              {CLIENT_STATS.map((c) => (
                <tr key={c.client} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 font-medium text-slate-700">{c.client}</td>
                  <td className="py-3 text-slate-500">{c.invoices}</td>
                  <td className="py-3 text-slate-500">{c.revenue}</td>
                  <td className="py-3"><Badge tone="emerald">{c.accuracy}</Badge></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  AI ASSISTANT                                                      */
/* ---------------------------------------------------------------- */

function reply(prompt) {
  const p = prompt.toLowerCase();
  if (p.includes("fraud")) return "I checked the Fraud Agent logs: 3 invoices are flagged this week, all duplicate-claim suspicions on the Logistics account. Risk scores are between 60-74%.";
  if (p.includes("summar")) return "Across this week: 128 invoices processed, 96.8% AI accuracy, revenue of \u20B918.4L, and 3 open fraud alerts awaiting review.";
  if (p.includes("compare")) return "May vs April: revenue is up 5.7% (\u20B918.4L vs \u20B917.4L), and fraud flags dropped from 3 to 2 month-over-month.";
  if (p.includes("explain")) return "INV-2031 was approved because working days matched payroll exactly and the one leave day was pre-approved \u2014 trust score 92%.";
  return "I can pull that from the pipeline data \u2014 try asking me to explain an invoice, show fraud activity, or compare two months.";
}

function Assistant() {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi, I am the InvoiceOS assistant. Ask me about any invoice, fraud case, or monthly trend." },
  ]);
  const [input, setInput] = useState("");

  function send(text) {
    const t = text ?? input;
    if (!t.trim()) return;
    setMessages((m) => [...m, { from: "user", text: t }, { from: "bot", text: reply(t) }]);
    setInput("");
  }

  const quick = [
    { label: "Explain invoice", icon: FileText, q: "Explain why INV-2031 was approved" },
    { label: "Show fraud", icon: ShieldAlert, q: "Show me this week's fraud activity" },
    { label: "Generate summary", icon: Sparkles, q: "Give me a summary of this week" },
    { label: "Compare months", icon: BarChart3, q: "Compare this month to last month" },
  ];

  return (
    <Card className="p-0 overflow-hidden flex flex-col" style={{ height: "70vh", minHeight: "28rem" }}>
      <div className="px-5 py-4 border-b border-slate-100 flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-lg bg-violet-100 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-violet-600" />
        </div>
        <div>
          <p className="text-sm font-semibold text-slate-800">AI Assistant</p>
          <p className="text-xs text-slate-400">Grounded in your live pipeline data</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.from === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-sm rounded-2xl px-4 py-2.5 text-sm ${m.from === "user" ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-700"}`}>
              {m.text}
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pt-1 pb-3 flex gap-2 overflow-x-auto">
        {quick.map((q) => (
          <button
            key={q.label}
            onClick={() => send(q.q)}
            className="flex items-center gap-1.5 whitespace-nowrap text-xs font-medium border border-slate-200 hover:border-violet-300 hover:bg-violet-50 text-slate-600 px-3 py-1.5 rounded-full transition-colors"
          >
            <q.icon className="w-3.5 h-3.5" /> {q.label}
          </button>
        ))}
      </div>

      <div className="p-4 border-t border-slate-100 flex items-center gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && send()}
          placeholder="Ask anything about your invoices..."
          className="flex-1 text-sm bg-slate-50 rounded-xl px-4 py-2.5 outline-none focus:ring-2 focus:ring-violet-200"
        />
        <button onClick={() => send()} className="bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-xl">
          <Send className="w-4 h-4" />
        </button>
      </div>
    </Card>
  );
}

/* ---------------------------------------------------------------- */
/*  CLIENT PORTAL                                                     */
/* ---------------------------------------------------------------- */

function ClientPortal() {
  const [open, setOpen] = useState("Track Invoice");
  const actions = [
    { label: "Upload Timesheet", icon: FolderUp, body: "Drop this month's timesheet and the Intake Agent will pick it up within seconds." },
    { label: "Track Invoice", icon: Eye, body: "INV-2031 is currently in Approval &mdash; awaiting manager sign-off, expected by end of day." },
    { label: "Approve Invoice", icon: ClipboardCheck, body: "You have 2 invoices awaiting your approval: INV-2031 and INV-2028." },
    { label: "Raise Query", icon: MessageSquare, body: "Describe the issue and it will route straight to the Reasoning Agent for an explanation." },
    { label: "Download Invoice", icon: Download, body: "Export the latest cleared invoice as PDF, Excel, or your ERP's native format." },
  ];
  const active = actions.find((a) => a.label === open);
  return (
    <div className="space-y-5">
      <div className="grid sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((a) => (
          <button
            key={a.label}
            onClick={() => setOpen(a.label)}
            className={`flex flex-col items-center gap-2 p-4 rounded-2xl border text-center transition-colors ${
              open === a.label ? "border-violet-600 bg-violet-50" : "border-slate-200 hover:border-violet-200"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${open === a.label ? "bg-violet-600" : "bg-slate-100"}`}>
              <a.icon className={`w-5 h-5 ${open === a.label ? "text-white" : "text-slate-500"}`} />
            </div>
            <span className="text-xs font-medium text-slate-700">{a.label}</span>
          </button>
        ))}
      </div>
      {active && (
        <Card className="p-5">
          <SectionHeading title={active.label} icon={active.icon} />
          <p className="text-sm text-slate-600" dangerouslySetInnerHTML={{ __html: active.body }} />
        </Card>
      )}
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  ADMIN                                                             */
/* ---------------------------------------------------------------- */

function Admin() {
  const tabs = ["Clients", "Employees", "Payroll", "Business Rules", "Prompt Settings", "LLM Settings"];
  const [tab, setTab] = useState("Clients");

  return (
    <div className="space-y-5">
      <div className="flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              tab === t ? "bg-slate-900 text-white" : "bg-white border border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <Card className="p-5">
        {tab === "Clients" && (
          <div className="space-y-2">
            {CLIENT_STATS.map((c) => (
              <div key={c.client} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-violet-50 flex items-center justify-center"><Building2 className="w-4 h-4 text-violet-600" /></div>
                  <span className="text-sm font-medium text-slate-700">{c.client}</span>
                </div>
                <Badge tone="emerald">Active</Badge>
              </div>
            ))}
          </div>
        )}
        {tab === "Employees" && (
          <div className="space-y-2">
            {["Rohan Mehta", "Aditi Sharma", "Kabir Singh", "Sneha Iyer"].map((n) => (
              <div key={n} className="flex items-center justify-between py-2.5 border-b border-slate-50 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-xs font-semibold text-slate-500">{n.split(" ").map((x) => x[0]).join("")}</div>
                  <span className="text-sm font-medium text-slate-700">{n}</span>
                </div>
                <span className="text-xs text-slate-400">Logistics &middot; Active</span>
              </div>
            ))}
          </div>
        )}
        {tab === "Payroll" && (
          <Field label="Pay cycle" value="Monthly, 1st-end" tone="slate" icon={Wallet} />
        )}
        {tab === "Business Rules" && (
          <div className="space-y-2">
            <Field label="Max overtime / week" value="12 hrs" tone="slate" icon={Clock} />
            <Field label="Auto-approve under" value="\u20B95,000" tone="slate" icon={IndianRupee} />
            <Field label="Duplicate claim window" value="30 days" tone="slate" icon={ShieldAlert} />
          </div>
        )}
        {tab === "Prompt Settings" && (
          <div>
            <p className="text-xs font-semibold text-slate-500 mb-2">Reasoning Agent system prompt</p>
            <textarea
              defaultValue="Explain every approval and rejection in plain, non-technical language a finance manager can read in under 30 seconds."
              rows={4}
              className="w-full text-sm border border-slate-200 rounded-xl p-3 outline-none focus:border-violet-400 resize-none"
            />
          </div>
        )}
        {tab === "LLM Settings" && (
          <div className="space-y-2">
            <Field label="Reasoning model" value="claude-sonnet-4-6" tone="violet" icon={Cpu} />
            <Field label="Temperature" value="0.2" tone="slate" icon={SlidersHorizontal} />
            <Field label="Max tokens / call" value="1,000" tone="slate" icon={Layers} />
          </div>
        )}
      </Card>
    </div>
  );
}

/* ---------------------------------------------------------------- */
/*  APP SHELL                                                         */
/* ---------------------------------------------------------------- */

const TITLES = { dashboard: "Dashboard", pipeline: "Agent Pipeline", analytics: "Analytics", assistant: "AI Assistant", portal: "Client Portal", admin: "Admin Settings" };

export default function InvoiceOS() {
  const [active, setActive] = useState("dashboard");
  const [stage, setStage] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  const [uploadedFile, setUploadedFile] = useState(null);

  return (
    <div className="h-screen w-full flex bg-slate-50 font-sans">
      <div className="hidden md:flex md:w-64 shrink-0">
        <SidebarContent active={active} stage={stage} onNavigate={setActive} onStage={setStage} />
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setMobileOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64">
            <SidebarContent
              active={active} stage={stage}
              onNavigate={(k) => { setActive(k); setMobileOpen(false); }}
              onStage={(s) => { setStage(s); setMobileOpen(false); }}
            />
          </div>
        </div>
      )}

      <div className="flex-1 flex flex-col min-w-0">
        <Topbar title={TITLES[active]} onMenu={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          {active === "dashboard" && <Dashboard onNavigate={setActive} onStage={setStage} />}
          {active === "pipeline" && (
  <Pipeline
    stage={stage}
    onStage={setStage}
    uploadedFile={uploadedFile}
    setUploadedFile={setUploadedFile}
  />
)}
          {active === "analytics" && <Analytics />}
          {active === "assistant" && <Assistant />}
          {active === "portal" && <ClientPortal />}
          {active === "admin" && <Admin />}
        </main>
      </div>
    </div>
  );
}
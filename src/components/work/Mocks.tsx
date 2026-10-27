import { ReactNode, useEffect, useRef, useState } from "react";

/**
 * "Screenshots" for projects without a public live demo. Each mock is laid
 * out on a fixed 1440×900 artboard and scaled to fit its frame, so it reads
 * exactly like a captured screen at any size.
 */

const W = 1440;
const H = 900;

export function ScaledArtboard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.5);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / W));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0 overflow-hidden">
      <div style={{ width: W, height: H, transform: `scale(${scale})`, transformOrigin: "0 0" }}>{children}</div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Amazon ML Challenge — notebook-style views                           */
/* ------------------------------------------------------------------ */

function NotebookShell({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0E1013] font-sans text-[#E6E3DA]">
      <div className="flex items-center gap-6 border-b border-white/10 px-10 py-5 font-mono text-[15px] text-white/50">
        <span className="text-[#D2F53C]">●</span>
        <span>{title}</span>
        <span className="ml-auto">Python 3 · LightGBM · 🤗 Transformers</span>
      </div>
      <div className="flex-1 px-14 py-10">{children}</div>
    </div>
  );
}

const funnel = [
  { stage: "All candidate pairs", note: "noisy records × 2.2M entities", width: 100 },
  { stage: "TF-IDF blocking", note: "char n-gram name + address keys", width: 62 },
  { stage: "e5 bi-encoder (fine-tuned)", note: "dense top-k neighbours", width: 34 },
  { stage: "LightGBM filter (learned)", note: "prunes pairs, keeps recall", width: 16 },
  { stage: "4.77 pairs / entity", note: "handed to the scorer", width: 7 },
];

export function AmazonPipelineMock() {
  return (
    <NotebookShell title="candidate_generation.ipynb">
      <p className="font-mono text-[15px] text-white/40">In [12]: plot_candidate_funnel(stages)</p>
      <h3 className="mt-4 text-[40px] font-medium tracking-tight">Candidate generation funnel</h3>
      <p className="mt-1 text-[18px] text-white/50">Fewer pairs at every stage — without losing true matches.</p>

      <div className="mt-12 space-y-7">
        {funnel.map((f, i) => (
          <div key={f.stage} className="grid grid-cols-[300px_1fr] items-center gap-8">
            <div>
              <p className={"text-[19px] " + (i === funnel.length - 1 ? "text-[#D2F53C]" : "")}>{f.stage}</p>
              <p className="font-mono text-[13px] text-white/40">{f.note}</p>
            </div>
            <div className="h-14 rounded-md bg-white/[0.04]">
              <div
                className="h-full rounded-md"
                style={{
                  width: `${f.width}%`,
                  background: i === funnel.length - 1 ? "#D2F53C" : `rgba(210,245,60,${0.18 + i * 0.12})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-3 gap-6">
        {[
          ["Scorer", "3-stage LightGBM cascade", "cross-fitted"],
          ["Re-ranker", "3 fine-tuned cross-encoders", "pairwise"],
          ["Output", "match / no-match", "entity id"],
        ].map(([k, v, s]) => (
          <div key={k} className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-5">
            <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-white/40">{k}</p>
            <p className="mt-2 text-[21px]">{v}</p>
            <p className="font-mono text-[13px] text-[#D2F53C]/80">{s}</p>
          </div>
        ))}
      </div>
    </NotebookShell>
  );
}

const countries = ["India", "US", "France"];
const folds = [
  { name: "Fold A", cells: ["validate", "train", "unlabeled"] },
  { name: "Fold B", cells: ["train", "validate", "unlabeled"] },
  { name: "Apply", cells: ["train", "train", "predict"] },
];

export function AmazonLocoMock() {
  return (
    <NotebookShell title="leave_one_country_out.ipynb">
      <p className="font-mono text-[15px] text-white/40">In [27]: show_validation_scheme(countries=["IN", "US", "FR"])</p>
      <h3 className="mt-4 text-[40px] font-medium tracking-tight">Leave-one-country-out validation</h3>
      <p className="mt-1 max-w-[900px] text-[18px] text-white/50">
        France had no labels — so the model chain is validated by holding out each labelled country in turn,
        then applied to France.
      </p>

      <div className="mt-10 grid grid-cols-[160px_repeat(3,1fr)] gap-3 font-mono text-[16px]">
        <div />
        {countries.map((c) => (
          <div key={c} className="pb-2 text-center text-white/50">
            {c}
          </div>
        ))}
        {folds.map((f) => (
          <div key={f.name} className="contents">
            <div className="flex items-center text-white/60">{f.name}</div>
            {f.cells.map((c, i) => (
              <div
                key={i}
                className={
                  "flex h-[92px] items-center justify-center rounded-xl text-[17px] " +
                  (c === "train"
                    ? "bg-white/[0.08] text-white/70"
                    : c === "validate"
                      ? "border-2 border-[#D2F53C] bg-[#D2F53C]/10 text-[#D2F53C]"
                      : c === "predict"
                        ? "bg-[#FF7A45] text-[#0E1013]"
                        : "border border-dashed border-white/20 text-white/30")
                }
              >
                {c}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="mt-8 flex gap-8 font-mono text-[14px] text-white/50">
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-white/30" /> train</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm border-2 border-[#D2F53C]" /> held-out country</span>
        <span className="flex items-center gap-2"><i className="h-3 w-3 rounded-sm bg-[#FF7A45]" /> unlabeled target</span>
      </div>
    </NotebookShell>
  );
}

export function AmazonRankMock() {
  // ranks on a log axis: 1 → 27,000
  const pos = (r: number) => (Math.log10(r) / Math.log10(27000)) * 100;
  const ticks = [1, 10, 100, 1000, 10000, 27000];
  return (
    <NotebookShell title="final_standings">
      <div className="grid grid-cols-[1.1fr_1fr] gap-14">
        <div>
          <p className="font-mono text-[14px] uppercase tracking-[0.2em] text-white/40">Amazon ML Challenge 2026 · Final rank</p>
          <p className="mt-6 font-serif text-[210px] leading-[0.8] tracking-tight">
            334<span className="text-[#D2F53C]">.</span>
          </p>
          <p className="mt-6 text-[26px] text-white/60">of 27,000+ teams · top 1.3%</p>
        </div>
        <div className="flex flex-col justify-end gap-4 pb-4">
          {[
            ["Score", "0.987133"],
            ["Team size", "4"],
            ["Task", "Entity resolution"],
            ["Markets", "India · US · France"],
          ].map(([k, v]) => (
            <div key={k} className="flex items-baseline justify-between border-b border-white/10 pb-3">
              <span className="font-mono text-[15px] text-white/40">{k}</span>
              <span className="text-[24px]">{v}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <p className="mb-6 font-mono text-[14px] text-white/40">Leaderboard position · log scale</p>
        <div className="relative h-16">
          <div className="absolute inset-x-0 top-1/2 h-px bg-white/20" />
          <div className="absolute top-1/2 h-2 -translate-y-1/2 rounded-full bg-[#D2F53C]/25" style={{ left: 0, width: `${pos(334)}%` }} />
          {ticks.map((t) => (
            <div key={t} className="absolute top-1/2" style={{ left: `${pos(t)}%` }}>
              <div className="h-4 w-px -translate-y-1/2 bg-white/30" />
              <p className="mt-2 -translate-x-1/2 font-mono text-[13px] text-white/40">{t.toLocaleString("en-US")}</p>
            </div>
          ))}
          <div className="absolute top-1/2" style={{ left: `${pos(334)}%` }}>
            <div className="h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[#0E1013] bg-[#D2F53C] shadow-[0_0_0_6px_rgba(210,245,60,0.2)]" />
            <p className="absolute -top-14 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#D2F53C] px-3 py-1 font-mono text-[14px] text-[#0E1013]">
              #334
            </p>
          </div>
        </div>
      </div>
    </NotebookShell>
  );
}

/* ------------------------------------------------------------------ */
/* AcquireKeep — resource tracker recreated with sample data            */
/* ------------------------------------------------------------------ */

const akNav = ["Dashboard", "Resources", "Requests", "Reports", "Settings"];

function AkShell({ active, children }: { active: string; children: ReactNode }) {
  return (
    <div className="flex h-full w-full bg-[#F6F5F1] font-sans text-[#17171A]">
      <aside className="flex w-[250px] flex-col border-r border-black/[0.07] bg-white px-6 py-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#17171A] text-[18px] font-semibold text-[#D2F53C]">A</div>
          <div>
            <p className="text-[18px] font-semibold leading-tight">AcquireKeep</p>
            <p className="text-[13px] text-black/40">Resource tracker</p>
          </div>
        </div>
        <nav className="mt-10 space-y-1">
          {akNav.map((n) => (
            <div
              key={n}
              className={
                "rounded-lg px-4 py-3 text-[16px] " +
                (n === active ? "bg-[#17171A] text-white" : "text-black/55")
              }
            >
              {n}
            </div>
          ))}
        </nav>
        <div className="mt-auto rounded-xl bg-[#F6F5F1] p-4 text-[13px] text-black/50">
          <p className="font-medium text-black/70">Server-rendered</p>
          <p>Next.js SSR · REST API</p>
        </div>
      </aside>
      <main className="flex-1 overflow-hidden px-12 py-10">{children}</main>
    </div>
  );
}

const statusStyle: Record<string, string> = {
  Available: "bg-emerald-100 text-emerald-700",
  "In use": "bg-indigo-100 text-indigo-700",
  Reserved: "bg-amber-100 text-amber-700",
  Maintenance: "bg-rose-100 text-rose-700",
};

const resources = [
  ["RES-1042", "Dell Latitude 7440", "Laptops", "A. Verma", "In use", "2h ago"],
  ["RES-1038", "Projector — Seminar Hall B", "AV equipment", "—", "Available", "5h ago"],
  ["RES-1031", "Arduino Mega lab kit", "Lab kits", "R. Mishra", "Reserved", "Yesterday"],
  ["RES-1027", "LG 27\" 4K monitor", "Monitors", "S. Khan", "In use", "Yesterday"],
  ["RES-1019", "Tableau Creator licence", "Licences", "P. Yadav", "In use", "2 days ago"],
  ["RES-1012", "Raspberry Pi 5 kit", "Lab kits", "—", "Maintenance", "3 days ago"],
  ["RES-1008", "Intro to Statistical Learning", "Books", "N. Gupta", "In use", "4 days ago"],
  ["RES-0997", "MacBook Air M2", "Laptops", "—", "Available", "5 days ago"],
];

export function AkDashboardMock() {
  const bars = [
    ["Laptops", 82],
    ["Monitors", 64],
    ["Lab kits", 71],
    ["Licences", 93],
    ["Books", 38],
    ["AV", 45],
  ] as const;
  return (
    <AkShell active="Dashboard">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[14px] text-black/40">Good morning 👋</p>
          <h3 className="text-[34px] font-semibold tracking-tight">Inventory overview</h3>
        </div>
        <div className="rounded-lg bg-[#17171A] px-5 py-3 text-[15px] text-white">+ Add resource</div>
      </div>

      <div className="mt-8 grid grid-cols-4 gap-5">
        {[
          ["Total resources", "248", "+12 this month"],
          ["Checked out", "64", "25.8% utilisation"],
          ["Due this week", "12", "4 due tomorrow"],
          ["Overdue", "3", "reminders sent"],
        ].map(([k, v, s], i) => (
          <div key={k} className="rounded-2xl border border-black/[0.06] bg-white p-6">
            <p className="text-[14px] text-black/45">{k}</p>
            <p className={"mt-2 text-[40px] font-semibold tracking-tight " + (i === 3 ? "text-rose-600" : "")}>{v}</p>
            <p className="text-[13px] text-black/40">{s}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-[1.25fr_1fr] gap-5">
        <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
          <p className="text-[18px] font-medium">Utilisation by category</p>
          <p className="text-[13px] text-black/40">% of items checked out at least once in 30 days</p>
          <div className="mt-6 flex h-[260px] items-end gap-6 border-b border-black/10 pb-0">
            {bars.map(([k, v]) => (
              <div key={k} className="flex flex-1 flex-col items-center gap-2">
                <span className="text-[13px] text-black/50">{v}%</span>
                <div className="w-full rounded-t-lg bg-[#17171A]" style={{ height: `${v * 2.2}px`, opacity: 0.35 + v / 160 }} />
              </div>
            ))}
          </div>
          <div className="mt-3 flex gap-6">
            {bars.map(([k]) => (
              <span key={k} className="flex-1 text-center text-[13px] text-black/50">{k}</span>
            ))}
          </div>
        </div>
        <div className="rounded-2xl border border-black/[0.06] bg-white p-7">
          <p className="text-[18px] font-medium">Recent activity</p>
          <div className="mt-4 divide-y divide-black/[0.06]">
            {resources.slice(0, 6).map(([id, name, , who, status, when]) => (
              <div key={id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[15px]">{name}</p>
                  <p className="text-[12px] text-black/40">{who === "—" ? "Returned to store" : `Checked out by ${who}`} · {when}</p>
                </div>
                <span className={"rounded-full px-3 py-1 text-[12px] " + statusStyle[status]}>{status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AkShell>
  );
}

export function AkResourcesMock() {
  return (
    <AkShell active="Resources">
      <h3 className="text-[34px] font-semibold tracking-tight">Resources</h3>
      <div className="mt-6 flex items-center gap-3">
        <div className="flex-1 rounded-xl border border-black/10 bg-white px-5 py-3.5 text-[15px] text-black/35">
          Search by name, ID or person…
        </div>
        {["All categories", "All statuses"].map((f) => (
          <div key={f} className="rounded-xl border border-black/10 bg-white px-5 py-3.5 text-[15px] text-black/60">
            {f} ▾
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-hidden rounded-2xl border border-black/[0.06] bg-white">
        <div className="grid grid-cols-[120px_1.6fr_1fr_1fr_140px_120px] gap-4 border-b border-black/[0.06] bg-black/[0.02] px-7 py-4 text-[13px] uppercase tracking-wider text-black/40">
          <span>ID</span>
          <span>Resource</span>
          <span>Category</span>
          <span>Assigned to</span>
          <span>Status</span>
          <span>Updated</span>
        </div>
        {resources.map(([id, name, cat, who, status, when]) => (
          <div key={id} className="grid grid-cols-[120px_1.6fr_1fr_1fr_140px_120px] items-center gap-4 border-b border-black/[0.05] px-7 py-[15px] text-[15px] last:border-b-0">
            <span className="font-mono text-[13px] text-black/45">{id}</span>
            <span className="font-medium">{name}</span>
            <span className="text-black/60">{cat}</span>
            <span className="text-black/60">{who}</span>
            <span>
              <span className={"rounded-full px-3 py-1 text-[12px] " + statusStyle[status]}>{status}</span>
            </span>
            <span className="text-black/45">{when}</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-[14px] text-black/45">
        <span>Showing 1–8 of 248</span>
        <span>‹ 1 2 3 … 31 ›</span>
      </div>
    </AkShell>
  );
}

export const mocks: Record<string, () => JSX.Element> = {
  "amazon-pipeline": AmazonPipelineMock,
  "amazon-loco": AmazonLocoMock,
  "amazon-rank": AmazonRankMock,
  "ak-dashboard": AkDashboardMock,
  "ak-resources": AkResourcesMock,
};

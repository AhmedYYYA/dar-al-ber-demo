/* ============================================================
   Dar Al Ber Society — Digital Humanitarian Platform (Demo)
   Vanilla JS: rendering, reactivity, i18n, animations.
   All data is simulated. No payments. No storage.
   ============================================================ */
"use strict";

/* ---------------- 1. Demo data ---------------- */

const PROJECTS_BY_TYPE = {
  zakat: [
    { id: "zakat-families", ar: "زكاة — الأسر المتعففة", en: "Zakat — Families in need" },
    { id: "zakat-debtors", ar: "زكاة — الغارمون", en: "Zakat — Debt relief" },
    { id: "zakat-students", ar: "زكاة — طلبة العلم المستحقون", en: "Zakat — Eligible students" }
  ],
  sadaqah: [
    { id: "general", ar: "الصدقة العامة", en: "General sadaqah" },
    { id: "monthly", ar: "الصدقة الشهرية", en: "Monthly sadaqah" },
    { id: "parents", ar: "صدقة عن الوالدين", en: "Sadaqah for parents" },
    { id: "deceased", ar: "صدقة عن متوفى", en: "Sadaqah for the deceased" },
    { id: "campaign", ar: "حملة سقيا الماء", en: "Water campaign" }
  ],
  waqf: [
    { id: "waqf-edu", ar: "الوقف التعليمي", en: "Education waqf" },
    { id: "waqf-health", ar: "الوقف الصحي", en: "Health waqf" },
    { id: "waqf-housing", ar: "وقف الإسكان الخيري", en: "Charitable housing waqf" }
  ],
  relief: [
    { id: "relief-food", ar: "الإغاثة الغذائية العاجلة", en: "Urgent food relief" },
    { id: "relief-shelter", ar: "الإيواء الطارئ", en: "Emergency shelter" },
    { id: "relief-medical", ar: "الإغاثة الطبية", en: "Medical relief" }
  ]
};

const TYPE_LABELS = {
  zakat: { ar: "زكاة", en: "Zakat" },
  sadaqah: { ar: "صدقة", en: "Sadaqah" },
  waqf: { ar: "وقف", en: "Waqf" },
  relief: { ar: "إغاثة", en: "Relief" }
};

/* Impact preview tiers (demo copy) */
const IMPACT_TIERS = [
  { min: 0, ar: (a) => `${fmt(a)} درهم تساهم في سلة غذائية لأسرة متعففة`, en: (a) => `AED ${fmt(a)} contributes to a food basket for a family in need` },
  { min: 100, ar: (a) => `${fmt(a)} درهم توفر سلة غذائية متكاملة لأسرة متعففة`, en: (a) => `AED ${fmt(a)} provides a complete food basket for a family in need` },
  { min: 500, ar: (a) => `${fmt(a)} درهم تغطي احتياجات أسرة متعففة لشهر كامل`, en: (a) => `AED ${fmt(a)} covers a family's essential needs for a full month` },
  { min: 1000, ar: (a) => `${fmt(a)} درهم تدعم علاج مريض أو كفالة طالب علم لفصل دراسي`, en: (a) => `AED ${fmt(a)} supports a patient's treatment or a student for a term` },
  { min: 5000, ar: (a) => `${fmt(a)} درهم تؤسس مساهمة وقفية بأثر مستدام متجدد`, en: (a) => `AED ${fmt(a)} establishes a waqf contribution with lasting impact` }
];

const CATEGORIES = [
  { icon: "star", ar: "الزكاة", en: "Zakat", dAr: "أدِّ زكاتك لتُصرف في مصارفها الشرعية الموثقة.", dEn: "Fulfil your zakat through documented, eligible channels.", amt: 500, type: "zakat" },
  { icon: "heart", ar: "الصدقات", en: "Sadaqah", dAr: "عطاء موثوق يصل بوضوح حيث تشتد الحاجة.", dEn: "Trusted giving that clearly reaches those in need.", amt: 100, type: "sadaqah" },
  { icon: "building", ar: "الأوقاف", en: "Waqf", dAr: "أصل مستدام يُقاس بصافي أثره المتجدد.", dEn: "A sustainable asset measured by its net impact.", amt: 1000, type: "waqf" },
  { icon: "child", ar: "كفالة الأيتام", en: "Orphan sponsorship", dAr: "رعاية شاملة تحفظ للطفل كرامته ومستقبله.", dEn: "Holistic care preserving a child's dignity and future.", amt: 400, type: "sadaqah" },
  { icon: "health", ar: "المشاريع الصحية", en: "Health projects", dAr: "دعم علاج المرضى والبرامج الصحية المجتمعية.", dEn: "Supporting treatment and community health programmes.", amt: 300, type: "sadaqah" },
  { icon: "book", ar: "التعليم", en: "Education", dAr: "تمكين طلبة العلم من مواصلة تعليمهم.", dEn: "Enabling students to continue their education.", amt: 250, type: "sadaqah" },
  { icon: "home", ar: "الأسر المتعففة", en: "Families in need", dAr: "دعم كريم يحفظ للأسرة استقرارها وكرامتها.", dEn: "Dignified support preserving family stability.", amt: 200, type: "zakat" },
  { icon: "bolt", ar: "الإغاثة العاجلة", en: "Urgent relief", dAr: "استجابة إنسانية سريعة وفق المعايير الدولية.", dEn: "Rapid humanitarian response to global standards.", amt: 150, type: "relief" }
];

const ICONS = {
  star: '<path d="M12 3l2.5 5 5.5.8-4 3.9.9 5.5-4.9-2.6L7.1 18l.9-5.5-4-3.9L9.5 8z"/>',
  heart: '<path d="M12 21s-7-4.6-9.5-8.5C.6 9.6 2.3 6 5.6 6c2 0 3.3 1.1 4 2.2C10.4 7.1 11.7 6 13.7 6c3.3 0 5 3.6 3.1 6.5C19 16.4 12 21 12 21z"/>',
  building: '<path d="M3 21h18M5 21V10l7-5 7 5v11M9 21v-6h6v6"/>',
  child: '<circle cx="12" cy="8" r="3.5"/><path d="M5 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/>',
  health: '<path d="M12 4v16M4 12h16"/><circle cx="12" cy="12" r="9"/>',
  book: '<path d="M4 5a2 2 0 012-2h13v18H6a2 2 0 00-2 2z"/><path d="M19 17H6a2 2 0 00-2 2"/>',
  home: '<path d="M3 11l9-8 9 8M6 10v10h12V10M10 20v-5h4v5"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>'
};

const WAQF_ASSETS = [
  { ar: "وقف تعليمي", en: "Education waqf", income: 820, expenses: 260, status: "productive" },
  { ar: "وقف صحي", en: "Health waqf", income: 640, expenses: 310, status: "productive" },
  { ar: "وقف إسكان خيري", en: "Housing waqf", income: 450, expenses: 390, status: "improve" },
  { ar: "وقف إغاثي", en: "Relief waqf", income: 180, expenses: 60, status: "develop" }
];

const WAQF_STATUS = {
  productive: { ar: "منتج", en: "Productive", cls: "badge-productive" },
  improve: { ar: "يحتاج تحسين", en: "Needs improvement", cls: "badge-improve" },
  develop: { ar: "قيد التطوير", en: "In development", cls: "badge-develop" }
};

const PROJECTS = [
  { ar: "دعم طالب علم", en: "Support a student", cats: ["sadaqah", "education"], target: 250000, raised: 187500, benef: 340 },
  { ar: "علاج مريض", en: "Treat a patient", cats: ["sadaqah", "health"], target: 400000, raised: 312000, benef: 96 },
  { ar: "سقيا الماء", en: "Water for life", cats: ["sadaqah"], target: 180000, raised: 165600, benef: 4200 },
  { ar: "كفالة يتيم", en: "Sponsor an orphan", cats: ["sadaqah", "zakat"], target: 600000, raised: 402000, benef: 520 },
  { ar: "إغاثة عاجلة", en: "Urgent relief", cats: ["relief"], target: 1000000, raised: 720000, benef: 12400 },
  { ar: "بناء مسجد", en: "Build a mosque", cats: ["waqf"], target: 2500000, raised: 1350000, benef: 3000 }
];

const CAT_LABELS = {
  zakat: { ar: "زكاة", en: "Zakat" }, sadaqah: { ar: "صدقة", en: "Sadaqah" },
  waqf: { ar: "وقف", en: "Waqf" }, relief: { ar: "إغاثة", en: "Relief" },
  education: { ar: "تعليم", en: "Education" }, health: { ar: "صحة", en: "Health" }
};

const DIST_CHART = [
  { ar: "الزكاة", en: "Zakat", val: 38 },
  { ar: "الصدقات", en: "Sadaqah", val: 27 },
  { ar: "الأوقاف", en: "Waqf", val: 19 },
  { ar: "الإغاثة", en: "Relief", val: 16 }
];

/* ---------------- 2. i18n ---------------- */

const EN = {
  skip: "Skip to main content",
  demoRibbon: "Demo prototype for presentation purposes — no real payments are processed and no data is stored",
  brandAr: "Dar Al Ber Society", brandEn: "جمعية دار البر",
  navHome: "Home", navDonate: "Donate now", navZakat: "Zakat", navSadaqah: "Sadaqah", navWaqf: "Waqf",
  navProjects: "Projects", navRelief: "Relief", navBenef: "Beneficiaries", navImpact: "Impact & transparency",
  navPortal: "Donor portal", navContact: "Contact us",
  heroEyebrow: "Dar Al Ber Society's digital humanitarian platform — demo concept",
  heroTitle1: "From donation", heroTitle2: "to impact",
  heroSub: "A digital humanitarian platform connecting your contribution to the project, the beneficiary, and the impact — through a trusted, transparent, easy experience.",
  ctaDonate: "Donate now", ctaExplore: "Explore impact",
  heroTrust: "Secure, documented giving · Measurable impact · Digital governance for charity",
  qZakat: "Zakat", qZakatSub: "Fulfil your zakat properly",
  qSadaqah: "Sadaqah", qSadaqahSub: "Trusted giving, clear delivery",
  qWaqf: "Waqf", qWaqfSub: "A sustainable, renewing asset",
  qRelief: "Urgent relief", qReliefSub: "Rapid humanitarian response",
  trust1: "Secure donation channels", trust2: "Donation-to-impact tracking", trust3: "Impact & project reports",
  trust4: "Governance & transparency", trust5: "Donor & beneficiary data protection",
  journeyEyebrow: "Your contribution arrives clearly", journeyTitle: "The smart donation journey",
  journeySub: "Every contribution receives a tracking number linking it to the project, disbursement, beneficiary, and impact report.",
  jn1: "1",
  jn2: "2",
  jn3: "3",
  jn4: "4",
  jn5: "5",
  jn6: "6",
  jn7: "7",
  jn8: "8",
  j1: "Donor", j2: "Donation type", j3: "Project", j4: "Approval", j5: "Disbursement", j6: "Beneficiary", j7: "Verification", j8: "Impact report",
  journeyNote: "A demo tracking number appears the moment you complete a donation, and shows in the donor portal below.",
  catEyebrow: "Channels of giving", catTitle: "Main donation channels",
  catSub: "Clear, separated channels ensuring every contribution reaches its correct destination.",
  donEyebrow: "Secure, documented giving", donTitle: "Smart donation form",
  donSub: "Choose a donation type and project, and the system previews the expected impact before you confirm. On confirmation, a tracking number links your donation to its full journey.",
  impactLabel: "Expected impact of your contribution",
  assure1: "No real payment is processed in this demo",
  assure2: "No data is stored in this demo",
  assure3: "In the live platform: full encryption and official, approved payment channels",
  fType: "Donation type", fProject: "Project", fAmount: "Amount (AED)", fFreq: "Frequency",
  fOnce: "One time", fMonthly: "Monthly", fName: "Name (optional)", fNamePh: "Anonymous donor",
  fEmail: "Email", fEmailErr: "Please enter a valid email address", fPay: "Payment method",
  payCard: "Card", payBank: "Bank transfer", fSubmit: "Complete donation",
  fNote: "Demo form — no real payment is processed.",
  zEyebrow: "The obligatory pillar of giving", zTitle: "Zakat",
  zSub: "Zakat is disbursed to its rightful recipients under precise controls and clear governance, with full documentation of every contribution from receipt to disbursement and verification.",
  zP1: "Defined, documented zakat recipients", zP2: "Full separation of zakat funds from other channels", zP3: "Periodic impact reports for zakat disbursement",
  zCalcTitle: "Zakat calculator", zCalcLabel: "Total wealth held for one lunar year (AED)", zCalcPh: "e.g. 100,000",
  zCalcDue: "Zakat due (2.5%)", zCalcCta: "Pay zakat now",
  zCalcDisc: "This calculator is for guidance only; please consult the competent authorities where needed.",
  sEyebrow: "A door that never closes", sTitle: "Sadaqah", sSub: "Giving that arrives clearly, in forms that suit every donor's intention.",
  s1: "One-time sadaqah", s1d: "An immediate contribution to the nearest need",
  s2: "Monthly sadaqah", s2d: "Continuous giving with compounding impact",
  s3: "Sadaqah for parents", s3d: "Renewing kindness in the name of those you love",
  s4: "Sadaqah for the deceased", s4d: "A lasting impact and a good remembrance",
  s5: "General projects sadaqah", s5d: "Flexible support wherever need is greatest",
  s6: "Campaign sadaqah", s6d: "Choose a campaign and follow its impact directly",
  wEyebrow: "Sustainable waqf", wTitle: "Waqf: a sustainable asset, a renewing impact",
  wThesis: "A waqf is not measured by the mere existence of the asset, but by its net impact and the sustainability of its benefit.",
  wfNet: "Net waqf impact", wfIncome: "Waqf income", wfExp: "Operations, maintenance & administration costs",
  wLifecycle: "Waqf asset lifecycle",
  lc1: "Concept & designation", lc2: "Feasibility study", lc3: "Construction", lc4: "Operation",
  lc5: "Maintenance", lc6: "Mid-life review", lc7: "Renovation or redevelopment", lc8: "Impact maximisation",
  demoData: "Demo data for presentation purposes only.", demoData2: "Demo data for presentation purposes only.", demoData3: "Demo data for presentation purposes only.",
  pEyebrow: "Measurable impact", pTitle: "Projects & campaigns",
  pSub: "Campaigns and projects with clear indicators: target, raised, and beneficiaries.",
  fAll: "All", fZakat: "Zakat", fSadaqah: "Sadaqah", fWaqf: "Waqf", fRelief: "Relief", fEdu: "Education", fHealth: "Health",
  rEyebrow: "Rapid humanitarian response", rTitle: "Urgent relief",
  rSub: "Readiness for urgent humanitarian response to international standards, with clear disbursement governance and documented field reporting that preserves beneficiary dignity.",
  rP1: "Emergency campaigns activated within hours", rP2: "Field documentation of every disbursement stage", rP3: "Coordination with official bodies and humanitarian partners",
  rUrgent: "Urgent — demo campaign", rLoc: "Food relief & shelter sector",
  rCardTitle: "Urgent humanitarian response campaign",
  rRaised: "AED raised", rBenef: "targeted beneficiaries", rProg: "completion", rCta: "Contribute to relief now",
  bEyebrow: "A service that preserves dignity", bTitle: "Beneficiary services",
  bSub: "A clear, confidential digital journey — from application to approval and notification.",
  b1: "Submit application", b2: "Upload documents", b3: "Eligibility review", b4: "Assistance approval", b5: "Beneficiary notification",
  bFormTitle: "Request assistance (demo form)", bType: "Assistance type", bTypeSel: "Select assistance type",
  bT1: "Food assistance", bT2: "Housing assistance", bT3: "Education assistance", bT4: "Medical assistance",
  bEmirate: "Emirate", bEmSel: "Select emirate", bFamily: "Family members", bNotes: "Notes", bNotesPh: "Optional",
  bSubmit: "Submit (demo)", bSuccess: "Your demo application was received successfully.",
  bNoStore: "No data is stored in this demo form.",
  iEyebrow: "Transparency builds trust", iTitle: "Public impact dashboard",
  iSub: "Published indicators linking donations to projects, beneficiaries, and impact reports.",
  m1: "Total donations", m2: "Beneficiaries", m3: "Completed projects", m4: "Donations linked to impact reports", m5: "Productive waqf assets", m6: "Active campaigns",
  c1Title: "Donation distribution by channel", c2Title: "Project completion progress", c3Title: "Net waqf impact (AED k/yr)",
  dpEyebrow: "Your giving, in one place", dpTitle: "Donor portal",
  dpSub: "Your donation history, receipts, tracking numbers, project progress, impact reports, and recurring donations — in one secure experience.",
  dpF1: "Donation history & receipts", dpF2: "Impact tracking with a reference for every donation", dpF3: "Manage recurring donations", dpF4: "Periodic impact reports",
  dpDemo: "Demo preview", dpUser: "Welcome, generous donor",
  dpTotal: "Your total donations", dpCountL: "Donations",
  dpStatus: "In progress", dpImpactUpd: "Donation linked to the Families-in-Need support project",
  dpHint: "Complete a demo donation in the form above and it will appear here instantly with a new tracking number.",
  gEyebrow: "Digital governance for charity", gTitle: "Governance & transparency",
  gSub: "Trust is built through documentation: published reports, clear permits, and strict data protection.",
  g1: "Annual reports", g2: "Campaign permits", g3: "Privacy policy", g4: "Official payment channels",
  g5: "Beneficiary data protection", g6: "Anti-fraud", g7: "Complaints & feedback", g8: "Financial & impact reports",
  gWarn: "Please donate only through official, approved channels.",
  gArchTitle: "Digital trust architecture",
  ga1: "Official identity", ga2: "Secure donation", ga3: "Documented receipt", ga4: "Tracking number", ga5: "Impact report", ga6: "Governance record",
  finalTitle: "Contribute today to an impact that lasts",
  finalSub: "Trusted giving, sustainable humanitarian impact, and transparency that builds trust.",
  ctaDonate2: "Donate now", ctaProjects: "Browse projects", ctaContact: "Contact us",
  footMission: "A digital humanitarian platform connecting your contribution to the project, beneficiary and impact — a demo design concept.",
  footQuick: "Quick links", navHome2: "Home", navProjects2: "Projects", navImpact2: "Impact & transparency", navPortal2: "Donor portal",
  footDonate: "Donation channels", navZakat2: "Zakat", navSadaqah2: "Sadaqah", navWaqf2: "Waqf", navRelief2: "Urgent relief",
  footContact: "Contact us", footCity: "Dubai, United Arab Emirates",
  footCopy: "© 2026 — Unofficial demo design concept for presentation purposes only. All names and figures are illustrative.",
  footPrivacy: "Privacy policy", footTerms: "Terms of use",
  mTitle: "Thank you for your trusted giving",
  mSub: "Your demo donation was recorded successfully and will be linked to a project, beneficiary, and impact report.",
  mTrack: "Demo tracking number", mCta: "Track your donation's impact (demo link)",
  mNote: "Demo — no real payment was processed."
};

const AR_CACHE = {}; // filled at runtime from the DOM (Arabic is the source of truth)
let currentLang = "ar";

/* ---------------- 3. Helpers ---------------- */

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
function fmt(n) { return Number(n).toLocaleString("en-US"); }
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- 4. Rendering ---------------- */

function renderCategories() {
  const grid = $("#catGrid");
  grid.innerHTML = CATEGORIES.map((c) => `
    <article class="cat-card reveal">
      <span class="cat-icon" aria-hidden="true"><svg viewBox="0 0 24 24">${ICONS[c.icon]}</svg></span>
      <h3 data-cat-name>${c.ar}</h3>
      <p data-cat-desc>${c.dAr}</p>
      <span class="cat-suggest" data-cat-suggest>${currentLang === "ar" ? "مبلغ مقترح" : "Suggested"}: ${fmt(c.amt)} AED</span>
      <button class="btn btn-green btn-sm" data-donate-type="${c.type}" data-amount-preset="${c.amt}" data-cat-cta>${currentLang === "ar" ? "تبرع الآن" : "Donate now"}</button>
    </article>`).join("");
  grid.querySelectorAll("[data-cat-name]").forEach((el, i) => { el.textContent = currentLang === "ar" ? CATEGORIES[i].ar : CATEGORIES[i].en; });
  grid.querySelectorAll("[data-cat-desc]").forEach((el, i) => { el.textContent = currentLang === "ar" ? CATEGORIES[i].dAr : CATEGORIES[i].dEn; });
}

function renderWaqf() {
  const grid = $("#waqfGrid");
  grid.innerHTML = WAQF_ASSETS.map((w) => {
    const net = w.income - w.expenses;
    const st = WAQF_STATUS[w.status];
    const t = (o) => (currentLang === "ar" ? o.ar : o.en);
    const L = currentLang === "ar"
      ? { inc: "الدخل السنوي", exp: "مصاريف التشغيل", net: "صافي الأثر الوقفي", unit: "ألف درهم" }
      : { inc: "Annual income", exp: "Operating costs", net: "Net waqf impact", unit: "AED k" };
    return `
    <article class="waqf-card reveal">
      <h3>${t(w)} <span class="badge ${st.cls}">${t(st)}</span></h3>
      <div class="waqf-line"><span>${L.inc}</span><strong>${fmt(w.income)} ${L.unit}</strong></div>
      <div class="waqf-line"><span>${L.exp}</span><strong>${fmt(w.expenses)} ${L.unit}</strong></div>
      <div class="waqf-line waqf-net-line"><span>${L.net}</span><strong>${fmt(net)} ${L.unit}</strong></div>
    </article>`;
  }).join("");
  observeReveals(grid);
}

function renderProjects() {
  const grid = $("#projectGrid");
  grid.innerHTML = PROJECTS.map((p) => {
    const pct = Math.round((p.raised / p.target) * 100);
    const t = currentLang === "ar";
    const catBadges = p.cats.map((c) => `<span class="project-cat">${t ? CAT_LABELS[c].ar : CAT_LABELS[c].en}</span>`).join(" ");
    return `
    <article class="project-card reveal" data-cats="${p.cats.join(" ")}">
      <div class="project-top"><h3>${t ? p.ar : p.en}</h3><span>${catBadges}</span></div>
      <div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100" aria-label="${pct}%">
        <div class="progress-fill" data-progress="${pct}"></div>
      </div>
      <div class="project-nums">
        <span>${t ? "المُحصَّل" : "Raised"}<strong>${fmt(p.raised)} AED</strong></span>
        <span>${t ? "المستهدف" : "Target"}<strong>${fmt(p.target)} AED</strong></span>
        <span>${t ? "الإنجاز" : "Progress"}<strong>${pct}%</strong></span>
      </div>
      <span class="project-benef"><strong>${fmt(p.benef)}</strong> ${t ? "مستفيد" : "beneficiaries"}</span>
      <button class="btn btn-gold btn-sm" data-donate-type="${p.cats[0]}">${t ? "ساهم الآن" : "Contribute now"}</button>
    </article>`;
  }).join("");
  observeReveals(grid);
  animateVisibleProgress(grid);
}

function renderCharts() {
  const t = currentLang === "ar";
  $("#distChart").innerHTML = DIST_CHART.map((d) => barRow(t ? d.ar : d.en, d.val, d.val + "%")).join("");
  $("#progChart").innerHTML = PROJECTS.slice(0, 4).map((p) => {
    const pct = Math.round((p.raised / p.target) * 100);
    return barRow(t ? p.ar : p.en, pct, pct + "%");
  }).join("");
  const maxNet = Math.max(...WAQF_ASSETS.map((w) => w.income - w.expenses));
  $("#waqfChart").innerHTML = WAQF_ASSETS.map((w) => {
    const net = w.income - w.expenses;
    return barRow(t ? w.ar : w.en, Math.round((net / maxNet) * 100), fmt(net));
  }).join("");
}

function barRow(label, pct, valText) {
  return `<div class="bar-row"><div class="bar-top"><span>${label}</span><strong>${valText}</strong></div>
    <div class="bar"><i data-bar="${pct}"></i></div></div>`;
}

/* ---------------- 5. Donation form reactivity ---------------- */

function populateProjects(type, preselect) {
  const sel = $("#donProject");
  sel.innerHTML = PROJECTS_BY_TYPE[type]
    .map((p) => `<option value="${p.id}">${currentLang === "ar" ? p.ar : p.en}</option>`)
    .join("");
  if (preselect && PROJECTS_BY_TYPE[type].some((p) => p.id === preselect)) sel.value = preselect;
}

function updateImpactPreview() {
  const amount = Math.max(0, Number($("#donAmount").value) || 0);
  const tier = [...IMPACT_TIERS].reverse().find((tr) => amount >= tr.min) || IMPACT_TIERS[0];
  $("#impactText").textContent = tier[currentLang](amount);
}

let donationCounter = 1; // DAB-2026-0001 already shown as seed
let portalTotal = 1500;
let portalCount = 3;

function handleDonateSubmit(e) {
  e.preventDefault();
  const email = $("#donEmail");
  const amount = $("#donAmount");
  let valid = true;

  if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    email.classList.add("is-invalid"); valid = false;
  } else email.classList.remove("is-invalid");

  if (!amount.value || Number(amount.value) < 10) {
    amount.classList.add("is-invalid"); valid = false;
  } else amount.classList.remove("is-invalid");

  if (!valid) return;

  donationCounter += 1;
  const trackId = "DAB-2026-" + String(donationCounter).padStart(4, "0");
  const type = $("#donType").value;
  const amt = Number(amount.value);
  const projectSel = $("#donProject");
  const projectLabel = projectSel.options[projectSel.selectedIndex].textContent;
  const monthly = $('input[name="freq"]:checked').value === "monthly";

  // Modal
  $("#modalTrackId").textContent = trackId;
  const t = currentLang === "ar";
  $("#modalSummary").textContent = t
    ? `${TYPE_LABELS[type].ar} · ${projectLabel} · ${fmt(amt)} درهم${monthly ? " · شهري" : ""}`
    : `${TYPE_LABELS[type].en} · ${projectLabel} · AED ${fmt(amt)}${monthly ? " · monthly" : ""}`;
  openModal();

  // Update donor portal demo
  portalTotal += amt; portalCount += 1;
  $("#portalTotal").innerHTML = `${fmt(portalTotal)} <small>AED</small>`;
  $("#portalCount").textContent = portalCount;
  const li = document.createElement("li");
  li.className = "portal-item";
  li.innerHTML = `
    <div class="pi-main"><strong>${trackId}</strong><span class="badge badge-progress">${t ? "قيد التنفيذ" : "In progress"}</span></div>
    <span class="pi-sub">${t ? "تم ربط التبرع بـ" : "Donation linked to"} ${projectLabel}</span>
    <span class="pi-meta">${t ? TYPE_LABELS[type].ar : TYPE_LABELS[type].en} · ${fmt(amt)} AED${monthly ? (t ? " · شهري" : " · monthly") : ""}</span>`;
  $("#portalList").prepend(li);
}

/* ---------------- 6. Modal ---------------- */

let lastFocused = null;
function openModal() {
  lastFocused = document.activeElement;
  const bd = $("#modalBackdrop");
  bd.hidden = false;
  requestAnimationFrame(() => bd.classList.add("is-open"));
  $("#modalClose").focus();
  document.addEventListener("keydown", escClose);
}
function closeModal() {
  const bd = $("#modalBackdrop");
  bd.classList.remove("is-open");
  document.removeEventListener("keydown", escClose);
  setTimeout(() => { bd.hidden = true; if (lastFocused) lastFocused.focus(); }, 300);
}
function escClose(e) { if (e.key === "Escape") closeModal(); }

/* ---------------- 7. Zakat calculator ---------------- */

function initZakat() {
  const input = $("#zakatInput");
  const result = $("#zakatResult");
  const update = () => {
    const wealth = Math.max(0, Number(input.value) || 0);
    const due = wealth * 0.025;
    result.innerHTML = `${due.toLocaleString("en-US", { maximumFractionDigits: 2 })} <small>AED</small>`;
    result.classList.add("pulse");
    setTimeout(() => result.classList.remove("pulse"), 200);
  };
  input.addEventListener("input", update);
  $("#zakatPayBtn").addEventListener("click", () => {
    $("#donType").value = "zakat";
    populateProjects("zakat");
    const due = Math.round(Math.max(0, Number(input.value) || 0) * 0.025);
    if (due >= 10) { $("#donAmount").value = due; updateImpactPreview(); syncChips(); }
    document.getElementById("donate").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

/* ---------------- 8. Filters ---------------- */

function initFilters() {
  $$(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      $$(".filter-btn").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      $$(".project-card").forEach((card) => {
        const show = f === "all" || card.dataset.cats.split(" ").includes(f);
        card.classList.toggle("is-hidden", !show);
      });
      animateVisibleProgress($("#projectGrid"));
    });
  });
}

/* ---------------- 9. Scroll: reveal, nav, counters, bars ---------------- */

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("is-visible"); revealObserver.unobserve(en.target); }
  });
}, { threshold: 0.12 });

function observeReveals(root = document) {
  $$(".reveal", root).forEach((el) => revealObserver.observe(el));
}

function animateVisibleProgress(root = document) {
  $$(".progress-fill", root).forEach((el) => {
    requestAnimationFrame(() => { el.style.width = el.dataset.progress + "%"; });
  });
}

function initScrollEffects() {
  // sticky header shadow
  const header = $("#siteHeader");
  window.addEventListener("scroll", () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }, { passive: true });

  // active nav highlighting
  const sections = $$("main section[id], footer[id]");
  const navLinks = $$(".nav-link");
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) {
        navLinks.forEach((l) => l.classList.toggle("is-active", l.getAttribute("href") === "#" + en.target.id));
      }
    });
  }, { rootMargin: "-40% 0px -55% 0px" });
  sections.forEach((s) => navObserver.observe(s));

  // counters + bars + timelines
  const fxObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      const el = en.target;
      if (el.matches("[data-count]")) animateCounter(el);
      if (el.matches(".bar > i, [data-bar]")) el.style.width = el.dataset.bar + "%";
      if (el.matches(".progress-fill")) el.style.width = el.dataset.progress + "%";
      if (el.matches("#journeyTrack, #waqfLifecycle")) el.classList.add("is-drawn");
      fxObserver.unobserve(el);
    });
  }, { threshold: 0.3 });

  $$("[data-count]").forEach((el) => fxObserver.observe(el));
  $$(".bar > i").forEach((el) => fxObserver.observe(el));
  $$(".progress-fill").forEach((el) => fxObserver.observe(el));
  fxObserver.observe($("#journeyTrack"));
  fxObserver.observe($("#waqfLifecycle"));
}

function animateCounter(el) {
  const target = parseFloat(el.dataset.count);
  const decimals = Number(el.dataset.decimals || 0);
  const useComma = el.dataset.format === "comma";
  const suffix = el.dataset.suffix || "";
  if (prefersReducedMotion) {
    el.textContent = (useComma ? fmt(target) : target.toFixed(decimals)) + suffix;
    return;
  }
  const dur = 1600; const start = performance.now();
  function tick(now) {
    const p = Math.min(1, (now - start) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    const val = target * eased;
    el.textContent = (useComma ? fmt(Math.round(val)) : val.toFixed(decimals)) + suffix;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

/* ---------------- 10. Header / mobile menu / ripple ---------------- */

function initHeader() {
  const toggle = $("#menuToggle");
  const nav = $("#mainNav");
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open);
    document.body.style.overflow = open ? "hidden" : "";
  });
  nav.addEventListener("click", (e) => {
    if (e.target.matches(".nav-link")) {
      nav.classList.remove("is-open");
      toggle.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
}

function initRipple() {
  document.addEventListener("pointerdown", (e) => {
    const btn = e.target.closest(".btn");
    if (!btn) return;
    const r = btn.getBoundingClientRect();
    btn.style.setProperty("--rx", ((e.clientX - r.left) / r.width) * 100 + "%");
    btn.style.setProperty("--ry", ((e.clientY - r.top) / r.height) * 100 + "%");
    btn.classList.add("rippling");
    setTimeout(() => btn.classList.remove("rippling"), 450);
  });
}

/* ---------------- 11. Quick-donate shortcuts ---------------- */

function initQuickDonate() {
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest("[data-donate-type]");
    if (!trigger) return;
    e.preventDefault();
    const type = trigger.dataset.donateType;
    $("#donType").value = type;
    populateProjects(type, trigger.dataset.project);
    if (trigger.dataset.amountPreset) { $("#donAmount").value = trigger.dataset.amountPreset; syncChips(); }
    updateImpactPreview();
    document.getElementById("donate").scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
  });
}

function syncChips() {
  const val = $("#donAmount").value;
  $$(".chip").forEach((c) => c.classList.toggle("is-active", c.dataset.amount === val));
}

/* ---------------- 12. Language switching ---------------- */

function cacheArabic() {
  $$("[data-i18n]").forEach((el) => { AR_CACHE[el.dataset.i18n] = el.textContent; });
  $$("[data-i18n-ph]").forEach((el) => { AR_CACHE["ph:" + el.dataset.i18nPh] = el.placeholder; });
}

function setLanguage(lang) {
  if (lang === currentLang) return;
  currentLang = lang;
  const isAr = lang === "ar";
  document.documentElement.lang = lang;
  document.documentElement.dir = isAr ? "rtl" : "ltr";
  document.title = isAr
    ? "جمعية دار البر | من التبرع إلى الأثر — منصة رقمية إنسانية"
    : "Dar Al Ber Society | From Donation to Impact — Digital Humanitarian Platform";

  $$("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    const val = isAr ? AR_CACHE[key] : EN[key];
    if (val != null) el.textContent = val;
  });
  $$("[data-i18n-ph]").forEach((el) => {
    const key = el.dataset.i18nPh;
    const val = isAr ? AR_CACHE["ph:" + key] : EN[key];
    if (val != null) el.placeholder = val;
  });
  $$(".lang-option").forEach((o) => o.classList.toggle("is-active", o.dataset.lang === lang));

  // re-render dynamic content in the selected language
  const currentType = $("#donType").value;
  const donTypeSel = $("#donType");
  const typeOrder = ["zakat", "sadaqah", "waqf", "relief"];
  donTypeSel.innerHTML = typeOrder.map((tp) =>
    `<option value="${tp}">${isAr ? { zakat: "الزكاة", sadaqah: "الصدقات", waqf: "الأوقاف", relief: "الإغاثة العاجلة" }[tp]
                                  : { zakat: "Zakat", sadaqah: "Sadaqah", waqf: "Waqf", relief: "Urgent relief" }[tp]}</option>`).join("");
  donTypeSel.value = currentType;
  populateProjects(currentType);
  updateImpactPreview();
  renderCategories(); observeReveals($("#catGrid")); $$("#catGrid .reveal").forEach((el) => el.classList.add("is-visible"));
  renderWaqf(); $$("#waqfGrid .reveal").forEach((el) => el.classList.add("is-visible"));
  renderProjects(); $$("#projectGrid .reveal").forEach((el) => el.classList.add("is-visible"));
  renderCharts(); $$(".bar > i").forEach((el) => { el.style.width = el.dataset.bar + "%"; });
  animateVisibleProgress();
}

/* ---------------- 13. Init ---------------- */

document.addEventListener("DOMContentLoaded", () => {
  cacheArabic();

  renderCategories();
  renderWaqf();
  renderProjects();
  renderCharts();

  populateProjects("sadaqah");
  updateImpactPreview();

  $("#donType").addEventListener("change", (e) => { populateProjects(e.target.value); updateImpactPreview(); });
  $("#donAmount").addEventListener("input", () => { updateImpactPreview(); syncChips(); });
  $$(".chip").forEach((chip) => chip.addEventListener("click", () => {
    $("#donAmount").value = chip.dataset.amount;
    syncChips(); updateImpactPreview();
  }));
  $("#donateForm").addEventListener("submit", handleDonateSubmit);

  $("#benefForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const form = e.target;
    if (!form.checkValidity()) { form.reportValidity(); return; }
    $("#benefSuccess").hidden = false;
    form.querySelectorAll("input, select").forEach((f) => { if (f.type !== "submit") f.value = ""; });
    setTimeout(() => { $("#benefSuccess").hidden = true; }, 6000);
  });

  $("#modalClose").addEventListener("click", closeModal);
  $("#modalBackdrop").addEventListener("click", (e) => { if (e.target === e.currentTarget) closeModal(); });
  $("#modalTrackLink").addEventListener("click", closeModal);

  initZakat();
  initFilters();
  initHeader();
  initRipple();
  initQuickDonate();
  initScrollEffects();
  observeReveals();

  $("#langSwitch").addEventListener("click", () => setLanguage(currentLang === "ar" ? "en" : "ar"));

  // entrance
  requestAnimationFrame(() => document.body.classList.remove("preload"));
});

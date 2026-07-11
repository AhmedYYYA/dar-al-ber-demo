document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page || "ar";
  const isEn = page === "en";
  const $ = (s, r=document) => r.querySelector(s);
  const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));
  const fmt = (n, options={}) => Number(n).toLocaleString("en-US", options);
  const money = (n) => isEn ? `${fmt(n)} AED` : `${fmt(n)} درهم`;

  const donationProjects = isEn ? {
    zakat:["Zakat channels","Family support","Medical aid","Student support"],
    sadaqah:["General Sadaqah","Water projects","Family support","Orphan sponsorship"],
    waqf:["Education Waqf","Health Waqf","Charitable housing Waqf","Relief Waqf"],
    relief:["Urgent food relief","Emergency shelter","Ramadan baskets","Urgent medical support"]
  } : {
    zakat:["مصارف الزكاة","دعم الأسر المتعففة","علاج مرضى مستحقين","دعم طلبة العلم"],
    sadaqah:["صدقة عامة","سقيا الماء","دعم الأسر المتعففة","كفالة يتيم"],
    waqf:["وقف تعليمي","وقف صحي","وقف إسكان خيري","وقف إغاثي"],
    relief:["إغاثة غذائية عاجلة","إيواء طارئ","سلال رمضانية","مساعدات صحية عاجلة"]
  };

  const impactTemplates = isEn ? {
    zakat:(a)=>`${money(a)} supports an eligible Zakat path with clear project linkage`,
    sadaqah:(a)=>`${money(a)} contributes to a humanitarian need within a defined project`,
    waqf:(a)=>`${money(a)} contributes to a sustainable endowment with renewed impact`,
    relief:(a)=>`${money(a)} supports urgent humanitarian response based on priority needs`
  } : {
    zakat:(a)=>`${fmt(a)} درهم تسهم في دعم حالة مستحقة ضمن مسار زكاة موثق`,
    sadaqah:(a)=>`${fmt(a)} درهم تسهم في دعم حاجة إنسانية ضمن مشروع محدد`,
    waqf:(a)=>`${fmt(a)} درهم تساهم في أصل وقفي مستدام يعود أثره بشكل متجدد`,
    relief:(a)=>`${fmt(a)} درهم تدعم استجابة إغاثية عاجلة وفق الأولويات الإنسانية`
  };

  const projects = isEn ? [
    {title:"Student Support",cat:"education",type:"sadaqah",target:350000,raised:214000,beneficiaries:420},
    {title:"Medical Aid",cat:"health",type:"zakat",target:500000,raised:385000,beneficiaries:95},
    {title:"Water Projects",cat:"sadaqah",type:"sadaqah",target:260000,raised:170000,beneficiaries:6300},
    {title:"Orphan Sponsorship",cat:"sadaqah",type:"sadaqah",target:420000,raised:315000,beneficiaries:180},
    {title:"Urgent Relief",cat:"relief",type:"relief",target:800000,raised:576000,beneficiaries:12400},
    {title:"Education Waqf",cat:"waqf",type:"waqf",target:1200000,raised:780000,beneficiaries:1500}
  ] : [
    {title:"دعم طالب علم",cat:"education",type:"sadaqah",target:350000,raised:214000,beneficiaries:420},
    {title:"علاج مريض",cat:"health",type:"zakat",target:500000,raised:385000,beneficiaries:95},
    {title:"سقيا الماء",cat:"sadaqah",type:"sadaqah",target:260000,raised:170000,beneficiaries:6300},
    {title:"كفالة يتيم",cat:"sadaqah",type:"sadaqah",target:420000,raised:315000,beneficiaries:180},
    {title:"إغاثة عاجلة",cat:"relief",type:"relief",target:800000,raised:576000,beneficiaries:12400},
    {title:"وقف تعليمي",cat:"waqf",type:"waqf",target:1200000,raised:780000,beneficiaries:1500}
  ];

  const waqfs = isEn ? [
    {title:"Education Waqf",income:920,expense:310,status:"Productive",badge:"badge-productive"},
    {title:"Health Waqf",income:760,expense:420,status:"Needs improvement",badge:"badge-improve"},
    {title:"Housing Waqf",income:1100,expense:690,status:"Developing",badge:"badge-develop"},
    {title:"Relief Waqf",income:640,expense:230,status:"Productive",badge:"badge-productive"}
  ] : [
    {title:"وقف تعليمي",income:920,expense:310,status:"منتج",badge:"badge-productive"},
    {title:"وقف صحي",income:760,expense:420,status:"يحتاج تحسين",badge:"badge-improve"},
    {title:"وقف إسكان خيري",income:1100,expense:690,status:"قيد التطوير",badge:"badge-develop"},
    {title:"وقف إغاثي",income:640,expense:230,status:"منتج",badge:"badge-productive"}
  ];

  const news = isEn ? [
    {date:"06/23/2026",tag:"Community initiatives",title:"Dar Al Ber supports Mohammed Bin Rashid Housing Establishment’s community initiatives",desc:"Community initiative news can be presented with related giving paths and impact indicators."},
    {date:"05/12/2026",tag:"Udhiyah campaign",title:"Dar Al Ber launches 2026 Udhiyah campaign, A Rite and a Mercy",desc:"Seasonal campaigns can be connected to targets, giving journeys, and post-campaign impact reports."},
    {date:"01/21/2026",tag:"Ramadan",title:"Dar Al Ber launches Ramadan campaign for 1447 AH – 2026",desc:"Ramadan campaigns can have dedicated pages with progress, channels, and impact."},
    {date:"01/07/2026",tag:"Education",title:"Al Ber Quran Memorization Project benefits 4,262 students in 2025",desc:"Education news can be linked to beneficiary indicators and donor reports."}
  ] : [
    {date:"06/23/2026",tag:"مبادرات مجتمعية",title:"دار البر تدعم مبادرات مؤسسة محمد بن راشد للإسكان خلال عام الأسرة",desc:"يمكن عرض أخبار المبادرات المجتمعية وربطها بمسارات العطاء ومؤشرات الأثر."},
    {date:"05/12/2026",tag:"حملة الأضاحي",title:"دار البر تطلق حملة الأضاحي 2026 «شعيرة ورحمة»",desc:"الحملات الموسمية يمكن ربطها بالأهداف والتقدم وتقارير ما بعد الحملة."},
    {date:"01/21/2026",tag:"رمضان",title:"دار البر تطلق حملتها الرمضانية لعام 1447هـ - 2026",desc:"صفحات الحملات الرمضانية يمكن أن تعرض القنوات والمستهدفات والأثر."},
    {date:"01/07/2026",tag:"تعليم",title:"مشروع البر لتحفيظ القرآن يخدم 4,262 طالباً في 2025",desc:"الأخبار التعليمية يمكن ربطها بمؤشرات المستفيدين والتقارير."}
  ];

  const policies = isEn ? [
    {title:"Privacy Policy",desc:"Clear handling of donor and beneficiary data."},
    {title:"Terms and Conditions",desc:"User expectations, official giving channels, and platform use."},
    {title:"Information Technology Policy",desc:"Security, confidentiality, integrity, and availability of information."},
    {title:"Quality Policy",desc:"Service quality, roles, responsibilities, and resources."},
    {title:"Innovation Policy",desc:"Developing community, charitable, humanitarian, and cultural services."},
    {title:"Asset Management Policy",desc:"Connecting assets and waqf sustainability to measurable benefit."}
  ] : [
    {title:"سياسة الخصوصية",desc:"توضيح التعامل مع بيانات المتبرعين والمستفيدين."},
    {title:"الشروط والأحكام",desc:"توقعات المستخدم وقنوات العطاء الرسمية واستخدام المنصة."},
    {title:"سياسة تقنية المعلومات",desc:"حماية سرية وسلامة وتوافر المعلومات."},
    {title:"سياسة الجودة",desc:"جودة الخدمات والصلاحيات والمسؤوليات والموارد."},
    {title:"سياسة الابتكار",desc:"تطوير الخدمات المجتمعية والخيرية والإنسانية والثقافية."},
    {title:"سياسة إدارة الأصول",desc:"ربط الأصول واستدامة الوقف بالمنفعة القابلة للقياس."}
  ];

  function setProjectOptions() {
    const type = $("#donType")?.value;
    const projectSelect = $("#donProject");
    if (!type || !projectSelect) return;
    projectSelect.innerHTML = "";
    donationProjects[type].forEach(p => {
      const option = document.createElement("option");
      option.value = p; option.textContent = p;
      projectSelect.appendChild(option);
    });
    updateImpactText();
  }

  function updateImpactText() {
    const type = $("#donType")?.value || "sadaqah";
    const amount = Math.max(0, Number($("#donAmount")?.value) || 0);
    $("#impactText").textContent = impactTemplates[type](amount);
  }

  function renderWaqf() {
    const grid = $("#waqfGrid"); if (!grid) return; grid.innerHTML = "";
    waqfs.forEach(w => {
      const net = w.income - w.expense;
      grid.insertAdjacentHTML("beforeend", `<article class="waqf-card reveal"><h3>${w.title}<span class="badge ${w.badge}">${w.status}</span></h3><div class="waqf-line"><span>${isEn?"Annual income":"دخل سنوي"}</span><strong>${fmt(w.income)}K AED</strong></div><div class="waqf-line"><span>${isEn?"Operations & maintenance":"تشغيل وصيانة"}</span><strong>${fmt(w.expense)}K AED</strong></div><div class="waqf-line waqf-net-line"><span>${isEn?"Net impact":"صافي الأثر"}</span><strong>${fmt(net)}K AED</strong></div></article>`);
    });
  }

  function renderProjects() {
    const grid = $("#projectGrid"); if (!grid) return; grid.innerHTML = "";
    projects.forEach(p => {
      const pct = Math.round((p.raised / p.target) * 100);
      grid.insertAdjacentHTML("beforeend", `<article class="project-card reveal" data-filter="${p.cat} ${p.type}"><div class="project-top"><h3>${p.title}</h3><span class="badge badge-soft">${p.type}</span></div><div class="project-nums"><span>${isEn?"Raised":"المحصل"}</span><strong>${money(p.raised)}</strong></div><div class="progress" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" data-progress="${pct}"></div></div><div class="project-nums"><span>${isEn?"Target":"المستهدف"}</span><strong>${money(p.target)}</strong></div><div class="project-benef"><span>${isEn?"Beneficiaries":"المستفيدون"}</span><strong>${fmt(p.beneficiaries)}</strong></div><button class="btn btn-green" data-donate-type="${p.type}">${isEn?"Contribute":"ساهم الآن"}</button></article>`);
    });
  }

  function renderNews() {
    const grid = $("#newsGrid"); if (!grid) return; grid.innerHTML = "";
    news.forEach(n => {
      grid.insertAdjacentHTML("beforeend", `<article class="news-card reveal"><div class="news-top"><span class="news-date">${n.date}</span><span class="badge badge-soft">${n.tag}</span></div><h3>${n.title}</h3><p>${n.desc}</p><a class="btn btn-green" href="#news">${isEn?"Read more":"قراءة المزيد"}</a></article>`);
    });
  }

  function renderPolicies() {
    const grid = $("#policyGrid"); if (!grid) return; grid.innerHTML = "";
    policies.forEach(p => grid.insertAdjacentHTML("beforeend", `<article class="policy-card reveal"><h3>${p.title}</h3><p>${p.desc}</p></article>`));
  }

  function renderCharts() {
    const charts = [
      ["#distChart", isEn ? [["Zakat",34],["Sadaqah",28],["Waqf",22],["Relief",16]] : [["زكاة",34],["صدقات",28],["أوقاف",22],["إغاثة",16]]],
      ["#progChart", isEn ? [["Completed",72],["In progress",54],["New",28]] : [["مكتملة",72],["قيد التنفيذ",54],["جديدة",28]]],
      ["#waqfChart", isEn ? [["Education",610],["Health",340],["Housing",410],["Relief",410]] : [["تعليمي",610],["صحي",340],["إسكان",410],["إغاثي",410]]]
    ];
    charts.forEach(([sel, data]) => {
      const el = $(sel); if (!el) return; el.innerHTML = "";
      const max = Math.max(...data.map(d => d[1]));
      data.forEach(d => {
        const pct = Math.round((d[1] / max) * 100);
        el.insertAdjacentHTML("beforeend", `<div><div class="bar-top"><span>${d[0]}</span><strong>${d[1]}${sel === "#waqfChart" ? "K" : "%"}</strong></div><div class="progress"><div class="progress-fill" data-progress="${pct}"></div></div></div>`);
      });
    });
  }

  function animateProgressBars(){ $$(".progress-fill").forEach(bar => requestAnimationFrame(() => { bar.style.width = (bar.dataset.progress || 0) + "%"; })); }

  function initCounters(){
    const counters = $$("[data-count]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target, target = Number(el.dataset.count), decimals = Number(el.dataset.decimals || 0), useComma = el.dataset.format === "comma";
        let start = null; const duration = 1200;
        function tick(ts){ if(!start) start = ts; const progress = Math.min((ts-start)/duration,1); const value = target*progress; el.textContent = useComma ? fmt(Math.round(value)) : value.toFixed(decimals); if(progress<1) requestAnimationFrame(tick); else el.textContent = useComma ? fmt(Math.round(target)) : target.toFixed(decimals); }
        requestAnimationFrame(tick); io.unobserve(el);
      });
    }, { threshold:.3 });
    counters.forEach(c => io.observe(c));
  }

  function initReveal(){
    const io = new IntersectionObserver(entries => entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add("is-visible"); if(entry.target.id==="journeyTrack" || entry.target.id==="waqfLifecycle") entry.target.classList.add("is-drawn"); io.unobserve(entry.target); }
    }), { threshold:.15 });
    $$(".reveal, #journeyTrack, #waqfLifecycle").forEach(el => io.observe(el));
  }

  function initNav(){
    const header = $("#siteHeader"), menu = $("#mainNav"), toggle = $("#menuToggle");
    window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 10));
    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link").forEach(link => link.addEventListener("click", () => { menu.classList.remove("is-open"); toggle?.classList.remove("is-open"); }));
    const obs = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      $$(".nav-link").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
    }), { rootMargin:"-45% 0px -45% 0px", threshold:0 });
    $$("main section[id]").forEach(s => obs.observe(s));
  }

  function initDonationForm(){
    const form = $("#donateForm"); if (!form) return;
    $("#donType").addEventListener("change", setProjectOptions);
    $("#donAmount").addEventListener("input", updateImpactText);
    $$(".chip").forEach(chip => chip.addEventListener("click", () => {
      $$(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active"); $("#donAmount").value = chip.dataset.amount; updateImpactText();
    }));
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-donate-type]"); if (!btn) return;
      const type = btn.dataset.donateType;
      if ($("#donType") && donationProjects[type]) { $("#donType").value = type; setProjectOptions(); location.hash = "#donate"; }
    });
    let donationCounter = 2, portalTotal = 1500, portalCount = 3;
    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = $("#donEmail");
      if (!email.checkValidity()) { email.classList.add("is-invalid"); email.focus(); return; }
      email.classList.remove("is-invalid");
      const amount = Number($("#donAmount").value) || 0, typeText = $("#donType").selectedOptions[0].textContent, projectText = $("#donProject").value, trackId = "DAB-2026-" + String(donationCounter++).padStart(4, "0");
      $("#modalTrackId").textContent = trackId; $("#modalSummary").textContent = `${typeText} · ${projectText} · ${money(amount)}`; $("#modalBackdrop").hidden = false;
      portalTotal += amount; portalCount += 1; $("#portalTotal").textContent = money(portalTotal); $("#portalCount").textContent = fmt(portalCount);
      $("#portalList").insertAdjacentHTML("afterbegin", `<li><div><strong>${trackId}</strong><span class="badge badge-progress">${isEn?"In progress":"قيد التنفيذ"}</span></div><span>${isEn?"Tracking ID created and linked to demo impact path":"تم إنشاء رقم تتبع وربط التبرع بمسار الأثر التجريبي"}</span><em>${typeText} · ${money(amount)}</em></li>`);
    });
  }

  function initModal(){
    const close = () => { $("#modalBackdrop").hidden = true; };
    $("#modalClose")?.addEventListener("click", close);
    $("#modalTrackLink")?.addEventListener("click", close);
    $("#modalBackdrop")?.addEventListener("click", e => { if (e.target.id === "modalBackdrop") close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modalBackdrop")?.hidden) close(); });
  }

  function initZakat(){
    const input = $("#zakatInput"), result = $("#zakatResult");
    input?.addEventListener("input", () => { const due = Math.max(0, Number(input.value) || 0) * .025; result.textContent = isEn ? `${fmt(due,{maximumFractionDigits:2})} AED` : `${fmt(due,{maximumFractionDigits:2})} درهم`; });
    $("#zakatPayBtn")?.addEventListener("click", () => { $("#donType").value = "zakat"; $("#donAmount").value = Math.max(10, Math.round((Number(input.value) || 0) * .025)); setProjectOptions(); location.hash = "#donate"; });
  }

  function initFilters(){ $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => { $$(".filter-btn").forEach(b => b.classList.remove("is-active")); btn.classList.add("is-active"); const filter = btn.dataset.filter; $$(".project-card", $("#projectGrid")).forEach(card => card.classList.toggle("is-hidden", filter !== "all" && !card.dataset.filter.includes(filter))); })); }
  function initBeneficiaryForm(){ $("#benefForm")?.addEventListener("submit", e => { e.preventDefault(); if(!e.currentTarget.checkValidity()){ e.currentTarget.reportValidity(); return; } $("#benefSuccess").hidden = false; }); }

  renderWaqf(); renderProjects(); renderNews(); renderPolicies(); renderCharts(); setProjectOptions();
  initNav(); initReveal(); initCounters(); animateProgressBars(); initDonationForm(); initModal(); initZakat(); initFilters(); initBeneficiaryForm();
  setTimeout(animateProgressBars, 500);
});

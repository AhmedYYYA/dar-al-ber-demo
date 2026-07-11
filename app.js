/* Dar Al Ber Society — Demo interactions V2 */
document.addEventListener("DOMContentLoaded", () => {
  document.body.classList.remove("preload");

  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
  const fmt = (n, options = {}) => Number(n).toLocaleString("en-US", options);
  const money = (n) => `${fmt(n)} AED`;

  const donationProjects = {
    zakat: ["مصارف الزكاة", "دعم الأسر المتعففة", "علاج مرضى مستحقين", "دعم طلبة العلم"],
    sadaqah: ["صدقة عامة", "سقيا الماء", "دعم الأسر المتعففة", "كفالة يتيم"],
    waqf: ["وقف تعليمي", "وقف صحي", "وقف إسكان خيري", "وقف إغاثي"],
    relief: ["إغاثة غذائية عاجلة", "إيواء طارئ", "سلال رمضانية", "مساعدات صحية عاجلة"]
  };

  const impactTemplates = {
    zakat: (amount) => `${fmt(amount)} درهم تسهم في دعم حالة مستحقة ضمن مسار زكاة موثق`,
    sadaqah: (amount) => `${fmt(amount)} درهم توفر دعماً مباشراً لحاجة إنسانية ضمن مشروع محدد`,
    waqf: (amount) => `${fmt(amount)} درهم تساهم في أصل وقفي مستدام يعود أثره بشكل متجدد`,
    relief: (amount) => `${fmt(amount)} درهم تدعم استجابة إغاثية عاجلة وفق الأولويات الإنسانية`
  };

  const categories = [
    { title: "زكاة المال", type: "zakat", desc: "مسار منفصل للزكاة مع توثيق الأثر.", amt: 100 },
    { title: "صدقة عامة", type: "sadaqah", desc: "مساهمة مرنة حيث تشتد الحاجة.", amt: 50 },
    { title: "الوقف الخيري", type: "waqf", desc: "أصل مستدام وأثر متجدد.", amt: 500 },
    { title: "حفر الآبار", type: "sadaqah", desc: "مشاريع سقيا الماء والتنمية.", amt: 200 },
    { title: "كفالة الأيتام", type: "sadaqah", desc: "رعاية مستمرة تحفظ الكرامة.", amt: 300 },
    { title: "مشاريع صحية", type: "zakat", desc: "علاج الحالات المستحقة.", amt: 250 },
    { title: "مشاريع تعليمية", type: "sadaqah", desc: "دعم طلبة العلم والمبادرات التعليمية.", amt: 150 },
    { title: "إغاثة عاجلة", type: "relief", desc: "استجابة إنسانية سريعة.", amt: 100 }
  ];

  const projects = [
    { title: "دعم طالب علم", cat: "education", type: "sadaqah", target: 350000, raised: 214000, beneficiaries: 420 },
    { title: "علاج مريض", cat: "health", type: "zakat", target: 500000, raised: 385000, beneficiaries: 95 },
    { title: "سقيا الماء", cat: "sadaqah", type: "sadaqah", target: 260000, raised: 170000, beneficiaries: 6300 },
    { title: "كفالة يتيم", cat: "sadaqah", type: "sadaqah", target: 420000, raised: 315000, beneficiaries: 180 },
    { title: "إغاثة عاجلة", cat: "relief", type: "relief", target: 800000, raised: 576000, beneficiaries: 12400 },
    { title: "وقف تعليمي", cat: "waqf", type: "waqf", target: 1200000, raised: 780000, beneficiaries: 1500 }
  ];

  const waqfs = [
    { title: "وقف تعليمي", income: 920, expense: 310, status: "منتج", badge: "badge-productive" },
    { title: "وقف صحي", income: 760, expense: 420, status: "يحتاج تحسين", badge: "badge-improve" },
    { title: "وقف إسكان خيري", income: 1100, expense: 690, status: "قيد التطوير", badge: "badge-develop" },
    { title: "وقف إغاثي", income: 640, expense: 230, status: "منتج", badge: "badge-productive" }
  ];

  const news = [
    { date: "06/23/2026", tag: "مبادرات مجتمعية", title: "دار البر تدعم مبادرات مؤسسة محمد بن راشد للإسكان خلال عام الأسرة", desc: "عرض حديث يمكن أن يربط الخبر بالمشاريع والمساهمات المجتمعية ذات الصلة." },
    { date: "06/26/2026", tag: "دعم مؤسسي", title: "دار البر تتلقى دعماً مالياً من دبي الإسلامي بقيمة 2 مليون درهم", desc: "يمكن تحويل الأخبار المؤسسية إلى مؤشرات ثقة وتعاون وشراكات." },
    { date: "01/21/2026", tag: "رمضان", title: "دار البر تطلق حملتها الرمضانية لعام 1447هـ - 2026", desc: "نموذج لصفحات حملات موسمية مع أهداف ومؤشرات وتقارير أثر." },
    { date: "01/07/2026", tag: "تعليم", title: "مشروع البر لتحفيظ القرآن يحقق إنجازات ويخدم 4,262 طالباً", desc: "الأخبار التعليمية يمكن ربطها بلوحة أثر ومؤشرات مستفيدين." }
  ];

  const policies = [
    { title: "سياسة الخصوصية", desc: "بيان واضح لكيفية حماية بيانات المتبرعين والمستفيدين." },
    { title: "الشروط والأحكام", desc: "إطار استخدام المنصة وقنوات التبرع الرسمية." },
    { title: "سياسة تقنية المعلومات", desc: "ضمان سرية وسلامة وتوافر المعلومات وفق ضوابط الوصول." },
    { title: "سياسة الجودة", desc: "رفع جودة الخدمات وتوضيح الصلاحيات والأدوار والموارد." },
    { title: "سياسة الابتكار", desc: "تطوير الخدمات المجتمعية والخيرية والإنسانية بما يتجاوز توقعات المعنيين." },
    { title: "سياسة إدارة الأصول", desc: "ربط الأصول والوقف والاستدامة المالية بمفهوم صافي الأثر." }
  ];

  function renderCategories() {
    const grid = document.createElement("div");
    grid.className = "cat-grid hidden-generated";
    categories.forEach(c => {
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.innerHTML = `
        <div class="project-top"><h3>${c.title}</h3><span class="badge badge-soft">${c.type}</span></div>
        <p>${c.desc}</p>
        <div class="project-benef"><span>مبلغ مقترح</span><strong>${money(c.amt)}</strong></div>
        <button class="btn btn-green" data-donate-type="${c.type}" data-amount="${c.amt}">اختر هذا المسار</button>
      `;
      grid.appendChild(card);
    });
    const strategy = $("#strategy .strategy-cards");
    if (strategy && !$(".hidden-generated")) strategy.appendChild(grid);
  }

  function setProjectOptions() {
    const type = $("#donType").value;
    const projectSelect = $("#donProject");
    projectSelect.innerHTML = "";
    donationProjects[type].forEach(p => {
      const option = document.createElement("option");
      option.value = p;
      option.textContent = p;
      projectSelect.appendChild(option);
    });
    updateImpactText();
  }

  function updateImpactText() {
    const type = $("#donType").value;
    const amount = Math.max(0, Number($("#donAmount").value) || 0);
    $("#impactText").textContent = impactTemplates[type](amount);
  }

  function renderWaqf() {
    const grid = $("#waqfGrid");
    if (!grid) return;
    grid.innerHTML = "";
    waqfs.forEach(w => {
      const net = w.income - w.expense;
      const card = document.createElement("article");
      card.className = "waqf-card reveal";
      card.innerHTML = `
        <h3>${w.title}<span class="badge ${w.badge}">${w.status}</span></h3>
        <div class="waqf-line"><span>دخل سنوي</span><strong>${fmt(w.income)}K AED</strong></div>
        <div class="waqf-line"><span>تشغيل وصيانة</span><strong>${fmt(w.expense)}K AED</strong></div>
        <div class="waqf-line waqf-net-line"><span>صافي الأثر</span><strong>${fmt(net)}K AED</strong></div>
      `;
      grid.appendChild(card);
    });
  }

  function renderProjects() {
    const grid = $("#projectGrid");
    if (!grid) return;
    grid.innerHTML = "";
    projects.forEach(p => {
      const pct = Math.round((p.raised / p.target) * 100);
      const card = document.createElement("article");
      card.className = "project-card reveal";
      card.dataset.filter = `${p.cat} ${p.type}`;
      card.innerHTML = `
        <div class="project-top"><h3>${p.title}</h3><span class="badge badge-soft">${p.type}</span></div>
        <div class="project-nums"><span>المحصل</span><strong>${money(p.raised)}</strong></div>
        <div class="progress" role="progressbar" aria-label="نسبة الإنجاز ${pct}%" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><div class="progress-fill" data-progress="${pct}"></div></div>
        <div class="project-nums"><span>المستهدف</span><strong>${money(p.target)}</strong></div>
        <div class="project-benef"><span>المستفيدون</span><strong>${fmt(p.beneficiaries)}</strong></div>
        <button class="btn btn-green" data-donate-type="${p.type}">ساهم الآن</button>
      `;
      grid.appendChild(card);
    });
  }

  function renderNews() {
    const grid = $("#newsGrid");
    if (!grid) return;
    grid.innerHTML = "";
    news.forEach(n => {
      const card = document.createElement("article");
      card.className = "news-card reveal";
      card.innerHTML = `
        <div class="news-top"><span class="news-date">${n.date}</span><span class="badge badge-soft">${n.tag}</span></div>
        <h3>${n.title}</h3>
        <p>${n.desc}</p>
        <a class="btn btn-green" href="#news">قراءة المزيد</a>
      `;
      grid.appendChild(card);
    });
  }

  function renderPolicies() {
    const grid = $("#policyGrid");
    if (!grid) return;
    grid.innerHTML = "";
    policies.forEach(p => {
      const card = document.createElement("article");
      card.className = "policy-card reveal";
      card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p>`;
      grid.appendChild(card);
    });
  }

  function renderCharts() {
    const charts = [
      ["#distChart", [["زكاة", 34], ["صدقات", 28], ["أوقاف", 22], ["إغاثة", 16]]],
      ["#progChart", [["مكتملة", 72], ["قيد التنفيذ", 54], ["جديدة", 28]]],
      ["#waqfChart", [["تعليمي", 610], ["صحي", 340], ["إسكان", 410], ["إغاثي", 410]]]
    ];
    charts.forEach(([sel, data]) => {
      const el = $(sel);
      if (!el) return;
      el.innerHTML = "";
      const max = Math.max(...data.map(d => d[1]));
      data.forEach(d => {
        const pct = Math.round((d[1] / max) * 100);
        const row = document.createElement("div");
        row.innerHTML = `
          <div class="bar-top"><span>${d[0]}</span><strong>${d[1]}${sel === "#waqfChart" ? "K" : "%"}</strong></div>
          <div class="progress"><div class="progress-fill" data-progress="${pct}"></div></div>
        `;
        el.appendChild(row);
      });
    });
  }

  function initCounters() {
    const counters = $$("[data-count]");
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = Number(el.dataset.count);
        const decimals = Number(el.dataset.decimals || 0);
        const useComma = el.dataset.format === "comma";
        let start = null;
        const duration = 1200;
        function tick(ts) {
          if (!start) start = ts;
          const progress = Math.min((ts - start) / duration, 1);
          const value = target * progress;
          el.textContent = useComma ? fmt(Math.round(value)) : value.toFixed(decimals);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = useComma ? fmt(Math.round(target)) : target.toFixed(decimals);
        }
        requestAnimationFrame(tick);
        io.unobserve(el);
      });
    }, { threshold: 0.3 });
    counters.forEach(c => io.observe(c));
  }

  function animateProgressBars() {
    $$(".progress-fill").forEach(bar => {
      const width = bar.dataset.progress || 0;
      requestAnimationFrame(() => { bar.style.width = width + "%"; });
    });
  }

  function initReveal() {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          if (entry.target.id === "journeyTrack" || entry.target.id === "waqfLifecycle") entry.target.classList.add("is-drawn");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    $$(".reveal, #journeyTrack, #waqfLifecycle").forEach(el => io.observe(el));
  }

  function initNav() {
    const header = $("#siteHeader");
    const menu = $("#mainNav");
    const toggle = $("#menuToggle");
    window.addEventListener("scroll", () => header.classList.toggle("is-scrolled", window.scrollY > 10));
    toggle?.addEventListener("click", () => {
      const open = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    $$(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        menu.classList.remove("is-open");
        toggle?.classList.remove("is-open");
      });
    });

    const sections = $$("main section[id]");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        $$(".nav-link").forEach(a => a.classList.toggle("is-active", a.getAttribute("href") === "#" + entry.target.id));
      });
    }, { rootMargin: "-45% 0px -45% 0px", threshold: 0 });
    sections.forEach(s => obs.observe(s));
  }

  function initDonationForm() {
    const form = $("#donateForm");
    if (!form) return;
    $("#donType").addEventListener("change", setProjectOptions);
    $("#donAmount").addEventListener("input", updateImpactText);
    $$(".chip").forEach(chip => chip.addEventListener("click", () => {
      $$(".chip").forEach(c => c.classList.remove("is-active"));
      chip.classList.add("is-active");
      $("#donAmount").value = chip.dataset.amount;
      updateImpactText();
    }));
    document.addEventListener("click", e => {
      const btn = e.target.closest("[data-donate-type]");
      if (!btn) return;
      const type = btn.dataset.donateType;
      if ($("#donType") && donationProjects[type]) {
        $("#donType").value = type;
        if (btn.dataset.amount) $("#donAmount").value = btn.dataset.amount;
        setProjectOptions();
      }
    });

    let donationCounter = 2;
    let portalTotal = 1500;
    let portalCount = 3;

    form.addEventListener("submit", e => {
      e.preventDefault();
      const email = $("#donEmail");
      if (!email.checkValidity()) {
        email.classList.add("is-invalid");
        email.focus();
        return;
      }
      email.classList.remove("is-invalid");

      const amount = Number($("#donAmount").value) || 0;
      const typeText = $("#donType").selectedOptions[0].textContent;
      const projectText = $("#donProject").value;
      const trackId = "DAB-2026-" + String(donationCounter++).padStart(4, "0");

      $("#modalTrackId").textContent = trackId;
      $("#modalSummary").textContent = `${typeText} · ${projectText} · ${money(amount)}`;
      $("#modalBackdrop").hidden = false;

      portalTotal += amount;
      portalCount += 1;
      $("#portalTotal").textContent = money(portalTotal);
      $("#portalCount").textContent = fmt(portalCount);
      const item = document.createElement("li");
      item.innerHTML = `
        <div><strong>${trackId}</strong><span class="badge badge-progress">قيد التنفيذ</span></div>
        <span>تم إنشاء رقم تتبع وربط التبرع بمسار الأثر التجريبي</span>
        <em>${typeText} · ${money(amount)}</em>
      `;
      $("#portalList").prepend(item);
    });
  }

  function initModal() {
    const close = () => { $("#modalBackdrop").hidden = true; };
    $("#modalClose")?.addEventListener("click", close);
    $("#modalTrackLink")?.addEventListener("click", close);
    $("#modalBackdrop")?.addEventListener("click", e => { if (e.target.id === "modalBackdrop") close(); });
    document.addEventListener("keydown", e => { if (e.key === "Escape" && !$("#modalBackdrop")?.hidden) close(); });
  }

  function initZakat() {
    const input = $("#zakatInput");
    const result = $("#zakatResult");
    input?.addEventListener("input", () => {
      const wealth = Math.max(0, Number(input.value) || 0);
      const due = wealth * 0.025;
      result.textContent = `${fmt(due, { maximumFractionDigits: 2 })} درهم`;
    });
    $("#zakatPayBtn")?.addEventListener("click", () => {
      $("#donType").value = "zakat";
      $("#donAmount").value = Math.max(10, Math.round((Number(input.value) || 0) * 0.025));
      setProjectOptions();
      location.hash = "#donate";
    });
  }

  function initFilters() {
    $$(".filter-btn").forEach(btn => btn.addEventListener("click", () => {
      $$(".filter-btn").forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const filter = btn.dataset.filter;
      $$(".project-card", $("#projectGrid")).forEach(card => {
        card.classList.toggle("is-hidden", filter !== "all" && !card.dataset.filter.includes(filter));
      });
    }));
  }

  function initBeneficiaryForm() {
    $("#benefForm")?.addEventListener("submit", e => {
      e.preventDefault();
      const form = e.currentTarget;
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      $("#benefSuccess").hidden = false;
    });
  }

  function initLangSwitch() {
    $("#langSwitch")?.addEventListener("click", () => {
      alert("This executive demo is Arabic-first. English version can be added as a second release.");
    });
  }

  renderCategories();
  renderWaqf();
  renderProjects();
  renderNews();
  renderPolicies();
  renderCharts();
  setProjectOptions();
  initNav();
  initReveal();
  initCounters();
  animateProgressBars();
  initDonationForm();
  initModal();
  initZakat();
  initFilters();
  initBeneficiaryForm();
  initLangSwitch();

  setTimeout(animateProgressBars, 600);
});

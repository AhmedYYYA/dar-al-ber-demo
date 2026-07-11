# Dar Al Ber Society — Digital Humanitarian Platform (Demo)
# جمعية دار البر — منصة رقمية إنسانية (نموذج تجريبي)

**From Donation to Impact — من التبرع إلى الأثر**

A premium, Arabic-first (RTL) static website prototype demonstrating how Dar Al Ber Society could evolve from a traditional charity website into a modern digital humanitarian platform: donations, zakat, sadaqah, waqf, urgent relief, beneficiary services, a donor portal, donation-to-impact tracking, waqf asset lifecycle, impact dashboards, and governance/transparency — all as a **frontend concept demo**.

> **This is an unofficial design concept for presentation purposes only.** It is not affiliated with, endorsed by, or produced by Dar Al Ber Society. All figures, campaigns, and names are illustrative demo data. No real payments are processed. No data is collected or stored.

---

## 1. File structure

```
├── index.html      # Single-page site: all sections, semantic HTML, ARIA
├── styles.css      # Design system (CSS variables), RTL-first, responsive, reduced-motion
├── app.js          # Demo data, rendering, reactivity, i18n (AR/EN), animations
├── README.md
└── assets/
    └── logo.png    # Approved logo (used as-is, web-optimized)
```

## 2. How to run locally

Open `index.html` in any modern browser. No build tools, no npm, no server required.
(Google Fonts are loaded from CDN with full system-font fallbacks, so the site remains usable offline.)

## 3. How to deploy to GitHub Pages

1. Create a repository (e.g. `dar-al-ber-demo`) and push these files to the root of the `main` branch.
2. Repository → **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / root.
3. The site will be live at `https://<username>.github.io/dar-al-ber-demo/`.

All asset paths are relative, so the demo works from any subpath.

## 4. What the demo includes

| Area | Demonstrated as |
|---|---|
| Smart donation form | Reactive: type → projects, amount → expected impact, validation, success modal with tracking ID |
| Donation-to-impact journey | 8-step animated tracking timeline (donor → type → project → approval → disbursement → beneficiary → verification → impact report) |
| Zakat | Dedicated section + instant 2.5% calculator with guidance disclaimer |
| Sadaqah | Six respectful giving formats (one-time, monthly, parents, deceased, general, campaign) |
| Waqf | Lifecycle timeline (8 stages), net-impact formula, asset cards with income/expenses/net impact/status |
| Projects & campaigns | Filterable cards (all/zakat/sadaqah/waqf/relief/education/health) with progress bars and beneficiary counts |
| Urgent relief | Emergency campaign card with progress and careful, dignified wording |
| Beneficiary services | 5-step dignified journey + demo application form (no storage) |
| Impact dashboard | Animated counters + CSS bar charts (distribution, completion, waqf net impact) |
| Donor portal | Live demo: submitting a donation adds a new tracked entry (DAB-2026-XXXX) instantly |
| Governance | 8 governance pillars, official-channels warning, digital trust architecture |
| Bilingual | Arabic-first RTL with a full AR ⇄ EN switcher (layout direction flips) |

## 5. Demo limitations

- **No backend.** All interactions are simulated in the browser.
- **No real payments.** The payment step is visual only and clearly labeled.
- **No data storage.** Forms do not transmit or persist anything.
- Demo figures (e.g. total donations 48.7M AED, 128,450 beneficiaries) are **illustrative only** and labeled as such on-page.
- The relief campaign is explicitly labeled a demo campaign; no active official campaigns are claimed.

## 6. Suggested next development steps

1. Stakeholder review of the concept with Dar Al Ber leadership and content teams.
2. Content and Sharia review of all zakat/sadaqah/waqf wording with the competent authorities.
3. Information architecture expansion: dedicated pages per project/campaign (SEO landing pages, clean URLs, sitemap).
4. Real brand asset integration (photography guidelines that preserve beneficiary dignity).
5. Accessibility audit (WCAG 2.2 AA) and Arabic screen-reader testing.
6. Analytics instrumentation (privacy-respecting, consent-based) and Core Web Vitals monitoring.
7. Usability testing with elderly donors and mobile-first user groups.

## 7. Suggested future backend modules

- **Donation & payment gateway** integration (licensed UAE payment providers; PCI-DSS scope isolation; Apple Pay/cards/bank transfer).
- **Donation-to-impact tracking engine**: unique reference per donation, linked to project, disbursement, verification, and impact report (auditable event trail).
- **Donor portal**: authenticated accounts, receipts, recurring donation management, impact notifications.
- **Beneficiary case management**: confidential intake, document handling, eligibility workflow, approval routing with mandatory human decision points.
- **Waqf asset management**: income/expense ledgers, maintenance scheduling, mid-life review workflow, net-impact reporting.
- **Campaign management** with permit references and publishing workflow.
- **ERP integration layer** (finance, HR, procurement) and BI/impact dashboards.
- **CMS** for bilingual content governance.

## 8. Cybersecurity & compliance notes

For a production build, apply (concepts referenced in the demo UI):

- **OWASP ASVS / Top 10** secure development; input validation server-side; CSP, HSTS, secure headers.
- **ISO 27001 / NIST CSF / CIS Controls** aligned ISMS; least-privilege access; audit logging (simulated in demo as the "governance record").
- **Privacy by design**: UAE PDPL alignment, data minimization, explicit consent, retention policies; special protection for beneficiary data and dignity.
- **Payment security**: use licensed gateways only; never store card data; display official-channel warnings (already present in the demo).
- **Anti-fraud**: official channels notice, campaign permit references, verifiable receipts.

## 9. Accessibility notes

Implemented in the demo:

- Semantic landmarks, heading hierarchy, skip link, ARIA labels/roles on nav, progress bars, dialogs, and forms.
- Keyboard accessible: all controls focusable, visible focus rings, ESC closes the modal, focus returns to trigger.
- Color contrast targeted at WCAG AA on both light and dark sections.
- `prefers-reduced-motion` respected: animations and smooth scrolling disabled for users who opt out.
- RTL-first layout with logical CSS properties; large touch targets; elderly-friendly font sizes.

## 10. SEO notes

- Arabic-first metadata (title/description/keywords), Open Graph tags, semantic headings, alt text.
- Structure ready for expansion into campaign landing pages, FAQ schema, sitemap.xml, and local UAE/Dubai relevance.

---

**License/attribution:** Demo concept prototype. Logo provided by the project owner and used as-is.

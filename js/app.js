/**
 * app.js — Home, Lecture Topic Reader, and 40-Variant Practical Labs + .ipynb Exporter
 * Exports window.CV_PAGE
 */
(function () {
  const {
    getLang, t, renderChrome, getCompletedTopics, toggleTopicCompleted,
    getQuizScores, getStudentVariant, setStudentVariant,
    INDEPENDENT_PROJECTS, REFERENCES, GLOSSARY_FULL
  } = window.CV_APP;

  function escHtml(str) {
    return String(str ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function renderMathIfReady(el) {
    if (!el || typeof window.renderMathInElement !== 'function') return;
    try {
      window.renderMathInElement(el, {
        delimiters: [
          { left: '$$', right: '$$', display: true },
          { left: '$', right: '$', display: false },
          { left: '\\(', right: '\\)', display: false },
          { left: '\\[', right: '\\]', display: true }
        ],
        throwOnError: false
      });
    } catch (_) {}
  }

  function interpolateTemplate(tpl, rowObj) {
    let out = String(tpl || '');
    if (!rowObj) return out;
    Object.keys(rowObj).forEach((k) => {
      out = out.split(`{${k}}`).join(String(rowObj[k]));
    });
    return out;
  }

  function buildIpynbBlob(lab, variant, l) {
    const v = Math.max(1, Math.min(40, Number(variant) || 1));
    const rowIdx = (v - 1) % 10;
    const title = (lab.title && (lab.title[l] || lab.title.uz)) || '';
    const obj = (lab.objective && (lab.objective[l] || lab.objective.uz)) || '';
    const common = (lab.commonTask && (lab.commonTask[l] || lab.commonTask.uz)) || '';

    const taskLines = (lab.tasks || []).map((tk, idx) => {
      const row = (tk.rows && tk.rows[rowIdx]) || {};
      const tTitle = (tk.title && (tk.title[l] || tk.title.uz)) || `Task ${idx + 1}`;
      const tpl = l === 'uz' ? (tk.tplUz || tk.tplEn) : (tk.tplEn || tk.tplUz);
      return `### ${idx + 1}. ${tTitle}\n- ${interpolateTemplate(tpl, row)}`;
    }).join('\n\n');

    const paramJson = JSON.stringify(
      (lab.tasks || []).map((tk, idx) => ({ task: idx + 1, ...((tk.rows && tk.rows[rowIdx]) || {}) })),
      null,
      2
    );

    const mdLines = [
      `# ${lab.code}: ${title}\n`,
      `**Course:** KOK1506 Computer Vision · **Student Variant:** #${v} (Row #${rowIdx + 1})\n\n`,
      `**Objective:** ${obj}\n\n`,
      `**Common Task (Umumiy topshiriq):** ${common}\n\n`,
      `## Individual Variant #${v} Tasks\n\n`,
      taskLines
    ];

    const codeText =
      `# KOK1506 ${lab.code} — Student Variant #${v} (Row #${rowIdx + 1})\n` +
      `VARIANT_ID = ${v}\n` +
      `ROW_INDEX = ${rowIdx + 1}\n` +
      `VARIANT_PARAMS = ${paramJson}\n\n` +
      (lab.pythonCode || lab.code_py || lab.code || '');

    const stepCells = [];
    (lab.guidedSteps || []).forEach((st, idx) => {
      const sTitle = (st.title && (st.title[l] || st.title.uz)) || `Step ${idx + 1}`;
      const sDesc = (st.desc && (st.desc[l] || st.desc.uz)) || '';
      const sExp = (st.expected && (st.expected[l] || st.expected.uz)) || '';
      stepCells.push({
        cell_type: 'markdown',
        metadata: {},
        source: [`### ${sTitle}\n`, `${sDesc}\n`, sExp ? `\n**Expected:** ${sExp}` : '']
      });
      if (st.code) {
        stepCells.push({
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: st.code.split('\n').map((line, i, arr) => (i < arr.length - 1 ? line + '\n' : line))
        });
      }
    });

    const nb = {
      nbformat: 4,
      nbformat_minor: 5,
      metadata: {
        kernelspec: { display_name: 'Python 3', language: 'python', name: 'python3' },
        language_info: { name: 'python', version: '3.10' }
      },
      cells: [
        { cell_type: 'markdown', metadata: {}, source: mdLines },
        ...stepCells,
        {
          cell_type: 'markdown',
          metadata: {},
          source: [`## Student Variant #${v} Starter Template\n`, taskLines]
        },
        {
          cell_type: 'code',
          execution_count: null,
          metadata: {},
          outputs: [],
          source: codeText.split('\n').map((line, i, arr) => (i < arr.length - 1 ? line + '\n' : line))
        }
      ]
    };

    const blob = new Blob([JSON.stringify(nb, null, 2)], { type: 'application/x-ipynb+json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `KOK1506_${lab.code}_Variant_${v}.ipynb`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function downloadLabNotebook(lab, variant) {
    buildIpynbBlob(lab, variant, getLang());
  }

  /* ──────────────────────────────────────────────────────────────────────────
     1. HOME PAGE (index.html)
     ────────────────────────────────────────────────────────────────────────── */
  function initHomePage() {
    const root = document.getElementById('home-root');
    if (!root) return;

    const topics = window.CV_TOPICS || [];
    const labs = window.CV_LABS || [];
    const bank = window.CV_TESTBANK || [];
    let topicQuery = '';
    let glossaryQuery = '';

    function draw() {
      const l = getLang();
      const completed = getCompletedTopics();
      const scores = getQuizScores();

      const mandatoryTopics = topics.filter((tp) => !tp.isBonus);
      const bonusTopics = topics.filter((tp) => tp.isBonus);
      const doneMandatory = mandatoryTopics.filter((tp) => completed.includes(tp.id)).length;
      const pct = mandatoryTopics.length ? Math.round((doneMandatory / mandatoryTopics.length) * 100) : 0;

      const qLower = topicQuery.trim().toLowerCase();
      const filterTopic = (tp) => {
        if (!qLower) return true;
        const lab = tp.labId ? labs.find((lb) => lb.id === tp.labId) : null;
        const txt = `${tp.code} ${lab ? lab.code : ''} ${tp.title.uz} ${tp.title.en} ${tp.description.uz} ${tp.description.en} ${(tp.keywords || []).join(' ')}`.toLowerCase();
        return txt.includes(qLower);
      };

      const filteredMandatory = mandatoryTopics.filter(filterTopic);
      const filteredBonus = bonusTopics.filter(filterTopic);

      const gLower = glossaryQuery.trim().toLowerCase();
      const filteredGlossary = (GLOSSARY_FULL || []).filter((g) => {
        if (!gLower) return true;
        return `${g.en} ${g.uz} ${g.defUz} ${g.defEn}`.toLowerCase().includes(gLower);
      });

      function renderTopicCard(tp) {
        const isDone = completed.includes(tp.id);
        const linkedLab = tp.labId ? labs.find((lb) => lb.id === tp.labId) : null;
        const sc = scores[`topic_${tp.id}`];
        return `
          <div class="topic-card">
            <div class="topic-card-top">
              <div class="topic-num ${isDone ? 'done' : ''}">${tp.code}</div>
              <div>
                <div class="topic-title">${escHtml(tp.title[l] || tp.title.uz)}</div>
                <div class="topic-subtitle">
                  ${tp.hours} ${t('hoursUnit')}
                  ${linkedLab ? ` · ${linkedLab.code}` : ''}
                  ${tp.isBonus ? ` · <span class="badge badge-bonus">Bonus</span>` : ''}
                  ${sc ? ` · ${sc.score}/${sc.total}` : ''}
                </div>
              </div>
            </div>
            <p class="topic-desc">${escHtml(tp.description[l] || tp.description.uz)}</p>
            <div class="topic-meta">
              ${(tp.keywords || []).slice(0, 4).map((kw) => `<span class="tag">${escHtml(kw)}</span>`).join('')}
            </div>
            <div class="topic-actions">
              <a class="btn btn-primary btn-sm" href="topic.html?id=${tp.id}">${t('btnStudy')}</a>
              <a class="btn btn-secondary btn-sm" href="slides.html?topic=${tp.id}">${t('btnSlides')}</a>
              ${linkedLab ? `<a class="btn btn-secondary btn-sm" href="labs.html?id=${linkedLab.id}">${t('btnLab')} (${linkedLab.code})</a>` : ''}
              <a class="btn btn-secondary btn-sm" href="quiz.html#topic-${tp.id}">${t('btnQuiz')}</a>
            </div>
          </div>`;
      }

      root.innerHTML = `
        <div class="container">
          <section class="hero">
            <span class="hero-badge">🎓 ${t('heroPill')}</span>
            <h1>${t('heroTitle1')} <span>${t('heroTitle2')}</span></h1>
            <p class="hero-subtitle">${t('heroSubtitle')}</p>
            <p class="hero-meta">${t('heroMeta')}</p>
            <div class="hero-actions">
              <a class="btn btn-primary" href="slides.html?topic=1">${t('btnStartSlides')}</a>
              <a class="btn btn-secondary" href="labs.html?id=1">${t('btnOpenLabs')}</a>
              <a class="btn btn-secondary" href="practice.html">${t('btnPractice')}</a>
              <a class="btn btn-emerald" href="quiz.html">${t('btnStartQuiz')}</a>
              <a class="btn btn-secondary" href="Amaliy4.ipynb" download>📓 Amaliy4.ipynb</a>
            </div>

            <div class="stats-grid">
              <div class="stat-card"><div class="stat-value">23 + 1</div><div class="stat-label">${t('statTopics')}</div></div>
              <div class="stat-card"><div class="stat-value">${labs.length} × 40</div><div class="stat-label">${t('statLabs')}</div></div>
              <div class="stat-card"><div class="stat-value">7 + 3</div><div class="stat-label">${t('statPractice')}</div></div>
              <div class="stat-card"><div class="stat-value">${bank.length}+</div><div class="stat-label">${t('statQuestions')}</div></div>
            </div>

            <div class="progress-box">
              <div class="progress-header">
                <span>${t('progressLabel')}</span>
                <span>${doneMandatory} / ${mandatoryTopics.length} ${t('progressTopicsDone')} (${pct}%)</span>
              </div>
              <div class="progress-track"><div class="progress-fill" style="width:${pct}%;"></div></div>
            </div>
          </section>

          <div class="section-header">
            <h2 class="section-title">${t('topicsHeading')}</h2>
            <input type="search" id="home-topic-search" class="search-input" value="${escHtml(topicQuery)}" placeholder="${t('searchPlaceholder')}">
          </div>
          <div class="topics-grid">
            ${filteredMandatory.map(renderTopicCard).join('')}
          </div>

          ${filteredBonus.length ? `
            <div class="section-header" style="margin-top:2.25rem;">
              <h2 class="section-title">${t('bonusHeading')}</h2>
            </div>
            <div class="topics-grid">${filteredBonus.map(renderTopicCard).join('')}</div>
          ` : ''}

          <div class="info-grid">
            <div class="panel">
              <h3>${t('prereqTitle')}</h3>
              <ul style="margin:0;padding-left:1.15rem;display:grid;gap:0.4rem;color:var(--text-secondary);font-size:0.9rem;">
                ${t('prereqs').map((x) => `<li>${escHtml(x)}</li>`).join('')}
              </ul>
            </div>
            <div class="panel">
              <h3>${t('rubricTitle')}</h3>
              <ul style="margin:0;padding-left:1.15rem;display:grid;gap:0.4rem;color:var(--text-secondary);font-size:0.9rem;">
                ${t('rubricItems').map((x) => `<li>${escHtml(x)}</li>`).join('')}
              </ul>
            </div>
          </div>

          <section class="panel" style="margin-top:1.75rem;">
            <h3>${t('indepTitle')}</h3>
            <p class="muted" style="font-size:0.86rem;margin-top:0;">${t('indepNote')}</p>
            <div class="data-table-wrap">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>${l === 'uz' ? "Mavzu va texnik talab" : "Project & Stack"}</th>
                    <th>${l === 'uz' ? "Topshirish shakli (Deliverable)" : "Deliverable"}</th>
                    <th>${l === 'uz' ? "Hajm" : "Hrs"}</th>
                  </tr>
                </thead>
                <tbody>
                  ${(INDEPENDENT_PROJECTS || []).map((p) => `
                    <tr>
                      <td><strong>MT-${p.id}</strong>${p.group ? ` <span class="badge badge-accent">${l === 'uz' ? 'Guruh' : 'Team'}</span>` : ''}</td>
                      <td>${escHtml(p[l] || p.uz)}</td>
                      <td>${escHtml(l === 'uz' ? p.deliverableUz : p.deliverableEn)}</td>
                      <td>${p.hrs} ${t('hoursUnit')}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>

          <section class="panel" style="margin-top:1.5rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.85rem;">
              <h3 style="margin:0;">${t('glossaryTitleHome')}</h3>
              <input type="search" id="home-glossary-search" class="search-input" value="${escHtml(glossaryQuery)}" placeholder="${l === 'uz' ? "Atama qidirish (masalan: Sobel, IoU, ViT)..." : "Filter glossary (e.g. Sobel, IoU, ViT)..."}">
            </div>
            <div class="data-table-wrap" style="max-height:420px;overflow-y:auto;">
              <table class="data-table">
                <thead><tr><th>English</th><th>O'zbekcha</th><th>${t('defCol')}</th></tr></thead>
                <tbody>
                  ${filteredGlossary.map((g) => `
                    <tr>
                      <td><strong>${escHtml(g.en)}</strong></td>
                      <td>${escHtml(g.uz)}</td>
                      <td>${escHtml(l === 'uz' ? g.defUz : g.defEn)}</td>
                    </tr>`).join('')}
                </tbody>
              </table>
            </div>
          </section>

          <section class="panel" style="margin-top:1.5rem;">
            <h3>${t('refsTitle')}</h3>
            <div class="ref-pills">
              ${(REFERENCES || []).map((r) => `<a class="ref-pill" href="${escHtml(r.url)}" target="_blank" rel="noopener">↗ ${escHtml(r.label)}</a>`).join('')}
              <a class="ref-pill" href="Amaliy4.ipynb" download>📓 Repo Notebook: Amaliy4.ipynb</a>
            </div>
          </section>
        </div>`;

      const srch = document.getElementById('home-topic-search');
      if (srch) {
        srch.addEventListener('input', () => {
          const pos = srch.selectionStart;
          topicQuery = srch.value;
          draw();
          const el = document.getElementById('home-topic-search');
          if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (_) {} }
        });
      }

      const gsrch = document.getElementById('home-glossary-search');
      if (gsrch) {
        gsrch.addEventListener('input', () => {
          const pos = gsrch.selectionStart;
          glossaryQuery = gsrch.value;
          draw();
          const el = document.getElementById('home-glossary-search');
          if (el) { el.focus(); try { el.setSelectionRange(pos, pos); } catch (_) {} }
        });
      }
    }

    draw();
    window.addEventListener('cv:langchange', draw);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. LECTURE TOPIC READER (topic.html?id=X)
     ────────────────────────────────────────────────────────────────────────── */
  function initTopicPage() {
    const root = document.getElementById('topic-root');
    if (!root) return;

    const topics = window.CV_TOPICS || [];
    const labs = window.CV_LABS || [];
    const params = new URLSearchParams(window.location.search);
    let currentId = Number(params.get('id')) || 1;
    let sidebarOpen = false;

    function getTopic() {
      return topics.find((tp) => tp.id === currentId) || topics[0];
    }

    function draw() {
      const l = getLang();
      const tp = getTopic();
      if (!tp) return;
      const idx = topics.indexOf(tp);
      const prev = idx > 0 ? topics[idx - 1] : null;
      const next = idx < topics.length - 1 ? topics[idx + 1] : null;
      const linkedLab = tp.labId ? labs.find((lb) => lb.id === tp.labId) : null;
      const isDone = getCompletedTopics().includes(tp.id);
      const mandatory = topics.filter((x) => !x.isBonus);
      const bonus = topics.filter((x) => x.isBonus);

      root.innerHTML = `
        <div class="container">
          <div class="topic-layout">
            <div class="sidebar-wrap ${sidebarOpen ? 'open' : ''}">
              <button type="button" class="sidebar-drawer-toggle" id="sidebar-toggle">
                <span>📚 ${tp.code}: ${escHtml(tp.title[l] || tp.title.uz)}</span>
                <span>${sidebarOpen ? '▲' : '▼'}</span>
              </button>
              <aside class="sidebar">
                <div class="sidebar-title">${t('sidebarTopics')}</div>
                ${mandatory.map((m) => `
                  <a class="sidebar-item ${m.id === tp.id ? 'active' : ''}" href="topic.html?id=${m.id}">
                    <span class="badge">${m.code}</span>
                    <span>${escHtml(m.title[l] || m.title.uz)}</span>
                  </a>`).join('')}
                ${bonus.length ? `<div class="sidebar-divider">${t('sidebarBonus')}</div>` : ''}
                ${bonus.map((b) => `
                  <a class="sidebar-item ${b.id === tp.id ? 'active' : ''}" href="topic.html?id=${b.id}">
                    <span class="badge badge-bonus">${b.code}</span>
                    <span>${escHtml(b.title[l] || b.title.uz)}</span>
                  </a>`).join('')}
              </aside>
            </div>

            <div>
              <article class="lecture-card">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
                  <div>
                    <span class="badge badge-accent">${tp.code} · ${tp.hours} ${t('hoursUnit')} ${linkedLab ? `· ${linkedLab.code}` : ''}</span>
                    <h1 style="margin:0.45rem 0 0.3rem;font-size:1.7rem;">${escHtml(tp.title[l] || tp.title.uz)}</h1>
                    <p class="muted" style="margin:0;">${escHtml(tp.description[l] || tp.description.uz)}</p>
                  </div>
                </div>

                <div class="export-actions no-print" style="display:flex;gap:0.55rem;flex-wrap:wrap;margin-bottom:1.25rem;">
                  <button type="button" id="toggle-complete-btn" class="btn btn-sm ${isDone ? 'btn-emerald' : 'btn-primary'}">
                    ${isDone ? t('markedDone') : t('markDone')}
                  </button>
                  <a class="btn btn-secondary btn-sm" href="slides.html?topic=${tp.id}">${t('openSlidesFull')}</a>
                  ${linkedLab ? `<a class="btn btn-secondary btn-sm" href="labs.html?id=${linkedLab.id}">${t('openLabPage')}${linkedLab.id})</a>` : ''}
                  <button type="button" id="print-topic-btn" class="btn btn-secondary btn-sm">🖨️ Print / PDF</button>
                </div>

                <div class="ref-box" style="margin-bottom:1rem;background:var(--accent-soft);border-color:var(--border-accent);">
                  <strong>⏱ ${l === 'uz' ? "80-daqiqalik ma'ruza dars rejasi (1 juftlik):" : "80-Minute Lecture Pacing Guide (1 Session):"}</strong>
                  <div class="muted" style="font-size:0.84rem;margin-top:0.25rem;">
                    ${l === 'uz'
                      ? "0–5' Kirish va muammo · 5–32' Chuqur nazariya & KaTeX · 32–48' Doskada sonli misol · 48–62' Kod tahlili & Interaktiv simulyator · 62–72' Keys-muhokama · 72–80' 3× Nazorat testi & Uyga vazifa"
                      : "0–5' Motivation & Goal · 5–32' Core Theory & Math · 32–48' Whiteboard Numerical Example · 48–62' Python Code & Interactive Widget · 62–72' Case Study Discussion · 72–80' 3× Checkpoint Quiz"}
                  </div>
                </div>

                ${(tp.refs && tp.refs.length) ? `
                  <div class="ref-box">
                    <strong>${l === 'uz' ? 'Manbalar va kurs materiallari:' : 'References & Curated Repo Links:'}</strong>
                    <div class="ref-pills">
                      ${tp.refs.map((r) => `<a class="ref-pill" href="${escHtml(r.url)}" target="_blank" rel="noopener">↗ ${escHtml(r.label)}</a>`).join('')}
                    </div>
                  </div>` : ''}

                ${(tp.sections || []).map((sec, si) => `
                  <section class="lecture-section">
                    <h2>${escHtml((sec.heading && (sec.heading[l] || sec.heading.uz)) || '')}</h2>
                    <div>${(sec.bodyHtml && (sec.bodyHtml[l] || sec.bodyHtml.uz)) || ''}</div>
                    ${sec.latex ? `<div class="formula-box">$$${sec.latex}$$</div>` : ''}
                    ${sec.code ? `
                      <div class="code-wrap">
                        <div class="code-header"><span>Python / OpenCV / PyTorch Example</span></div>
                        <pre><code>${escHtml(sec.code)}</code></pre>
                      </div>` : ''}
                    ${sec.table ? `
                      <div class="data-table-wrap">
                        <table class="data-table">
                          <thead><tr>${(sec.table.headers[l] || sec.table.headers.uz).map((h) => `<th>${escHtml(h)}</th>`).join('')}</tr></thead>
                          <tbody>${(sec.table.rows[l] || sec.table.rows.uz).map((r) => `<tr>${r.map((c) => `<td>${escHtml(c)}</td>`).join('')}</tr>`).join('')}</tbody>
                        </table>
                      </div>` : ''}
                    ${sec.widget ? `<div class="widget-wrap" id="topic-widget-${si}" data-widget="${escHtml(sec.widget)}"></div>` : ''}
                    ${sec.callout ? `<div class="callout ${sec.callout.type === 'warn' ? 'warn' : ''}">${sec.callout[l] || sec.callout.uz}</div>` : ''}
                    ${sec.discussion ? `
                      <div class="discussion-box">
                        <div style="font-weight:700;margin-bottom:0.4rem;">💬 ${escHtml(sec.discussion.q[l] || sec.discussion.q.uz)}</div>
                        <details>
                          <summary style="cursor:pointer;color:var(--accent);font-weight:600;font-size:0.88rem;">${l === 'uz' ? 'Javob va muhokamani ochish' : 'Reveal answer & discussion'}</summary>
                          <p style="margin:0.5rem 0 0;font-size:0.9rem;">${escHtml(sec.discussion.a[l] || sec.discussion.a.uz)}</p>
                        </details>
                      </div>` : ''}
                  </section>`).join('')}

                ${(tp.glossary && tp.glossary.length) ? `
                  <section class="lecture-section">
                    <h2>${t('glossaryTitle')}</h2>
                    <div class="data-table-wrap">
                      <table class="data-table">
                        <thead><tr><th>${t('termCol')}</th><th>${t('defCol')}</th></tr></thead>
                        <tbody>
                          ${tp.glossary.map((g) => `
                            <tr>
                              <td><strong>${escHtml(l === 'uz' ? g.uz : g.en)}</strong> <span class="muted">(${escHtml(l === 'uz' ? g.en : g.uz)})</span></td>
                              <td>${escHtml(l === 'uz' ? g.defUz : g.defEn)}</td>
                            </tr>`).join('')}
                        </tbody>
                      </table>
                    </div>
                  </section>` : ''}
              </article>

              ${linkedLab ? `
                <section class="panel" style="margin-bottom:1.5rem;">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.75rem;">
                    <h2 style="margin:0;font-size:1.2rem;">${t('labTitle')} — ${linkedLab.code}: ${escHtml(linkedLab.title[l] || linkedLab.title.uz)}</h2>
                    <div style="display:flex;gap:0.45rem;flex-wrap:wrap;">
                      <button type="button" id="topic-dl-ipynb" class="btn btn-primary btn-sm">⬇ .ipynb (#${getStudentVariant()})</button>
                      <a class="btn btn-secondary btn-sm" href="labs.html?id=${linkedLab.id}">${l === 'uz' ? '40 Variantni ochish →' : 'Open 40 Variants →'}</a>
                    </div>
                  </div>
                  <p class="muted" style="font-size:0.9rem;">${escHtml(linkedLab.commonTask[l] || linkedLab.commonTask.uz)}</p>
                  <div class="code-wrap">
                    <div class="code-header">
                      <span>${linkedLab.code}_starter.py</span>
                      <button type="button" id="copy-topic-code" class="btn btn-secondary btn-sm">${t('copyCode')}</button>
                    </div>
                    <pre><code>${escHtml(linkedLab.pythonCode || linkedLab.code_py || '')}</code></pre>
                  </div>
                </section>` : ''}

              <section class="quiz-box" id="topic-quiz">
                <div class="quiz-header">
                  <div>
                    <h2 style="margin:0;font-size:1.2rem;">${t('quizTitle')}</h2>
                    <p class="muted" style="margin:0.2rem 0 0;font-size:0.86rem;">${t('quizSubtitle')}</p>
                  </div>
                </div>
                <div id="topic-quiz-slot"></div>
              </section>

              <section class="exercise-box">
                <h2 style="margin-top:0;font-size:1.2rem;">${t('matchTitle')}</h2>
                <div id="topic-match-slot"></div>
              </section>

              <section class="exercise-box">
                <h2 style="margin-top:0;font-size:1.2rem;">${t('gapTitle')}</h2>
                <div id="topic-gap-slot"></div>
              </section>

              <div class="no-print" style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;margin-bottom:2rem;">
                ${prev ? `<a class="btn btn-secondary" href="topic.html?id=${prev.id}">${t('prevTopic')} (${prev.code})</a>` : '<span></span>'}
                ${next ? `<a class="btn btn-primary" href="topic.html?id=${next.id}">${t('nextTopic')} (${next.code})</a>` : '<span></span>'}
              </div>
            </div>
          </div>
        </div>`;

      // Render embedded widgets
      if (window.CV_WIDGETS && typeof window.CV_WIDGETS.renderWidget === 'function') {
        root.querySelectorAll('[data-widget]').forEach((el) => {
          window.CV_WIDGETS.renderWidget(el, el.dataset.widget);
        });
      }

      // Render 3-part exercises
      if (window.CV_QUIZ) {
        window.CV_QUIZ.renderQuizWidget(document.getElementById('topic-quiz-slot'), tp, `topic_${tp.id}`);
        window.CV_QUIZ.renderMatchingWidget(document.getElementById('topic-match-slot'), tp);
        window.CV_QUIZ.renderFillGapWidget(document.getElementById('topic-gap-slot'), tp);
      }

      const sbBtn = document.getElementById('sidebar-toggle');
      if (sbBtn) sbBtn.addEventListener('click', () => { sidebarOpen = !sidebarOpen; draw(); });

      const compBtn = document.getElementById('toggle-complete-btn');
      if (compBtn) compBtn.addEventListener('click', () => { toggleTopicCompleted(tp.id); draw(); });

      const prBtn = document.getElementById('print-topic-btn');
      if (prBtn) prBtn.addEventListener('click', () => window.print());

      const copyBtn = document.getElementById('copy-topic-code');
      if (copyBtn && linkedLab) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard && navigator.clipboard.writeText(linkedLab.pythonCode || linkedLab.code_py || '');
          copyBtn.textContent = t('copied');
          setTimeout(() => { copyBtn.textContent = t('copyCode'); }, 1500);
        });
      }

      const dlBtn = document.getElementById('topic-dl-ipynb');
      if (dlBtn && linkedLab) {
        dlBtn.addEventListener('click', () => downloadLabNotebook(linkedLab, getStudentVariant()));
      }

      renderMathIfReady(root);
    }

    draw();
    window.addEventListener('cv:langchange', draw);
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. PRACTICAL LABS PAGE WITH 40-VARIANT GENERATOR (labs.html?id=X)
     ────────────────────────────────────────────────────────────────────────── */
  function initLabsPage() {
    const root = document.getElementById('labs-root');
    if (!root) return;

    const labs = window.CV_LABS || [];
    const params = new URLSearchParams(window.location.search);
    let currentLabId = Number(params.get('id')) || 1;
    let sidebarOpen = false;
    let showAllRows = false;

    function getLab() {
      return labs.find((lb) => lb.id === currentLabId) || labs[0];
    }

    function draw() {
      const l = getLang();
      const lab = getLab();
      if (!lab) return;
      const variant = getStudentVariant();
      const rowIdx = (variant - 1) % 10;
      const idx = labs.indexOf(lab);
      const prev = idx > 0 ? labs[idx - 1] : null;
      const next = idx < labs.length - 1 ? labs[idx + 1] : null;

      root.innerHTML = `
        <div class="container">
          <div class="topic-layout">
            <div class="sidebar-wrap ${sidebarOpen ? 'open' : ''}">
              <button type="button" class="sidebar-drawer-toggle" id="lab-sidebar-toggle">
                <span>🧪 ${lab.code}: ${escHtml(lab.title[l] || lab.title.uz)}</span>
                <span>${sidebarOpen ? '▲' : '▼'}</span>
              </button>
              <aside class="sidebar">
                <div class="sidebar-title">${t('sidebarLabs')}</div>
                ${labs.map((lb) => `
                  <a class="sidebar-item ${lb.id === lab.id ? 'active' : ''}" href="labs.html?id=${lb.id}">
                    <span class="badge">${lb.code}</span>
                    <span>${escHtml(lb.title[l] || lb.title.uz)}</span>
                  </a>`).join('')}
              </aside>
            </div>

            <div>
              <article class="lecture-card">
                <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.75rem;flex-wrap:wrap;">
                  <div>
                    <span class="badge badge-accent">${lab.code} · M${lab.topicId} · 40 ${l === 'uz' ? 'variant' : 'variants'}</span>
                    <h1 style="margin:0.45rem 0 0.3rem;font-size:1.7rem;">${escHtml(lab.title[l] || lab.title.uz)}</h1>
                    <p class="muted" style="margin:0;">${escHtml(lab.objective[l] || lab.objective.uz)}</p>
                  </div>
                </div>

                <div class="export-actions no-print" style="display:flex;gap:0.55rem;flex-wrap:wrap;margin:1rem 0;">
                  <a class="btn btn-secondary btn-sm" href="topic.html?id=${lab.topicId}">📖 ${l === 'uz' ? "Tegishli ma'ruza (M" : 'Lecture (M'}${lab.topicId})</a>
                  <button type="button" id="lab-dl-ipynb" class="btn btn-primary btn-sm">⬇ ${l === 'uz' ? `Variant #${variant} uchun .ipynb yuklash` : `Download Variant #${variant} .ipynb`}</button>
                  <button type="button" id="lab-print-btn" class="btn btn-secondary btn-sm">🖨️ Print / PDF</button>
                  ${(lab.id === 1 || lab.id === 4) ? `<a class="btn btn-emerald btn-sm" href="Amaliy4.ipynb" download>📓 Repo Starter: Amaliy4.ipynb</a>` : ''}
                  ${lab.colabUrl ? `<a class="btn btn-secondary btn-sm" href="${escHtml(lab.colabUrl)}" target="_blank" rel="noopener">↗ ${l === 'uz' ? 'Manba / Repo' : 'External Repo'}</a>` : ''}
                </div>

                <div class="ref-box" style="margin-top:0.75rem;background:var(--accent-soft);border-color:var(--border-accent);">
                  <strong>⏱ ${l === 'uz' ? "80-daqiqalik amaliy mashg'ulot ssenariysi:" : "80-Minute Practical Lab Pacing Plan:"}</strong>
                  <div class="muted" style="font-size:0.84rem;margin-top:0.25rem;">
                    ${l === 'uz'
                      ? "0–10' Nazariya takrori & xatolar tahlili · 10–30' 3-qadamli yo'naltirilgan kod (Guided) · 30–60' Talabaning shaxsiy Varianti (#1–#40) · 60–75' Himoya savollari (Viva) & Baholash · 75–80' 4-topshiriq uyga vazifa"
                      : "0–10' Theory Recap & Pitfalls · 10–30' 3-Step Guided Implementation · 30–60' Individual Student Variant (#1–#40) · 60–75' Oral Defense (Viva Q&A) & Grading · 75–80' Homework & Report Setup"}
                  </div>
                </div>

                ${lab.theoryRecap ? `
                  <div class="lecture-section" style="margin-top:1rem;">
                    <h2>1. ${l === 'uz' ? "Nazariy asos va API eslatmasi" : "Theory Recap & API Essentials"}</h2>
                    <div>${lab.theoryRecap[l] || lab.theoryRecap.uz}</div>
                  </div>` : ''}

                ${(lab.formulas && lab.formulas.length) ? `
                  <div class="ref-box">
                    <strong>${l === 'uz' ? 'Asosiy formulalar va API:' : 'Core Formulas & API:'}</strong>
                    <div style="display:flex;flex-wrap:wrap;gap:0.45rem;margin-top:0.45rem;">
                      ${lab.formulas.map((f) => `<code>${escHtml(f)}</code>`).join('')}
                    </div>
                  </div>` : ''}

                ${(lab.pitfalls && (lab.pitfalls[l] || lab.pitfalls.uz)) ? `
                  <div class="callout warn" style="margin-top:0.9rem;">
                    <strong>⚠️ ${l === 'uz' ? "Keng tarqalgan xatolar va tekshiruv (Debugging Checklist):" : "Common Bugs & Debugging Checklist:"}</strong>
                    <ul style="margin:0.4rem 0 0;padding-left:1.2rem;">
                      ${(lab.pitfalls[l] || lab.pitfalls.uz).map((pt) => `<li>${escHtml(pt)}</li>`).join('')}
                    </ul>
                  </div>` : ''}

                ${(lab.guidedSteps && lab.guidedSteps.length) ? `
                  <section class="lecture-section" style="margin-top:1.15rem;">
                    <h2>2. ${l === 'uz' ? "Bosqichma-bosqich yo'naltirilgan amaliyot (25–30 min)" : "Step-by-Step Guided Implementation (25–30 min)"}</h2>
                    ${lab.guidedSteps.map((st, si) => `
                      <div class="lab-step">
                        <div class="lab-step-title">${escHtml((st.title && (st.title[l] || st.title.uz)) || `Step ${si + 1}`)}</div>
                        <p style="margin:0 0 0.6rem;font-size:0.92rem;">${escHtml((st.desc && (st.desc[l] || st.desc.uz)) || '')}</p>
                        <div class="code-wrap" style="margin:0.5rem 0;">
                          <div class="code-header">
                            <span>${lab.code}_step${si + 1}.py</span>
                            <button type="button" class="btn btn-secondary btn-sm copy-step-btn" data-step="${si}">${t('copyCode')}</button>
                          </div>
                          <pre><code>${escHtml(st.code || '')}</code></pre>
                        </div>
                        ${st.expected ? `<div style="font-size:0.84rem;color:var(--emerald);margin-top:0.4rem;"><strong>✓ ${l === 'uz' ? 'Kutilgan natija:' : 'Expected Output:'}</strong> ${escHtml(st.expected[l] || st.expected.uz)}</div>` : ''}
                      </div>`).join('')}
                  </section>` : ''}

                <div class="callout" style="margin-top:1rem;">
                  <strong>${l === 'uz' ? 'Umumiy barcha talabalar uchun topshiriq:' : 'Common Task (All Students):'}</strong><br>
                  ${escHtml(lab.commonTask[l] || lab.commonTask.uz)}
                </div>

                <div class="variant-box">
                  <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:0.65rem;">
                    <div>
                      <strong style="font-size:1.05rem;">🎯 ${l === 'uz' ? 'Talaba Variant Generator (#1 – #40)' : 'Student Variant Generator (#1 – #40)'}</strong>
                      <div class="muted" style="font-size:0.82rem;">
                        ${l === 'uz'
                          ? `Sizning tartib raqamingiz: #${variant} → Jadval qatori: #${rowIdx + 1} (1–10, 11–20, 21–30, 31–40 guruhlar modul 10 bo'yicha)`
                          : `Selected Student #: ${variant} → Parameter Row #${rowIdx + 1} (variants wrap modulo 10 across 1–40)`}
                      </div>
                    </div>
                    <div style="display:flex;align-items:center;gap:0.45rem;" class="no-print">
                      <button type="button" id="var-prev" class="btn btn-secondary btn-sm">◀</button>
                      <select id="var-select" style="padding:0.42rem 0.65rem;border-radius:8px;border:1px solid var(--border-color);background:var(--bg-card);color:var(--text-primary);font-weight:700;">
                        ${Array.from({ length: 40 }, (_, i) => i + 1).map((n) => `<option value="${n}" ${n === variant ? 'selected' : ''}>Variant #${n} (${l === 'uz' ? 'qator' : 'row'} ${((n - 1) % 10) + 1})</option>`).join('')}
                      </select>
                      <button type="button" id="var-next" class="btn btn-secondary btn-sm">▶</button>
                    </div>
                  </div>

                  ${(lab.tasks || []).map((tk, ti) => {
                    const row = (tk.rows && tk.rows[rowIdx]) || {};
                    const tpl = l === 'uz' ? (tk.tplUz || tk.tplEn) : (tk.tplEn || tk.tplUz);
                    const filled = interpolateTemplate(tpl, row);
                    const keys = Object.keys(row);
                    return `
                      <div class="variant-task-card">
                        <div style="display:flex;justify-content:space-between;align-items:center;gap:0.5rem;flex-wrap:wrap;margin-bottom:0.35rem;">
                          <strong style="color:var(--accent);">${escHtml(tk.title[l] || tk.title.uz)}</strong>
                          <span class="badge">${keys.map((k) => `${k}=${row[k]}`).join(' · ')}</span>
                        </div>
                        <p style="margin:0;font-size:0.94rem;">${escHtml(filled)}</p>
                      </div>`;
                  }).join('')}

                  <div style="margin-top:0.85rem;" class="no-print">
                    <button type="button" id="toggle-all-rows" class="btn btn-secondary btn-sm">
                      ${showAllRows
                        ? (l === 'uz' ? '▲ 10 qatorlik jadvalni yopish' : '▲ Hide full 10-row variant table')
                        : (l === 'uz' ? '▼ Barcha 1–10 qator (1–40 variant) parametrlarini ko‘rish' : '▼ Show all 10 parameter rows (Variants 1–40)')}
                    </button>
                  </div>

                  ${showAllRows ? `
                    <div class="data-table-wrap" style="margin-top:0.85rem;">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Row / Var</th>
                            ${(lab.tasks || []).map((_, ti) => `<th>T${ti + 1}</th>`).join('')}
                          </tr>
                        </thead>
                        <tbody>
                          ${Array.from({ length: 10 }, (_, r) => `
                            <tr style="${r === rowIdx ? 'background:var(--accent-soft);font-weight:700;' : ''}">
                              <td>#${r + 1} (${r + 1}, ${r + 11}, ${r + 21}, ${r + 31})</td>
                              ${(lab.tasks || []).map((tk) => {
                                const rw = (tk.rows && tk.rows[r]) || {};
                                return `<td><code>${escHtml(Object.entries(rw).map(([k, val]) => `${k}:${val}`).join(', '))}</code></td>`;
                              }).join('')}
                            </tr>`).join('')}
                        </tbody>
                      </table>
                    </div>` : ''}
                </div>

                <h2 style="margin-top:1.5rem;">${l === 'uz' ? 'Yakuniy Starter Shabloni' : 'Complete Starter Template'}</h2>
                <div class="code-wrap">
                  <div class="code-header">
                    <span>${lab.code}_variant_${variant}.py</span>
                    <button type="button" id="copy-lab-code" class="btn btn-secondary btn-sm">${t('copyCode')}</button>
                  </div>
                  <pre><code>${escHtml(lab.pythonCode || lab.code_py || '')}</code></pre>
                </div>

                ${(lab.vivaQuestions && lab.vivaQuestions.length) ? `
                  <section class="lecture-section" style="margin-top:1.5rem;">
                    <h2>4. ${l === 'uz' ? "Himoya Savollari (Viva / Q&A) va Baholash (15 min)" : "Oral Defense (Viva Q&A) & Grading Rubric (15 min)"}</h2>
                    <div class="callout" style="margin-bottom:0.85rem;">
                      <strong>📊 ${l === 'uz' ? "Amaliy dars baholash (100%):" : "Lab Grading Breakdown (100%):"}</strong>
                      ${l === 'uz'
                        ? "30% Yo'naltirilgan qadamlar · 40% Shaxsiy Variant (#1–#40) to'g'ri kodi & rasmi · 30% Himoya savollariga og'zaki javob"
                        : "30% Guided Steps · 40% Personalized Variant (#1–#40) execution & outputs · 30% Viva oral defense"}
                    </div>
                    ${lab.vivaQuestions.map((vq, vi) => `
                      <div class="discussion-box" style="margin:0.6rem 0;">
                        <div style="font-weight:700;">${vi + 1}. ${escHtml(vq.q[l] || vq.q.uz)}</div>
                        <details style="margin-top:0.35rem;">
                          <summary style="cursor:pointer;color:var(--accent);font-size:0.86rem;font-weight:600;">${l === 'uz' ? "Namunaviy javobni ko'rish" : "Show model answer"}</summary>
                          <p style="margin:0.4rem 0 0;font-size:0.9rem;">${escHtml(vq.a[l] || vq.a.uz)}</p>
                        </details>
                      </div>`).join('')}
                  </section>` : ''}
              </article>

              <div class="no-print" style="display:flex;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;margin-bottom:2rem;">
                ${prev ? `<a class="btn btn-secondary" href="labs.html?id=${prev.id}">← ${prev.code}: ${escHtml(prev.title[l] || prev.title.uz)}</a>` : '<span></span>'}
                ${next ? `<a class="btn btn-primary" href="labs.html?id=${next.id}">${next.code}: ${escHtml(next.title[l] || next.title.uz)} →</a>` : '<span></span>'}
              </div>
            </div>
          </div>
        </div>`;

      const sbBtn = document.getElementById('lab-sidebar-toggle');
      if (sbBtn) sbBtn.addEventListener('click', () => { sidebarOpen = !sidebarOpen; draw(); });

      const vSel = document.getElementById('var-select');
      if (vSel) vSel.addEventListener('change', () => { setStudentVariant(Number(vSel.value)); draw(); });

      const vPrev = document.getElementById('var-prev');
      if (vPrev) vPrev.addEventListener('click', () => { setStudentVariant(variant <= 1 ? 40 : variant - 1); draw(); });

      const vNext = document.getElementById('var-next');
      if (vNext) vNext.addEventListener('click', () => { setStudentVariant(variant >= 40 ? 1 : variant + 1); draw(); });

      const rowsBtn = document.getElementById('toggle-all-rows');
      if (rowsBtn) rowsBtn.addEventListener('click', () => { showAllRows = !showAllRows; draw(); });

      const copyBtn = document.getElementById('copy-lab-code');
      if (copyBtn) {
        copyBtn.addEventListener('click', () => {
          navigator.clipboard && navigator.clipboard.writeText(lab.pythonCode || lab.code_py || '');
          copyBtn.textContent = t('copied');
          setTimeout(() => { copyBtn.textContent = t('copyCode'); }, 1500);
        });
      }

      root.querySelectorAll('.copy-step-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
          const si = Number(btn.dataset.step);
          const step = (lab.guidedSteps || [])[si];
          if (step && step.code && navigator.clipboard) {
            navigator.clipboard.writeText(step.code);
            btn.textContent = t('copied');
            setTimeout(() => { btn.textContent = t('copyCode'); }, 1500);
          }
        });
      });

      const dlBtn = document.getElementById('lab-dl-ipynb');
      if (dlBtn) dlBtn.addEventListener('click', () => downloadLabNotebook(lab, variant));

      const prBtn = document.getElementById('lab-print-btn');
      if (prBtn) prBtn.addEventListener('click', () => window.print());

      renderMathIfReady(root);
    }

    draw();
    window.addEventListener('cv:langchange', draw);
  }

  window.CV_PAGE = {
    initHomePage,
    initTopicPage,
    initLabsPage
  };
})();

/**
 * quiz-engine.js — Kompyuterli ko'rish (CV) Quiz, Matching, Fill-Gap & 203-Question Test Bank Arena
 * Exports window.CV_QUIZ
 */
(function () {
  const { getLang, t, saveQuizScore, getQuizScores } = window.CV_APP;

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

  function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  /* ──────────────────────────────────────────────────────────────────────────
     1. TOPIC MCQ QUIZ WIDGET
     ────────────────────────────────────────────────────────────────────────── */
  function renderQuizWidget(container, topic, quizId) {
    if (!container) return;
    const lang = getLang();
    const questions = Array.isArray(topic.quiz) ? topic.quiz : [];
    const answers = {};
    let checked = false;

    function draw() {
      const l = getLang();
      let score = 0;
      if (checked) {
        questions.forEach((q, idx) => {
          if (answers[idx] === q.answer) score++;
        });
      }

      container.innerHTML = `
        <div class="quiz-widget">
          <div class="quiz-header" style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
            <span class="badge badge-accent">${questions.length} ${l === 'uz' ? 'savol' : 'questions'}</span>
            ${checked ? `<span class="badge ${score === questions.length ? 'badge-success' : 'badge-warn'}">${t('score')}: ${score} / ${questions.length} (${Math.round((score / Math.max(1, questions.length)) * 100)}%)</span>` : ''}
          </div>
          ${questions.map((q, qi) => {
            const qText = (q.q && (q.q[l] || q.q.uz)) || '';
            const opts = (q.options && (q.options[l] || q.options.uz)) || [];
            const expText = (q.explanation && (q.explanation[l] || q.explanation.uz)) || '';
            const selected = answers[qi];
            return `
              <div class="quiz-q-card card" style="margin-bottom:1rem;padding:1rem;">
                <div class="quiz-q-title" style="font-weight:700;margin-bottom:0.75rem;">${qi + 1}. ${escHtml(qText)}</div>
                <div class="quiz-options" style="display:grid;gap:0.45rem;">
                  ${opts.map((opt, oi) => {
                    let cls = 'quiz-option';
                    if (selected === oi) cls += ' selected';
                    if (checked) {
                      if (oi === q.answer) cls += ' correct';
                      else if (selected === oi) cls += ' wrong';
                    }
                    return `
                      <button type="button" class="${cls}" data-qi="${qi}" data-oi="${oi}" ${checked ? 'disabled' : ''}>
                        <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
                        <span class="opt-text">${escHtml(opt)}</span>
                      </button>`;
                  }).join('')}
                </div>
                ${checked && expText ? `
                  <div class="quiz-explanation" style="margin-top:0.75rem;padding:0.65rem 0.85rem;border-radius:8px;background:var(--bg-subtle);border-left:3px solid var(--accent);font-size:0.9rem;">
                    <strong>${t('explanation')}:</strong> ${escHtml(expText)}
                  </div>` : ''}
              </div>`;
          }).join('')}
          <div style="display:flex;gap:0.65rem;flex-wrap:wrap;margin-top:0.75rem;">
            ${!checked
              ? `<button type="button" class="btn btn-primary" data-action="check">${t('checkAnswers')}</button>`
              : `<button type="button" class="btn btn-outline" data-action="retry">${t('tryAgain')}</button>`}
          </div>
        </div>`;

      container.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (checked) return;
          const qi = Number(btn.dataset.qi);
          const oi = Number(btn.dataset.oi);
          answers[qi] = oi;
          draw();
        });
      });

      const checkBtn = container.querySelector('[data-action="check"]');
      if (checkBtn) {
        checkBtn.addEventListener('click', () => {
          checked = true;
          let sc = 0;
          questions.forEach((q, idx) => {
            if (answers[idx] === q.answer) sc++;
          });
          if (quizId) saveQuizScore(quizId, sc, questions.length);
          draw();
        });
      }

      const retryBtn = container.querySelector('[data-action="retry"]');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          checked = false;
          Object.keys(answers).forEach((k) => delete answers[k]);
          draw();
        });
      }

      renderMathIfReady(container);
    }

    draw();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     2. MATCHING WIDGET
     ────────────────────────────────────────────────────────────────────────── */
  function renderMatchingWidget(container, topic) {
    if (!container) return;
    const pairs = Array.isArray(topic.matching) ? topic.matching : [];
    if (!pairs.length) {
      container.innerHTML = `<p class="muted">—</p>`;
      return;
    }

    let shuffledRight = shuffleArray(pairs.map((p, idx) => ({ idx, right: p.right })));
    let selectedLeft = null;
    const matched = {}; // leftIdx -> rightIdx
    let checked = false;

    function draw() {
      const l = getLang();
      let correctCount = 0;
      if (checked) {
        pairs.forEach((_, idx) => {
          if (matched[idx] === idx) correctCount++;
        });
      }

      container.innerHTML = `
        <div class="matching-widget">
          <p class="muted" style="font-size:0.88rem;margin-bottom:0.85rem;">${t('matchingInstruction')}</p>
          ${checked ? `<div class="badge ${correctCount === pairs.length ? 'badge-success' : 'badge-warn'}" style="margin-bottom:0.85rem;">${t('score')}: ${correctCount} / ${pairs.length}</div>` : ''}
          <div class="matching-grid" style="display:grid;grid-template-columns:1fr 1fr;gap:0.75rem;">
            <div class="matching-col" style="display:grid;gap:0.5rem;">
              ${pairs.map((p, li) => {
                const label = (p.left && (p.left[l] || p.left.uz)) || '';
                const pairedRight = matched[li];
                const isSelected = selectedLeft === li;
                let statusCls = '';
                if (checked) {
                  statusCls = pairedRight === li ? 'correct' : 'wrong';
                } else if (isSelected) {
                  statusCls = 'selected';
                } else if (pairedRight !== undefined) {
                  statusCls = 'paired';
                }
                const assignedNum = pairedRight !== undefined
                  ? (shuffledRight.findIndex((r) => r.idx === pairedRight) + 1)
                  : null;
                return `
                  <button type="button" class="match-item match-left ${statusCls}" data-li="${li}">
                    <span class="match-num">${li + 1}</span>
                    <span class="match-text">${escHtml(label)}</span>
                    ${assignedNum ? `<span class="badge badge-accent" style="margin-left:auto;">→ ${assignedNum}</span>` : ''}
                  </button>`;
              }).join('')}
            </div>
            <div class="matching-col" style="display:grid;gap:0.5rem;">
              ${shuffledRight.map((r, ri) => {
                const label = (r.right && (r.right[l] || r.right.uz)) || '';
                const usedBy = Object.keys(matched).find((k) => matched[k] === r.idx);
                let statusCls = '';
                if (checked && usedBy !== undefined) {
                  statusCls = Number(usedBy) === r.idx ? 'correct' : 'wrong';
                } else if (usedBy !== undefined) {
                  statusCls = 'paired';
                }
                return `
                  <button type="button" class="match-item match-right ${statusCls}" data-ridx="${r.idx}">
                    <span class="match-num">${ri + 1}</span>
                    <span class="match-text">${escHtml(label)}</span>
                  </button>`;
              }).join('')}
            </div>
          </div>
          <div style="display:flex;gap:0.65rem;flex-wrap:wrap;margin-top:0.85rem;">
            <button type="button" class="btn btn-primary" data-action="check" ${checked ? 'disabled' : ''}>${t('checkAnswers')}</button>
            <button type="button" class="btn btn-outline" data-action="reset">${t('resetMatching')}</button>
          </div>
        </div>`;

      container.querySelectorAll('.match-left').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (checked) return;
          const li = Number(btn.dataset.li);
          selectedLeft = selectedLeft === li ? null : li;
          draw();
        });
      });

      container.querySelectorAll('.match-right').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (checked || selectedLeft === null) return;
          const ridx = Number(btn.dataset.ridx);
          Object.keys(matched).forEach((k) => {
            if (matched[k] === ridx) delete matched[k];
          });
          matched[selectedLeft] = ridx;
          selectedLeft = null;
          draw();
        });
      });

      const checkBtn = container.querySelector('[data-action="check"]');
      if (checkBtn) {
        checkBtn.addEventListener('click', () => {
          checked = true;
          draw();
        });
      }

      const resetBtn = container.querySelector('[data-action="reset"]');
      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          checked = false;
          selectedLeft = null;
          Object.keys(matched).forEach((k) => delete matched[k]);
          shuffledRight = shuffleArray(pairs.map((p, idx) => ({ idx, right: p.right })));
          draw();
        });
      }
      renderMathIfReady(container);
    }

    draw();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     3. FILL-THE-GAP WIDGET
     ────────────────────────────────────────────────────────────────────────── */
  function renderFillGapWidget(container, topic) {
    if (!container) return;
    const gaps = Array.isArray(topic.fillGap) ? topic.fillGap : [];
    if (!gaps.length) {
      container.innerHTML = `<p class="muted">—</p>`;
      return;
    }

    const inputs = gaps.map(() => '');
    let checked = false;

    function normalize(s) {
      return String(s || '').trim().toLowerCase().replace(/[`'"]/g, '');
    }

    function draw() {
      const l = getLang();
      let correct = 0;
      if (checked) {
        gaps.forEach((g, i) => {
          const expected = (g.answer && (g.answer[l] || g.answer.uz)) || '';
          const alts = expected.split('/').map((x) => normalize(x));
          if (alts.includes(normalize(inputs[i])) || normalize(inputs[i]) === normalize(expected)) {
            correct++;
          }
        });
      }

      container.innerHTML = `
        <div class="fillgap-widget">
          <p class="muted" style="font-size:0.88rem;margin-bottom:0.85rem;">${t('fillGapInstruction')}</p>
          ${checked ? `<div class="badge ${correct === gaps.length ? 'badge-success' : 'badge-warn'}" style="margin-bottom:0.85rem;">${t('score')}: ${correct} / ${gaps.length}</div>` : ''}
          <div style="display:grid;gap:0.75rem;">
            ${gaps.map((g, i) => {
              const rawText = (g.text && (g.text[l] || g.text.uz)) || '';
              const expected = (g.answer && (g.answer[l] || g.answer.uz)) || '';
              const alts = expected.split('/').map((x) => normalize(x));
              const isOk = checked && (alts.includes(normalize(inputs[i])) || normalize(inputs[i]) === normalize(expected));
              const parts = rawText.split('___');
              const inputHtml = `<input type="text" class="gap-input ${checked ? (isOk ? 'correct' : 'wrong') : ''}" data-gi="${i}" value="${escHtml(inputs[i])}" placeholder="..." ${checked ? 'disabled' : ''} style="min-width:130px;padding:0.25rem 0.55rem;border-radius:6px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-main);font-family:var(--font-mono);font-size:0.88rem;">`;
              return `
                <div class="card" style="padding:0.85rem 1rem;">
                  <div style="line-height:1.7;">
                    <strong>${i + 1}.</strong> ${escHtml(parts[0] || '')}${inputHtml}${escHtml(parts.slice(1).join('___'))}
                  </div>
                  ${checked && !isOk ? `<div style="margin-top:0.4rem;font-size:0.84rem;color:var(--success);">${t('correctAnswer')}: <code>${escHtml(expected)}</code></div>` : ''}
                </div>`;
            }).join('')}
          </div>
          <div style="display:flex;gap:0.65rem;flex-wrap:wrap;margin-top:0.85rem;">
            ${!checked
              ? `<button type="button" class="btn btn-primary" data-action="check">${t('checkAnswers')}</button>`
              : `<button type="button" class="btn btn-outline" data-action="retry">${t('tryAgain')}</button>`}
          </div>
        </div>`;

      container.querySelectorAll('.gap-input').forEach((inp) => {
        inp.addEventListener('input', () => {
          inputs[Number(inp.dataset.gi)] = inp.value;
        });
      });

      const checkBtn = container.querySelector('[data-action="check"]');
      if (checkBtn) {
        checkBtn.addEventListener('click', () => {
          checked = true;
          draw();
        });
      }

      const retryBtn = container.querySelector('[data-action="retry"]');
      if (retryBtn) {
        retryBtn.addEventListener('click', () => {
          checked = false;
          for (let i = 0; i < inputs.length; i++) inputs[i] = '';
          draw();
        });
      }

      renderMathIfReady(container);
    }

    draw();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     4. SLIDE INLINE MCQ EXERCISE (used by slides.html)
     ────────────────────────────────────────────────────────────────────────── */
  function renderSlideExercise(container, topic, qIdx) {
    if (!container || !topic || !Array.isArray(topic.quiz) || !topic.quiz.length) return;
    const q = topic.quiz[qIdx % topic.quiz.length];
    let selected = null;
    let checked = false;

    function draw() {
      const l = getLang();
      const qText = (q.q && (q.q[l] || q.q.uz)) || '';
      const opts = (q.options && (q.options[l] || q.options.uz)) || [];
      const exp = (q.explanation && (q.explanation[l] || q.explanation.uz)) || '';

      container.innerHTML = `
        <div class="slide-ex-box">
          <div class="slide-ex-q">${escHtml(qText)}</div>
          <div class="slide-ex-opts">
            ${opts.map((opt, oi) => {
              let cls = 'slide-ex-opt';
              if (selected === oi) cls += ' selected';
              if (checked) {
                if (oi === q.answer) cls += ' correct';
                else if (selected === oi) cls += ' wrong';
              }
              return `<button type="button" class="${cls}" data-oi="${oi}"><strong>${String.fromCharCode(65 + oi)}.</strong> ${escHtml(opt)}</button>`;
            }).join('')}
          </div>
          <div class="slide-ex-actions">
            ${!checked
              ? `<button type="button" class="btn btn-primary btn-sm" data-action="check" ${selected === null ? 'disabled' : ''}>${t('checkAnswers')}</button>`
              : `<button type="button" class="btn btn-outline btn-sm" data-action="retry">${t('tryAgain')}</button>`}
            ${checked ? `<span class="badge ${selected === q.answer ? 'badge-success' : 'badge-warn'}">${selected === q.answer ? (l === 'uz' ? "To'g'ri!" : 'Correct!') : (l === 'uz' ? "Noto'g'ri" : 'Incorrect')}</span>` : ''}
          </div>
          ${checked && exp ? `<div class="slide-ex-exp">${escHtml(exp)}</div>` : ''}
        </div>`;

      container.querySelectorAll('.slide-ex-opt').forEach((btn) => {
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          if (checked) return;
          selected = Number(btn.dataset.oi);
          draw();
        });
      });

      const checkBtn = container.querySelector('[data-action="check"]');
      if (checkBtn) {
        checkBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          checked = true;
          draw();
        });
      }

      const retryBtn = container.querySelector('[data-action="retry"]');
      if (retryBtn) {
        retryBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          selected = null;
          checked = false;
          draw();
        });
      }
      renderMathIfReady(container);
    }

    draw();
  }

  /* ──────────────────────────────────────────────────────────────────────────
     5. QUIZ ARENA + 203 OFFICIAL TEST BANK ENGINE (quiz.html)
     ────────────────────────────────────────────────────────────────────────── */
  function bankQuestionToUniform(item, l) {
    const letters = ['A', 'B', 'C', 'D'];
    const answerIdx = letters.indexOf(item.ans);
    return {
      bankId: item.id,
      topic: item.topic,
      qText: item[l] || item.uz,
      options: letters.map((k) => (item[k] && (item[k][l] || item[k].uz)) || ''),
      answer: answerIdx >= 0 ? answerIdx : 0,
      explanation: `${item.topic} — Test Bank #${item.id} (${item.ans})`
    };
  }

  function topicQuestionToUniform(item, topicCode, l) {
    return {
      topic: topicCode,
      qText: (item.q && (item.q[l] || item.q.uz)) || '',
      options: (item.options && (item.options[l] || item.options.uz)) || [],
      answer: item.answer,
      explanation: (item.explanation && (item.explanation[l] || item.explanation.uz)) || ''
    };
  }

  function initQuizArena() {
    const root = document.getElementById('quiz-arena-root');
    if (!root) return;

    const topics = window.CV_TOPICS || [];
    const bank = window.CV_TESTBANK || [];

    const hash = window.location.hash || '';
    let mode = 'mixed-20'; // 'mixed-20' | 'marathon-203' | 'browse-bank' | 'topic-<id>'
    if (hash.startsWith('#topic-')) {
      mode = hash.slice(1);
    } else if (hash === '#marathon') {
      mode = 'marathon-203';
    } else if (hash === '#bank') {
      mode = 'browse-bank';
    }

    let searchFilter = '';
    let topicFilter = 'ALL';
    let showAnswersInBrowse = false;
    let activeSession = null; // { key, title, items, answers, checked }

    function buildSession(newMode) {
      mode = newMode;
      const l = getLang();
      if (mode === 'mixed-20') {
        const picked = shuffleArray(bank).slice(0, Math.min(20, bank.length));
        activeSession = {
          key: 'arena_mixed_20',
          isBank: true,
          sourceItems: picked,
          answers: {},
          checked: false
        };
      } else if (mode === 'marathon-203') {
        activeSession = {
          key: 'arena_marathon_203',
          isBank: true,
          sourceItems: bank.slice(),
          answers: {},
          checked: false
        };
      } else if (mode.startsWith('topic-')) {
        const tid = Number(mode.replace('topic-', ''));
        const topic = topics.find((tp) => tp.id === tid) || topics[0];
        const topicBank = bank.filter((b) => b.topic === topic.code);
        activeSession = {
          key: `arena_topic_${topic.id}`,
          isTopic: true,
          topic,
          topicBank,
          answers: {},
          checked: false
        };
      } else {
        activeSession = null;
      }
    }

    buildSession(mode);

    function draw() {
      const l = getLang();
      const scores = getQuizScores();

      // Summary stats
      const attemptedKeys = Object.keys(scores);
      const totalSavedCorrect = attemptedKeys.reduce((acc, k) => acc + (scores[k].score || 0), 0);
      const totalSavedQs = attemptedKeys.reduce((acc, k) => acc + (scores[k].total || 0), 0);

      let bodyHtml = '';

      if (mode === 'browse-bank') {
        const q = searchFilter.trim().toLowerCase();
        const filtered = bank.filter((item) => {
          if (topicFilter !== 'ALL' && item.topic !== topicFilter) return false;
          if (!q) return true;
          const txt = `${item.id} ${item.topic} ${item.uz} ${item.en} ${item.A.uz} ${item.B.uz} ${item.C.uz} ${item.D.uz}`.toLowerCase();
          return txt.includes(q);
        });

        bodyHtml = `
          <div class="card" style="padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
              <h2 style="margin:0;">${l === 'uz' ? "Rasmiy 203 ta Test Savollari Banki" : "Official 203-Question Test Bank"}</h2>
              <label style="display:flex;align-items:center;gap:0.45rem;font-size:0.9rem;cursor:pointer;">
                <input type="checkbox" id="toggle-bank-ans" ${showAnswersInBrowse ? 'checked' : ''}>
                <span>${l === 'uz' ? "To'g'ri javoblarni ko'rsatish" : "Reveal correct answers"}</span>
              </label>
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
              <input type="search" id="bank-search" value="${escHtml(searchFilter)}" placeholder="${t('searchPlaceholder')}" style="flex:1;min-width:220px;padding:0.55rem 0.85rem;border-radius:8px;border:1px solid var(--border);background:var(--bg-subtle);color:var(--text-main);">
              <select id="bank-topic-filter" style="padding:0.55rem 0.85rem;border-radius:8px;border:1px solid var(--border);background:var(--bg-subtle);color:var(--text-main);">
                <option value="ALL">${l === 'uz' ? 'Barcha mavzular' : 'All topics'} (${bank.length})</option>
                ${topics.map((tp) => {
                  const cnt = bank.filter((b) => b.topic === tp.code).length;
                  return `<option value="${tp.code}" ${topicFilter === tp.code ? 'selected' : ''}>${tp.code} (${cnt}) — ${escHtml(tp.title[l] || tp.title.uz)}</option>`;
                }).join('')}
              </select>
            </div>
            <p class="muted" style="font-size:0.86rem;margin-bottom:1rem;">${l === 'uz' ? `Topildi: ${filtered.length} ta savol` : `Showing ${filtered.length} questions`}</p>
            <div style="display:grid;gap:0.75rem;max-height:70vh;overflow:auto;padding-right:0.25rem;">
              ${filtered.map((item) => {
                const u = bankQuestionToUniform(item, l);
                return `
                  <div class="card" style="padding:0.9rem 1rem;background:var(--bg-subtle);">
                    <div style="display:flex;justify-content:space-between;gap:0.5rem;margin-bottom:0.45rem;">
                      <span class="badge badge-accent">#${item.id} · ${item.topic}</span>
                      ${showAnswersInBrowse ? `<span class="badge badge-success">${l === 'uz' ? "Javob" : "Ans"}: ${item.ans}</span>` : ''}
                    </div>
                    <div style="font-weight:600;margin-bottom:0.5rem;">${escHtml(u.qText)}</div>
                    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:0.35rem;font-size:0.88rem;">
                      ${['A', 'B', 'C', 'D'].map((ltr, idx) => {
                        const isAns = showAnswersInBrowse && ltr === item.ans;
                        return `<div style="padding:0.3rem 0.55rem;border-radius:6px;border:1px solid ${isAns ? 'var(--success)' : 'var(--border)'};background:${isAns ? 'rgba(16,185,129,0.12)' : 'var(--bg-card)'};"><strong>${ltr})</strong> ${escHtml(u.options[idx])}</div>`;
                      }).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
          </div>`;
      } else if (activeSession && activeSession.isBank) {
        const items = activeSession.sourceItems.map((it) => bankQuestionToUniform(it, l));
        let score = 0;
        if (activeSession.checked) {
          items.forEach((it, idx) => {
            if (activeSession.answers[idx] === it.answer) score++;
          });
        }
        const title = mode === 'mixed-20'
          ? (l === 'uz' ? "Tezkor Aralash Viktorina (20 savol)" : "Quick Mixed Quiz (20 Questions)")
          : (l === 'uz' ? `Rasmiy 203-Savollik To'liq Marafon (${items.length} savol)` : `Official 203-Question Full Marathon (${items.length} Questions)`);

        bodyHtml = `
          <div class="card" style="padding:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
              <h2 style="margin:0;">${title}</h2>
              <div style="display:flex;gap:0.5rem;align-items:center;flex-wrap:wrap;">
                <span class="badge badge-accent">${Object.keys(activeSession.answers).length} / ${items.length} ${l === 'uz' ? 'belgilandi' : 'answered'}</span>
                ${activeSession.checked ? `<span class="badge ${score / items.length >= 0.6 ? 'badge-success' : 'badge-warn'}">${t('score')}: ${score} / ${items.length} (${Math.round((score / items.length) * 100)}%)</span>` : ''}
                <button type="button" class="btn btn-outline btn-sm" id="arena-reshuffle">${l === 'uz' ? 'Yangi to‘plam' : 'Reshuffle'}</button>
              </div>
            </div>
            <div style="display:grid;gap:0.9rem;">
              ${items.map((q, qi) => {
                const selected = activeSession.answers[qi];
                return `
                  <div class="quiz-q-card card" style="padding:1rem;background:var(--bg-subtle);">
                    <div style="display:flex;justify-content:space-between;gap:0.5rem;margin-bottom:0.45rem;">
                      <span style="font-weight:700;">${qi + 1}. ${escHtml(q.qText)}</span>
                      <span class="badge">${q.topic} #${q.bankId}</span>
                    </div>
                    <div style="display:grid;gap:0.4rem;">
                      ${q.options.map((opt, oi) => {
                        let cls = 'quiz-option';
                        if (selected === oi) cls += ' selected';
                        if (activeSession.checked) {
                          if (oi === q.answer) cls += ' correct';
                          else if (selected === oi) cls += ' wrong';
                        }
                        return `
                          <button type="button" class="${cls}" data-qi="${qi}" data-oi="${oi}" ${activeSession.checked ? 'disabled' : ''}>
                            <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
                            <span class="opt-text">${escHtml(opt)}</span>
                          </button>`;
                      }).join('')}
                    </div>
                  </div>`;
              }).join('')}
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1.25rem;position:sticky;bottom:0.75rem;background:var(--bg-card);padding:0.75rem;border-radius:10px;border:1px solid var(--border);box-shadow:var(--shadow);">
              ${!activeSession.checked
                ? `<button type="button" class="btn btn-primary" id="arena-check">${t('checkAnswers')}</button>`
                : `<button type="button" class="btn btn-outline" id="arena-retry">${t('tryAgain')}</button>`}
              ${activeSession.checked ? `<span class="badge badge-success" style="font-size:0.95rem;">${t('score')}: ${score} / ${items.length} (${Math.round((score / items.length) * 100)}%)</span>` : ''}
            </div>
          </div>`;
      } else if (activeSession && activeSession.isTopic) {
        const tp = activeSession.topic;
        const topicMcq = (tp.quiz || []).map((q) => topicQuestionToUniform(q, tp.code, l));
        const bankMcq = activeSession.topicBank.map((b) => bankQuestionToUniform(b, l));
        const combined = [...topicMcq, ...bankMcq];
        let score = 0;
        if (activeSession.checked) {
          combined.forEach((it, idx) => {
            if (activeSession.answers[idx] === it.answer) score++;
          });
        }

        bodyHtml = `
          <div class="card" style="padding:1.25rem;margin-bottom:1.25rem;">
            <div style="display:flex;justify-content:space-between;align-items:center;gap:0.75rem;flex-wrap:wrap;margin-bottom:1rem;">
              <div>
                <span class="badge badge-accent">${tp.code}</span>
                <h2 style="margin:0.3rem 0 0;">${escHtml(tp.title[l] || tp.title.uz)}</h2>
              </div>
              <a class="btn btn-outline btn-sm" href="topic.html?id=${tp.id}">${l === 'uz' ? "Ma'ruzani ochish" : 'Open Lecture'} →</a>
            </div>
            <p class="muted" style="font-size:0.9rem;">
              ${l === 'uz'
                ? `Mavzu savollari (${topicMcq.length}) + Rasmiy Test Bank (${bankMcq.length}) = ${combined.length} savol`
                : `Topic questions (${topicMcq.length}) + Official Test Bank (${bankMcq.length}) = ${combined.length} questions`}
            </p>
            <div style="display:grid;gap:0.9rem;margin-top:0.75rem;">
              ${combined.map((q, qi) => {
                const selected = activeSession.answers[qi];
                return `
                  <div class="quiz-q-card card" style="padding:1rem;background:var(--bg-subtle);">
                    <div style="font-weight:700;margin-bottom:0.5rem;">${qi + 1}. ${escHtml(q.qText)}</div>
                    <div style="display:grid;gap:0.4rem;">
                      ${q.options.map((opt, oi) => {
                        let cls = 'quiz-option';
                        if (selected === oi) cls += ' selected';
                        if (activeSession.checked) {
                          if (oi === q.answer) cls += ' correct';
                          else if (selected === oi) cls += ' wrong';
                        }
                        return `
                          <button type="button" class="${cls}" data-qi="${qi}" data-oi="${oi}" ${activeSession.checked ? 'disabled' : ''}>
                            <span class="opt-letter">${String.fromCharCode(65 + oi)}</span>
                            <span class="opt-text">${escHtml(opt)}</span>
                          </button>`;
                      }).join('')}
                    </div>
                    ${activeSession.checked && q.explanation ? `<div class="quiz-explanation" style="margin-top:0.6rem;font-size:0.86rem;color:var(--text-muted);">${escHtml(q.explanation)}</div>` : ''}
                  </div>`;
              }).join('')}
            </div>
            <div style="display:flex;gap:0.75rem;flex-wrap:wrap;margin-top:1rem;">
              ${!activeSession.checked
                ? `<button type="button" class="btn btn-primary" id="arena-check">${t('checkAnswers')}</button>`
                : `<button type="button" class="btn btn-outline" id="arena-retry">${t('tryAgain')}</button>`}
              ${activeSession.checked ? `<span class="badge ${score / Math.max(1, combined.length) >= 0.6 ? 'badge-success' : 'badge-warn'}">${t('score')}: ${score} / ${combined.length}</span>` : ''}
            </div>
          </div>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:1rem;">
            <div class="card" style="padding:1.1rem;">
              <h3 style="margin-top:0;">2-qism. ${t('part2Title')}</h3>
              <div id="arena-match-slot"></div>
            </div>
            <div class="card" style="padding:1.1rem;">
              <h3 style="margin-top:0;">3-qism. ${t('part3Title')}</h3>
              <div id="arena-gap-slot"></div>
            </div>
          </div>`;
      }

      root.innerHTML = `
        <div class="container" style="padding-top:1.75rem;padding-bottom:3rem;">
          <div class="page-hero" style="margin-bottom:1.5rem;">
            <span class="badge badge-accent">KOK1506 · ${bank.length} ${l === 'uz' ? 'rasmiy savol' : 'official questions'}</span>
            <h1 style="margin:0.4rem 0;">${t('quizArenaTitle')}</h1>
            <p class="muted" style="max-width:740px;">${t('quizArenaDesc')}</p>
            <div style="display:flex;gap:0.5rem;flex-wrap:wrap;margin-top:0.75rem;">
              <span class="badge badge-success">${l === 'uz' ? 'Yechilgan bo‘limlar' : 'Completed sessions'}: ${attemptedKeys.length}</span>
              ${totalSavedQs > 0 ? `<span class="badge badge-accent">${l === 'uz' ? 'Umumiy natija' : 'Cumulative score'}: ${totalSavedCorrect} / ${totalSavedQs}</span>` : ''}
            </div>
          </div>

          <div class="arena-mode-bar" style="display:flex;gap:0.55rem;flex-wrap:wrap;margin-bottom:1.25rem;align-items:center;">
            <button type="button" class="btn ${mode === 'mixed-20' ? 'btn-primary' : 'btn-outline'}" data-mode="mixed-20">⚡ ${l === 'uz' ? 'Aralash 20 savol' : 'Mixed 20 Quiz'}</button>
            <button type="button" class="btn ${mode === 'marathon-203' ? 'btn-primary' : 'btn-outline'}" data-mode="marathon-203">🏁 ${l === 'uz' ? `To‘liq ${bank.length}-savollik imtihon` : `Full ${bank.length}-Question Exam`}</button>
            <button type="button" class="btn ${mode === 'browse-bank' ? 'btn-primary' : 'btn-outline'}" data-mode="browse-bank">📚 ${l === 'uz' ? `Test bankini ko‘rish (${bank.length})` : `Browse Test Bank (${bank.length})`}</button>
            <select id="arena-topic-select" style="padding:0.52rem 0.85rem;border-radius:8px;border:1px solid var(--border);background:var(--bg-card);color:var(--text-main);font-weight:600;">
              <option value="">${l === 'uz' ? '— Mavzu bo‘yicha tanlang (M1–M23, B1) —' : '— Select Module (M1–M23, B1) —'}</option>
              ${topics.map((tp) => `<option value="topic-${tp.id}" ${mode === `topic-${tp.id}` ? 'selected' : ''}>${tp.code}: ${escHtml(tp.title[l] || tp.title.uz)}</option>`).join('')}
            </select>
          </div>

          ${bodyHtml}
        </div>`;

      root.querySelectorAll('[data-mode]').forEach((btn) => {
        btn.addEventListener('click', () => {
          buildSession(btn.dataset.mode);
          draw();
        });
      });

      const topicSel = document.getElementById('arena-topic-select');
      if (topicSel) {
        topicSel.addEventListener('change', () => {
          if (topicSel.value) {
            buildSession(topicSel.value);
            draw();
          }
        });
      }

      const reshuffleBtn = document.getElementById('arena-reshuffle');
      if (reshuffleBtn) {
        reshuffleBtn.addEventListener('click', () => {
          buildSession(mode);
          draw();
        });
      }

      root.querySelectorAll('.quiz-option').forEach((btn) => {
        btn.addEventListener('click', () => {
          if (!activeSession || activeSession.checked) return;
          activeSession.answers[Number(btn.dataset.qi)] = Number(btn.dataset.oi);
          draw();
        });
      });

      const checkBtn = document.getElementById('arena-check');
      if (checkBtn && activeSession) {
        checkBtn.addEventListener('click', () => {
          activeSession.checked = true;
          const items = activeSession.isBank
            ? activeSession.sourceItems.map((it) => bankQuestionToUniform(it, getLang()))
            : [
                ...(activeSession.topic.quiz || []).map((q) => topicQuestionToUniform(q, activeSession.topic.code, getLang())),
                ...activeSession.topicBank.map((b) => bankQuestionToUniform(b, getLang()))
              ];
          let sc = 0;
          items.forEach((it, idx) => {
            if (activeSession.answers[idx] === it.answer) sc++;
          });
          saveQuizScore(activeSession.key, sc, items.length);
          draw();
        });
      }

      const retryBtn = document.getElementById('arena-retry');
      if (retryBtn && activeSession) {
        retryBtn.addEventListener('click', () => {
          activeSession.checked = false;
          activeSession.answers = {};
          draw();
        });
      }

      if (mode === 'browse-bank') {
        const srch = document.getElementById('bank-search');
        const tflt = document.getElementById('bank-topic-filter');
        const ansToggle = document.getElementById('toggle-bank-ans');
        if (srch) {
          srch.addEventListener('input', () => {
            const pos = srch.selectionStart;
            searchFilter = srch.value;
            draw();
            const again = document.getElementById('bank-search');
            if (again) {
              again.focus();
              try { again.setSelectionRange(pos, pos); } catch (_) {}
            }
          });
        }
        if (tflt) {
          tflt.addEventListener('change', () => {
            topicFilter = tflt.value;
            draw();
          });
        }
        if (ansToggle) {
          ansToggle.addEventListener('change', () => {
            showAnswersInBrowse = ansToggle.checked;
            draw();
          });
        }
      }

      if (activeSession && activeSession.isTopic) {
        const matchSlot = document.getElementById('arena-match-slot');
        const gapSlot = document.getElementById('arena-gap-slot');
        if (matchSlot) renderMatchingWidget(matchSlot, activeSession.topic);
        if (gapSlot) renderFillGapWidget(gapSlot, activeSession.topic);
      }

      renderMathIfReady(root);
    }

    draw();
    window.addEventListener('cv:langchange', draw);
  }

  window.CV_QUIZ = {
    renderQuizWidget,
    renderMatchingWidget,
    renderFillGapWidget,
    renderSlideExercise,
    initQuizArena
  };
})();

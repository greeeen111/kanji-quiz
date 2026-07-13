/* =========================================================================
   Kanji Quiz Advance — app logic
   Semua state di memori (tidak ada localStorage), reset saat halaman di-reload.
   ========================================================================= */

const QUIZ_SIZE_LEVEL = 12;   // jumlah soal per ronde Kuis Bertahap
const QUIZ_SIZE_SPEED = 15;   // jumlah soal per ronde Mode Kecepatan
const TIME_LIMIT = 12;        // detik per soal, Mode Kecepatan
const PASS_SCORE = 0.7;       // ambang lulus per level

const state = {
  screen: "home",
  mode: null,          // 'level' | 'speed' | 'flash'
  level: null,
  speedPool: null,     // 1 | 2 | 3 | 'all'
  progress: { 1:{passed:false,best:0}, 2:{passed:false,best:0}, 3:{passed:false,best:0} },

  sessionQuestions: [],
  idx: 0,
  score: 0,
  correctCount: 0,
  answered: false,
  streak: 0,
  maxStreak: 0,

  timerId: null,
  timeLeft: TIME_LIMIT,

  flashDeck: [],
  flashIdx: 0,
  flashFlipped: false,
};

function shuffle(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
function pickSession(pool, n) {
  return shuffle(pool).slice(0, Math.min(n, pool.length)).map(q => ({
    ...q,
    options: shuffle([q.correct, ...q.distractors]),
  }));
}
function clearTimer() {
  if (state.timerId) { clearInterval(state.timerId); state.timerId = null; }
}
function nextLevelNum() {
  for (const lv of LEVELS) if (!state.progress[lv.num].passed) return lv.num;
  return null; // semua sudah lulus
}

/* ================= ROUTING ================= */
function goHome() { clearTimer(); state.screen = "home"; render(); }
function goFlashPick() { state.screen = "flash-pick"; render(); }
function goLevelPick() { state.screen = "level-pick"; render(); }
function goSpeedPick() { state.screen = "speed-pick"; render(); }

function startFlashcards(level) {
  state.mode = "flash";
  state.level = level;
  state.flashDeck = shuffle(getFlashcardableByLevel(level));
  state.flashIdx = 0;
  state.flashFlipped = false;
  state.screen = "flashcard";
  render();
}

function startLevelQuiz(level) {
  state.mode = "level";
  state.level = level;
  state.sessionQuestions = pickSession(getQuestionsByLevel(level), QUIZ_SIZE_LEVEL);
  state.idx = 0; state.score = 0; state.correctCount = 0; state.answered = false;
  state.streak = 0; state.maxStreak = 0;
  state.screen = "quiz";
  render();
}

function startSpeedQuiz(pool) {
  state.mode = "speed";
  state.speedPool = pool;
  const source = pool === "all" ? QUESTION_BANK : getQuestionsByLevel(pool);
  state.sessionQuestions = pickSession(source, QUIZ_SIZE_SPEED);
  state.idx = 0; state.score = 0; state.correctCount = 0; state.answered = false;
  state.streak = 0; state.maxStreak = 0;
  state.screen = "quiz";
  render();
  startTimerForCurrentQuestion();
}

/* ================= TIMER (speed mode) ================= */
function startTimerForCurrentQuestion() {
  clearTimer();
  state.timeLeft = TIME_LIMIT;
  updateTimerUI();
  state.timerId = setInterval(() => {
    state.timeLeft = Math.max(0, state.timeLeft - 0.1);
    updateTimerUI();
    if (state.timeLeft <= 0) {
      clearTimer();
      if (!state.answered) onAnswer(null); // timeout = salah
    }
  }, 100);
}
function updateTimerUI() {
  const ring = document.getElementById("timerFg");
  const label = document.getElementById("timerNum");
  const wrap = document.getElementById("timerRingWrap");
  if (!ring || !label) return;
  const circumference = 2 * Math.PI * 18;
  const frac = state.timeLeft / TIME_LIMIT;
  ring.style.strokeDashoffset = String(circumference * (1 - frac));
  label.textContent = Math.ceil(state.timeLeft);
  if (wrap) wrap.classList.toggle("low", state.timeLeft <= 4);
}

/* ================= QUIZ FLOW ================= */
function currentQuestion() { return state.sessionQuestions[state.idx]; }

function onAnswer(chosen) {
  if (state.answered) return;
  state.answered = true;
  clearTimer();
  const q = currentQuestion();
  const isCorrect = chosen === q.correct;

  if (isCorrect) {
    state.correctCount++;
    state.streak++;
    state.maxStreak = Math.max(state.maxStreak, state.streak);
    if (state.mode === "speed") {
      const bonus = Math.floor(100 * (state.timeLeft / TIME_LIMIT));
      state.score += 100 + bonus;
    } else {
      state.score++;
    }
  } else {
    state.streak = 0;
  }

  document.querySelectorAll(".opt").forEach(btn => {
    const val = decodeURIComponent(btn.dataset.opt);
    btn.classList.add("disabled");
    if (val === q.correct) btn.classList.add("correct");
    else if (val === chosen) btn.classList.add("wrong");
    else btn.classList.add("dim");
  });

  const fb = document.getElementById("feedback");
  const stamp = document.getElementById("stamp");
  if (fb) {
    if (isCorrect) {
      fb.textContent = "Benar! 正解 (seikai)";
      fb.className = "feedback show-correct";
    } else if (chosen === null) {
      fb.textContent = `Waktu habis — jawaban benar: ${q.correct}`;
      fb.className = "feedback show-wrong";
    } else {
      fb.textContent = `Kurang tepat — jawaban benar: ${q.correct}`;
      fb.className = "feedback show-wrong";
    }
  }
  if (stamp) {
    if (isCorrect) { stamp.textContent = "正"; stamp.classList.add("pop"); }
    else { stamp.textContent = "✕"; stamp.classList.add("pop", "wrongstamp"); }
  }

  if (state.mode === "speed") {
    updateStreakUI();
    setTimeout(onNext, 750); // auto-advance, ritme cepat
  } else {
    const nextBtn = document.getElementById("nextBtn");
    if (nextBtn) nextBtn.disabled = false;
  }
}

function updateStreakUI() {
  const el = document.getElementById("streakLabel");
  if (el) el.textContent = state.streak > 1 ? `Combo ×${state.streak}` : "";
}

function onNext() {
  state.idx++;
  state.answered = false;
  if (state.idx >= state.sessionQuestions.length) { renderResultScreen(); return; }
  render();
  if (state.mode === "speed") startTimerForCurrentQuestion();
}

/* ================= RESULT ================= */
function renderResultScreen() {
  clearTimer();
  state.screen = "result";
  if (state.mode === "level") {
    const total = state.sessionQuestions.length;
    const pct = state.correctCount / total;
    const prog = state.progress[state.level];
    prog.best = Math.max(prog.best, pct);
    if (pct >= PASS_SCORE) prog.passed = true;
  }
  render();
}

function gradeFor(pct) {
  if (pct >= 0.9) return { letter: "S", msg: "Sugoi! Nyaris sempurna." };
  if (pct >= 0.75) return { letter: "A", msg: "Mantap, udah jago." };
  if (pct >= 0.6) return { letter: "B", msg: "Lumayan, dikit lagi lancar." };
  if (pct >= 0.4) return { letter: "C", msg: "Masih perlu latihan lagi." };
  return { letter: "D", msg: "Coba pelajari kartu belajarnya dulu, ya." };
}

/* ================= FLASHCARD FLOW ================= */
function flashFlip() {
  state.flashFlipped = !state.flashFlipped;
  render();
}
function flashNext() {
  if (state.flashIdx < state.flashDeck.length - 1) { state.flashIdx++; state.flashFlipped = false; render(); }
}
function flashPrev() {
  if (state.flashIdx > 0) { state.flashIdx--; state.flashFlipped = false; render(); }
}

/* ================= RENDER ================= */
function render() {
  const app = document.getElementById("app");
  app.innerHTML = topbarHTML() + screenHTML();
  attachHandlers();
  window.scrollTo(0, 0);
}

function topbarHTML() {
  if (state.screen === "home") {
    return `
      <div class="topbar">
        <div class="brand"><span class="jp">日本語 QUIZ ADVANCE</span>Kanji Quiz</div>
      </div>`;
  }
  return `
    <div class="topbar">
      <div class="brand"><span class="jp">日本語 QUIZ ADVANCE</span>Kanji Quiz</div>
      <button class="backbtn" id="btnHome">Menu</button>
    </div>`;
}

function screenHTML() {
  switch (state.screen) {
    case "home": return homeHTML();
    case "flash-pick": return flashPickHTML();
    case "flashcard": return flashcardHTML();
    case "level-pick": return levelPickHTML();
    case "speed-pick": return speedPickHTML();
    case "quiz": return quizHTML();
    case "result": return resultHTML();
    default: return "";
  }
}

/* ---------- HOME ---------- */
function homeHTML() {
  const next = nextLevelNum();
  const slots = LEVELS.map(lv => {
    const p = state.progress[lv.num];
    let cls = "";
    let content = String(lv.num);
    if (p.passed) { cls = "done"; content = "合"; }
    else if (lv.num === next) { cls = "current"; }
    return `<div class="stampslot ${cls}">${content}</div>`;
  }).join("");

  return `
    <div class="sub">Pilih mode belajar. Semua progres level tersimpan selama halaman ini terbuka.</div>
    <div class="stampcard">
      <div class="slots">${slots}</div>
      <div class="label"><strong>Kartu Level</strong>Lulus tiap level (≥70%) untuk buka level berikutnya di Kuis Bertahap.</div>
    </div>

    <button class="modecard" id="cardFlash">
      <div class="icon">単</div>
      <div>
        <h3>Belajar Dulu</h3>
        <p>Flashcard kanji, baca, dan arti — cocok sebelum ambil kuis.</p>
        <span class="tag tag-study">Flashcard</span>
      </div>
    </button>

    <button class="modecard" id="cardLevel">
      <div class="icon">段</div>
      <div>
        <h3>Kuis Bertahap</h3>
        <p>Level 1 → 2 → 3, makin lama makin susah. Lulus dulu baru naik level.</p>
        <span class="tag tag-level">Level</span>
      </div>
    </button>

    <button class="modecard" id="cardSpeed">
      <div class="icon">速</div>
      <div>
        <h3>Mode Kecepatan</h3>
        <p>Waktu terbatas tiap soal — makin cepat jawab, makin gede skornya.</p>
        <span class="tag tag-speed">Speed</span>
      </div>
    </button>

    <div class="footer-note">150 soal total dari semua paket kosakata. Skor tidak dikirim ke server mana pun.</div>
  `;
}

/* ---------- FLASHCARD PICK ---------- */
function flashPickHTML() {
  const rows = LEVELS.filter(lv => lv.num !== 3).map(lv => `
    <button class="levelrow" data-flashlevel="${lv.num}">
      <div class="num">${lv.num}</div>
      <div><h4>${lv.name}</h4><p>${lv.desc}</p></div>
    </button>
  `).join("");
  return `
    <div class="eyebrow">Belajar Dulu</div>
    <h2 style="margin-bottom:8px;">Pilih level flashcard</h2>
    <div class="sub">Level 3 fokus di soal penalaran (deskripsi &amp; kategori), jadi paling pas langsung dicoba di Kuis Bertahap.</div>
    ${rows}
  `;
}

/* ---------- FLASHCARD ---------- */
function flashcardHTML() {
  const deck = state.flashDeck;
  const q = deck[state.flashIdx];
  const flippedCls = state.flashFlipped ? "flipped" : "";
  return `
    <div class="eyebrow">Belajar Dulu — Level ${state.level}</div>
    <div class="flash-progress">Kartu ${state.flashIdx + 1} / ${deck.length} &middot; ${q.topic}</div>
    <div class="flashzone">
      <div class="flashcard ${flippedCls}" id="flashcardEl">
        <div class="punch"></div>
        <div class="flashcard-inner">
          <div class="flashface front">
            <div class="topic">${q.topic}</div>
            <div class="kanji">${q.prompt}</div>
          </div>
          <div class="flashface back">
            <div class="reading">${q.correct}</div>
            <div class="meaning">${q.meaning}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="flashhint">Ketuk kartu untuk membalik</div>
    <div class="flashnav">
      <button id="flashPrev" ${state.flashIdx === 0 ? "disabled" : ""}>&larr; Sebelumnya</button>
      <button id="flashNext" ${state.flashIdx === deck.length - 1 ? "disabled" : ""}>Berikutnya &rarr;</button>
    </div>
    <button class="primary" id="flashToQuiz" style="margin-top:14px;">Mulai Kuis Level ${state.level}</button>
  `;
}

/* ---------- LEVEL PICK ---------- */
function levelPickHTML() {
  const rows = LEVELS.map((lv, i) => {
    const unlocked = i === 0 || state.progress[LEVELS[i - 1].num].passed;
    const p = state.progress[lv.num];
    const statusText = p.passed ? `Lulus &middot; skor terbaik ${Math.round(p.best * 100)}%` : lv.desc;
    if (unlocked) {
      return `
        <button class="levelrow" data-level="${lv.num}">
          <div class="num">${lv.num}</div>
          <div><h4>${lv.name}</h4><p>${statusText}</p></div>
        </button>`;
    }
    return `
      <div class="levelrow locked">
        <div class="num">${lv.num}</div>
        <div><h4>${lv.name}</h4><p>Lulus Level ${lv.num - 1} dulu untuk buka ini.</p></div>
        <div class="lockicon">&#128274;</div>
      </div>`;
  }).join("");
  return `
    <div class="eyebrow">Kuis Bertahap</div>
    <h2 style="margin-bottom:8px;">Pilih level</h2>
    <div class="sub">${QUIZ_SIZE_LEVEL} soal acak per ronde. Lulus minimal 70% untuk naik level.</div>
    ${rows}
  `;
}

/* ---------- SPEED PICK ---------- */
function speedPickHTML() {
  const opts = [
    { key: 1, name: "Level 1 — Dasar" },
    { key: 2, name: "Level 2 — Menengah" },
    { key: 3, name: "Level 3 — Lanjutan" },
    { key: "all", name: "Semua Level — Campuran" },
  ];
  const rows = opts.map(o => `
    <button class="levelrow" data-speed="${o.key}">
      <div class="num">${o.key === "all" ? "∀" : o.key}</div>
      <div><h4>${o.name}</h4><p>${QUIZ_SIZE_SPEED} soal &middot; ${TIME_LIMIT} detik per soal</p></div>
    </button>
  `).join("");
  return `
    <div class="eyebrow">Mode Kecepatan</div>
    <h2 style="margin-bottom:8px;">Pilih pool soal</h2>
    <div class="sub">Jawab secepat mungkin. Semakin cepat benar, semakin besar skornya.</div>
    ${rows}
  `;
}

/* ---------- QUIZ (shared: level & speed) ---------- */
function quizHTML() {
  const q = currentQuestion();
  const total = state.sessionQuestions.length;
  const pct = Math.round((state.idx) / total * 100);
  const modeLabel = state.mode === "speed" ? "Mode Kecepatan" : `Kuis Bertahap — Level ${state.level}`;

  const questionBlock = q.type === "reading"
    ? `<div class="kanji-big">${q.prompt}</div><div class="q-hint">Pilih bacaan (hiragana) yang tepat</div>`
    : `<div class="q-desc">${q.prompt}</div><div class="q-hint">${q.type === "odd" ? "Pilih kata yang tidak sekategori" : "Pilih kanji yang sesuai"}</div>`;

  const timerBlock = state.mode === "speed" ? `
    <div class="timerwrap">
      <div class="timerring" id="timerRingWrap">
        <svg viewBox="0 0 40 40" width="40" height="40">
          <circle class="bg" cx="20" cy="20" r="18"></circle>
          <circle class="fg" id="timerFg" cx="20" cy="20" r="18"
            stroke-dasharray="${2 * Math.PI * 18}" stroke-dashoffset="0"></circle>
        </svg>
        <div class="num" id="timerNum">${TIME_LIMIT}</div>
      </div>
      <div class="streak" id="streakLabel">${state.streak > 1 ? `Combo ×${state.streak}` : ""}</div>
    </div>` : "";

  return `
    <div class="eyebrow">${modeLabel}</div>
    <div class="progress-wrap">
      <div class="progress-track"><div class="progress-fill ${state.mode === "speed" ? "speed" : ""}" style="width:${pct}%"></div></div>
      <div class="progress-label">問 ${state.idx + 1} / ${total}</div>
    </div>
    ${timerBlock}
    <div class="qcard">
      <div class="stamp" id="stamp"></div>
      <div class="section-tag">${q.topic}</div>
      ${questionBlock}
      <div class="options" id="options">
        ${q.options.map((opt, i) => `
          <button class="opt" data-opt="${encodeURIComponent(opt)}">
            <span class="letter">${String.fromCharCode(65 + i)}</span>
            <span>${opt}</span>
          </button>`).join("")}
      </div>
      <div class="feedback" id="feedback"></div>
      ${state.mode === "level" ? `
      <div class="nextbar">
        <button class="primary" id="nextBtn" disabled>Lanjut</button>
      </div>` : ``}
    </div>
  `;
}

/* ---------- RESULT ---------- */
function resultHTML() {
  const total = state.sessionQuestions.length;
  const correct = state.correctCount;
  const pct = Math.round((correct / total) * 100);

  if (state.mode === "level") {
    const passed = (correct / total) >= PASS_SCORE;
    const next = nextLevelNum();
    const isLastLevel = state.level === LEVELS[LEVELS.length - 1].num;
    return `
      <div class="eyebrow">Hasil — Kuis Bertahap Level ${state.level}</div>
      <div class="result">
        <span class="passbadge ${passed ? "pass" : "retry"}">${passed ? "LULUS" : "BELUM LULUS"}</span>
        <div class="bigstamp"><div class="score-num">${correct}</div><div class="score-den">/ ${total}</div></div>
        <h2>${pct}% Benar</h2>
        <p>${passed
          ? (isLastLevel ? "Semua level Kuis Bertahap sudah kamu selesaikan!" : "Level berikutnya sudah terbuka.")
          : `Perlu minimal ${Math.round(PASS_SCORE * 100)}% untuk lulus. Coba lagi, yuk.`}</p>
        ${passed && !isLastLevel ? `<button class="primary" id="toNextLevel">Lanjut ke Level ${next}</button>` : ``}
        <button class="ghost" id="retryLevel">Ulangi Level Ini</button>
        <button class="ghost" id="homeBtn">Kembali ke Menu</button>
      </div>
      <div class="footer-note">Progres level ini hanya tersimpan selama halaman terbuka.</div>
    `;
  }

  // speed mode
  const grade = gradeFor(correct / total);
  return `
    <div class="eyebrow">Hasil — Mode Kecepatan</div>
    <div class="result">
      <div class="bigstamp amber"><div class="score-num">${grade.letter}</div><div class="score-den">grade</div></div>
      <h2>${state.score} poin</h2>
      <p>${correct}/${total} benar (${pct}%) &middot; combo tertinggi ×${state.maxStreak}<br>${grade.msg}</p>
      <button class="primary amber" id="retrySpeed">Main Lagi</button>
      <button class="ghost" id="homeBtn">Kembali ke Menu</button>
    </div>
    <div class="footer-note">Skor tidak disimpan ke server mana pun.</div>
  `;
}

/* ================= EVENT WIRING ================= */
function attachHandlers() {
  const $ = (id) => document.getElementById(id);
  if ($("btnHome")) $("btnHome").addEventListener("click", goHome);

  // home
  if ($("cardFlash")) $("cardFlash").addEventListener("click", goFlashPick);
  if ($("cardLevel")) $("cardLevel").addEventListener("click", goLevelPick);
  if ($("cardSpeed")) $("cardSpeed").addEventListener("click", goSpeedPick);

  // flash pick
  document.querySelectorAll("[data-flashlevel]").forEach(btn => {
    btn.addEventListener("click", () => startFlashcards(Number(btn.dataset.flashlevel)));
  });

  // flashcard
  if ($("flashcardEl")) $("flashcardEl").addEventListener("click", flashFlip);
  if ($("flashPrev")) $("flashPrev").addEventListener("click", flashPrev);
  if ($("flashNext")) $("flashNext").addEventListener("click", flashNext);
  if ($("flashToQuiz")) $("flashToQuiz").addEventListener("click", () => startLevelQuiz(state.level));

  // level pick
  document.querySelectorAll("[data-level]").forEach(btn => {
    btn.addEventListener("click", () => startLevelQuiz(Number(btn.dataset.level)));
  });

  // speed pick
  document.querySelectorAll("[data-speed]").forEach(btn => {
    btn.addEventListener("click", () => {
      const v = btn.dataset.speed;
      startSpeedQuiz(v === "all" ? "all" : Number(v));
    });
  });

  // quiz options
  document.querySelectorAll(".opt").forEach(btn => {
    btn.addEventListener("click", () => onAnswer(decodeURIComponent(btn.dataset.opt)));
  });
  if ($("nextBtn")) $("nextBtn").addEventListener("click", onNext);

  // result
  if ($("toNextLevel")) $("toNextLevel").addEventListener("click", () => startLevelQuiz(nextLevelNum()));
  if ($("retryLevel")) $("retryLevel").addEventListener("click", () => startLevelQuiz(state.level));
  if ($("retrySpeed")) $("retrySpeed").addEventListener("click", () => startSpeedQuiz(state.speedPool));
  if ($("homeBtn")) $("homeBtn").addEventListener("click", goHome);
}

render();

(function () {
  "use strict";

  var STORAGE_KEY = "pickme_quiz_locale";
  var data = window.PICKME_QUIZ;
  if (!data || !data.questions || !data.resultBands) {
    console.error("PICKME_QUIZ data missing");
    return;
  }

  var locale = "en";
  var step = 0;
  var choices = [];

  var el = {
    siteTitle: document.getElementById("siteTitle"),
    siteTagline: document.getElementById("siteTagline"),
    footerNote: document.getElementById("footerNote"),
    quizSection: document.getElementById("quizSection"),
    resultsSection: document.getElementById("resultsSection"),
    progressLabel: document.getElementById("progressLabel"),
    progressBar: document.getElementById("progressBar"),
    questionLegend: document.getElementById("questionLegend"),
    answersContainer: document.getElementById("answersContainer"),
    btnBack: document.getElementById("btnBack"),
    btnNext: document.getElementById("btnNext"),
    resultTitle: document.getElementById("resultTitle"),
    resultBody: document.getElementById("resultBody"),
    scoreDetails: document.getElementById("scoreDetails"),
    scoreSummaryLabel: document.getElementById("scoreSummaryLabel"),
    resultScoreLine: document.getElementById("resultScoreLine"),
    btnRestart: document.getElementById("btnRestart"),
    langButtons: document.querySelectorAll(".lang-switch__btn"),
  };

  function t(key) {
    var s = data.strings[locale] || data.strings.en;
    return s[key] != null ? s[key] : (data.strings.en[key] || "");
  }

  function setLocale(next) {
    if (next !== "en" && next !== "uk") next = "en";
    locale = next;
    try {
      localStorage.setItem(STORAGE_KEY, locale);
    } catch (e) {}
    document.documentElement.lang = locale === "uk" ? "uk" : "en";
    el.langButtons.forEach(function (btn) {
      var isOn = btn.getAttribute("data-locale") === locale;
      btn.setAttribute("aria-pressed", isOn ? "true" : "false");
    });
    applyStaticCopy();
    if (!el.resultsSection.hidden) {
      renderResults();
    } else {
      renderQuestion();
    }
  }

  function applyStaticCopy() {
    var meta = data.meta || {};
    el.siteTitle.textContent = (meta.title && meta.title[locale]) || meta.title.en || "";
    el.siteTagline.textContent = t("tagline");
    el.footerNote.textContent = t("footer");
    el.btnBack.textContent = t("back");
    el.btnNext.textContent = step >= data.questions.length - 1 ? t("seeResults") : t("next");
    el.btnRestart.textContent = t("restart");
    el.scoreSummaryLabel.textContent = t("scoreDetails");
  }

  function computeMaxScore() {
    var total = 0;
    data.questions.forEach(function (q) {
      var m = 0;
      q.answers.forEach(function (a) {
        if (a.pickMePoints > m) m = a.pickMePoints;
      });
      total += m;
    });
    return total;
  }

  var maxScore = computeMaxScore();

  function scoreFromChoices() {
    var sum = 0;
    choices.forEach(function (idx, qi) {
      var q = data.questions[qi];
      if (q && q.answers && typeof idx === "number" && q.answers[idx]) {
        sum += q.answers[idx].pickMePoints;
      }
    });
    return sum;
  }

  function bandForScore(score) {
    var bands = data.resultBands;
    for (var i = 0; i < bands.length; i++) {
      var b = bands[i];
      if (score >= b.min && score <= b.max) return b;
    }
    if (bands.length && score < bands[0].min) return bands[0];
    return bands[bands.length - 1];
  }

  function updateProgress() {
    var n = data.questions.length;
    var label = t("progressOf")
      .replace("{k}", String(step + 1))
      .replace("{n}", String(n));
    el.progressLabel.textContent = label;
    var pct = Math.round(((step + 1) / n) * 100);
    el.progressBar.style.setProperty("--progress-pct", pct + "%");
    el.progressBar.setAttribute("aria-valuenow", String(pct));
    el.progressBar.setAttribute("aria-valuetext", label);
  }

  function selectedIndexForStep() {
    return choices[step];
  }

  function renderQuestion() {
    var q = data.questions[step];
    if (!q) return;

    el.questionLegend.textContent = q.text[locale] || q.text.en;
    el.answersContainer.innerHTML = "";

    var groupName = "q_" + q.id;
    var current = selectedIndexForStep();

    q.answers.forEach(function (ans, idx) {
      var id = groupName + "_" + idx;
      var label = document.createElement("label");
      label.className = "answer";
      label.setAttribute("for", id);

      var input = document.createElement("input");
      input.type = "radio";
      input.name = groupName;
      input.id = id;
      input.value = String(idx);
      if (current === idx) input.checked = true;

      var span = document.createElement("span");
      span.textContent = ans.text[locale] || ans.text.en;

      label.appendChild(input);
      label.appendChild(span);
      el.answersContainer.appendChild(label);

      input.addEventListener("change", function () {
        choices[step] = idx;
        el.btnNext.disabled = false;
      });
    });

    el.btnBack.hidden = step === 0;
    el.btnNext.disabled = typeof current !== "number";
    el.btnNext.textContent = step >= data.questions.length - 1 ? t("seeResults") : t("next");

    updateProgress();
  }

  function renderResults() {
    var score = scoreFromChoices();
    var band = bandForScore(score);
    el.resultTitle.textContent = band.title[locale] || band.title.en;
    el.resultBody.textContent = band.body[locale] || band.body.en;
    el.resultScoreLine.textContent = t("scoreLine").replace("{x}", String(score)).replace("{y}", String(maxScore));
  }

  function showResultsView() {
    el.quizSection.hidden = true;
    el.resultsSection.hidden = false;
    renderResults();
    el.resultTitle.focus();
  }

  function showQuizView() {
    el.resultsSection.hidden = true;
    el.quizSection.hidden = false;
  }

  el.btnNext.addEventListener("click", function () {
    if (el.btnNext.disabled) return;
    if (step >= data.questions.length - 1) {
      showResultsView();
      return;
    }
    step += 1;
    renderQuestion();
  });

  el.btnBack.addEventListener("click", function () {
    if (step <= 0) return;
    step -= 1;
    renderQuestion();
  });

  el.btnRestart.addEventListener("click", function () {
    step = 0;
    choices = [];
    showQuizView();
    renderQuestion();
  });

  el.langButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      setLocale(btn.getAttribute("data-locale"));
    });
  });

  el.resultTitle.setAttribute("tabindex", "-1");

  try {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "uk" || saved === "en") locale = saved;
  } catch (e) {}

  setLocale(locale);
  renderQuestion();
})();

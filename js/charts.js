(() => {
  'use strict';
  const data = window.STUDY_DATA;
  const escape = value => String(value).replace(/[&<>"']/g, char => ({ '&':'&amp;', '<':'&lt;', '>':'&gt;', '"':'&quot;', "'":'&#39;' }[char]));
  window.studyEscape = escape;
  window.studyMetric = (question, id, cohort = 'target') => data.questions[question].items.find(item => item.id === id).counts[cohort];
  const state = { cohort: 'target', family: 'situations' };
  function bars(questionId, cohort, limit) {
    const question = data.questions[questionId];
    const n = data.cohorts[cohort].n;
    const items = question.multiple ? [...question.items].sort((a,b) => b.counts[cohort] - a.counts[cohort]) : question.items;
    return `<div class="bar-chart" role="list" aria-label="${escape(question.title)}">${items.slice(0,limit || items.length).map(item => {
      const value = item.counts[cohort];
      return `<div class="bar-row" role="listitem" aria-label="${escape(item.label)} : ${value} sur ${n}"><span class="bar-label" aria-hidden="true">${escape(item.label)}</span><span class="bar-value" aria-hidden="true">${value} <small>/ ${n}</small></span><div class="bar-track" aria-hidden="true"><span class="bar-fill" style="--bar-width:${100 * value / n}%"></span></div></div>`;
    }).join('')}</div>`;
  }
  function caption(questionId, cohort) {
    const question = data.questions[questionId];
    return `<p>${question.multiple ? 'Plusieurs réponses possibles. Les effectifs ne s’additionnent pas.' : 'Une réponse par personne.'} Base : ${data.cohorts[cohort].n} réponses.</p><p>Source : ${escape(data.source.label)}. <a href="donnees.html#methodologie">Méthodologie</a></p>`;
  }
  function renderFixedCharts() {
    document.querySelectorAll('[data-chart]').forEach(element => {
      const cohort = element.dataset.cohort === 'selected' ? state.cohort : 'target';
      const questionId = element.dataset.chart;
      element.innerHTML = bars(questionId, cohort, Number(element.dataset.limit) || undefined);
      const captionElement = element.closest('figure')?.querySelector('.chart-caption');
      if (captionElement) captionElement.innerHTML = caption(questionId, cohort);
    });
  }
  function renderExplorer() {
    const element = document.querySelector('[data-explorer-chart]');
    if (!element) return;
    const question = data.questions[state.family];
    const n = data.cohorts[state.cohort].n;
    element.innerHTML = `<span class="source-tag">Notre questionnaire</span><h2 id="explorer-title">${escape(question.title)}</h2><p class="question-wording">Question posée : « ${escape(question.wording)} »</p>${bars(state.family,state.cohort)}<figcaption class="chart-caption">${caption(state.family,state.cohort)}</figcaption><details class="chart-as-table"><summary>Lire les valeurs dans un tableau</summary><table><caption class="sr-only">${escape(question.title)}, ${escape(data.cohorts[state.cohort].label)}</caption><thead><tr><th scope="col">Réponse</th><th scope="col">Effectif / ${n}</th></tr></thead><tbody>${question.items.map(item => `<tr><th scope="row">${escape(item.label)}</th><td>${item.counts[state.cohort]}</td></tr>`).join('')}</tbody></table></details>`;
    document.querySelectorAll('[data-chart-family]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.chartFamily === state.family)));
    document.querySelectorAll('[data-cohort-button]').forEach(button => button.setAttribute('aria-pressed', String(button.dataset.cohortButton === state.cohort)));
    const info = document.querySelector('[data-cohort-info]');
    if (info) info.innerHTML = `<strong>${n} réponses</strong> · ${escape(data.cohorts[state.cohort].label)}`;
    const live = document.querySelector('[data-data-status]');
    if (live) live.textContent = `${question.title}. ${data.cohorts[state.cohort].label} : ${n} réponses.`;
    renderFixedCharts();
  }
  function renderNational() {
    document.querySelectorAll('[data-national]').forEach(element => {
      const indicator = window.PUBLIC_DATA.vrs.indicators[element.dataset.national];
      element.innerHTML = `<span class="source-tag national">Données nationales · 2022</span><h3>${escape(indicator.title)}</h3><div class="national-comparison">${[['Femmes',indicator.female],['Hommes',indicator.male]].map(([label,value]) => `<div class="national-row"><strong>${value}<small> %</small></strong><div><span>${label}</span><div class="national-track" aria-hidden="true"><i style="--bar-width:${value}%"></i></div></div></div>`).join('')}</div><p class="national-note">${indicator.note || ''} ${escape(window.PUBLIC_DATA.vrs.field)}</p><p class="source"><a href="${window.PUBLIC_DATA.vrs.url}" target="_blank" rel="noopener">Source : SSMSI, VRS 2022 ↗</a></p>`;
    });
    const recorded = document.querySelector('[data-recorded-stat]');
    if (recorded) {
      const stat = window.PUBLIC_DATA.recorded;
      recorded.innerHTML = `<strong>${new Intl.NumberFormat('fr-FR').format(stat.count)}</strong><div><h3>${escape(stat.label)} dans les transports en commun.</h3><p>${escape(stat.field)}</p><p class="source"><a href="${stat.url}" target="_blank" rel="noopener">${escape(stat.source)} ↗</a></p></div>`;
    }
  }
  document.querySelectorAll('[data-cohort-button]').forEach(button => button.addEventListener('click', () => { state.cohort = button.dataset.cohortButton; renderExplorer(); }));
  document.querySelectorAll('[data-chart-family]').forEach(button => button.addEventListener('click', () => { state.family = button.dataset.chartFamily; renderExplorer(); }));
  document.querySelectorAll('[data-metric]').forEach(element => {
    const [question,id] = element.dataset.metric.split('.');
    element.textContent = window.studyMetric(question,id);
  });
  document.querySelectorAll('[data-denominator]').forEach(element => { element.textContent = data.cohorts.target.n; });
  document.querySelectorAll('[data-total]').forEach(element => { element.textContent = data.source.total; });
  const avoidanceSummary = document.querySelector('[data-avoidance-summary]');
  if (avoidanceSummary) avoidanceSummary.textContent = data.questions.avoidance.items.filter(item => item.id !== 'never').map(item => `${item.counts.target} « ${item.label.toLowerCase()} »`).join(', ') + '.';
  renderFixedCharts();
  renderExplorer();
  renderNational();
})();

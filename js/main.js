(() => {
  'use strict';
  const content = window.STUDY_CONTENT;
  const esc = window.studyEscape;
  const icon = (kind) => {
    const paths = {
      person: '<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',
      people: '<circle cx="9" cy="7" r="3"/><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 4a3 3 0 0 1 0 6m2 4a6 6 0 0 1 3 5v2"/>',
      pin: '<path d="M20 9c0 6-8 13-8 13S4 15 4 9a8 8 0 1 1 16 0Z"/><circle cx="12" cy="9" r="2.5"/>',
      city: '<path d="M3 22V8h7v14M10 22V2h11v20M6 11h1m-1 4h1m7-9h3m-3 4h3m-3 4h3m-3 4h3"/>',
      shield: '<path d="m12 2 9 4v6c0 5-5 9-9 11-4-2-9-6-9-11V6Z"/><path d="m8 12 3 3 5-6"/>',
      phone: '<path d="m6 3 3 5-2 3a14 14 0 0 0 6 6l3-2 5 3c-1 4-4 5-8 3C7 18 3 13 2 7c0-3 1-4 4-4Z"/>',
      battery: '<rect x="2" y="6" width="17" height="12" rx="2"/><path d="M22 10v4M6 9v6"/>',
      unlock: '<rect x="5" y="10" width="14" height="12" rx="2"/><path d="M8 10V6a4 4 0 0 1 8 0M12 15v3"/>'
    };
    return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[kind] || paths.pin}</svg>`;
  };
  window.studyIcon = icon;
  const menuButton = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  function closeMenu() { nav?.classList.remove('is-open'); menuButton?.setAttribute('aria-expanded','false'); if (menuButton) menuButton.textContent = 'Menu +'; }
  menuButton?.addEventListener('click', () => { const opened = menuButton.getAttribute('aria-expanded') !== 'true'; nav.classList.toggle('is-open',opened); menuButton.setAttribute('aria-expanded',String(opened)); menuButton.textContent = opened ? 'Fermer −' : 'Menu +'; });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav?.classList.contains('is-open')) { closeMenu(); menuButton.focus(); } });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click',closeMenu));
  document.addEventListener('click', event => { if (nav?.classList.contains('is-open') && !event.target.closest('.site-header')) closeMenu(); });
  window.matchMedia('(min-width: 601px)').addEventListener('change',closeMenu);

  function mapSvg(id, dynamic) {
    const blocks = [[35,25,62,63],[121,25,66,65],[217,23,70,65],[316,24,60,47],[405,26,59,40],[30,122,78,65],[140,126,56,51],[235,126,46,64],[326,101,69,42],[425,104,46,60],[32,220,51,55],[116,217,57,30],[203,262,82,71],[312,205,45,59],[387,204,69,55],[33,323,50,48],[117,323,49,48],[329,305,54,59],[413,295,53,70]];
    return `<svg viewBox="0 0 500 400" aria-hidden="true"><defs><pattern id="${id}-dots" width="22" height="22" patternUnits="userSpaceOnUse"><circle cx="1" cy="1" r=".7" fill="#45622f"/></pattern></defs><rect width="500" height="400" fill="#163300"/><rect width="500" height="400" fill="url(#${id}-dots)"/><g fill="#24400f" stroke="#44602e" stroke-width=".8">${blocks.map(([x,y,w,h]) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="9"/>`).join('')}</g><g stroke="#52703c" fill="none" stroke-width="1"><path d="M0 102H500M0 199H500M0 286H500M98 0V400M207 0V400M299 0V400M399 0V400"/><path d="M-10 370 510 35"/></g><path d="M92 292 214 228 333 154 423 73" stroke="#839970" stroke-width="2" stroke-dasharray="5 7" fill="none"/><path class="route-active" data-map-path="${id}" d="M92 292V238Q92 222 110 222H194Q214 222 214 202V175Q214 154 236 154H310Q333 154 333 131V97Q333 73 357 73H423" fill="none" stroke="#9fe870" stroke-width="5" stroke-linecap="round" ${dynamic ? 'style="stroke-dashoffset:650"' : ''}/><circle cx="92" cy="292" r="9" fill="#9fe870" stroke="#163300" stroke-width="4"/><circle cx="423" cy="73" r="9" fill="white" stroke="#163300" stroke-width="4"/><g fill="#9fe870"><circle cx="214" cy="228" r="4"/><circle cx="333" cy="154" r="4"/></g>${dynamic ? '<circle class="route-marker" data-map-marker cx="92" cy="292" r="10" fill="#fff" stroke="#9fe870" stroke-width="4"/>' : ''}<g transform="translate(448 317)" stroke="#9cb087" stroke-width="1.3" fill="none"><circle r="15"/><path d="M0-10V10M-10 0H10"/></g><text x="444" y="297" fill="#b4c6a3" font-size="8" font-family="Inter, sans-serif">N</text></svg>`;
  }
  document.querySelectorAll('[data-route-map]').forEach(element => { const id = element.dataset.routeMap; element.innerHTML = mapSvg(id,id==='story'); });
  const steps = document.querySelector('[data-story-steps]');
  if (steps) {
    steps.innerHTML = content.story.map((step,index) => `<article class="story-step ${index===0?'is-active':''}" data-story-step="${index}"><div class="step-number"><i>0${index+1}</i><span>${step.time} — ${esc(step.short)}</span></div><h3>${esc(step.title)}</h3><p>${esc(step.text)}</p></article>`).join('');
    const marker = document.querySelector('[data-map-marker]');
    const path = document.querySelector('[data-map-path="story"]');
    const pathLength = path?.getTotalLength() || 650;
    if (path) { path.style.strokeDasharray = String(pathLength); path.style.strokeDashoffset = String(pathLength); }
    const points = [0,.36,.7,1];
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const index = Number(entry.target.dataset.storyStep);
        document.querySelectorAll('[data-story-step]').forEach(element => element.classList.toggle('is-active',Number(element.dataset.storyStep)===index));
        const point = path?.getPointAtLength(pathLength * points[index]);
        if (point && marker) { marker.setAttribute('cx',String(point.x)); marker.setAttribute('cy',String(point.y)); }
        if (path) path.style.strokeDashoffset = String(pathLength * (1-points[index]));
        const label = document.querySelector('[data-story-label]');
        if (label) label.textContent = content.story[index].short;
      });
    }, { rootMargin: '-25% 0px -35% 0px', threshold: 0 });
    steps.querySelectorAll('article').forEach(element => observer.observe(element));
  }
  const chainControls = document.querySelector('[data-chain-controls]');
  const chainDetail = document.querySelector('[data-chain-detail]');
  if (chainControls && chainDetail) {
    chainControls.innerHTML = content.chain.map((step,index) => `<button class="chain-button" type="button" data-chain="${index}" aria-pressed="${index===0}" aria-controls="chain-detail"><small>0${index+1}</small><span>${esc(step.title)}</span><b aria-hidden="true">↗</b></button>`).join('');
    const render = index => { const step=content.chain[index]; chainControls.querySelectorAll('button').forEach((button,i) => button.setAttribute('aria-pressed',String(i===index))); chainDetail.innerHTML = `<div class="detail-index">0${index+1} / 04 — ${esc(step.title)}</div><h3>${esc(step.line)}</h3><p>${esc(step.description)}</p><ul class="example-list">${step.examples.map(text => `<li>${esc(text)}</li>`).join('')}</ul>`; };
    chainControls.querySelectorAll('button').forEach(button => button.addEventListener('click',() => render(Number(button.dataset.chain)))); render(0);
  }
  const phoneTabs = document.querySelector('[data-phone-tabs]');
  if (phoneTabs) {
    phoneTabs.innerHTML = content.phone.map((item,index) => `<button type="button" data-phone="${index}" aria-pressed="${index===0}" aria-controls="phone-detail">${esc(item.title)}</button>`).join('');
    const render = index => {
      const item = content.phone[index];
      phoneTabs.querySelectorAll('button').forEach((button,i) => button.setAttribute('aria-pressed',String(i===index)));
      document.querySelector('[data-phone-explanation]').textContent = item.detail;
      document.querySelector('[data-phone-screen]').textContent = item.screen;
      document.querySelector('[data-phone-icon]').innerHTML = icon(['phone','battery','unlock'][index]);
      document.querySelector('.phone-device').dataset.state = item.id;
      document.querySelector('[data-phone-metric]').innerHTML = `<strong>${window.studyMetric(item.metric.question,item.metric.item)}<small> / ${window.STUDY_DATA.cohorts.target.n}</small></strong><span>${esc(item.caption)}</span>`;
    };
    phoneTabs.querySelectorAll('button').forEach(button => button.addEventListener('click',() => render(Number(button.dataset.phone)))); render(0);
  }
  const journeyList=document.querySelector('[data-journey-list]');
  if(journeyList) journeyList.innerHTML = content.journey.map((item,index) => `<li class="journey-card ${index===2||index===3?'is-friction':''}"><div class="journey-index"><span>${index===2||index===3?'Zone étudiée':'Parcours du déplacement'}</span></div><h3>${esc(item.title)}</h3><p>${esc(item.text)}</p><div class="journey-need">${esc(item.need)}</div></li>`).join('');
  const actorMap = document.querySelector('[data-actor-map]');
  const actorDetail = document.querySelector('[data-actor-detail]');
  if (actorMap && actorDetail) {
    actorMap.innerHTML = `<div class="actor-orbit orbit-three"></div><div class="actor-orbit orbit-two"></div><div class="actor-orbit orbit-one"></div><div class="actor-center"><div>${icon('person')}<span>La personne<br>en déplacement</span></div></div>${content.actors.map((item,index) => `<button class="actor-node" type="button" data-actor="${item.id}" aria-pressed="${index===0}" aria-controls="actor-detail">${icon(['people','pin','city','shield'][index])}<span>${esc(['Les proches','Sur place','Le territoire','L’intervention'][index])}</span></button>`).join('')}`;
    const render = id => { const actor=content.actors.find(item => item.id===id); actorMap.querySelectorAll('button').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.actor===id))); actorDetail.innerHTML = `<span class="eyebrow">${esc(actor.position)}</span><h3>${esc(actor.title)}</h3><p class="actor-role">${esc(actor.role)}</p><p class="actor-limit">${esc(actor.limit)}</p><p class="actor-examples">${esc(actor.examples)}</p>`; };
    actorMap.querySelectorAll('button').forEach(button => button.addEventListener('click',()=>render(button.dataset.actor))); render('close');
  }
  const alternatives=document.querySelector('[data-alternatives]');
  if(alternatives) {
    const render = stage => {
      const items = content.alternatives.filter(item => stage==='all' || item.stages.includes(Number(stage)));
      alternatives.innerHTML = items.map(item => `<article class="alternative-card"><p class="alt-family">${esc(item.family)}</p><div class="alternative-title"><h3>${esc(item.title)}</h3><span>${item.stages.length} étapes</span></div><p class="alt-role">${esc(item.role)}</p><p class="alt-limit"><strong>Condition / limite.</strong> ${esc(item.limit)}</p><p class="source">${item.url ? `<a href="${item.url}" target="_blank" rel="noopener">${esc(item.source)} ↗</a>` : esc(item.source)}</p></article>`).join('');
      document.querySelectorAll('[data-stage-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.stageFilter===stage)));
      document.querySelector('[data-alternative-status]').textContent = `${items.length} alternatives affichées${stage==='all'?' pour l’ensemble du parcours':` à l’étape « ${content.journey[Number(stage)].title} »`}.`;
    };
    document.querySelectorAll('[data-stage-filter]').forEach(button => button.addEventListener('click',()=>render(button.dataset.stageFilter))); render('all');
  }
  if(content.report.url) document.querySelectorAll('[data-report-slot]').forEach(element => { const link=document.createElement('a'); link.href=content.report.url; link.className='button'; link.textContent=content.report.label; element.replaceChildren(link); });
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if(!reducedMotion.matches && 'IntersectionObserver' in window) {
    const observer=new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);} }),{threshold:.07});
    document.querySelectorAll('.reveal').forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    reducedMotion.addEventListener('change',event=>{if(event.matches) document.querySelectorAll('.reveal').forEach(element=>element.classList.add('is-visible'));});
  }
})();

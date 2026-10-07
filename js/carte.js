/* Carte mentale interactive. Script classique (pas de module, pas de fetch) pour fonctionner en file://.
   Les contenus viennent de data/carte.js (window.CARTE). */
(function () {
  'use strict';

  var C = window.CARTE;
  if (!C) return;

  var SVGNS = 'http://www.w3.org/2000/svg';
  var STORE = 'carte-7b-v2';
  var FULL = [0, 0, 1500, 860];
  var CX = 750, CY = 430, CENTER_W = 300, CENTER_H = 150;
  /* Branches dans le sens des aiguilles d'une montre, depuis le haut à droite. */
  var POS = [
    { x: 1030, y: 165, side: 1 }, { x: 1075, y: 430, side: 1 }, { x: 1030, y: 690, side: 1 },
    { x: 470, y: 690, side: -1 }, { x: 425, y: 430, side: -1 }, { x: 470, y: 165, side: -1 }
  ];

  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var mobileQuery = window.matchMedia('(max-width: 899px)');

  /* ---------- Étapes linéaires ---------- */
  var steps = [{ b: -1, i: -1 }];
  var branchStart = [], branchEnd = [];
  C.branches.forEach(function (br, b) {
    branchStart[b] = steps.length;
    br.ideas.forEach(function (idea, i) { steps.push({ b: b, i: i, idea: idea, br: br }); });
    branchEnd[b] = steps.length - 1;
  });
  var LAST = steps.length - 1;
  var IDEAS = LAST;

  /* ---------- État ---------- */
  function freshState() {
    return { cur: 0, max: 0, overview: false, guesses: {}, scen: {}, quiz: {}, chain: {}, sol: {} };
  }
  var state = freshState();
  try {
    var saved = JSON.parse(window.localStorage.getItem(STORE) || 'null');
    if (saved && typeof saved.max === 'number' && saved.max <= LAST) {
      state = Object.assign(freshState(), saved, { overview: false });
    }
  } catch (e) { /* stockage indisponible : on part de zéro */ }
  function save() {
    try { window.localStorage.setItem(STORE, JSON.stringify(state)); } catch (e) { /* sans effet */ }
  }

  /* ---------- Utilitaires ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function typo(s) { return String(s).replace(/ ([?!:;»%])/g, '\u00a0$1').replace(/« /g, '«\u00a0'); }
  function esc(s) {
    return typo(s)
      .replace(/[&<>"']/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
      });
  }
  function num(v, d) {
    return Number(v).toFixed(d || 0).replace('.', ',');
  }
  function pct(v) { return (v === 0 ? '0' : num(v / C.n * 100, 1)) + ' %'; }
  function svg(tag, attrs, parent) {
    var el = document.createElementNS(SVGNS, tag);
    for (var k in attrs) el.setAttribute(k, attrs[k]);
    if (parent) parent.appendChild(el);
    return el;
  }
  function reachable(i) { return i <= state.max + 1; }
  function branchUnlocked(b) { return reachable(branchStart[b]); }

  var els = {
    map: $('[data-map]'), panel: $('[data-panel]'), progress: $('[data-progress]'),
    prev: $('[data-prev]'), next: $('[data-next]'), chips: $('[data-chips]'),
    outline: $('[data-outline]'), live: $('[data-live]'), hint: $('[data-hint]'),
    overviewBtn: $('[data-overview]')
  };

  /* ---------- Carte SVG ---------- */
  var nodes = { center: null, branches: [], leaves: [] };

  function branchWidth(title) { return Math.round(title.length * 11.5 + 78); }

  function buildMap() {
    var map = els.map;
    var gLinks = svg('g', { class: 'links' }, map);
    var gNodes = svg('g', { class: 'nodes' }, map);

    C.branches.forEach(function (br, b) {
      var p = POS[b], w = branchWidth(br.title), side = p.side;
      var g = svg('g', { class: 'branch', 'data-b': b }, gNodes);
      var gl = svg('g', { class: 'branch-links', 'data-b': b }, gLinks);

      /* lien centre → branche */
      var x1 = CX + side * (CENTER_W / 2), y1 = CY, x2 = p.x - side * (w / 2), y2 = p.y;
      svg('path', { class: 'link link-main', d: 'M' + x1 + ' ' + y1 + ' C' + (x1 + side * 90) + ' ' + y1 + ' ' + (x2 - side * 90) + ' ' + y2 + ' ' + x2 + ' ' + y2 }, gl);

      /* nœud de branche */
      var node = svg('g', { class: 'branch-node', tabindex: '0', role: 'button', 'data-goto-branch': b }, g);
      svg('rect', { x: p.x - w / 2, y: p.y - 26, width: w, height: 52, rx: 26 }, node);
      svg('circle', { class: 'branch-num-bg', cx: p.x - w / 2 + 28, cy: p.y, r: 16 }, node);
      var n = svg('text', { class: 'branch-num', x: p.x - w / 2 + 28, y: p.y + 1 }, node);
      n.textContent = String(b + 1);
      var t = svg('text', { class: 'branch-title', x: p.x - w / 2 + 54, y: p.y + 1 }, node);
      t.textContent = br.title;
      nodes.branches[b] = { g: g, gl: gl, node: node, w: w };

      /* feuilles */
      var count = br.ideas.length, gap = count > 4 ? 40 : 48;
      br.ideas.forEach(function (idea, i) {
        var stepIndex = branchStart[b] + i;
        var lx = p.x + side * (w / 2 + 110), ly = p.y + (i - (count - 1) / 2) * gap;
        var sx = p.x + side * (w / 2);
        svg('path', { class: 'link link-leaf', 'data-step': stepIndex, d: 'M' + sx + ' ' + p.y + ' C' + (sx + side * 60) + ' ' + p.y + ' ' + (lx - side * 60) + ' ' + ly + ' ' + (lx - side * 7) + ' ' + ly }, gl);
        var lg = svg('g', { class: 'leaf', tabindex: '0', role: 'button', 'data-step': stepIndex }, g);
        var hit = svg('rect', { class: 'leaf-hit', rx: 8 }, lg);
        svg('circle', { cx: lx, cy: ly, r: 7 }, lg);
        var lt = svg('text', { x: lx + side * 16, y: ly + 1, 'text-anchor': side > 0 ? 'start' : 'end' }, lg);
        lt.textContent = typo(idea.label);
        nodes.leaves[stepIndex] = { g: lg, hit: hit, text: lt, x: lx, y: ly, side: side };
      });
    });

    /* centre */
    var c = svg('g', { class: 'center-node', tabindex: '0', role: 'button', 'data-goto': 0, 'aria-label': 'Problématique' }, gNodes);
    svg('rect', { x: CX - CENTER_W / 2, y: CY - CENTER_H / 2, width: CENTER_W, height: CENTER_H, rx: 28 }, c);
    var lab = svg('text', { class: 'center-label', x: CX, y: CY - 38 }, c);
    lab.textContent = C.center.label.toUpperCase();
    C.center.short.forEach(function (line, k) {
      var tl = svg('text', { class: 'center-line', x: CX, y: CY - 4 + k * 28 }, c);
      tl.textContent = line;
    });
    nodes.center = c;
    sizeHitAreas();
  }

  function sizeHitAreas() {
    nodes.leaves.forEach(function (lf) {
      if (!lf) return;
      try {
        var bb = lf.text.getBBox();
        var x0 = Math.min(bb.x, lf.x - 12), x1 = Math.max(bb.x + bb.width, lf.x + 12);
        lf.hit.setAttribute('x', x0 - 8); lf.hit.setAttribute('y', lf.y - 18);
        lf.hit.setAttribute('width', x1 - x0 + 16); lf.hit.setAttribute('height', 36);
      } catch (e) { /* SVG non rendu (mobile) */ }
    });
  }

  function updateMap() {
    var cur = steps[state.cur];
    nodes.center.classList.toggle('is-active', state.cur === 0 && !state.overview);
    els.map.classList.toggle('is-focused', cur.b >= 0 && !state.overview);
    C.branches.forEach(function (br, b) {
      var nb = nodes.branches[b];
      var unlocked = branchUnlocked(b);
      var active = cur.b === b && !state.overview;
      var done = branchEnd[b] <= state.max;
      nb.g.classList.toggle('is-locked', !unlocked);
      nb.gl.classList.toggle('is-locked', !unlocked);
      nb.gl.classList.toggle('is-active', active);
      nb.g.classList.toggle('is-active', active);
      nb.g.classList.toggle('is-done', done && !active);
      nb.node.setAttribute('tabindex', unlocked ? '0' : '-1');
      nb.node.setAttribute('aria-disabled', String(!unlocked));
      nb.node.setAttribute('aria-label', 'Branche ' + (b + 1) + ' : ' + br.title + (unlocked ? '' : ' (verrouillée)'));
      br.ideas.forEach(function (idea, i) {
        var s = branchStart[b] + i, lf = nodes.leaves[s];
        var seen = s <= state.max, isCur = s === state.cur && !state.overview;
        lf.g.classList.toggle('is-current', isCur);
        lf.g.classList.toggle('is-seen', seen && !isCur);
        lf.g.classList.toggle('is-next', !seen && reachable(s));
        lf.g.setAttribute('tabindex', unlocked && reachable(s) ? '0' : '-1');
        lf.g.setAttribute('aria-disabled', String(!reachable(s)));
        lf.g.setAttribute('aria-label', br.title + ', idée ' + (i + 1) + ' : ' + idea.label + (reachable(s) ? '' : ' (verrouillée)'));
        if (isCur) lf.g.setAttribute('aria-current', 'step'); else lf.g.removeAttribute('aria-current');
        var path = nb.gl.querySelector('[data-step="' + s + '"]');
        path.classList.toggle('is-seen', seen);
      });
    });
  }

  /* ---------- Caméra (animation du viewBox) ---------- */
  var vb = FULL.slice(), anim = null;

  function fit(x0, y0, x1, y1, minW) {
    var rect = els.map.getBoundingClientRect();
    var ratio = rect.width > 0 && rect.height > 0 ? rect.width / rect.height : 1.6;
    var w = x1 - x0, h = y1 - y0, cx = (x0 + x1) / 2, cy = (y0 + y1) / 2;
    if (w < minW) w = minW;
    if (w / h < ratio) w = h * ratio; else h = w / ratio;
    return [cx - w / 2, cy - h / 2, w, h];
  }

  function fullBox() {
    try {
      var bb = els.map.querySelector('.nodes').getBBox();
      return fit(bb.x - 30, bb.y - 30, bb.x + bb.width + 30, bb.y + bb.height + 30, 0);
    } catch (e) { return FULL.slice(); }
  }

  function targetBox() {
    var cur = steps[state.cur];
    if (state.overview || cur.b < 0) return fullBox();
    var bb;
    try { bb = nodes.branches[cur.b].g.getBBox(); } catch (e) { return FULL.slice(); }
    /* Sur une scène étroite, on cadre la branche seule pour garder un texte lisible. */
    var wide = els.map.getBoundingClientRect().width >= 900;
    var x0 = bb.x, x1 = bb.x + bb.width, y0 = bb.y, y1 = bb.y + bb.height;
    if (wide) {
      x0 = Math.min(x0, CX - CENTER_W / 2); x1 = Math.max(x1, CX + CENTER_W / 2);
      y0 = Math.min(y0, CY - CENTER_H / 2); y1 = Math.max(y1, CY + CENTER_H / 2);
    }
    var pad = 48;
    return fit(x0 - pad, y0 - pad, x1 + pad, y1 + pad, wide ? 1000 : 600);
  }

  function setVB(a) { vb = a; els.map.setAttribute('viewBox', a.map(function (v) { return v.toFixed(1); }).join(' ')); }

  function moveCamera(instant) {
    var to = targetBox(), from = vb.slice();
    if (anim) cancelAnimationFrame(anim);
    if (instant || reduceMotion) { setVB(to); return; }
    var t0 = null, dur = 650;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / dur);
      var e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      setVB(from.map(function (v, i) { return v + (to[i] - v) * e; }));
      if (k < 1) anim = requestAnimationFrame(frame); else anim = null;
    }
    anim = requestAnimationFrame(frame);
  }

  /* ---------- Rendu du panneau ---------- */
  function source(src) {
    if (!src) return '';
    if (typeof src === 'string') return '<p class="source">Source : ' + esc(src) + '</p>';
    return '<p class="source">Source : <a href="' + esc(src.url) + '" target="_blank" rel="noopener">' + esc(src.label) + '</a></p>';
  }
  function lead(t) { return t ? '<p class="lead">' + esc(t) + '</p>' : ''; }
  function after(t) { return t ? '<p class="after">' + esc(t) + '</p>' : ''; }

  function bars(b) {
    var max = C.n;
    return '<figure class="bars"><figcaption>' + esc(b.title) + '</figcaption><ul>' + b.items.map(function (it) {
      return '<li class="' + (it.hot ? 'hot' : '') + '"><span class="bar-label">' + esc(it.k) + '</span>' +
        '<span class="bar-track" aria-hidden="true"><span class="bar-fill" style="width:' + (it.v / max * 100).toFixed(1) + '%"></span></span>' +
        '<span class="bar-value"><b>' + it.v + '</b> sur ' + max + '<small>' + pct(it.v) + '</small></span></li>';
    }).join('') + '</ul></figure>';
  }

  var R = {};

  R.text = function (d) {
    return lead(d.lead) + (d.body || []).map(function (p) { return '<p>' + esc(p) + '</p>'; }).join('');
  };

  R.facts = function (d) {
    return lead(d.lead) + '<dl class="facts">' + d.facts.map(function (f) {
      return '<div><dt>' + esc(f.k) + '</dt><dd>' + esc(f.v) + '</dd></div>';
    }).join('') + '</dl>';
  };

  R.list = function (d) {
    return lead(d.lead) + '<ol class="numbered">' + d.items.map(function (it, k) {
      return '<li><span class="num" aria-hidden="true">' + (k + 1) + '</span><div><strong>' + esc(it.t) + '</strong><p>' + esc(it.d) + '</p></div></li>';
    }).join('') + '</ol>' + after(d.after);
  };

  R.scope = function (d) {
    return '<div class="scope"><div class="scope-col in"><h3>Dans l’étude</h3><ul>' + d.inside.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') +
      '</ul></div><div class="scope-col out"><h3>Hors étude</h3><ul>' + d.outside.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div></div>' + after(d.note);
  };

  R.steps = function (d) {
    return lead(d.lead) + '<ol class="trip">' + d.steps.map(function (s) {
      return '<li class="' + (s.hot ? 'hot' : '') + '"><strong>' + esc(s.t) + '</strong><span>' + esc(s.d) + '</span></li>';
    }).join('') + '</ol><p class="legend"><i class="legend-dot" aria-hidden="true"></i>Étapes où le sentiment de vulnérabilité peut apparaître</p>';
  };

  R.compare = function (d) {
    return '<div class="compare">' + d.pair.map(function (p) {
      return '<div class="compare-card' + (p.strong ? ' strong' : '') + '"><h3>' + esc(p.k) + '</h3><p>' + esc(p.v) + '</p></div>';
    }).join('') + '</div>' + after(d.after);
  };

  R.funnel = function (d) {
    return '<ol class="funnel">' + d.funnel.map(function (f, k) {
      return '<li class="' + (f.strong ? 'strong' : '') + '" style="--w:' + (100 - k * 18) + '%"><b>' + f.v + '</b><span>' + esc(f.k) + '</span></li>';
    }).join('') + '</ol>' + lead(d.lead) + '<p class="caveat">' + esc(d.caveat) + '</p>';
  };

  R.bars = function (d) { return lead(d.lead) + bars(d.bars); };

  R.guess = function (d) {
    var g = d.guess, got = state.guesses[d.id];
    var html = (d.intro ? lead(d.intro) : '') + (d.facts ? R.facts({ facts: d.facts }) : '');
    html += '<div class="guess' + (got ? ' revealed' : '') + (d.accent === 'blue' ? ' blue' : '') + '">';
    html += '<p class="guess-kicker">Devine le chiffre</p><p class="guess-q">' + esc(g.question) + '</p>';
    if (!got) {
      html += '<div class="guess-input"><output data-guess-out>' + num(g.start, g.decimals) + '</output><span>' + esc(g.unit) + '</span></div>' +
        '<input type="range" data-guess-range min="' + g.min + '" max="' + g.max + '" step="' + g.step + '" value="' + g.start + '" aria-label="Ton estimation, en ' + esc(g.unit) + '">' +
        '<div class="guess-scale" aria-hidden="true"><span>' + num(g.min, 0) + '</span><span>' + num(g.max, 0) + '</span></div>' +
        '<div class="guess-actions"><button type="button" class="button" data-action="guess">Valider mon estimation</button>' +
        '<button type="button" class="text-button" data-action="guess-skip">Voir directement</button></div>';
      html += '</div><p class="locked-note">Estime d’abord : la suite de l’idée s’affiche avec la réponse.</p>';
      return html;
    }
    var span = g.max - g.min;
    var aPos = (g.answer - g.min) / span * 100;
    html += '<div class="reveal-big"><b>' + num(g.answer, g.decimals) + '</b><span>' + esc(g.unit) + '</span></div>';
    html += '<div class="compare-track" aria-hidden="true"><span class="track"></span>';
    if (got.v !== null) {
      var gPos = (got.v - g.min) / span * 100;
      html += '<span class="mark you" style="left:' + gPos.toFixed(1) + '%"><i></i><em>Toi : ' + num(got.v, g.decimals) + '</em></span>';
    }
    html += '<span class="mark real" style="left:' + aPos.toFixed(1) + '%"><i></i><em>Réalité : ' + num(g.answer, g.decimals) + '</em></span></div>';
    var msg;
    if (got.v === null) msg = 'Réponse affichée sans estimation.';
    else {
      var diff = Math.abs(got.v - g.answer);
      var gap = ' Écart : ' + num(diff, g.decimals) + (g.gapUnit || '') + '.';
      if (diff <= span * 0.06) msg = 'Bien vu : ton estimation est très proche de la réalité.' + (diff > 0 ? gap : '');
      else if (got.v < g.answer) msg = 'Tu as sous-estimé : c’est plus que tu ne l’imaginais.' + gap;
      else msg = 'Tu as surestimé, mais le chiffre reste élevé.' + gap;
    }
    html += '<p class="guess-msg">' + esc(msg) + '</p></div>';
    html += lead(d.lead) + (d.bars ? bars(d.bars) : '');
    return html;
  };

  R.scenario = function (d) {
    var st = state.scen[d.id] || {};
    var s1 = d.scenes[0], s2 = d.scenes[1];
    var html = '<div class="scene"><p class="scene-time">' + esc(s1.time) + '</p><p class="scene-text">' + esc(s1.text) + '</p>' +
      '<div class="options" role="group" aria-label="Ton premier réflexe">' + s1.options.map(function (o, k) {
        return '<button type="button" class="option" data-action="scene" data-s="0" data-o="' + k + '" aria-pressed="' + (st.a === k) + '">' + esc(o.k) + '</button>';
      }).join('') + '</div>';
    if (st.a !== undefined && st.a !== null) {
      var chosen = s1.options[st.a];
      html += '<div class="scene-result"><p class="result-big"><b>' + chosen.v + '</b> répondantes sur 13 déclarent ce réflexe.</p>' +
        bars({ title: 'Réflexes déclarés en cas de malaise', items: s1.options.map(function (o, k) { return { k: o.k, v: o.v, hot: k === st.a }; }) }) +
        '<p>' + esc(s1.note) + '</p></div>';
    }
    html += '</div>';
    if (st.a !== undefined && st.a !== null) {
      var chain = C.branches[3].ideas[1].chain;
      html += '<div class="scene"><p class="scene-time">' + esc(s2.time) + '</p><p class="scene-text">' + esc(s2.text) + '</p>' +
        '<div class="options" role="group" aria-label="Ton choix pour le lendemain">' + s2.options.map(function (o, k) {
          return '<button type="button" class="option" data-action="scene" data-s="1" data-o="' + k + '" aria-pressed="' + (st.b === k) + '">' + esc(o.k) + '</button>';
        }).join('') + '</div>';
      if (st.b !== undefined && st.b !== null) {
        var o2 = s2.options[st.b];
        html += '<div class="scene-result"><ol class="mini-chain">' + chain.map(function (c, k) {
          return '<li class="' + (k === o2.stage ? 'on' : '') + '">' + esc(c.k) + '</li>';
        }).join('') + '</ol><p class="result-big">' + (o2.stage >= 0 ? 'Étape : <b>' + esc(chain[o2.stage].k.toLowerCase()) + '</b>. ' : '') + esc(o2.why) + '</p><p>' + esc(s2.note) + '</p></div>';
      }
      html += '</div>';
    }
    return html;
  };

  R.chain = function (d) {
    var sel = state.chain[d.id] || 0;
    return lead(d.lead) + '<div class="chain" role="group" aria-label="Les quatre étapes">' + d.chain.map(function (c, k) {
      return '<button type="button" class="chain-step' + (k === sel ? ' on' : '') + (k < sel ? ' past' : '') + '" aria-pressed="' + (k === sel) + '" data-action="chain" data-k="' + k + '"><span>' + (k + 1) + '</span>' + esc(c.k) + '</button>';
    }).join('<i class="chain-arrow" aria-hidden="true">→</i>') + '</div><div class="chain-detail"><h3>' + esc(d.chain[sel].k) + '</h3><p>' + esc(d.chain[sel].d) + '</p></div>';
  };

  R.chips = function (d) {
    return lead(d.lead) + '<ul class="cost">' + d.chips.map(function (c) { return '<li>' + esc(c) + '</li>'; }).join('') + '</ul>' + after(d.after);
  };

  R.quote = function (d) {
    return '<blockquote class="quote' + (d.big ? ' big' : '') + '"><p>' + esc(d.quote) + '</p></blockquote>' + after(d.after);
  };

  R.valuechain = function (d) {
    var html = '<div class="vchain"><ol>', labelled = false;
    d.steps.forEach(function (s, k) {
      if (s.hot && !labelled) { html += '<li class="vchain-label" aria-hidden="true">Phase intermédiaire : malaise, puis réassurance</li>'; labelled = true; }
      html += '<li class="' + (s.hot ? 'hot' : '') + '"><strong>' + (k + 1) + '. ' + esc(s.t) + '</strong><span>' + esc(s.d) + (s.hot ? '<span class="sr-only"> (phase intermédiaire)</span>' : '') + '</span></li>';
    });
    html += '</ol></div>';
    return html + lead(d.lead);
  };

  R.actors = function (d) {
    function cards(list) { return list.map(function (a) { return '<li><strong>' + esc(a.k) + '</strong><span>' + esc(a.d) + '</span></li>'; }).join(''); }
    return '<div class="actors"><div class="actors-group near"><h3>Près d’elle pendant le trajet</h3><ul>' + cards(d.near) + '</ul></div>' +
      '<p class="actors-center">La jeune femme<small>rentre seule le soir</small></p>' +
      '<div class="actors-group far"><h3>Loin d’elle, agissent avant ou après</h3><ul>' + cards(d.far) + '</ul></div></div>' +
      '<p class="punch">' + esc(d.punch) + '</p>';
  };

  R.solutions = function (d) {
    var sel = state.sol[d.id];
    var html = lead(d.lead) + '<div class="sol-list" role="group" aria-label="Solutions existantes">' + d.items.map(function (s, k) {
      return '<button type="button" class="option small" data-action="sol" data-k="' + k + '" aria-pressed="' + (sel === k) + '">' + esc(s.k) + '</button>';
    }).join('') + '</div>';
    if (sel !== undefined && sel !== null) {
      var s = d.items[sel];
      html += '<div class="sol-card"><p class="tag">Moment couvert : ' + esc(s.moment) + '</p><h3>' + esc(s.k) + '</h3>' +
        '<dl><div><dt>Ce qu’elle apporte</dt><dd>' + esc(s.gives) + '</dd></div><div class="limit"><dt>Sa limite pour notre besoin</dt><dd>' + esc(s.limit) + '</dd></div></dl></div>';
    } else {
      html += '<p class="locked-note">Sélectionne une solution pour voir ce qu’elle apporte et où elle s’arrête.</p>';
    }
    return html;
  };

  R.friction = function (d) {
    return lead(d.lead) + '<ol class="friction">' + d.zones.map(function (z) {
      return '<li class="' + (z.hot ? 'hot' : '') + '"><strong>' + esc(z.k) + '</strong><span>' + esc(z.d) + '</span>' +
        (z.ex ? '<small>Couvert : ' + esc(z.ex) + '</small>' : '<small class="gap">Zone de friction : aucune solution ne la couvre pleinement</small>') + '</li>';
    }).join('') + '</ol>';
  };

  R.quiz = function (d) {
    var answers = state.quiz[d.id] || [];
    var html = '<ol class="quiz">' + d.questions.map(function (q, qi) {
      var a = answers[qi];
      var answered = a !== undefined && a !== null;
      return '<li><p class="quiz-q">' + esc(q.q) + '</p><div class="options" role="group" aria-label="Question ' + (qi + 1) + '">' + q.options.map(function (o, oi) {
        var cls = 'option';
        if (answered && oi === q.answer) cls += ' right';
        else if (answered && oi === a) cls += ' wrong';
        return '<button type="button" class="' + cls + '" data-action="quiz" data-q="' + qi + '" data-o="' + oi + '"' + (answered ? ' disabled' : '') + '>' + esc(o) +
          (answered && oi === q.answer ? '<span class="sr-only"> (bonne réponse)</span>' : '') + (answered && oi === a && a !== q.answer ? '<span class="mine"> · ta réponse</span>' : '') + '</button>';
      }).join('') + '</div>' + (answered ? '<p class="quiz-why"><b>' + (a === q.answer ? 'Exact.' : 'Pas tout à fait.') + '</b> ' + esc(q.why) + '</p>' : '') + '</li>';
    }).join('') + '</ol>';
    var done = d.questions.every(function (_, qi) { return answers[qi] !== undefined && answers[qi] !== null; });
    if (done) {
      var good = d.questions.filter(function (q, qi) { return answers[qi] === q.answer; }).length;
      html += '<div class="quiz-end"><p>' + good + ' bonne' + (good > 1 ? 's' : '') + ' réponse' + (good > 1 ? 's' : '') + ' sur 3. Tu as parcouru tout le rapport.</p>' +
        '<button type="button" class="button" data-action="overview">Voir la carte complète</button></div>';
    }
    return html;
  };

  function renderIntro() {
    return '<p class="crumb"><i class="dot center" aria-hidden="true"></i>Au centre de la carte</p>' +
      '<h2 class="problem" tabindex="-1">' + esc(C.center.question) + '</h2>' +
      '<p class="lead">' + esc(C.center.intro) + '</p>' +
      '<ol class="branch-list">' + C.branches.map(function (br, b) {
        return '<li><span>' + (b + 1) + '</span>' + esc(br.title) + '<small>' + br.ideas.length + ' idées</small></li>';
      }).join('') + '</ol>' + source('Rapport du Groupe 7b, partie 1.2.');
  }

  function renderPanel() {
    var st = steps[state.cur];
    var html;
    if (st.b < 0) {
      html = renderIntro();
    } else {
      var d = st.idea;
      html = '<p class="crumb"><i class="dot" aria-hidden="true"></i>' + (st.b + 1) + ' · ' + esc(st.br.title) +
        '<span>Idée ' + (st.i + 1) + ' sur ' + st.br.ideas.length + '</span></p>' +
        '<h2 tabindex="-1">' + esc(d.title) + '</h2>' + (R[d.type] || R.text)(d) + source(d.source);
    }
    els.panel.innerHTML = '<div class="panel-inner">' + html + '</div>';
    els.panel.scrollTop = 0;
    var range = els.panel.querySelector('[data-guess-range]');
    if (range) {
      var g = st.idea.guess, out = els.panel.querySelector('[data-guess-out]');
      range.addEventListener('input', function () { out.textContent = num(range.value, g.decimals); });
    }
  }

  function renderNav() {
    els.prev.disabled = state.cur === 0;
    var nextLabel = state.cur === 0 ? 'Commencer' : (state.cur === LAST ? 'Carte complète' : 'Suivant');
    if (state.overview) nextLabel = 'Reprendre';
    els.next.innerHTML = esc(nextLabel) + ' <span aria-hidden="true">→</span>';

    var html = '';
    C.branches.forEach(function (br, b) {
      html += '<span class="seg-group" title="' + esc(br.title) + '">';
      for (var s = branchStart[b]; s <= branchEnd[b]; s++) {
        html += '<i class="' + (s === state.cur ? 'cur' : (s <= state.max ? 'seen' : '')) + '"></i>';
      }
      html += '</span>';
    });
    els.progress.innerHTML = html;
    var label = state.cur === 0 ? 'Introduction' : 'Idée ' + state.cur + ' sur ' + IDEAS;
    els.progress.setAttribute('aria-label', 'Progression : ' + label);
    els.overviewBtn.setAttribute('aria-pressed', String(state.overview));
    els.hint.textContent = state.overview ? 'Vue d’ensemble : clique sur une idée pour la lire.' : 'Clique sur une idée de la carte, ou avance avec les flèches du clavier.';

    /* pastilles (mobile) */
    els.chips.innerHTML = C.branches.map(function (br, b) {
      var cur = steps[state.cur].b === b, un = branchUnlocked(b), done = branchEnd[b] <= state.max;
      return '<button type="button" class="chip' + (cur ? ' on' : '') + (done && !cur ? ' done' : '') + '" data-goto-branch="' + b + '"' + (un ? '' : ' disabled') +
        (cur ? ' aria-current="step"' : '') + '><span>' + (b + 1) + '</span>' + esc(br.title) + '</button>';
    }).join('');

    var onChip = els.chips.querySelector('.chip.on');
    if (onChip && mobileQuery.matches) els.chips.scrollLeft = onChip.offsetLeft - (els.chips.clientWidth - onChip.offsetWidth) / 2;

    /* sommaire (mobile, vue d'ensemble) */
    els.outline.innerHTML = '<h2>Vue d’ensemble</h2><ol>' + C.branches.map(function (br, b) {
      return '<li><p class="outline-branch"><span>' + (b + 1) + '</span>' + esc(br.title) + '</p><ul>' + br.ideas.map(function (idea, i) {
        var s = branchStart[b] + i;
        return '<li><button type="button" data-goto="' + s + '"' + (reachable(s) ? '' : ' disabled') + ' class="' + (s <= state.max ? 'seen' : '') + '">' + esc(idea.label) + '</button></li>';
      }).join('') + '</ul></li>';
    }).join('') + '</ol>';
  }

  function render(opts) {
    opts = opts || {};
    document.body.classList.toggle('is-overview', state.overview);
    els.outline.hidden = !(state.overview && mobileQuery.matches);
    if (!opts.keepPanel) renderPanel();
    renderNav();
    updateMap();
    moveCamera(opts.instant);
    save();
  }

  function announce() {
    var st = steps[state.cur];
    els.live.textContent = st.b < 0 ? 'Problématique' : 'Branche ' + (st.b + 1) + ', ' + st.br.title + '. Idée ' + (st.i + 1) + ' sur ' + st.br.ideas.length + ' : ' + st.idea.title + '.';
  }

  function goTo(i, opts) {
    opts = opts || {};
    if (i < 0 || i > LAST) return;
    if (!reachable(i)) return;
    state.cur = i;
    state.max = Math.max(state.max, i);
    state.overview = false;
    render();
    announce();
    if (opts.focusPanel) { var h = els.panel.querySelector('h2'); if (h) h.focus({ preventScroll: true }); }
    if (mobileQuery.matches) window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  }

  function toggleOverview(force) {
    state.overview = typeof force === 'boolean' ? force : !state.overview;
    render({ keepPanel: true });
    els.live.textContent = state.overview ? 'Vue d’ensemble de la carte.' : '';
  }

  /* ---------- Événements ---------- */
  function onMapActivate(target) {
    var el = target.closest('[data-step], [data-goto-branch], [data-goto]');
    if (!el || el.getAttribute('aria-disabled') === 'true') return;
    if (el.hasAttribute('data-step')) goTo(+el.getAttribute('data-step'), { focusPanel: false });
    else if (el.hasAttribute('data-goto-branch')) {
      var b = +el.getAttribute('data-goto-branch');
      if (branchUnlocked(b)) goTo(branchStart[b]);
    } else goTo(+el.getAttribute('data-goto'));
  }

  els.map.addEventListener('click', function (e) { onMapActivate(e.target); });
  els.map.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onMapActivate(e.target); }
  });
  els.chips.addEventListener('click', function (e) {
    var el = e.target.closest('[data-goto-branch]');
    if (el && !el.disabled) goTo(branchStart[+el.getAttribute('data-goto-branch')]);
  });
  els.outline.addEventListener('click', function (e) {
    var el = e.target.closest('[data-goto]');
    if (el && !el.disabled) goTo(+el.getAttribute('data-goto'), { focusPanel: true });
  });

  els.prev.addEventListener('click', function () { if (state.overview) toggleOverview(false); else goTo(state.cur - 1); });
  els.next.addEventListener('click', function () {
    if (state.overview) toggleOverview(false);
    else if (state.cur === LAST) toggleOverview(true);
    else goTo(state.cur + 1);
  });
  els.overviewBtn.addEventListener('click', function () { toggleOverview(); });
  $('[data-reveal-all]').addEventListener('click', function () {
    state.max = LAST;
    render({ keepPanel: true });
    els.live.textContent = 'Toutes les branches sont débloquées.';
  });
  $('[data-restart]').addEventListener('click', function () {
    state = freshState();
    render();
    announce();
  });

  els.panel.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-action]');
    if (!btn) return;
    var st = steps[state.cur], d = st.idea, act = btn.getAttribute('data-action');
    if (act === 'guess' || act === 'guess-skip') {
      var range = els.panel.querySelector('[data-guess-range]');
      state.guesses[d.id] = { v: act === 'guess' ? +range.value : null };
      renderPanel(); save();
      var big = els.panel.querySelector('.reveal-big');
      els.live.textContent = 'Réponse : ' + big.textContent + '. ' + (els.panel.querySelector('.guess-msg') || {}).textContent;
      if (big) big.setAttribute('tabindex', '-1'), big.focus({ preventScroll: true });
    } else if (act === 'scene') {
      var sc = state.scen[d.id] || (state.scen[d.id] = {});
      var s = +btn.getAttribute('data-s'), o = +btn.getAttribute('data-o');
      if (s === 0) { sc.a = o; sc.b = null; } else sc.b = o;
      renderPanel(); save();
      var res = els.panel.querySelectorAll('.scene-result');
      var last = res[s];
      if (last) { els.live.textContent = last.querySelector('.result-big').textContent; }
      var again = els.panel.querySelector('[data-action="scene"][data-s="' + s + '"][data-o="' + o + '"]');
      if (again) again.focus({ preventScroll: true });
    } else if (act === 'chain') {
      state.chain[d.id] = +btn.getAttribute('data-k');
      renderPanel(); save();
      var on = els.panel.querySelector('.chain-step.on'); if (on) on.focus({ preventScroll: true });
    } else if (act === 'sol') {
      state.sol[d.id] = +btn.getAttribute('data-k');
      renderPanel(); save();
      var pressed = els.panel.querySelector('[data-action="sol"][aria-pressed="true"]'); if (pressed) pressed.focus({ preventScroll: true });
      els.live.textContent = els.panel.querySelector('.sol-card').textContent;
    } else if (act === 'quiz') {
      var qa = state.quiz[d.id] || (state.quiz[d.id] = []);
      var qi = +btn.getAttribute('data-q');
      qa[qi] = +btn.getAttribute('data-o');
      renderPanel(); save();
      var why = els.panel.querySelectorAll('.quiz > li')[qi].querySelector('.quiz-why');
      if (why) { why.setAttribute('tabindex', '-1'); why.focus({ preventScroll: true }); els.live.textContent = why.textContent; }
    } else if (act === 'overview') {
      toggleOverview(true);
    }
  });

  document.addEventListener('keydown', function (e) {
    var tag = (e.target.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); els.next.click(); }
    else if (e.key === 'ArrowLeft') { e.preventDefault(); if (!els.prev.disabled) els.prev.click(); }
    else if (e.key === 'Escape' && state.overview) { toggleOverview(false); }
  });

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () { els.outline.hidden = !(state.overview && mobileQuery.matches); sizeHitAreas(); moveCamera(true); }, 120);
  });

  /* ---------- Démarrage ---------- */
  buildMap();
  render({ instant: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { sizeHitAreas(); moveCamera(true); });
})();

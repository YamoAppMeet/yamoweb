/* ============================================================
   YAMO — Logique du site
   Tous les écrans sont générés ici, puis branchés soit sur les
   données de démonstration, soit sur votre serveur Yamo.
   ============================================================ */

(function () {
  'use strict';

  const CFG = window.YAMO_CONFIG || {};
  const DEMO = window.YAMO_DEMO || {};
  const DEMO_MODE = CFG.DEMO_MODE !== false;

  /* ---------- Icônes ---------- */
  const ICONS = {
    flame: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2c1 4-2 5-2 8a4 4 0 0 0 8 0c0-1-.5-2-1-3 2 2 4 5 4 8a7 7 0 0 1-14 0c0-4 3-6 5-13z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 21s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 16.4 12 21 12 21z"/></svg>',
    heartO: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-8-4.6-8-10.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8 3.6C20 16.4 12 21 12 21z"/></svg>',
    x: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>',
    star: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.6 5.9 20.8l1.3-6.8-5-4.8 6.9-.9L12 2z"/></svg>',
    msg: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9 9 0 0 1-3.9-.9L3 21l1.9-4.9A8.4 8.4 0 0 1 12 3.1a8.4 8.4 0 0 1 9 8.4z"/></svg>',
    users: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M17 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9.5 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM22 21v-2a4 4 0 0 0-3-3.9"/></svg>',
    user: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    bell: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0"/></svg>',
    shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
    lock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
    zap: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M13 2L3 14h8l-1 8 10-12h-8l1-8z"/></svg>',
    crown: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M2 18h20l-2-11-5 4-3-7-3 7-5-4L2 18zm2 2h16v2H4v-2z"/></svg>',
    pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M20 6L9 17l-5-5"/></svg>',
    verified: '<svg viewBox="0 0 24 24" fill="#E88D91"><path d="M12 1.5l2.6 1.9 3.2-.3 1 3.1 2.7 1.8-1.1 3 1.1 3-2.7 1.8-1 3.1-3.2-.3L12 22.5l-2.6-1.9-3.2.3-1-3.1L2.5 16l1.1-3-1.1-3 2.7-1.8 1-3.1 3.2.3L12 1.5z"/><path d="M8.4 12l2.4 2.4 4.8-4.8" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    send: '<svg viewBox="0 0 24 24"><path d="M2 21l21-9L2 3v7l15 2-15 2v7z"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 9 19.4a1.7 1.7 0 0 0-1.9.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.5-1H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.6 9a1.7 1.7 0 0 0-.3-1.9l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>',
    camera: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2v11z"/><circle cx="12" cy="13" r="4"/></svg>',
    edit: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.1 2.1 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>',
    logout: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
    eye: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',
    flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1v19"/></svg>',
    sparkle: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l1.8 5.4L19 9l-5.2 1.6L12 16l-1.8-5.4L5 9l5.2-1.6L12 2zm6 12l.9 2.7 2.6.8-2.6.8L18 21l-.9-2.7-2.6-.8 2.6-.8L18 14z"/></svg>',
  };

  /* ---------- Utilitaires ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const fcfa = (n) => new Intl.NumberFormat('fr-FR').format(n) + ' F';

  const $ = (sel, root) => (root || document).querySelector(sel);
  /* Image de secours si une photo de démonstration est indisponible */
  const FB = (p) => (window.YAMO_FALLBACK ? window.YAMO_FALLBACK(p && p.name, 0) : '');
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 2600);
  }

  /* ---------- État local ---------- */
  const STATE = {
    myProfile: {
      id: 'me',
      name: 'Vous',
      age: 27,
      gender: 'MALE',
      city: 'Abidjan',
      country: "Côte d'Ivoire",
      bio: 'Nouveau sur Yamo. J\'aime les sorties, la musique et les gens sincères.',
      photos: ['https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&h=1200&q=80'],
      interests: ['Musique', 'Sorties', 'Sport'],
      is_verified: false,
      is_premium: false,
      invisible: false,
      relationship_goal: 'SERIOUS',
    },
    deckIndex: 0,
    likes: [],
    passes: [],
    matches: [],
    activeConv: 'c1',
    likesTab: 'received',
    chatOpenMobile: false,
    extraBalance: { SUPER_LIKE: 0, DIRECT_MESSAGE: 0 },
    boosted: [],
    page: 'discover',
    lastCardId: null,
    superSent: [],
  };

  /* ---------- Règles d'accès aux options (selon la formule) ----------
     Femme : un seul abonnement, tout est débloqué.
     Homme : les options dépendent de la formule choisie (paliers).     */
  function isFemale() { const g = String((STATE.myProfile && STATE.myProfile.gender) || '').toUpperCase(); return g === 'FEMALE' || g === 'F' || g === 'FEMME'; }

  /* Niveau d'abonnement actif : 0 = gratuit, 1 à 4 = formules hommes */
  function myLevel() {
    const me = STATE.myProfile;
    if (isFemale() && me.premium_plan === 'FEMALE_UNIQUE') return 9;   // 9 = abonnement Femmes
    if (isFemale() && me.is_premium) return 9;
    if (!me.is_premium) return 0;
    if (me.premium_plan === 'TRIAL') return 2;
    const plan = (DEMO.PLANS || []).find((x) => x.id === me.premium_plan);
    return plan ? plan.level : 4;   // formule payée inconnue (ex. ancien format) : on ouvre tout
  }
  function myFeatures() {
    if (isFemale()) {
      // Femme : abonnement unique de 3 000 F / mois. Il ouvre les likes reçus,
      // le mode invisible, les communautés et le badge.
      // Le Super Like et le message direct restent payants à l'unité.
      const on = !!STATE.myProfile.is_premium;
      return { label: 'Femmes', seeLikes: on, seeAllLikes: on, seePhotos: on ? 'full' : 'locked', replyLikes: on ? -1 : 0, invisible: on, badge: on, communities: on, boosts: 0, directMsg: false, paidExtras: true };
    }
    const lvl = myLevel();
    return Object.assign({}, (DEMO.PLAN_FEATURES || {})[lvl] || (DEMO.PLAN_FEATURES || {})[1], { level: lvl });
  }
  /* L'abonnement Femmes (formule unique) est-il déjà actif ? */
  function hasWomenPlan() {
    const me = STATE.myProfile;
    if (!me.is_premium) return false;
    if (!(isFemale() || me.premium_plan === 'FEMALE_UNIQUE')) return false;
    if (me.premium_until && new Date(me.premium_until).getTime() < Date.now()) return false;
    return true;
  }

  /* Abonnement Femmes encore actif aujourd'hui (sinon il faut se réabonner) */
  function womenPlanExpired() {
    const me = STATE.myProfile;
    if (me.premium_plan !== 'FEMALE_UNIQUE') return false;
    if (womenPlanActive()) return false;
    return true;
  }

  /* Date de fin lisible pour la femme abonnée */
  function womenUntilLabel() {
    const me = STATE.myProfile;
    if (!me.premium_until) return '';
    const d = new Date(me.premium_until);
    const days = Math.ceil((d.getTime() - Date.now()) / 864e5);
    const date = d.toLocaleDateString('fr');
    return days > 0 ? date + ' (' + days + ' jour' + (days > 1 ? 's' : '') + ' restant' + (days > 1 ? 's' : '') + ')' : date;
  }

  /* Sauvegarde locale : le statut Premium / invisible / les crédits restent après rechargement */
  /* Les conversations de démonstration déjà en cours sont des matchs :
     c'est ce qui les rend visibles dans « Messages ». */
  function seedDemoMatches() {
    // Une conversation de démo en cours = un match réel
    (DEMO.CONVERSATIONS || []).forEach((c) => {
      if (c.isMatch && STATE.matches.indexOf(c.profileId) === -1) STATE.matches.push(c.profileId);
    });
    // Les profils encore dans « Découvrir » ne vous ont pas liké :
    // ils ne doivent donc pas compter comme des matchs.
    const deckIds = (DEMO.PROFILES || []).map((p) => p.id)
      .filter((id) => STATE.likes.indexOf(id) === -1 && STATE.passes.indexOf(id) === -1);
    const convIds = (DEMO.CONVERSATIONS || []).filter((c) => c.isMatch).map((c) => c.profileId);
    STATE.matches = STATE.matches.filter((id) => deckIds.indexOf(id) === -1 || convIds.indexOf(id) !== -1);
  }

  /* ---------- Personnes qui vous ont déjà liké (démo) ----------
     Elles existent même si vous ne les avez pas encore vues dans le deck.
     Elles restent dans « Découvrir » jusqu'au like en retour (le match). */
  const INBOUND_IDS = ['p3', 'p4', 'p5'];
  function inboundProfiles() {
    const blk = (window.YamoModeration && window.YamoModeration.blockedList()) || [];
    return INBOUND_IDS.map(byId).filter((p) => p && blk.indexOf(p.id) === -1);
  }

  /* ---------- Notifications : stockage, ajout, popup ---------- */
  const NOTIF_KEY = 'yamo_notifs_v1';
  function notifs() {
    try { return JSON.parse(localStorage.getItem(NOTIF_KEY) || '[]'); } catch (e) { return []; }
  }
  function notifsSave(list) {
    try { localStorage.setItem(NOTIF_KEY, JSON.stringify(list.slice(0, 40))); } catch (e) {}
    renderNav();
  }
  function notifPush(item) {
    const list = notifs();
    list.unshift(Object.assign({ at: Date.now(), read: false }, item));
    notifsSave(list);
    showNotifPopup(item);
    return list;
  }
  function notifUnread() { return notifs().filter((n) => !n.read).length; }

  function showNotifPopup(item) {
    let host = document.getElementById('notif-host');
    if (!host) {
      host = document.createElement('div');
      host.id = 'notif-host';
      host.className = 'notif-host';
      document.body.appendChild(host);
    }
    const card = document.createElement('div');
    card.className = 'notif-pop';
    card.innerHTML = `
      <div class="np-ic">${ICONS.sparkle || ICONS.heart}</div>
      <div class="np-body">
        <strong>${esc(item.title || 'Yamo')}</strong>
        <p>${esc(item.text || '')}</p>
        <small>À l'instant</small>
      </div>
      <button class="np-x" aria-label="Fermer">&times;</button>`;
    host.appendChild(card);
    requestAnimationFrame(() => card.classList.add('in'));
    const kill = () => { card.classList.remove('in'); setTimeout(() => card.remove(), 320); };
    card.querySelector('.np-x').addEventListener('click', kill);
    setTimeout(kill, 7000);

    // 3. notification du système (ordinateur et téléphone) si l'utilisateur l'a acceptée
    if (window.Notification && Notification.permission === 'granted') {
      try { new Notification(item.title || 'Yamo', { body: item.text || '', icon: 'assets/logo-192.png' }); } catch (e) {}
    }
  }

  function askNotifPermission() {
    if (window.Notification && Notification.permission === 'default') {
      try { Notification.requestPermission(); } catch (e) {}
    }
  }

  /* Simulation d'une nouvelle inscription (en réel : message du serveur) */
  const NEWCOMERS = [
    { name: 'Akissi', age: 24, city: 'Abidjan' }, { name: 'Yann', age: 29, city: 'Bouaké' },
    { name: 'Fatou', age: 26, city: 'Yamoussoukro' }, { name: 'Koffi', age: 31, city: 'Abidjan' },
    { name: 'Aminata', age: 23, city: 'San-Pédro' }, { name: 'Serge', age: 28, city: 'Abidjan' },
  ];
  let newcomerIdx = 0;
  function simulateNewcomer() {
    const p = NEWCOMERS[newcomerIdx++ % NEWCOMERS.length];
    notifPush({
      type: 'new',
      icon: 'sparkle',
      title: 'Nouvel inscrit sur Yamo',
      text: p.name + ', ' + p.age + ' ans, vient de s\'inscrire à ' + p.city + '. Allez la/le découvrir !',
      name: p.name,
    });
  }

  function profiles() {
    const blk = (window.YamoModeration && window.YamoModeration.blockedList()) || [];
    const seen = (STATE.likes || []).concat(STATE.passes || [], STATE.matches || []);
    const all = (DEMO.PROFILES || []).concat(inboundProfiles());
    const uniq = [];
    all.forEach((p) => { if (p && uniq.indexOf(p) === -1) uniq.push(p); });
    let dispo = uniq.filter((p) => seen.indexOf(p.id) === -1 && blk.indexOf(p.id) === -1);
    /* On ne repropose jamais la personne qui vient d'être vue sur la carte
       (cas d'un profil qui revient par les likes reçus). */
    const lastId = STATE.lastCardId;
    if (dispo.length > 1 && lastId && dispo.some((p) => p.id === lastId)) {
      const kept = dispo.filter((p) => p.id !== lastId);
      const moved = dispo.filter((p) => p.id === lastId);
      const b2 = kept.filter(isBoosted), n2 = kept.filter((p) => !isBoosted(p));
      dispo = (b2.length && n2.length ? [b2[0], n2[0]] : kept).concat(moved);
      dispo = dispo.concat(kept.filter((p) => dispo.indexOf(p) === -1));
    }
    /* Les profils ayant payé un Boost passent en tête ; « Découvrir » en réserve toujours un
       tant qu'il reste des profils à voir, pour montrer à quoi sert un Boost. */
    const boosted = dispo.filter(isBoosted);
    const normal = dispo.filter((p) => !isBoosted(p));
    if (!boosted.length || !normal.length) return dispo;
    let out = [boosted[0]];
    normal.forEach((p, i) => {
      out.push(p);
      if (i === 1 && boosted.length > 1) out.push(boosted[1]);
    });
    /* La personne qu'on vient de voir sur la carte repasse en fin de file. */
    if (out.length > 1 && lastId) {
      out = out.filter((p) => p.id !== lastId).concat(out.filter((p) => p.id === lastId));
    }
    if (out.indexOf(boosted[1]) === -1) out.push(boosted[1]);
    return out;
  }

  /* ---------- Boosts ---------- */
  const BOOST_MS = { BOOST_1D: 864e5, BOOST_3D: 3 * 864e5, BOOST_7D: 7 * 864e5 };
  function isBoosted(p) {
    const b = p && p.boost_until ? new Date(p.boost_until).getTime() : 0;
    return b > Date.now();
  }
  function boostLabel(p) {
    if (!isBoosted(p)) return '';
    const h = Math.max(1, Math.round((new Date(p.boost_until).getTime() - Date.now()) / 36e5));
    return h >= 24 ? 'Boosté · ' + Math.round(h / 24) + ' j restants' : 'Boosté · ' + h + ' h restantes';
  }
  function activateBoost(p, id) {
    const d = new Date();
    d.setTime(d.getTime() + (BOOST_MS[id] || BOOST_MS.BOOST_1D));
    p.boost_until = d.toISOString();
    if (STATE.boosted.indexOf(p.id) === -1) STATE.boosted.push(p.id);
    saveMe();
  }
  function removeBoost(p) {
    p.boost_until = null;
    STATE.boosted = STATE.boosted.filter((x) => x !== p.id);
    saveMe();
  }

  function byId(id) {
    if (id === 'me') return STATE.myProfile;
    return (DEMO.PROFILES || []).find((p) => p.id === id) || null;
  }

  /* ---------- Page d'accueil ---------- */
  function initHome() {
    if (DEMO_MODE) {
      const b = $('#demo-banner');
      if (b) b.classList.remove('hidden');
    }

    if (CFG.APP_STORE_URL && CFG.APP_STORE_URL !== '#') {
      const a = $('#btn-appstore'); if (a) a.href = CFG.APP_STORE_URL;
    }
    if (CFG.PLAY_STORE_URL && CFG.PLAY_STORE_URL !== '#') {
      const a = $('#btn-playstore'); if (a) a.href = CFG.PLAY_STORE_URL;
    }

    const yr = $('#year'); if (yr) yr.textContent = new Date().getFullYear();

    renderHeroPhone();
    renderFeatures();
    renderPricing();
    renderSecurity();

    $$('[data-go]').forEach((b) => b.addEventListener('click', (e) => {
      e.preventDefault();
      const dest = b.getAttribute('data-go');
      window.location.href = dest === 'app' ? 'app.html' : 'auth.html';
    }));
    $$('[data-page="legal"]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Les mentions légales seront ajoutées avant la mise en ligne.');
    }));

    const burger = $('#burger');
    const menu = $('#mobile-menu');
    if (burger && menu) {
      burger.addEventListener('click', () => menu.classList.toggle('hidden'));
      $$('a', menu).forEach((a) => a.addEventListener('click', () => menu.classList.add('hidden')));
    }
  }

  function renderHeroPhone() {
    const el = $('#hero-phone');
    if (!el) return;
    const list = (DEMO.PROFILES || []).slice(0, 3);
    if (!list.length) return;

    el.innerHTML = list.map((p, i) => `
      <div class="swipe-card" style="background-image:url('${esc(p.photos[0])}'),url('${esc(FB(p))}');opacity:${i === 0 ? 1 : 0};"></div>
    `).join('') + `
      <div class="swipe-shade"></div>
      <div class="swipe-info">
        <h3>${esc(list[0].name)}, ${list[0].age} ${ICONS.verified ? `<span style="width:15px;height:15px;display:inline-block;">${ICONS.verified}</span>` : ''}</h3>
        <p>${esc(list[0].city)} · à ${list[0].distanceKm} km</p>
        <div class="swipe-tags">${(list[0].interests || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      </div>
      <div class="swipe-actions">
        <button aria-label="Passer"><span style="color:#6d7286;display:grid;">${ICONS.x}</span></button>
        <button aria-label="Super like"><span style="color:#0ea5e9;display:grid;">${ICONS.star}</span></button>
        <button aria-label="J'aime"><span style="color:#E88D91;display:grid;">${ICONS.heart}</span></button>
      </div>`;
  }

  function renderFeatures() {
    const grid = $('#feat-grid');
    if (!grid) return;
    const feats = [
      { icon: 'flame', t: 'Découverte par glissement', d: 'Parcourez les profils un par un et indiquez ceux qui vous plaisent. Filtrez par âge, ville et distance.' },
      { icon: 'shield', t: 'Vérification d\'identité', d: 'Les profils qui le souhaitent obtiennent un badge de vérification, pour des rencontres plus sûres.' },
      { icon: 'msg', t: 'Messagerie instantanée', d: 'Discutez en temps réel quand le like est partagé. Messages vocaux, photos et blocage en un geste.' },
      { icon: 'star', t: 'Super Like', d: 'Sortez du lot : votre profil apparaît comme un coup de cœur et passe devant les autres.' },
      { icon: 'users', t: 'Communautés', d: 'Rejoignez des groupes par centre d\'intérêt : sorties, sport, entrepreneurs et bien d\'autres.' },
      { icon: 'zap', t: 'Statuts éphémères', d: 'Partagez une photo ou une vidéo de votre journée, visible 24 heures, et recevez des réactions.' },
    ];
    grid.innerHTML = feats.map((f) => `
      <div class="feat">
        <div class="ic">${ICONS[f.icon]}</div>
        <h3>${esc(f.t)}</h3>
        <p>${esc(f.d)}</p>
      </div>`).join('');
  }

  function renderSecurity() {
    const grid = $('#securite-grid');
    if (!grid) return;
    const items = (DEMO.AVANTAGES || []).map((a) => `
      <div class="feat">
        <div class="ic">${ICONS[a.icon] || ICONS.shield}</div>
        <h3>${esc(a.label)}</h3>
        <p>${esc(a.desc)}</p>
      </div>`).join('');
    grid.innerHTML = items;
  }

  function renderPricing() {
    const grid = $('#pricing-grid');
    if (!grid) return;
    const plans = DEMO.PLANS || [];
    const features = [
      'Likez et matchez sans limite',
      'Messagerie illimitée',
      'Statuts et réactions',
      'Accès aux communautés',
      'Participants aux likes reçus',
    ];
    grid.innerHTML = plans.map((p, i) => {
      const best = p.id === 'BIANNUAL';
      return `
        <div class="plan${best ? ' best' : ''}">
          ${best ? '<span class="tag">Le plus choisi</span>' : ''}
          <h4>${esc(p.label)}</h4>
          <div class="price">${fcfa(p.price)}<small></small></div>
          <div class="per">soit ${fcfa(Math.round(p.price / (p.days / 30)))} / mois</div>
          <div class="per" style="font-size:11.5px;color:var(--ink-3);">${p.days} jours · ${fcfa(Math.round(p.price / p.days))} par jour</div>
          <ul>${features.map((f) => `<li>${esc(f)}</li>`).join('')}</ul>
          <button class="btn ${best ? 'btn-primary' : 'btn-ghost'} btn-block" data-plan="${esc(p.id)}">Choisir</button>
        </div>`;
    }).join('');

    grid.addEventListener('click', (e) => {
      const b = e.target.closest('[data-plan]');
      if (b) window.location.href = 'auth.html';
    });

    const extras = $('#extras-grid');
    if (extras) {
      extras.innerHTML = (DEMO.EXTRAS || []).map((x) => `
        <div class="extra">
          <strong>${esc(x.label)}</strong>
          <div class="p">${fcfa(x.price)}</div>
          <span>${esc(x.desc)}</span>
        </div>`).join('');
    }
  }

  /* ---------- Application ---------- */
  const PAGES = {
    discover: { title: 'Découvrir', sub: 'Des profils qui vous correspondent, près de chez vous.', icon: 'flame' },
    likes: { title: 'Likes', sub: 'Les personnes qui vous ont remarqué.', icon: 'heart' },
    messages: { title: 'Messages', sub: 'Vos conversations et vos matchs.', icon: 'msg' },
    communities: { title: 'Communautés', sub: 'Rencontrez des gens qui partagent vos passions.', icon: 'users' },
    notifications: { title: 'Notifications', sub: 'Toute l\'actualité de votre compte.', icon: 'bell' },
    profile: { title: 'Mon profil', sub: 'Ce que les autres voient de vous.', icon: 'user' },
    premium: { title: 'Abonnements', sub: 'Débloquez plus de possibilités sur Yamo.', icon: 'crown' },
  };

  function initApp() {
    if (DEMO_MODE) {
      const b = $('#demo-banner');
      if (b) b.classList.remove('hidden');
    }

    loadMe();
    seedDemoMatches();
    renderNav();
    renderMeMini();
    askNotifPermission();
    setTimeout(simulateNewcomer, 4500);
    setInterval(simulateNewcomer, 60000);

    const hash = (location.hash || '#discover').replace('#', '');
    go(PAGES[hash] ? hash : 'discover');
  }

  function renderNav() {
    const nav = $('#app-nav');
    if (!nav) return;
    const unreadTotal = (DEMO.CONVERSATIONS || []).filter((c) => c.direct || (STATE.matches || []).indexOf(c.profileId) !== -1).reduce((s, c) => s + (c.unread || 0), 0);
    nav.innerHTML = Object.keys(PAGES).map((k) => {
      const p = PAGES[k];
      let badge = '';
      if (k === 'messages' && unreadTotal) badge = `<span class="badge">${unreadTotal}</span>`;
      if (k === 'likes') { const nL = inboundProfiles().length; if (nL) badge = `<span class="badge">${nL > 9 ? '9+' : nL}</span>`; }
      if (k === 'notifications') {
        const n = notifUnread();
        if (n) badge = `<span class="badge">${n > 9 ? '9+' : n}</span>`;
      }
      const SHORT = { communities: 'Groupes', notifications: 'Alertes', premium: 'Abonner', profile: 'Profil' };
      const shortLbl = SHORT[k] ? `<span class="lbl lbl-short">${SHORT[k]}</span>` : '';
      const longCls = SHORT[k] ? 'lbl lbl-long' : 'lbl';
      return `<button data-page="${k}" aria-label="${esc(p.title)}">${ICONS[p.icon]}<span class="${longCls}">${esc(p.title)}</span>${shortLbl}${badge}</button>`;
    }).join('') + `<button data-page="admin" style="color:var(--ink-3);" aria-label="Espace administrateur">${ICONS.shield || ''}<span class="lbl lbl-long">Admin</span><span class="lbl lbl-short">Admin</span></button><button data-page="logout" style="color:var(--ink-3);" aria-label="Déconnexion">${ICONS.logout}<span class="lbl lbl-long">Déconnexion</span><span class="lbl lbl-short">Quitter</span></button>`;

    $$('button', nav).forEach((b) => b.addEventListener('click', () => {
      const p = b.getAttribute('data-page');
      if (p === 'logout') {
        window.location.href = 'index.html';
        return;
      }
      if (p === 'admin') {
        window.location.href = 'admin.html';
        return;
      }
      go(p);
    }));
  }

  function renderMeMini() {
    const el = $('#me-mini');
    if (!el) return;
    const me = STATE.myProfile;
    el.innerHTML = `
      <img src="${esc(me.photos[0])}" alt="">
      <div class="txt">
        <strong>${esc(me.name)}, ${me.age} ${me.is_verified ? `<span style="width:12px;height:12px;display:inline-block;vertical-align:middle;">${ICONS.verified}</span>` : ''}</strong>
        <small>${me.is_premium ? 'Abonné Premium' : 'Compte gratuit'}${me.invisible ? ' · Invisible' : ''}</small>
      </div>`;
    el.style.cursor = 'pointer';
    el.addEventListener('click', () => go('profile'));
  }

  function go(page) {
    const p = PAGES[page] || PAGES.discover;
    $('#page-title').textContent = p.title;
    $('#page-sub').textContent = p.sub;
    $('#page-actions').innerHTML = '';
    location.hash = page;
    $$('#app-nav button').forEach((b) => b.classList.toggle('active', b.getAttribute('data-page') === page));

    STATE.page = page;
    if (window.YamoAnalytics) { try { window.YamoAnalytics.trackPageView(page); } catch (e) {} }
    const view = $('#view');
    view.innerHTML = '';
    view.removeAttribute('data-deck-id');

    if (page === 'discover') return viewDiscover(view);
    if (page === 'likes') return (window.YamoApp && window.YamoApp.viewLikes ? window.YamoApp.viewLikes : viewLikes)(view);
    if (page === 'messages') {
      // On arrive depuis un match ou un message direct : la discussion s'ouvre tout de suite.
      // Sinon, on ne touche pas au panneau : on garde la vue en cours (liste ou discussion).
      const keepOpen = !!STATE.openAfterDM;
      STATE.openAfterDM = false;
      if (keepOpen) {
        STATE.chatOpenMobile = true;
        return (window.YamoApp && window.YamoApp.viewMessages ? window.YamoApp.viewMessages : viewMessages)(view);
      }
      if (STATE.chatOpenMobile) {
        const active = (DEMO.CONVERSATIONS || []).find((c) => c.id === STATE.activeConv);
        const ok = active && (active.direct || (STATE.matches || []).indexOf(active.profileId) !== -1);
        if (!ok) STATE.chatOpenMobile = false;
      }
      return (window.YamoApp && window.YamoApp.viewMessages ? window.YamoApp.viewMessages : viewMessages)(view);
    }
    if (page === 'communities') return viewCommunities(view);
    if (page === 'notifications') return viewNotifications(view);
    if (page === 'profile') return viewProfile(view);
    if (page === 'premium') return (window.YamoApp && window.YamoApp.viewPremium ? window.YamoApp.viewPremium : viewPremium)(view);
  }

  /* ---------- Écran : Découvrir ---------- */
  function viewDiscover(view) {
    const list = profiles();
    const pair = list.slice(0, 2);

    view.innerHTML = `
      <div class="swipe-wrap">
        <div>
          <div class="deck" id="deck">
            ${pair.length
              ? pair.map((p) => cardHTML(p)).join('')
              : `<div class="deck-card" style="display:grid;place-items:center;text-align:center;padding:36px;background:#fff;border:1.5px dashed var(--line);">
                   <div>
                     <div style="width:64px;height:64px;border-radius:50%;background:var(--yamo-soft);display:grid;place-items:center;margin:0 auto 18px;color:var(--yamo);">${ICONS.heartO}</div>
                     <h3 style="margin:0 0 8px;font-size:19px;font-weight:800;">Vous avez tout vu pour aujourd'hui</h3>
                     <p style="color:var(--ink-3);font-size:14px;margin:0 0 20px;">Revenez plus tard ou élargissez vos critères de recherche.</p>
                     <button class="btn btn-primary btn-sm" id="reset-deck">Recommencer la démo</button>
                   </div>
                 </div>`}
          </div>
          ${pair.length ? `
          <div class="deck-btns">
            <button class="round-btn" data-act="pass" aria-label="Passer" title="Passer"><span style="color:#6d7286;display:grid;">${ICONS.x}</span></button>
            <button class="round-btn" data-act="super" aria-label="Super Like" title="Super Like"><span style="color:#0ea5e9;display:grid;width:26px;">${ICONS.star}</span></button>
            <button class="round-btn" data-act="like" aria-label="J'aime" title="J'aime"><span style="color:#E88D91;display:grid;">${ICONS.heart}</span></button>
          </div>
          <div style="display:flex;gap:10px;margin-top:14px;">
            <button class="btn btn-ghost btn-sm" id="deck-profile" style="flex:1;">Voir le profil complet</button>
            <button class="btn btn-primary btn-sm" id="deck-msg" style="flex:1;">Message direct</button>
          </div>` : ''}
        </div>

        <aside class="side-panel">
          <h3>${ICONS.sparkle} Votre activité</h3>
          <div class="stat-row"><span>Likes reçus</span><strong>${inboundProfiles().length}</strong></div>
          <div class="stat-row"><span>Matchs</span><strong>${STATE.matches.length}</strong></div>
          <div class="stat-row"><span>Visiteurs du profil</span><strong>12</strong></div>
          <div class="stat-row"><span>Profils restants</span><strong>${list.length}</strong></div>

          <h3 style="margin-top:26px;">${ICONS.zap} Statuts</h3>
          <div class="stories" id="stories"></div>

          <h3 style="margin-top:20px;">${ICONS.crown} Passer en Premium</h3>
          <p style="font-size:13px;color:var(--ink-3);margin:0 0 14px;">Voyez qui vous a liké et apparaissez plus souvent.</p>
          <button class="btn btn-primary btn-block btn-sm" id="go-premium">Découvrir les offres</button>
        </aside>
      </div>`;

    renderStories();

    const first = list[0];
    if (first) { view.setAttribute('data-deck-id', first.id); STATE.lastCardId = first.id; }
    else view.removeAttribute('data-deck-id');
    const dp = $('#deck-profile');
    if (dp && first) dp.addEventListener('click', () => openFullProfile(first, { fromDeck: true }));
    const dm = $('#deck-msg');
    if (dm && first) dm.addEventListener('click', () => startChat(first, false));

    const reset = $('#reset-deck');
    if (reset) reset.addEventListener('click', () => {
      STATE.passes = []; STATE.likes = []; STATE.matches = []; go('discover');
    });

    const premiumBtn = $('#go-premium');
    if (premiumBtn) premiumBtn.addEventListener('click', () => go('premium'));

    $$('[data-act]').forEach((b) => {
      if (b._yamoBound) return;   // évite les doublons si la vue est redessinée
      b._yamoBound = true;
      b.addEventListener('click', (ev) => {
      ev.preventDefault(); ev.stopPropagation();
      const act = b.getAttribute('data-act');
      const target = ($('#view') && $('#view').getAttribute('data-deck-id')
        ? byId($('#view').getAttribute('data-deck-id'))
        : null) || profiles()[0];
      if (!target) return;
      const likeName = target.name;

      if (act === 'pass') {
        STATE.passes.push(target.id); saveMe();
        toast('Profil passé.');
        go('discover');
        return;
      }
      if (act === 'super') {
        const dispo = (STATE.extraBalance.SUPER_LIKE || 0) > 0;
        if (!dispo) {
          const osp = window.YamoObtenirSuperPay || (window.YamoApp && window.YamoApp.openSuperPay);
          if (typeof osp === 'function') osp(target);
          else { toast('Plus de Super Like. Achetez-en dans Abonnements.'); go('premium'); }
          return;
        }
        if (dispo) { STATE.extraBalance.SUPER_LIKE -= 1; saveMe(); }
        // Un Super Like n'est un match que si la personne vous avait déjà liké
        const isMatchS = inboundProfiles().some((x) => x.id === target.id);
        if (isMatchS) {
          STATE.likes.push(target.id);
          if (STATE.matches.indexOf(target.id) === -1) STATE.matches.push(target.id);
          saveMe(); refreshDeck(); renderNav(); showMatch(target);
        } else {
          STATE.likes.push(target.id);
          if (STATE.superSent.indexOf(target.id) === -1) STATE.superSent.push(target.id);
          saveMe();
          toast('Super Like envoyé à ' + target.name + ' !');
          refreshDeck(); renderNav();
        }
        return;
      }
      // Un match n'a lieu que si la personne vous avait déjà liké
      const isMatch = inboundProfiles().some((x) => x.id === target.id);
      STATE.likes.push(target.id);
      saveMe();
      renderNav();
      if (isMatch) {
        if (STATE.matches.indexOf(target.id) === -1) STATE.matches.push(target.id);
        saveMe();
        refreshDeck();
        showMatch(target);
      } else {
        refreshDeck();
        toast('Like envoyé à ' + likeName + ' !');
      }
      });
    });
  }

  function refreshDeck() {
    const host = $('#view');
    if (!host) return;
    const shown = host.getAttribute('data-deck-id');
    if (shown) STATE.lastCardId = shown;
    viewDiscover(host);
    const cur = profiles()[0];
    if (cur) host.setAttribute('data-deck-id', cur.id); else host.removeAttribute('data-deck-id');
    const p = PAGES.discover;
    $('#page-title').textContent = p.title;
    $('#page-sub').textContent = p.sub;
  }

  function cardHTML(p) {
    return `
      <div class="deck-card">
        <div class="swipe-card" style="background-image:url('${esc(p.photos[0])}'),url('${esc(FB(p))}');"></div>
        <div class="swipe-shade"></div>
        <div style="position:absolute;top:16px;right:16px;display:flex;gap:7px;flex-direction:column;align-items:flex-end;">
          ${p.is_verified ? `<span style="background:#fff;border-radius:999px;padding:5px 10px;font-size:11px;font-weight:800;display:flex;align-items:center;gap:5px;color:#1a8a4a;"><span style="width:13px;height:13px;display:inline-block;">${ICONS.verified}</span>Vérifié</span>` : ''}
          ${p.is_premium ? `<span style="background:#fffbeb;border-radius:999px;padding:5px 10px;font-size:11px;font-weight:800;color:#b45309;">Premium</span>` : ''}
          ${isBoosted(p) ? `<span style="background:var(--yamo);border-radius:999px;padding:5px 10px;font-size:11px;font-weight:800;color:#fff;display:flex;align-items:center;gap:5px;"><span style="width:12px;height:12px;display:inline-block;">${ICONS.zap}</span>Boosté</span>` : ''}
        </div>
        <div class="swipe-info">
          <h3>${esc(p.name)}, ${p.age} ${p.is_verified ? `<span style="width:16px;height:16px;display:inline-block;">${ICONS.verified}</span>` : ''}</h3>
          <p style="display:flex;align-items:center;gap:5px;"><span style="width:13px;height:13px;display:inline-block;">${ICONS.pin}</span>${esc(p.city)} · à ${p.distanceKm} km</p>
          <p style="margin-top:9px;">${esc(p.bio)}</p>
          <div class="swipe-tags">${(p.interests || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
        </div>
      </div>`;
  }

  function renderStories() {
    const el = $('#stories');
    if (!el) return;
    el.innerHTML = `
      <div class="story add">
        <div class="ring">${ICONS.plus}</div>
        <span>Mon statut</span>
      </div>` +
      (DEMO.STATUSES || []).map((s) => {
        const p = byId(s.profileId);
        return `<div class="story${s.seen ? ' seen' : ''}" data-story="${esc(s.id)}">
          <div class="ring"><div><img src="${esc(s.media)}" alt=""></div></div>
          <span>${esc(p.name)}</span>
        </div>`;
      }).join('');

    $$('[data-story]', el).forEach((s) => s.addEventListener('click', () => {
      const st = (DEMO.STATUSES || []).find((x) => x.id === s.getAttribute('data-story'));
      if (st) openStory(st);
    }));
    const add = $('.story.add', el);
    if (add) add.addEventListener('click', () => toast('Choisissez une photo ou une vidéo pour votre statut (24 h).'));
  }

  function openStory(st) {
    const p = byId(st.profileId);
    const root = $('#modal-root');
    root.innerHTML = `
      <div class="modal-bg" id="story-bg" style="padding:0;background:#000;">
        <div style="width:100%;max-width:420px;height:88vh;border-radius:20px;overflow:hidden;position:relative;">
          <img src="${esc(st.media)}" alt="" style="width:100%;height:100%;object-fit:cover;">
          <div style="position:absolute;top:0;left:0;right:0;padding:16px;background:linear-gradient(180deg,rgba(0,0,0,.62),transparent);display:flex;align-items:center;gap:10px;color:#fff;">
            <div style="width:34px;height:34px;border-radius:50%;overflow:hidden;"><img src="${esc(p.photos[0])}" alt="" onerror="this.onerror=null;this.src=window.YAMO_FALLBACK('${esc(p.name)}',0)" style="width:100%;height:100%;object-fit:cover;"></div>
            <strong style="font-size:14px;">${esc(p.name)}</strong>
            <small style="opacity:.75;font-size:12px;">il y a 3 h</small>
          </div>
          <div style="position:absolute;bottom:20px;left:0;right:0;display:flex;justify-content:center;gap:14px;">
            <button class="btn btn-outline-light btn-sm" id="story-like">${ICONS.heart}</button>
            <button class="btn btn-outline-light btn-sm" id="story-close">Fermer</button>
          </div>
        </div>
      </div>`;
    $('#story-bg').addEventListener('click', (e) => { if (e.target.id === 'story-bg') closeModal(); });
    $('#story-close').addEventListener('click', closeModal);
    $('#story-like').addEventListener('click', () => { toast('Réaction envoyée à ' + p.name + ' !'); closeModal(); });
  }

  function showMatch(p) {
    const root = $('#modal-root');
    root.innerHTML = `
      <div class="match-overlay" id="match-ov">
        <div>
          <div class="match-photos">
            <img src="${esc(STATE.myProfile.photos[0])}" alt="">
            <img src="${esc(p.photos[0])}" alt="" onerror="this.onerror=null;this.src=window.YAMO_FALLBACK('${esc(p.name)}',0)">
            <div class="match-heart">${ICONS.heart}</div>
          </div>
          <h2>C'est un match !</h2>
          <p>${esc(p.name)} et vous vous plaisez. À vous de parler maintenant.</p>
          <div class="btns">
            <button class="btn" style="background:#fff;color:var(--yamo-deep);" id="match-msg">${'Envoyer un message'}</button>
            <button class="btn btn-outline-light" id="match-continue">Continuer à découvrir</button>
          </div>
        </div>
      </div>`;
    const mm=$('#match-msg');
    if (mm) mm.addEventListener('click', () => {
      closeModal();
      // On ouvre directement la discussion du match qui vient de se créer
      let conv = (DEMO.CONVERSATIONS || []).find((c) => c.profileId === p.id);
      if (!conv) {
        // Le match vient de se créer : sa discussion doit apparaître immédiatement
        conv = { id: 'c_' + p.id, profileId: p.id, unread: 0, isMatch: true,
          messages: [{ from: 'them', text: "C'est un match ! 😊 Ravi(e) de faire votre connaissance.", at: nowHM() }] };
        (DEMO.CONVERSATIONS || []).push(conv);
      }
      conv.isMatch = true;
      STATE.activeConv = conv.id;
      conv.unread = 0;
      STATE.chatOpenMobile = true;
      STATE.openAfterDM = true;
      saveMe(); renderNav();
      go('messages');
    });
    const mc=$('#match-continue');
    if (mc) mc.addEventListener('click', () => { closeModal(); go('discover'); });
    $('#match-ov').addEventListener('click', (e) => {
      if (e.target.id === 'match-ov') { closeModal(); if (STATE.page === 'discover') refreshDeck(); }
    });
  }

  function closeModal() {
    const root = $('#modal-root');
    if (root) root.innerHTML = '';
  }

  /* ---------- Écran : Likes ---------- */
  function viewLikes(view) {
    const sup = inboundProfiles().filter((p) => p.likedKind === 'SUPER');
    const tabs = [
      { k: 'received', l: 'Ils vous ont liké', n: inboundProfiles().length },
      { k: 'super', l: 'Super Likes', n: sup.length },
      { k: 'matches', l: 'Mes matchs', n: STATE.matches.length },
      { k: 'sent', l: 'Envoyés', n: STATE.likes.length },
    ];

    let list = [];
    if (STATE.likesTab === 'received') list = receivedLikes();
    else if (STATE.likesTab === 'super') list = sup;
    else if (STATE.likesTab === 'matches') list = STATE.matches.map(byId);
    else list = STATE.likes.map(byId);

    // Masquer les personnes bloquées
    list = list.filter((p) => p && !(window.YamoModeration && window.YamoModeration.isBlocked(p.id)));

    const f = myFeatures();
    const isLikesTab = STATE.likesTab === 'received' || STATE.likesTab === 'super';
    const hiddenCount = isLikesTab ? Math.max(0, list.length - (f.seeAllLikes ? list.length : (f.seeLikes ? 1 : 0))) : 0;

    view.innerHTML = `
      <div class="rule-note">
        <strong>${ICONS.heart || ''} Comment ça marche</strong>
        <span>On discute seulement quand il y a un match. Voyez qui vous a liké, ouvrez son profil complet, ses photos, puis likez en retour : le match se crée et la discussion s'ouvre.</span>
      </div>
      <div class="likes-tabs">
        ${tabs.map((t) => `<button class="chip${STATE.likesTab === t.k ? ' active' : ''}" data-tab="${t.k}">${esc(t.l)} <span class="n">${t.n}</span></button>`).join('')}
      </div>
      ${list.length
        ? `<div class="people-grid">${list.map((p, i) => {
              // 1er like visible pour tout le monde (aperçu), le reste selon la formule
              const locked = isLikesTab && !f.seeAllLikes;
              if (locked) {
                return `<div class="person locked" data-lock="1" data-prof="${esc(p.id)}" role="button" tabindex="0" aria-label="Profil réservé aux abonnés">
                  <img src="${esc(p.photos[0])}" alt="" class="blur" onerror="this.onerror=null;this.src=window.YAMO_FALLBACK('${esc(p.name)}',0)">
                  <div class="grad"></div>
                  <div class="lock-badge">${ICONS.crown || ''}<span>${isFemale() ? 'Abonnez-vous' : 'Débloquer'}</span></div>
                  <div class="meta"><strong>Profil masqué</strong><small>Abonnez-vous pour voir</small></div>
                </div>`;
              }
              const replied = (STATE.likes || []).indexOf(p.id) !== -1;
              const matched = (STATE.matches || []).indexOf(p.id) !== -1;
              const statusTag = matched
                ? `<div class="lock-badge" style="left:auto;right:12px;top:12px;background:#059669;">${ICONS.heart || ''}<span>Match</span></div>`
                : replied
                  ? `<div class="lock-badge" style="left:auto;right:12px;top:12px;background:#059669;">${ICONS.check || ''}<span>Liké en retour</span></div>`
                  : '';
              return `
            <div class="person" data-prof="${esc(p.id)}">
              <img src="${esc(p.photos[0])}" alt="${esc(p.name)}" onerror="this.onerror=null;this.src=window.YAMO_FALLBACK('${esc(p.name)}',0)">
              <div class="grad"></div>
              ${statusTag}
              <div class="meta">
                <strong>${esc(p.name)}, ${p.age} ${p.is_verified ? `<span class="verified">${ICONS.verified}</span>` : ''}</strong>
                <small>${esc(p.city)} · à ${esc(p.distanceKm)} km</small>
              </div>
            </div>`;
            }).join('')}</div>
            ${isLikesTab && hiddenCount > 0
              ? `<div style="margin-top:18px;padding:16px 20px;background:var(--yamo-soft);border-radius:14px;display:flex;align-items:center;gap:14px;flex-wrap:wrap;">
                   <div style="flex:1;min-width:200px;font-size:13.5px;color:var(--ink-2);"><strong>${hiddenCount} personne(s) de plus vous ont liké</strong><br>${isFemale() ? 'Votre abonnement unique débloque tout : qui vous a likée, profil complet, photos et réponse.' : 'Choisissez une formule pour les voir, ouvrir leur profil complet et leur répondre.'}</div>
                   <button class="btn btn-primary btn-sm" id="likes-go-premium">${isFemale() ? 'Voir qui m’a likée' : 'Voir les formules'}</button>
                 </div>`
              : ''}`
        : `<div style="text-align:center;padding:70px 20px;color:var(--ink-3);">
             <div style="width:64px;height:64px;border-radius:50%;background:var(--yamo-soft);display:grid;place-items:center;margin:0 auto 16px;color:var(--yamo);">${ICONS.heartO}</div>
             <h3 style="margin:0 0 8px;color:var(--ink);font-size:18px;font-weight:800;">Rien pour le moment</h3>
             <p style="margin:0;font-size:14px;">Continuez à découvrir des profils pour recevoir des likes.</p>
           </div>`}`;

    $$('[data-tab]', view).forEach((b) => b.addEventListener('click', () => {
      STATE.likesTab = b.getAttribute('data-tab');
      go('likes');
    }));

    const openOne = (id, isLike) => {
      const p = byId(id);
      if (!p) return;
      if (isLike && !f.seeLikes) { setTimeout(function(){ toast('Abonnez-vous pour voir qui vous a liké, son profil et ses photos.'); }, 50); go('premium'); return; }
      const isLikePanel = STATE.likesTab === 'received' || STATE.likesTab === 'super';
      openFullProfile(p, { fromLikes: isLikePanel });
    };

    const isLikePanel0 = STATE.likesTab === 'received' || STATE.likesTab === 'super';
    $$('[data-prof]', view).forEach((c) => c.addEventListener('click', () => openOne(c.getAttribute('data-prof'), isLikePanel0)));

    /* (cartes masquées gérées dans js/block.js) */
    const lp = $('#likes-go-premium');
    if (lp) lp.addEventListener('click', () => go('premium'));
  }

  /* Liste des personnes qui m'ont liké (démo : 3 profils) */
  function receivedLikes() {
    const base = inboundProfiles();
    return base.map((p, i) => Object.assign({}, p, {
      likedAt: Date.now() - (i + 1) * 3600 * 1000,
      likedKind: i === 2 ? 'SUPER' : 'LIKE',
    }));
  }

  /* ---------- Fiche complète d'un profil (photos + like en retour) ---------- */
  function openFullProfile(p, opts) {
    const o = opts || {};
    const f = myFeatures();
    // Une personne qui vous a liké n'est visible en entier qu'avec l'abonnement
    const seenFull = !!f.seeAllLikes;
    if (o.fromLikes && !seenFull) {
      const isME = isFemale();
      toast(isME
        ? 'Abonnez-vous pour voir qui vous a likée et son profil complet.'
        : 'Pour voir qui vous a liké et liker en retour, passez Premium.');
      go('premium');
      return;
    }
    const full = p.photos || [];
    const shown = f.seePhotos === 'full' ? full : (f.seePhotos === 'preview' ? full.slice(0, 1) : []);
    if (!shown.length) {
      toast('Abonnez-vous pour voir son profil complet et ses photos.');
      go('premium'); return;
    }
    const hiddenPhotos = full.length - shown.length;
    const alreadyLiked = (STATE.likes || []).indexOf(p.id) !== -1;
    const isMatch = (STATE.matches || []).indexOf(p.id) !== -1;
    const replyLimit = f.replyLikes;
    const sentReplies = (STATE.repliesSent || 0);
    const canReply = replyLimit === -1 || sentReplies < replyLimit;

    const root = $('#modal-root');
    root.innerHTML = `
      <div class="modal-bg" id="full-bg">
        <div class="full-profile" role="dialog" aria-modal="true" aria-label="Profil de ${esc(p.name)}">
          <button class="close-x" id="full-close" aria-label="Fermer">${ICONS.x}</button>
          <div class="fp-head">
            <div class="fp-main" id="fp-main" style="background-image:url('${esc(shown[0])}');">
              <div class="fp-grad"></div>
              ${o.fromLikes ? `<span class="fp-tag">${p.likedKind === 'SUPER' ? 'Super Like reçu' : 'Vous a liké'}</span>` : ''}
              <div class="fp-title">
                <h3>${esc(p.name)}, ${p.age} ${p.is_verified ? `<span style="width:18px;height:18px;display:inline-block;">${ICONS.verified}</span>` : ''}</h3>
                <p>${esc(p.city)}, ${esc(p.country)} · à ${esc(p.distanceKm)} km</p>
              </div>
            </div>
            <div class="fp-thumbs">
              ${shown.map((ph, i) => `<button class="fp-thumb${i === 0 ? ' on' : ''}" data-photo="${esc(ph)}" aria-label="Photo ${i + 1}"><img src="${esc(ph)}" alt=""></button>`).join('')}
              ${hiddenPhotos > 0 ? `<button class="fp-thumb locked-ph" id="fp-more-photos" aria-label="Photos supplémentaires réservées aux abonnés"><span>+${hiddenPhotos}</span></button>` : ''}
            </div>
          </div>
          <div class="fp-body">
            <p class="fp-bio">${esc(p.bio)}</p>
            <div class="fp-facts">
              <span>${ICONS.pin} ${esc(p.city)}</span>
              <span>${esc(p.relationship_goal === 'SERIOUS' ? 'Relation sérieuse' : 'À découvrir')}</span>
              ${p.is_verified ? `<span>Profil vérifié</span>` : ''}
            </div>
            <div class="interest-tags">${(p.interests || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
            ${alreadyLiked ? `<div class="fp-note ok">${ICONS.check || ''} Vous avez déjà liké ${esc(p.name)}${isMatch ? ' — c’est un match !' : '.'}</div>` : ''}
            ${!isMatch ? `<div class="fp-wait">Pour discuter avec ${esc(p.name)}, il faut un match : likez en retour, ou envoyez-lui un message direct.</div>` : ''}
            <div class="fp-actions">
              <button class="btn btn-ghost btn-sm" id="fp-pass">Passer</button>
              <button class="btn btn-primary btn-sm" id="fp-like">${isMatch ? '✓ Match : écrire à ' + esc((p && p.name) || 'cette personne') : alreadyLiked ? '✓ Liké en retour' : (o.fromLikes ? 'Liker en retour → match' : 'Liker')}</button>
              <button class="btn btn-ghost btn-sm" id="fp-super" ${alreadyLiked || isMatch ? 'disabled' : ''} title="Super Like">★</button>
              <button class="btn ${isMatch ? 'btn-primary' : 'btn-ghost'} btn-sm" id="fp-msg">${isMatch ? 'Écrire un message' : 'Message direct'}</button>
            </div>
            ${!isMatch ? `<p class="fp-sub">${o.fromLikes
              ? 'Cette personne vous a liké : un like en retour crée le match et ouvre la discussion. Le message direct est aussi possible (' + fcfa((DEMO.EXTRAS || []).find((x) => x.id === 'DIRECT_MESSAGE')?.price || 200) + ').'
              : 'Sans match, pas de discussion. Vous pouvez envoyer un message direct (' + fcfa((DEMO.EXTRAS || []).find((x) => x.id === 'DIRECT_MESSAGE')?.price || 200) + ').'}</p>` : `<p class="fp-sub">Vous êtes en match : la discussion est ouverte dans « Messages ».</p>`}
            ${!canReply && !alreadyLiked && !isMatch ? `<div class="fp-note warn">Votre formule permet ${replyLimit} réponse(s) aux likes. Passez à une formule supérieure pour répondre à tout le monde.</div>` : ''}
            <div class="fp-actions small">
              <button class="btn btn-sm" id="fp-report" style="color:var(--ink-3);">Signaler</button>
              <button class="btn btn-sm" id="fp-block" style="color:#dc2626;">Bloquer</button>
            </div>
          </div>
        </div>
      </div>`;

    /* Like déjà envoyé : bouton actif (on revient simplement à la fiche),
       jamais un bouton mort. */
    const close = () => closeModal();
    $('#full-close').addEventListener('click', close);
    $('#full-bg').addEventListener('click', (e) => { if (e.target.id === 'full-bg') close(); });
    document.addEventListener('keydown', function esc(ev) {
      if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });

    $$('[data-photo]', root).forEach((b) => b.addEventListener('click', () => {
      $('#fp-main').style.backgroundImage = `url('${b.getAttribute('data-photo')}')`;
      $$('[data-photo]', root).forEach((x) => x.classList.remove('on'));
      b.classList.add('on');
    }));
    const more = $('#fp-more-photos');
    if (more) more.addEventListener('click', () => {
      toast(isFemale() ? 'Votre abonnement unique ouvre toutes ses photos.' : 'Toutes les photos sont réservées aux formules 3 mois et plus.');
      close(); go('premium');
    });

    $('#fp-pass').addEventListener('click', () => { STATE.passes.push(p.id); saveMe(); toast('Profil passé.'); close(); if (STATE.page === 'likes') go('likes'); });
    $('#fp-like').addEventListener('click', () => {
      /* Déjà liké (ou déjà en match) : on propose simplement d'écrire */
      if (STATE.likes.indexOf(p.id) !== -1 || isMatch) {
        close();
        if ((STATE.matches || []).indexOf(p.id) !== -1 || hasDirect(p.id)) { startChat(p, true); } else { toast('Like déjà envoyé à ' + p.name + '.'); }
        return;
      }
      if (!canReply) { toast('Limite de réponses atteinte pour votre formule.'); close(); go('premium'); return; }
      STATE.likes.push(p.id);
      STATE.repliesSent = (STATE.repliesSent || 0) + 1;
      saveMe();
      close();
      // Un like en retour sur une personne qui nous a déjà liké = match
      const givesMatch = o.fromLikes || inboundProfiles().some((x) => x.id === p.id);
      if (givesMatch) {
        if (STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id);
        saveMe();
        showMatch(p);
      } else {
        // Personne qui ne nous a pas encore liké : simple like, pas de discussion
        toast('Like envoyé à ' + p.name + '. La discussion s\'ouvrira si elle vous like aussi.');
      }
      renderNav();
      if (!givesMatch && STATE.page === 'likes') go('likes');
    });
    const fs = $('#fp-super');
    if (fs) fs.addEventListener('click', () => {
      const dispo = (STATE.extraBalance.SUPER_LIKE || 0) > 0;
      if (!dispo) {
        close();
        const osp2 = window.YamoObtenirSuperPay || (window.YamoApp && window.YamoApp.openSuperPay);
        if (typeof osp2 === 'function') osp2(p); else go('premium');
        return;
      }
      STATE.extraBalance.SUPER_LIKE -= 1; saveMe();
      STATE.likes.push(p.id); saveMe();
      if (o.fromLikes || inboundProfiles().some((x) => x.id === p.id)) {
        if (STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id);
        saveMe(); close(); showMatch(p);
      } else { if (STATE.superSent.indexOf(p.id) === -1) STATE.superSent.push(p.id); saveMe(); toast('Super Like envoyé à ' + p.name + ' !'); close(); }
      renderNav();
    });
    $('#fp-msg').addEventListener('click', () => { close(); startChat(p, isMatch); });
    $('#fp-report').addEventListener('click', () => { close(); window.YamoModeration.openReport(p); });
    $('#fp-block').addEventListener('click', () => { close(); window.YamoModeration.openBlock(p, () => go(STATE.page || 'discover')); });
  }

  /* ---------- Ouvrir une discussion ----------
     Deux chemins seulement : un match existant, ou un message direct payé.
     Sans l'un des deux, aucune discussion n'est possible. */
  function convFor(profileId) {
    const list = DEMO.CONVERSATIONS || [];
    return list.find((c) => c.profileId === profileId) || null;
  }
  function isMatched(id) { return (STATE.matches || []).indexOf(id) !== -1; }
  function hasDirect(id) {
    const c = convFor(id);
    return !!(c && c.direct);
  }

  function startChat(p, isMatch) {
    isMatch = isMatch || isMatched(p.id) || hasDirect(p.id);
    const conv = convFor(p.id);
    if (isMatch) {
      if (conv) { STATE.activeConv = conv.id; conv.unread = 0; }
      else {
        (DEMO.CONVERSATIONS || []).push({
          id: 'c_' + p.id, profileId: p.id, unread: 0, isMatch: true,
          messages: [{ from: 'them', text: 'C\'est un match ! 😊 Ravi(e) de faire votre connaissance.', at: nowHM() }],
        });
        STATE.activeConv = 'c_' + p.id;
      }
      STATE.chatOpenMobile = true;
      STATE.openAfterDM = true;
      go('messages');
      return;
    }
    // Pas de match : écran de paiement unique (celui de block.js)
    if (window.YamoApp && window.YamoApp.openDMPay) { window.YamoApp.openDMPay(p); return; }
    paymentFallback(p);
  }

  /* Filet de sécurité si le module complémentaire n'est pas chargé :
     l'écran de paiement du message direct reste disponible. */
  function paymentFallback(p) {
    const dmIncluded = !!myFeatures().directMsg;
    const price = dmIncluded ? 0 : (((DEMO.EXTRAS || []).find((x) => x.id === 'DIRECT_MESSAGE') || {}).price || 200);
    const root = $('#modal-root');
    root.innerHTML = `
      <div class="modal-bg" id="dm-bg">
        <div class="modal" style="max-width:420px;">
          <h3>Sans match, pas de discussion</h3>
          <p>Envoyez un message direct à ${esc(p.name)}.</p>
          <button class="btn btn-primary btn-block" id="dm-pay">${dmIncluded ? 'Ouvrir la discussion' : 'Payer ' + fcfa(price) + ' et écrire'}</button>
          <button class="btn btn-block" id="dm-cancel" style="color:var(--ink-3);margin-top:8px;">Annuler</button>
        </div>
      </div>`;
    $('#dm-cancel').addEventListener('click', closeModal);
    $('#dm-pay').addEventListener('click', () => {
      if (!dmIncluded && (STATE.extraBalance.DIRECT_MESSAGE || 0) > 0) STATE.extraBalance.DIRECT_MESSAGE -= 1;
      let conv = convFor(p.id);
      if (!conv) {
        conv = { id: 'c_' + p.id, profileId: p.id, unread: 0, direct: true, messages: [{ from: 'them', text: "Bonjour ! Vous m'avez écrit ? 😊", at: nowHM() }] };
        (DEMO.CONVERSATIONS || []).push(conv);
      }
      conv.direct = true;
      conv.unread = 0;
      STATE.activeConv = conv.id;
      STATE.chatOpenMobile = true;
      STATE.openAfterDM = true;
      closeModal(); saveMe(); renderNav();
      toast('Discussion ouverte avec ' + p.name + '.');
      go('messages');
    });
  }
  function nowHM() {
    const d = new Date();
    return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
  }

  function openProfile(p) {
    const root = $('#modal-root');
    root.innerHTML = `
      <div class="modal-bg" id="prof-bg">
        <div class="modal-wrap">
          <button class="close-x" id="prof-close" aria-label="Fermer">${ICONS.x}</button>
          <div style="border-radius:24px;overflow:hidden;max-width:420px;background:#fff;">
            <div style="height:400px;background-image:url('${esc(p.photos[0])}'),url('${esc(FB(p))}');background-size:cover;background-position:center;position:relative;">
              <div style="position:absolute;inset:0;background:linear-gradient(180deg,transparent 45%,rgba(0,0,0,.8));"></div>
              <div style="position:absolute;bottom:18px;left:20px;right:20px;color:#fff;">
                <h3 style="margin:0;font-size:25px;font-weight:800;display:flex;align-items:center;gap:7px;">${esc(p.name)}, ${p.age} ${p.is_verified ? `<span style="width:17px;height:17px;display:inline-block;">${ICONS.verified}</span>` : ''}</h3>
                <p style="margin:5px 0 0;font-size:13.5px;opacity:.9;">${esc(p.city)}, ${esc(p.country)} · à ${p.distanceKm} km</p>
              </div>
            </div>
            <div style="padding:22px;max-height:40vh;overflow-y:auto;">
              <p style="margin:0 0 16px;font-size:14.5px;color:var(--ink-2);">${esc(p.bio)}</p>
              <div class="interest-tags">${(p.interests || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
              <div style="display:flex;gap:10px;margin-top:22px;">
                <button class="btn btn-ghost btn-sm" id="p-pass" style="flex:1;">Passer</button>
                <button class="btn btn-primary btn-sm" id="p-like" style="flex:2;">J'aime</button>
              </div>
              <div style="display:flex;gap:8px;margin-top:12px;">
                <button class="btn btn-sm" id="p-report" style="color:var(--ink-3);font-size:12.5px;flex:1;gap:6px;"><span style="width:14px;height:14px;display:inline-block;">${ICONS.flag}</span>Signaler</button>
                <button class="btn btn-sm" id="p-block" style="color:#dc2626;font-size:12.5px;flex:1;gap:6px;"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M5.6 5.6l12.8 12.8"/></svg>Bloquer</button>
              </div>
            </div>
          </div>
        </div>
      </div>`;

    $('#prof-close').addEventListener('click', closeModal);
    $('#prof-bg').addEventListener('click', (e) => { if (e.target.id === 'prof-bg') closeModal(); });
    $('#p-pass').addEventListener('click', () => { STATE.passes.push(p.id); toast('Profil passé.'); closeModal(); });
    $('#p-like').addEventListener('click', () => {
      const had = inboundProfiles().some((x) => x.id === p.id);
      STATE.likes.push(p.id);
      saveMe();
      closeModal();
      if (had) { if (STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id); saveMe(); showMatch(p); }
      else toast('Like envoyé à ' + p.name + '. La discussion s\'ouvrira si elle vous like aussi.');
      if (STATE.page === 'discover') refreshDeck();
    });
    $('#p-report').addEventListener('click', () => {
      closeModal();
      window.YamoModeration.openReport(p);
    });
    $('#p-block').addEventListener('click', () => {
      closeModal();
      window.YamoModeration.openBlock(p, () => go(STATE.page || 'discover'));
    });
  }

  /* ---------- Écran : Messages ---------- */
  function viewMessages(view) {
    const isSmall = window.innerWidth <= 860;
    // Règle : une conversation n'existe qu'en cas de match, ou après un message direct.
    const convs = (DEMO.CONVERSATIONS || []).filter((c) => isMatched(c.profileId) || c.direct);
    const wanted = convs.find((c) => c.id === STATE.activeConv);
    const active = wanted || convs[0];
    if (active && typeof STATE.chatOpenMobile !== 'boolean') STATE.chatOpenMobile = false;
    if (!convs.length) STATE.chatOpenMobile = false;
    const waiting = inboundProfiles().filter((p) => !isMatched(p.id) && !hasDirect(p.id));

    view.innerHTML = `
      <div class="chat-layout${STATE.chatOpenMobile ? ' open' : ''}" id="chat-layout">
        <div class="chat-list">
          <div class="chat-list-head">Conversations</div>
          ${waiting.length ? `<div class="chat-lock">
            <strong>&#128274; Pas encore de discussion</strong>
            <p>${esc(waiting.map((p) => p.name).join(', '))} ${waiting.length > 1 ? 'vous ont liké' : 'vous a liké'}. Ouvrez le profil, likez en retour : le match se crée et la discussion s'ouvre.</p>
            <button class="btn btn-primary btn-sm" id="go-likes">Voir qui m'a liké (${waiting.length})</button>
          </div>` : ''}
          ${convs.map((c) => {
            const p = byId(c.profileId);
            const last = c.messages[c.messages.length - 1] || {};
            return `<div class="conv${active && active.id === c.id ? ' active' : ''}" data-conv="${esc(c.id)}">
              <img src="${esc(p.photos[0])}" alt="" onerror="this.onerror=null;this.src=window.YAMO_FALLBACK('${esc(p.name)}',0)">
              <div class="c-body">
                <strong>${esc(p.name)}</strong>
                <p>${last.from === 'me' ? 'Vous : ' : ''}${esc(last.text || '')}</p>
              </div>
              <div class="c-meta">
                <small>${esc(last.at || '')}</small>
                ${c.unread ? `<span class="unread">${c.unread}</span>` : ''}
              </div>
            </div>`;
          }).join('')}
        </div>

        <div class="chat-panel">
          ${active ? `
            <div class="chat-head">
              <button class="btn btn-sm" id="chat-back" style="display:none;padding:6px;"><span style="width:18px;height:18px;display:grid;">${ICONS.back}</span></button>
              <img src="${esc(byId(active.profileId).photos[0])}" alt="">
              <div style="flex:1;">
                <strong>${esc(byId(active.profileId).name)}</strong>
                <small>En ligne</small>
              </div>
              <button class="btn btn-sm" id="chat-more" style="padding:8px;color:var(--ink-3);"><span style="width:18px;height:18px;display:grid;">${ICONS.settings}</span></button>
            </div>
            <div class="chat-body" id="chat-body">
              ${active.messages.map((m) => `<div class="msg ${m.from === 'me' ? 'me' : 'them'}">${esc(m.text)}<time>${esc(m.at)}</time></div>`).join('')}
            </div>
            <form class="chat-input" id="chat-form">
              <input type="text" id="chat-text" placeholder="Écrivez un message…" autocomplete="off">
              <button type="submit" aria-label="Envoyer">${ICONS.send}</button>
            </form>` : `
            <div style="flex:1;display:grid;place-items:center;color:var(--ink-3);font-size:14px;text-align:center;padding:30px;">
              <div>
                <div style="font-size:15px;font-weight:700;color:var(--ink-2);margin-bottom:6px;">Aucune discussion ouverte</div>
                <div style="font-size:13px;">Il faut un match (like réciproque) ou un message direct pour écrire à quelqu'un.</div>
              </div>
            </div>`}
        </div>
      </div>`;

    const gl = $('#go-likes');
    if (gl) gl.addEventListener('click', () => go('likes'));

    $$('[data-conv]', view).forEach((c) => c.addEventListener('click', () => {
      STATE.activeConv = c.getAttribute('data-conv');
      const conv = convs.find((x) => x.id === STATE.activeConv);
      STATE.chatOpenMobile = !!(conv && (conv.direct || isMatched(conv.profileId)));
      if (conv) conv.unread = 0;
      go('messages');
    }));

    const body = $('#chat-body');
    if (body) body.scrollTop = body.scrollHeight;

    const form = $('#chat-form');
    if (form) form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = $('#chat-text');
      const text = input.value.trim();
      if (!text || !active) return;

      const now = new Date();
      const at = String(now.getHours()).padStart(2, '0') + ':' + String(now.getMinutes()).padStart(2, '0');
      active.messages.push({ from: 'me', text, at });
      input.value = '';
      go('messages');

      // Réponse simulée en démo
      if (DEMO_MODE) {
        setTimeout(() => {
          active.messages.push({ from: 'them', text: ['C\'est gentil 😊', 'Ah super !', 'On en reparle ce soir ?', 'J\'aime bien cette idée'][Math.floor(Math.random() * 4)], at });
          if (location.hash === '#messages') go('messages');
        }, 1600 + Math.random() * 1200);
      }
    });

    const back = $('#chat-back');
    if (back) {
      back.style.display = window.innerWidth < 860 ? 'grid' : 'none';
      back.addEventListener('click', () => { STATE.chatOpenMobile = false; go('messages'); });
    }

    const more = $('#chat-more');
    if (more) more.addEventListener('click', () => {
      const who = { id: active.profileId, profile_id: active.profileId, name: (byId(active.profileId) || {}).name || 'cette personne', matchId: active.id };
      const root = $('#modal-root');
      root.innerHTML = `
        <div class="modal-bg" id="opt-bg">
          <div class="modal">
            <h3>Options</h3>
            <p>Que souhaitez-vous faire ?</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <button class="btn btn-ghost btn-block" id="opt-block">Bloquer cette personne</button>
              <button class="btn btn-ghost btn-block" id="opt-report">Signaler la conversation</button>
              <button class="btn btn-ghost btn-block" id="opt-cancel">Annuler</button>
            </div>
          </div>
        </div>`;
      $('#opt-cancel').addEventListener('click', closeModal);
      $('#opt-bg').addEventListener('click', (e) => { if (e.target.id === 'opt-bg') closeModal(); });
      $('#opt-block').addEventListener('click', () => {
        closeModal();
        window.YamoModeration.openBlock({ id: who.id, profile_id: who.id, name: who.name, matchId: who.id }, () => {
          STATE.activeConv = null;
          go('messages');
        });
      });
      $('#opt-report').addEventListener('click', () => {
        closeModal();
        window.YamoModeration.openReport({ id: who.id, profile_id: who.id, name: who.name, matchId: who.id });
      });
    });
  }

  /* ---------- Écran : Communautés ---------- */
  function viewCommunities(view) {
    const list = DEMO.COMMUNITIES || [];
    view.innerHTML = `
      <div style="display:flex;justify-content:space-between;align-items:center;gap:14px;flex-wrap:wrap;margin-bottom:22px;">
        <div class="likes-tabs" style="margin:0;">
          <button class="chip active">Toutes</button>
          <button class="chip">Mes groupes</button>
        </div>
        <button class="btn btn-primary btn-sm" id="new-comm">${ICONS.plus} Créer un groupe</button>
      </div>
      <div class="comm-grid">
        ${list.map((c) => `
          <div class="comm">
            <div class="cover" style="background-image:url('${esc(c.cover)}');"></div>
            <div class="c-in">
              <h4>${esc(c.name)}</h4>
              <p>${esc(c.description)}</p>
              <div class="c-foot">
                <small>${new Intl.NumberFormat('fr-FR').format(c.members)} membres</small>
                <button class="btn btn-ghost btn-sm" data-join="${esc(c.id)}">Rejoindre</button>
              </div>
            </div>
          </div>`).join('')}
      </div>`;

    $$('[data-join]', view).forEach((b) => b.addEventListener('click', () => {
      b.textContent = 'Membre ✓';
      b.classList.remove('btn-ghost');
      b.classList.add('btn-primary');
      toast('Vous avez rejoint le groupe.');
    }));

    const crear = $('#new-comm');
    if (crear) crear.addEventListener('click', () => {
      const root = $('#modal-root');
      root.innerHTML = `
        <div class="modal-bg" id="nc-bg">
          <div class="modal">
            <h3>Créer un groupe</h3>
            <p>La création de communautés est réservée aux abonnés 6 et 12 mois.</p>
            <div class="field"><label>Nom du groupe</label><input type="text" placeholder="Ex. : Sorties à Abidjan"></div>
            <div class="field"><label>Description</label><textarea placeholder="De quoi parle ce groupe ?"></textarea></div>
            <button class="btn btn-primary btn-block" id="nc-ok">Créer</button>
            <button class="btn btn-block" id="nc-cancel" style="color:var(--ink-3);margin-top:8px;">Annuler</button>
          </div>
        </div>`;
      $('#nc-cancel').addEventListener('click', closeModal);
      $('#nc-bg').addEventListener('click', (e) => { if (e.target.id === 'nc-bg') closeModal(); });
      $('#nc-ok').addEventListener('click', () => { closeModal(); toast('Groupe créé (démo).'); });
    });
  }

  /* ---------- Écran : Notifications ---------- */
  function viewNotifications(view) {
    const base = [
      { icon: 'heart', color: '#E88D91', bg: '#FDF1F1', title: 'Nouveau like', text: 'Awa et 2 autres personnes ont aimé votre profil.', time: 'Il y a 12 min' },
      { icon: 'msg', color: '#0ea5e9', bg: '#e0f2fe', title: 'Nouveau message', text: 'Grâce vous a envoyé un message.', time: 'Il y a 1 h' },
      { icon: 'star', color: '#f59e0b', bg: '#fffbeb', title: 'Super Like reçu', text: 'Quelqu\'un vous a envoyé un Super Like !', time: 'Il y a 3 h' },
      { icon: 'shield', color: '#16a34a', bg: '#ecfdf5', title: 'Profil vérifié', text: 'Votre vérification d\'identité a été validée.', time: 'Hier' },
      { icon: 'crown', color: '#7c3aed', bg: '#f3e8ff', title: 'Bienvenue en Premium', text: '7 jours d\'essai gratuit ont démarré.', time: 'Il y a 2 jours' },
    ];
    const live = notifs().map((n) => {
      const d = new Date(n.at || Date.now());
      const mm = Math.round((Date.now() - d.getTime()) / 60000);
      const when = mm < 1 ? 'À l\'instant' : mm < 60 ? 'Il y a ' + mm + ' min' : 'Il y a ' + Math.round(mm / 60) + ' h';
      return { icon: n.icon || 'sparkle', color: '#E88D91', bg: '#FDF1F1', title: n.title, text: n.text, time: when, unread: !n.read };
    });
    const items = live.concat(base);
    view.innerHTML = `
      <div style="max-width:720px;">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px;">
          <span style="font-size:13.5px;color:var(--ink-3);font-weight:600;">${items.filter((i) => i.unread).length || 0} notification(s) non lue(s)</span>
          <div style="display:flex;gap:8px;">
            <button class="btn btn-sm" id="test-notif" style="color:var(--ink-3);font-weight:700;">Tester une alerte</button>
            <button class="btn btn-sm" id="read-all" style="color:var(--yamo);font-weight:700;">Tout marquer comme lu</button>
          </div>
        </div>
        <div class="side-panel" style="padding:6px 22px;">
          ${items.map((n) => `
            <div class="notif">
              <div class="n-ic" style="background:${n.bg};color:${n.color};">${ICONS[n.icon]}</div>
              <div class="n-body">
                <strong>${esc(n.title)}</strong>
                <p>${esc(n.text)}</p>
                <small>${esc(n.time)}</small>
              </div>
            </div>`).join('')}
        </div>
      </div>`;

    // marque les notifications récentes comme lues à l'ouverture
    const opened = notifs(); if (opened.length) { opened.forEach((n) => { n.read = true; }); try { localStorage.setItem(NOTIF_KEY, JSON.stringify(opened)); } catch (err) {} }

    const tn = $('#test-notif');
    if (tn) tn.addEventListener('click', () => simulateNewcomer());

    $('#read-all').addEventListener('click', (e) => {
      e.currentTarget.style.display = 'none';
      toast('Toutes les notifications sont marquées comme lues.');
    });
  }

  /* ---------- Vérification d'identité ----------
     Demande : photo de la pièce d'identité + selfie. Le dossier est
     enregistré, puis le badge « Vérifié » apparaît sur le profil.
     Dans cette version l'examen du dossier est simulé (aucun agent humain). */
  function openVerification() {
    const me = STATE.myProfile;
    const root = $('#modal-root');
    const pending = !!(me.verification && me.verification.status === 'pending');
    const sent = (me.verification && me.verification.idPhoto) ? '1' : '';
    const sentSelfie = (me.verification && me.verification.selfie) ? '1' : '';
    root.innerHTML = `
      <div class="modal-bg" id="kyc-bg">
        <div class="modal" style="max-width:470px;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span style="width:24px;height:24px;display:inline-block;color:var(--yamo);">${ICONS.shield}</span>
            <h3 style="margin:0;">Vérification d'identité</h3>
          </div>
          <p style="font-size:13.5px;color:var(--ink-2);margin:0 0 16px;">
            Deux étapes, moins de 2 minutes. Vos documents restent privés : personne ne les voit sur Yamo,
            ils servent uniquement à confirmer que vous êtes bien la personne de la photo.
          </p>

          <div class="kyc-step" id="kyc-1">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:13.5px;">1. Pièce d'identité</strong>
              <button class="btn btn-sm" data-kyc="id">${sent ? 'Changer la photo' : 'Prendre / choisir'}</button>
            </div>
            <div id="kyc-id-prev" style="margin-top:10px;font-size:12.5px;color:${sent ? '#059669' : 'var(--ink-3)'};">
              ${sent ? '&#10003; Photo de la pièce reçue' : 'Carte nationale, passeport ou permis. Les 4 coins visibles.'}
            </div>
            <input type="file" accept="image/*" id="kyc-id-file" style="display:none;">
          </div>

          <div class="kyc-step" id="kyc-2" style="margin-top:14px;">
            <div style="display:flex;justify-content:space-between;align-items:center;">
              <strong style="font-size:13.5px;">2. Selfie avec la pièce</strong>
              <button class="btn btn-sm" data-kyc="selfie">${sentSelfie ? 'Refaire' : 'Prendre / choisir'}</button>
            </div>
            <div id="kyc-selfie-prev" style="margin-top:10px;font-size:12.5px;color:${sentSelfie ? '#059669' : 'var(--ink-3)'};">
              ${sentSelfie ? '&#10003; Selfie reçu' : 'Visage bien éclairé, sans lunettes de soleil ni casquette.'}
            </div>
            <input type="file" accept="image/*" capture="user" id="kyc-selfie-file" style="display:none;">
          </div>

          <div style="background:var(--bg-2);border-radius:12px;padding:12px 14px;margin-top:16px;font-size:12.5px;color:var(--ink-2);">
            ${ICONS.lock || ''} Le badge « Vérifié » apparaîtra sur votre profil. Vous pouvez demander la suppression de ces documents à tout moment.
          </div>

          <button class="btn btn-primary btn-block" id="kyc-submit" style="margin-top:16px;">Envoyer mon dossier</button>
          <button class="btn btn-block" id="kyc-cancel" style="color:var(--ink-3);margin-top:8px;">Plus tard</button>
        </div>
      </div>`;

    const close = () => closeModal();
    $('#kyc-cancel').addEventListener('click', close);
    $('#kyc-bg').addEventListener('click', (e) => { if (e.target.id === 'kyc-bg') close(); });

    const pick = (key, inputId, prevId) => {
      $('[data-kyc="' + key + '"]').addEventListener('click', () => $(inputId).click());
      $(inputId).addEventListener('change', (ev) => {
        const f = ev.target.files && ev.target.files[0];
        if (!f) return;
        if (f.size > 5 * 1024 * 1024) { toast('Photo trop lourde (5 Mo maximum).'); return; }
        if (!/^image\//.test(f.type || '')) { toast('Choisissez une image (photo).'); return; }
        me.verification = Object.assign({}, me.verification || {});
        me.verification[key === 'id' ? 'idPhoto' : 'selfie'] = true;
        me.verification[key === 'id' ? 'idName' : 'selfieName'] = String(f.name || '').slice(0, 60);
        saveMe();
        $(prevId).innerHTML = '&#10003; ' + (key === 'id' ? 'Photo de la pièce reçue' : 'Selfie reçu');
        $(prevId).style.color = '#059669';
        toast('Photo reçue.');
      });
    };
    pick('id', '#kyc-id-file', '#kyc-id-prev');
    pick('selfie', '#kyc-selfie-file', '#kyc-selfie-prev');

    $('#kyc-submit').addEventListener('click', () => {
      const v = me.verification || {};
      if (!v.idPhoto) { toast('Ajoutez d\'abord la photo de votre pièce d\'identité.'); return; }
      if (!v.selfie) { toast('Ajoutez ensuite le selfie avec votre pièce.'); return; }
      const btn = $('#kyc-submit');
      btn.disabled = true; btn.textContent = 'Envoi du dossier…';
      setTimeout(() => {
        btn.textContent = 'Vérification en cours…';
        setTimeout(() => {
          me.verification = { status: 'verified', at: new Date().toISOString(), idPhoto: true, selfie: true };
          me.is_verified = true;
          saveMe();
          close();
          toast('Profil vérifié : votre badge est maintenant visible.');
          renderMeMini();
          if (STATE.page === 'profile') go('profile');
          if (STATE.page === 'discover') refreshDeck();
          else if (!STATE.page) go('profile');
        }, 1400);
      }, 700);
    });
  }

  /* ---------- Écran : Profil ---------- */
  function saveMe() {
    try {
      localStorage.setItem('yamo_me_v1', JSON.stringify({
        is_premium: STATE.myProfile.is_premium,
        invisible: STATE.myProfile.invisible,
        extraBalance: STATE.extraBalance,
        premium_plan: STATE.myProfile.premium_plan || null,
        premium_until: STATE.myProfile.premium_until || null,
        expired_plan: STATE.myProfile.expired_plan || null,
        photo: STATE.myProfile.photos[0] || null,
        photos: (STATE.myProfile.photos || []).slice(0, 6),
        name: STATE.myProfile.name || 'Vous',
        age: STATE.myProfile.age || 27,
        city: STATE.myProfile.city || '',
        country: STATE.myProfile.country || 'Côte d’Ivoire',
        country_code: STATE.myProfile.country_code || 'CI',
        bio: STATE.myProfile.bio || '',
        relationship_goal: STATE.myProfile.relationship_goal || 'SERIOUS',
        trial_used: !!STATE.myProfile.trial_used,
        trial_ends: STATE.myProfile.trial_ends || null,
        gender: STATE.myProfile.gender,
        repliesSent: STATE.repliesSent || 0,
        matches: STATE.matches || [],
        myLikes: STATE.likes || [],
        myPasses: STATE.passes || [],
        boosted: STATE.boosted || [],
        my_boost_until: STATE.myProfile.boost_until || null,
        is_verified: !!STATE.myProfile.is_verified,
        verification: STATE.myProfile.verification || null,
        phone: STATE.myProfile.phone || '',
        email: STATE.myProfile.email || '',
      }));
    } catch (e) {}
  }
  function loadMe() {
    try {
      const raw = localStorage.getItem('yamo_me_v1');
      if (!raw) return;
      const d = JSON.parse(raw);
      if (d && d.is_premium) {
        const finie = d.premium_until && new Date(d.premium_until).getTime() < Date.now();
        if (finie) {
          // Abonnement arrivé à échéance : le compte reste, l'abonnement s'arrête.
          STATE.myProfile.is_premium = false;
          STATE.myProfile.premium_plan = d.premium_plan || null;
          STATE.myProfile.premium_until = d.premium_until || null;
          STATE.myProfile.expired_plan = d.premium_plan || null;
          STATE.myProfile.invisible = false;
          if (d.extraBalance) STATE.extraBalance = Object.assign(STATE.extraBalance, d.extraBalance);
          if (d.gender) STATE.myProfile.gender = String(d.gender).toUpperCase();
          else if (d.name) {
            const nm0 = String(d.name).toLowerCase();
            const F0 = ['awa','fatou','aminata','adja','mariam','grace','sarah','aicha','kadi','nadia','sylvie'];
            if (F0.indexOf(nm0) !== -1) STATE.myProfile.gender = 'FEMALE';
          }
          return;
        }
        STATE.myProfile.is_premium = true;
        STATE.myProfile.invisible = !!d.invisible;
        STATE.myProfile.premium_plan = d.premium_plan || null;

        STATE.myProfile.premium_until = d.premium_until || null;
      }
      if (d && Array.isArray(d.photos) && d.photos.length) {
        STATE.myProfile.photos = d.photos.filter(function (x) { return typeof x === 'string' && x; }).slice(0, 6);
        if (!STATE.myProfile.photos.length) STATE.myProfile.photos = [''];
      } else if (d && d.photo) STATE.myProfile.photos[0] = d.photo;
      if (d && d.name) STATE.myProfile.name = d.name;
      if (d && d.age) STATE.myProfile.age = Number(d.age) || STATE.myProfile.age;
      if (d && typeof d.city === 'string' && d.city) STATE.myProfile.city = d.city;
      if (d && typeof d.country === 'string' && d.country) STATE.myProfile.country = d.country;
      if (d && typeof d.country_code === 'string' && d.country_code) STATE.myProfile.country_code = d.country_code;
      if (d && typeof d.bio === 'string') STATE.myProfile.bio = d.bio;
      if (d && d.relationship_goal) STATE.myProfile.relationship_goal = d.relationship_goal;
      if (d && d.phone) STATE.myProfile.phone = d.phone;
      if (d && d.email) STATE.myProfile.email = d.email;
      /* Genre non précisé (ou saisie libre) : le prénom permet de le déduire */
      if (d && d.gender) {
        STATE.myProfile.gender = String(d.gender).toUpperCase();
      } else if (!d || !d.gender) {
        const nm = ((STATE.myProfile && STATE.myProfile.name) || '').toLowerCase();
        const F = ['awa','fatou','aminata','adja','mariam','grace','sarah','aicha','kadi','nadia','yao','sylvie'];
        if (F.indexOf(nm) !== -1) STATE.myProfile.gender = 'FEMALE';
      }
      if (d && d.trial_used) { STATE.myProfile.trial_used = true; STATE.myProfile.trial_ends = d.trial_ends || null; }
      if (d && d.extraBalance) STATE.extraBalance = Object.assign(STATE.extraBalance, d.extraBalance);
      if (d && d.repliesSent) STATE.repliesSent = d.repliesSent;
      if (d && Array.isArray(d.matches)) STATE.matches = d.matches;
      if (d && Array.isArray(d.myLikes)) STATE.likes = d.myLikes;
      if (d && Array.isArray(d.myPasses)) STATE.passes = d.myPasses;
      if (d && Array.isArray(d.boosted)) STATE.boosted = d.boosted;
      if (d && d.my_boost_until) STATE.myProfile.boost_until = d.my_boost_until;
      if (d) {
        STATE.myProfile.is_verified = !!d.is_verified;
        STATE.myProfile.verification = d.verification || null;
      }
    } catch (e) {}
  }

  function viewProfile(view) {
    const me = STATE.myProfile;
    view.innerHTML = `
      <div class="profile-layout">
        <div>
          <div class="profile-card">
            <div class="pimg" style="background-image:url('${esc(me.photos[0])}');">
              <button class="edit" id="change-photo">${ICONS.camera} Changer</button>
            </div>
            <div class="profile-body">
              <h3>${esc(me.name)}, ${me.age} ${me.is_verified ? `<span style="width:17px;height:17px;display:inline-block;" title="Profil vérifié">${ICONS.verified}</span><span style="background:#f0fdf4;border:1px solid #bbf7d0;color:#059669;border-radius:999px;padding:3px 9px;font-size:11px;font-weight:800;vertical-align:middle;margin-left:4px;">Vérifié</span>` : ''} ${me.is_premium ? '<span style="background:#fffbeb;border-radius:999px;padding:4px 10px;font-size:11px;font-weight:800;color:#b45309;vertical-align:middle;">Premium</span>' : ''}</h3>
              ${me.is_premium ? `<div style="font-size:12.5px;color:#b45309;font-weight:700;margin:6px 0 0;">Abonnement actif${me.premium_until ? ' jusqu\'au ' + new Date(me.premium_until).toLocaleDateString('fr') : ''}</div>` : ''}
              <div class="loc">${ICONS.pin} ${esc(me.city)}, ${esc(me.country)}</div>
              <p class="bio">${esc(me.bio)}</p>
              <div class="interest-tags">${(me.interests || []).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
            </div>
          </div>

          <div class="form-card" style="margin-top:20px;" id="photos-card">
            <h3>Mes photos</h3>
            <p>Ajoutez jusqu'à 6 photos. La première est votre photo principale, celle que l'on voit en premier.</p>
            <div class="ph-grid" id="ph-grid">
              ${(function () {
                const arr = (me.photos || []).filter(Boolean).slice(0, 6);
                let out = '';
                for (let i = 0; i < 6; i++) {
                  const src = arr[i];
                  if (src) {
                    out += '<div class="ph-slot filled" data-slot="' + i + '">' +
                      '<img src="' + esc(src) + '" alt="Photo ' + (i + 1) + '">' +
                      (i === 0 ? '<span class="ph-main">Principale</span>' : '<button class="ph-set" data-set="' + i + '" title="Choisir comme photo principale">' + (ICONS.check || '') + '</button>') +
                      '<button class="ph-del" data-del="' + i + '" title="Retirer cette photo">×</button>' +
                    '</div>';
                  } else {
                    out += '<div class="ph-slot empty" data-slot="' + i + '">' +
                      '<button class="ph-add" data-add="' + i + '">' + (ICONS.camera || '+') + '<span>Ajouter</span></button>' +
                    '</div>';
                  }
                }
                return out;
              })()}
            </div>
            <div class="ph-count">${((me.photos || []).filter(Boolean).length)} photo(s) sur 6</div>
          </div>

          <div class="form-card" style="margin-top:20px;">
            <h3>Vérification d'identité</h3>
            <p>Un badge rassure les autres et multiplie vos chances de match.</p>
            ${me.is_verified ? `
            <div class="kyc-box ok">
              <div class="ic" style="color:#059669;width:22px;">${ICONS.verified}</div>
              <div>
                <strong>Profil vérifié</strong>
                <p>Votre badge de vérification est visible sur votre profil et auprès des personnes qui vous découvrent.</p>
              </div>
            </div>
            <div style="font-size:12.5px;color:var(--ink-3);margin-top:10px;">Pièce vérifiée le ${me.verification && me.verification.at ? new Date(me.verification.at).toLocaleDateString('fr') : '—'}. Vos documents ne sont jamais montrés aux autres membres.</div>`
            : (me.verification && me.verification.status === 'pending' ? `
            <div class="kyc-box pending">
              <div class="ic" style="color:#b45309;width:22px;">${ICONS.shield}</div>
              <div>
                <strong>Vérification en cours</strong>
                <p>Vos documents ont bien été reçus. Résultat sous 24 h. Vous pouvez les remplacer si besoin.</p>
              </div>
            </div>
            <button class="btn btn-block btn-sm" style="margin-top:16px;" id="kyc-start">Remplacer mes documents</button>`
            : `
            <div class="kyc-box pending">
              <div class="ic" style="color:#b45309;width:22px;">${ICONS.shield}</div>
              <div>
                <strong>Non vérifié</strong>
                <p>Envoyez une photo de votre pièce d'identité et un selfie. La vérification prend moins de 24 h.</p>
              </div>
            </div>
            <button class="btn btn-primary btn-block btn-sm" style="margin-top:16px;" id="kyc-start">Lancer la vérification</button>`)}
          </div>
        </div>

        <div style="display:flex;flex-direction:column;gap:20px;">
          <div class="form-card">
            <h3>Modifier mes informations</h3>
            <p>Ce que les autres voient sur votre profil.</p>
            <form id="prof-form">
              <div class="field"><label>Prénom</label><input type="text" name="name" value="${esc(me.name)}"></div>
              <div class="field"><label>Âge</label><input type="number" name="age" min="18" max="100" value="${me.age}"></div>
              <div class="field">
                <label>Pays</label>
                <select name="country" id="prof-country">
                  ${(window.YAMO_COUNTRIES ? window.YAMO_COUNTRIES.options(me.country_code || 'CI', false) : '<option value="CI">Côte d’Ivoire</option>')}
                </select>
              </div>
              <div class="field">
                <label>Ville</label>
                <select name="city" id="prof-city" style="display:${window.YAMO_COUNTRIES && window.YAMO_COUNTRIES.cities(me.country_code || 'CI').length ? 'block' : 'none'}">
                  ${(window.YAMO_COUNTRIES ? window.YAMO_COUNTRIES.cityOptions(me.country_code || 'CI', me.city) : '')}
                  ${(window.YAMO_COUNTRIES && !window.YAMO_COUNTRIES.cities(me.country_code || 'CI').length ? '<option value="">Saisissez votre ville</option>' : '')}
                </select>
                <input type="text" id="prof-city-free" placeholder="Saisissez votre ville" value="${esc(me.city)}" style="display:${window.YAMO_COUNTRIES && window.YAMO_COUNTRIES.cities(me.country_code || 'CI').length ? 'none' : 'block'}">
              </div>
              <div class="field"><label>À propos de moi</label><textarea name="bio">${esc(me.bio)}</textarea></div>
              <div class="field">
                <label>Je cherche</label>
                <select name="goal">
                  <option value="SERIOUS"${me.relationship_goal === 'SERIOUS' ? ' selected' : ''}>Une relation sérieuse</option>
                  <option value="FRIENDS">De nouveaux amis</option>
                  <option value="CASUAL">À voir</option>
                </select>
              </div>
              <button class="btn btn-primary btn-block" type="submit">Enregistrer</button>
            </form>
          </div>

          <div class="form-card">
            <h3>Confidentialité</h3>
            <p>Gardez le contrôle de votre compte.</p>
            <div style="display:flex;flex-direction:column;gap:10px;">
              <div class="switch-row">
                <div class="switch-txt">
                  <strong>Mode invisible</strong>
                  <small>Votre profil n'apparaît plus dans les découvertes.</small>
                </div>
                <button class="switch${me.invisible ? ' on' : ''}" id="hide-mode" role="switch" aria-checked="${me.invisible ? 'true' : 'false'}" aria-label="Activer le mode invisible"><span></span></button>
              </div>
              ${me.invisible ? '<p class="switch-note">Mode invisible actif : vous pouvez continuer à liker et à discuter, mais vous n\'êtes plus suggéré à personne.</p>' : ''}
              <button class="btn btn-ghost btn-block btn-sm" style="justify-content:space-between;" id="export">Exporter mes données <span style="width:15px;height:15px;display:grid;">${ICONS.arrow}</span></button>
              <button class="btn btn-ghost btn-block btn-sm" style="justify-content:space-between;color:#dc2626;border-color:#fecaca;" id="delete-acc">Supprimer mon compte</button>
            </div>
          </div>
        </div>
      </div>`;

    $('#prof-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const f = e.target;
      STATE.myProfile.name = f.name.value.trim() || me.name;
      STATE.myProfile.age = Number(f.age.value) || me.age;
      const COx = window.YAMO_COUNTRIES;
      const cc = (COx && $('#prof-country')) ? $('#prof-country').value : (me.country_code || 'CI');
      const listCities = COx ? COx.cities(cc) : [];
      let cityVal = '';
      if (listCities.length) cityVal = $('#prof-city') ? $('#prof-city').value : '';
      else cityVal = $('#prof-city-free') ? ($('#prof-city-free').value || '').trim() : '';
      if (cc === (me.country_code || 'CI') && !cityVal) cityVal = me.city;
      STATE.myProfile.country_code = cc;
      STATE.myProfile.country = COx ? COx.name(cc) : me.country;
      STATE.myProfile.city = cityVal || me.city;
      saveMe();
      STATE.myProfile.bio = f.bio.value.trim();
      STATE.myProfile.relationship_goal = f.goal.value;
      renderMeMini();
      $('#page-title').textContent = 'Mon profil';
      toast('Profil mis à jour.');
      go('profile');
    });

    /* --- Galerie : jusqu'a 6 photos --- */
    (function () {
      const MAXP = 6;
      const maxSize = 1024 * 1024; /* 1 Mo par photo : 6 photos tiennent dans le navigateur */

      function currentPhotos() {
        return (STATE.myProfile.photos || []).filter(Boolean).slice(0, MAXP);
      }
      function setPhotos(arr) {
        const clean = (arr || []).filter(Boolean).slice(0, MAXP);
        STATE.myProfile.photos = clean.length ? clean : [''];
        saveMe();
      }

      function pickPhoto(cb) {
        const inp = document.createElement('input');
        inp.type = 'file';
        inp.accept = 'image/*';
        /* L'élément reste dans la page (caché) : sur iPhone et Android,
           un champ de fichier détaché du document ne s'ouvre pas toujours. */
        inp.style.position = 'fixed';
        inp.style.left = '-9999px';
        inp.style.width = '1px';
        inp.style.height = '1px';
        inp.style.opacity = '0';
        inp.setAttribute('aria-hidden', 'true');
        document.body.appendChild(inp);
        inp.addEventListener('change', () => {
          const f = inp.files && inp.files[0];
          setTimeout(() => { try { inp.remove(); } catch (e) {} }, 500);
          if (!f) return;
          if (!/^image\//.test(f.type || '')) { toast('Choisissez une image (photo).'); return; }
          if (f.size > maxSize) { toast('Photo trop lourde (1 Mo maximum). Prenez une photo plus légère.'); return; }
          const r = new FileReader();
          r.onload = () => {
            const url = String(r.result || '');
            if (url.length > 700000) { toast('Cette photo est trop détaillée. Essayez-en une autre.'); return; }
            cb(url);
          };
          r.readAsDataURL(f);
        });
        inp.click();
      }

      function refreshPhotos() {
        renderMeMini();
        go('profile');
      }

      $$('#photos-card [data-add]').forEach((b) => b.addEventListener('click', () => {
        if (currentPhotos().length >= MAXP) { toast('Vous avez atteint 6 photos. Retirez-en une pour en ajouter une autre.'); return; }
        pickPhoto((url) => {
          const arr = currentPhotos();
          if (arr.length >= MAXP) { toast('Vous avez atteint 6 photos.'); return; }
          arr.push(url);
          setPhotos(arr);
          toast('Photo ajoutée (' + arr.length + ' sur 6).');
          refreshPhotos();
        });
      }));

      $$('#photos-card [data-del]').forEach((b) => b.addEventListener('click', () => {
        const i = Number(b.getAttribute('data-del'));
        const arr = currentPhotos();
        if (arr.length <= 1) { toast('Gardez au moins une photo : c\'est votre photo principale.'); return; }
        arr.splice(i, 1);
        setPhotos(arr);
        toast('Photo retirée. Il vous reste ' + arr.length + ' photo(s).');
        refreshPhotos();
      }));

      $$('#photos-card [data-set]').forEach((b) => b.addEventListener('click', () => {
        const i = Number(b.getAttribute('data-set'));
        const arr = currentPhotos();
        if (i <= 0 || i >= arr.length) return;
        const chosen = arr.splice(i, 1)[0];
        arr.unshift(chosen);
        setPhotos(arr);
        toast('Photo principale changée.');
        refreshPhotos();
      }));

      /* Le bouton "Changer" de la grande photo remplace la photo principale */
      const mainBtn = $('#change-photo');
      if (mainBtn) {
        mainBtn.addEventListener('click', () => {
          pickPhoto((url) => {
            const arr = currentPhotos();
            if (!arr.length) arr.push(url); else arr[0] = url;
            setPhotos(arr);
            toast('Photo principale mise à jour.');
            refreshPhotos();
          });
        });
      }
    })();

    /* --- Choix du pays : la liste des villes suit --- */
    const pc = $('#prof-country');
    if (pc) pc.addEventListener('change', () => {
      const COy = window.YAMO_COUNTRIES;
      const list = COy ? COy.cities(pc.value) : [];
      const cs = $('#prof-city');
      const fr = $('#prof-city-free');
      if (list.length) {
        cs.innerHTML = COy.cityOptions(pc.value, '');
        cs.style.display = '';
        if (fr) fr.style.display = 'none';
      } else {
        cs.style.display = 'none';
        if (fr) { fr.style.display = ''; fr.value = ''; fr.focus(); }
      }
    });

    const kycBtn = $('#kyc-start');
    if (kycBtn) kycBtn.addEventListener('click', () => openVerification());
    $('#hide-mode').addEventListener('click', () => {
      const btn = $('#hide-mode');
      const turnOn = !btn.classList.contains('on');

      if (turnOn && !myFeatures().invisible) {
        const root = $('#modal-root');
        root.innerHTML = `
          <div class="modal-bg" id="inv-bg">
            <div class="modal">
              <div class="crown-ic">
                <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"><path d="M3 7l4 5 5-7 5 7 4-5v10a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7z"/></svg>
              </div>
              <h3>Le mode invisible est réservé aux formules 6 et 12 mois</h3>
              <p>Naviguez sans laisser de traces : personne ne vous voit dans les découvertes, mais vous continuez à voir tout le monde.</p>
              <ul class="perk-list">
                <li>Votre profil masqué des découvertes</li>
                <li>Voyez qui vous a liké</li>
                <li>5 Super Likes par semaine</li>
                <li>Badge Premium sur votre profil</li>
              </ul>
              <div style="display:flex;flex-direction:column;gap:9px;margin-top:6px;">
                <button class="btn btn-primary btn-block" id="inv-go">Découvrir les offres</button>
                <button class="btn btn-ghost btn-block" id="inv-no">Plus tard</button>
              </div>
            </div>
          </div>`;
        $('#inv-no').addEventListener('click', closeModal);
        $('#inv-bg').addEventListener('click', (e) => { if (e.target.id === 'inv-bg') closeModal(); });
        $('#inv-go').addEventListener('click', () => { closeModal(); go('premium'); });
        return;
      }

      STATE.myProfile.invisible = turnOn;
      saveMe();
      renderMeMini();
      toast(turnOn
        ? 'Mode invisible activé. Personne ne vous voit plus dans les découvertes.'
        : 'Mode invisible désactivé. Votre profil est de nouveau visible.');
      go('profile');
    });
    $('#export').addEventListener('click', () => toast('Vos données seront envoyées par e-mail sous 48 h.'));
    $('#delete-acc').addEventListener('click', () => {
      const root = $('#modal-root');
      root.innerHTML = `
        <div class="modal-bg" id="del-bg">
          <div class="modal">
            <h3>Supprimer mon compte</h3>
            <p>Cette action est définitive : votre profil, vos photos et vos conversations seront effacés.</p>
            <button class="btn btn-block" style="background:#dc2626;color:#fff;" id="del-yes">Oui, supprimer définitivement</button>
            <button class="btn btn-ghost btn-block" style="margin-top:10px;" id="del-no">Non, je reste</button>
          </div>
        </div>`;
      $('#del-no').addEventListener('click', closeModal);
      $('#del-bg').addEventListener('click', (e) => { if (e.target.id === 'del-bg') closeModal(); });
      $('#del-yes').addEventListener('click', () => { closeModal(); toast('Demande de suppression enregistrée (démo).'); });
    });
  }

  /* ---------- Écran : Abonnements ---------- */
  function viewPremium(view) {
    const me = STATE.myProfile;
    const wp = DEMO.WOMEN_SUBSCRIPTION || {};
    const cd = boostCountdown(me);
    view.innerHTML = `
      <div style="max-width:1000px;">
        <div style="background:linear-gradient(135deg,#1a1b24,#43201f);color:#fff;border-radius:24px;padding:38px 34px;margin-bottom:32px;position:relative;overflow:hidden;">
          <div style="position:relative;z-index:2;">
            <span style="display:inline-flex;align-items:center;gap:7px;background:rgba(255,107,107,.22);color:#ffb4b1;padding:6px 14px;border-radius:999px;font-size:12px;font-weight:800;margin-bottom:16px;">${ICONS.crown} Yamo Premium</span>
            <h2 style="font-size:30px;font-weight:800;letter-spacing:-1px;margin:0 0 10px;">Plus de visibilité, plus de rencontres</h2>
            <p style="color:rgba(255,255,255,.72);font-size:15px;margin:0;max-width:520px;">Voyez qui vous a liké, passez en mode invisible, envoyez plus de Super Likes et apparaissez en tête des suggestions.</p>
          </div>
        </div>

        <div id="trial-box" style="margin:0 0 26px;padding:20px 22px;border:1.5px dashed var(--yamo);background:var(--yamo-soft);border-radius:16px;">
          ${me.trial_used
            ? `<div style="display:flex;align-items:center;gap:10px;font-size:14px;font-weight:700;color:var(--ink-2);">${ICONS.check || ''} Votre essai gratuit de ${DEMO.TRIAL_DAYS} jours a déjà été utilisé.</div>`
            : `<strong style="display:block;font-size:16px;margin-bottom:6px;">${DEMO.TRIAL_DAYS} jours d'essai gratuit</strong>
               <p style="margin:0 0 14px;font-size:13.5px;color:var(--ink-2);">Testez toutes les options Premium sans payer. Aucun prélèvement, aucun engagement : l'essai s'arrête tout seul au bout de ${DEMO.TRIAL_DAYS} jours.</p>
               <button class="btn btn-primary btn-sm" id="start-trial">Démarrer mon essai gratuit</button>`}
        </div>

        ${isFemale() ? `
        ${womenPlanExpired() ? `<div style="margin:0 0 20px;padding:16px 18px;border-radius:14px;background:#fff7ed;border:1.5px solid #fdba74;font-size:13.5px;color:#9a3412;font-weight:600;">Votre abonnement est arrivé à échéance le ${new Date(me.premium_until).toLocaleDateString('fr')}. Renouvelez pour retrouver vos options.</div>` : ''}
        <div class="women-box">
          <div class="wb-head">
            <span class="wb-tag">${ICONS.heart || ''} Formule Femmes</span>
            <h3>Un seul abonnement de ${fcfa(wp.price)} par mois</h3>
            <div class="wb-price">${fcfa(wp.price)} <small>/ mois</small></div>
            <p>Pas de choix compliqué, pas de paliers : la même formule pour toutes les femmes.</p>
          </div>
          <ul>${(wp.perks || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          <div class="wb-extra">
            <strong>Payable à l'unité, quand vous en avez besoin</strong>
            <ul>${(wp.notIncluded || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>
          <button class="btn btn-primary btn-block" data-buy="${esc(wp.id)}" ${hasWomenPlan() ? 'disabled' : ''}>${hasWomenPlan() ? 'Abonnement actif' : (womenPlanExpired() ? 'Me réabonner — ' + fcfa(wp.price) : 'S’abonner — ' + fcfa(wp.price) + ' / mois')}</button>
          ${hasWomenPlan() ? `<div class="wb-ok">${ICONS.check || ''} Actif jusqu’au ${womenUntilLabel()} · renouvellement mensuel</div>` : ''}
        </div>` : `
        <div class="pricing-grid">
          ${(DEMO.PLANS || []).map((p) => {
            const best = p.id === 'BIANNUAL';
            const active = me.is_premium && me.premium_plan === p.id;
            return `<div class="plan${best ? ' best' : ''}${active ? ' current' : ''}">
              ${best ? '<span class="tag">Le plus choisi</span>' : ''}
              <span class="plan-level">${esc((p.features || {}).label || '')}</span>
              <h4>${esc(p.label)}</h4>
              <div class="price">${fcfa(p.price)}</div>
              <div class="per">soit ${fcfa(Math.round(p.price / (p.days / 30)))} / mois</div>
              <div class="per" style="font-size:11.5px;color:var(--ink-3);">${p.days} jours · ${fcfa(Math.round(p.price / p.days))} par jour</div>
              <ul>${(p.perks || []).map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
              <button class="btn ${best ? 'btn-primary' : 'btn-ghost'} btn-block" data-buy="${esc(p.id)}">${active ? 'Formule actuelle' : 'Choisir'}</button>
            </div>`;
          }).join('')}
        </div>
        <div class="levels-note">
          <strong>Ce que débloque chaque formule</strong>
          <p>Les avantages s’additionnent : une formule plus longue donne tout ce que donnaient les précédentes, plus de nouvelles options.</p>
          <ul>
            <li><b>1 mois — Essentiel :</b> voir les likes reçus, profil complet, photo principale.</li>
            <li><b>3 mois — Confort :</b> tous les likes reçus, toutes les photos, badge, communautés.</li>
            <li><b>6 mois — Avancé :</b> réponses illimitées, mode invisible, 2 boosts offerts.</li>
            <li><b>12 mois — Intégral :</b> tout, plus 5 boosts offerts.</li>
          </ul>
        </div>`}

        <div id="boost-box" style="margin-top:44px;padding:24px 26px;border:1px solid var(--line);border-radius:20px;background:#fff;">
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">
            <span style="width:20px;height:20px;display:inline-block;color:var(--yamo);">${ICONS.zap}</span>
            <h3 style="font-size:18px;font-weight:800;margin:0;">Booster mon profil</h3>
          </div>
          <p style="color:var(--ink-3);font-size:13.5px;margin:0 0 16px;">Un profil boosté passe devant les autres dans « Découvrir » : votre carte revient dans le paquet des personnes qui ne vous ont pas encore vues.</p>
          ${cd ? `<div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:14px;background:var(--yamo-soft);margin-bottom:18px;">
                  <div style="font-size:14px;font-weight:700;color:var(--ink-2);">Votre profil est boosté : ${cd}</div>
                  <button class="btn btn-ghost btn-sm" id="boost-off">Arrêter le boost</button>
                </div>` : ''}
          <div class="extras" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr));">
            ${(DEMO.EXTRAS || []).filter((x) => BOOST_MS[x.id]).map((x) => `
              <div class="extra" style="background:#fff;border:1px solid var(--line);">
                <strong>${esc(x.label)}</strong>
                <div class="p">${fcfa(x.price)}</div>
                <span style="margin-bottom:12px;">${esc(x.desc)}</span>
                <button class="btn btn-ghost btn-sm btn-block" data-buy="${esc(x.id)}">Booster</button>
              </div>`).join('')}
          </div>
        </div>

        <h3 style="font-size:18px;font-weight:800;margin:44px 0 6px;">Autres achats à l'unité</h3>
        <p style="color:var(--ink-3);font-size:14px;margin:0 0 20px;">Payez uniquement ce dont vous avez besoin.</p>
        <div class="extras" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr));">
          ${(DEMO.EXTRAS || []).filter((x) => !BOOST_MS[x.id]).map((x) => `
            <div class="extra" style="background:#fff;border:1px solid var(--line);">
              <strong>${esc(x.label)}</strong>
              <div class="p">${fcfa(x.price)}</div>
              <span style="margin-bottom:12px;">${esc(x.desc)}</span>
              <button class="btn btn-ghost btn-sm btn-block" data-buy="${esc(x.id)}">Acheter</button>
            </div>`).join('')}
        </div>

        <div style="margin-top:34px;padding:18px 22px;background:var(--bg-2);border-radius:16px;font-size:13px;color:var(--ink-3);">
          Paiement sécurisé par carte bancaire ou mobile money. Abonnement sans engagement, résiliable à tout moment depuis votre compte.
        </div>
      </div>`;

    const trialBtn = $('#start-trial');
    if (trialBtn) trialBtn.addEventListener('click', () => {
      if (STATE.myProfile.trial_used || STATE.myProfile.is_premium) return;
      const fin = new Date();
      fin.setDate(fin.getDate() + (DEMO.TRIAL_DAYS || 7));
      STATE.myProfile.trial_used = true;
      STATE.myProfile.trial_ends = fin.toISOString();
      STATE.myProfile.is_premium = true;
      STATE.myProfile.premium_plan = 'TRIAL';
      STATE.myProfile.premium_until = fin.toISOString();
      saveMe();
      renderMeMini();
      toast('Essai gratuit de ' + (DEMO.TRIAL_DAYS || 7) + ' jours démarré. Tout est débloqué !');
      go('premium');
    });

    const off = $('#boost-off');
    if (off) off.addEventListener('click', () => {
      removeBoost(STATE.myProfile);
      toast('Boost arrêté. Vous réapparaissez à votre place habituelle.');
      go('premium');
    });

    $$('[data-buy]', view).forEach((b) => b.addEventListener('click', () => {
      const id = b.getAttribute('data-buy');
      const all = [...(DEMO.PLANS || []), ...(DEMO.EXTRAS || []), DEMO.WOMEN_SUBSCRIPTION];
      const item = all.find((x) => x.id === id);
      openPay(item);
    }));
  }

  function boostCountdown(p) {
    if (!p || !p.boost_until) return '';
    const ms = new Date(p.boost_until).getTime() - Date.now();
    if (ms <= 0) return '';
    const h = Math.floor(ms / 36e5);
    const d = Math.floor(h / 24);
    return d >= 1 ? d + ' jour' + (d > 1 ? 's' : '') + ' restant' + (d > 1 ? 's' : '') : Math.max(1, h) + ' h restantes';
  }

  function openPay(item) {
    if (!item) return;
    const root = $('#modal-root');
    root.innerHTML = `
      <div class="modal-bg" id="pay-bg">
        <div class="modal" style="max-width:420px;">
          <h3>${esc(item.label)}</h3>
          <p>${item.desc ? esc(item.desc) : 'Abonnement Yamo Premium'}</p>
          <div style="background:var(--bg-2);border-radius:14px;padding:18px;margin-bottom:22px;">
            <div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Montant</span><strong>${fcfa(item.price)}${item.id === 'FEMALE_UNIQUE' ? ' / mois' : ''}</strong></div>
            ${item.id === 'FEMALE_UNIQUE' ? `<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Durée</span><strong>1 mois</strong></div><div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Renouvellement</span><strong>Chaque mois</strong></div>` : ''}
            <div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--ink-3);">Moyen de paiement</span><strong>Carte ou mobile money</strong></div>
          </div>
          ${item.id === 'FEMALE_UNIQUE' ? `<p style="font-size:12px;color:var(--ink-3);margin:-10px 0 18px;">Votre abonnement de 3 000 F est valable 1 mois. À la fin du mois, vous choisissez de le renouveler ou de l'arrêter. Le Super Like et le message direct restent payables séparément.</p>` : ''}
          <button class="btn btn-primary btn-block" id="pay-now">Payer ${fcfa(item.price)}</button>
          <button class="btn btn-block" style="color:var(--ink-3);margin-top:8px;" id="pay-cancel">Annuler</button>
          <p style="font-size:11.5px;color:var(--ink-3);margin:16px 0 0;text-align:center;">Paiement traité par Paystack. Aucune donnée bancaire n'est stockée par Yamo.</p>
        </div>
      </div>`;
    $('#pay-cancel').addEventListener('click', closeModal);
    $('#pay-bg').addEventListener('click', (e) => { if (e.target.id === 'pay-bg') closeModal(); });
    $('#pay-now').addEventListener('click', () => {
      const btn = $('#pay-now');
      btn.disabled = true;
      btn.textContent = 'Paiement en cours…';

      setTimeout(() => {
        const isPlan = (DEMO.PLANS || []).some((x) => x.id === item.id) || item.id === 'FEMALE_UNIQUE';
        if (isPlan) {
          STATE.myProfile.is_premium = true;
          if (item.id === 'FEMALE_UNIQUE' && !isFemale()) STATE.myProfile.gender = 'FEMALE';
          STATE.myProfile.premium_plan = item.id;
          const d = new Date();
          d.setDate(d.getDate() + (Number(item.days) || 30));
          STATE.myProfile.premium_until = d.toISOString();
          const fbf = ((item.features || {}).boosts) || 0;
          if (fbf > 0) STATE.extraBalance.BOOST_1D = (STATE.extraBalance.BOOST_1D || 0) + fbf;
        } else if (BOOST_MS[item.id]) {
          activateBoost(STATE.myProfile, item.id);
        } else {
          STATE.extraBalance[item.id] = (STATE.extraBalance[item.id] || 0) + 1;
        }
        saveMe();
        renderMeMini();
        closeModal();
        toast(isPlan
          ? (item.id === 'FEMALE_UNIQUE'
            ? 'Abonnement Femmes activé : 3 000 F pour 1 mois. Il s’arrête à la date indiquée, pensez à le renouveler.'
            : 'Bienvenue dans Yamo Premium ! Toutes les options sont débloquées.')
          : item.label + ' ajouté à votre compte.');
        go(isPlan ? 'profile' : 'premium');
      }, 1100);
    });
  }

  /* ---------- Appel API (site réel) ---------- */
  async function api(path, method, body) {
    const base = (CFG.API_BASE_URL || '').replace(/\/$/, '');
    if (!base) throw new Error('API_BASE_URL non configurée');
    const res = await fetch(base + path, {
      method: method || 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) throw new Error('Erreur serveur ' + res.status);
    return res.json();
  }

  /* ---------- Démarrage ---------- */

  /* ---------- Passerelle pour les modules complémentaires ----------
     Les règles des abonnements et de la discussion sont ajoutées
     dans js/block.js, chargé après ce fichier. L'affectation est faite
     ici, à la fin du script, quand toutes les fonctions existent. */
  window.YamoApp = {
    state: STATE, data: DEMO, ICONS: ICONS,
    esc: esc, fcfa: fcfa, $: $, $$: $$,
    go: go, toast: toast, showMatch: showMatch, renderNav: renderNav,
    renderMeMini: renderMeMini, refreshDeck: refreshDeck,
    startChat: startChat, closeModal: closeModal, saveMe: saveMe,
    isFemale: isFemale, myLevel: myLevel, myFeatures: myFeatures,
    inboundProfiles: inboundProfiles, byId: byId,
    viewLikes: viewLikes, viewMessages: viewMessages, viewPremium: viewPremium,
    openFullProfile: openFullProfile,
    afterInit: function () {
      if (document.body.getAttribute('data-page') !== 'app' &&
          location.pathname.indexOf('app.html') === -1) return;
      renderNav();
      var cur = (location.hash || '#discover').replace('#', '');
      if (PAGES[cur]) go(cur);
    }
  };

  /* ---------- Démarrage ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const page = document.body.getAttribute('data-page') ||
      (location.pathname.includes('app.html') ? 'app'
        : location.pathname.includes('auth.html') ? 'auth' : 'home');

    if (page === 'home' || (!location.pathname.includes('app.html') && !location.pathname.includes('auth.html'))) {
      initHome();
    } else if (page === 'auth' || location.pathname.includes('auth.html')) {
      // La page de connexion est gérée par js/auth.js
    } else if (page === 'app' || location.pathname.includes('app.html')) {
      initApp();
      window.addEventListener('hashchange', () => {
        const h = (location.hash || '#discover').replace('#', '');
        if (PAGES[h]) go(h);
      });
    }
  });
})();

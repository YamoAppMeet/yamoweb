/* ============================================================
   YAMO — Mesure d'audience
   ------------------------------------------------------------
   Compte les visites (pages vues), les visiteurs uniques et les
   inscriptions, jour par jour. En mode démonstration, tout est
   conservé dans le navigateur ; sur un vrai site, ces mêmes
   chiffres sont demandés à votre serveur (/api/admin/stats).
   Aucune donnée personnelle n'est enregistrée : seulement des
   compteurs et un identifiant anonyme (pour ne pas compter deux
   fois la même personne).
   ============================================================ */

window.YamoAnalytics = (function () {
  'use strict';

  const CFG = window.YAMO_CONFIG || {};
  const DEMO_MODE = CFG.DEMO_MODE !== false;
  const API = (CFG.API_BASE_URL || '').replace(/\/$/, '');

  const KEY = 'yamo_audience_v1';
  const VISITOR_KEY = 'yamo_visitor_id';

  function pad(n) { return n < 10 ? '0' + n : String(n); }
  function dayKey(d) { return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate()); }
  function today() { return dayKey(new Date()); }

  function visitorId() {
    try {
      let id = localStorage.getItem(VISITOR_KEY);
      if (!id) {
        id = 'v' + Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
        localStorage.setItem(VISITOR_KEY, id);
      }
      return id;
    } catch (e) { return 'anonyme'; }
  }

  function empty() { return { days: {}, visitors: {}, signups: {} }; }

  function read() {
    try {
      const raw = localStorage.getItem(KEY);
      const d = raw ? JSON.parse(raw) : null;
      if (!d || typeof d !== 'object') return empty();
      return Object.assign(empty(), d);
    } catch (e) { return empty(); }
  }

  function write(data) {
    try {
      // On ne garde que les 400 derniers jours (un peu plus d'un an)
      const keys = Object.keys(data.days).sort();
      if (keys.length > 400) {
        keys.slice(0, keys.length - 400).forEach((k) => {
          delete data.days[k]; delete data.visitors[k]; delete data.signups[k];
        });
      }
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch (e) {}
  }

  let lastSent = '';

  /* Une page vue = une visite. Le visiteur unique n'est compté qu'une fois par jour. */
  function trackPageView(page) {
    const k = today();
    const data = read();
    data.days[k] = (data.days[k] || 0) + 1;
    const seen = data.visitors[k] || [];
    const id = visitorId();
    if (seen.indexOf(id) === -1) { seen.push(id); data.visitors[k] = seen.slice(-5000); }
    write(data);

    const stamp = k + ':' + page;
    if (stamp === lastSent || DEMO_MODE) return;
    lastSent = stamp;
    try {
      const body = JSON.stringify({ page: page, visitorId: id, at: new Date().toISOString() });
      if (navigator.sendBeacon) {
        navigator.sendBeacon(API + '/api/track', new Blob([body], { type: 'application/json' }));
      } else {
        fetch(API + '/api/track', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: body, keepalive: true }).catch(function () {});
      }
    } catch (e) {}
  }

  /* Une inscription de plus (comptée par jour) */
  function trackSignup() {
    const k = today();
    const data = read();
    data.signups[k] = (data.signups[k] || 0) + 1;
    write(data);
  }

  function get() { return read(); }

  return { trackPageView: trackPageView, trackSignup: trackSignup, get: get, today: today, dayKey: dayKey };
})();

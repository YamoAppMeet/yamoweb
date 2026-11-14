/* ============================================================
   YAMO — Blocage et signalement
   Fenêtres de choix avec motifs, stockage local en démonstration
   et appels réels /api/messages/block et /api/messages/report.
   ============================================================ */

(function () {
  'use strict';

  const CFG = window.YAMO_CONFIG || {};
  const DEMO = CFG.DEMO_MODE !== false;
  const API = (CFG.API_BASE_URL || '').replace(/\/$/, '');

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const $ = (s) => document.querySelector(s);

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3200);
  }

  /* Motifs officiels du serveur Yamo */
  const REPORT_REASONS = [
    { id: 'FAKE_PROFILE', label: 'Faux profil / usurpation d\'identité' },
    { id: 'SCAM', label: 'Arnaque ou demande d\'argent' },
    { id: 'HARASSMENT', label: 'Harcèlement ou insulte' },
    { id: 'INAPPROPRIATE_CONTENT', label: 'Photos ou propos déplacés' },
    { id: 'SPAM', label: 'Publicité ou spam' },
    { id: 'VIOLENCE', label: 'Menaces ou violence' },
    { id: 'OTHER', label: 'Autre raison' },
  ];

  /* ---------- Stockage local du blocage (démo) ---------- */
  const BLOCK_KEY = 'yamo_blocked';
  function blocked() {
    try { return JSON.parse(localStorage.getItem(BLOCK_KEY) || '[]'); } catch (e) { return []; }
  }
  function isBlocked(id) { return blocked().indexOf(id) !== -1; }
  function addBlock(id) {
    const list = blocked();
    if (list.indexOf(id) === -1) list.push(id);
    try { localStorage.setItem(BLOCK_KEY, JSON.stringify(list)); } catch (e) {}
  }
  function removeBlock(id) {
    const list = blocked().filter((x) => x !== id);
    try { localStorage.setItem(BLOCK_KEY, JSON.stringify(list)); } catch (e) {}
  }

  /* ---------- Fenêtre générique ---------- */
  function openModal(html) {
    const root = document.getElementById('modal-root');
    if (!root) return;
    root.innerHTML = `<div class="modal-bg" id="mod-bg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
    const bg = $('#mod-bg');
    bg.addEventListener('click', (e) => { if (e.target.id === 'mod-bg') close(); });
  }
  function close() {
    const root = document.getElementById('modal-root');
    if (root) root.innerHTML = '';
  }

  /* ---------- BLOCAGE ---------- */
  function openBlock(person, onDone) {
    const name = esc(person.name || 'cette personne');
    openModal(`
      <h3>Bloquer ${name} ?</h3>
      <p>${name} ne pourra plus vous envoyer de messages, voir votre profil ni vous retrouver dans les découvertes. Cette action reste réversible dans les réglages.</p>
      <div style="display:flex;flex-direction:column;gap:9px;margin-top:6px;">
        <button class="btn btn-block" style="background:#dc2626;color:#fff;" id="blk-yes">Oui, bloquer ${name}</button>
        <button class="btn btn-ghost btn-block" id="blk-no">Annuler</button>
      </div>`);

    $('#blk-no').addEventListener('click', close);
    $('#blk-yes').addEventListener('click', async () => {
      const btn = $('#blk-yes');
      btn.disabled = true;
      btn.textContent = 'Blocage…';

      const id = person.profile_id || person.id;
      addBlock(id);

      if (!DEMO && person.matchId) {
        try {
          await fetch(API + '/api/messages/block', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('yamo_token') || '') },
            body: JSON.stringify({ matchId: person.matchId }),
          });
        } catch (e) { /* on garde le blocage local */ }
      }

      close();
      toast(name + ' a été bloqué.');
      if (typeof onDone === 'function') onDone();
    });
  }

  /* ---------- SIGNALEMENT ---------- */
  function openReport(person) {
    let chosen = '';
    const name = esc(person.name || 'ce profil');

    openModal(`
      <h3>Signaler ${name}</h3>
      <p>Votre signalement est anonyme. ${name} ne saura jamais qui l'a signalé.</p>
      <div class="choice-list" id="rs-list">
        ${REPORT_REASONS.map((r) => `
          <button type="button" class="choice-item" data-reason="${r.id}">
            <span class="dot"></span><span>${esc(r.label)}</span>
          </button>`).join('')}
      </div>
      <div class="field" style="margin-bottom:14px;">
        <label for="rs-details">Précisez (facultatif)</label>
        <textarea id="rs-details" rows="3" maxlength="500" placeholder="Décrivez ce qui s'est passé…"></textarea>
      </div>
      <div style="display:flex;flex-direction:column;gap:9px;">
        <button class="btn btn-primary btn-block" id="rs-send" disabled>Envoyer le signalement</button>
        <button class="btn btn-ghost btn-block" id="rs-cancel">Annuler</button>
      </div>`);

    Array.from(document.querySelectorAll('#rs-list .choice-item')).forEach((b) => {
      b.addEventListener('click', () => {
        Array.from(document.querySelectorAll('#rs-list .choice-item')).forEach((x) => x.classList.remove('selected'));
        b.classList.add('selected');
        chosen = b.getAttribute('data-reason');
        $('#rs-send').disabled = false;
      });
    });

    $('#rs-cancel').addEventListener('click', close);

    $('#rs-send').addEventListener('click', async () => {
      if (!chosen) return;
      const btn = $('#rs-send');
      const details = ($('#rs-details').value || '').trim();

      btn.disabled = true;
      btn.textContent = 'Envoi…';

      if (!DEMO) {
        try {
          const res = await fetch(API + '/api/messages/report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + (localStorage.getItem('yamo_token') || '') },
            body: JSON.stringify({
              reportedUserId: person.profile_id || person.id,
              reason: chosen,
              details: details || undefined,
              matchId: person.matchId || undefined,
            }),
          });
          if (!res.ok) {
            const d = await res.json().catch(() => ({}));
            if (d.error === 'already_reported') {
              close();
              return toast('Vous avez déjà signalé ce profil. Notre équipe l\'examine.');
            }
          }
        } catch (e) { /* on confirme quand même la prise en compte locale */ }
      }

      close();
      toast('Merci. Notre équipe de modération examine ce profil sous 24 h.');
    });
  }

  window.YamoModeration = {
    openBlock: openBlock,
    openReport: openReport,
    isBlocked: isBlocked,
    removeBlock: removeBlock,
    blockedList: blocked,
    close: close,
    toast: toast,
  };
})();

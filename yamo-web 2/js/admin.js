/* ============================================================
   YAMO — Espace administrateur
   ------------------------------------------------------------
   Tableau de bord : visiteurs, inscrits, répartition femmes /
   hommes, abonnements, profils (vérifiés, signalés, bloqués).
   En mode démonstration, les chiffres viennent des données du
   site et de la mesure d'audience locale ; sur un vrai site, il
   appellent votre serveur et exigent un compte administrateur.
   ============================================================ */

(function () {
  'use strict';

  const CFG = window.YAMO_CONFIG || {};
  const DEMO = window.YAMO_DEMO || {};
  const DEMO_MODE = CFG.DEMO_MODE !== false;
  const API = (CFG.API_BASE_URL || '').replace(/\/$/, '');
  const TOKEN_KEY = 'yamo_admin_token';

  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const $ = (s) => document.querySelector(s);
  const $$ = (s) => Array.prototype.slice.call(document.querySelectorAll(s));
  const nf = (n) => (Math.round(n || 0)).toLocaleString('fr-FR');
  const pct = (a, b) => (b ? Math.round((a / b) * 100) : 0);

  const MONTHS = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
  const DAYS_FR = ['dimanche', 'lundi', 'mardi', 'mercredi', 'jeudi', 'vendredi', 'samedi'];
  const shortDate = (d) => String(d.getDate()).padStart(2, '0') + '/' + String(d.getMonth() + 1).padStart(2, '0');

  function toast(msg) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3000);
  }

  /* ============================================================
     DONNÉES
     ============================================================ */

  /* Comptes réels créés sur cet appareil (js/auth.js) */
  function localAccounts() {
    try { return JSON.parse(localStorage.getItem('yamo_accounts_v1') || '[]'); } catch (e) { return []; }
  }

  /* Historique d'audience local (js/analytics.js) */
  function audience() {
    const A = window.YamoAnalytics;
    return A ? A.get() : { days: {}, visitors: {}, signups: {} };
  }

  function dayShift(n) {
    const d = new Date();
    d.setHours(12, 0, 0, 0);
    d.setDate(d.getDate() + n);
    return d;
  }

  /* Chiffres d'exemple, stables (même jour = même valeur), pour que le
     tableau de bord soit lisible avant la mise en ligne. */
  function seedFor(d) {
    const k = d.getFullYear() * 366 + d.getMonth() * 31 + d.getDate();
    const rnd = (a, b) => {
      const x = Math.sin(k * 12.9898 + a * 78.233) * 43758.5453;
      return Math.floor((x - Math.floor(x)) * (b - a + 1)) + a;
    };
    let base = rnd(1, 60) + 55;
    const w = d.getDay();
    if (w === 0 || w === 6) base = Math.round(base * 1.28);       // week-end plus fréquenté
    if (w === 5 || w === 6) base = Math.round(base * 1.12);       // vendredi et samedi soir
    const growth = 1 + Math.max(0, 120 - Math.abs(Math.round((new Date() - d) / 864e5))) * 0.004;
    const visits = Math.round(base * growth * 4.4);
    const uniq = Math.round(visits / (rnd(2, 3) + 0.4));
    return { visits: visits, uniq: uniq, signups: Math.max(1, Math.round(uniq * (rnd(4, 9) / 100))) };
  }

  /* Construit la série jour par jour sur N jours */
  function series(days) {
    const aud = audience();
    const out = [];
    const real = Object.keys(aud.days || {});
    const firstReal = real.length ? real.sort()[0] : null;

    for (let i = days - 1; i >= 0; i--) {
      const d = dayShift(-i);
      const k = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
      const s = seedFor(d);
      const v = aud.days[k] || 0;
      const u = (aud.visitors[k] || []).length || 0;
      const ins = aud.signups[k] || 0;
      out.push({
        date: d, key: k,
        visits: s.visits + v,
        uniq: s.uniq + u,
        signups: s.signups + ins,
        real: !!firstReal && k >= firstReal,
      });
    }
    return out;
  }

  /* Répertoire des inscrits : comptes réels de cet appareil + profils de démonstration */
  function members() {
    const list = [];
    const accounts = localAccounts();
    accounts.forEach((a, i) => {
      list.push({
        id: a.id || 'acc' + i,
        name: a.name || a.firstName || (a.phone ? 'Compte ' + a.phone : 'Compte' + (i + 1)),
        phone: a.phone || a.email || '—',
        gender: String(a.gender || '—').toUpperCase(),
        city: a.city || 'Abidjan',
        joined: a.createdAt || a.created_at || new Date().toISOString(),
        verified: !!a.is_verified,
        premium: !!a.is_premium,
        real: true,
      });
    });
    (DEMO.PROFILES || []).forEach((p) => {
      const d = dayShift(-(6 + (parseInt(String(p.id).replace(/\D/g, ''), 10) || 0) * 4));
      list.push({
        id: p.id,
        name: p.name,
        phone: '—',
        gender: p.gender || '—',
        city: p.city || 'Abidjan',
        joined: d.toISOString(),
        verified: !!p.is_verified,
        premium: !!p.is_premium,
        real: false,
      });
    });
    return list.sort((a, b) => new Date(b.joined) - new Date(a.joined));
  }

  function blockedList() {
    try { return JSON.parse(localStorage.getItem('yamo_blocked') || '[]'); } catch (e) { return []; }
  }

  /* ============================================================
     AFFICHAGE
     ============================================================ */

  const PERIODS = [
    { id: '7', label: '7 jours', days: 7 },
    { id: '30', label: '30 jours', days: 30 },
    { id: '90', label: '3 mois', days: 90 },
    { id: '365', label: '12 mois', days: 365 },
  ];

  let period = '30';
  let memberFilter = { q: '', gender: 'ALL', status: 'ALL' };

  function kpi(icon, label, value, sub) {
    return `<div class="ad-kpi">
      <div class="ad-kpi-ico">${icon}</div>
      <div class="ad-kpi-txt"><span>${esc(label)}</span><strong>${value}</strong>${sub ? `<em>${sub}</em>` : ''}</div>
    </div>`;
  }

  function barChart(data, key, label) {
    const max = Math.max.apply(null, data.map((d) => d[key]).concat([1]));
    // Une étiquette tous les 6 jours environ, pour rester lisible sur téléphone
    const step = Math.max(1, Math.ceil(data.length / 5));
    return `<div class="ad-chart" role="img" aria-label="${esc(label)}">
      ${data.map((d, i) => {
        const h = Math.max(2, Math.round((d[key] / max) * 100));
        const show = i % step === 0;
        return `<div class="ad-bar-wrap" title="${shortDate(d.date)} : ${nf(d[key])}">
          <div class="ad-bar" style="height:${h}%"></div>
          ${show && (i % step === 0) ? `<span class="ad-bar-lbl">${shortDate(d.date)}</span>` : ''}
        </div>`;
      }).join('')}
    </div>`;
  }

  function render() {
    const P = PERIODS.find((p) => p.id === period) || PERIODS[1];
    const data = series(P.days);
    const sum = (key) => data.reduce((s, d) => s + d[key], 0);
    const visits = sum('visits');
    const uniq = sum('uniq');
    const signups = sum('signups');
    const mem = members();
    const women = mem.filter((m) => m.gender === 'FEMALE' || m.gender === 'F').length;
    const men = mem.filter((m) => m.gender === 'MALE' || m.gender === 'M').length;
    const other = mem.length - women - men;
    const verified = mem.filter((m) => m.verified).length;
    const premium = mem.filter((m) => m.premium).length;
    const blocked = blockedList().length;

    const todayD = data[data.length - 1];
    const yestD = data[data.length - 2] || { visits: 0 };
    const trend = yestD.visits ? Math.round(((todayD.visits - yestD.visits) / yestD.visits) * 100) : 0;
    const perDay = Math.round(visits / Math.max(1, data.length));
    const conversion = pct(signups, uniq);

    const monthGroups = {};
    data.forEach((d) => {
      const k = d.date.getFullYear() + '-' + d.date.getMonth();
      if (!monthGroups[k]) monthGroups[k] = { label: MONTHS[d.date.getMonth()] + ' ' + d.date.getFullYear(), visits: 0, uniq: 0, signups: 0 };
      monthGroups[k].visits += d.visits;
      monthGroups[k].uniq += d.uniq;
      monthGroups[k].signups += d.signups;
    });
    const months = Object.values(monthGroups);

    const view = $('#ad-view');
    if (!view) return;

    view.innerHTML = `
      <div class="ad-tabs" role="tablist">
        <button class="ad-tab${STATE.tab === 'dashboard' ? ' active' : ''}" data-tab="dashboard">Tableau de bord</button>
        <button class="ad-tab${STATE.tab === 'members' ? ' active' : ''}" data-tab="members">Inscrits (${nf(mem.length)})</button>
        <button class="ad-tab${STATE.tab === 'profiles' ? ' active' : ''}" data-tab="profiles">Profils</button>
        <button class="ad-tab${STATE.tab === 'help' ? ' active' : ''}" data-tab="help">Aide</button>
      </div>

      <div class="ad-pane${STATE.tab === 'dashboard' ? '' : ' hidden'}">
        <div class="ad-period">
          <span>Période :</span>
          ${PERIODS.map((p) => `<button class="ad-pill${p.id === period ? ' active' : ''}" data-period="${p.id}">${p.label}</button>`).join('')}
        </div>

        <div class="ad-kpis">
          ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12z"/><circle cx="12" cy="12" r="3"/></svg>', 'Visiteurs uniques', nf(uniq), 'sur ' + P.label.toLowerCase())}
          ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 3v18h18"/><path d="M7 15l4-5 3 3 5-7"/></svg>', 'Pages vues', nf(visits), 'soit ' + nf(perDay) + ' par jour')}
          ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M22 11h-6"/></svg>', 'Inscriptions', nf(signups), conversion + ' % des visiteurs')}
          ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.6 5.9 20.8l1.3-6.8-5-4.8 6.9-.9L12 2z"/></svg>', 'Abonnés', nf(premium), pct(premium, mem.length) + ' % des inscrits')}
        </div>

        <div class="ad-row-2">
          <div class="ad-card">
            <div class="ad-card-head"><h3>Fréquentation</h3><span>Aujourd'hui : <strong>${nf(todayD.visits)}</strong> pages vues ${trend >= 0 ? '<b class="up">▲ ' + trend + ' %</b>' : '<b class="down">▼ ' + Math.abs(trend) + ' %</b>'}</span></div>
            ${barChart(data, 'visits', 'Pages vues par jour')}
            <p class="ad-note">Une barre = un jour. Passez le doigt (ou la souris) sur une barre pour voir le chiffre exact.</p>
          </div>
          <div class="ad-card">
            <div class="ad-card-head"><h3>Répartition des inscrits</h3></div>
            <div class="ad-split">
              <div class="ad-split-bar">
                <span class="f" style="width:${pct(women, mem.length)}%"></span>
                <span class="m" style="width:${pct(men, mem.length)}%"></span>
                <span class="o" style="width:${pct(other, mem.length)}%"></span>
              </div>
              <ul class="ad-legend">
                <li><i class="f"></i> Femmes <strong>${nf(women)}</strong> <em>${pct(women, mem.length)} %</em></li>
                <li><i class="m"></i> Hommes <strong>${nf(men)}</strong> <em>${pct(men, mem.length)} %</em></li>
                <li><i class="o"></i> Non précisé <strong>${nf(other)}</strong> <em>${pct(other, mem.length)} %</em></li>
              </ul>
              <div class="ad-mini-stats">
                <div><span>Profils vérifiés</span><strong>${nf(verified)}</strong></div>
                <div><span>Profils bloqués</span><strong>${nf(blocked)}</strong></div>
              </div>
            </div>
          </div>
        </div>

        <div class="ad-card">
          <div class="ad-card-head"><h3>Mois par mois</h3><span>Visiteurs, pages vues et inscriptions</span></div>
          <div class="ad-table-wrap">
            <table class="ad-table">
              <thead><tr><th>Mois</th><th>Visiteurs uniques</th><th>Pages vues</th><th>Inscriptions</th><th>Taux</th></tr></thead>
              <tbody>
                ${months.map((m) => `<tr><td data-label="Mois"><strong>${esc(m.label)}</strong></td><td data-label="Visiteurs">${nf(m.uniq)}</td><td data-label="Pages vues">${nf(m.visits)}</td><td data-label="Inscriptions">${nf(m.signups)}</td><td data-label="Taux">${pct(m.signups, m.uniq)} %</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>

        <div class="ad-card">
          <div class="ad-card-head"><h3>Jour par jour</h3><span>Les 14 derniers jours</span></div>
          <div class="ad-table-wrap">
            <table class="ad-table">
              <thead><tr><th>Jour</th><th>Visiteurs uniques</th><th>Pages vues</th><th>Inscriptions</th></tr></thead>
              <tbody>
                ${data.slice(-14).reverse().map((d) => `<tr><td data-label="Jour"><strong>${DAYS_FR[d.date.getDay()]} ${shortDate(d.date)}</strong></td><td data-label="Visiteurs">${nf(d.uniq)}</td><td data-label="Pages vues">${nf(d.visits)}</td><td data-label="Inscriptions">${nf(d.signups)}</td></tr>`).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div class="ad-pane${STATE.tab === 'members' ? '' : ' hidden'}">
        ${renderMembers(mem)}
      </div>

      <div class="ad-pane${STATE.tab === 'profiles' ? '' : ' hidden'}">
        ${renderProfiles(mem)}
      </div>

      <div class="ad-pane${STATE.tab === 'help' ? '' : ' hidden'}">
        ${renderHelp()}
      </div>`;

    bind();
  }

  function filteredMembers(mem) {
    const q = memberFilter.q.trim().toLowerCase();
    return mem.filter((m) => {
      if (q && !(String(m.name).toLowerCase().indexOf(q) !== -1 || String(m.phone).toLowerCase().indexOf(q) !== -1 || String(m.city).toLowerCase().indexOf(q) !== -1)) return false;
      if (memberFilter.gender !== 'ALL') {
        const g = m.gender === 'FEMALE' || m.gender === 'F' ? 'F' : (m.gender === 'MALE' || m.gender === 'M' ? 'M' : 'O');
        if (g !== memberFilter.gender) return false;
      }
      if (memberFilter.status === 'VERIFIED' && !m.verified) return false;
      if (memberFilter.status === 'PREMIUM' && !m.premium) return false;
      if (memberFilter.status === 'REAL' && !m.real) return false;
      return true;
    });
  }

  function genderLabel(g) {
    const G = String(g || '').toUpperCase();
    if (G === 'FEMALE' || G === 'F' || G === 'FEMME') return 'Femme';
    if (G === 'MALE' || G === 'M' || G === 'HOMME') return 'Homme';
    return 'Non précisé';
  }

  function renderMembers(mem) {
    const list = filteredMembers(mem);
    return `
      <div class="ad-card">
        <div class="ad-card-head"><h3>Tous les inscrits</h3><span>${nf(list.length)} personne(s) affichée(s)</span></div>
        <div class="ad-filters">
          <input id="ad-q" type="search" placeholder="Rechercher un nom, un numéro, une ville…" value="${esc(memberFilter.q)}">
          <select id="ad-gender">
            <option value="ALL"${memberFilter.gender === 'ALL' ? ' selected' : ''}>Tous</option>
            <option value="F"${memberFilter.gender === 'F' ? ' selected' : ''}>Femmes</option>
            <option value="M"${memberFilter.gender === 'M' ? ' selected' : ''}>Hommes</option>
            <option value="O"${memberFilter.gender === 'O' ? ' selected' : ''}>Non précisé</option>
          </select>
          <select id="ad-status">
            <option value="ALL"${memberFilter.status === 'ALL' ? ' selected' : ''}>Tous les statuts</option>
            <option value="VERIFIED"${memberFilter.status === 'VERIFIED' ? ' selected' : ''}>Vérifiés</option>
            <option value="PREMIUM"${memberFilter.status === 'PREMIUM' ? ' selected' : ''}>Abonnés</option>
            <option value="REAL"${memberFilter.status === 'REAL' ? ' selected' : ''}>Comptes réels</option>
          </select>
          <button class="btn btn-ghost btn-sm" id="ad-export">Exporter la liste</button>
        </div>
        <div class="ad-table-wrap">
          <table class="ad-table">
            <thead><tr><th>Nom</th><th>Contact</th><th>Sexe</th><th>Ville</th><th>Inscription</th><th>Statut</th></tr></thead>
            <tbody>
              ${list.length ? list.map((m) => `<tr>
                <td data-label="Nom"><strong>${esc(m.name)}</strong></td>
                <td data-label="Contact">${esc(m.phone)}</td>
                <td data-label="Sexe"><span class="ad-tag ${m.gender === 'FEMALE' ? 'f' : m.gender === 'MALE' ? 'm' : 'o'}">${genderLabel(m.gender)}</span></td>
                <td data-label="Ville">${esc(m.city)}</td>
                <td data-label="Inscription">${new Date(m.joined).toLocaleDateString('fr-FR')}</td>
                <td data-label="Statut"><span class="ad-badges">${m.verified ? '<span class="ad-badge ok">Vérifié</span>' : ''}${m.premium ? '<span class="ad-badge prem">Abonné</span>' : ''}${m.real ? '<span class="ad-badge real">Compte réel</span>' : ''}${!m.verified && !m.premium && !m.real ? '—' : ''}</span></td>
              </tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--ink-3);padding:26px;">Aucun inscrit ne correspond à cette recherche.</td></tr>'}
            </tbody>
          </table>
        </div>
      </div>`;
  }

  /* Valider un dossier = attribuer le badge Vérifié (et le garder après rechargement) */
  function verifyMember(id) {
    try {
      const accounts = localAccounts();
      const acc = accounts.find((a) => a.id === id);
      if (acc) {
        acc.is_verified = true;
        acc.verified_at = new Date().toISOString();
        try { localStorage.setItem('yamo_accounts_v1', JSON.stringify(accounts)); } catch (e) {}
      }
      const verified = JSON.parse(localStorage.getItem('yamo_verified_ids') || '[]');
      if (verified.indexOf(id) === -1) verified.push(id);
      try { localStorage.setItem('yamo_verified_ids', JSON.stringify(verified)); } catch (e) {}
      logAction('Vérification validée pour le profil ' + id);
    } catch (e) {}
  }

  /* Journal des actions de l'administrateur (traçabilité) */
  function logAction(label) {
    try {
      const list = JSON.parse(localStorage.getItem('yamo_admin_log') || '[]');
      list.unshift({ at: new Date().toISOString(), label: label });
      localStorage.setItem('yamo_admin_log', JSON.stringify(list.slice(0, 100)));
    } catch (e) {}
  }

  function renderProfiles(mem) {
    const verified = mem.filter((m) => m.verified);
    const notVerified = mem.filter((m) => !m.verified);
    const premium = mem.filter((m) => m.premium);
    return `
      <div class="ad-kpis ad-kpis-3">
        ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.4 9.3-8 10-4.6-.7-8-5-8-10V6l8-4z"/><path d="M9 12l2 2 4-4"/></svg>', 'Profils vérifiés', nf(verified.length), pct(verified.length, mem.length) + ' % des profils')}
        ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 8v5M12 16.5v.01"/></svg>', 'En attente de vérification', nf(notVerified.length), 'Badge à attribuer après contrôle')}
        ${kpi('<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l2.9 6.3 6.9.9-5 4.8 1.3 6.8L12 17.6 5.9 20.8l1.3-6.8-5-4.8 6.9-.9L12 2z"/></svg>', 'Abonnés', nf(premium.length), 'Premium et formule Femmes')}
      </div>
      <div class="ad-card">
        <div class="ad-card-head"><h3>Dossiers de vérification</h3><span>À contrôler</span></div>
        <div class="ad-table-wrap">
          <table class="ad-table">
            <thead><tr><th>Profil</th><th>Sexe</th><th>Documents</th><th>Statut</th><th>Action</th></tr></thead>
            <tbody>
              ${notVerified.length ? notVerified.map((m) => `<tr>
                <td data-label="Profil"><strong>${esc(m.name)}</strong></td>
                <td data-label="Sexe">${genderLabel(m.gender)}</td>
                <td data-label="Documents">Pièce + selfie reçus</td>
                <td data-label="Statut"><span class="ad-badge wait">En attente</span></td>
                <td data-label="Action"><button class="btn btn-primary btn-sm ad-verify" data-id="${esc(m.id)}">Valider</button></td>
              </tr>`).join('') : '<tr><td colspan="5" style="text-align:center;color:var(--ink-3);padding:26px;">Aucun dossier en attente. Tout est à jour.</td></tr>'}
            </tbody>
          </table>
        </div>
        <p class="ad-note">« Valider » attribue le badge Vérifié au profil. Sur un vrai site, les documents sont consultés sur votre serveur privé, jamais sur le site public.</p>
      </div>`;
  }

  function renderHelp() {
    return `
      <div class="ad-card ad-help">
        <h3>Ce que votre espace administrateur mesure</h3>
        <ul>
          <li><strong>Visiteurs uniques</strong> : le nombre de personnes différentes qui ont ouvert le site. Une même personne n'est comptée qu'une fois par jour.</li>
          <li><strong>Pages vues</strong> : le nombre total de pages ouvertes, même si c'est la même personne plusieurs fois.</li>
          <li><strong>Inscriptions</strong> : les nouveaux comptes créés, avec le pourcentage de visiteurs qui s'inscrivent (le « taux de conversion »).</li>
          <li><strong>Répartition femmes / hommes</strong> : calculée sur le sexe indiqué à l'inscription.</li>
          <li><strong>Profils vérifiés, abonnés, bloqués</strong> : l'état du catalogue et de la modération.</li>
        </ul>
        <h3>Ce qui est réel, ce qui est simulé</h3>
        <p>Dans cette version de démonstration, les <strong>visites enregistrées sur cet appareil</strong> sont réelles et s'ajoutent à un historique de fréquentation d'exemple. Les inscrits affichés comprennent les <strong>comptes réellement créés sur cet appareil</strong> (marqués « Compte réel ») et les profils d'exemple du site.</p>
        <p>Sur un site en ligne, ces chiffres proviendront de votre serveur : il suffira de brancher les adresses de statistiques et de gestion des comptes prévues pour cela, et de vous connecter avec un compte <strong>administrateur</strong>. Personne d'autre ne pourra ouvrir cet espace.</p>
        <h3>Vos données personnelles</h3>
        <p>Aucune information sensible n'est enregistrée pour les statistiques : ni nom, ni photo, ni position. Un identifiant anonyme suffit à compter les visiteurs uniques. Les pièces d'identité envoyées pour la vérification restent privées et ne sont jamais publiées.</p>
      </div>`;
  }

  /* ============================================================
     INTERACTIONS
     ============================================================ */
  const STATE = { tab: 'dashboard' };

  function bind() {
    $$('.ad-tab').forEach((b) => b.addEventListener('click', () => { STATE.tab = b.getAttribute('data-tab'); render(); }));
    $$('.ad-pill[data-period]').forEach((b) => b.addEventListener('click', () => { period = b.getAttribute('data-period'); render(); }));

    const q = $('#ad-q');
    if (q) {
      q.addEventListener('input', () => {
        memberFilter.q = q.value;
        const list = filteredMembers(members());
        const tbody = document.querySelector('#ad-view .ad-table tbody');
        if (tbody) {
          tbody.innerHTML = list.length ? list.map((m) => `<tr>
            <td data-label="Nom"><strong>${esc(m.name)}</strong></td><td data-label="Contact">${esc(m.phone)}</td>
            <td data-label="Sexe"><span class="ad-tag ${m.gender === 'FEMALE' ? 'f' : m.gender === 'MALE' ? 'm' : 'o'}">${genderLabel(m.gender)}</span></td>
            <td data-label="Ville">${esc(m.city)}</td><td data-label="Inscription">${new Date(m.joined).toLocaleDateString('fr-FR')}</td>
            <td data-label="Statut"><span class="ad-badges">${m.verified ? '<span class="ad-badge ok">Vérifié</span>' : ''}${m.premium ? '<span class="ad-badge prem">Abonné</span>' : ''}${m.real ? '<span class="ad-badge real">Compte réel</span>' : ''}</td></tr>`).join('') : '<tr><td colspan="6" style="text-align:center;color:var(--ink-3);padding:26px;">Aucun inscrit ne correspond à cette recherche.</td></tr>';
        }
      });
    }
    const g = $('#ad-gender');
    if (g) g.addEventListener('change', () => { memberFilter.gender = g.value; render(); });
    const s = $('#ad-status');
    if (s) s.addEventListener('change', () => { memberFilter.status = s.value; render(); });

    const exp = $('#ad-export');
    if (exp) exp.addEventListener('click', exportCsv);

    $$('.ad-verify').forEach((b) => b.addEventListener('click', () => {
      const id = b.getAttribute('data-id');
      verifyMember(id);
      b.disabled = true;
      b.textContent = 'Validé';
      toast('Badge Vérifié attribué à ce profil.');
      render();
    }));
  }

  function exportCsv() {
    const list = filteredMembers(members());
    const head = ['Nom', 'Contact', 'Sexe', 'Ville', 'Inscription', 'Verifie', 'Abonne'];
    const rows = list.map((m) => [m.name, m.phone, genderLabel(m.gender), m.city, new Date(m.joined).toLocaleDateString('fr-FR'), m.verified ? 'Oui' : 'Non', m.premium ? 'Oui' : 'Non']);
    const csv = [head].concat(rows).map((r) => r.map((c) => '"' + String(c).replace(/"/g, '""') + '"').join(';')).join('\r\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'yamo-inscrits-' + new Date().toISOString().slice(0, 10) + '.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(a.href), 4000);
    toast('Liste exportée : ' + list.length + ' inscrit(s).');
  }

  /* ============================================================
     ACCÈS
     ============================================================ */
  function isLogged() {
    try { return !!localStorage.getItem(TOKEN_KEY); } catch (e) { return false; }
  }

  function renderGate() {
    const gate = $('#ad-gate');
    const app = $('#ad-app');
    if (gate) gate.classList.remove('hidden');
    if (app) app.classList.add('hidden');
  }

  function enter() {
    const gate = $('#ad-gate');
    const app = $('#ad-app');
    if (gate) gate.classList.add('hidden');
    if (app) app.classList.remove('hidden');
    STATE.tab = 'dashboard';
    render();
  }

  /* Compteur d'essais : après 5 codes faux, l'accès se bloque 5 minutes */
  const LOCK_KEY = 'yamo_admin_lock';
  function lockState() {
    try { return JSON.parse(localStorage.getItem(LOCK_KEY) || '{"tries":0,"until":0}'); } catch (e) { return { tries: 0, until: 0 }; }
  }
  function saveLock(v) { try { localStorage.setItem(LOCK_KEY, JSON.stringify(v)); } catch (e) {} }

  function init() {
    const codeInput = $('#ad-code');
    const form = $('#ad-login');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const lock = lockState();
        if (lock.until && Date.now() < lock.until) {
          const mins = Math.ceil((lock.until - Date.now()) / 60000);
          const err = $('#ad-err');
          if (err) err.textContent = 'Accès temporairement bloqué. Réessayez dans ' + mins + ' minute(s).';
          return;
        }
        const code = (codeInput.value || '').trim();
        const expected = String(CFG.ADMIN_DEMO_CODE || 'YAMO-ADMIN');
        if (code.toUpperCase() !== expected.toUpperCase()) {
          const tries = (lock.tries || 0) + 1;
          saveLock({ tries: tries >= 5 ? 0 : tries, until: tries >= 5 ? Date.now() + 5 * 60 * 1000 : 0 });
          const err = $('#ad-err');
          if (err) err.textContent = tries >= 5
            ? 'Accès bloqué 5 minutes après 5 codes incorrects.'
            : 'Code incorrect. Il reste ' + (5 - tries) + ' essai(s).';
          codeInput.value = '';
          return;
        }
        saveLock({ tries: 0, until: 0 });
        try { localStorage.setItem(TOKEN_KEY, 'demo-admin-' + Date.now()); } catch (er) {}
        logAction('Connexion reussie a l espace administrateur');
        enter();
      });
    }
    const out = $('#ad-logout');
    if (out) out.addEventListener('click', () => {
      try { localStorage.removeItem(TOKEN_KEY); } catch (e) {}
      renderGate();
    });

    if (CFG.DEMO_MODE === false && API) {
      // Sur un vrai site : le serveur vérifie le rôle administrateur.
      fetch(API + '/api/admin/me', { headers: { Authorization: 'Bearer ' + (localStorage.getItem('yamo_token') || '') } })
        .then((r) => r.json())
        .then((d) => { if (d && d.role === 'ADMIN') enter(); else renderGate(); })
        .catch(renderGate);
      return;
    }

    if (isLogged()) enter(); else renderGate();
  }

  document.addEventListener('DOMContentLoaded', init);

  window.YamoAdmin = { render: render, series: series, members: members };
})();

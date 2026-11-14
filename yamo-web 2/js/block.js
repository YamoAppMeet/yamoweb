/* ============================================================
   YAMO — Règles des abonnements et de la discussion
   Chargé APRÈS app.js : enrichit les fonctions sans les réécrire.
   1) Femmes : un seul abonnement (5 000 F) qui débloque tout.
   2) Hommes : formules à paliers, chaque formule débloque
      un nombre croissant de fonctionnalités.
   3) Likes reçus : réservés à l'abonnement ; on voit le profil
      complet, les photos, puis on like en retour (match).
   4) Discussion : uniquement avec un match, ou après un message
      direct payé (ou inclus dans la formule).
   ============================================================ */
(function () {
  'use strict';

  function ready(fn) {
    if (window.YamoApp && typeof window.YamoApp.afterInit === 'function') { fn(window.YamoApp); return; }
    var tries = 0;
    var t = setInterval(function () {
      tries++;
      if (window.YamoApp && typeof window.YamoApp.afterInit === 'function') {
        clearInterval(t); fn(window.YamoApp);
      } else if (tries > 200) { clearInterval(t); }
    }, 20);
  }

  ready(function (APP) {
    var STATE = APP.state;
    var DEMO = APP.data;
    var esc = APP.esc;
    var fcfa = APP.fcfa;
    var go = APP.go;
    var toast = APP.toast;
    var showMatch = APP.showMatch;
    var renderNav = APP.renderNav;
    var renderMeMini = APP.renderMeMini;
    var refreshDeck = APP.refreshDeck;
    var startChat = APP.startChat;
    var closeModal = APP.closeModal;
    var $ = APP.$;
    var $$ = APP.$$;
    var ICONS = APP.ICONS;
    var isFemale = APP.isFemale;
    var saveMe = APP.saveMe;
    var features = APP.myFeatures;
    var inbound = APP.inboundProfiles;
    var byId = APP.byId;

    var ICON_LOCK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg>';

    /* Lit un choix de conversation : convFor renvoie la conversation de démo,
       les nouvelles conversations vivent dans DEMO.CONVERSATIONS. */
    function convOf(profileId) {
      return (DEMO.CONVERSATIONS || []).find(function (c) { return c.profileId === profileId; }) || null;
    }
    function isMatchNow(id) { return (STATE.matches || []).indexOf(id) !== -1; }
    function hasDirectNow(id) { var c = convOf(id); return !!(c && c.direct); }

    /* ------------------------------------------------------------
       A. Fiche « qui m'a liké » : profil complet + photos + like
          en retour, réservée à l'abonnement.
       ------------------------------------------------------------ */
    APP.openFullProfile = function (p, opts) {
      /* Fiche complète : accessible à tous (c'est la vitrine du profil).
         Ce qui reste payant : voir QUI vous a liké (cartes de l'écran Likes),
         et écrire. */
      var o = opts || {};
      var f = features();
      var unlocked = !!f.seeAllLikes;

      // Personne qui m'a liké : sa fiche est réservée à l'abonnement
      if (o.fromLikes && !unlocked) {
        /* fiche volontairement ouverte : on regarde avant de liker */
      }

      var full = p.photos || [];
      var shown = f.seePhotos === 'full' ? full : (f.seePhotos === 'preview' ? full.slice(0, 1) : full.slice(0, 1));
      if (!shown.length) shown = full.slice(0, 1);
      var hiddenPhotos = Math.max(0, full.length - shown.length);
      var alreadyLiked = (STATE.likes || []).indexOf(p.id) !== -1;
      /* Le match n'existe qu'après un like en retour : on se fie à l'état réel,
         pas à l'origine de la fiche. */
      var matched = isMatchNow(p.id);
      var limit = f.replyLikes;
      var sent = STATE.repliesSent || 0;
      var canReply = limit === -1 || sent < limit;
      var dmPrice = ((DEMO.EXTRAS || []).find(function (x) { return x.id === 'DIRECT_MESSAGE'; }) || {}).price || 200;

      var root = $('#modal-root');
      root.innerHTML = '' +
        '<div class="modal-bg" id="full-bg">' +
          '<div class="full-profile" role="dialog" aria-modal="true" aria-label="Profil de ' + esc(p.name) + '">' +
            '<button class="close-x" id="full-close" aria-label="Fermer">' + ICONS.x + '</button>' +
            '<div class="fp-head">' +
              '<div class="fp-main" id="fp-main" style="background-image:url(\'' + esc(shown[0]) + '\');">' +
                '<div class="fp-grad"></div>' +
                (o.fromLikes ? '<span class="fp-tag">' + (p.likedKind === 'SUPER' ? 'Super Like reçu' : 'Vous a liké') + '</span>' : '') +
                '<div class="fp-title">' +
                  '<h3>' + esc(p.name) + ', ' + p.age + (p.is_verified ? ' <span style="width:18px;height:18px;display:inline-block;">' + ICONS.verified + '</span>' : '') + '</h3>' +
                  '<p>' + esc(p.city) + ', ' + esc(p.country) + ' · à ' + esc(p.distanceKm) + ' km</p>' +
                '</div>' +
              '</div>' +
              '<div class="fp-thumbs">' +
                shown.map(function (ph, i) { return '<button class="fp-thumb' + (i === 0 ? ' on' : '') + '" data-photo="' + esc(ph) + '" aria-label="Photo ' + (i + 1) + '"><img src="' + esc(ph) + '" alt=""></button>'; }).join('') +
                (hiddenPhotos > 0 ? '<button class="fp-thumb locked-ph" id="fp-more-photos" aria-label="Autres photos réservées aux formules supérieures"><span>+' + hiddenPhotos + '</span></button>' : '') +
              '</div>' +
            '</div>' +
            '<div class="fp-body">' +
              '<p class="fp-bio">' + esc(p.bio) + '</p>' +
              '<div class="fp-facts">' +
                '<span>' + ICONS.pin + ' ' + esc(p.city) + '</span>' +
                '<span>' + esc(p.relationship_goal === 'SERIOUS' ? 'Relation sérieuse' : 'À découvrir') + '</span>' +
                (p.is_verified ? '<span>Profil vérifié</span>' : '') +
                (o.fromLikes ? '<span>Vous a liké' + (p.likedKind === 'SUPER' ? ' (Super Like)' : '') + '</span>' : '') +
              '</div>' +
              '<div class="interest-tags">' + (p.interests || []).map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</div>' +
              (alreadyLiked ? '<div class="fp-note ok">' + (ICONS.check || '') + ' Vous avez déjà liké ' + esc(p.name) + (matched ? ' — c\'est un match !' : '.') + '</div>' : '') +
              (!matched ? '<div class="fp-wait">' + ICON_LOCK + ' Pour discuter avec ' + esc(p.name) + ', il faut un match : likez en retour, ou envoyez-lui un message direct.</div>' : '') +
              '<div class="fp-actions">' +
                '<button class="btn btn-ghost btn-sm" id="fp-pass">Passer</button>' +
                '<button class="btn btn-primary btn-sm" id="fp-like">' +
                  (matched ? '✓ Match : écrire à ' + esc(p.name) : alreadyLiked ? '✓ Liké en retour' : (o.fromLikes ? 'Liker en retour → match' : 'Liker')) +
                '</button>' +
                '<button class="btn btn-ghost btn-sm" id="fp-super"' + (alreadyLiked || matched ? ' disabled' : '') + ' title="Super Like">★</button>' +
                '<button class="btn ' + (matched ? 'btn-primary' : 'btn-ghost') + ' btn-sm" id="fp-msg">' + (matched ? 'Écrire un message' : 'Message direct') + '</button>' +
              '</div>' +
              (!matched ? '<p class="fp-sub">' + (o.fromLikes
                ? 'Cette personne vous a liké : un like en retour crée le match et ouvre la discussion. Le message direct est aussi possible (' + fcfa(dmPrice) + ').'
                : 'Sans match, pas de discussion. Vous pouvez envoyer un message direct (' + fcfa(dmPrice) + ').') + '</p>'
                : '<p class="fp-sub">Vous êtes en match : la discussion est ouverte dans « Messages ».</p>') +
              (!canReply && !alreadyLiked && !matched ? '<div class="fp-note warn">Votre formule permet ' + limit + ' réponse(s) aux likes. Passez à une formule supérieure pour répondre à tout le monde.</div>' : '') +
              '<div class="fp-actions small">' +
                '<button class="btn btn-sm" id="fp-report" style="color:var(--ink-3);">Signaler</button>' +
                '<button class="btn btn-sm" id="fp-block" style="color:#dc2626;">Bloquer</button>' +
              '</div>' +
            '</div>' +
          '</div>' +
        '</div>';

      var close = function () { closeModal(); };
      $('#full-close').addEventListener('click', close);
      $('#full-bg').addEventListener('click', function (e) { if (e.target.id === 'full-bg') close(); });
      document.addEventListener('keydown', function esc2(ev) {
        if (ev.key === 'Escape') { close(); document.removeEventListener('keydown', esc2); }
      });

      $$('[data-photo]', root).forEach(function (b) {
        b.addEventListener('click', function () {
          $('#fp-main').style.backgroundImage = 'url(\'' + b.getAttribute('data-photo') + '\')';
          $$('[data-photo]', root).forEach(function (x) { x.classList.remove('on'); });
          b.classList.add('on');
        });
      });
      var more = $('#fp-more-photos');
      if (more) more.addEventListener('click', function () {
        toast(f.seePhotos === 'preview'
          ? 'Toutes ses photos sont réservées aux formules 3 mois et plus.'
          : 'Photos supplémentaires réservées aux formules supérieures.');
        close(); if (f.seePhotos === 'preview') go('premium');
      });

      $('#fp-pass').addEventListener('click', function () {
        STATE.passes.push(p.id); saveMe(); toast('Profil passé.'); close();
        if (STATE.page === 'likes') go('likes');
        if (STATE.page === 'discover') refreshDeck();
      });

      /* Like en retour : sur une personne qui vous a liké, il crée le match
         et ouvre la discussion. Sur un autre profil, c'est un like simple. */
      $('#fp-like').addEventListener('click', function () {
        /* Déjà liké / déjà en match : le bouton propose simplement d'écrire
           (on regarde l'état RÉEL, pas l'aperçu calculé à l'ouverture) */
        if (isMatchNow(p.id) || (STATE.likes || []).indexOf(p.id) !== -1) {
          close();
          if (isMatchNow(p.id) || hasDirectNow(p.id)) { startChat(p, true); }
          else { toast('Like déjà envoyé à ' + p.name + '. La discussion s\'ouvrira si cette personne vous like aussi.'); }
          return;
        }
        if (!canReply && o.fromLikes) { toast('Limite de réponses atteinte pour votre formule.'); close(); go('premium'); return; }
        if ((STATE.likes || []).indexOf(p.id) === -1) STATE.likes.push(p.id);
        if (o.fromLikes) STATE.repliesSent = (STATE.repliesSent || 0) + 1;
        var givesMatch = !!o.fromLikes || inbound().some(function (x) { return x.id === p.id; });
        if (givesMatch && STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id);
        saveMe(); close(); renderNav();
        if (givesMatch && STATE.matches.indexOf(p.id) !== -1) {
          /* Match : on affiche la fenêtre « C'est un match » par-dessus la
             fiche (elle a déjà été vidée par close()). */
          showMatch(p);
          if (STATE.page === 'discover') refreshDeck();
        } else {
          toast('Like envoyé à ' + p.name + '. La discussion s\'ouvrira si elle vous like aussi.');
          if (STATE.page === 'likes') go('likes');
          if (STATE.page === 'discover') refreshDeck();
        }
      });

      var fs = $('#fp-super');
      if (fs) fs.addEventListener('click', function () {
        var dispo = (STATE.extraBalance.SUPER_LIKE || 0) > 0;
        if (!dispo) { close(); var ospx = (window.YamoObtenirSuperPay || (window.YamoApp||{}).openSuperPay); if (ospx) ospx(p); else go('premium'); return; }
        STATE.extraBalance.SUPER_LIKE -= 1;
        if ((STATE.likes || []).indexOf(p.id) === -1) STATE.likes.push(p.id);
        var givesMatch = !!o.fromLikes || inbound().some(function (x) { return x.id === p.id; });
        if (givesMatch && STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id);
        saveMe(); close(); renderNav();
        if (givesMatch && STATE.matches.indexOf(p.id) !== -1) { showMatch(p); } else { if ((STATE.superSent || []).indexOf(p.id) === -1) { STATE.superSent = STATE.superSent || []; STATE.superSent.push(p.id); saveMe(); } toast('Super Like envoyé à ' + p.name + ' !'); }
        if (STATE.page === 'likes') go('likes');
        if (STATE.page === 'discover') refreshDeck();
      });

      $('#fp-msg').addEventListener('click', function () { close(); startChat(p, matched); });
      $('#fp-report').addEventListener('click', function () { close(); window.YamoModeration.openReport(p); });
      $('#fp-block').addEventListener('click', function () { close(); window.YamoModeration.openBlock(p, function () { go(STATE.page || 'discover'); }); });
    };

    /* Petite fenêtre : likes reçus réservés à l'abonnement */
    function lockModal(p, title) {
      var root = $('#modal-root');
      var f = features();
      root.innerHTML = '' +
        '<div class="modal-bg" id="lock-bg">' +
          '<div class="modal" style="max-width:420px;text-align:center;">' +
            '<div style="width:58px;height:58px;border-radius:50%;background:var(--yamo-soft);display:grid;place-items:center;margin:0 auto 14px;color:var(--yamo);">' + ICON_LOCK + '</div>' +
            '<h3>' + esc(title) + '</h3>' +
            '<p>Pour voir <strong>qui vous a liké</strong>, ouvrir son <strong>profil complet</strong> et <strong>toutes ses photos</strong>, puis liker en retour pour créer un match, il faut un abonnement actif.</p>' +
            '<div style="background:var(--bg-2);border-radius:14px;padding:14px;margin:16px 0;font-size:13.5px;text-align:left;">' +
              (isFemale()
                ? '<strong>Formule Femmes : ' + fcfa((DEMO.WOMEN_SUBSCRIPTION || {}).price || 5000) + ' — un seul abonnement, tout débloqué.</strong>'
                : '<strong>Formules à partir de ' + fcfa(((DEMO.PLANS || [])[0] || {}).price || 3000) + ' par mois :</strong> plus la formule est longue, plus d\'options sont débloquées.') +
            '</div>' +
            '<button class="btn btn-primary btn-block" id="lock-go">' + (isFemale() ? 'Voir mon abonnement' : 'Voir les formules et abonnements') + '</button>' +
            '<button class="btn btn-block" id="lock-cancel" style="color:var(--ink-3);margin-top:8px;">Plus tard</button>' +
          '</div>' +
        '</div>';
      var close = function () { closeModal(); };
      $('#lock-cancel').addEventListener('click', close);
      $('#lock-bg').addEventListener('click', function (e) { if (e.target.id === 'lock-bg') close(); });
      $('#lock-go').addEventListener('click', function () { close(); go('premium'); });
    }
    APP.lockModal = lockModal;

    /* ------------------------------------------------------------
       B. Écran Likes : tout est verrouillé sauf pour les abonnés
          (un aperçu du 1er like pour donner envie, mais son profil
          complet n'est pas accessible sans abonnement).
       ------------------------------------------------------------ */
    APP.viewLikes = function (view) {
      var f = features();
      var all = inbound();
      /* Super Likes : ceux qu'on a reçus et ceux qu'on a envoyés */
      var sup = all.filter(function (p) { return p.likedKind === 'SUPER'; });
      var sentSup = (STATE.superSent || []).map(function (id) { return byId(id); })
        .filter(function (pp) { return pp && sup.indexOf(pp) === -1; });
      sup = sup.concat(sentSup);
      var unlocked = !!f.seeAllLikes;
      var tabs = [
        { k: 'received', l: 'Ils vous ont liké', n: all.length },
        { k: 'super', l: 'Super Likes', n: sup.length },
        { k: 'matches', l: 'Mes matchs', n: (STATE.matches || []).length },
        { k: 'sent', l: 'Envoyés', n: (STATE.likes || []).length },
      ];

      var list = [];
      if (STATE.likesTab === 'received') list = all;
      else if (STATE.likesTab === 'super') list = sup;
      else if (STATE.likesTab === 'matches') list = (STATE.matches || []).map(byId);
      else list = (STATE.likes || []).map(byId);
      list = list.filter(function (p) { return p && !(window.YamoModeration && window.YamoModeration.isBlocked(p.id)); });

      var isLikesTab = STATE.likesTab === 'received' || STATE.likesTab === 'super';
      var hiddenCount = isLikesTab && !unlocked ? list.length : 0;

      view.innerHTML = '' +
        '<div class="rule-note" id="rule-note">' +
          '<strong>' + (ICONS.heart || '') + ' Comment ça marche</strong>' +
          '<span>On discute seulement quand il y a un match. Pour voir qui vous a liké, ouvrir son profil complet et liker en retour, il faut un abonnement. Le message direct permet d\'écrire sans match.</span>' +
          '<ul class="rule-steps">' +
            '<li><b>1.</b> Abonnez-vous (une seule formule pour les femmes).</li>' +
            '<li><b>2.</b> Voyez qui vous a liké, ouvrez son profil et toutes ses photos.</li>' +
            '<li><b>3.</b> Likez en retour : le match se crée.</li>' +
            '<li><b>4.</b> La discussion s\'ouvre dans « Messages ». Sans match, seul le message direct est possible.</li>' +
          '</ul>' +
        '</div>' +
        '<div class="likes-tabs">' +
          tabs.map(function (t) { return '<button class="chip' + (STATE.likesTab === t.k ? ' active' : '') + '" data-tab="' + t.k + '">' + esc(t.l) + ' <span class="n">' + t.n + '</span></button>'; }).join('') +
        '</div>' +
        (list.length
          ? '<div class="people-grid">' + list.map(function (p, i) {
              var locked = isLikesTab && !unlocked;
              if (locked) {
                return '<div class="person locked" data-lock="1" role="button" tabindex="0" aria-label="Profil réservé aux abonnés">' +
                  '<img src="' + esc(p.photos[0]) + '" alt="" class="blur">' +
                  '<div class="grad"></div>' +
                  '<div class="lock-badge">' + (ICONS.crown || '') + '<span>' + (isFemale() ? 'Abonnez-vous' : 'Débloquer') + '</span></div>' +
                  '<div class="meta"><strong>Profil masqué</strong><small>Abonnez-vous pour voir qui c\'est</small></div>' +
                '</div>';
              }
              var replied = (STATE.likes || []).indexOf(p.id) !== -1;
              var matched = isMatchNow(p.id);
              var statusTag = matched
                ? '<div class="lock-badge" style="left:auto;right:12px;top:12px;background:#059669;">' + (ICONS.heart || '') + '<span>Match</span></div>'
                : replied
                  ? '<div class="lock-badge" style="left:auto;right:12px;top:12px;background:#059669;">' + (ICONS.check || '') + '<span>Liké en retour</span></div>'
                  : '<div class="lock-badge" style="left:auto;right:12px;top:12px;">' + (ICONS.heart || '') + '<span>Vous a liké</span></div>';
              return '<div class="person" data-prof="' + esc(p.id) + '" role="button" tabindex="0">' +
                '<img src="' + esc(p.photos[0]) + '" alt="' + esc(p.name) + '">' +
                '<div class="grad"></div>' + statusTag +
                '<div class="meta"><strong>' + esc(p.name) + ', ' + p.age + (p.is_verified ? ' <span class="verified">' + ICONS.verified + '</span>' : '') + '</strong>' +
                  '<small>' + esc(p.city) + ' · à ' + esc(p.distanceKm) + ' km</small></div>' +
              '</div>';
            }).join('') + '</div>'
            : '<div style="text-align:center;padding:70px 20px;color:var(--ink-3);">' +
                '<div style="width:64px;height:64px;border-radius:50%;background:var(--yamo-soft);display:grid;place-items:center;margin:0 auto 16px;color:var(--yamo);">' + (ICONS.heartO || '') + '</div>' +
                '<h3 style="margin:0 0 8px;color:var(--ink);font-size:18px;font-weight:800;">Rien pour le moment</h3>' +
                '<p style="margin:0;font-size:14px;">Continuez à découvrir des profils pour recevoir des likes.</p>' +
              '</div>') +
        (hiddenCount > 0
          ? '<div class="likes-cta">' +
              '<div class="lc-txt"><strong>' + hiddenCount + ' personne(s) vous ont liké</strong>' +
              '<span>' + (isFemale()
                ? 'Un seul abonnement Femmes et vous voyez tout : qui c\'est, son profil complet, ses photos, et vous pouvez liker en retour.'
                : 'Choisissez une formule : plus elle est longue, plus d\'options sont débloquées.') + '</span></div>' +
              '<button class="btn btn-primary btn-sm" id="likes-go-premium">' + (isFemale() ? 'Voir qui m\'a likée' : 'Voir les formules') + '</button>' +
            '</div>'
          : '');

      $$('[data-tab]', view).forEach(function (b) {
        b.addEventListener('click', function () { STATE.likesTab = b.getAttribute('data-tab'); go('likes'); });
      });

      /* Délégation : la carte masquée n'a pas de listener propre,
         tout passe par le conteneur (évite les conflits d'ordre). */
      /* Délégation sans capture : se déclenche avant les anciens handlers
         posés sur les cartes par le cœur de l'application. */
      view.addEventListener('click', function (ev) {
        var t = ev.target;
        var card = t && t.closest ? t.closest('.person') : null;
        if (!card || !view.contains(card)) return;
        if (/locked/.test(card.className)) {
          ev.preventDefault(); ev.stopImmediatePropagation();
          APP.lockModal(byId(card.getAttribute('data-prof')), 'Likes reçus réservés à l\'abonnement');
          return;
        }
        var id = card.getAttribute('data-prof');
        var p = id ? byId(id) : null;
        if (!p) return;
        ev.preventDefault(); ev.stopImmediatePropagation();
        /* fiche complète : on regarde qui c'est et ses photos avant de liker */
        APP.openFullProfile(p, { fromLikes: true });
      }, true);
      view.addEventListener('keydown', function (ev) {
        if (ev.key !== 'Enter' && ev.key !== ' ') return;
        var card = ev.target.closest ? ev.target.closest('.person') : null;
        if (!card) return;
        ev.preventDefault();
        var p = byId(card.getAttribute('data-prof'));
        if (/locked/.test(card.className)) { lockModal(p, 'Likes reçus réservés à l\'abonnement'); return; }
        if (p) APP.openFullProfile(p, { fromLikes: isLikePanel });
      });
      var lp = $('#likes-go-premium');
      if (lp) lp.addEventListener('click', function () { go('premium'); });
    };

    /* ------------------------------------------------------------
       C. Discussion : aucun accès sans match ni message direct
       ------------------------------------------------------------ */
    APP.startChat = function (p, isMatch) {
      var matched = !!isMatch || isMatchNow(p.id);
      var direct = hasDirectNow(p.id);
      var conv = convOf(p.id);

      if (matched) {
        if (!conv) {
          conv = { id: 'c_' + p.id, profileId: p.id, unread: 0, isMatch: true, messages: [{ from: 'them', text: 'C\'est un match ! 😊 Ravi(e) de faire votre connaissance.', at: nowHM() }] };
          (DEMO.CONVERSATIONS || []).push(conv);
        }
        conv.unread = 0;
        STATE.activeConv = conv.id;
        STATE.chatOpenMobile = true;
        go('messages');
        return;
      }
      if (direct) {
        STATE.activeConv = conv.id; conv.unread = 0;
        STATE.chatOpenMobile = true; go('messages'); return;
      }

      // Ni match ni message direct : on passe par l'écran de paiement unique (app.js)
      openDMPay(p);
    };

    /* Écran unique de paiement du message direct (200 F, ou inclus dans la formule) */
    APP.openDMPay = function (p) {
      var dmIncluded = !!features().directMsg;
      var price = ((DEMO.EXTRAS || []).find(function (x) { return x.id === 'DIRECT_MESSAGE'; }) || {}).price || 200;
      var credits = STATE.extraBalance.DIRECT_MESSAGE || 0;
      var payWhat = (!dmIncluded && credits > 0) ? 0 : (dmIncluded ? 0 : price);
      var root = $('#modal-root');
      root.innerHTML = '' +
        '<div class="modal-bg" id="dm-bg">' +
          '<div class="modal" style="max-width:430px;">' +
            '<h3>' + ICON_LOCK + ' Sans match, pas de discussion</h3>' +
            '<p>Deux façons d\'écrire à ' + esc(p.name) + ' : liker en retour (gratuit, si cette personne vous a déjà liké c\'est un match), ou envoyer un message direct.</p>' +
            '<div style="background:var(--bg-2);border-radius:14px;padding:16px;margin:16px 0;">' +
              '<div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--ink-3);">Message direct</span><strong>' +
                (dmIncluded ? 'Inclus dans votre abonnement' : (credits > 0 ? '1 crédit déjà acheté' : fcfa(price))) + '</strong></div>' +
              '<div style="display:flex;justify-content:space-between;font-size:14px;margin-top:8px;"><span style="color:var(--ink-3);">Like → match</span><strong>Gratuit</strong></div>' +
            '</div>' +
            '<button class="btn btn-primary btn-block" id="dm-pay">' +
              (payWhat === 0 ? 'Ouvrir la discussion' : 'Payer ' + fcfa(payWhat) + ' et écrire') + '</button>' +
            '<button class="btn btn-block" id="dm-open" style="margin-top:8px;">Voir son profil puis liker</button>' +
            '<button class="btn btn-block" id="dm-cancel" style="color:var(--ink-3);margin-top:8px;">Annuler</button>' +
          '</div>' +
        '</div>';
      var close = function () { closeModal(); };
      $('#dm-cancel').addEventListener('click', close);
      $('#dm-bg').addEventListener('click', function (e) { if (e.target.id === 'dm-bg') close(); });
      $('#dm-open').addEventListener('click', function () {
        close();
        APP.openFullProfile(p, { fromLikes: inbound().some(function (x) { return x.id === p.id; }) });
      });
      $('#dm-pay').addEventListener('click', function () {
        var b = $('#dm-pay'); b.disabled = true; b.textContent = 'Paiement en cours…';
        setTimeout(function () {
          if (payWhat > 0) {
            /* Paiement simulé de ce message : aucune trace de crédit à conserver */
          } else if (!dmIncluded && credits > 0) {
            STATE.extraBalance.DIRECT_MESSAGE -= 1;
          }
          var c = convOf(p.id);
          if (!c) {
            c = { id: 'c_' + p.id, profileId: p.id, unread: 0, direct: true, messages: [{ from: 'them', text: 'Bonjour ! Vous m\'avez écrit ? 😊', at: nowHM() }] };
            (DEMO.CONVERSATIONS || []).push(c);
          } else { c.direct = true; }
          c.unread = 0;
          STATE.activeConv = c.id;
          STATE.chatOpenMobile = true;
          STATE.openAfterDM = true;
          close(); saveMe(); renderNav();
          toast('Discussion ouverte avec ' + p.name + '.');
          go('messages');
        }, 700);
      });
    };

    /* Écran d'achat du Super Like (500 F), utilisé partout où un Super Like
       est demandé sans crédit disponible. */
    window.YamoObtenirSuperPay = APP.openSuperPay = function (p) {
      var price = ((DEMO.EXTRAS || []).find(function (x) { return x.id === 'SUPER_LIKE'; }) || {}).price || 500;
      var root = $('#modal-root');
      root.innerHTML = '' +
        '<div class="modal-bg" id="sl-bg">' +
          '<div class="modal" style="max-width:430px;">' +
            '<h3>' + ICONS.star + ' Un Super Like pour ' + esc(p.name) + '</h3>' +
            '<p>Vous n\'avez plus de Super Like. Un Super Like place votre profil en tête de sa file d\'attente et double vos chances de match.</p>' +
            '<div style="background:var(--bg-2);border-radius:14px;padding:16px;margin:16px 0;display:flex;justify-content:space-between;font-size:14px;">' +
              '<span style="color:var(--ink-3);">Super Like (1 unité)</span><strong>' + fcfa(price) + '</strong>' +
            '</div>' +
            '<button class="btn btn-primary btn-block" id="sl-pay">Payer ' + fcfa(price) + ' et envoyer</button>' +
            '<button class="btn btn-block" id="sl-cancel" style="color:var(--ink-3);margin-top:8px;">Plus tard</button>' +
          '</div>' +
        '</div>';
      var close = function () { closeModal(); };
      $('#sl-cancel').addEventListener('click', close);
      $('#sl-bg').addEventListener('click', function (e) { if (e.target.id === 'sl-bg') close(); });
      $('#sl-pay').addEventListener('click', function () {
        var b = $('#sl-pay'); b.disabled = true; b.textContent = 'Paiement en cours…';
        setTimeout(function () {
          /* Paiement simulé : le Super Like est consommé immédiatement */
          var fl = features();
          var dispo = (STATE.extraBalance.SUPER_LIKE || 0) > 0;
          if (!dispo && !fl.seeLikes) {
            STATE.extraBalance.SUPER_LIKE = (STATE.extraBalance.SUPER_LIKE || 0);
          }
          var wasMatched = (STATE.likes || []).indexOf(p.id) === -1 && inbound().some(function (x) { return x.id === p.id; });
          if ((STATE.likes || []).indexOf(p.id) === -1) STATE.likes.push(p.id);
          var givesMatch = wasMatched;
          if (givesMatch && STATE.matches.indexOf(p.id) === -1) STATE.matches.push(p.id);
          saveMe(); close(); renderNav();
          if (STATE.page === 'discover') refreshDeck();
          if (givesMatch) { showMatch(p); }
          else { STATE.superSent = STATE.superSent || []; if (STATE.superSent.indexOf(p.id) === -1) STATE.superSent.push(p.id); saveMe(); toast('Super Like envoyé à ' + p.name + ' !'); }
          if (STATE.page === 'likes') go('likes');
        }, 700);
      });
    };

    /* ------------------------------------------------------------
       D. Abonnements : Femmes (une seule formule) / Hommes (paliers)
       ------------------------------------------------------------ */
    APP.viewPremium = function (view) {
      var me = STATE.myProfile;
      var wp = DEMO.WOMEN_SUBSCRIPTION || {};
      var fem = isFemale();
      var actif = hasWomenPlanLocal();
      var expire = !actif && me.premium_plan === 'FEMALE_UNIQUE' && !!me.premium_until;
      var lvl = APP.myLevel();

      view.innerHTML = '' +
        '<div style="max-width:1000px;">' +
          '<div class="prem-hero">' +
            '<span class="ph-tag">' + (ICONS.crown || '') + ' Yamo Premium</span>' +
            '<h2>' + (fem ? 'Un abonnement unique, tout est débloqué' : 'Plus d\'options selon votre formule') + '</h2>' +
            '<p>' + (fem
              ? 'Une seule formule pour les femmes, à ' + fcfa(wp.price || 3000) + ' par mois : voir qui vous a likée, ouvrir les profils complets et toutes les photos, répondre à tous vos likes, mode invisible. Le Super Like et le message direct s\'achètent à l\'unité.'
              : 'Voyez qui vous a liké, ouvrez les profils complets, likez en retour pour créer un match et discutez. Plus la formule est longue, plus d\'options sont débloquées.') + '</p>' +
          '</div>' +

          // Rappel des règles, toujours visible
          '<div class="rule-note" id="prem-rules">' +
            '<strong>' + ICON_LOCK + ' Les règles, en clair</strong>' +
            '<ul class="rule-steps">' +
              '<li><b>Discussion :</b> uniquement avec un <b>match</b> (like réciproque). Sans match, seul le <b>message direct</b> permet d\'écrire.</li>' +
              '<li><b>Likes reçus :</b> visibles avec un abonnement actif. Vous ouvrez le <b>profil complet</b>, ses <b>photos</b>, puis vous likez en retour.</li>' +
              '<li><b>Femmes :</b> un seul abonnement de ' + fcfa(wp.price || 3000) + ' par mois : likes reçus, mode invisible, communautés. Le Super Like et le message direct restent payants à l\'unité.</li>' +
              '<li><b>Hommes :</b> 4 formules. Les avantages s\'additionnent, la plus longue ouvre le plus d\'options.</li>' +
            '</ul>' +
          '</div>' +

          '<div id="trial-box" class="trial-box">' +
            (me.trial_used
              ? '<div class="tb-used">' + (ICONS.check || '') + ' Votre essai gratuit de ' + DEMO.TRIAL_DAYS + ' jours a déjà été utilisé.</div>'
              : '<strong>0 F — ' + DEMO.TRIAL_DAYS + ' jours d\'essai gratuit</strong>' +
                '<p>Testez les options Premium sans payer. Aucun prélèvement, l\'essai s\'arrête tout seul au bout de ' + DEMO.TRIAL_DAYS + ' jours.</p>' +
                '<button class="btn btn-primary btn-sm" id="start-trial">Démarrer mon essai gratuit</button>') +
          '</div>' +

          (fem
            ? (expire ? '<div class="wb-expired" id="wb-expired" style="margin:0 0 20px;padding:16px 18px;border-radius:14px;background:#fff7ed;border:1.5px solid #fdba74;font-size:13.5px;color:#9a3412;font-weight:600;">Votre abonnement est arrivé à échéance le ' + new Date(me.premium_until).toLocaleDateString('fr-FR') + '. Renouvelez pour retrouver vos options.</div>' : '') +
            '<div class="women-box" id="women-box">' +
                '<div class="wb-head">' +
                  '<span class="wb-tag">' + (ICONS.heart || '') + ' Formule Femmes — unique</span>' +
                  '<h3>Un seul abonnement de ' + fcfa(wp.price || 3000) + ' par mois</h3>' +
                  '<div class="wb-price">' + fcfa(wp.price || 3000) + ' <small>/ mois</small></div>' +
                  '<p>Pas de choix compliqué, pas de paliers : la même formule pour toutes les femmes.</p>' +
                '</div>' +
                '<ul>' + (wp.perks || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
                '<div class="wb-extra">' +
                  '<strong>Payable à l\'unité, quand vous en avez besoin</strong>' +
                  '<ul>' + (wp.notIncluded || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
                '</div>' +
                '<button class="btn btn-primary btn-block" data-buy="FEMALE_UNIQUE"' + (actif ? ' disabled' : '') + '>' + (actif ? 'Abonnement actif' : (expire ? 'Me réabonner — ' + fcfa(wp.price || 3000) + ' / mois' : 'S\'abonner — ' + fcfa(wp.price || 3000) + ' / mois')) + '</button>' +
                (actif ? '<div class="wb-ok">' + (ICONS.check || '') + " Actif jusqu'au " + new Date(me.premium_until).toLocaleDateString('fr-FR') + ' · renouvellement mensuel</div>' : '') +
              '</div>'
            : '<div class="pricing-grid" id="plans-grid">' +
                (DEMO.PLANS || []).map(function (p) {
                  var best = p.id === 'BIANNUAL';
                  var cur = me.is_premium && me.premium_plan === p.id;
                  return '<div class="plan' + (best ? ' best' : '') + (cur ? ' current' : '') + '">' +
                    (best ? '<span class="tag">Le plus choisi</span>' : '') +
                    '<span class="plan-level">' + esc((p.features || {}).label || '') + '</span>' +
                    '<h4>' + esc(p.label) + '</h4>' +
                    '<div class="price">' + fcfa(p.price) + '</div>' +
                    '<div class="per">soit ' + fcfa(Math.round(p.price / (p.days / 30))) + ' / mois</div>' +
                    '<div class="per" style="font-size:11.5px;color:var(--ink-3);">' + p.days + ' jours · ' + fcfa(Math.round(p.price / p.days)) + ' par jour</div>' +
                    '<ul>' + (p.perks || []).map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul>' +
                    '<button class="btn ' + (best ? 'btn-primary' : 'btn-ghost') + ' btn-block" data-buy="' + esc(p.id) + '">' + (cur ? 'Formule actuelle' : 'Choisir') + '</button>' +
                  '</div>';
                }).join('') +
              '</div>' +
              '<div class="levels-note">' +
                '<strong>Ce que débloque chaque formule (les avantages s\'additionnent)</strong>' +
                '<table class="levels-table">' +
                  '<thead><tr><th>Formule</th><th>Prix</th><th>Likes reçus</th><th>Profil complet</th><th>Photos</th><th>Réponses aux likes</th><th>Autres</th></tr></thead>' +
                  '<tbody>' +
                    '<tr><td><b>1 mois</b><small>Essentiel</small></td><td>' + fcfa(3000) + '</td><td>1 seul</td><td>Oui</td><td>Photo principale</td><td>1</td><td>—</td></tr>' +
                    '<tr><td><b>3 mois</b><small>Confort</small></td><td>' + fcfa(9000) + '</td><td>Tous</td><td>Oui</td><td>Toutes</td><td>5</td><td>Badge, communautés</td></tr>' +
                    '<tr><td><b>6 mois</b><small>Avancé</small></td><td>' + fcfa(15000) + '</td><td>Tous</td><td>Oui</td><td>Toutes</td><td>Illimitées</td><td>Mode invisible, 2 boosts</td></tr>' +
                    '<tr><td><b>12 mois</b><small>Intégral</small></td><td>' + fcfa(30000) + '</td><td>Tous</td><td>Oui</td><td>Toutes</td><td>Illimitées</td><td>Mode invisible, 5 boosts</td></tr>' +
                  '</tbody>' +
                '</table>' +
              '</div>') +

          '<div id="boost-box" style="margin-top:44px;padding:24px 26px;border:1px solid var(--line);border-radius:20px;background:#fff;">' +
            '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">' +
              '<span style="width:20px;height:20px;display:inline-block;color:var(--yamo);">' + (ICONS.zap || '') + '</span>' +
              '<h3 style="font-size:18px;font-weight:800;margin:0;">Booster mon profil</h3>' +
            '</div>' +
            '<p style="color:var(--ink-3);font-size:13.5px;margin:0 0 16px;">Un profil boosté passe devant les autres dans « Découvrir » : votre carte revient dans le paquet des personnes qui ne vous ont pas encore vues.</p>' +
            (boostCard(me) ? "<div style=\"display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap;padding:14px 16px;border-radius:14px;background:var(--yamo-soft);margin-bottom:18px;\"><div style=\"font-size:14px;font-weight:700;color:var(--ink-2);\">Votre profil est boosté : " + boostCard(me) + "</div><button class=\"btn btn-ghost btn-sm\" id=\"boost-off\">Arrêter le boost</button></div>" : '') +
            '<div class="extras" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr));">' +
              (DEMO.EXTRAS || []).filter(function (x) { return !!BOOST_MS[x.id]; }).map(function (x) {
                return '<div class="extra" style="background:#fff;border:1px solid var(--line);">' +
                  '<strong>' + esc(x.label) + '</strong><div class="p">' + fcfa(x.price) + '</div>' +
                  '<span style="margin-bottom:12px;">' + esc(x.desc) + '</span>' +
                  '<button class="btn btn-ghost btn-sm btn-block" data-buy="' + esc(x.id) + '">Booster</button></div>';
              }).join('') +
            '</div>' +
          '</div>' +

          '<h3 style="font-size:18px;font-weight:800;margin:44px 0 6px;">Autres achats à l\'unité</h3>' +
          '<p style="color:var(--ink-3);font-size:14px;margin:0 0 20px;">Payez uniquement ce dont vous avez besoin.</p>' +
          '<div class="extras" style="grid-template-columns:repeat(auto-fill,minmax(200px,1fr));">' +
            (DEMO.EXTRAS || []).filter(function (x) { return !BOOST_MS[x.id]; }).map(function (x) {
              return '<div class="extra" style="background:#fff;border:1px solid var(--line);">' +
                '<strong>' + esc(x.label) + '</strong><div class="p">' + fcfa(x.price) + '</div>' +
                '<span style="margin-bottom:12px;">' + esc(x.desc) + '</span>' +
                '<button class="btn btn-ghost btn-sm btn-block" data-buy="' + esc(x.id) + '">Acheter</button></div>';
            }).join('') +
          '</div>' +
          '<div class="pay-note">Paiement sécurisé par carte bancaire ou mobile money. Abonnement sans engagement, résiliable à tout moment depuis votre compte.</div>' +
        '</div>';

      var off = $('#boost-off');
      if (off) off.addEventListener('click', function () {
        removeBoostLocal(STATE.myProfile);
        toast('Boost arrêté. Vous réapparaissez à votre place habituelle.');
        go('premium');
      });

      var tb = $('#start-trial');
      if (tb) tb.addEventListener('click', function () {
        if (STATE.myProfile.trial_used || STATE.myProfile.is_premium) return;
        var fin = new Date(); fin.setDate(fin.getDate() + (DEMO.TRIAL_DAYS || 7));
        STATE.myProfile.trial_used = true;
        STATE.myProfile.trial_ends = fin.toISOString();
        STATE.myProfile.is_premium = true;
        STATE.myProfile.premium_plan = 'TRIAL';
        STATE.myProfile.premium_until = fin.toISOString();
        saveMe(); renderMeMini(); renderNav();
        toast('Essai gratuit de ' + (DEMO.TRIAL_DAYS || 7) + ' jours démarré. Tout est débloqué !');
        go('premium');
      });

      $$('[data-buy]', view).forEach(function (b) {
        b.addEventListener('click', function () {
          var id = b.getAttribute('data-buy');
          var all = (DEMO.PLANS || []).concat(DEMO.EXTRAS || []).concat([DEMO.WOMEN_SUBSCRIPTION]);
          openPayLocal(all.find(function (x) { return x && x.id === id; }));
        });
      });
    };

    var BOOST_MS = { BOOST_1D: 864e5, BOOST_3D: 3 * 864e5, BOOST_7D: 7 * 864e5 };
    function boostCard(p) {
      if (!p || !p.boost_until) return '';
      var ms = new Date(p.boost_until).getTime() - Date.now();
      if (ms <= 0) return '';
      var h = Math.max(1, Math.floor(ms / 36e5));
      var d = Math.floor(h / 24);
      return d >= 1 ? (d + ' jour' + (d > 1 ? 's' : '') + ' restant' + (d > 1 ? 's' : '')) : (h + ' h restantes');
    }
    function activateBoostLocal(p, id) {
      var d = new Date(); d.setTime(d.getTime() + (BOOST_MS[id] || BOOST_MS.BOOST_1D));
      p.boost_until = d.toISOString();
      if (!Array.isArray(STATE.boosted)) STATE.boosted = [];
      if (STATE.boosted.indexOf(p.id) === -1) STATE.boosted.push(p.id);
      saveMe();
    }
    function removeBoostLocal(p) {
      p.boost_until = null;
      STATE.boosted = (STATE.boosted || []).filter(function (x) { return x !== p.id; });
      saveMe();
    }

    function hasWomenPlanLocal() {
      return !!(STATE.myProfile.is_premium && STATE.myProfile.premium_plan === 'FEMALE_UNIQUE');
    }

    /* Paiement (simulation en mode démonstration) */
    function openPayLocal(item) {
      if (!item) return;
      var fem = item.id === 'FEMALE_UNIQUE';
      var isPlan = fem || (DEMO.PLANS || []).some(function (x) { return x.id === item.id; });
      var root = $('#modal-root');
      root.innerHTML = '' +
        '<div class="modal-bg" id="pay-bg">' +
          '<div class="modal" style="max-width:420px;">' +
            '<h3>' + esc(item.label) + '</h3>' +
            '<p>' + esc(item.desc || 'Abonnement Yamo Premium') + '</p>' +
            '<div style="background:var(--bg-2);border-radius:14px;padding:18px;margin-bottom:18px;">' +
              '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Montant</span><strong>' + fcfa(item.price) + '</strong></div>' +
              (isPlan ? '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Durée</span><strong>' + (fem ? '1 mois' : (item.days + ' jours')) + '</strong></div>' : '') +
              (fem ? '<div style="display:flex;justify-content:space-between;font-size:14px;margin-bottom:8px;"><span style="color:var(--ink-3);">Renouvellement</span><strong>Chaque mois</strong></div>' : '') +
              '<div style="display:flex;justify-content:space-between;font-size:14px;"><span style="color:var(--ink-3);">Moyen de paiement</span><strong>Carte ou mobile money</strong></div>' +
            '</div>' +
            '<button class="btn btn-primary btn-block" id="pay-now">Payer ' + fcfa(item.price) + '</button>' +
            '<button class="btn btn-block" style="color:var(--ink-3);margin-top:8px;" id="pay-cancel">Annuler</button>' +
            (fem ? '<p style="font-size:12px;color:var(--ink-3);margin:12px 0 0;">Votre abonnement de ' + fcfa(item.price) + ' est valable 1 mois. À la fin du mois, vous choisissez de le renouveler ou de l\'arrêter. Le Super Like et le message direct restent payables séparément.</p>' : '') +
            '<p style="font-size:11.5px;color:var(--ink-3);margin:16px 0 0;text-align:center;">Paiement traité par Paystack. Aucune donnée bancaire n\'est stockée par Yamo.</p>' +
          '</div>' +
        '</div>';
      $('#pay-cancel').addEventListener('click', closeModal);
      $('#pay-bg').addEventListener('click', function (e) { if (e.target.id === 'pay-bg') closeModal(); });
      $('#pay-now').addEventListener('click', function () {
        var btn = $('#pay-now'); btn.disabled = true; btn.textContent = 'Paiement en cours…';
        setTimeout(function () {
          if (isPlan) {
            STATE.myProfile.is_premium = true;
            if (fem) STATE.myProfile.gender = 'FEMALE';
            STATE.myProfile.premium_plan = item.id;
            var d = new Date(); d.setDate(d.getDate() + (Number(item.days) || 30));
            STATE.myProfile.premium_until = d.toISOString();
            var fbf = ((item.features || {}).boosts) || 0;
            if (fbf > 0) STATE.extraBalance.BOOST_1D = (STATE.extraBalance.BOOST_1D || 0) + fbf;
          } else if (BOOST_MS[item.id]) {
            activateBoostLocal(STATE.myProfile, item.id);
          } else {
            STATE.extraBalance[item.id] = (STATE.extraBalance[item.id] || 0) + 1;
          }
          saveMe(); renderMeMini(); renderNav(); closeModal();
          toast(isPlan
            ? (fem ? 'Abonnement Femmes activé : ' + fcfa(item.price) + ' pour 1 mois. Il s\'arrête à la date indiquée, pensez à le renouveler.' : 'Abonnement activé ! Toutes les options de votre formule sont ouvertes.')
            : item.label + ' ajouté à votre compte.');
          go('premium');
        }, 1000);
      });
    }

    function nowHM() {
      var d = new Date();
      return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0');
    }

    /* ------------------------------------------------------------
       E. Écran Messages : bandeau des personnes en attente de match
       ------------------------------------------------------------ */
    var baseViewMessages = APP.viewMessages;
    if (typeof baseViewMessages === 'function') {
      APP.viewMessages = function (view) {
        baseViewMessages(view);
        var head = $('.chat-list', view);
        if (!head) return;
        var waiting = inbound().filter(function (p) { return !isMatchNow(p.id) && !hasDirectNow(p.id); });
        var f = features();
        if (!waiting.length) return;
        var box = document.createElement('div');
        box.className = 'chat-lock';
        box.innerHTML = '<strong>' + ICON_LOCK + ' Pas encore de discussion</strong>' +
          '<p>' + (f.seeAllLikes
            ? esc(waiting.map(function (p) { return p.name; }).join(', ')) + ' vous ' + (waiting.length > 1 ? 'ont liké' : 'a liké') + '. Ouvrez son profil, regardez ses photos et likez en retour : le match crée la discussion.'
            : 'Des personnes vous ont liké. Pour voir qui, ouvrir leur profil et liker en retour, il faut un abonnement.') + '</p>' +
          '<button class="btn btn-primary btn-sm" id="go-likes">Voir qui m\'a liké (' + waiting.length + ')</button>';
        var old = $('.chat-lock', head);
        if (old) old.remove();
        head.appendChild(box);
        var btn = box.querySelector('#go-likes');
        /* Gratuit : on montre d'abord les likes reçus (profils masqués), la
           formule unique ou les paliers sont proposés depuis cet écran. */
        if (btn) btn.addEventListener('click', function () { STATE.likesTab = 'received'; go('likes'); });
      };
    }

    if (location.hash === '#messages') go('messages');
  });
})();

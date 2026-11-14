/* ============================================================
   YAMO — Connexion & inscription
   Deux méthodes : e-mail + mot de passe, ou numéro de téléphone
   avec un code à 6 chiffres envoyé sur WhatsApp.
   ============================================================ */

(function () {
  'use strict';

  const CFG = window.YAMO_CONFIG || {};
  const DEMO = CFG.DEMO_MODE !== false;

  /* ---------- Sécurité : échappement HTML ---------- */
  const esc = (s) => String(s == null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;').replace(/'/g, '&#39;');

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => Array.from((r || document).querySelectorAll(s));

  function toast(msg) {
    const el = $('#toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(el._t);
    el._t = setTimeout(() => el.classList.remove('show'), 3000);
  }

  /* ---------- État ---------- */
  let mode = 'login';       // login | signup
  let method = 'email';     // email | phone
  let otpStep = false;      // false = saisie du numéro, true = saisie du code
  let resendLeft = 0;
  let resendTimer = null;
  let busy = false;

  /* ---------- Pays & villes ---------- */
  var CO = window.YAMO_COUNTRIES || { options: function () { return ''; }, cityOptions: function () { return ''; }, cities: function () { return []; }, get: function () { return null; }, byDial: function () { return null; }, name: function () { return ''; } };

  function fillCountries(sel, citySel, hintId, freeId) {
    if (!sel) return;
    var keep = sel.value || 'CI';
    sel.innerHTML = CO.options(keep, false);
    fillCities(sel, citySel, hintId, freeId);
  }

  function fillCities(sel, citySel, hintId, freeId) {
    if (!citySel) return;
    var list = CO.cities(sel.value);
    citySel.innerHTML = CO.cityOptions(sel.value, list.length ? list[0] : '');
    var hint = hintId ? $('#' + hintId) : null;
    var free = freeId ? $('#' + freeId) : null;
    if (list.length) {
      citySel.style.display = '';
      if (hint) hint.style.display = 'none';
      if (free) free.value = '';
    } else {
      citySel.style.display = 'none';
      if (hint) hint.style.display = 'block';
    }
  }

  function chosenCity(citySel, freeId, countrySel) {
    var code = countrySel ? countrySel.value : 'CI';
    var list = CO.cities(code);
    if (citySel && list.length && !citySel.value) citySel.value = list[0];
    if (list.length) return citySel ? citySel.value : '';
    if (citySel && citySel.value) return citySel.value;
    var f = freeId ? $('#' + freeId) : null;
    return f ? (f.value || '').trim() : '';
  }

  /* Enregistre le compte dans l'espace administrateur : chaque inscrit y apparait */
  function registerAccount() {
    try {
      var ACC = 'yamo_accounts_v1';
      var list = JSON.parse(localStorage.getItem(ACC) || '[]');
      var phone = $('#phone') ? fullPhone() : '';
      var email = $('#email') ? ($('#email').value || '').trim() : '';
      var key = phone || email;
      var name = (($('#ph-name') && $('#ph-name').value) || ($('#name') && $('#name').value) || '').trim();
      var gender = (($('#ph-gender') && $('#ph-gender').value) || ($('#em-gender') && $('#em-gender').value) || '').toUpperCase();
      var cSel = method === 'phone' ? $('#ph-country') : $('#em-country');
      var citySel = method === 'phone' ? $('#ph-city') : $('#em-city');
      var freeId = method === 'phone' ? 'ph-city-free' : 'em-city-free';
      var countryCode = cSel ? cSel.value : 'CI';
      var city = chosenCity(citySel, freeId, cSel);
      var found = false;
      for (var i = 0; i < list.length; i++) {
        if ((phone && list[i].phone === phone) || (email && list[i].email === email)) { found = true; }
      }
      if (!found) {
        list.push({
          id: 'acc' + Date.now().toString(36),
          phone: phone,
          email: email,
          name: name || ('Compte ' + (key || '').slice(-4)),
          gender: gender,
          country: CO.name(countryCode),
          country_code: countryCode,
          city: city,
          createdAt: new Date().toISOString(),
          is_verified: false,
          is_premium: false
        });
        localStorage.setItem(ACC, JSON.stringify(list));
        if (window.YamoAnalytics) window.YamoAnalytics.trackSignup();
      }
      /* Le profil de l application reprend immediatement ces informations */
      var prev = {};
      try { prev = JSON.parse(localStorage.getItem('yamo_me_v1') || '{}') || {}; } catch (e) { prev = {}; }
      var merged = Object.assign({}, prev, {
        name: name || prev.name || 'Vous',
        gender: gender || prev.gender || 'MALE',
        country: CO.name(countryCode),
        country_code: countryCode,
        city: city,
        phone: phone || prev.phone || '',
        email: email || prev.email || ''
      });
      localStorage.setItem('yamo_me_v1', JSON.stringify(merged));
      return { city: city, gender: gender };
    } catch (e) { return null; }
  }

  /* ---------- Nettoyage du num\u00e9ro ---------- */
  function fullPhone() {
    const cc = $('#country').value;
    const raw = ($('#phone').value || '').replace(/[^0-9]/g, '');
    let digits = raw;
    if (cc === '+225') {
      /* Côte d'Ivoire : le 0 de tête est l'ancienne présentation du numéro */
      if (digits.length === 10 && digits.charAt(0) === '0') digits = digits.slice(1);
    } else if (digits.charAt(0) === '0') {
      /* Ailleurs : le 0 de tête est un préfixe national, jamais conservé à l'international.
         Un numéro français 06 12 34 56 78 devient donc +33 6 12 34 56 78. */
      digits = digits.replace(/^0+/, '');
    }
    return cc + digits;
  }

  function phoneValid() {
    const cc = $('#country').value;
    const raw = ($('#phone').value || '').replace(/[^0-9]/g, '');
    /* En Côte d'Ivoire : 10 chiffres, ou 8 chiffres pour les anciens numéros
       (qui deviennent 10 en ajoutant 01, 05 ou 07). */
    if (cc === '+225') return raw.length === 10 || raw.length === 8;
    return raw.length >= 7 && raw.length <= 15;
  }

  /* ---------- Bascule e-mail / téléphone ---------- */
  function setMethod(m) {
    method = m;
    $$('#method-switch button').forEach((b) => b.classList.toggle('active', b.getAttribute('data-method') === m));
    $('#form-email').style.display = m === 'email' ? 'block' : 'none';
    $('#form-phone').style.display = m === 'phone' ? 'block' : 'none';
    resetOtp();
    updateTexts();
  }

  /* ---------- Bascule connexion / inscription ---------- */
  function setMode(m) {
    mode = m;
    $$('#auth-tabs button').forEach((b) => b.classList.toggle('active', b.getAttribute('data-mode') === m));
    $('#f-name').style.display = m === 'signup' ? 'block' : 'none';
    $('#f-confirm').style.display = m === 'signup' ? 'block' : 'none';
    $('#pw-hint').style.display = m === 'signup' ? 'block' : 'none';
    $('#fp-name').style.display = m === 'signup' ? 'block' : 'none';
    ['#fp-gender', '#fp-loc', '#fe-gender', '#fe-loc'].forEach((sel) => {
      const el = $(sel); if (el) el.style.display = m === 'signup' ? 'block' : 'none';
    });
    $('#password').setAttribute('autocomplete', m === 'signup' ? 'new-password' : 'current-password');
    resetOtp();
    updateTexts();
  }

  function updateTexts() {
    const signup = mode === 'signup';
    if (method === 'email') {
      $('#auth-title').textContent = signup ? 'Créez votre compte Yamo' : 'Bon retour parmi nous';
      $('#auth-sub').textContent = signup
        ? 'Quelques secondes suffisent. 7 jours d\'essai gratuit inclus.'
        : 'Connectez-vous pour retrouver vos matchs et vos conversations.';
      $('#submit-email').textContent = signup ? 'Créer mon compte' : 'Se connecter';
    } else {
      $('#auth-title').textContent = signup ? 'Créez votre compte Yamo' : 'Connexion par téléphone';
      $('#auth-sub').textContent = signup
        ? 'Avec votre numéro de téléphone. Aucun mot de passe à retenir.'
        : 'Connectez-vous avec votre numéro, sans mot de passe.';
      if (!otpStep) {
        $('#submit-phone').textContent = signup ? 'Créer mon compte par WhatsApp' : 'Recevoir le code sur WhatsApp';
      }
    }
  }

  /* ---------- Gestion du code OTP ---------- */
  function resetOtp() {
    otpStep = false;
    const zone = $('#otp-zone');
    if (zone) zone.style.display = 'none';
    const change = $('#change-num');
    if (change) change.style.display = 'none';
    const btn = $('#submit-phone');
    if (btn) btn.style.display = 'block';
    const inputs = $$('#otp-inputs input');
    inputs.forEach((i) => { i.value = ''; i.disabled = false; });
    // le numéro doit rester modifiable quand on quitte l'étape du code
    const ph = $('#phone');
    if (ph) ph.removeAttribute('readonly');
    const cy = $('#country');
    if (cy) cy.removeAttribute('disabled');
    clearInterval(resendTimer);
    resendLeft = 0;
    const r = $('#resend');
    if (r) r.disabled = true;
    const rt = $('#resend-timer');
    if (rt) rt.textContent = '';
  }

  function startResendCooldown(seconds) {
    resendLeft = seconds;
    const r = $('#resend');
    const rt = $('#resend-timer');
    if (r) r.disabled = true;
    clearInterval(resendTimer);
    const tick = () => {
      if (resendLeft <= 0) {
        clearInterval(resendTimer);
        if (r) r.disabled = false;
        if (rt) rt.textContent = '';
        return;
      }
      if (rt) rt.textContent = 'dans ' + resendLeft + ' s';
      resendLeft -= 1;
    };
    tick();
    resendTimer = setInterval(tick, 1000);
  }

  function showOtpZone() {
    otpStep = true;
    const phone = fullPhone();
    $('#otp-phone').textContent = phone;
    $('#otp-zone').style.display = 'block';
    $('#submit-phone').textContent = 'Vérifier le code';
    $('#change-num').style.display = 'block';
    $('#phone').setAttribute('readonly', 'readonly');
    $('#country').setAttribute('disabled', 'disabled');
    const first = $('#otp-inputs input');
    if (first) setTimeout(() => first.focus(), 120);
    startResendCooldown(30);
  }

  function otpCode() {
    return $$('#otp-inputs input').map((i) => i.value.trim()).join('');
  }

  /* ---------- Envoi du code ---------- */
  async function sendCode() {
    if (busy) return;
    if (!phoneValid()) {
      return toast('Veuillez saisir un numéro de téléphone valide.');
    }
    if (mode === 'signup') {
      if (!$('#ph-gender').value) return toast('Indiquez si vous êtes un homme ou une femme.');
      if (!chosenCity($('#ph-city'), 'ph-city-free', $('#ph-country'))) return toast('Choisissez votre ville.');
    }

    busy = true;
    const btn = $('#submit-phone');
    const old = btn.textContent;
    btn.textContent = 'Envoi en cours…';
    btn.disabled = true;

    try {
      if (DEMO) {
        await new Promise((r) => setTimeout(r, 900));
        showOtpZone();
        toast('Code de démonstration : 123456');
        return;
      }

      const res = await fetch((CFG.API_BASE_URL || '').replace(/\/$/, '') + '/api/auth/phone/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone(), purpose: mode === 'signup' ? 'SIGNUP' : 'LOGIN' }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error === 'too_many_requests'
          ? 'Trop de tentatives. Réessayez dans quelques minutes.'
          : 'Envoi impossible. Vérifiez votre numéro et réessayez.');
      }
      showOtpZone();
      toast('Code envoyé sur WhatsApp.');
    } catch (e) {
      toast(e.message || 'Une erreur est survenue.');
    } finally {
      busy = false;
      btn.disabled = false;
      if (!otpStep) btn.textContent = old;
    }
  }

  /* ---------- Vérification du code ---------- */
  async function verifyCode() {
    if (busy) return;
    const code = otpCode();
    if (code.length !== 6) return toast('Saisissez les 6 chiffres du code.');

    busy = true;
    const btn = $('#submit-phone');
    btn.textContent = 'Vérification…';
    btn.disabled = true;

    try {
      if (DEMO) {
        await new Promise((r) => setTimeout(r, 800));
        if (code !== '123456') {
          toast('Code incorrect. En démonstration, utilisez 123456.');
          return;
        }
        // Chaque numéro différent = un nouvel inscrit (compté dans l'espace administrateur)
        registerAccount();
        toast('Numéro vérifié. Bienvenue sur Yamo !');
        setTimeout(() => { window.location.href = 'app.html'; }, 900);
        return;
      }

      const res = await fetch((CFG.API_BASE_URL || '').replace(/\/$/, '') + '/api/auth/phone/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: fullPhone(),
          code,
          name: ($('#ph-name').value || '').trim() || undefined,
          purpose: mode === 'signup' ? 'SIGNUP' : 'LOGIN',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error === 'invalid_code' || data.error === 'code_expired'
          ? 'Code incorrect ou expiré. Demandez un nouveau code.'
          : 'Connexion impossible. Réessayez.');
      }
      toast('Connexion réussie.');
      window.location.href = 'app.html';
    } catch (e) {
      toast(e.message || 'Une erreur est survenue.');
    } finally {
      busy = false;
      btn.disabled = false;
    }
  }

  /* ---------- Démarrage ---------- */
  document.addEventListener('DOMContentLoaded', () => {
    const tabs = $('#auth-tabs');
    if (!tabs) return;

    $$('button', tabs).forEach((b) => b.addEventListener('click', () => setMode(b.getAttribute('data-mode'))));
    $$('#method-switch button').forEach((b) => b.addEventListener('click', () => setMethod(b.getAttribute('data-method'))));

    /* --- Formulaire e-mail --- */
    $('#form-email').addEventListener('submit', (e) => {
      e.preventDefault();
      const email = $('#email').value.trim();
      const pw = $('#password').value;

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return toast('Veuillez saisir une adresse e-mail valide.');
      if (pw.length < 6) return toast('Le mot de passe doit contenir au moins 6 caractères.');
      if (mode === 'signup' && pw !== $('#confirm').value) return toast('Les deux mots de passe ne correspondent pas.');

      if (mode === 'signup') {
        if (!$('#em-gender').value) return toast('Indiquez si vous êtes un homme ou une femme.');
        if (!chosenCity($('#em-city'), 'em-city-free', $('#em-country'))) return toast('Choisissez votre ville.');
      }

      if (DEMO) {
        if (mode === 'signup') registerAccount();
        toast(mode === 'signup' ? 'Compte de démonstration créé. Bienvenue sur Yamo !' : 'Bienvenue sur Yamo !');
        setTimeout(() => { window.location.href = 'app.html'; }, 900);
        return;
      }

      fetch((CFG.API_BASE_URL || '').replace(/\/$/, '') + (mode === 'signup' ? '/api/auth/signup' : '/api/auth/login'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password: pw, name: ($('#name').value || '').trim() || undefined }),
      }).then(async (r) => {
        const d = await r.json().catch(() => ({}));
        if (!r.ok) throw new Error(d.error || 'Connexion impossible.');
        window.location.href = 'app.html';
      }).catch((err) => toast(err.message || 'Une erreur est survenue.'));
    });

    /* --- Formulaire téléphone --- */
    $('#form-phone').addEventListener('submit', (e) => {
      e.preventDefault();
      if (otpStep) verifyCode();
      else sendCode();
    });

    $('#change-num').addEventListener('click', () => {
      resetOtp();
      $('#phone').removeAttribute('readonly');
      $('#country').removeAttribute('disabled');
      updateTexts();
    });

    $('#resend').addEventListener('click', () => {
      if (resendLeft > 0) return;
      sendCode();
      if (otpStep) startResendCooldown(30);
    });

    /* --- Saisie du code : 6 cases --- */
    const inputs = $$('#otp-inputs input');
    inputs.forEach((inp, idx) => {
      inp.addEventListener('input', () => {
        inp.value = inp.value.replace(/[^0-9]/g, '').slice(0, 1);
        if (inp.value && idx < inputs.length - 1) inputs[idx + 1].focus();
        if (otpCode().length === 6) verifyCode();
      });
      inp.addEventListener('keydown', (ev) => {
        if (ev.key === 'Backspace' && !inp.value && idx > 0) inputs[idx - 1].focus();
      });
      inp.addEventListener('paste', (ev) => {
        ev.preventDefault();
        const text = (ev.clipboardData || window.clipboardData).getData('text').replace(/[^0-9]/g, '').slice(0, 6);
        text.split('').forEach((ch, i) => { if (inputs[i]) inputs[i].value = ch; });
        if (text.length === 6) verifyCode();
        else if (inputs[text.length]) inputs[text.length].focus();
      });
    });

    $('#phone').addEventListener('input', (e) => {
      let v = e.target.value.replace(/[^0-9 ]/g, '');
      e.target.value = v;
    });

    $('#forgot').addEventListener('click', () => {
      if (method === 'phone') {
        setMethod('phone');
        toast('Saisissez votre numéro pour recevoir un code de connexion.');
        return;
      }
      toast('Un lien de réinitialisation sera envoyé par e-mail.');
    });

    $('#continue-guest').addEventListener('click', () => { window.location.href = 'app.html'; });

    $$('[data-page="legal"]').forEach((a) => a.addEventListener('click', (e) => {
      e.preventDefault();
      toast('Les mentions légales seront ajoutées avant la mise en ligne.');
    }));

    /* --- Indicatifs : la liste vient de la liste des pays, pour rester cohérente --- */
    (function fillDials() {
      var sel = $('#country');
      if (!sel || !window.YAMO_COUNTRIES) return;
      var seen = {};
      var html = '';
      CO.LIST.forEach(function (c) {
        if (!c.dial || c.dial === '+' || seen[c.dial]) return;
        seen[c.dial] = true;
        var label = (c.flag ? c.flag + ' ' : '') + c.dial;
        html += '<option value="' + c.dial + '"' + (c.dial === '+225' ? ' selected' : '') + '>' + label + '</option>';
      });
      sel.innerHTML = html;
      sel.value = '+225';
    })();

    /* --- Pays et villes --- */
    fillCountries($('#em-country'), $('#em-city'), 'em-city-hint', 'em-city-free');
    fillCountries($('#ph-country'), $('#ph-city'), 'ph-city-hint', 'ph-city-free');
    $('#em-country').addEventListener('change', () => fillCities($('#em-country'), $('#em-city'), 'em-city-hint', 'em-city-free'));
    $('#ph-country').addEventListener('change', () => fillCities($('#ph-country'), $('#ph-city'), 'ph-city-hint', 'ph-city-free'));

    /* Le pays choisi comme residence regle aussi l indicatif du numero */
    $('#ph-country').addEventListener('change', () => {
      var c = CO.get($('#ph-country').value);
      if (!c || c.dial === '+' ) return;
      var opt = Array.prototype.filter.call($('#country').options, function (o) { return o.value === c.dial; });
      if (opt.length) $('#country').value = c.dial;
    });

    /* Numero deja saisi pour un compte existant : on propose la connexion */
    var savedPhone = '';
    try { savedPhone = (JSON.parse(localStorage.getItem('yamo_me_v1') || '{}') || {}).phone || ''; } catch (e) { savedPhone = ''; }

    updateTexts();
  });
})();

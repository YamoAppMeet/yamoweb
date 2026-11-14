/* ============================================================
   YAMO — Données d'exemple (mode démonstration)
   Ces profils permettent de voir le site fonctionner avant
   de brancher votre vrai serveur Supabase.
   ============================================================ */

window.YAMO_DEMO = (function () {
  const photo = (seed, w, h) =>
    `https://images.unsplash.com/photo-${seed}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

  /* Photo de remplacement (avatar coloré + initiale) si une image ne charge pas */
  window.YAMO_FALLBACK = function (name, i) {
    const pal = ['#E88D91', '#7C6BA8', '#4FA3A0', '#E0A458', '#6C8EBF', '#C97B98'];
    const c = pal[(i || 0) % pal.length];
    const ini = (String(name || '?').trim()[0] || '?').toUpperCase();
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="800"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${c}"/><stop offset="1" stop-color="#ffffff"/></linearGradient></defs><rect width="600" height="800" fill="url(#g)"/><text x="300" y="440" font-family="Arial,sans-serif" font-size="200" font-weight="bold" fill="#ffffff" text-anchor="middle">${ini}</text></svg>`;
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
  };

  const PROFILES = [
    {
      id: 'p1',
      name: 'Awa',
      age: 26,
      gender: 'FEMALE',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      bio: 'Amoureuse de la mer, des bons plats et des longues discussions. Je cherche du sérieux.',
      photos: [photo('1524504388940-b1c1722653e1', 900, 1200), photo('1487412720507-e7ab37603c6f', 900, 1200), photo('1524250502761-1ac6f2e30d43', 900, 1200)],
      interests: ['Voyages', 'Cuisine', 'Musique'],
      is_verified: true,
      is_premium: true,
      relationship_goal: 'SERIOUS',
      distanceKm: 3,
    },
    {
      id: 'p2',
      name: 'Grâce',
      age: 24,
      gender: 'FEMALE',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      bio: 'Étudiante en droit. Passionnée de lecture et de danse. Toujours partante pour un café.',
      photos: [photo('1494790108377-be9c29b29330', 900, 1200), photo('1517841905240-472988babdf9', 900, 1200), photo('1529626455594-4ff0802cfb7e', 900, 1200)],
      interests: ['Lecture', 'Danse', 'Café'],
      is_verified: true,
      is_premium: false,
      relationship_goal: 'SERIOUS',
      distanceKm: 5,
    },
    {
      id: 'p3',
      name: 'Fatou',
      age: 29,
      gender: 'FEMALE',
      city: 'Bouaké',
      country: 'Côte d\'Ivoire',
      bio: 'Entrepreneure. J\'aime les gens qui ont des projets et qui osent.',
      photos: [photo('1534528741775-53994a69daeb', 900, 1200), photo('1502823403499-6ccfcf4fb453', 900, 1200), photo('1520813792240-56fc4a3765a7', 900, 1200)],
      interests: ['Business', 'Sport', 'Voyages'],
      is_verified: false,
      is_premium: true,
      relationship_goal: 'SERIOUS',
      distanceKm: 12,
    },
    {
      id: 'p4',
      name: 'Mariam',
      age: 27,
      gender: 'FEMALE',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      bio: 'Infirmière. Douce, attentionnée, et très bavarde quand on me lance sur les séries.',
      photos: [photo('1517841905240-472988babdf9', 900, 1200), photo('1494790108377-be9c29b29330', 900, 1200), photo('1534528741775-53994a69daeb', 900, 1200)],
      interests: ['Séries', 'Cuisine', 'Nature'],
      is_verified: true,
      is_premium: false,
      relationship_goal: 'SERIOUS',
      distanceKm: 7,
    },
    {
      id: 'p5',
      name: 'Kadi',
      age: 23,
      gender: 'FEMALE',
      city: 'Yamoussoukro',
      country: 'Côte d\'Ivoire',
      bio: 'Coiffeuse et créatrice. Le sourire, c\'est mon meilleur atout.',
      photos: [photo('1529626455594-4ff0802cfb7e', 900, 1200), photo('1508214751196-bcfd4ca60f91', 900, 1200), photo('1524504388940-b1c1722653e1', 900, 1200)],
      interests: ['Mode', 'Musique', 'Sorties'],
      is_verified: true,
      is_premium: false,
      relationship_goal: 'SERIOUS',
      distanceKm: 18,
    },
    {
      id: 'p6',
      name: 'Nadia',
      age: 31,
      gender: 'FEMALE',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      bio: 'Cadre dans la banque. J\'aime les voyages, la photo et les gens sincères.',
      photos: [photo('1544005313-94ddf0286df2', 900, 1200), photo('1517841905240-472988babdf9', 900, 1200), photo('1529626455594-4ff0802cfb7e', 900, 1200)],
      interests: ['Photo', 'Voyages', 'Yoga'],
      is_verified: true,
      is_premium: true,
      relationship_goal: 'SERIOUS',
      distanceKm: 4,
    },
    {
      id: 'p7',
      name: 'Christelle',
      age: 25,
      gender: 'FEMALE',
      city: 'Abidjan',
      country: 'Côte d\'Ivoire',
      bio: 'Étudiante en gestion, passionnée de danse et de cinéma. Ici pour du sérieux, pas pour perdre du temps.',
      photos: [photo('1508214751196-bcfd4ca60f91', 900, 1200), photo('1531123897727-8f129e1688ce', 900, 1200)],
      interests: ['Danse', 'Cinéma', 'Sorties'],
      is_verified: false,
      is_premium: false,
      boost_until: new Date(Date.now() + 20 * 36e5).toISOString(),
      relationship_goal: 'SERIOUS',
      distanceKm: 6,
    },
  ];

  const CONVERSATIONS = [
    {
      id: 'c1',
      profileId: 'p1',
      isMatch: true,
      unread: 2,
      messages: [
        { from: 'them', text: 'Salut ! J\'ai vu qu\'on aime les mêmes choses 😊', at: '10:12' },
        { from: 'me', text: 'Bonjour Awa ! Oui, la cuisine et les voyages 😄', at: '10:15' },
        { from: 'them', text: 'Tu cuisines quoi de bon ?', at: '10:16' },
      ],
    },
    {
      id: 'c2',
      profileId: 'p2',
      isMatch: true,
      unread: 0,
      messages: [
        { from: 'them', text: 'Bonsoir, comment s\'est passée ta journée ?', at: 'Hier' },
        { from: 'me', text: 'Très bien, et toi ?', at: 'Hier' },
      ],
    },
    {
      id: 'c3',
      profileId: 'p6',
      isMatch: true,
      unread: 1,
      messages: [
        { from: 'them', text: 'Je pars à Grand-Bassam ce week-end, tu connais ?', at: 'Lun.' },
      ],
    },
  ];

  const STATUSES = [
    { id: 's1', profileId: 'p1', media: photo('1524504388940-b1c1722653e1', 400, 600), isMine: false, seen: false },
    { id: 's2', profileId: 'p2', media: photo('1494790108377-be9c29b29330', 400, 600), isMine: false, seen: false },
    { id: 's3', profileId: 'p5', media: photo('1529626455594-4ff0802cfb7e', 400, 600), isMine: false, seen: true },
    { id: 's4', profileId: 'p6', media: photo('1544005313-94ddf0286df2', 400, 600), isMine: false, seen: true },
  ];

  const COMMUNITIES = [
    { id: 'k1', name: 'Sorties à Abidjan', description: 'Restaurants, plages, concerts : on organise tout ici.', members: 1284, cover: photo('1517457373958-b7bdd4587205', 600, 400) },
    { id: 'k2', name: 'Entrepreneurs CI', description: 'Réseau d\'entrepreneurs et de porteurs de projets ivoiriens.', members: 642, cover: photo('1552664730-d307ca884978', 600, 400) },
    { id: 'k3', name: 'Sport & Fitness', description: 'Running, foot, salle : trouvez votre partenaire d\'entraînement.', members: 903, cover: photo('1571019613454-1cb2f99b2d8b', 600, 400) },
  ];

  /* Grille tarifaire fixe, exprimée en TARIF PAR JOUR.
     Prix = durée en jours x tarif journalier (arrondi au franc).
     1 mois = 30 jours. Au-delà d'un mois, le tarif journalier baisse. */
  const TRIAL_DAYS = 7;

  /* ------------------------------------------------------------
     TARIFS DES FEMMES — un abonnement unique de 3 000 F par mois.
     Il donne accès à toutes les fonctions de confiance (voir qui
     vous a likée, mode invisible, communautés, badge...).
     Le Super Like et le message direct restent payants à l'unité.
     L'abonnement se renouvelle chaque mois (ou s'arrête).
     ------------------------------------------------------------ */
  const WOMEN_SUBSCRIPTION = {
    id: 'FEMALE_UNIQUE',
    audience: 'FEMALE',
    label: 'Abonnement Femmes',
    subtitle: 'Un seul abonnement de 3 000 F par mois. Toutes les fonctions sont incluses, sans palier.',
    days: 30,
    price: 3000,
    pricePerDay: 3000 / 30,
    hint: 'Formule unique · renouvellement chaque mois',
    perks: [
      'Voir qui vous a likée, sans flou',
      'Ouvrir son profil complet et toutes ses photos avant de liker',
      'Répondre à tous vos likes (créer un match)',
      'Mode invisible',
      'Badge Membre',
      'Accès aux communautés',
      'Renouvellement chaque mois — vous pouvez arrêter quand vous voulez',
    ],
    notIncluded: [
      'Super Like : 500 F à l\'unité',
      'Message direct : 200 F à l\'unité',
    ],
  };

  /* ------------------------------------------------------------
     TARIFS HOMMES — 4 durées, et les options débloquées
     dépendent de la formule choisie (paliers cumulatifs).
     ------------------------------------------------------------ */
  const TARIFS = [
    { id: 'MONTHLY',   label: '1 mois',  days: 30,  price: 3000,  hint: 'Sans engagement',     level: 1 },
    { id: 'QUARTERLY', label: '3 mois',  days: 90,  price: 9000,  hint: 'Le plus choisi',      level: 2 },
    { id: 'BIANNUAL',  label: '6 mois',  days: 180, price: 15000, hint: 'Bon rapport qualité/prix', level: 3 },
    { id: 'ANNUAL',    label: '12 mois', days: 365, price: 30000, hint: 'Meilleure offre',     level: 4 },
  ];

  /* Fonctionnalités débloquées, formule par formule (cumulatif).
     L'essai gratuit donne le niveau 2. */
  const PLAN_FEATURES = {
    1: { label: 'Essentiel',   seeLikes: true,  seeAllLikes: false, seePhotos: 'preview', replyLikes: 1, invisible: false, badge: false, communities: false, boosts: 0, directMsg: false },
    2: { label: 'Confort',     seeLikes: true,  seeAllLikes: true,  seePhotos: 'full',    replyLikes: 5, invisible: false, badge: true,  communities: true,  boosts: 0, directMsg: false },
    3: { label: 'Avancé',      seeLikes: true,  seeAllLikes: true,  seePhotos: 'full',    replyLikes: -1, invisible: true, badge: true,  communities: true,  boosts: 2, directMsg: true },
    4: { label: 'Intégral',    seeLikes: true,  seeAllLikes: true,  seePhotos: 'full',    replyLikes: -1, invisible: true, badge: true,  communities: true,  boosts: 5, directMsg: true },
  };
  /* Traduction lisible des avantages, affichée sur chaque formule */
  function featuresToList(f) {
    if (!f) f = PLAN_FEATURES[1];
    return [
      f.seeAllLikes ? 'Voir tous ceux qui vous ont liké' : 'Voir 1 like reçu (les autres floutés)',
      'Profil complet de la personne',
      f.seePhotos === 'full' ? 'Toutes ses photos' : 'Sa photo principale seulement',
      f.replyLikes === -1 ? 'Répondre à tous vos likes' : 'Répondre à ' + f.replyLikes + ' like(s)',
      f.invisible ? 'Mode invisible' : 'Mode invisible (formules 6 et 12 mois)',
      f.badge ? 'Badge Membre' : 'Badge Membre (formules 3 mois et +)',
      f.communities ? 'Accès aux communautés' : 'Communautés (formules 3 mois et +)',
      f.boosts ? f.boosts + ' Boost(s) offert(s)' : 'Boosts en option',
      f.directMsg ? 'Message direct inclus (sans attendre le match)' : 'Message direct en option (200 F)',
    ];
  }

  /* Le prix de référence est celui de la grille (affiché au client) ;
     le tarif journalier en découle et sert de contrôle de cohérence. */
  const PLANS = TARIFS.map((p) => Object.assign({}, p, {
    price: p.price,
    pricePerDay: p.price / p.days,
    features: PLAN_FEATURES[p.level],
    perks: featuresToList(PLAN_FEATURES[p.level]),
  }));

  const EXTRAS = [
    { id: 'SUPER_LIKE', label: 'Super Like', price: 500, desc: 'Sortez du lot et faites-vous remarquer immédiatement.' },
    { id: 'DIRECT_MESSAGE', label: 'Message direct', price: 200, desc: 'Écrivez à quelqu\'un sans attendre le match.' },
    { id: 'BOOST_1D', label: 'Boost 1 jour', price: 1000, desc: 'Apparaissez en tête des suggestions pendant 24 h.' },
    { id: 'BOOST_3D', label: 'Boost 3 jours', price: 2500, desc: 'Trois jours de visibilité devant tout le monde.' },
    { id: 'BOOST_7D', label: 'Boost 7 jours', price: 5000, desc: 'Une semaine complète en tête des profils.' },
  ];

  const AVANTAGES = [
    { icon: 'shield', label: 'Profils vérifiés', desc: 'Chaque profil sérieux passe une vérification d\'identité avant d\'être certifié.' },
    { icon: 'lock', label: 'Données protégées', desc: 'Vos photos et conversations restent privées. Vous pouvez les exporter ou les supprimer.' },
    { icon: 'users', label: 'Communautés', desc: 'Rejoignez des groupes par centre d\'intérêt et rencontrez des gens qui vous ressemblent.' },
    { icon: 'zap', label: 'Sans faux profils', desc: 'Chaque photo est contrôlée. Signalez en un clic, nous agissons.' },
  ];

  return {
    TARIFS, TRIAL_DAYS, WOMEN_SUBSCRIPTION, PLAN_FEATURES, featuresToList,
    PROFILES,
    CONVERSATIONS,
    STATUSES,
    COMMUNITIES,
    PLANS,
    EXTRAS,
    AVANTAGES,
  };
})();

/* ============================================================
   YAMO — Configuration du site
   ------------------------------------------------------------
   À REMPLIR avec vos propres valeurs avant la mise en ligne.
   Ne mettez JAMAIS ici la clé « service_role » de Supabase
   ni la clé secrète Paystack : elles resteraient visibles
   par tout le monde dans le navigateur.
   ============================================================ */

window.YAMO_CONFIG = {
  // Adresse de votre serveur Yamo (celui de index.js)
  // Exemple : 'https://api.yamo.app'
  API_BASE_URL: 'https://api.yamo.app',

  // Clé publique Supabase (appelée « anon key ») — elle est faite pour être publique.
  SUPABASE_URL: 'https://VOTRE-PROJET.supabase.co',
  SUPABASE_ANON_KEY: 'VOTRE_CLE_ANON_PUBLIQUE',

  // Liens des boutiques (à remplacer quand l'app sera publiée)
  APP_STORE_URL: '#',
  PLAY_STORE_URL: '#',

  // Numéro WhatsApp / support Yamo
  SUPPORT_WHATSAPP: '',

  /* ------------------------------------------------------------
     CONNEXION PAR TÉLÉPHONE (code envoyé sur WhatsApp)
     ------------------------------------------------------------
     Rien à mettre ici en ce qui concerne Whatsapp : les clés
     secrètes (jeton Meta, mot de passe du modèle de message)
     doivent rester UNIQUEMENT sur le serveur, jamais ici.
     Voir GUIDE.md, section « Connexion par WhatsApp ».
  */
  PHONE_AUTH: {
    // Indicatif proposé par défaut
    DEFAULT_COUNTRY_CODE: '+225',
    // Durée de validité du code (secondes) — doit correspondre au serveur
    CODE_TTL: 300,
    // Attente avant de pouvoir redemander un code (secondes)
    RESEND_DELAY: 30,
  },

  // Code affiché en mode démonstration (aucun message réel n'est envoyé)
  DEMO_OTP_CODE: '123456',

  /* ------------------------------------------------------------
     ESPACE ADMINISTRATEUR (admin.html)
     ------------------------------------------------------------
     En démonstration, ce code ouvre le tableau de bord.
     Sur un vrai site, l'accès passe par un compte administrateur
     vérifié sur le serveur : ce code ne suffit plus. */
  ADMIN_DEMO_CODE: 'YAMO-ADMIN',

  // Mode démonstration : true = le site fonctionne avec des données d'exemple,
  // sans serveur. Utile pour voir le design avant de tout brancher.
  DEMO_MODE: true,
};

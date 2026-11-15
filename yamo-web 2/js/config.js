/* ============================================================
   YAMO — Configuration du site — BRANCHÉ LIVE
   ============================================================ */

window.YAMO_CONFIG = {
  // Serveur Yamo
  API_BASE_URL: 'https://api.yamo.app',

  // SUPABASE - BRANCHÉ
  SUPABASE_URL: 'https://doddgvfzchiviaybdfij.supabase.co',
  SUPABASE_ANON_KEY: 'METS_ICI_TA_CLE_sb_publishable_QUE_TU_AS_EN_PHOTO',

  // PAYSTACK LIVE - BRANCHÉ
  PAYSTACK_PUBLIC_KEY: 'pk_live_aea72d89d2b99f4eabb193a9115c14b07e8d3162',
  PAYSTACK_PUBLIC: 'pk_live_aea72d89d2b99f4eabb193a9115c14b07e8d3162',
  CURRENCY: 'XOF',

  // Liens des boutiques
  APP_STORE_URL: '#',
  PLAY_STORE_URL: '#',

  // Support
  SUPPORT_WHATSAPP: '',

  PHONE_AUTH: {
    DEFAULT_COUNTRY_CODE: '+225',
    CODE_TTL: 300,
    RESEND_DELAY: 30,
  },

  DEMO_OTP_CODE: '123456',
  ADMIN_DEMO_CODE: 'YAMO-ADMIN',

  // Mode démonstration : false = MODE RÉEL, plus de faux profils
  DEMO_MODE: false,
};

// Pour que tout le code comprenne les clés
window.SUPABASE_URL = window.YAMO_CONFIG.SUPABASE_URL;
window.SUPABASE_ANON_KEY = window.YAMO_CONFIG.SUPABASE_ANON_KEY;
window.PAYSTACK_PUBLIC_KEY = window.YAMO_CONFIG.PAYSTACK_PUBLIC_KEY;

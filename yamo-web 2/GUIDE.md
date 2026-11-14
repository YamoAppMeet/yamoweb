# Yamo — Guide du site web

> **Ce que vous avez entre les mains :** la version web de votre application Yamo, prête à être hébergée.
> Elle fonctionne dès maintenant en **mode démonstration**, avec des profils d'exemple.
> Le jour où vous voulez passer en réel, il suffit de brancher votre serveur (voir plus bas).

> **Nouveau dans cette version**
> - **Inscription par pays** : 18 pays desservis (Côte d'Ivoire, Afrique de l'Ouest, Maghreb, Europe, Canada, États-Unis) + « Autre pays » avec saisie libre de la ville. Le pays choisi règle l'indicatif téléphonique.
> - **Jusqu'à 6 photos de profil** (1 Mo maximum par photo), photo principale modifiable, photos conservées après fermeture du site.
> - **Le sexe choisi à l'inscription est bien enregistré** et repris dans le profil.
> - **Installation sur téléphone** prête pour Android et iPhone (mode plein écran, ouverture sans connexion).
> - **Guide de mise en ligne** : voir le fichier **`MISE-EN-LIGNE.md`**.

## 1. Ce qui a été fait

### Le site public (`index.html`)
La page que voient les visiteurs qui ne sont pas encore inscrits.

- Présentation de Yamo avec un aperçu animé de l'application
- Les 6 fonctionnalités principales (découverte, vérification, messagerie, Super Like, communautés, statuts)
- Les 3 étapes pour commencer
- **Vos vrais tarifs** : 3 000 F / 9 000 F / 15 000 F / 30 000 F, plus les achats à l'unité
- Section sécurité
- Boutons App Store et Google Play
- Pied de page avec les liens

### L'application web (`app.html`)
Les écrans connectés, accessibles depuis un ordinateur **et** depuis un téléphone.

| Écran | Ce qu'il contient |
|---|---|
| **Découvrir** | Carte de profil avec photo, âge, ville, distance, centres d'intérêt. Boutons Passer / Super Like / J'aime. Panneau d'activité et statuts. |
| **Likes** | 4 onglets : ils vous ont liké, Super Likes, mes matchs, envoyés |
| **Messages** | Liste des conversations + messagerie avec envoi réel de messages, blocage, signalement |
| **Communautés** | Groupes par centre d'intérêt, adhésion, création (réservée aux abonnés 6 et 12 mois) |
| **Notifications** | Likes, messages, Super Likes, vérification, abonnement |
| **Mon profil** | Photo, description, centres d'intérêt, modification, vérification d'identité, mode invisible, export des données, suppression du compte |
| **Abonnements** | Les 4 formules et les 5 achats à l'unité, avec paiement |

**Bonus :** quand deux personnes se plaisent, l'écran « C'est un match ! » s'affiche, comme dans l'application.

### La connexion (`auth.html`)
Inscription, connexion, mot de passe oublié, et un bouton « Explorer sans créer de compte ».

---

## 2. Comment voir le site, tout de suite

**Méthode la plus simple :**
1. Décompressez le fichier `yamo_site_web.zip` sur votre ordinateur
2. Double-cliquez sur **`index.html`**
3. Le site s'ouvre dans votre navigateur

**Pour visiter l'application :** depuis la page d'accueil, cliquez sur « S'inscrire » ou « Voir l'aperçu du site ».

> **À essayer vous-même :** envoyez un message dans la messagerie, modifiez votre profil, cliquez sur le cœur d'un profil — tout est cliquable.

---

## 3. Les fichiers

```
yamo_site_web/
├── index.html          ← Page d'accueil publique
├── app.html            ← L'application (écrans connectés)
├── auth.html           ← Connexion et inscription
├── GUIDE.md            ← Ce document
├── css/
│   └── style.css       ← Tout le design (couleurs, mise en page)
├── js/
│   ├── config.js       ← ⚠️ LE FICHIER À MODIFIER (adresses et clés)
│   ├── data.js         ← Les profils d'exemple du mode démonstration
│   └── app.js          ← Toute la logique des écrans
└── assets/
    ├── logo.svg        ← Votre logo Yamo (têtes de page + icône d'onglet)
    └── favicon.svg     ← La petite icône dans l'onglet du navigateur
```

---

## 4. Les couleurs de Yamo

Elles sont cohérentes avec votre application :

| Élément | Couleur |
|---|---|
| Rose saumon (couleur principale, celle du logo) | `#E88D91` |
| Rose foncé (pour le texte ou un survol) | `#C96F77` |
| Rose très clair (fonds doux) | `#FDF1F1` |
| Bleu canard (seconde couleur du logo) | `#1E6A7A` |
| Bleu canard clair | `#42A2B0` |

Ces deux couleurs sont celles de votre logo : les silhouettes entrelacées en forme de cœur sont rose saumon et bleu canard.

Pour changer une couleur, ouvrez `css/style.css` et modifiez les valeurs tout en haut du fichier (section `:root`).

---

## 5. Passer du mode démonstration au site réel

Aujourd'hui, le site utilise des **profils d'exemple** (`js/data.js`). C'est volontaire : cela vous permet de voir le résultat, et de montrer le site à vos partenaires, sans rien risquer.

Pour le brancher sur **votre vrai serveur**, ouvrez **`js/config.js`** et remplissez :

```js
window.YAMO_CONFIG = {
  API_BASE_URL: 'https://votre-serveur.com',   // l'adresse de votre index.js
  SUPABASE_URL: 'https://votre-projet.supabase.co',
  SUPABASE_ANON_KEY: 'votre_clé_anon_publique',
  APP_STORE_URL: 'https://apps.apple.com/...',
  PLAY_STORE_URL: 'https://play.google.com/...',
  DEMO_MODE: false,        // ← passez à false
};
```

### ⚠️ Règles de sécurité absolues

1. **N'écrivez jamais** la clé `SUPABASE_SERVICE_ROLE_KEY` dans ce fichier. Elle donne tous les droits et resterait visible par n'importe qui dans le navigateur.
2. **N'écrivez jamais** la clé secrète Paystack non plus.
3. Ces clés restent **uniquement sur votre serveur** (dans son fichier `.env`).
4. Seule la clé **anon** de Supabase (dite « publique ») peut figurer ici : elle est faite pour ça.

### Ce qu'il reste à raccorder

Le site est complet côté design et navigation. Pour qu'il fonctionne en réel, il faut encore relier chaque écran à vos 43 fonctions serveur existantes. C'est la prochaine étape technique — dites-le-moi et je m'en occupe.

---

## 6. Héberger le site

Trois options, de la plus simple à la plus professionnelle :

### Option A — Netlify (le plus simple, gratuit pour commencer)
1. Créez un compte sur **netlify.com**
2. Glissez-déposez le dossier `yamo_site_web` sur la page d'accueil
3. C'est en ligne, avec une adresse du type `yamo.netlify.app`

### Option B — Votre hébergeur (Ibraci Links ou autre)
1. Connectez-vous à votre panneau (cPanel)
2. Ouvrez le **Gestionnaire de fichiers**
3. Entrez dans `public_html`
4. Envoyez-y **tout le contenu** du dossier (pas le dossier lui-même), en conservant les sous-dossiers `css`, `js`, `assets`

### Option C — Vercel
Similaire à Netlify, glisser-déposer, très rapide.

> **Important :** gardez toujours ensemble `index.html`, `app.html`, `auth.html` et les dossiers `css`, `js`, `assets`. Si vous séparez les fichiers, le site perdra son design.

---

## 7. Ce qu'il faudra ajouter avant la mise en ligne publique

Pour être en règle et conforme aux règles des stores :

- [ ] **Conditions générales d'utilisation** et **politique de confidentialité** (obligatoires)
- [ ] **Mentions légales** (nom de l'entreprise, contact)
- [ ] **Mentions cookies** si vous ajoutez des statistiques
- [x] **Votre logo Yamo** : il est déjà installé (fichier `assets/logo.svg`), net sur tous les écrans
- [ ] **Captures d'écran réelles** de l'application sur la page d'accueil
- [ ] **Vos liens de boutiques** une fois l'application publiée
- [ ] Un **nom de domaine** (ex. `yamo.ci` ou `yamo.app`)


---

## 9. Connexion par numéro de téléphone (code WhatsApp)

Vos utilisateurs peuvent maintenant créer un compte **sans mot de passe** :
ils saisissent leur numéro, reçoivent un code à 6 chiffres **sur WhatsApp**,
puis entrent. C'est gratuit pour eux et beaucoup plus simple qu'un mot de passe.

### 9.1 Comment ça marche (vue utilisateur)

1. Sur la page de connexion, il clique sur **« Téléphone »**.
2. Il choisit son pays (par défaut **+225 Côte d'Ivoire**) et tape son numéro.
3. Il clique sur **« Recevoir le code sur WhatsApp »**.
4. Un message WhatsApp arrive avec un code à 6 chiffres (valable 5 minutes).
5. Il tape le code : la connexion se fait automatiquement.
6. S'il n'a rien reçu, le bouton **« Renvoyer le code »** se débloque après 30 secondes.

En mode démonstration (actuellement actif), **aucun message n'est réellement envoyé** :
le code est toujours **123456** et il s'affiche dans un petit bandeau en bas de l'écran.
Vous pouvez donc tester tout le parcours dès maintenant.

### 9.2 Ce qu'il faut faire côté Meta (WhatsApp Business)

C'est la partie « administrative ». Comptez quelques jours.

| Étape | Où | Détail |
|---|---|---|
| 1 | business.facebook.com | Créer un **compte Meta Business** au nom de Yamo |
| 2 | developers.facebook.com | Créer une **App** de type « Business » |
| 3 | App > WhatsApp | Ajouter le produit **WhatsApp** : vous obtenez un numéro d'essai gratuit |
| 4 | Business Settings | Lancer la **vérification de l'entreprise** (document officiel : registre de commerce, facture d'électricité…) — **obligatoire** pour envoyer des codes |
| 5 | App > WhatsApp > Numéros | Ajouter votre **vrai numéro** (il ne doit pas être déjà utilisé sur l'app WhatsApp normale) |
| 6 | WhatsApp Manager > Modèles de messages | Créer le modèle décrit ci-dessous |

**Le modèle de message (template)** — c'est le point le plus important.
Meta n'autorise l'envoi d'un code que si le message est un modèle de type
**Authentification** avec un bouton « copier le code ».

- Nom du modèle : `yamo_code_connexion`
- Catégorie : **Authentification**
- Langue : **Français (fr)**
- Contenu :
  `Votre code de connexion Yamo est {{1}}. Il expire dans {{2}} minutes. Ne le partagez avec personne.`
- Bouton : **Copier le code** (type `COPY_CODE`)

> Astuce : le code doit apparaître **deux fois** dans le message (dans le texte et
> dans le bouton) — c'est une exigence de Meta pour les modèles d'authentification.
> L'interface de Meta le fait automatiquement quand vous choisissez « Authentification ».

### 9.3 Ce qu'il faut ajouter sur le serveur

Le site envoie deux requêtes à votre serveur (`index.js`) :

| Requête | Rôle |
|---|---|
| `POST /api/auth/phone/start` | reçoit le numéro, génère un code, l'envoie par WhatsApp |
| `POST /api/auth/phone/verify` | reçoit le numéro + le code, vérifie et ouvre la session |

**Ces deux routes n'existent pas encore dans votre `index.js`** : il faut les ajouter.
Le code ci-dessous est prêt à copier dans votre fichier serveur (après le `require` d'Express et de Supabase déjà présents).

```js
// ------------------------------------------------------------------
// CONNEXION PAR TÉLÉPHONE + CODE WHATSAPP
// Ajoutez ces variables dans votre fichier .env (JAMAIS dans le site) :
//   WHATSAPP_TOKEN=...            (jeton permanent Meta)
//   WHATSAPP_PHONE_ID=...         (identifiant du numéro WhatsApp Business)
//   WHATSAPP_TEMPLATE=yamo_code_connexion
//   OTP_SECRET=...                (une longue phrase aléatoire)
// ------------------------------------------------------------------
const crypto = require('crypto');

function hashCode(code, phone) {
  return crypto.createHmac('sha256', process.env.OTP_SECRET || 'changez-moi')
    .update(phone + ':' + code).digest('hex');
}

// 1) Envoyer le code
app.post('/api/auth/phone/start', async (req, res) => {
  try {
    const phone = String(req.body.phone || '').replace(/[^0-9+]/g, '');
    if (phone.length < 9 || phone.length > 16) {
      return res.status(400).json({ error: 'invalid_phone' });
    }

    // Anti-abus : maximum 3 envois par numéro sur 15 minutes
    const since = new Date(Date.now() - 15 * 60 * 1000).toISOString();
    const { count } = await supabase.from('phone_otp')
      .select('*', { count: 'exact', head: true })
      .eq('phone', phone).gte('created_at', since);
    if (count >= 3) return res.status(429).json({ error: 'too_many_requests' });

    const code = String(crypto.randomInt(100000, 1000000));
    await supabase.from('phone_otp').insert({
      phone,
      code_hash: hashCode(code, phone),
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
      used: false,
    });

    const r = await fetch(
      `https://graph.facebook.com/v20.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: phone,
          type: 'template',
          template: {
            name: process.env.WHATSAPP_TEMPLATE,
            language: { code: 'fr' },
            components: [{
              type: 'body',
              parameters: [{ type: 'text', text: code }, { type: 'text', text: '5' }],
            }],
          },
        }),
      }
    );

    if (!r.ok) {
      console.error('WhatsApp:', await r.text());
      return res.status(502).json({ error: 'send_failed' });
    }
    res.json({ ok: true });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// 2) Vérifier le code et ouvrir la session
app.post('/api/auth/phone/verify', async (req, res) => {
  try {
    const phone = String(req.body.phone || '').replace(/[^0-9+]/g, '');
    const code = String(req.body.code || '').trim();
    if (!/^[0-9]{6}$/.test(code)) return res.status(400).json({ error: 'invalid_code' });

    const { data: rows } = await supabase.from('phone_otp')
      .select('*').eq('phone', phone).eq('used', false)
      .order('created_at', { ascending: false }).limit(1);

    const otp = rows && rows[0];
    if (!otp) return res.status(400).json({ error: 'invalid_code' });
    if (new Date(otp.expires_at) < new Date()) return res.status(400).json({ error: 'code_expired' });
    if (otp.code_hash !== hashCode(code, phone)) return res.status(400).json({ error: 'invalid_code' });

    await supabase.from('phone_otp').update({ used: true }).eq('id', otp.id);

    // Le compte existe déjà ?
    let { data: profile } = await supabase.from('profiles')
      .select('*').eq('phone', phone).maybeSingle();

    if (!profile) {
      if (req.body.purpose !== 'SIGNUP') {
        return res.status(404).json({ error: 'no_account' });
      }
      const email = phone.replace('+', '') + '@phone.yamo.app';
      const { data: created, error } = await supabase.auth.admin.createUser({
        email, email_confirm: true, phone_confirm: true,
        user_metadata: { phone, name: req.body.name || 'Nouveau membre' },
      });
      if (error) throw error;
      await supabase.from('profiles').insert({
        id: created.user.id, phone, name: req.body.name || 'Nouveau membre',
      });
      profile = { id: created.user.id };
    }

    // Jeton de session
    const { data: link } = await supabase.auth.admin.generateLink({
      type: 'magiclink', email: phone.replace('+', '') + '@phone.yamo.app',
    });
    const { data: session } = await supabase.auth.verifyOtp({
      email: phone.replace('+', '') + '@phone.yamo.app',
      token: link.properties.email_otp, type: 'email',
    });

    res.json({ ok: true, token: session.session.access_token, profile_id: profile.id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});
```

**Table à créer dans Supabase** (onglet SQL Editor) :

```sql
create table if not exists phone_otp (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  code_hash text not null,
  expires_at timestamptz not null,
  used boolean default false,
  created_at timestamptz default now()
);
create index if not exists phone_otp_phone_idx on phone_otp (phone, created_at desc);
alter table phone_otp enable row level security;
-- Aucune règle publique : seule votre serveur (clé service_role) y accède.
```

### 9.4 Ce qu'il faut savoir sur les coûts

- **Gratuit** pendant le test avec le numéro d'essai de Meta.
- En production, Meta facture **chaque message envoyé**. Un code de connexion
  est une « conversation d'authentification » : le tarif dépend du pays
  (de l'ordre de quelques francs CFA par message). Consultez la grille
  tarifaire Meta pour la Côte d'Ivoire avant le lancement.
- La **vérification de l'entreprise** est obligatoire. Sans elle, Meta limite
  l'envoi à 2000 conversations par jour et à des numéros de test.

### 9.5 Pour activer sur le site

1. Dans `js/config.js`, mettez `DEMO_MODE: false` et l'adresse réelle de votre serveur dans `API_BASE_URL`.
2. Vérifiez que les deux routes ci-dessus sont bien en ligne (testez avec un vrai numéro).
3. Le code `123456` n'est alors plus utilisé : seulement les codes réellement envoyés.

> **Rappel de sécurité** : le jeton WhatsApp (`WHATSAPP_TOKEN`) et la clé
> `service_role` de Supabase restent **uniquement dans le fichier `.env` du serveur**.
> Ne les mettez jamais dans `js/config.js` : n'importe qui pourrait les lire.

---

## 10. Supprimer son compte, bloquer et signaler

Ces trois fonctions sont maintenant **complètes** dans l'interface.

### 10.1 Supprimer son compte
Menu **Profil** (en bas de la page), tout en bas : bouton rouge
**« Supprimer mon compte »**. Une fenêtre de confirmation s'ouvre ; l'utilisateur
doit cliquer sur **« Oui, supprimer définitivement »**. Sur le vrai serveur,
cela appelle `POST /api/account/delete` (déjà présent dans votre `index.js`),
qui efface le profil et le compte d'authentification.

### 10.2 Bloquer une personne
Deux endroits possibles :
- Sur la fiche d'un profil (onglet **Likes** → cliquez sur une photo) : bouton **« Bloquer »**.
- Dans une conversation : les trois points en haut à droite → **« Bloquer cette personne »**.

Une fenêtre explique les conséquences puis demande confirmation.
Une fois bloquée, la personne **disparaît des découvertes, des likes et des matchs**.
En démonstration, la liste des personnes bloquées est gardée dans le navigateur.

### 10.3 Signaler un profil
Même deux endroits : bouton **« Signaler »** sur la fiche, ou **« Signaler la conversation »**
dans les trois points. L'utilisateur choisit un **motif parmi 7**
(faux profil, arnaque, harcèlement, contenu déplacé, spam, violence, autre),
peut ajouter une précision, puis valide. Le motif envoyé correspond
exactement aux valeurs acceptées par votre serveur (`FAKE_PROFILE`, `SCAM`,
`HARASSMENT`, `INAPPROPRIATE_CONTENT`, `SPAM`, `VIOLENCE`, `OTHER`),
donc rien à modifier côté serveur : la route `POST /api/messages/report` existe déjà.

---

## 8. Questions fréquentes

**Le site est-il vraiment terminé ?**
Le design, tous les écrans et la navigation sont terminés et testés. Il reste à le relier à votre serveur pour les vraies données.

**Puis-je modifier les textes ?**
Oui. Ouvrez le fichier `.html` correspondant avec un éditeur de texte simple (VS Code, Notepad++). Les textes sont en clair dans le fichier.

**Ça marche sur téléphone ?**
Oui, le site s'adapte automatiquement : menu en bas, cartes pleine largeur, boutons adaptés au doigt. Testé sur les 6 écrans.

**Les photos des profils d'exemple viennent d'où ?**
D'Unsplash (photos libres de droits), pour la démonstration uniquement. Elles seront remplacées par les vraies photos de vos utilisateurs.

**Mes données sont-elles en sécurité ?**
En mode démonstration, aucune donnée n'est enregistrée : tout reste dans votre navigateur. Rien ne part sur Internet.

---

*Site généré à partir de votre projet Yamo (Expo/React Native).*
*Bonne mise en ligne !*

---

## 11. Votre logo

Votre logo (les deux personnages rose et bleu qui forment un cœur) est maintenant
utilisé **partout** sur le site.

### Ce qui a été fait

Le fichier que vous avez envoyé était une photo au format JPG, en assez basse
résolution : le contour des formes était un peu flou et le fond blanc était collé
au logo. Utilisé tel quel, il serait apparu avec un liseré gris sur les bords.

J'ai donc **redessiné le logo en version nette** (fichier vectoriel), en gardant
exactement les mêmes formes et les mêmes couleurs que le vôtre. Il reste parfaitement
net à toutes les tailles, du petit onglet du navigateur à la grande image.

Les couleurs du site (le rose et le bleu canard) ont été **réajustées sur celles
de votre logo** pour que tout soit cohérent.

### Les fichiers fournis (dossier `assets/`)

| Fichier | À quoi ça sert |
|---|---|
| `logo.svg` | le logo principal, net à toutes les tailles — c'est celui utilisé sur le site |
| `logo.png` | version image grand format (1024 px), pour vos documents, flyers, réseaux sociaux |
| `logo-192.png` | icône pour les téléphones Android |
| `logo-64.png` | petite icône |
| `apple-touch-icon.png` | icône pour iPhone / iPad (fond arrondi) |
| `favicon.svg` | la petite image dans l'onglet du navigateur |
| `logo-fond-blanc.svg` | le logo sur fond blanc, si vous devez le coller sur un document |

### Où il apparaît

- En haut de la page d'accueil et de la page de connexion
- En haut du menu de l'application (et en bandeau fixe en haut sur téléphone)
- Dans l'onglet du navigateur et sur l'écran d'accueil d'un téléphone quand on
  « ajoute le site à l'écran d'accueil »

### Si vous avez le logo d'origine en meilleure qualité

Si votre graphiste vous a donné le logo en fichier **PNG transparent** ou
**AI / PDF / SVG**, envoyez-le : je pourrai l'utiliser tel quel à la place de
la version redessinée. C'est toujours préférable, car c'est votre fichier exact.

---

---

## 12. Le mode invisible

**Oui, la fonction est toujours là** — dans le menu **Profil**, section
« Confidentialité ». Elle a même été **rendue réellement utilisable** :
avant, le bouton ne faisait qu'afficher un message « réservé aux Premium ».

### Comment ça marche maintenant

Dans **Profil → Confidentialité**, la ligne **« Mode invisible »** a un
**interrupteur** :

- **Compte gratuit** : si on appuie sur l'interrupteur, une fenêtre explique
  l'avantage et propose **« Découvrir les offres »** (direction la page Abonnements)
  ou **« Plus tard »**.
- **Compte Premium** : l'interrupteur s'active vraiment (il passe en bleu).
  Un message de confirmation s'affiche et une note verte rappelle :
  *« Mode invisible actif : vous pouvez continuer à liker et à discuter,
  mais vous n'êtes plus suggéré à personne. »*
  Un petit « · Invisible » apparaît aussi sous votre nom dans le menu.
  On peut l'éteindre à tout moment, dans le même interrupteur.

### Tester tout de suite

1. Ouvrez le site, allez dans **Abonnements**.
2. Choisissez une offre, cliquez sur **Payer** (paiement de démonstration, rien n'est débité).
3. Vous êtes Premium : votre profil affiche « Abonné Premium ».
4. Allez dans **Profil → Confidentialité** : l'interrupteur Mode invisible
   fonctionne maintenant.

> En démonstration, l'abonnement n'est pas mémorisé : si vous rechargez la page,
> vous redevenez un compte gratuit. Une fois Paystack branché, l'abonnement
> sera réellement enregistré sur le serveur (le bouton « Payer » actuel est un
> simulacre — il devra appeler `/api/payments/initialize` déjà présent dans votre `index.js`).

### Ce que « invisible » veut dire exactement

L'utilisateur invisible **continue à voir et à liker tout le monde**, mais
**n'apparaît plus dans les découvertes des autres**. Il reste visible de ses
matchs existants, sinon les conversations deviendraient incompréhensibles.
C'est le comportement habituel des applications de rencontre.

Côté serveur, il faudra que la route qui liste les profils à découvrir
(`GET /api/discover` dans votre `index.js`) exclue les comptes dont
`invisible = true`. Ajoutez la colonne dans Supabase :

```sql
alter table profiles add column if not exists invisible boolean default false;
```

---

**Comment un utilisateur se connecte-t-il maintenant ?**
Trois façons : e-mail + mot de passe, numéro de téléphone avec un code WhatsApp, ou « Explorer sans créer de compte » pour voir le site.

**Le code 123456, c'est normal ?**
Oui, c'est le mode démonstration. Aucun message réel n'est envoyé tant que `DEMO_MODE` reste sur `true`. Une fois votre serveur et WhatsApp branchés, ce sont de vrais codes à usage unique.

---

## 12. Les nouveautés (dernière version)

### 12.1 Notification « nouvel inscrit »
- Quand quelqu'un s'inscrit sur Yamo, un **encadré de notification apparaît** en haut à droite sur ordinateur, et **au-dessus du menu** sur téléphone.
- Il disparaît tout seul après 7 secondes ; on peut aussi le fermer avec la croix.
- La personne qui s'inscrit **reçoit un mot de bienvenue** ; les membres déjà inscrits reçoivent l'alerte « Nouvel inscrit ».
- L'alerte s'ajoute aussi dans l'écran **Notifications** (avec un petit chiffre sur le menu) et **reste après avoir rechargé la page**.
- Le navigateur demande une fois l'autorisation d'envoyer des notifications. Si vous acceptez, l'alerte s'affiche même quand l'onglet est en arrière-plan.
- Bouton **« Tester une alerte »** dans l'écran Notifications pour voir le rendu à tout moment.

> En démonstration, les nouveaux inscrits sont simulés (un toutes les 60 secondes). En réel, c'est votre serveur qui envoie l'alerte à chaque inscription.

### 12.2 Le site s'installe comme une app sur le téléphone
- Une bannière **« Installer Yamo »** apparaît sur téléphone : l'utilisateur touche « Installer » et l'icône Yamo s'ajoute à son écran d'accueil.
- Une fois installé, le site s'ouvre **en plein écran**, sans barre d'adresse, comme une vraie application.
- Il garde les bonnes marges autour de l'encoche et de la barre du bas du téléphone.
- Le site fonctionne aussi **sans connexion** après la première visite (les pages sont enregistrées sur le téléphone).
- Sur iPhone, l'installation se fait par « Partager » → « Sur l'écran d'accueil » (un message l'explique).

### 12.3 Essai gratuit de 7 jours
- Sur la page Abonnements, un encadré propose **« Démarrer mon essai gratuit »**.
- L'essai débloque **tout Premium pendant 7 jours, sans payer**, puis s'arrête tout seul (aucun prélèvement).
- Il ne peut être utilisé **qu'une seule fois par compte** : le bouton disparaît ensuite.
- Le statut reste affiché après avoir rechargé la page, avec la date de fin.

### 12.4 Prix calculés selon la durée
Les 4 formules sont construites à partir d'un **tarif par jour fixe**, avec un prix par jour qui baisse sur les longues durées :

| Formule | Durée | Prix | Prix par jour |
|---|---|---|---|
| 1 mois | 30 jours | 3 000 F | 100 F |
| 3 mois | 90 jours | 9 000 F | 100 F |
| 6 mois | 180 jours | 15 000 F | 83 F |
| 12 mois | 365 jours | 30 000 F | 82 F |

Chaque carte affiche le prix total, l'équivalent par mois et le **prix par jour**. Pour changer un prix, modifiez la ligne correspondante dans `js/data.js` (bloc « TARIFS »).

### 12.5 Les likes reçus
- L'écran **Likes** → onglet « Ils vous ont liké ».
- Compte gratuit : **le premier profil est visible**, les autres sont masqués (photo floutée + cadenas Premium).
- Un bandeau indique combien de personnes ont liké et propose **« Voir qui m'a liké »**.
- Un clic sur un profil masqué ouvre la page Abonnements.
- Avec Premium ou pendant l'essai gratuit, **tous les profils sont visibles**.

### 12.6 Les profils vérifiés (badge bleu)

**Le badge existe déjà partout où un profil s'affiche :** sur la carte « Découvrir », sur la fiche complète, dans « Likes », dans « Messages », sur l'accueil, sur le mini-profil et sur votre propre profil.

**Nouveau : la vérification elle-même.** Avant, le bouton ne faisait qu'afficher un message. Maintenant :

1. Allez sur **Profil** → bloc **« Vérification d'identité »** → **« Lancer la vérification »**.
2. Une fenêtre s'ouvre en deux étapes :
   - **Étape 1** : une photo de votre **pièce d'identité** (CNI, passeport ou permis).
   - **Étape 2** : un **selfie** avec la pièce en main.
3. Touchez **« Envoyer mon dossier »**. Le statut passe à **« Vérification en cours… »**, puis le badge **« Vérifié »** apparaît.
4. Le badge reste affiché après avoir fermé et rouvert le site (il est enregistré sur l'appareil).
5. Une fois vérifié, le bloc propose **« Remplacer mes documents »** si vous voulez renvoyer des photos plus nettes.

**Règles appliquées :**
- Les deux photos sont **obligatoires** : un message précise laquelle il manque.
- **Photos uniquement** (JPG, PNG…), **5 Mo maximum** par image.
- Les photos **restent sur votre appareil** : seule une information « vérifié » (et les noms de fichiers) est enregistrée. Les images elles-mêmes ne sont pas stockées dans la mémoire du navigateur.
- Les profils **non vérifiés** n'ont aucun badge : c'est ce qui distingue un profil contrôlé d'un profil quelconque.

**Ce qui reste simulé :** dans cette version, l'**examen du dossier est automatique** (le badge est attribué dès l'envoi). Sur un vrai site, c'est votre équipe (ou un service de contrôle) qui valide chaque dossier avant d'attribuer le badge. La mécanique est prête : il suffira de brancher la réception des photos sur votre serveur et de remplacer la validation automatique par une validation manuelle.

---

## 15. Votre espace administrateur (admin.html)

Vous pouvez suivre l'activité du site et voir vos inscrits. Pour l'ouvrir : **pied de page du site -> « Espace administrateur »**, ou depuis l'application, bouton **Admin** en bas du menu.

**Le code d'accès en démonstration est : `YAMO-ADMIN`** (il se change dans `js/config.js`, ligne « ADMIN_DEMO_CODE »).

### Onglet « Tableau de bord »
- **Visiteurs uniques** : combien de personnes différentes ont ouvert le site sur la période (une même personne n'est comptée qu'une fois par jour).
- **Pages vues** : le nombre total de pages ouvertes, avec la moyenne par jour.
- **Inscriptions** : les nouveaux comptes, et le pourcentage de visiteurs qui s'inscrivent.
- **Abonnés** : combien de comptes ont un abonnement actif.
- Un **graphique par jour**, un tableau **mois par mois** et un tableau **jour par jour** (14 derniers jours).
- Quatre boutons de période : **7 jours, 30 jours, 3 mois, 12 mois**.
- Un comparatif **aujourd'hui / hier** avec la tendance en pourcentage.

### Onglet « Inscrits »
- La **liste complète** : nom, contact, sexe, ville, date d'inscription et statut (Vérifié / Abonné / Compte réel).
- **Recherche** par nom, numéro ou ville, et **filtres** par sexe et par statut.
- Bouton **Exporter la liste** : télécharge un fichier tableur (CSV) ouvrable dans Excel, à partager avec votre équipe.

### Onglet « Profils »
- Le nombre de **profils vérifiés**, de **dossiers en attente** et d'**abonnés**.
- La liste des **dossiers de vérification à contrôler**, avec un bouton **Valider** qui attribue le badge Vérifié.

### Ce qui est réel dans cette version, ce qui est simulé
- **Réel** : chaque visite de page est comptée sur l'appareil (nombre de visites, visiteurs uniques du jour), et chaque **compte réellement créé** (connexion par téléphone) apparaît dans la liste, marqué « Compte réel ».
- **Simulé** : un historique de fréquentation d'exemple (environ 4 mois) et les profils de démonstration, pour que les tableaux soient lisibles avant la mise en ligne.
- **Sur un vrai site** : les chiffres viendront de votre serveur, l'accès exigera une connexion sécurisée avec un compte **administrateur**, et seuls vous et vos collaborateurs verrez ces données. Le site appelle déjà les adresses prévues pour cela.
- **Confidentialité** : aucune donnée personnelle n'est enregistrée pour les statistiques (ni nom, ni photo, ni position) — seulement des compteurs et un identifiant anonyme. Les pièces d'identité envoyées pour la vérification restent privées et ne sont jamais publiées.

### Bon à savoir
- Créez un compte depuis « Créer un compte » (connexion par téléphone, code de démonstration **123456**) : il apparaîtra aussitôt dans la liste des inscrits, avec le sexe que vous avez choisi.
- Le fichier `admin.html` n'a pas à être caché, mais **ne le publiez jamais sans la protection par compte administrateur** : parlez-en avant la mise en ligne.

---

## 13. Corrections apportées lors de la vérification complète

| Problème constaté | Correction |
|---|---|
| Le bouton Like ne changeait pas d'écran | La carte part et le profil suivant s'affiche, avec le message « Like envoyé » |
| La carte de profil était trop étroite sur téléphone | Elle occupe maintenant toute la largeur (358 px sur un écran de 390 px) |
| Les noms du menu du bas étaient coupés | Noms courts et lisibles, bandeau défilable |
| Le badge Premium n'apparaissait pas après l'achat | Badge + date de fin affichés, statut conservé après rechargement |
| Un Super Like partait sans crédit | Il faut un crédit ou Premium, sinon une invitation à acheter s'affiche |
| Le mode invisible ne restait pas enregistré | Il persiste après rechargement |
| Le changement de photo ne faisait qu'afficher un message | Vrai choix de photo, aperçu immédiat et conservation |
| Les boutons App Store / Google Play ne faisaient rien | Ils ouvrent la version web de Yamo |
| Le bouton « Lancer la vérification » ne faisait qu'afficher un message | Vrai parcours : pièce d'identité + selfie, puis badge « Vérifié » attribué et conservé |
| Aucun moyen de suivre l'activité du site | Espace administrateur avec visiteurs uniques, pages vues, inscriptions, répartition femmes / hommes, liste des inscrits et export |

| Un like créait un match au hasard | Le match n'a lieu que si la personne vous avait déjà liké : comme dans la vraie vie, pas de match sans like en retour |
| On pouvait discuter sans match | La discussion exige un match, ou un message direct payant. Un message d'avertissement l'explique sur la fiche |
| Les profils étaient visibles sans abonnement | Seul le 1er like reçu reste visible (aperçu). Les autres sont floutés jusqu'à l'abonnement |
| La formule Femmes n'était pas assez claire | Une seule sélection : la formule Femmes (3 000 F/mois) débloque les likes reçus, le mode invisible et les communautés ; Super Like et message direct restent à l'unité, avec renouvellement mensuel |
| Les paliers hommes n'étaient pas assez visibles | Chaque formule affiche ce qu'elle ouvre (likes visibles, photos, réponses, mode invisible, boosts) |

---

## 12 bis. Comment fonctionnent les matchs et les discussions

La règle est simple : **pas de match, pas de discussion.**

1. **Vous envoyez un like** à quelqu'un qui ne vous a pas encore liké : il reçoit votre like, mais aucun match ne s'ouvre. Le message est « Like envoyé, la discussion s'ouvrira si elle vous like aussi ».
2. **Quelqu'un vous a liké** : vous le voyez dans « Mes likes ». Avec l'abonnement, vous ouvrez son profil complet (photos, bio, centres d'intérêt) **avant** de décider.
3. **Vous likez en retour** : c'est un match. L'écran « C'est un match ! » s'affiche et la discussion s'ouvre immédiatement.
4. **Vous ne voulez pas liker** : vous pouvez envoyer un **message direct** (200 F). La discussion s'ouvre quand même, sans match — c'est le seul autre chemin.
5. Vous pouvez toujours fermer la fiche, la passer ou la signaler.

### Qui voit quoi selon son abonnement

| Formule | Qui vous a liké | Profil et photos | Réponses aux likes |
|---|---|---|---|
| Gratuit | 1 seul visible (aperçu) | Photo principale | Aucune |
| Femmes (formule unique) | Tous | Profil complet + toutes les photos | Illimitées |
| Hommes 1 mois | 1 seul visible | Photo principale | 1 réponse |
| Hommes 3 mois | Tous | Profil complet + toutes les photos | 5 réponses |
| Hommes 6 et 12 mois | Tous | Profil complet + toutes les photos | Illimitées |

Les formules s'additionnent : plus la durée est longue, plus les options s'ouvrent.

### Ce qui reste simulé en mode démonstration
- **Le paiement** ne prélève rien : vous devez brancher Paystack pour encaisser réellement.
- Les nouveaux inscrits sont simulés (pas encore d'alerte venue du serveur).
- Les profils, likes et messages sont des exemples.
- Pour passer en réel : renseignez `js/config.js` (adresse du serveur et clé **publique** uniquement). Ne mettez jamais la clé secrète Paystack ni la clé de service dans le site : elles restent sur votre serveur.

---

## 14. Mettre le site en ligne (rappel)
1. Achetez un hébergement et un domaine.
2. Envoyez **tous les fichiers du dossier** (y compris `manifest.webmanifest`, `sw.js` et `assets/`) dans `public_html`.
3. Vérifiez que le site est en **https** (obligatoire pour l'installation comme app et les notifications).
4. Sur téléphone, ouvrez le site : la bannière « Installer » apparaît, touchez-la et l'icône Yamo s'ajoute à l'écran d'accueil.

---

## 5. Les prix et les règles, en clair

### Les règles de discussion
- **On ne discute qu'avec un match** : un like envoyé et un like reçu. Sans match, aucune conversation ne s'ouvre.
- **Le message direct (200 F)** permet d'écrire à quelqu'un même sans match. C'est la seule exception.
- **Les likes reçus sont masqués** sans abonnement. Avec un abonnement, vous voyez qui c'est, vous ouvrez la fiche complète avec toutes les photos, puis vous likez en retour : le match se crée et la discussion s'ouvre tout de suite dans « Messages ».

### Les abonnements
- **Femmes : une seule formule à 3 000 F par mois.** Elle ouvre : voir qui vous a likée, fiches complètes et toutes les photos, réponses à tous les likes, mode invisible, badge Membre et accès aux communautés. Aucun palier.
- **Le Super Like (500 F) et le message direct (200 F) ne sont pas inclus** pour les femmes : ils s'achètent à l'unité, quand elles en ont besoin.
- **Renouvellement mensuel** : à la fin du mois, l'abonnement Femmes s'arrête. Un message le signale et le bouton devient « Me réabonner — 3 000 F ». Le compte et l'historique sont conservés.
- **Hommes : quatre durées, 3 000 F (1 mois), 9 000 F (3 mois), 15 000 F (6 mois), 30 000 F (12 mois).** Plus la formule est longue, plus d'options s'ouvrent (mode invisible et badge à partir de 3 mois, communautés et boosts offerts à partir de 3 mois également).
- Un **essai gratuit de 7 jours** est proposé une seule fois.

### Les achats à l'unité
| Option | Prix | À quoi ça sert |
|---|---|---|
| Super Like | 500 F | Votre profil passe devant les autres chez cette personne. Acheté puis consommé à chaque envoi. |
| Message direct | 200 F | Écrire à quelqu'un sans attendre un match. |
| Boost 1 jour | 1 000 F | Votre profil apparaît en tête de « Découvrir » pendant 24 h, avec l'étiquette « Boosté ». |
| Boost 3 jours | 2 500 F | Trois jours en tête des profils. |
| Boost 7 jours | 5 000 F | Une semaine complète en tête des profils. |

Sans crédit de Super Like, une fenêtre propose directement l'achat à 500 F. Le crédit acheté est débité au moment de l'envoi. Depuis « Abonnements », la section « Booster mon profil » indique le temps restant et permet d'arrêter le boost.

### Ce qui est simulé dans cette version
- **Les paiements** : aucun argent n'est réellement prélevé (mode démonstration). Pour encaisser réellement, il faut brancher un moyen de paiement (Mobile Money / carte) sur un site en ligne.
- **Les profils et les conversations** : ce sont des profils de démonstration, pas de vraies personnes.
- **Les notifications et l'installation de l'application sur téléphone** demandent un site en ligne sécurisé (https).


### Protection renforcée de l'espace administrateur

- Après **5 codes incorrects**, l'accès est bloqué pendant **5 minutes**. Même le bon code est refusé pendant ce temps.
- Chaque connexion réussie est inscrite dans un **journal** (date et heure), gardé sur l'appareil.
- L'écran d'entrée rappelle que cet espace est réservé à l'administrateur.
- **Point important à comprendre** : dans cette version de démonstration, la protection est faite dans le navigateur. Lorsque le site sera relié à votre serveur, l'accès devra être vérifié par le serveur (compte administrateur avec le rôle « admin ») : un simple code ne suffira plus, et le tableau de bord refusera toute personne qui n'est pas connectée comme administrateur. Il ne faut jamais mettre de mot de passe ni de clé secrète dans le fichier de configuration du site.
- Valider un dossier dans l'onglet « Profils » attribue maintenant réellement le badge « Vérifié » au profil, et ce badge reste après rechargement.

---

## 16. Pays, villes et 6 photos (dernière version)

### 16.1 L'inscription n'est plus réservée à la Côte d'Ivoire

À l'inscription (par téléphone **ou** par e-mail), on choisit maintenant :

1. **Je suis** : homme ou femme — ce choix est enregistré et repris dans le profil.
2. **Où habitez-vous** : le pays, puis la ville.
3. **Le contact** : numéro de téléphone ou adresse e-mail.

Le pays choisi **règle l'indicatif téléphonique** : un numéro sénégalais est enregistré avec `+221`, un numéro français avec `+33`, etc. Une personne qui vit à Dakar, Paris ou Montréal peut donc s'inscrire normalement.

**Les 18 pays proposés :** Côte d'Ivoire, Burkina Faso, Mali, Sénégal, Togo, Bénin, Guinée, Cameroun, Gabon, RD Congo, Congo-Brazzaville, Tchad, Maroc, France, Belgique, Canada, États-Unis, et **« Autre pays »**.

Avec « Autre pays », la liste des villes disparaît et un champ libre apparaît : on écrit sa ville à la main. La ville tapée est **vérifiée** : si elle est vide, le site répond « Choisissez votre ville » et n'ouvre pas la suite. Rien n'est enregistré à moitié.

**Pour ajouter un pays vous-même :** ouvrez `js/countries.js`. Chaque pays tient sur une ligne :

```js
{ code: 'GH', dial: '+233', flag: '🇬🇭', name: 'Ghana', cities: ['Accra', 'Kumasi', 'Tamale'] },
```

Copiez une ligne, changez le code (2 lettres), l'indicatif, le nom et les villes, et placez-la dans la liste. Sauvegardez : c'est fait, le pays apparaît partout (inscription et profil).

### 16.2 Six photos de profil

- Jusqu'à **6 photos** par profil ; la **première est la photo principale**, celle que l'on voit en premier.
- Sur chaque photo : **×** pour la retirer, et sur les autres photos une coche pour la **passer en photo principale**.
- **1 Mo maximum par photo.** Une photo trop lourde est refusée avec un message clair.
- **Au moins une photo est obligatoire** : le site refuse de retirer la dernière.
- Les photos sont conservées après fermeture du site (sur le téléphone ou l'ordinateur de la personne).

> **Bon à savoir :** les photos restent pour l'instant dans le navigateur de l'appareil. Le jour où le serveur sera branché, elles seront envoyées et stockées côté serveur, et visibles par les autres membres.

### 16.3 Ce qui reste simulé

- Les **profils des autres membres** sont des exemples.
- Le **code envoyé « par WhatsApp »** affiche en démonstration le code `123456`.
- Les **paiements** ne débitent rien.
- La **vérification d'identité** enregistre le dossier mais ne l'examine pas.

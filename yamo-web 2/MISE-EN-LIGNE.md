# Mettre Yamo en ligne — pas à pas

Ce guide vous accompagne de zéro jusqu'à un site accessible avec une adresse `https://`.
Aucune connaissance technique n'est nécessaire : suivez les étapes dans l'ordre.

---

## Avant de commencer : ce que vous avez entre les mains

Le dossier `yamo-web` contient un site **complet et fonctionnel**, mais en **mode démonstration** :

| Ce qui marche vraiment | Ce qui est simulé |
|---|---|
| Toutes les pages, la navigation, l'affichage sur téléphone | Les autres membres (profils d'exemple) |
| L'inscription (e-mail ou téléphone), le choix du pays et de la ville | L'envoi réel du code par WhatsApp (en démonstration, le code est toujours `123456`) |
| Les 6 photos de profil, le profil, les préférences | Les paiements (aucun argent n'est débité) |
| L'installation comme application et l'ouverture sans connexion | Les messages, les likes et les notifications des autres membres |
| L'espace administrateur (liste des inscrits de cet appareil) | La vérification des pièces d'identité (elle est enregistrée, pas contrôlée) |

Autrement dit : **le site peut être mis en ligne aujourd'hui** et il donnera une impression juste et professionnelle. Pour que les membres se parlent réellement entre eux, il faudra ensuite brancher la partie serveur (étape 7 de ce guide).

---

## Étape 1 — Vérifier le dossier (2 minutes)

Ouvrez le dossier `yamo-web`, vous devez voir exactement :

```
yamo-web
├── index.html          ← la page d'accueil publique
├── auth.html           ← inscription / connexion
├── app.html            ← l'application du membre
├── admin.html          ← votre espace administrateur
├── manifest.webmanifest
├── sw.js
├── GUIDE.md            ← le mode d'emploi complet
├── MISE-EN-LIGNE.md    ← ce guide
├── css/  js/  assets/
```

Deux règles simples :

1. **Ne renommez jamais** `index.html` : c'est le nom que tous les hébergeurs affichent par défaut.
2. **Gardez tous les fichiers ensemble** : si vous déplacez `index.html` seul, les images et les couleurs disparaissent.

---

## Étape 2 — Choisir un hébergement

Trois solutions, de la plus simple à la plus complète.

### A. Netlify Drop — le plus simple, gratuit pour essayer

1. Allez sur le site de Netlify et cherchez « Netlify Drop ».
2. Créez un compte gratuit (une adresse e-mail suffit).
3. Glissez-déposez **le dossier `yamo-web` entier** dans la zone indiquée.
4. Attendez quelques secondes : vous recevez une adresse du type `https://nom-au-hasard.netlify.app`.
5. C'est en ligne. Le `https` (le petit cadenas) est automatique.

**Pourquoi c'est recommandé pour commencer :** c'est gratuit, instantané, et l'installation sur téléphone fonctionne tout de suite.

### B. Votre hébergeur (Ibraci Links ou un autre en Côte d'Ivoire)

1. Prenez un hébergement « vitrine / Linux » avec un nom de domaine (`yamo.ci`, `yamo.africa`…).
2. Demandez à l'hébergeur d'activer le **certificat SSL gratuit** (Let's Encrypt). Sans lui, pas de cadenas et pas d'installation sur téléphone.
3. Connectez-vous au gestionnaire de fichiers (cPanel) et ouvrez le dossier **`public_html`**.
4. Envoyez-y **tout le contenu** du dossier `yamo-web` (pas le dossier lui-même, son contenu).
5. Vérifiez que `index.html` est bien à la racine de `public_html`.

### C. Vercel ou Cloudflare Pages

Même principe que Netlify : on connecte le dossier, l'adresse `https` est fournie automatiquement. Bien si vous voulez plus tard un nom de domaine personnel.

---

## Étape 3 — Vérifier que tout est en ligne (5 minutes)

Ouvrez votre adresse sur un ordinateur, puis sur votre téléphone, et cochez :

- [ ] La page d'accueil s'affiche avec le logo Yamo et les couleurs.
- [ ] Le cadenas `https` apparaît à côté de l'adresse.
- [ ] Le bouton **« Se connecter »** ouvre bien la page d'inscription.
- [ ] Une inscription de test fonctionne (utilisez votre vrai nom, vous pourrez la supprimer).
- [ ] Les photos s'affichent (aucun carré gris).
- [ ] Sur téléphone, rien ne dépasse de l'écran, rien n'est coupé.

Si quelque chose ne va pas, notez la page concernée et ce que vous voyez : c'est ce qui permet de corriger vite.

---

## Étape 4 — Installer l'application sur Android

1. Ouvrez le site avec **Chrome** sur le téléphone Android.
2. Attendez quelques secondes : un bandeau **« Installer Yamo »** apparaît en bas.
3. Touchez **Installer**, puis confirmez.
4. L'icône Yamo s'ajoute à l'écran d'accueil. En l'ouvrant, le site s'affiche **en plein écran**, sans barre d'adresse.

**Si le bandeau n'apparaît pas :**
- ouvrez le menu de Chrome (les trois points en haut à droite) puis choisissez **« Installer l'application »** ou **« Ajouter à l'écran d'accueil »** ;
- vérifiez que vous êtes bien en `https` et que vous n'avez pas touché la croix du bandeau auparavant (dans ce cas, videz les données du site ou utilisez la navigation privée pour réessayer).

---

## Étape 5 — Installer l'application sur iPhone

Sur iPhone, l'installation se fait **toujours depuis Safari** (pas depuis Chrome ni Facebook).

1. Ouvrez le site avec **Safari**.
2. Touchez le bouton **Partager** (le carré avec une flèche vers le haut), en bas de l'écran.
3. Faites défiler le menu et touchez **« Sur l'écran d'accueil »**.
4. Touchez **Ajouter** en haut à droite.
5. L'icône Yamo est sur l'écran d'accueil ; en l'ouvrant, le site s'affiche en plein écran.

Le bouton « Installer » du site affiche lui aussi ces trois étapes si vous le touchez depuis un iPhone.

**À savoir sur iPhone :** les notifications « poussées » demandent iOS 16.4 ou plus récent et une installation depuis l'écran d'accueil. Sur les versions plus anciennes, le site fonctionne normalement, simplement sans alertes.

---

## Étape 6 — Les réglages à faire avant d'annoncer le site

Ouvrez le fichier **`js/config.js`** avec un simple éditeur de texte et modifiez uniquement ces lignes :

```js
SUPPORT_WHATSAPP: '2250700000000',   // votre numéro, sans + ni espaces
```

Ce numéro sert au bouton d'aide / contact. **Ne mettez jamais** dans ce fichier une clé secrète, un mot de passe ou une clé Paystack : tout ce qui est dans ce fichier est visible par n'importe quel visiteur.

Une fois le site en ligne, remplacez aussi le texte « Version de démonstration » si vous ne voulez pas l'afficher : c'est le bandeau `demo-banner` dans `app.html`, et l'option `DEMO_MODE` dans `js/config.js`. **Attention :** passer `DEMO_MODE` à `false` *avant* d'avoir branché le serveur vide l'application de ses profils. Laissez-le à `true` tant que l'étape 7 n'est pas faite.

---

## Étape 7 — Pour des membres qui se parlent vraiment (la suite)

Le site actuel n'a **pas de serveur** : chaque téléphone garde ses informations pour lui. Pour que deux personnes se voient et se parlent réellement, il faut brancher une base de données et un serveur.

Ce qu'il faudra, dans l'ordre :

1. **Une base de données** (Supabase est le choix le plus simple et gratuit au départ) : comptes, profils, photos, messages.
2. **Un envoi réel de code WhatsApp** : un compte WhatsApp Business chez Meta, avec un modèle de message validé. Les clés secrètes restent sur le serveur, jamais dans le site.
3. **Les paiements** : un compte Paystack en Côte d'Ivoire, avec un serveur qui confirme chaque paiement. Jamais de clé secrète dans le site.
4. **Un vrai espace administrateur** : l'accès devra être vérifié par le serveur, pas par un simple code.
5. **Les obligations légales** : conditions d'utilisation, politique de confidentialité, et un moyen de supprimer un compte et ses photos.

Dites-le-moi quand vous voudrez passer à cette étape : c'est un travail de plusieurs jours, mais le site que vous avez déjà sert de base solide.

---

## Récapitulatif en une page

| Étape | Ce que vous faites | Durée |
|---|---|---|
| 1 | Vérifier le dossier | 2 min |
| 2 | Glisser le dossier chez Netlify (ou l'envoyer sur votre hébergement) | 10 min |
| 3 | Vérifier sur ordinateur et téléphone | 5 min |
| 4 | Installer sur Android | 2 min |
| 5 | Installer sur iPhone | 2 min |
| 6 | Mettre votre numéro de contact dans `js/config.js` | 2 min |
| 7 | Brancher le serveur (plus tard, sur demande) | plusieurs jours |

**Ne faites jamais :**
- envoyer un mot de passe ou une clé secrète par WhatsApp ;
- mettre une clé secrète dans `js/config.js` ;
- modifier `index.html`, `app.html` ou `sw.js` sans sauvegarde préalable.

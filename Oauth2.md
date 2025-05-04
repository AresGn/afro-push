Pour intégrer l’authentification OAuth2 avec **Google, Facebook et X (Twitter)** dans une application Next.js, la méthode la plus simple et robuste est d’utiliser la bibliothèque [NextAuth.js](https://next-auth.js.org/), qui prend en charge ces trois providers. Voici un guide étape par étape pour mettre en place cette solution.

## 1. Installer NextAuth.js et les providers

Dans votre terminal, installez NextAuth.js :

```bash
npm install next-auth
```

Pour Google et Facebook, les providers sont inclus dans NextAuth.js. Pour X (anciennement Twitter), utilisez le provider `@next-auth/twitter` ou suivez la documentation officielle si le nom a changé.

## 2. Créer les applications sur les consoles développeurs

Vous aurez besoin de créer une application sur chaque console développeur pour obtenir les identifiants (client ID et secret) :

- **Google** : [Google Cloud Console](https://console.cloud.google.com/)  
- **Facebook** : [Facebook Developers](https://developers.facebook.com/)  
- **X (Twitter)** : [Twitter Developer Portal](https://developer.twitter.com/)

Renseignez bien les URLs de redirection :  
`http://localhost:3000/api/auth/callback/google`  
`http://localhost:3000/api/auth/callback/facebook`  
`http://localhost:3000/api/auth/callback/twitter`

## 3. Ajouter les variables d’environnement

Dans votre fichier `.env.local` :

```
GOOGLE_ID=VotreGoogleClientID
GOOGLE_SECRET=VotreGoogleClientSecret

FACEBOOK_ID=VotreFacebookAppID
FACEBOOK_SECRET=VotreFacebookAppSecret

TWITTER_ID=VotreTwitterClientID
TWITTER_SECRET=VotreTwitterClientSecret

NEXTAUTH_URL=http://localhost:3000
```

## 4. Configurer NextAuth.js

Créez le fichier `pages/api/auth/[...nextauth].js` et configurez les providers :

```javascript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import TwitterProvider from "next-auth/providers/twitter"; // ou XProvider selon la version

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID,
      clientSecret: process.env.TWITTER_SECRET,
    }),
  ],
});
```
**Remarque** : Le nom du provider pour X/Twitter peut varier selon la version de NextAuth.js. Vérifiez la [documentation officielle](https://next-auth.js.org/providers/twitter) pour la syntaxe exacte.

## 5. Ajouter les boutons de connexion

Dans votre composant React, utilisez les hooks NextAuth :

```javascript
import { signIn, signOut, useSession } from "next-auth/react";

export default function Login() {
  const { data: session } = useSession();

  if (session) {
    return (
      <>
        Connecté en tant que {session.user.email}
         signOut()}>Se déconnecter
      
    );
  }

  return (
    <>
       signIn("google")}>Connexion Google
       signIn("facebook")}>Connexion Facebook
       signIn("twitter")}>Connexion X (Twitter)
    
  );
}
```


## 6. Tester

- Lancez votre app (`npm run dev`)
- Accédez à la page de connexion
- Testez chaque provider

---

### Points importants

- **Sécurité** : Ne partagez jamais vos secrets, gardez-les dans `.env.local`.
- **Déploiement** : Pensez à mettre à jour les URLs de redirection dans les consoles développeurs lors du passage en production.
- **Personnalisation** : NextAuth.js permet de personnaliser les callbacks, la gestion des sessions, etc.

---

### Ressources complémentaires

- [Exemple complet Google/Facebook avec NextAuth.js](https://freakyjolly.com/facebook-google-login-auth-in-next-js-application-using-nextauth/)[2]
- [Documentation NextAuth.js](https://next-auth.js.org)[4]

---

**En résumé** :  
Vous pouvez intégrer Google, Facebook et X (Twitter) en quelques minutes dans Next.js avec NextAuth.js, en configurant les providers dans le fichier `[...nextauth].js` et en ajoutant les boutons de connexion sur votre interface.

Citations:
[1] https://www.youtube.com/watch?v=ysj0XNAolEc
[2] https://freakyjolly.com/facebook-google-login-auth-in-next-js-application-using-nextauth/
[3] https://clouddevs.com/next/authentication-providers/
[4] https://next-auth.js.org
[5] https://www.youtube.com/watch?v=dGB4LKK4I2c
[6] https://moldstud.com/articles/p-implementing-nextjs-authentication-with-oauth-integrating-social-login-for-seamless-user-experience
[7] https://blog.nonstopio.com/simplifying-oauth-using-nextauth-in-nextjs-74122a3ae794?gi=b8b178124f3a
[8] https://dev.to/syedmuhammadaliraza/nextjs-authentication-3oc7
[9] https://dev.to/emaanidev/implementing-secure-social-login-authentication-in-nextjs-13-with-nextauthjs-303d
[10] https://dev.to/vyan/exploring-authentication-providers-in-nextjs-4nh7
[11] https://www.contentful.com/blog/nextjs-authentication/
[12] https://dev.to/twisha/comment/1f736
[13] https://github.com/willwill96/Oauth2-Nextjs-Examples
[14] https://www.youtube.com/watch?v=AbUVY16P4Ys
[15] https://www.youtube.com/watch?v=XQbiMiNah0o
[16] https://github.com/willwill96/Oauth2-Nextjs-Examples/blob/main/README.md
[17] https://dev.to/whoisryosuke/nextjs-and-authentication-using-oauth2-and-jwt-3gc6
[18] https://codezup.com/oauth-2-0-next-js-secure-user-authentication/
[19] https://dzone.com/articles/how-to-implement-oauth-with-services-in-your-nextj
[20] https://www.npmjs.com/package/next-auth

---

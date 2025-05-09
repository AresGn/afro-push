# Migration de AfroPush vers Supabase

Ce document présente les étapes nécessaires pour migrer la base de données de l'application AfroPush vers Supabase. La migration consiste à passer de Prisma avec PostgreSQL local vers Supabase.

## Étapes préalables

1. Créer un projet Supabase sur [app.supabase.com](https://app.supabase.com/)
2. Obtenir les informations de connexion à Supabase:
   - URL du projet
   - Clé anon/public
   - Clé service role (pour les opérations administratives)

## 1. Configuration de l'environnement

Mettre à jour le fichier `.env` avec les informations de connexion Supabase:

```
# Supabase configuration
NEXT_PUBLIC_SUPABASE_URL="https://votre-projet-url.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="votre-clé-anon"
SUPABASE_SERVICE_ROLE_KEY="votre-clé-service-role"
```

## 2. Mise en place du schéma de base de données

### Option 1: Utiliser l'interface SQL de Supabase

1. Accéder à l'onglet SQL dans le tableau de bord Supabase
2. Exécuter les scripts SQL suivants dans cet ordre:
   - `migrations/users.sql`
   - `migrations/profiles.sql`
   - `migrations/auth_tables.sql`

### Option 2: Utiliser la CLI Supabase (pour développement)

1. Installer la CLI Supabase: `npm install -g supabase`
2. Initialiser Supabase localement: `supabase init`
3. Configurer le projet: `supabase link --project-ref <votre-référence-projet>`
4. Exécuter les migrations: `supabase db push`

## 3. Migration des données

Exécuter le script de migration pour transférer les données:

```bash
# Installer les dépendances si nécessaire
npm install

# Exécuter le script de migration
npx ts-node scripts/migrate-to-supabase.ts
```

Ce script va:
1. Lire les données depuis la base de données PostgreSQL locale via Prisma
2. Insérer ces données dans les tables correspondantes de Supabase
3. Maintenir les relations entre les tables

## 4. Mise à jour de l'authentification

Pour configurer les fournisseurs d'authentification OAuth:

1. Dans le tableau de bord Supabase, aller dans Authentication > Providers
2. Activer les fournisseurs souhaités (Google, Facebook, Twitter)
3. Configurer les URLs de redirection: `https://votre-domaine.com/api/auth/callback/[provider]`
4. Mettre à jour les ID client et secrets dans les paramètres

## 5. Vérification

Pour vérifier que la migration s'est bien déroulée:

1. Vérifier que les tables ont bien été créées dans Supabase (onglet Table Editor)
2. Vérifier que les données ont bien été migrées
3. Tester l'authentification avec les différents fournisseurs
4. Tester les fonctionnalités principales de l'application

## 6. Problèmes connus et solutions

### Connexion à Supabase échoue

Vérifier:
- Les variables d'environnement sont correctement définies
- Le projet Supabase est actif
- Les règles de sécurité (RLS) sont correctement configurées

### Erreurs d'authentification

Vérifier:
- Les fournisseurs OAuth sont correctement configurés
- Les URLs de redirection sont corrects
- Les ID client et secrets sont à jour

### Problèmes de migration de données

- Exécuter le script avec l'option verbose pour plus de détails
- Vérifier les contraintes d'intégrité (clés étrangères, valeurs uniques)
- Vérifier les types de données entre Prisma et Supabase

## Ressources utiles

- [Documentation Supabase](https://supabase.io/docs)
- [Supabase Auth Helpers pour NextJS](https://supabase.com/docs/guides/auth/auth-helpers/nextjs)
- [Guide de migration depuis Firebase](https://github.com/supabase-community/firebase-to-supabase) 
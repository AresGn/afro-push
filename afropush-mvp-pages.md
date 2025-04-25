# Description des pages du MVP AfroPush

## Pages Marketing (Public)

### Page d'accueil (`/`)
- **Description**: Vitrine principale de l'application
- **Fonctionnalités**:
  - Présentation du concept avec illustrations
  - Explications des avantages pour créateurs et annonceurs
  - Call-to-action pour inscription séparés (créateur/annonceur)
  - Témoignages de premiers utilisateurs
  - FAQ basique
  - Statistiques (nombre de créateurs, campagnes réalisées)

### À propos (`/about`)
- **Description**: Présentation détaillée du projet et de l'équipe
- **Fonctionnalités**:
  - Histoire et mission d'AfroPush
  - Présentation de l'équipe
  - Focus sur l'impact pour les entrepreneurs africains
  - Vision et feuille de route

### Tarification (`/pricing`)
- **Description**: Explication du modèle économique et des commissions
- **Fonctionnalités**:
  - Structure des commissions sur transactions
  - Avantages par rapport aux solutions publicitaires traditionnelles
  - Comparatif des coûts (Meta Ads vs AfroPush)
  - FAQ sur les paiements

### Créateurs (`/creators`)
- **Description**: Page ciblant spécifiquement les créateurs de contenu
- **Fonctionnalités**:
  - Explication des bénéfices (revenus, visibilité, contrôle)
  - Instructions pour créer un bon profil
  - Exemples de tarifs pratiqués
  - Témoignages de créateurs
  - CTA pour inscription

### Annonceurs (`/advertisers`)
- **Description**: Page ciblant spécifiquement les annonceurs potentiels
- **Fonctionnalités**:
  - Avantages de la publicité via les créateurs locaux
  - Exemples de résultats de campagnes
  - Guide pour identifier les bons partenaires
  - CTA pour inscription

## Pages d'Authentification

### Connexion (`/login`)
- **Description**: Page de connexion unifiée
- **Fonctionnalités**:
  - Formulaire de connexion (email/mot de passe)
  - Option "Se souvenir de moi"
  - Connexion avec réseaux sociaux (option)
  - Lien vers inscription et récupération mot de passe

### Inscription Créateur (`/register/creator`)
- **Description**: Formulaire d'inscription spécifique aux créateurs
- **Fonctionnalités**:
  - Informations personnelles (nom, email, téléphone)
  - Informations sur audience (plateformes, nombre d'abonnés)
  - Upload photo profil
  - Choix de mot de passe
  - Termes et conditions

### Inscription Annonceur (`/register/advertiser`)
- **Description**: Formulaire d'inscription spécifique aux annonceurs
- **Fonctionnalités**:
  - Informations personnelles ou entreprise
  - Type d'activité et secteur
  - Budget publicitaire mensuel estimé
  - Choix de mot de passe
  - Termes et conditions

### Récupération mot de passe (`/forgot-password`)
- **Description**: Processus de réinitialisation de mot de passe
- **Fonctionnalités**:
  - Saisie d'email
  - Confirmation d'envoi
  - Page de création nouveau mot de passe

## Dashboard Créateur

### Profil Créateur (`/creator/profile`)
- **Description**: Gestion du profil créateur
- **Fonctionnalités**:
  - Édition des informations personnelles
  - Upload/édition photo
  - Liens vers réseaux sociaux
  - Description et bio
  - Statistiques d'audience
  - Catégories et tags de contenu

### Services Créateur (`/creator/services`)
- **Description**: Gestion des offres de services publicitaires
- **Fonctionnalités**:
  - Liste des services proposés
  - Formulaire d'ajout/édition de service
  - Tarifs par plateforme/durée
  - Conditions et restrictions
  - Exemples de publications précédentes

### Campagnes Créateur (`/creator/campaigns`)
- **Description**: Suivi des campagnes publicitaires
- **Fonctionnalités**:
  - Liste des campagnes (en attente, en cours, terminées)
  - Détails des campagnes actives
  - Calendrier des publications prévues
  - Boutons d'actions (accepter, refuser, marquer comme terminé)
  - Upload des preuves de publication

### Analytics Créateur (`/creator/analytics`)
- **Description**: Statistiques et performances
- **Fonctionnalités**:
  - Statistiques générales (vues de profil, taux d'acceptation)
  - Performance des campagnes passées
  - Graphiques d'activité et de revenus
  - Feedback des annonceurs

### Revenus Créateur (`/creator/earnings`)
- **Description**: Suivi des revenus et paiements
- **Fonctionnalités**:
  - Solde actuel
  - Historique des paiements
  - Configuration des méthodes de retrait (Mobile Money)
  - Demande de retrait
  - Factures et reçus

## Dashboard Annonceur

### Profil Annonceur (`/advertiser/profile`)
- **Description**: Gestion du profil annonceur
- **Fonctionnalités**:
  - Édition des informations personnelles/entreprise
  - Logo et branding
  - Secteur d'activité
  - Moyens de paiement
  - Paramètres de compte

### Découverte Créateurs (`/advertiser/discover`)
- **Description**: Recherche et exploration des créateurs disponibles
- **Fonctionnalités**:
  - Filtres avancés (localisation, audience, catégorie, tarifs)
  - Cartes profil des créateurs
  - Recherche par mot-clé
  - Tri par pertinence/popularité/prix
  - Sauvegarde de favoris
  - Bouton contact direct

### Campagnes Annonceur (`/advertiser/campaigns`)
- **Description**: Gestion des campagnes publicitaires
- **Fonctionnalités**:
  - Liste des campagnes (en attente, en cours, terminées)
  - Création nouvelle campagne
  - Suivi des publications prévues/réalisées
  - Budget dépensé/restant
  - Preuves de publication
  - Validation des livrables

### Analytics Annonceur (`/advertiser/analytics`)
- **Description**: Suivi des performances des campagnes
- **Fonctionnalités**:
  - Vue d'ensemble des campagnes actives
  - Statistiques par créateur/campagne
  - Indicateurs de performance (engagement, clics)
  - ROI estimé
  - Comparaison des performances

## Messagerie

### Liste des conversations (`/messages`)
- **Description**: Interface de messagerie principale
- **Fonctionnalités**:
  - Liste des conversations actives
  - Indicateurs de messages non lus
  - Recherche de conversations
  - Tri par date/statut
  - Aperçu du dernier message

### Conversation individuelle (`/messages/[conversationId]`)
- **Description**: Interface de conversation avec un utilisateur
- **Fonctionnalités**:
  - Historique des messages
  - Envoi de nouveaux messages
  - Partage de fichiers (images, briefs)
  - Propositions de prix
  - Confirmation d'accord
  - Lien vers paiement/campagne

## Pages de Paiement

### Processus de paiement (`/payment/[campaignId]`)
- **Description**: Interface de paiement sécurisée
- **Fonctionnalités**:
  - Récapitulatif de la commande
  - Choix du mode de paiement (Mobile Money prioritaire)
  - Formulaire de paiement
  - Confirmation et reçu
  - Redirection vers la campagne
  
### Confirmation de paiement (`/payment/confirmation`)
- **Description**: Page de confirmation après paiement réussi
- **Fonctionnalités**:
  - Message de confirmation
  - Récapitulatif de la transaction
  - Détails du service acheté
  - Actions suivantes (contacter créateur, voir campagne)
  - Option d'envoi du reçu par email

## Pages Administratives (pour MVP avancé)

### Tableau de bord admin (`/admin/dashboard`)
- **Description**: Interface d'administration basique
- **Fonctionnalités**:
  - Statistiques générales de la plateforme
  - Utilisateurs récemment inscrits
  - Transactions récentes
  - Alertes et signalements

### Gestion des utilisateurs (`/admin/users`)
- **Description**: Administration des comptes utilisateurs
- **Fonctionnalités**:
  - Liste des utilisateurs
  - Filtres (créateurs/annonceurs)
  - Actions (suspendre, valider, supprimer)
  - Vérification de profils

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


```plaintext
AfroPush/
├── public/
│   ├── favicon.ico
│   ├── logo.svg
│   └── images/
│       ├── avatars/
│       ├── badges/
│       └── illustrations/
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── register/
│   │   │   │   ├── creator/page.tsx
│   │   │   │   └── advertiser/page.tsx
│   │   │   └── forgot-password/page.tsx
│   │   ├── (dashboard)/
│   │   │   ├── layout.tsx
│   │   │   ├── creator/
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── services/page.tsx
│   │   │   │   ├── campaigns/page.tsx
│   │   │   │   ├── analytics/page.tsx
│   │   │   │   └── earnings/page.tsx
│   │   │   ├── advertiser/
│   │   │   │   ├── profile/page.tsx
│   │   │   │   ├── discover/page.tsx
│   │   │   │   ├── campaigns/page.tsx
│   │   │   │   └── analytics/page.tsx
│   │   │   └── messages/
│   │   │       ├── page.tsx
│   │   │       └── [conversationId]/page.tsx
│   │   ├── (marketing)/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── creators/page.tsx
│   │   │   └── advertisers/page.tsx
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/route.ts
│   │   │   ├── users/route.ts
│   │   │   ├── campaigns/route.ts
│   │   │   ├── services/route.ts
│   │   │   ├── messages/route.ts
│   │   │   ├── analytics/route.ts
│   │   │   └── payments/
│   │   │       ├── route.ts
│   │   │       ├── webhook/route.ts
│   │   │       └── verify/route.ts
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Badge.tsx
│   │   │   └── ...
│   │   ├── layout/
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── Navigation.tsx
│   │   ├── forms/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   ├── ProfileForm.tsx
│   │   │   └── ServiceForm.tsx
│   │   ├── creators/
│   │   │   ├── CreatorCard.tsx
│   │   │   ├── ServiceItem.tsx
│   │   │   ├── CreatorProfile.tsx
│   │   │   └── CreatorAnalytics.tsx
│   │   ├── advertisers/
│   │   │   ├── CampaignCard.tsx
│   │   │   ├── CampaignForm.tsx
│   │   │   └── AnalyticsDashboard.tsx
│   │   ├── messaging/
│   │   │   ├── Conversation.tsx
│   │   │   ├── MessageList.tsx
│   │   │   └── MessageInput.tsx
│   │   └── shared/
│   │       ├── Avatar.tsx
│   │       ├── Loading.tsx 
│   │       ├── ErrorBoundary.tsx
│   │       └── EmptyState.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useForm.ts
│   │   ├── useCreator.ts
│   │   ├── useAdvertiser.ts
│   │   ├── useMessages.ts
│   │   └── useAnalytics.ts
│   ├── lib/
│   │   ├── db.ts
│   │   ├── auth.ts
│   │   ├── api.ts
│   │   ├── payments.ts
│   │   ├── validation.ts
│   │   └── utils.ts
│   ├── types/
│   │   ├── user.ts
│   │   ├── creator.ts
│   │   ├── advertiser.ts
│   │   ├── campaign.ts
│   │   ├── service.ts
│   │   └── payment.ts
│   ├── context/
│   │   ├── AuthContext.tsx
│   │   ├── UIContext.tsx
│   │   └── MessagingContext.tsx
│   ├── services/
│   │   ├── userService.ts
│   │   ├── creatorService.ts
│   │   ├── advertiserService.ts
│   │   ├── paymentService.ts
│   │   └── analyticsService.ts
│   └── styles/
│       └── globals.css
├── prisma/
│   └── schema.prisma
├── .env.local
├── .env.example
├── package.json
├── tailwind.config.js
├── next.config.js
├── middleware.ts
└── tsconfig.json

```

Voici une architecture détaillée pour votre projet AfroPush avec Next.js, spécialement conçue pour un MVP efficace avec une approche Mobile First:

## Points clés de cette architecture

### Organisation par fonctionnalités

L'architecture est organisée principalement selon les fonctionnalités plutôt que par types de fichiers, ce qui facilite la navigation et la maintenance au fur et à mesure que le projet grandit.

### App Router de Next.js 13+

J'ai utilisé la nouvelle structure App Router de Next.js qui offre:
- Un routage plus intuitif basé sur les dossiers
- Une meilleure performance avec le Server Components
- Des groupes de routes (entre parenthèses) pour organiser la logique sans affecter les URLs

### Séparation claire des rôles

La structure distingue clairement les deux types d'utilisateurs:
- Créateurs de contenu (`/creator/`)
- Annonceurs (`/advertiser/`)

### Composants réutilisables

Les composants sont organisés en catégories logiques:
- `ui/`: composants atomiques réutilisables 
- `layout/`: structure générale de l'application
- `forms/`, `creators/`, `advertisers/`: composants spécifiques aux fonctionnalités

### API Routes optimisées

Les routes API sont regroupées par domaine fonctionnel, facilitant l'intégration future avec les services de paiement mobile africains et les API de réseaux sociaux.

## Avantages pour le développement mobile-first

1. **Structure optimisée pour les écrans mobiles**: Les composants sont conçus pour être rendus d'abord sur mobile
2. **Performance optimisée**: Chargement progressif et réutilisation des composants
3. **Adaptation future simplifiée**: Architecture prête pour l'expansion vers une PWA complète

## Conseils de mise en œuvre

1. **Commencez par les fonctionnalités essentielles**:
   - Inscription et profils
   - Annonces de services créateurs
   - Recherche pour annonceurs
   - Messagerie de base

2. **Utilisez Tailwind pour le responsive design**:
   ```css
   /* Dans votre CSS global */
   @tailwind base;
   @tailwind components;
   @tailwind utilities;
   ```

3. **Implémentez d'abord les routes marketing** pour attirer les premiers utilisateurs, puis développez le dashboard

4. **Intégrez Mobile Money tôt** dans le processus car c'est un différenciateur clé

5. **Gardez la structure légère au début** et étendez-la au fur et à mesure que vous validez les fonctionnalités

Cette architecture vous donne une base solide pour développer votre MVP tout en maintenant la possibilité d'évoluer facilement vers une application plus complexe à mesure que votre base d'utilisateurs grandit.


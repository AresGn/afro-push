"use client";

export default function StatisticsSection() {
  const stats = [
    { number: '500+', label: 'Créateurs de contenu' },
    { number: '750+', label: 'Campagnes réalisées' },
    { number: '50M+', label: 'Audience totale' },
    { number: '15+', label: 'Pays africains' },
  ];

  return (
    <div className="bg-blue-600">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            AfroPush en chiffres
          </h2>
          <p className="mt-3 text-xl text-blue-200 sm:mt-4">
            Une communauté en pleine croissance de créateurs et d&apos;annonceurs à travers l&apos;Afrique
          </p>
        </div>
        <dl className="mt-10 text-center grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <dt className="order-2 mt-2 text-lg leading-6 font-medium text-blue-200">
                {stat.label}
              </dt>
              <dd className="order-1 text-5xl font-extrabold text-white">
                {stat.number}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
} 
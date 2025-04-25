"use client";

type StatProps = {
  value: string;
  label: string;
};

function StatItem({ value, label }: StatProps) {
  return (
    <div className="text-center px-4">
      <div className="text-4xl font-bold text-primary mb-2">{value}</div>
      <div className="text-sm text-gray-600">{label}</div>
    </div>
  );
}

export default function StatsSection() {
  const stats = [
    { value: "150+", label: "Créateurs vérifiés" },
    { value: "12", label: "Pays africains" },
    { value: "500+", label: "Campagnes réalisées" },
    { value: "94%", label: "Satisfaction clients" }
  ];

  return (
    <section className="py-12 bg-primary/5 border-y border-primary/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <StatItem key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </section>
  );
} 
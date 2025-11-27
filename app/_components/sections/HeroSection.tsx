type HeroSectionProps = {
  label?: string;
  title: string;
  description: string;
  className?: string;
};

export function HeroSection({
  label = "히어로 영역",
  title,
  description,
  className,
}: HeroSectionProps) {
  const wrapperClass = [
    "rounded-3xl bg-white p-4 shadow-sm border border-[#f1f1f1]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={wrapperClass}>
      <p className="text-xs font-medium text-gray-500">{label}</p>
      <h2 className="mt-1 text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>
    </section>
  );
}


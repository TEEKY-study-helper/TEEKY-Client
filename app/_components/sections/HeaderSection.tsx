type HeaderSectionProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function HeaderSection({
  eyebrow,
  title,
  description,
  className,
}: HeaderSectionProps) {
  const wrapperClass = ["space-y-2", className].filter(Boolean).join(" ");

  return (
    <header className={wrapperClass}>
      {eyebrow ? (
        <p className="text-[11px] uppercase tracking-[0.2em] text-gray-400">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-2xl font-semibold text-gray-900">{title}</h1>
      {description ? (
        <p className="text-sm text-gray-500">{description}</p>
      ) : null}
    </header>
  );
}


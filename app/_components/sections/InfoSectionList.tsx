import type { SectionItem } from "../types";

type InfoSectionListProps = {
  items: SectionItem[];
  showIndex?: boolean;
  className?: string;
};

export function InfoSectionList({
  items,
  showIndex = true,
  className,
}: InfoSectionListProps) {
  const wrapperClass = ["space-y-3", className].filter(Boolean).join(" ");

  return (
    <section className={wrapperClass}>
      {items.map((item, idx) => (
        <article
          key={item.title}
          className="rounded-2xl bg-white border border-[#ededed] p-4"
        >
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-base font-semibold text-gray-900">
              {item.title}
            </h3>
            {showIndex ? (
              <span className="text-xs text-gray-400">
                {idx + 1} / {items.length}
              </span>
            ) : null}
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </article>
      ))}
    </section>
  );
}


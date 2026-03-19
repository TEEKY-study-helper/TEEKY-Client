import Link from "next/link";

type ListItemProps = {
  title: string;
  href: string;
  className?: string;
};

export function ListItem({ title, href, className }: ListItemProps) {
  const styles = [
    "flex items-center justify-between w-full h-[61px] px-5 bg-[#eeeeee] border-b border-black",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Link href={href} className={styles}>
      <span className="text-[12px] text-black">{title}</span>
      <span className="text-[15px] text-black">{">"}</span>
    </Link>
  );
}

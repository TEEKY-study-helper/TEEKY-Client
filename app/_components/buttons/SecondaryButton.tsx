import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type SecondaryButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export function SecondaryButton({
  className,
  children,
  type = "button",
  ...rest
}: SecondaryButtonProps) {
  const styles = [
    "flex-1 rounded-2xl border border-[#e0e0e0] py-3 text-sm font-medium text-gray-700 transition-colors hover:bg-[#f5f5f5]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type={type} className={styles} {...rest}>
      {children}
    </button>
  );
}


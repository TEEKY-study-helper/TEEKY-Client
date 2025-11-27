import type { ButtonHTMLAttributes, PropsWithChildren } from "react";

type PrimaryButtonProps = PropsWithChildren<
  ButtonHTMLAttributes<HTMLButtonElement>
>;

export function PrimaryButton({
  className,
  children,
  type = "button",
  ...rest
}: PrimaryButtonProps) {
  const styles = [
    "flex-1 rounded-2xl bg-gray-900 py-3 text-sm font-semibold text-white transition-colors hover:bg-gray-800",
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


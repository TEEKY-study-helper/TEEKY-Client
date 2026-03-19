type HeaderProps = {
  className?: string;
};

export function Header({ className }: HeaderProps) {
  const styles = [
    "w-full h-[66px] bg-[#eeeeee] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return <header className={styles} />;
}

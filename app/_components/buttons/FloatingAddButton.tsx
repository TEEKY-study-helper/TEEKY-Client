type FloatingAddButtonProps = {
  onClick: () => void;
  className?: string;
};

export function FloatingAddButton({ onClick, className }: FloatingAddButtonProps) {
  const styles = [
    "fixed bottom-[88px] size-[55px] rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.15)] flex items-center justify-center text-[30px] text-black leading-none cursor-pointer hover:bg-gray-50 transition-colors",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" onClick={onClick} className={styles}>
      +
    </button>
  );
}

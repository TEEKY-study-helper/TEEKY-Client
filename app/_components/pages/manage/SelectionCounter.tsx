type SelectionCounterProps = {
  selected: number;
  total: number;
};

export function SelectionCounter({ selected, total }: SelectionCounterProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      <span className="font-bold text-foreground">{selected}개</span>/{total}개
      선택중
    </p>
  );
}

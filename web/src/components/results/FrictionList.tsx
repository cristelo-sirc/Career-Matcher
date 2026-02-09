export interface FrictionListProps {
  items: string[];
}

export function FrictionList({ items }: FrictionListProps) {
  if (items.length === 0) return null;

  return (
    <ul className="space-y-1">
      {items.map((item, i) => (
        <li
          key={i}
          className="flex items-start gap-2 text-sm text-text-muted dark:text-text-muted-dark"
        >
          <span aria-hidden="true" className="mt-0.5 shrink-0">
            &minus;
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

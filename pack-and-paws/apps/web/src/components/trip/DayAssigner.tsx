interface DayAssignerProps {
  dayNumber: number;
  maxDay: number;
  onChange: (day: number) => void;
}

export default function DayAssigner({ dayNumber, maxDay, onChange }: DayAssignerProps) {
  return (
    <select
      value={dayNumber}
      onChange={(e) => onChange(Number(e.target.value))}
      className="text-xs border border-sand-200 rounded px-1.5 py-1 bg-white focus:ring-1 focus:ring-forest-300 outline-none w-16"
    >
      {Array.from({ length: Math.max(maxDay, 30) }, (_, i) => i + 1).map((d) => (
        <option key={d} value={d}>Day {d}</option>
      ))}
    </select>
  );
}

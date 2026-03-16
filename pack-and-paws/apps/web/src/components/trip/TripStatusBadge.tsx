const statusConfig: Record<string, { label: string; classes: string }> = {
  planning: { label: 'Planning', classes: 'bg-amber-100 text-amber-700' },
  active: { label: 'Active', classes: 'bg-forest-100 text-forest-700' },
  completed: { label: 'Completed', classes: 'bg-slate-100 text-slate-600' },
  cancelled: { label: 'Cancelled', classes: 'bg-red-100 text-red-600' },
};

export default function TripStatusBadge({ status }: { status: string }) {
  const config = statusConfig[status] || statusConfig.planning;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.classes}`}>
      {config.label}
    </span>
  );
}

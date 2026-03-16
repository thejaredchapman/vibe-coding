import { PawPrint } from 'lucide-react';

export default function LoadingSpinner({ message = 'Fetching the good stuff...' }: { message?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="relative">
        <PawPrint className="h-12 w-12 text-forest-500 animate-bounce-gentle" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-forest-200 border-t-forest-500 animate-spin" />
      </div>
      <p className="text-sm text-slate-500 font-medium">{message}</p>
    </div>
  );
}

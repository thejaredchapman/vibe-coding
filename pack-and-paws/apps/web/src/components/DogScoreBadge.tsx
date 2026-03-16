import { PawPrint } from 'lucide-react';

interface DogScoreBadgeProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
}

export default function DogScoreBadge({ score, size = 'md' }: DogScoreBadgeProps) {
  const getColor = () => {
    if (score >= 8) return 'from-forest-500 to-forest-400';
    if (score >= 6) return 'from-amber-500 to-amber-400';
    return 'from-terracotta-500 to-terracotta-400';
  };

  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-14 w-14 text-lg',
  };

  return (
    <div
      className={`${sizeClasses[size]} bg-gradient-to-br ${getColor()} rounded-full flex items-center justify-center text-white font-bold shadow-lg relative`}
      title={`Dog-friendliness: ${score}/10`}
    >
      {score}
      <PawPrint className="absolute -top-1 -right-1 h-3 w-3 text-white/80" />
    </div>
  );
}

import { Sparkles } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 rounded-xl border border-[#DCD7CC] bg-[#F6F5F1] px-4 py-3 text-xs font-semibold text-[#1F2421] shadow-md backdrop-blur-md">
      <Sparkles className="h-4 w-4 text-[#4A6B5D]" />
      <span>{message}</span>
    </div>
  );
}

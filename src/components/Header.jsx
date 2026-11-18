import { Award, RotateCcw, User } from 'lucide-react';

export default function Header({ stage, points, user, onGoLanding, onStartTest }) {
  const level = Math.floor(points / 150) + 1;

  return (
    <header className="sticky top-0 z-30 border-b border-[#DCD7CC] bg-[#F6F5F1]/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <button
          onClick={onGoLanding}
          className="group flex items-center gap-2.5 text-left text-base font-medium tracking-tight text-[#1F2421] transition hover:opacity-85"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-[#4A6B5D] transition-transform duration-200 group-hover:scale-110" />
          <span className="font-semibold tracking-tight">Ruang Kerja PsyCap</span>
        </button>

        <div className="flex items-center gap-2.5 sm:gap-3">
          {user && (
            <div className="flex items-center gap-2 rounded-full border border-[#DCD7CC] bg-[#E6E3DA]/80 px-3 py-1.5 text-xs text-[#1F2421]">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4A6B5D] text-[10px] font-semibold text-white">
                {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-3 w-3" />}
              </span>
              <span className="max-w-[120px] truncate font-medium text-[#1F2421] sm:max-w-[160px]">
                {user.name || user.email}
              </span>
            </div>
          )}

          {stage === 'dashboard' && (
            <button
              onClick={onStartTest}
              className="hidden items-center gap-1.5 rounded-full border border-[#DCD7CC] bg-[#E6E3DA] px-3.5 py-1.5 text-xs font-medium text-[#1F2421] transition hover:bg-[#DCD7CC] sm:flex"
            >
              <RotateCcw className="h-3.5 w-3.5 text-[#4A6B5D]" />
              <span>Ulangi Tes</span>
            </button>
          )}

          <div className="flex items-center gap-1.5 rounded-full border border-[#DCD7CC] bg-[#E6E3DA] px-3 py-1.5 text-xs font-medium text-[#1F2421]">
            <Award className="h-3.5 w-3.5 text-[#4A6B5D]" />
            <span>{points} Pts · Lvl {level}</span>
          </div>
        </div>
      </div>
    </header>
  );
}

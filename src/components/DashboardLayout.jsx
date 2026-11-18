import { BarChart3, BookOpen, Briefcase, MessageSquareHeart } from 'lucide-react';

const TABS = [
  { id: 'overview', label: 'Ringkasan & Statistik', icon: BarChart3 },
  { id: 'academy', label: 'Akademi & Kursus', icon: BookOpen },
  { id: 'work', label: 'Konteks Kerja', icon: Briefcase },
  { id: 'support', label: 'Pendampingan', icon: MessageSquareHeart },
];

export default function DashboardLayout({ activeTab, onChangeTab, children }) {
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-8 md:flex-row">
      {/* Sidebar Nav */}
      <aside className="w-full shrink-0 md:w-60">
        <div className="rounded-2xl border border-[#DCD7CC] bg-[#E6E3DA]/80 p-3 shadow-xs">
          <nav className="flex flex-row gap-1.5 overflow-x-auto md:flex-col">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onChangeTab(tab.id)}
                  className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition-all ${
                    active
                      ? 'border border-[#DCD7CC] bg-[#F6F5F1] text-[#4A6B5D] shadow-xs'
                      : 'text-[#636A65] hover:bg-[#F6F5F1]/60 hover:text-[#1F2421]'
                  }`}
                >
                  <Icon className={`h-4 w-4 ${active ? 'text-[#4A6B5D]' : 'text-[#636A65]'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="min-w-0 flex-1">{children}</main>
    </div>
  );
}

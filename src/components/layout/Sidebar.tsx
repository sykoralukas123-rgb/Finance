import { LayoutDashboard, ArrowLeftRight, PiggyBank, Target } from 'lucide-react';
import type { PageId } from '../../types';

interface SidebarProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
}

const NAV_ITEMS: { id: PageId; label: string; icon: typeof LayoutDashboard }[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'transactions', label: 'Buchungen', icon: ArrowLeftRight },
  { id: 'budget', label: 'Budget', icon: PiggyBank },
  { id: 'goals', label: 'Sparziele', icon: Target },
];

export const Sidebar = ({ currentPage, onNavigate }: SidebarProps) => (
  <aside className="fixed left-0 top-0 h-full w-56 bg-white border-r border-slate-100 flex flex-col z-40 shadow-sm">
    {/* Logo */}
    <div className="px-5 py-5 border-b border-slate-100">
      <div className="flex items-center gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-emerald-500 flex items-center justify-center">
          <span className="text-white font-bold text-sm">F</span>
        </div>
        <span className="font-bold text-slate-800 text-base">FinanzApp</span>
      </div>
    </div>

    {/* Navigation */}
    <nav className="flex-1 px-3 py-4 space-y-1">
      {NAV_ITEMS.map(({ id, label, icon: Icon }) => {
        const active = currentPage === id;
        return (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
              active
                ? 'bg-emerald-50 text-emerald-700'
                : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
            }`}
          >
            <Icon size={18} />
            <span>{label}</span>
          </button>
        );
      })}
    </nav>

    {/* Bottom hint */}
    <div className="px-5 py-4 border-t border-slate-100">
      <p className="text-xs text-slate-400">Alle Daten lokal gespeichert</p>
    </div>
  </aside>
);

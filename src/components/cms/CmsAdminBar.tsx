import React from 'react';
import { useCms } from '../../context/CmsContext';
import {
  SlidersHorizontal,
  Edit3,
  Inbox,
  Eye,
  Columns,
  RotateCcw,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export const CmsAdminBar: React.FC = () => {
  const {
    viewMode,
    setViewMode,
    isInlineEditing,
    setIsInlineEditing,
    inquiries,
    resetToDefaults,
    lastSavedAt,
    toastMessage,
    isAuthenticated,
    setIsLoginModalOpen,
    logout,
  } = useCms();

  const newInquiriesCount = inquiries.filter((i) => i.status === 'new').length;

  return (
    <>
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-5 right-5 z-[99999] flex items-center gap-3 rounded-xl border border-emerald-500/40 bg-slate-950/95 px-5 py-3 text-sm text-emerald-300 shadow-2xl shadow-emerald-500/20 backdrop-blur-md animate-in fade-in slide-in-from-top-3 duration-200">
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Floating Top Admin Bar - Shown when logged in */}
      {isAuthenticated ? (
        <div className="sticky top-0 z-[100] w-full border-b border-cyan-500/30 bg-[#060A13]/95 px-3 py-2 backdrop-blur-md text-xs text-slate-200 shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 flex-wrap">
            {/* Left badge */}
            <div className="flex items-center gap-2.5">
              <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 font-mono font-semibold text-[11px]">
                <ShieldCheck className="h-3.5 w-3.5 text-cyan-400" />
                <span>Správce webu přihlášen</span>
              </div>
              <span className="hidden sm:inline-block text-slate-400">
                Stav: <span className="text-emerald-400 font-mono font-semibold">{lastSavedAt}</span>
              </span>
            </div>

            {/* Center actions */}
            <div className="flex items-center gap-2 flex-wrap">
              {/* Inline editing toggle */}
              <button
                type="button"
                onClick={() => setIsInlineEditing(!isInlineEditing)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  isInlineEditing
                    ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/20'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Aktivovat přímé kliknutí a přepisování textů na webu"
              >
                <Edit3 className="h-3.5 w-3.5" />
                <span>
                  {isInlineEditing ? 'Vizuální editace ZAPNUTA' : 'Zapnout vizuální editaci'}
                </span>
              </button>

              {/* Split screen view toggle */}
              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'split' ? 'web' : 'split')}
                className={`hidden md:inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                  viewMode === 'split'
                    ? 'bg-cyan-500/20 border border-cyan-500/40 text-cyan-300'
                    : 'bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10'
                }`}
                title="Zobrazit CMS a web vedle sebe"
              >
                <Columns className="h-3.5 w-3.5" />
                <span>Split-screen</span>
              </button>

              {/* Inbox badge */}
              <button
                type="button"
                onClick={() => setViewMode('cms')}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white/5 border border-white/10 text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <Inbox className="h-3.5 w-3.5 text-cyan-400" />
                <span>Poptávky</span>
                {newInquiriesCount > 0 && (
                  <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-500 px-1 text-[10px] font-bold text-slate-950">
                    {newInquiriesCount}
                  </span>
                )}
              </button>
            </div>

            {/* Right main CTA button & Logout */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={resetToDefaults}
                className="hidden lg:inline-flex items-center gap-1 px-2 py-1 text-[11px] text-slate-400 hover:text-slate-200 transition-colors cursor-pointer"
                title="Obnovit původní obsah webu a poptávek"
              >
                <RotateCcw className="h-3 w-3" />
                <span>Reset</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'cms' ? 'web' : 'cms')}
                className="inline-flex items-center gap-1.5 rounded bg-cyan-500 px-3 py-1.5 text-xs font-semibold text-slate-950 hover:bg-cyan-400 transition-colors cursor-pointer shadow-sm shadow-cyan-500/20 active:scale-98"
              >
                {viewMode === 'cms' ? (
                  <>
                    <Eye className="h-3.5 w-3.5" />
                    <span>Zpět na web</span>
                  </>
                ) : (
                  <>
                    <SlidersHorizontal className="h-3.5 w-3.5" />
                    <span>Otevřít CMS editor</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-1 px-2 py-1.5 rounded text-xs text-slate-400 hover:text-rose-400 transition-colors cursor-pointer border border-white/10 bg-white/5"
                title="Odhlásit správce"
              >
                <LogOut className="h-3 w-3" />
                <span className="hidden sm:inline">Odhlásit</span>
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

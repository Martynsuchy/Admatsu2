import React, { useState } from 'react';
import { useCms } from '../../context/CmsContext';
import { Lock, X, Shield, ArrowRight, KeyRound, CheckCircle2 } from 'lucide-react';

export const LoginModal: React.FC = () => {
  const { isLoginModalOpen, setIsLoginModalOpen, login } = useCms();
  const [email, setEmail] = useState('admin@admatsu.com');
  const [password, setPassword] = useState('••••••••••••');
  const [isLoading, setIsLoading] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      login(email, password);
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md rounded-2xl border border-white/15 bg-[#0B101D] p-6 sm:p-8 shadow-2xl text-slate-100">
        {/* Close Button */}
        <button
          onClick={() => setIsLoginModalOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
          aria-label="Zavřít"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="h-11 w-11 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shadow-lg shadow-cyan-500/10">
            <Lock className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white font-display">
              Přihlášení do správy webu
            </h3>
            <p className="text-xs text-slate-400">
              Admatsu Studio CMS · Zabezpečený přístup správce
            </p>
          </div>
        </div>

        {/* Demo Helper Callout */}
        <div className="mb-6 p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-xs text-slate-300 space-y-1">
          <div className="font-semibold text-cyan-300 flex items-center gap-1.5">
            <KeyRound className="h-3.5 w-3.5" />
            <span>Předvyplněné demo přihlášení</span>
          </div>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            Na reálném webu je administrace přístupná pouze pro vás. Pro otestování stačí kliknout na tlačítko níže.
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1.5">
              Přihlašovací e-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-lg bg-black/50 border border-white/15 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              required
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="font-semibold text-slate-300">
                Heslo správce
              </label>
              <span className="text-[10px] text-cyan-400/80">2FA zabezpečení</span>
            </div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-black/50 border border-white/15 px-3.5 py-2.5 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none font-mono"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 hover:bg-cyan-400 transition-all cursor-pointer shadow-lg shadow-cyan-500/20 active:scale-98 disabled:opacity-70"
          >
            {isLoading ? (
              <span>Ověřuji oprávnění...</span>
            ) : (
              <>
                <span>Vstoupit do administrace</span>
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </form>

        {/* Footer info */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-500">
          <span className="flex items-center gap-1">
            <Shield className="h-3.5 w-3.5 text-emerald-400" />
            <span>256-bit TLS šifrování</span>
          </span>
          <span>Admatsu Engine v2.4</span>
        </div>
      </div>
    </div>
  );
};

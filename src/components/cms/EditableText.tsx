import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useCms } from '../../context/CmsContext';
import { Edit2, Check, X } from 'lucide-react';

interface EditableTextProps {
  value: string;
  onChange: (newValue: string) => void;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div';
  className?: string;
  multiline?: boolean;
  label?: string;
}

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  as: Component = 'span',
  className = '',
  multiline = false,
  label,
}) => {
  const { isInlineEditing, triggerToast } = useCms();
  const [isOpen, setIsOpen] = useState(false);
  const [tempValue, setTempValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setTempValue(value);
  }, [value]);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          if ('select' in inputRef.current) {
            inputRef.current.select();
          }
        }
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isInlineEditing) {
    return <Component className={`overflow-visible leading-normal ${className}`}>{value}</Component>;
  }

  const handleOpen = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setTempValue(value);
    setIsOpen(true);
  };

  const handlePointerDown = (e: React.PointerEvent | React.MouseEvent) => {
    e.stopPropagation();
  };

  // Explicit cancel (Discard button or Escape key)
  const handleCancel = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setTempValue(value);
    setIsOpen(false);
  };

  // Save changes (Button click, Enter key, or clicking outside backdrop)
  const handleSave = (e?: React.MouseEvent | React.FormEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const finalValue = tempValue;
    if (finalValue !== value) {
      onChange(finalValue);
      triggerToast(label ? `Uloženo: ${label}` : 'Text byl úspěšně uložen na web i server!');
    }
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      e.stopPropagation();
      handleCancel();
    } else if (e.key === 'Enter') {
      if (!multiline || e.ctrlKey || e.metaKey) {
        e.preventDefault();
        e.stopPropagation();
        handleSave();
      }
    }
  };

  return (
    <>
      <Component
        onClick={handleOpen}
        onMouseDown={handlePointerDown}
        title={`Klikněte pro úpravu: ${label || 'textu'}`}
        className={`${className} cursor-pointer transition-all duration-150 relative inline-flex items-center gap-1 group hover:bg-amber-400/20 hover:ring-2 hover:ring-amber-400/80 rounded px-1 -mx-0.5 z-10 overflow-visible leading-normal py-0.5`}
      >
        <span className="overflow-visible leading-normal">{value}</span>
        <span
          aria-hidden="true"
          className="inline-flex items-center text-amber-400 opacity-70 group-hover:opacity-100 group-hover:scale-110 transition-transform shrink-0"
        >
          <Edit2 className="h-3 w-3 inline align-baseline" />
        </span>
      </Component>

      {/* Portal modal editor */}
      {isOpen &&
        createPortal(
          <div
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-150"
            onClick={handleSave} // Clicking outside SAVES the user's edits!
          >
            <div
              className="w-full max-w-xl rounded-2xl border-2 border-amber-400/90 bg-[#0B101D] p-6 shadow-2xl text-slate-100 space-y-4"
              onClick={(e) => e.stopPropagation()} // Prevent clicking inside card from closing
            >
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <div className="p-1 rounded-md bg-amber-400/20 text-amber-300">
                    <Edit2 className="h-4 w-4" />
                  </div>
                  <span>{label ? `Úprava: ${label}` : 'Úprava textu na webu'}</span>
                </div>
                <button
                  type="button"
                  onClick={handleCancel}
                  title="Zavřít bez uložení (Esc)"
                  className="rounded-lg p-1 text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Form container */}
              <form onSubmit={handleSave} className="space-y-4">
                <div className="space-y-2">
                  <label className="text-xs font-semibold text-slate-300 block">
                    Obsah pole (změna se okamžitě propíše a trvale uloží):
                  </label>
                  {multiline ? (
                    <textarea
                      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                      rows={5}
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full rounded-xl bg-black/70 border border-white/20 p-3.5 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 leading-relaxed shadow-inner font-sans"
                      placeholder="Zadejte text..."
                    />
                  ) : (
                    <input
                      ref={inputRef as React.RefObject<HTMLInputElement>}
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="w-full rounded-xl bg-black/70 border border-white/20 px-3.5 py-3 text-sm text-white focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 shadow-inner font-sans"
                      placeholder="Zadejte text..."
                    />
                  )}
                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>
                      Tip: <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono">Enter</kbd> nebo kliknutí mimo okno uloží text,{' '}
                      <kbd className="px-1 py-0.5 bg-white/10 rounded font-mono">Esc</kbd> zruší
                    </span>
                    <span className="font-mono">{tempValue.length} znaků</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-white/10">
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg px-4 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Zrušit změny
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-amber-400 px-5 py-2.5 text-xs font-bold text-slate-950 hover:bg-amber-300 shadow-lg shadow-amber-400/20 transition-all cursor-pointer"
                  >
                    <Check className="h-4 w-4 stroke-[3]" />
                    <span>Uložit a publikovat</span>
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

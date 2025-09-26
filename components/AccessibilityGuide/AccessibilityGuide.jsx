"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function AccessibilityGuide() {
  const STATE_KEY = "acessibilidade_prefs_v1";
  const [expanded, setExpanded] = useState(false);
  const [state, setState] = useState({
    fontScale: 1,
    highContrast: false,
    grayscale: false,
    noAnimations: false,
    spacing: false,
  });

  // carregar preferências
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      if (saved) setState(JSON.parse(saved));
    } catch {}
  }, []);

  // aplicar preferências
  useEffect(() => {
    document.documentElement.style.fontSize = `${100 * state.fontScale}%`;
    document.documentElement.classList.toggle("high-contrast", state.highContrast);
    document.documentElement.classList.toggle("grayscale", state.grayscale);
    document.documentElement.classList.toggle("no-animations", state.noAnimations);
    document.documentElement.style.letterSpacing = state.spacing ? "0.06em" : "";
    document.documentElement.style.lineHeight = state.spacing ? "1.8" : "";

    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(state));
    } catch {}
  }, [state]);

  return (
    <>
      {/* Skip link */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 bg-black text-white px-3 py-2 rounded-md transform -translate-y-[120%] opacity-0 focus:translate-y-0 focus:opacity-100 transition"
      >
        Pular para o conteúdo
      </a>

      {/* Barra lateral */}
      <div
        className={clsx(
          "fixed right-3 top-1/2 -translate-y-1/2 z-[9999] flex flex-col items-center rounded-xl bg-white/95 shadow-lg transition-all",
          expanded ? "w-56 p-3" : "w-14 p-2"
        )}
      >
        {/* Botão toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="w-10 h-10 rounded-md bg-blue-600 text-white font-bold shadow hover:bg-blue-700"
        >
          ♿
        </button>

        {/* Controles */}
        {expanded && (
          <div className="mt-3 flex flex-col gap-2 w-full text-sm">
            {/* Fontes */}
            <div className="flex gap-2">
              <button
                onClick={() =>
                  setState({ ...state, fontScale: Math.max(0.8, +(state.fontScale - 0.1).toFixed(2)) })
                }
                className="flex-1 px-2 py-1 rounded border hover:bg-gray-100"
              >
                A-
              </button>
              <button
                onClick={() => setState({ ...state, fontScale: 1 })}
                className="flex-1 px-2 py-1 rounded border hover:bg-gray-100"
              >
                A
              </button>
              <button
                onClick={() =>
                  setState({ ...state, fontScale: Math.min(1.6, +(state.fontScale + 0.1).toFixed(2)) })
                }
                className="flex-1 px-2 py-1 rounded border hover:bg-gray-100"
              >
                A+
              </button>
            </div>

            {/* Opções */}
            <button
              aria-pressed={state.highContrast}
              onClick={() => setState({ ...state, highContrast: !state.highContrast })}
              className="w-full px-2 py-1 rounded border hover:bg-gray-100"
            >
              Alto contraste
            </button>

            <button
              aria-pressed={state.grayscale}
              onClick={() => setState({ ...state, grayscale: !state.grayscale })}
              className="w-full px-2 py-1 rounded border hover:bg-gray-100"
            >
              Escala de cinza
            </button>

            <button
              aria-pressed={state.noAnimations}
              onClick={() => setState({ ...state, noAnimations: !state.noAnimations })}
              className="w-full px-2 py-1 rounded border hover:bg-gray-100"
            >
              Parar animações
            </button>

            <div className="flex gap-2">
              <button
                onClick={() => setState({ ...state, spacing: true })}
                className="flex-1 px-2 py-1 rounded border hover:bg-gray-100"
              >
                Espaço +
              </button>
              <button
                onClick={() => setState({ ...state, spacing: false })}
                className="flex-1 px-2 py-1 rounded border hover:bg-gray-100"
              >
                Espaço
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

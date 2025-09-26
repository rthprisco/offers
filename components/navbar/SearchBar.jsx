// components/navbar/SearchBar.jsx
"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => clearTimeout(timerRef.current);
  }, []);

  async function doSearch(q) {
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`);
      if (!res.ok) {
        setResults([]);
        return;
      }
      const data = await res.json();
      setResults(data || []);
    } catch (err) {
      console.error("Erro fetch /api/search:", err);
      setResults([]);
    }
  }

  function handleChange(e) {
    const v = e.target.value;
    setQuery(v);

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (v.trim().length > 1) doSearch(v.trim());
      else setResults([]);
    }, 250);
  }

  return (
    <div className="relative w-full">
      <div className="relative flex items-center">
       <input
  type="text"
  placeholder="Pesquise pelo seu produto..."
  value={query}
  onChange={handleChange}
  className="bg-background relative h-10 w-full rounded-xl border-none px-4 py-0 text-sm shadow focus:outline-none"
/>

        <Search className="absolute right-3 hidden md:block" color="gray" />
      </div>

      {results.length > 0 && (
        <ul className="absolute left-0 right-0 mt-2 bg-white shadow-lg rounded-md z-50 max-h-64 overflow-y-auto">
          {results.map((p, i) => {
            const img = p.img || p.imagem || p.image || "";
            const title = p.titulo || p.nome || p.name || "";
            const price = p.preco ?? p.price ?? null;
            const href = p.link || `/produto/${p.id ?? i}`;

            return (
              <li key={i} className="p-2 hover:bg-gray-100">
                <Link href={href} className="flex items-center gap-3">
                  {img ? (
                    <img src={img} alt={title} className="w-12 h-12 object-cover rounded" />
                  ) : null}
                  <div className="text-sm">
                    <div className="font-medium">{title}</div>
                    {price !== null ? <div className="text-xs text-gray-600">R$ {Number(price).toFixed(2)}</div> : null}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

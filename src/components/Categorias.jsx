'use client';

import * as LucideIcons from 'lucide-react';
import { useState } from 'react';

export default function Categorias({ categorias, onCategorySelect }) {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const handleCategoryClick = (category) => {
    const newSelected = selectedCategory === category ? null : category;
    setSelectedCategory(newSelected);
    onCategorySelect(newSelected);
  };

  return (
    <div className="w-full">
      {/* Mobile scroll view */}
      <div className="flex gap-3 overflow-x-auto pb-3 md:hidden">
        {categorias.map((cat) => {
          const Icon = LucideIcons[cat.icon];
          const isSelected = selectedCategory === cat.title;

          return (
            <button
              onClick={() => handleCategoryClick(cat.title)}
              className={`flex h-20 w-20 flex-shrink-0 flex-col items-center justify-between rounded-lg pt-2 transition-all ${
                isSelected
                  ? 'bg-red-600 text-white shadow-md'
                  : 'bg-gray-100 text-gray-800 hover:bg-red-100'
              }`}
              key={cat.title}
              aria-pressed={isSelected}
            >
              {Icon ? <Icon size={28} /> : <span className="text-xl">📦</span>}
              <span className="pb-1 text-center text-xs font-semibold line-clamp-2">
                {cat.title}
              </span>
            </button>
          );
        })}
      </div>

      {/* Desktop grid view */}
      <div className="hidden md:flex md:flex-wrap md:justify-center md:gap-4">
        {categorias.map((cat) => {
          const Icon = LucideIcons[cat.icon];
          const isSelected = selectedCategory === cat.title;

          return (
            <button
              onClick={() => handleCategoryClick(cat.title)}
              className={`flex h-24 w-24 flex-col items-center justify-between rounded-xl pt-3 transition-all ${
                isSelected
                  ? 'bg-red-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-800 hover:bg-red-100 shadow-sm hover:shadow-md'
              }`}
              key={cat.title}
              aria-pressed={isSelected}
            >
              {Icon ? <Icon size={32} /> : <span className="text-2xl">📦</span>}
              <span className="pb-2 text-center text-xs font-medium line-clamp-2">
                {cat.title}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

import * as LucideIcons from "lucide-react";

export default function Categorias({ categorias, onSelectCategory, selectedCategory }) {
  return (
    <div className="flex w-full flex-nowrap gap-4 overflow-x-auto md:justify-center md:gap-6 scrollbar-hide pb-4">
      {categorias.map((cat) => {
        const Icon = LucideIcons[cat.icon];
        const isSelected = selectedCategory === cat.title;

        return (
          <div
            onClick={() => onSelectCategory(cat.title)}
            className={`flex h-20 w-20 min-w-20 cursor-pointer flex-col items-center justify-center rounded-xl gap-1 leading-tight shadow-md transition-all md:h-24 md:w-24 ${
              isSelected
                ? "bg-red-500 text-white"
                : 'bg-gray-100 text-gray-800 hover:bg-red-100 shadow-sm hover:shadow-md'
            }`}
            key={cat.title}
          >
            {Icon && <Icon size={32} />}
            <span className="text-center text-xs leading-tight md:text-sm">
              {cat.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}
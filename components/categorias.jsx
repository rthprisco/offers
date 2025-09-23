import * as LucideIcons from "lucide-react";

export default function Categorias({ categorias }) {
  return (
    <div className="flex w-full flex-nowrap gap-4 overflow-x-auto md:justify-center md:gap-6 scrollbar-none">
      {categorias.map((cat) => {
        const Icon = LucideIcons[cat.icon];

        return (
          <div
            className="hover:bg-primary-red bg-category flex h-20 w-20 min-w-20 cursor-pointer flex-col items-center justify-between rounded-xl pt-3 leading-tight shadow-(--shadow-1) hover:text-white md:h-24 md:w-24"
            key={cat.title}
          >
            <Icon size={32} />
            <span className="pb-1 text-center text-sm leading-tight">
              {cat.title}
            </span>
          </div>
        );
      })}
    </div>
  );
}

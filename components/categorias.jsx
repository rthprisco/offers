import * as LucideIcons from "lucide-react";

export default function Categorias({ categorias }) {
  return (
    <div className="flex gap-6">
      {categorias.map((cat) => {
        const Icon = LucideIcons[cat.icon];

        return (
          <div
            className="hover:bg-primary-red flex h-24 w-24 cursor-pointer flex-col items-center justify-between rounded-xl bg-category pt-3 hover:text-white shadow-(--shadow-1)"
            key={cat.title}
          >
            <Icon size={32} />
            <span className="pb-1 text-center text-sm">{cat.title}</span>
          </div>
        );
      })}
    </div>
  );
}

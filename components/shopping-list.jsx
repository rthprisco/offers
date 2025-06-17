"use client";

import { useEffect, useState } from "react";

export default function ShoppingList({ userId }) {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [saved, setSaved] = useState(false);

  // Busca a lista no banco(invés do localStorage lá)
  useEffect(() => {
    if (!userId) return;

    const fetchList = async () => {
      try {
        const res = await fetch(`/api/list/${userId}`);
        if (!res.ok) throw new Error("Erro ao buscar lista");

        const data = await res.json();
        setList(data.items);
      } catch (error) {
        console.error(error);
      }
    };

    fetchList();
  }, [userId]);

  // Adiciona o item localmente (inutilizado aqui)
  const handleAdd = (e) => {
    e.preventDefault();
    if (!item.trim()) return;

    setList([...list, { name: item, isPurchased: false }]);
    setItem("");
    setSaved(false);
  };

  // Marcar como comprado
  const togglePurchased = (index) => {
    const updated = [...list];
    updated[index].isPurchased = !updated[index].isPurchased;
    setList(updated);
    setSaved(false);
  };

  //Deleta somente um item do banco
const deleteItemFromDB = async (id) => {
  try {
    const res = await fetch(`/api/delete-item/${id}`, {
      method: "DELETE",
    });

    const data = await res.json();

    if (data.ok) {
      const updated = list.filter((el) => el.id !== id);
      setList(updated);
    } else {
      console.error("Erro ao deletar item:", data.error);
    }
  } catch (error) {
    console.error("Erro ao deletar item:", error);
  }
};

  // Salva a lista no banco
  const handleSave = async () => {
    if (!userId) return;

    try {
      const res = await fetch("/api/save-list", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, list }),
      });

      const data = await res.json();
      if (data.ok) {
        setSaved(true);
      } else {
        console.error("Erro ao salvar:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Deleta lista inteira
  const handleClear = async () => {
    if (!userId) return;

    try {
      const res = await fetch("/api/delete-list", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      const data = await res.json();
      if (data.ok) {
        setList([]);
        setSaved(false);
      } else {
        console.error("Erro ao deletar:", data.error);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow p-6 mt-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Lista de Compras</h2>

      <form onSubmit={handleAdd} className="flex gap-2 mb-4">
        <input
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          placeholder="Adicionar item"
          className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          Adicionar
        </button>
      </form>

      <div className="flex gap-2 mb-4">
        <button
          onClick={handleClear}
          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded hover:bg-gray-300 transition"
        >
          Limpar lista
        </button>
        <button
          onClick={handleSave}
          className="flex-1 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Salvar lista
        </button>
      </div>

      {saved && (
        <div className="mb-4 text-green-600 text-center font-medium">
          Lista salva com sucesso!
        </div>
      )}

      <ul className="list-none p-0 mt-4">
        {list.map((el, idx) => (
          <li
            key={idx}
            className={`flex items-center mb-2 px-2 py-1 rounded ${
              el.isPurchased ? "bg-gray-100" : ""
            }`}
          >
            <input
              type="checkbox"
              checked={el.isPurchased}
              onChange={() => togglePurchased(idx)}
              className="mr-2 accent-blue-500"
            />
            <span
              className={`flex-1 ${
                el.isPurchased ? "line-through text-gray-400" : ""
              }`}
            >
              {el.name}
            </span>
           <button
  onClick={() => deleteItemFromDB(el.id)}
  className="ml-2 text-red-500 hover:text-red-700 transition"
>
  Remover
</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

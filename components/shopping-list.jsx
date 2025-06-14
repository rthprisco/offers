"use client";

import { useState, useEffect } from "react";

export default function ShoppingList({ userId }) {
  const [item, setItem] = useState("");
  const [list, setList] = useState([]);
  const [saved, setSaved] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (userId) {
      const saved = localStorage.getItem(`shopping-list-${userId}`);
      if (saved) {
        setList(JSON.parse(saved));
      }
      setIsLoaded(true); // Marca que já carregou
    }
  }, [userId]);

  useEffect(() => {
    if (userId && isLoaded) {
      localStorage.setItem(`shopping-list-${userId}`, JSON.stringify(list));
    }
  }, [list, userId, isLoaded]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (item.trim() === "") return;
    setList([...list, { name: item, isPurchased: false }]);
    setItem("");
    setSaved(false);
  };

  const togglePurchased = (index) => {
    setList(
      list.map((el, i) =>
        i === index ? { ...el, isPurchased: !el.isPurchased } : el,
      ),
    );
    setSaved(false);
  };

  const removeItem = (index) => {
    setList(list.filter((_, i) => i !== index));
    setSaved(false);
  };

  const handleClear = () => {
    setList([]);
    if (userId) {
      localStorage.removeItem(`shopping-list-${userId}`);
    }
    setSaved(false);
  };

  const handleSave = () => {
    if (userId) {
      localStorage.setItem(`shopping-list-${userId}`, JSON.stringify(list));
      setSaved(true);
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
              onClick={() => removeItem(idx)}
              className="ml-2 text-red-500 hover:text-red-700 transition"
              title="Remover"
            >
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";

export default function OfertaForm({ initialData, onSubmit, loading }) {
  const [form, setForm] = useState({
    nomeProduto: "",
    descricao: "",
    precoPromocional: "",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        nomeProduto: initialData.nomeProduto || "",
        descricao: initialData.descricao || "",
        precoPromocional: initialData.precoPromocional || "",
      });
    }
  }, [initialData]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  if (loading) return <p className="p-6">Carregando...</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block font-medium">Nome do Produto</label>
        <input
          type="text"
          name="nomeProduto"
          value={form.nomeProduto}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <div>
        <label className="block font-medium">Descrição</label>
        <textarea
          name="descricao"
          value={form.descricao}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
        />
      </div>
      <div>
        <label className="block font-medium">Preço Promocional</label>
        <input
          type="number"
          name="precoPromocional"
          value={form.precoPromocional}
          onChange={handleChange}
          className="w-full border px-3 py-2 rounded"
          required
        />
      </div>
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Salvar
      </button>
    </form>
  );
}

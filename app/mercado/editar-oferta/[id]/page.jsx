"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditarOfertaPage() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;

  const [form, setForm] = useState({
    nomeProduto: "",
    descricao: "",
    precoPromocional: "",
  });
  const [loading, setLoading] = useState(true);

  // buscar dados da oferta para preencher o form
  useEffect(() => {
    async function fetchOferta() {
      try {
        const res = await fetch(`/api/mercado/ofertas`);
        const data = await res.json();
        const oferta = data.ofertas.find((o) => o.id === id);
        if (oferta) {
          setForm({
            nomeProduto: oferta.nomeProduto || "",
            descricao: oferta.descricao || "",
            precoPromocional: oferta.precoPromocional || "",
          });
        }
      } catch (err) {
        console.error("Erro ao buscar oferta", err);
      } finally {
        setLoading(false);
      }
    }
    fetchOferta();
  }, [id]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await fetch(`/api/mercado/ofertas/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        router.push("/mercado/gerenciar-ofertas");
      } else {
        alert("Erro ao atualizar a oferta");
      }
    } catch (err) {
      console.error("Erro ao enviar atualização", err);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  if (loading) return <p className="p-6">Carregando oferta...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Editar Oferta</h1>
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
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}

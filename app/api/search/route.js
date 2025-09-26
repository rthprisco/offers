import produtos from "@/public/produtos.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q")?.toLowerCase() || "";

  // Se não tiver busca, retorna todos os produtos
  if (!q) {
    return new Response(JSON.stringify(produtos), {
      headers: { "Content-Type": "application/json" },
    });
  }

  // Filtra produtos que contenham o termo no título
  const filtered = produtos.filter((p) =>
    p.titulo.toLowerCase().includes(q)
  );

  return new Response(JSON.stringify(filtered), {
    headers: { "Content-Type": "application/json" },
  });
}


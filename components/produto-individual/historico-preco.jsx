"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export function HistoricoPreco({ productId }) {
  // Mock de histórico (isso depois pode vir da API / banco)
  const data = [
    { date: "01/08", price: 6.69 },
    { date: "05/08", price: 6.39 },
    { date: "10/08", price: 6.19 },
    { date: "15/08", price: 5.99 },
  ];

  return (
    <div className="my-6">
      <h2 className="font-semibold mb-3">Histórico de Preço</h2>
      <div className="h-64 bg-white p-2 rounded-xl shadow">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#2563eb"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
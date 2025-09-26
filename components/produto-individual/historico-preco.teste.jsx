import React from "react";
import { render, screen } from "@testing-library/react";
import { HistoricoPreco } from "./historico-preco";

describe("HistoricoPreco", () => {
  it("renderiza o título do gráfico", () => {
    render(<HistoricoPreco productId="1" />);
    const titulo = screen.getByText(/Histórico de Preço/i);
    expect(titulo).toBeInTheDocument();
  });

  it("renderiza pelo menos um dado do mock", () => {
    render(<HistoricoPreco productId="1" />);
    const preco = screen.getByText(/6.69/);
    expect(preco).toBeInTheDocument();
  });
});

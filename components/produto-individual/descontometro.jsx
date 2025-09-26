"use client";
import PropTypes from "prop-types";

export function Descontometro({ oldPrice, newPrice }) {
  const oldP = Number(oldPrice);
  const newP = Number(newPrice);

  if (!isFinite(oldP) || oldP <= 0) {
    return (
      <div className="bg-gray-100 text-gray-800 p-3 rounded-2xl shadow mb-4">
        <strong>Sem desconto disponível</strong>
      </div>
    );
  }

  const raw = ((oldP - newP) / oldP) * 100;
  const desconto = Math.max(0, Math.round(raw));

  return (
    <div className="bg-green-100 text-green-800 p-3 rounded-2xl shadow mb-4">
      <strong>Desconto: {desconto}%</strong>
    </div>
  );
}

Descontometro.propTypes = {
  oldPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  newPrice: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

"use client"

import { useState } from "react"
import { MapPin, X } from "lucide-react"
import "./modal.css"

export default function CepModal({ isOpen, onClose, onAddressUpdate }) {
  const [cep, setCep] = useState("")
  const [address, setAddress] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleCepChange = (e) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value.length > 8) value = value.slice(0, 8)
    if (value.length > 5) {
      value = value.slice(0, 5) + "-" + value.slice(5)
    }
    setCep(value)
  }

  const handleSearchCep = async () => {
    const cleanCep = cep.replace(/\D/g, "")

    if (cleanCep.length !== 8) {
      setError("CEP deve ter 8 dígitos")
      return
    }

    setLoading(true)
    setError("")

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
      const data = await response.json()

      if (data.erro) {
        setError("CEP não encontrado")
        setLoading(false)
        return
      }

      const addressData = {
        cep: data.cep,
        street: data.logradouro,
        neighborhood: data.bairro,
        city: data.localidade,
        state: data.uf,
      }

      setAddress(addressData)
      onAddressUpdate(addressData)
    } catch (err) {
      setError("Erro ao buscar CEP")
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    setError("")
    setCep("")
    setAddress(null)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={handleClose} className="modal-close-button">
          <X size={20} />
        </button>

        <div className="modal-header">
          <MapPin size={24} className="modal-icon" />
          <h2 className="modal-title">Insira seu CEP</h2>
        </div>

        <div className="modal-body">
          <div className="modal-input-group">
            <input
              type="text"
              value={cep}
              onChange={handleCepChange}
              placeholder="00000-000"
              className="modal-input"
              maxLength={9}
              autoFocus
            />
            {error && <p className="modal-error">{error}</p>}
          </div>

          <button onClick={handleSearchCep} disabled={loading} className={`modal-button ${loading ? "loading" : ""}`}>
            {loading ? "Buscando..." : "Buscar CEP"}
          </button>

          {address && (
            <div className="modal-address-display">
              <h3 className="address-title">Endereço Completo:</h3>
              <div className="address-details">
                {address.street && (
                  <p>
                    <span className="label">Rua:</span> {address.street}
                  </p>
                )}
                {address.neighborhood && (
                  <p>
                    <span className="label">Bairro:</span> {address.neighborhood}
                  </p>
                )}
                <p>
                  <span className="label">Cidade:</span> {address.city}
                </p>
                <p>
                  <span className="label">Estado:</span> {address.state}
                </p>
                <p>
                  <span className="label">CEP:</span> {address.cep}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

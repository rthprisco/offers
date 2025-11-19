"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { CircleUser, ListChecks, Newspaper, Search, MapPin, LogOut } from "lucide-react"
import { GoBell } from "react-icons/go"
import UserDropdown from "./UserDropdown"
import CepModal from "./CepModal"
import "./navbar.css"

export default function Navbar() {
  const [user, setUser] = useState(null)
  const [userType, setUserType] = useState(null)
  const [showCepModal, setShowCepModal] = useState(false)
  const [address, setAddress] = useState(null)

  useEffect(() => {
    const userData = localStorage.getItem("user_data")
    const mercadoData = localStorage.getItem("mercado_data")

    if (userData) {
      setUser(JSON.parse(userData))
      setUserType("user")
    } else if (mercadoData) {
      setUser(JSON.parse(mercadoData))
      setUserType("mercado")
    }

    const savedAddress = localStorage.getItem("user_address")
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user_data")
    localStorage.removeItem("mercado_data")
    localStorage.removeItem("user_type")
    localStorage.removeItem("mercado_token")
    window.location.href = "/"
  }

  const getUserDisplayName = () => {
    if (!user) return null
    return userType === "mercado" ? user.nome : user.name
  }

  const handleAddressUpdate = (newAddress) => {
    setAddress(newAddress)
    localStorage.setItem("user_address", JSON.stringify(newAddress))
  }

  return (
    <header className="navbar-container">
      <div className="navbar-logo">
        <Link to="/">
          <img src="/logo-offers.svg" alt="Logo OFFers" />
        </Link>
      </div>

      <div className="navbar-search-section">
        <div className="navbar-search-input">
          <input type="text" placeholder="Pesquise pelo seu produto..." className="search-field" />
          <Search className="search-icon" color="gray" size={20} />
        </div>
        <button onClick={() => setShowCepModal(true)} className="navbar-cep-button">
          <MapPin size={16} />
          <span className="cep-text">{address ? `${address.city} - ${address.state}` : "Insira seu CEP"}</span>
        </button>
      </div>

      <nav className="navbar-menu-desktop">
        <ul className="navbar-menu-list">
          <li className="navbar-user-item">
            <CircleUser size={28} color="white" />
            {user ? (
              <div className="navbar-user-content">
                {userType === "mercado" ? (
                  <div className="navbar-dropdown-wrapper">
                    <span className="user-name">Olá, {getUserDisplayName()}</span>
                    <UserDropdown handleLogout={handleLogout} />
                  </div>
                ) : (
                  <div className="navbar-user-info">
                    <p className="user-name">Olá, {getUserDisplayName()}</p>
                    <button onClick={handleLogout} title="Sair" className="logout-button">
                      <LogOut size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="navbar-login-link">
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </div>
            )}
          </li>

          <li className="navbar-nav-item">
            <Link to="/create-list" title="Criar Lista" className="navbar-icon-link">
              <ListChecks size={28} />
            </Link>
          </li>

          <li className="navbar-nav-item">
            <Link to="/supermarket-flyers" title="Confira os encartes" className="navbar-icon-link">
              <Newspaper size={28} />
            </Link>
          </li>
        </ul>
      </nav>

      <div className="navbar-mobile-bell">
        <GoBell size={24} color="white" />
      </div>

      <CepModal isOpen={showCepModal} onClose={() => setShowCepModal(false)} onAddressUpdate={handleAddressUpdate} />
    </header>
  )
}

"use client"

import { LogOut, Settings, Package } from "lucide-react"
import { Link } from "react-router-dom"
import "./user-dropdown.css"

export default function UserDropdown({ handleLogout }) {
  return (
    <div className="user-dropdown">
      <Link to="/my-account" className="dropdown-item">
        <Package size={16} />
        <span>Minha Conta</span>
      </Link>
      <Link to="/my-account" className="dropdown-item">
        <Settings size={16} />
        <span>Configurações</span>
      </Link>
      <button onClick={handleLogout} className="dropdown-item logout">
        <LogOut size={16} />
        <span>Sair</span>
      </button>
    </div>
  )
}

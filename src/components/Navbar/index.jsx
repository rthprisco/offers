import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="bg-primary-blue flex h-24">
      <div></div>
      <div>
        <input
          type="text"
          placeholder="Busque pelo seu produto..."
          className="bg-background"
        />
      </div>
      <div>
        <ul>
          <li>
            <Link to="/login">Entrar</Link>
          </li>
          <li>
            <Link to="/grocery-list">Criar Lista</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

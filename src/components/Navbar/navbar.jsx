import { useEffect, useState } from "react"

import { CircleUser, ListChecks, Newspaper, Search, MapPin, LogOut, X } from "lucide-react"
// import { GoBell } from "react-icons/go"

export default function Navbar() {
//   const [user, setUser] = useState(null)
//   const [userType, setUserType] = useState(null)
//   const [showCepModal, setShowCepModal] = useState(false)
//   const [cep, setCep] = useState("")
//   const [address, setAddress] = useState(null)
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const userData = localStorage.getItem("user_data")
//     const mercadoData = localStorage.getItem("mercado_data")

//     if (userData) {
//       setUser(JSON.parse(userData))
//       setUserType("user")
//     } else if (mercadoData) {
//       setUser(JSON.parse(mercadoData))
//       setUserType("mercado")
//     }

//     const savedAddress = localStorage.getItem("user_address")
//     if (savedAddress) {
//       setAddress(JSON.parse(savedAddress))
//     }
//   }, [])

//   const handleLogout = () => {
//     localStorage.removeItem("user_data")
//     localStorage.removeItem("mercado_data")
//     localStorage.removeItem("user_type")
//     localStorage.removeItem("mercado_token")
//     window.location.href = "/"
//   }

//   const getUserDisplayName = () => {
//     if (!user) return null
//     if (userType === "mercado") {
//       return user.nome
//     } else {
//       return user.name
//     }
//   }

//   const handleSearchCep = async () => {
//     const cleanCep = cep.replace(/\D/g, "")

//     if (cleanCep.length !== 8) {
//       setError("CEP deve ter 8 dígitos")
//       return
//     }

//     setLoading(true)
//     setError("")

//     try {
//       const response = await fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
//       const data = await response.json()

//       if (data.erro) {
//         setError("CEP não encontrado")
//         setLoading(false)
//         return
//       }

//       const addressData = {
//         cep: data.cep,
//         street: data.logradouro,
//         neighborhood: data.bairro,
//         city: data.localidade,
//         state: data.uf,
//       }

//       setAddress(addressData)
//       localStorage.setItem("user_address", JSON.stringify(addressData))
//       setShowCepModal(false)
//       setCep("")
//     } catch (err) {
//       setError("Erro ao buscar CEP")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCepChange = (e) => {
//     let value = e.target.value.replace(/\D/g, "")
//     if (value.length > 8) value = value.slice(0, 8)
//     if (value.length > 5) {
//       value = value.slice(0, 5) + "-" + value.slice(5)
//     }
//     setCep(value)
//   }

  return (
    <header className="bg-primary-blue flex w-full items-center justify-around shadow md:gap-8">
      <div className="flex w-14 flex-col justify-center md:w-20">
        <a href="/">
          <img src="/logo-offers.svg" alt="Logo OFFers" width={90} height={90} />
        </a>
      </div>

      <div className="flex w-[240px] flex-col justify-center gap-2 py-4 md:w-[460px]">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Pesquise pelo seu produto..."
            className="bg-background relative h-10 w-full rounded-xl border-none px-4 py-0 text-sm shadow focus:outline-none"
          />
          <Search className="absolute right-3 hidden md:block" color="gray" />
        </div>
        <button
        //   onClick={() => setShowCepModal(true)}
        //   className="hidden items-center gap-1 text-white md:flex hover:opacity-80 transition-opacity"
        >
          <MapPin size={16} />
          <span className="text-xs">{address ? `${address.city} - ${address.state}` : "Insira seu CEP"}</span>
        </button>
      </div>

      <div className="hidden flex-col justify-center md:flex">
        <ul className="flex list-none items-center">
          <li className="flex gap-2 p-4 relative group">
            <CircleUser size={28} color="white" />
            {user ? (
              <div className="flex items-center text-sm text-white">
                {userType === "mercado" ? (
                  <div className="relative group">
                    <span className="cursor-pointer">Olá, {getUserDisplayName()}</span>
                    <div className="absolute hidden group-hover:block hover:block top-full right-0 mt-2">
                      <UserDropdown handleLogout={handleLogout} />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <p>Olá, {getUserDisplayName()}</p>
                    <button
                      onClick={handleLogout}
                      title="Sair"
                      className="flex items-center text-white hover:text-gray-200 transition-colors"
                    >
                      <LogOut size={16} />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2 text-sm text-white">
                <Link href="/login" className="hover:underline">
                  Login
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link href="/create-list" title="Criar Lista" className="flex items-center gap-1 p-4 text-sm text-white">
              <ListChecks size={28} />
            </Link>
          </li>

          <li>
            <Link
              href="/supermarket-flyers"
              title="Confira os encartes"
              className="flex items-center gap-1 p-4 text-sm text-white"
            >
              <Newspaper size={28} />
            </Link>
          </li>
        </ul>
      </div>

      <div className="md:hidden">
        <GoBell size={24} color="white" />
      </div>

      {showCepModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl p-6 w-full max-w-sm relative animate-in fade-in zoom-in duration-200">
            <button
              onClick={() => {
                setShowCepModal(false)
                setError("")
                setCep("")
              }}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-2 mb-4">
              <MapPin size={24} className="text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">Insira seu CEP</h2>
            </div>

            <div className="space-y-3">
              <div>
                <input
                  type="text"
                  value={cep}
                  onChange={handleCepChange}
                  placeholder="00000-000"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  maxLength={9}
                  autoFocus
                />
                {error && <p className="text-red-500 text-sm mt-1.5">{error}</p>}
              </div>

              <button
                onClick={handleSearchCep}
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed font-medium"
              >
                {loading ? "Buscando..." : "Buscar CEP"}
              </button>

              {address && (
                <div className="mt-3 p-4 bg-blue-50 rounded-lg border border-blue-100">
                  <h3 className="font-semibold text-gray-800 mb-2 text-sm">Endereço Completo:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    {address.street && (
                      <p>
                        <span className="font-medium">Rua:</span> {address.street}
                      </p>
                    )}
                    {address.neighborhood && (
                      <p>
                        <span className="font-medium">Bairro:</span> {address.neighborhood}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Cidade:</span> {address.city}
                    </p>
                    <p>
                      <span className="font-medium">Estado:</span> {address.state}
                    </p>
                    <p>
                      <span className="font-medium">CEP:</span> {address.cep}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

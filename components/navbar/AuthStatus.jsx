// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function AuthStatus() {
//   const [name, setName] = useState(null);
//   const [type, setType] = useState(null); // "user" | "mercado"

//   useEffect(() => {
//     try {
//       // prioridade para mercado se estiver na mesma máquina
//       const md = localStorage.getItem("mercado_data");
//       if (md) {
//         const m = JSON.parse(md);
//         if (m?.nome) {
//           setName(m.nome);
//           setType("mercado");
//           return;
//         }
//       }
//       const ud = localStorage.getItem("user_data");
//       if (ud) {
//         const u = JSON.parse(ud);
//         if (u?.name) {
//           setName(u.name);
//           setType("user");
//         }
//       }
//     } catch {}
//   }, []);

//   if (!name) return null;

//   const href = type === "mercado" ? "/" : "/my-account";

//   return (
//     <div className="text-white text-sm px-2">
//       <span>Olá </span>
//       <Link href={href} className="underline underline-offset-4">{name}</Link>
//       <span> logado</span>
//     </div>
//   );
// }
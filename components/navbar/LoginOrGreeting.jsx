// "use client";
// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { CircleUser } from "lucide-react";

// export default function LoginOrGreeting() {
//   const [name, setName] = useState(null);
//   const [href, setHref] = useState("/(auth)/login");

//   useEffect(() => {
//     try {
//       const md = localStorage.getItem("mercado_data");
//       if (md) {
//         const m = JSON.parse(md);
//         if (m?.nome) {
//           setName(m.nome);
//           setHref("/");
//           return;
//         }
//       }
//       const ud = localStorage.getItem("user_data");
//       if (ud) {
//         const u = JSON.parse(ud);
//         if (u?.name) {
//           setName(u.name);
//           setHref("/my-account");
//         }
//       }
//     } catch {}
//   }, []);

//   if (name) {
//     return (
//       <li>
//         <div className="flex items-center gap-2 p-4 text-sm text-white">
//           <span>Olá</span>
//           <Link href={href} className="underline underline-offset-4">{name}</Link>
//           <span>logado</span>
//         </div>
//       </li>
//     );
//   }

//   // Not logged: show the original login link with icon
//   return (
//     <li>
//       <Link
//         href="/(auth)/login"
//         title="Faça seu login ou cadastre-se"
//         className="flex items-center gap-1 p-4 text-sm text-white"
//       >
//         <CircleUser size={28} />
//       </Link>
//     </li>
//   );
// }

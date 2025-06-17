

import { auth } from "@/auth";
import LoginForm from "./login-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default async function Login() {
  const session = await auth();

  if (session) return redirect("/");

  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link href="/" className="mb-2 flex items-center gap-1 text-slate-600">
        <IoMdArrowBack />
        Voltar
      </Link>

      <LoginForm />

      <div className="pt-2">
        <p className="text-slate-600">
          Ainda não possui cadastro?{" "}
          <Link href="/register" className="text-primary-blue hover:underline">
            Registre-se
          </Link>
        </p>
      </div>
    </main>
  );
}

import { auth } from "@/auth";
import RegisterForm from "./register-form";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoMdArrowBack } from "react-icons/io";

export default async function Register() {
  const session = await auth();

  if (session) return redirect("/");
  
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <Link href="/" className="mb-2 flex items-center gap-1 text-slate-600">
        <IoMdArrowBack />
        Voltar
      </Link>

      <RegisterForm />

      <div className="pt-2">
        <p className="text-slate-600">
          Já possui uma conta?{" "}
          <Link href="/login" className="text-primary-blue">
            Fazer login
          </Link>
        </p>
      </div>
    </main>
  );
}

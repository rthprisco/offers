import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";

import Field from "../../components/Field";
import Input from "../../components/Input";

export default function Login() {
  return (
    <div className="w-96">
      <Link to="/" className="flex items-center gap-2 p-2 text-gray-500">
        <FaArrowLeft />
        <span>Voltar</span>
      </Link>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-300 p-8">
        <h1 className="text-center text-2xl font-semibold">Faça seu login</h1>
        <Field>
          <label htmlFor="">E-mail</label>
          <Input type="email" name="" id="" label="E-mail" />
        </Field>

        <Field>
          <div className="flex justify-between">
            <label htmlFor="">Senha</label>
            <Link to="" className="text-primary-blue hover:underline">
              Esqueceu sua senha?
            </Link>
          </div>
          <Input type="password" />
        </Field>

        <button className="bg-primary-red hover:bg-primary-red/90 w-full cursor-pointer rounded-xl py-2 text-xl font-normal text-white">
          Continuar
        </button>
        <span className="flex gap-1">
          <p>Não tem uma conta?</p>
          <Link
            to="/create-account"
            className="text-primary-blue hover:underline"
          >
            Cadastre-se
          </Link>
        </span>
        <div className="flex w-full items-center justify-center gap-6">
          <span className="h-px w-[50%] bg-slate-300"></span>
          <span>Ou</span>
          <span className="h-px w-[50%] bg-slate-300"></span>
        </div>

        <button className="flex w-full cursor-pointer items-center rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-300/20">
          <FcGoogle size={24} />
          <span className="w-full">Fazer login com o Google</span>
        </button>
      </div>
    </div>
  );
}

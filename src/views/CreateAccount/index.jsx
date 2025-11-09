import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { FaArrowLeft } from "react-icons/fa";

import Field from "../../components/Field";
import Input from "../../components/Input";
import { useAuthContext } from "../../context/AuthContext/useAuthContext";

export default function CreateAccountPage() {
  const { register } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const { name, email, phone, password } = formData;

    await register(name, email, phone, password);

    navigate("/", { replace: true });
  }

  return (
    <div className="w-96">
      <Link to="/" className="flex items-center gap-2 p-2 text-gray-500">
        <FaArrowLeft />
        <span>Voltar</span>
      </Link>
      <div className="flex flex-col items-center gap-4 rounded-lg border border-slate-300 p-8">
        <h1 className="text-center text-2xl font-semibold">Crie sua conta</h1>
        <form onSubmit={handleSubmit} className="flex w-full flex-col gap-4">
          <Field>
            <label htmlFor="">Nome</label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label htmlFor="">E-mail</label>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label htmlFor="">Telefone</label>
            <Input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label htmlFor="">Senha</label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label htmlFor="">Confirmar senha</label>
            <Input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </Field>

          <button
            type="submit"
            className="bg-primary-red hover:bg-primary-red/90 w-full cursor-pointer rounded-xl py-2 text-xl font-normal text-white"
          >
            Continuar
          </button>
        </form>

        <span className="flex gap-1">
          <p>Já possui cadastro?</p>
          <Link to="/login" className="text-primary-blue hover:underline">
            Entrar
          </Link>
        </span>
        <div className="flex w-full items-center justify-center gap-6">
          <span className="h-px w-[50%] bg-slate-300"></span>
          <span>Ou</span>
          <span className="h-px w-[50%] bg-slate-300"></span>
        </div>

        <button className="flex w-full cursor-pointer items-center rounded-lg border border-slate-300 px-4 py-2 hover:bg-slate-300/20">
          <FcGoogle size={24} />
          <span className="w-full">Cadastrar com o Google</span>
        </button>
      </div>
    </div>
  );
}

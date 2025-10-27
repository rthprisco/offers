"use client";

import Form from "next/form";
import InputField from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { register } from "@/controllers/authController";

export default function RegisterForm() {
  const [state, action, isPending] = useActionState(register, null);

  return (
    <Form action={action} className="w-96 rounded-lg bg-white p-6 shadow-md">
      <h2 className="text-2xl font-semibold">Crie sua conta</h2>
      <p className="text-sm text-slate-600">
        Para receber as melhores offertas
      </p>

      {/* {state?.success === false && (
        <ul className="mt-3 rounded-md border border-red-600 bg-red-100 p-3 text-sm text-red-600">
          {state?.errors.map((e) => (
            <li>{e}</li>
          ))}
        </ul>
      )} */}

      <div className="flex flex-col gap-3 py-6">
        <InputField
          label="Nome"
          type="text"
          name="name"
          error={state?.errors?.name}
        />
        <InputField
          label="E-mail"
          type="email"
          name="email"
          error={state?.errors?.email}
        />
        <InputField
          label="Telefone"
          type="text"
          name="phone"
          error={state?.errors?.phone}
        />
        <InputField
          label="Senha"
          type="password"
          name="password"
          error={state?.errors?.password}
        />
        <InputField
          label="Confirmar senha"
          type="password"
          name="confirmPassword"
          error={state?.errors?.confirmPassword}
        />
      </div>

      <Button type="submit" className="w-full">
        Cadastrar
      </Button>
    </Form>
  );
}

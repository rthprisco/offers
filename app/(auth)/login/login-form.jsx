"use client";

import Form from "next/form";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { login } from "@/controllers/authController";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <Form
      action={action}
      className="flex w-96 flex-col rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="text-2xl font-semibold">Faça seu login</h2>
      <p className="text-sm text-slate-600">
        Entre e fique por dentro das promoções
      </p>
      {state && (
        <span className="mt-6 w-full rounded-lg border border-red-500 bg-red-100 p-1 text-center text-sm text-red-500">
          {state.error}
        </span>
      )}

      <div className="flex flex-col gap-3 py-6">
        <InputField label="E-mail" type="email" name="email" />
        <InputField label="Senha" type="password" name="password" />
      </div>
      <Button type="submit" className="w-full">
        Entrar
      </Button>
    </Form>
  );
}

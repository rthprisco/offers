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
      className="rounded-lg bg-white px-8 py-6 shadow-md md:w-96"
    >
      <h2 className="text-2xl font-semibold">Faça login</h2>
      <p></p>
      <div className="flex flex-col gap-3 py-6">
        <InputField label="E-mail" type="email" name="email" />
        <InputField label="Senha" type="password" name="password" />
      </div>
      <Button type="submit" className="w-full">Entrar</Button>
    </Form>
  );
}

"use client";

import Form from "next/form";
import InputField from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { login } from "@/controllers/authController";

export default function LoginForm() {
  const [state, action, isPending] = useActionState(login, null);

  return (
    <Form action={action} className="w-96 rounded-lg bg-white p-6 shadow-md">
      <InputField label="E-mail" type="email" name="email" />
      <InputField label="Senha" type="password" name="password" />
      <Button type="submit">Entrar</Button>
    </Form>
  );
}

"use client";

import Form from "next/form";
import { useSession } from "next-auth/react";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { updateUser } from "@/controllers/userController";

export default function UpdateForm() {
  const { data: session, status, update } = useSession();

  async function updateWrapper(_prevState, formData) {
    const result = await updateUser(_prevState, formData);

    if (result.success) {
      const entries = Object.fromEntries(formData.entries());

      await update({
        ...session,
        user: {
          ...session?.user,
          name: entries.name,
          email: entries.email,
          phone: entries.phone,
        },
      });
    }
    return result;
  }

  const [state, action, isPending] = useActionState(updateWrapper, null);

  if (status === "loading") {
    return <p>Carregando dados...</p>;
  }

  const { id, name, email, phone } = session.user;

  return (
    <Form
      action={action}
      className="w-[400px] rounded-lg bg-white px-8 py-6 shadow-md"
    >
      <h3 className="text-xl">Dados da conta</h3>
      <div className="flex flex-col gap-3 py-6">
        <input type="text" name="id" value={id} onChange={() => {}} hidden />
        <InputField label="Nome" type="text" name="name" value={name} />
        <InputField label="E-mail" type="email" name="email" value={email} />
        <InputField label="Telefone" type="text" name="phone" value={phone} />
      </div>
      <Button type="submit" disable={isPending.toString()}>
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </Form>
  );
}

"use client";

import Form from "next/form";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import { useActionState } from "react";
import { updatePassword } from "@/controllers/userController";
import { useSession } from "next-auth/react";

import { toast } from "sonner";

export default function UpdatePassword() {
  const { data: session, status } = useSession();
  const [state, action, isPending] = useActionState(updatePassword, null);

  if (status === "loading") {
    return <p>Carregando dados...</p>;
  }

  return (
    <Form
      action={action}
      className="w-[400px] rounded-lg bg-white px-8 py-6 shadow-md"
    >
      <h3 className="text-xl">Altere sua senha</h3>
      <div className="flex flex-col gap-3 py-6">
        <input
          type="text"
          name="id"
          value={session.user.id}
          onChange={() => {}}
          hidden
        />
        <InputField
          label="Senha atual"
          type="password"
          name="password"
          error={state?.errors?.password}
        />
        <InputField
          label="Nova senha"
          type="password"
          name="newPassword"
          error={state?.errors?.newPassword}
        />
        <InputField
          label="Confirme a nova senha"
          type="password"
          name="confirmNewPassword"
          error={state?.errors?.confirmNewPassword}
        />
      </div>
      <Button type="submit" disable={isPending.toString()}>
        {isPending ? "Salvando..." : "Salvar alterações"}
      </Button>
    </Form>
  );
}

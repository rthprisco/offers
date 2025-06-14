import Form from "next/form";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";

export default function UserInfo({ label, user }) {
  return (
    <Form
      className="w-[400px] rounded-lg bg-white px-8 py-6 shadow-md"
    >
      <h3 className="text-xl">{label}</h3>
      <p>ID: {user.id}</p>
      <div className="flex flex-col gap-3 py-6">
        <input
          type="text"
          name="id"
          value={user.id}
          hidden
          disabled
        />
        <InputField label="Nome" type="text" name="name" value={user?.name} />
        <InputField
          label="E-mail"
          type="email"
          name="email"
          value={user?.email}
        />
        <InputField
          label="Telefone"
          type="text"
          name="phone"
          value={user?.phone}
        />
      </div>
      <Button type="submit">Salvar alterações</Button>
    </Form>
  );
}

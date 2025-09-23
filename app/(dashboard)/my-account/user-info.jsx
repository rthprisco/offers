// import Form from "next/form";
// import { InputField } from "@/components/ui/input-field";
//  import { Button } from "@/components/ui/button";
//  import { deleteAccount } from "./actions";

//  export default function UserInfo({ label, user }) {
//    return (
//      <Form
//        className="w-[400px] rounded-lg bg-white px-8 py-6 shadow-md"
//      >
//        <h3 className="text-xl">{label}</h3>
//        <p>ID: {user.id}</p>
//        <div className="flex flex-col gap-3 py-6">
//          <input
//            type="text"
//            name="id"
//            value={user.id}
//            hidden
//            disabled
//          />
//          <InputField label="Nome" type="text" name="name" value={user?.name} />
//          <InputField
//            label="E-mail"
//            type="email"
//            name="email"
//            value={user?.email}
//          />
//         <InputField
//            label="Telefone"
//            type="text"
//            name="phone"
//            value={user?.phone}
//          />
//        </div>
//        <div className="flex justify-between gap-4">
//          <Button type="submit">Salvar alterações</Button>
//         </div>
//          <button
//            type="submit"
//            formAction={deleteAccount}
//            className="bg-red-500 text-white px-4 py-2 rounded"
//          >

//          </button>
//        </div>
//      </Form>
//    );
// }

import Form from "next/form";
import { InputField } from "@/components/ui/input-field";
import { Button } from "@/components/ui/button";
import DeleteAccountForm from "./delete-account-form";

export default function UserInfo({ label, user }) {
  return (
    <div className="flex w-[400px] flex-col gap-3 rounded-lg bg-white px-8 py-6 shadow-md">
      <Form>
        <h3 className="text-xl">{label}</h3>
        <p>ID: {user.id}</p>
        <div className="flex flex-col gap-3 py-6">
          <input type="text" name="id" value={user.id} hidden disabled />
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
        <Button type="submit" className="w-full" variant={"outline"}>
          Salvar alterações
        </Button>
      </Form>
      <DeleteAccountForm idUser={user.id} />
    </div>
  );
}

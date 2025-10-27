import { logout } from "@/controllers/authController";
import Form from "next/form";
import { Button } from "@/components/ui/button";

export default function MyAccount() {
  return (
    <div>
      Minha Conta
      <Form action={logout}>
        <Button>Sair</Button>
      </Form>
    </div>
  );
}

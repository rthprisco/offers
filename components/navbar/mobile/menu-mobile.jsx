import { auth } from "@/auth";
import ItemsMenu from "./items-menu";

export default async function MenuMobile() {
  const session = await auth();

  return <ItemsMenu session={session} />;
}

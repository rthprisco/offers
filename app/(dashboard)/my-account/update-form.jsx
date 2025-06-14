// import { useCurrentUser } from "@/hooks/use-current-user";
import { currentUser } from "@/lib/auth";
import UserInfo from "./user-info";

export default async function UpdateForm() {
  // const user = useCurrentUser();
  const user = await currentUser();

  return <UserInfo label="Minha conta" user={user} />;
}

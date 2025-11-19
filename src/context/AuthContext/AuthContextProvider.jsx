import { useMemo, useState } from "react";
import { AuthContext } from "./AuthContext";
import { authController } from "../../../server/controllers/authController";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => authController.getCurrentUser());

  const value = useMemo(
    () => ({
      user,
      async register(name, email, phone, password) {
        const created = authController.register(name, email, phone, password);
        setUser(created);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

import { userModel } from "../models/userModel";

const CURRENT_USER_KEY = "current_user";

export const authController = {
  register(name, email, phone, password) {
    const user = userModel.create({ name, email, phone, password });

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  },

  login(email) {
    const user = userModel.findByCredentials(email);

    if (!user) {
      throw new Error("Credenciais inválidas");
    }

    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));

    return user;
  },

  logout() {
    localStorage.removeItem(CURRENT_USER_KEY);
  },

  getCurrentUser() {
    const data = localStorage.getItem(CURRENT_USER_KEY);
    return data ? JSON.parse(data) : null;
  },
};

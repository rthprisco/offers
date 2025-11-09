const STORAGE_KEY_USERS = "users";

export const userModel = {
  getAll() {
    const data = localStorage.getItem(STORAGE_KEY_USERS);
    return data ? JSON.parse(data) : [];
  },

  saveAll(users) {
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },

  create({ name, email, phone, password }) {
    const users = this.getAll();

    if (users.some((user) => user.email === email)) {
      throw new Error("Email já cadastrado");
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      phone,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    this.saveAll(users);
    return newUser;
  },

  findByCredentials(email) {
    return this.getAll().find((user) => user.email === email);
  },
};

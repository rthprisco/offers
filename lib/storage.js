// Utilitário para gerenciar dados no localStorage

export const storage = {
  // Usuários pessoais
  users: {
    save: (user) => {
      const users = storage.users.getAll();
      const existingIndex = users.findIndex(u => u.email === user.email);
      
      if (existingIndex >= 0) {
        users[existingIndex] = user;
      } else {
        users.push(user);
      }
      
      localStorage.setItem('users', JSON.stringify(users));
      return user;
    },
    
    getAll: () => {
      try {
        return JSON.parse(localStorage.getItem('users') || '[]');
      } catch {
        return [];
      }
    },
    
    findByEmail: (email) => {
      const users = storage.users.getAll();
      return users.find(user => user.email === email);
    },
    
    clear: () => {
      localStorage.removeItem('users');
    }
  },

  // Mercados
  mercados: {
    save: (mercado) => {
      const mercados = storage.mercados.getAll();
      const existingIndex = mercados.findIndex(m => m.email === mercado.email);
      
      if (existingIndex >= 0) {
        mercados[existingIndex] = mercado;
      } else {
        mercados.push(mercado);
      }
      
      localStorage.setItem('mercados', JSON.stringify(mercados));
      return mercado;
    },
    
    getAll: () => {
      try {
        return JSON.parse(localStorage.getItem('mercados') || '[]');
      } catch {
        return [];
      }
    },
    
    findByEmail: (email) => {
      const mercados = storage.mercados.getAll();
      return mercados.find(mercado => mercado.email === email);
    },
    
    findByCnpj: (cnpj) => {
      const mercados = storage.mercados.getAll();
      return mercados.find(mercado => mercado.cnpj === cnpj);
    },
    
    clear: () => {
      localStorage.removeItem('mercados');
    }
  },

  // Sessão atual
  session: {
    setUser: (userData) => {
      localStorage.setItem('user_data', JSON.stringify(userData));
      localStorage.setItem('user_type', 'user');
    },
    
    setMercado: (mercadoData) => {
      localStorage.setItem('mercado_data', JSON.stringify(mercadoData));
      localStorage.setItem('user_type', 'mercado');
    },
    
    getUser: () => {
      try {
        const userData = localStorage.getItem('user_data');
        return userData ? JSON.parse(userData) : null;
      } catch {
        return null;
      }
    },
    
    getMercado: () => {
      try {
        const mercadoData = localStorage.getItem('mercado_data');
        return mercadoData ? JSON.parse(mercadoData) : null;
      } catch {
        return null;
      }
    },
    
    getUserType: () => {
      return localStorage.getItem('user_type') || null;
    },
    
    getCurrentUser: () => {
      const userType = storage.session.getUserType();
      if (userType === 'user') {
        return storage.session.getUser();
      } else if (userType === 'mercado') {
        return storage.session.getMercado();
      }
      return null;
    },
    
    isLoggedIn: () => {
      return storage.session.getCurrentUser() !== null;
    },
    
    logout: () => {
      localStorage.removeItem('user_data');
      localStorage.removeItem('mercado_data');
      localStorage.removeItem('user_type');
      localStorage.removeItem('mercado_token');
    }
  }
};

// Hash simples para senhas (apenas para demonstração)
export const hashPassword = async (password) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hash = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hash))
    .map(b => b.toString(16).padStart(2, '0'))
    .join('');
};

// Verificar senha
export const verifyPassword = async (password, hashedPassword) => {
  const hashedInput = await hashPassword(password);
  return hashedInput === hashedPassword;
};


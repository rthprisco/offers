// Utilitários para autenticação de mercados no lado do cliente

export const getMercadoToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('mercado_token');
};

export const getMercadoData = () => {
  if (typeof window === 'undefined') return null;
  const data = localStorage.getItem('mercado_data');
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Erro ao parsear dados do mercado:', error);
    return null;
  }
};

export const setMercadoAuth = (token, mercadoData) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('mercado_token', token);
  localStorage.setItem('mercado_data', JSON.stringify(mercadoData));
};

export const clearMercadoAuth = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('mercado_token');
  localStorage.removeItem('mercado_data');
};

export const isMercadoAuthenticated = () => {
  const token = getMercadoToken();
  const data = getMercadoData();
  return !!(token && data);
};

// Hook personalizado para usar em componentes React
export const useMercadoAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mercado, setMercado] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getMercadoToken();
    const mercadoData = getMercadoData();
    
    if (token && mercadoData) {
      setIsAuthenticated(true);
      setMercado(mercadoData);
    } else {
      setIsAuthenticated(false);
      setMercado(null);
    }
    
    setIsLoading(false);
  }, []);

  const login = (token, mercadoData) => {
    setMercadoAuth(token, mercadoData);
    setIsAuthenticated(true);
    setMercado(mercadoData);
  };

  const logout = () => {
    clearMercadoAuth();
    setIsAuthenticated(false);
    setMercado(null);
  };

  return {
    isAuthenticated,
    mercado,
    isLoading,
    login,
    logout
  };
};


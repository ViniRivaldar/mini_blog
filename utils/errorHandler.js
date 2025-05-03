import errorMessages from './errorMessages';

/**
 * Interpreta um erro de API e retorna uma mensagem amigável
 * @param {Error} error - O objeto de erro capturado
 * @returns {string} Mensagem de erro amigável para o usuário
 */
export const handleApiError = (error) => {
  // Se o erro tiver uma resposta (geralmente de um cliente HTTP como axios)
  if (error.response) {
    const { status } = error.response;
    
    // Mapeia códigos de status HTTP para mensagens de erro
    switch (status) {
      case 400:
        return errorMessages.auth.invalidCredentials;
      case 401:
        return errorMessages.auth.unauthorized;
      case 403:
        return errorMessages.auth.forbidden;
      case 404:
        return "Recurso não encontrado.";
      case 500:
      case 502:
      case 503:
        return errorMessages.network.server;
      default:
        return errorMessages.generic.default;
    }
  }
  
  // Erros de rede (sem resposta do servidor)
  if (error.message) {
    if (error.message.includes('Network Error')) {
      return errorMessages.network.connection;
    }
    if (error.message.includes('timeout')) {
      return errorMessages.network.timeout;
    }
  }
  
  // Erro genérico se nenhum dos anteriores corresponder
  return errorMessages.generic.default;
};

/**
 * Interpreta um erro genérico (string ou objeto) e retorna mensagem amigável
 * @param {string|object} error - O erro a ser interpretado
 * @returns {string|null} Mensagem de erro amigável ou null se não houver erro
 */
export const parseError = (error) => {
  if (!error) return null;
  
  // Se for uma string
  if (typeof error === 'string') {
    if (error.includes("400") || error.includes("401")) {
      return errorMessages.auth.invalidCredentials;
    } else if (error.includes("Network") || error.includes("timeout")) {
      return errorMessages.network.connection;
    } else {
      return errorMessages.generic.default;
    }
  }
  
  // Se for um objeto de erro
  if (error instanceof Error) {
    return handleApiError(error);
  }
  
  return errorMessages.generic.processing;
};
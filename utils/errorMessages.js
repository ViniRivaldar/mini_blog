/**
 * Objeto com mensagens de erro amigáveis para o usuário
 */
const errorMessages = {
    // Erros de autenticação
    auth: {
      invalidCredentials: "Email ou senha incorretos. Por favor, verifique suas credenciais.",
      unauthorized: "Acesso não autorizado. Faça login novamente.",
      forbidden: "Você não tem permissão para acessar esse recurso.",
    },
    
    // Erros de rede
    network: {
      connection: "Erro de conexão. Verifique sua internet e tente novamente.",
      timeout: "O servidor demorou muito para responder. Tente novamente mais tarde.",
      server: "Erro no servidor. Por favor, tente novamente mais tarde."
    },
    
    // Erros genéricos
    generic: {
      default: "Ocorreu um erro inesperado. Por favor, tente novamente mais tarde.",
      processing: "Erro ao processar sua solicitação. Tente novamente."
    },
    
    // Erros de validação de formulário
    validation: {
      required: (field) => `${field} é obrigatório`,
      email: "Email inválido",
      minLength: (field, length) => `${field} deve ter pelo menos ${length} caracteres`,
      maxLength: (field, length) => `${field} deve ter no máximo ${length} caracteres`
    }
  };
  
  export default errorMessages;
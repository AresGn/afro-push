/**
 * Gestionnaire d'erreurs pour les opérations d'authentification
 */

/**
 * Fonction pour gérer les erreurs d'authentification
 * @param error L'erreur à gérer
 * @param defaultMessage Message par défaut à afficher
 * @returns Un message d'erreur utilisateur
 */
export function handleAuthError(error: unknown, defaultMessage = "Une erreur est survenue lors de l'authentification"): string {
  console.error('Auth error:', error);
  
  if (error instanceof Error) {
    // Si l'erreur est une instance de Error, on peut accéder à son message
    if (error.message.includes('ECONNREFUSED') || error.message.includes('connect')) {
      return "Impossible de se connecter à la base de données. Vérifiez votre connexion.";
    } else if (error.message.includes('invalid_credentials') || error.message.includes('Invalid credentials')) {
      return "Identifiants incorrects. Veuillez vérifier votre email et mot de passe.";
    } else if (error.message.includes('exists') || error.message.includes('email_exists')) {
      return "Cet email est déjà utilisé par un autre compte.";
    } 
  }
  
  // Message par défaut si on ne peut pas identifier l'erreur spécifique
  return defaultMessage;
}

/**
 * Fonction pour intercepter les appels d'API d'authentification 
 * et gérer leurs erreurs
 * @param apiCall La fonction d'API à appeler
 * @returns Le résultat de l'appel API ou null en cas d'erreur
 */
export async function safeAuthApiCall<T>(apiCall: () => Promise<T>): Promise<T | null> {
  try {
    return await apiCall();
  } catch (error) {
    console.error('API call error:', error);
    return null;
  }
} 
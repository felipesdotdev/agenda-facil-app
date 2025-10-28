/**
 * Utilitários para máscara de telefone brasileiro
 */

/**
 * Aplica máscara de telefone brasileiro
 * Ex: "19999999999" -> "(19) 99999-9999"
 */
export function maskPhone(value: string): string {
  // Remove todos os caracteres não numéricos
  const numbers = value.replace(/\D/g, "");

  // Aplica a máscara baseada no tamanho
  if (numbers.length <= 2) {
    return numbers;
  }
  if (numbers.length <= 6) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
  }
  if (numbers.length <= 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
}

/**
 * Remove a máscara do telefone, retornando apenas números
 * Ex: "(19) 99999-9999" -> "19999999999"
 */
export function unmaskPhone(value: string): string {
  return value.replace(/\D/g, "");
}

/**
 * Valida se o telefone tem formato válido (10 ou 11 dígitos)
 */
export function isValidPhone(value: string): boolean {
  const numbers = unmaskPhone(value);
  return numbers.length === 10 || numbers.length === 11;
}

/**
 * Formata telefone para exibição consistente
 * Sempre retorna no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
 */
export function formatPhoneDisplay(value: string): string {
  const numbers = unmaskPhone(value);

  if (numbers.length === 10) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
  }
  if (numbers.length === 11) {
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7)}`;
  }

  return value;
}

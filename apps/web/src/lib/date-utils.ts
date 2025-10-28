/**
 * Utilitários para formatação e manipulação de datas no sistema de agendamento
 */

/**
 * Formata uma data para exibição de agendamento
 * Ex: "Segunda, 15 de Janeiro de 2025 às 14:00"
 */
export function formatAppointmentDate(date: Date): string {
  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  };

  return new Intl.DateTimeFormat("pt-BR", options).format(date);
}

/**
 * Formata um slot de horário para exibição
 * Ex: "09:00 - 10:00"
 */
export function formatTimeSlot(start: Date, end: Date): string {
  const startTime = start.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });

  const endTime = end.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Sao_Paulo",
  });

  return `${startTime} - ${endTime}`;
}

/**
 * Verifica se a data é um dia útil (segunda a sexta)
 */
export function isWeekday(date: Date): boolean {
  const day = date.getDay();
  return day >= 1 && day <= 5; // 1 = segunda, 5 = sexta
}

/**
 * Verifica se a data está dentro do horário comercial (8h às 18h)
 */
export function isBusinessHours(date: Date): boolean {
  const hour = date.getHours();
  return hour >= 8 && hour < 18;
}

/**
 * Obtém o início do dia (00:00:00)
 */
export function getStartOfDay(date: Date): Date {
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  return startOfDay;
}

/**
 * Obtém o fim do dia (23:59:59)
 */
export function getEndOfDay(date: Date): Date {
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);
  return endOfDay;
}

/**
 * Verifica se uma data é hoje
 */
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

/**
 * Verifica se uma data é no futuro
 */
export function isFuture(date: Date): boolean {
  const now = new Date();
  return date > now;
}

/**
 * Adiciona dias a uma data
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Obtém a próxima data útil (pula fins de semana)
 */
export function getNextBusinessDay(date: Date): Date {
  let nextDay = addDays(date, 1);
  while (!isWeekday(nextDay)) {
    nextDay = addDays(nextDay, 1);
  }
  return nextDay;
}

/**
 * Formata uma data para o formato esperado pela API
 * Converte para formato ISO sem segundos e timezone (YYYY-MM-DDTHH:mm)
 */
export function formatDateForAPI(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

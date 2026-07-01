import { format, parseISO } from "date-fns";

export function formatDate(dateString: string): string {
  return format(parseISO(dateString), "MMMM d, yyyy");
}

export function formatDateShort(dateString: string): string {
  return format(parseISO(dateString), "MMM d, yyyy");
}

export function formatDateNumeric(dateString: string): string {
  return format(parseISO(dateString), "yyyy-MM-dd");
}

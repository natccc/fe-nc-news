import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { formatDistanceToNow } from "date-fns";
import { enGB } from "date-fns/locale";
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDateToNow(dateString) {
  const date = new Date(dateString);
  const formattedRelativeTime = formatDistanceToNow(date, {
    addSuffix: true,
    locale: enGB,
  });
  return formattedRelativeTime;
}

export const formatDate = (date: string): string => {
  return Intl.DateTimeFormat("ru-Ru", {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  }).format(new Date(date));
};

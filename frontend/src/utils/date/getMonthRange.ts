export function getMonthRange(date: Date): { start: string; end: string } {
    const year = date.getFullYear();
    const month = date.getMonth();
  
    const start = new Date(year, month, 1);
    const end = new Date(year, month + 1, 0);
  
    const toDateString = (d: Date) => d.toISOString().split('T')[0];
    return { start: toDateString(start), end: toDateString(end) };
}
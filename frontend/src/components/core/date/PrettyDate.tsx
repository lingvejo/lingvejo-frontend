'use client';

import { useFormatter } from 'next-intl';

export default function PrettyDate({ date }: { date: string }) {
  const format = useFormatter();
  const parsed = new Date(date.replace(/\.\d{3,6}/, '')); // Trim microseconds

  const pretty = format.dateTime(parsed, {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return <span>{pretty}</span>;
}

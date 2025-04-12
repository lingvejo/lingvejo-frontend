'use client';

import { Calendar } from '@mantine/dates';
import { Indicator } from '@mantine/core';
import dayjs from 'dayjs';

type Props = {
  selectedDate: Date;
  onSelectDate: (date: Date) => void;
  onMonthChange: (date: Date) => void;
  entriesMap: Record<string, string>;
};

export default function JournalCalendar({
  selectedDate,
  onSelectDate,
  onMonthChange,
  entriesMap,
}: Props) {
  return (
    <Calendar
      value={selectedDate}
      onChange={onSelectDate}
      getDayProps={(date) => ({
        selected: dayjs(date).isSame(selectedDate, 'date'),
        onClick: () => onSelectDate(date),
      })}
      renderDay={(date) => {
        const dateStr = dayjs(date).format('YYYY-MM-DD');
        const hasEntry = !!entriesMap[dateStr];
        const day = date.getDate();

        return (
          <Indicator
            size={6}
            color="var(--mantine-primary-color-filled)"
            offset={-2}
            disabled={!hasEntry}
          >
            <div>{day}</div>
          </Indicator>
        );
      }}
      onNextMonth={onMonthChange}
      onPreviousMonth={onMonthChange}
      onNextYear={onMonthChange}
      onPreviousYear={onMonthChange}
      onYearSelect={onMonthChange}
      onMonthSelect={onMonthChange}
      minDate={new Date('2020-01-01')}
      maxDate={new Date()}
    />
  );
}

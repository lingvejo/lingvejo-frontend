import { Calendar } from '@mantine/dates';
import { Indicator } from '@mantine/core';

export default function CalendarDemo() {
  return (
    <Calendar
      static
      withCellSpacing
      renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator size={6} color="red" offset={-2} disabled={day !== 16}>
            <div>{day}</div>
          </Indicator>
        );
      }}
    />
  );
}


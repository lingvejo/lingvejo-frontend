import { createTheme, virtualColor } from '@mantine/core';

const theme = createTheme({
    colors: {
      primary: virtualColor({
        name: 'primary',
        dark: 'cyan',
        light: 'pink',
      })
    },
});

export default theme;
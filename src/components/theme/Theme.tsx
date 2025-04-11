import { createTheme } from '@mantine/core';

// Create a space and magic-themed custom theme
const theme = createTheme({
  colorScheme: 'light', // Set default colorScheme to light
  colors: {
    primary: [
      '#5A4B8C', // Light mode color (cosmic purple)
      '#4E3781', // Slightly darker cosmic purple
      '#402C67', // Magical deep purple
      '#351F55', // Darker purple for depth
      '#2A1644', // Deep space purple
      '#5F4B8A', // Slightly muted magical purple
      '#8A65A0', // Light cosmic glow purple
      '#B59EBC', // Starry light pink/purple
      '#D7B4D3', // Very light, starry shimmer pink
      '#FF8E8E',  // Dark magic cosmic glow (bright cyan for dark mode)
    ],
    secondary: [
      '#4E6A84', // Celestial blue
      '#3A4F65', // Deep space blue
      '#3F6F91', // Magical nebula blue
      '#2D4B68', // Midnight blue
      '#1B3D55', // Galaxy blue
      '#9AAECF', // Light starry blue
      '#A7B7DB', // Soft moonlight blue
      '#C1D3E3', // Very light magical moonbeam
    ]
  },
  primaryColor: 'primary', // Assign primary color to the 'primary' key
  primaryShade: { light: 6, dark: 8 }, // Define shades for light and dark modes
});

export default theme;

// Design tokens extracted from Figma
export const designTokens = {
  colors: {
    primary: '#B88E2F', // Main brand color (gold/brown from Figma)
    primaryLight: '#F6E6C7', // Light background variant
    secondary: '#666666', // Text secondary
    text: {
      primary: '#000000', // Primary text
      secondary: '#666666', // Secondary text
      light: '#999999', // Light text
    },
    background: {
      primary: '#FFFFFF', // Main background
      secondary: '#F6F6F6', // Light gray background
      cream: '#F6E6C7', // Cream background from Figma
    },
    status: {
      success: '#22C55E',
      error: '#EF4444',
      warning: '#F59E0B',
    },
    discount: '#E74C3C', // Discount badge color
    new: '#22C55E', // New badge color
  },
  
  typography: {
    fontFamilies: {
      primary: ['Poppins', 'system-ui', 'sans-serif'], // Primary font from Figma
      secondary: ['Montserrat', 'system-ui', 'sans-serif'], // Secondary font from Figma
    },
    fontSizes: {
      xs: '0.75rem',    // 12px
      sm: '0.875rem',   // 14px
      base: '1rem',     // 16px
      lg: '1.125rem',   // 18px
      xl: '1.25rem',    // 20px
      '2xl': '1.5rem',  // 24px
      '3xl': '1.875rem', // 30px
      '4xl': '2.25rem', // 36px
      '5xl': '3rem',    // 48px
      '6xl': '6rem',    // 96px - large hero text from Figma
    },
    fontWeights: {
      normal: 400,
      medium: 500, // Used extensively in Figma
      semibold: 600,
      bold: 700,
      extrabold: 800, // Used for hero text in Figma
    },
    lineHeights: {
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  },
  
  spacing: {
    px: '1px',
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
    24: '6rem',    // 96px
    32: '8rem',    // 128px
  },
  
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    base: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  },
  
  borderRadius: {
    none: '0',
    sm: '0.125rem',  // 2px
    base: '0.25rem', // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    full: '9999px',
  },
  
  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  },
} as const;

export type DesignTokens = typeof designTokens;
'use client';

import React from 'react';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import { AuthProvider } from './context/AuthContext';

// Define theme with only necessary configurations
const theme = extendTheme({
  colors: {
    accent: '#D2ACC7',
    brand: {
      900: '#121212', // dark background
      800: '#1A1A1A', 
      700: '#2A2A2A',
    },
  },
  fonts: {
    heading: 'Montserrat, sans-serif',
    body: 'Montserrat, sans-serif',
    mono: 'Montserrat, monospace',
  },
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
});

export function ChakraProviderWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ChakraProvider theme={theme}>
      <AuthProvider>
        {children}
      </AuthProvider>
    </ChakraProvider>
  );
} 
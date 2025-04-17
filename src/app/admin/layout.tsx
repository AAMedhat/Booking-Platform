'use client';

import React from 'react';
import { Box } from '@chakra-ui/react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      as="main"
      bg="black"
      minH="100vh"
      color="white"
    >
      {children}
    </Box>
  );
} 
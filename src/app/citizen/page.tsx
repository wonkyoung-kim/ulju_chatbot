
'use client';
import React from 'react';
import { Box } from '@mui/material';
import ChatbotHome from '../../views/ChatbotHome';
import {pageKind} from '../../constants/constant';

export default function ChatPage() {
  return (
    <Box p={2}>
      <ChatbotHome
        pageKind={pageKind.citizen} />
    </Box>
  );
}

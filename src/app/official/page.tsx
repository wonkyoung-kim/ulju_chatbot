'use client';
import React from 'react';
import { Box } from '@mui/material';
import ChatbotView from 'views/ChatbotView';
import Header from 'views/Header';
import { pageKind } from '../../constants/constant';

export default function ChatPage() {
    return (
        <Box p={2}>
            <Header pageKind={pageKind.official} />
            <ChatbotView pageKind={pageKind.official} />
        </Box>
    );
}

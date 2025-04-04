'use client';
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import ChatbotView from 'views/ChatbotView';
import Header from 'views/Header';
import Loading from 'views/Loading';
import { pageKind } from '../../constants/constant';

export default function ChatPage() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // 페이지 진입 로딩
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000); // 1초 로딩딩

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <Loading />;
    }

    return (
        <Box p={2}>
            <Header pageKind={pageKind.official} />
            <ChatbotView pageKind={pageKind.official} />
        </Box>
    );
}


'use client';

import React from 'react';
import { Box, Typography } from '@mui/material';
import InfoCard from '../components/cards/InfoCard';

export default function NoticeEducationSchedulePage() {
  const mockData = [
    { title: '공지사항 1', description: '이번 주 방사능 훈련 안내' },
    { title: '교육 모드', description: '시민 재난 대응 교육 안내' },
    { title: '주요일정', description: '5월 재난 안전 훈련 일정' }
  ];

  return (
    <Box p={2}>
      <Typography variant="h6" gutterBottom>공지사항 / 교육 / 일정</Typography>
      {mockData.map((item, i) => (
        <InfoCard key={i} title={item.title} description={item.description} />
      ))}
    </Box>
  );
}

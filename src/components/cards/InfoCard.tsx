
'use client';

import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

interface Props {
  title: string;
  description: string;
}

export default function InfoCard({ title, description }: Props) {
  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">{title}</Typography>
        <Typography variant="body2">{description}</Typography>
      </CardContent>
    </Card>
  );
}

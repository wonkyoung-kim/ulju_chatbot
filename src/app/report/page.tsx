
'use client';

import React, { useRef, useState } from 'react';
import { Box, Button, Stack, TextField, Typography } from '@mui/material';

export default function ReportPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size < 5 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      alert('이미지는 5MB 이하로 업로드 가능합니다.');
    }
  };

  return (
    <Box p={2}>
      <Typography variant="h6">공무원 상황 신고</Typography>
      <Stack spacing={2} mt={2}>
        <TextField label="작성자" inputProps={{ maxLength: 10 }} required />
        <TextField label="제목" inputProps={{ maxLength: 20 }} required />
        <TextField label="내용" multiline rows={5} inputProps={{ maxLength: 500 }} required />
        <Button variant="outlined" onClick={() => fileRef.current?.click()}>
          이미지 업로드
        </Button>
        <input type="file" hidden ref={fileRef} onChange={handleImageChange} />
        {imagePreview && <img src={imagePreview} alt="미리보기" width="200" />}
        <Button variant="contained">신고 전송</Button>
      </Stack>
    </Box>
  );
}

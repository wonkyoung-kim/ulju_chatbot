'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, Paper, TextField, IconButton, Button, Stack } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useChatStore } from '../store/chatStore';
// import { useMutation } from '@tanstack/react-query';
import { v4 as uuidv4 } from 'uuid';
import { dispatch } from 'store';

import { getInitMessage, getAnswerMessage, getSuggestionMessage } from 'data/chat';
import { ChatReq, ChatRes, ChatStateProps, ChatMessage, resultResponses } from 'model/Message';
import { initMessageQuery } from 'constants/constant';
import { setUljusafeSessionId, getUljusafeSessionId, addSearchText, getSearchTextList } from 'common/local-storage';
interface PageKindProps {
    pageKind: string | undefined;
}

type Button = {
  title: string;
  uri: string;
  type: string; // 필수
};

export default function ChatbotHome({ pageKind }: PageKindProps) {
    const inputRef = useRef<HTMLInputElement>();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, addMessage } = useChatStore();
    const isInitialized = useRef(false);
    const [latitude, setLatitude] = useState(0); // 위도
    const [longitude, setLongitude] = useState(0); // 경도
    const [param, setParam] = useState(''); // 답변으로 넘어온 param값값

    const isLocal = typeof window !== 'undefined' && window.location.hostname === 'localhost';
    const imgAddUrl = isLocal ? 'https://uljusafe.uljudata.or.kr' : '';
    if (isLocal) {
        console.log('################ 로컬환경 ################');
    }

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };
    useEffect(() => {
        // 메시지 추가 시 스크롤 아래로 이동
        scrollToBottom();
    }, [messages]);

    // ##############################################################################################
    // ##############################################################################################
    // ### 응답 메시지 세팅
    // ##############################################################################################
    const setResponseMessages = (result: resultResponses) => {
        // 심플 응답 메시지
        const simpleResponses = result?.simpleResponses?.simpleResponses ?? [];
        simpleResponses.forEach((response) => {
            if (response.textToSpeech) {
                addMessage({
                    id: uuidv4(),
                    type: 'text',
                    content: response.textToSpeech,
                    sender: 'bot',
                    timestamp: new Date().toISOString(),
                });
            }
        });
        // 기본 응답 메시지
        const cards = result?.basicCard ?? [];
        cards.forEach((card) => {
            const validButtons: Button[] = (card.buttons ?? [])
                .filter((b) => b.title && b.openUriAction?.uri && !b.openUriAction.uri.startsWith('null'))
                .map((b) => ({
                    title: b.title!,
                    uri: b.openUriAction!.uri!,
                    type: 'web_url',
                }));
            addMessage({
                id: uuidv4(),
                type: 'card',
                title: card.title,
                subtitle: card.subtitle,
                image: card.image?.imageUri,
                imageAlt: card.image?.accessibilityText,
                content: card.formattedText,
                buttons: validButtons.length > 0 ? validButtons : undefined,
                sender: 'bot',
                timestamp: new Date().toISOString(),
            });
        });
        // 제안 키워드
        const suggestions = result?.suggestions?.suggestions?.map((s) => s.title) || [];
        if (suggestions.length > 0) {
            addMessage({
                id: uuidv4(),
                type: 'button',
                button: suggestions,
                sender: 'bot',
                timestamp: new Date().toISOString(),
            });
        }
        console.log('########## param ############### >> ', result?.param);
        setParam(result?.param ?? '');
    };
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 세션 ID 생성
    // ##############################################################################################
    const createSessionId = () => {
        setUljusafeSessionId(uuidv4() || '');
    };
    useEffect(() => {
        createSessionId();
    }, []);
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 위치 수집
    // ##############################################################################################
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            console.log('User location:', pos.coords);
            console.log('lat:', pos.coords.latitude);
            console.log('lon:', pos.coords.longitude);
            setLatitude(pos.coords.latitude); // 위도
            setLongitude(pos.coords.longitude); // 경도
        });
    };
    useEffect(() => {
        let isSubscribed = true;
        if (isSubscribed) {
            getUserLocation();
        }
        return () => {
            isSubscribed = false;
        };
    }, []);
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 흔들기 감지 (iOS 권한 필요)
    // ##############################################################################################
    useEffect(() => {
        const handleShake = (event: DeviceMotionEvent) => {
            if (event.acceleration && event.acceleration.x && Math.abs(event.acceleration.x) > 10) {
                console.log('Shake detected!');
                // 흔들기 감지 시 처리할 로직 추가예정!!!
            }
        };
        window.addEventListener('devicemotion', handleShake);
        return () => window.removeEventListener('devicemotion', handleShake);
    }, []);
    /*
  // 흔들기 감지 예시(아래의 코드를 콘솔에 입력하면 흔들기 감지 이벤트 발생) - 테스트용
    window.dispatchEvent(new DeviceMotionEvent('devicemotion', {
      acceleration: { x: 15, y: 15, z: 15 },
      accelerationIncludingGravity: { x: 15, y: 15, z: 15 },
      rotationRate: { alpha: 0, beta: 0, gamma: 0 },
      interval: 16
    }));
  */
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 전송버튼 이벤트
    // ##############################################################################################
    const handleSend = () => {
        const value = inputRef.current?.value || '';
        if (!value.trim()) return;
        const userMsg: ChatMessage = {
            id: uuidv4(),
            type: 'text',
            content: value,
            sender: 'user',
            timestamp: new Date().toISOString(),
        };
        addMessage(userMsg);
        //mutation.mutate(value);
        answerMessage(value);
        if (inputRef.current) inputRef.current.value = '';
    };
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 페이지 진입 시 초기 메시지
    // ##############################################################################################
    const initMessage = async () => {
        try {
            const initMessageReq: ChatReq = {
                text: initMessageQuery,
                sessionId: null,
                lat: null,
                lon: null,
                param: null,
            };
            const response = (await dispatch(getInitMessage(initMessageReq, pageKind))) as ChatRes | null;
            if (response) {
                setResponseMessages(response.data?.result);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to fetch getInitMessage:', error);
            }
        }
    };
    useEffect(() => {
        if (!isInitialized.current) {
            isInitialized.current = true;
            initMessage();
        }
    }, []);
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 질의의 메시지
    // ##############################################################################################
    const answerMessage = async (queryText: string) => {
        try {
            getUserLocation(); // 위치 수집
            addSearchText(queryText); // 검색어 저장
            const sessionId = getUljusafeSessionId();
            const answerMessageReq: ChatReq = {
                text: queryText,
                sessionId: sessionId,
                lat: latitude,
                lon: longitude,
                param: param,
            };
            console.log('### answerMessage.request >>>> ', answerMessageReq);
            const response = (await dispatch(getAnswerMessage(answerMessageReq, pageKind))) as ChatRes | null;
            if (response) {
                console.log('### answerMessage.response >>>> ', response);
                setResponseMessages(response.data?.result);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to fetch answerMessage:', error);
            }
        }
    };
    // ##############################################################################################
    // ##############################################################################################

    // ##############################################################################################
    // ##############################################################################################
    // ### 제안 메시지
    // ##############################################################################################
    const suggestionMessage = async (queryText: string) => {
        try {
            getUserLocation(); // 위치 수집
            addSearchText(queryText); // 검색어 저장
            const sessionId = getUljusafeSessionId();
            const answerMessageReq: ChatReq = {
                text: queryText,
                sessionId: sessionId,
                lat: latitude,
                lon: longitude,
                param: param,
            };
            console.log('### suggestionMessage.request >>>> ', answerMessageReq);
            const response = (await dispatch(getSuggestionMessage(answerMessageReq, pageKind))) as ChatRes | null;
            if (response) {
                console.log('### suggestionMessage.response >>>> ', response);
                setResponseMessages(response.data?.result);
            }
        } catch (error) {
            if (process.env.NODE_ENV !== 'production') {
                console.error('Failed to fetch answerMessage:', error);
            }
        }
    };
    // ##############################################################################################
    // ##############################################################################################

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                울주군청 방사능 방재 챗봇
            </Typography>

            <Paper sx={{ height: '60vh', overflowY: 'auto', p: 2, mb: 2 }}>
                {messages.map((msg) => (
                    <Box key={msg.id} textAlign={msg.sender === 'user' ? 'right' : 'left'} mb={1}>
                        {/* 심플 응답 메시지 */}
                        {msg.type === 'text' && (
                            <Paper
                                elevation={1}
                                sx={{
                                    display: 'inline-block',
                                    maxWidth: '80%',
                                    px: 2,
                                    py: 1,
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: 2,
                                }}
                            >
                                <Typography variant="body2" whiteSpace="pre-line">
                                    {msg.content}
                                </Typography>
                            </Paper>
                        )}

                        {/* 기본 응답 메시지 */}
                        {msg.type === 'card' && msg.title && msg.content && (
                            <Paper
                                elevation={1}
                                sx={{
                                    px: 2,
                                    py: 1.5,
                                    backgroundColor: '#f1f1f1',
                                    borderRadius: 2,
                                    maxWidth: '90%',
                                    mt: 1,
                                }}
                            >
                                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                                    {msg.title}
                                </Typography>
                                {msg.subtitle && (
                                    <Typography variant="body2" fontSize="0.875rem" color="text.secondary" gutterBottom>
                                        {msg.subtitle}
                                    </Typography>
                                )}
                                {msg.image && (
                                    <img
                                        src={`${imgAddUrl}${msg.image}`}
                                        alt="message image"
                                        style={{ maxWidth: '30%', width: 'fit-content', height: 'auto', display: 'block', marginTop: '8px' }}
                                    />
                                )}
                                <Typography variant="body2" whiteSpace="pre-line">
                                    {msg.content}
                                </Typography>
                                {/* 버튼이 있을 경우 */}
                                {msg.buttons && msg.buttons.length > 0 && (
                                    <Box mt={1} display="flex" flexWrap="wrap" gap={1}>
                                        {msg.buttons.map((btn, i) => (
                                            <Button
                                                key={i}
                                                variant="outlined"
                                                size="small"
                                                href={btn.uri}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                sx={{ textTransform: 'none' }}
                                            >
                                                {btn.title || '열기'}
                                            </Button>
                                        ))}
                                    </Box>
                                )}
                            </Paper>
                        )}

                        {/* 제안 키워드 */}
                        {msg.type === 'button' && (
                            <Box
                                sx={{
                                    mt: 1,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '8px',
                                    width: 'fit-content',
                                    p: 1.5,
                                    backgroundColor: '#f9f9f9',
                                    borderRadius: 2,
                                    boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                                }}
                            >
                                {msg.button?.map((btn, i) => (
                                    <Box
                                        key={i}
                                        onClick={() => {
                                            const userMsg: ChatMessage = {
                                                id: uuidv4(),
                                                type: 'text',
                                                content: btn,
                                                sender: 'user',
                                                timestamp: new Date().toISOString(),
                                            };
                                            addMessage(userMsg);
                                            suggestionMessage(btn);
                                        }}
                                        sx={{
                                            px: 1.5,
                                            py: 0.5,
                                            cursor: 'pointer',
                                            fontSize: '0.875rem',
                                            whiteSpace: 'nowrap',
                                            userSelect: 'none',
                                            width: 'fit-content',
                                            borderRadius: 1,
                                            '&:hover': {
                                                backgroundColor: '#f1f1f1',
                                            },
                                        }}
                                    >
                                        {btn}
                                    </Box>
                                ))}
                            </Box>
                        )}
                    </Box>
                ))}
                <div ref={messagesEndRef} />
            </Paper>

            <Stack direction="row" spacing={1}>
                <TextField fullWidth inputRef={inputRef} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="메시지를 입력하세요" />
                <IconButton onClick={handleSend}>
                    <SendIcon />
                </IconButton>
            </Stack>
        </Box>
    );
}

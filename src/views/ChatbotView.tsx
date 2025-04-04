import React, { useEffect, useRef, useState } from 'react';
import '../styles/chatbot.css';
import NoticePopup from 'components/popup/notice-popup';
import SideMenu from './SideMenu';
import { Box, Typography, Paper, TextField, IconButton, Button, Stack } from '@mui/material';
import { useChatStore } from '../store/chatStore';
import { v4 as uuidv4 } from 'uuid';
import { dispatch } from 'store';

import { getInitMessage, getAnswerMessage, getSuggestionMessage } from 'data/chat';
import { ChatReq, ChatRes, ChatStateProps, ChatMessage, resultResponses } from 'model/Message';
import { initMessageQuery } from 'constants/constant';
import { setUljusafeSessionId, getUljusafeSessionId, addSearchText, getSearchTextList } from 'common/local-storage';
interface PageKindProps {
    pageKind: string | undefined;
}

export default function ChatbotView({ pageKind }: PageKindProps) {
    const [isNoticePopupOpen, setIsNoticePopupOpen] = useState(false);
    const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(true);
    const [isTextScaledUp, setIsTextScaledUp] = useState(false);

    const inputRef = useRef<HTMLInputElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { messages, addMessage } = useChatStore();
    const isInitialized = useRef(false);
    const [latitude, setLatitude] = useState(0); // 위도
    const [longitude, setLongitude] = useState(0); // 경도

    // 화면 크기 변경 감지 (1000px 미만일 때만 버튼 보이게)
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
        };
        if (typeof window !== 'undefined') {
            setIsMobile(window.innerWidth < 1000);
            window.addEventListener('resize', handleResize);
        }
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // 사이드 메뉴 닫기
    const closeSideMenu = () => {
        setIsSideMenuOpen(false);
    };

    // marquee
    const marqueeRef = useRef<HTMLInputElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const [duration, setDuration] = useState(30);

    useEffect(() => {
        const updateAnimationDuration = () => {
            if (marqueeRef.current && containerRef.current) {
                const textWidth = marqueeRef.current.offsetWidth;
                const containerWidth = containerRef.current.offsetWidth;
                const speed = 100;
                const newDuration = (textWidth + containerWidth) / speed;
                setDuration(newDuration);
            }
        };

        // updateAnimationDuration();
        // window.addEventListener('resize', updateAnimationDuration);

        // return () => window.removeEventListener('resize', updateAnimationDuration);
        window.addEventListener('resize', updateAnimationDuration);
        return () => {
            window.removeEventListener('resize', updateAnimationDuration);
        };
    }, []);

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
            const validButtons = (card.buttons ?? [])
                .filter((b) => b.title && b.openUriAction?.uri && !b.openUriAction.uri.startsWith('null'))
                .map((b) => ({
                    title: b.title!,
                    uri: b.openUriAction!.uri!,
                }));
            addMessage({
                id: uuidv4(),
                type: 'card',
                title: card.title,
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
                console.log('@@@@@@@@@@@@ >>>> ', response);
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
                param: null,
            };
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
                param: null,
            };
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
        <>
            {isMobile ? (
                <SideMenu
                    isOpen={isSideMenuOpen}
                    onClose={closeSideMenu}
                    onTextScaleChange={setIsTextScaledUp} // 글씨 크기 변경 함수 전달
                />
            ) : (
                <SideMenu isOpen={true} onClose={closeSideMenu} onTextScaleChange={setIsTextScaledUp} />
            )}

            <main className="chatbot-container">
                <div className="chatbot-content">
                    {/* 공지 */}
                    <div className="notice">
                        <div className="marquee-text" ref={containerRef}>
                            <p ref={marqueeRef} style={{ animationDuration: `${duration}s` }}>
                                [알림] 휴대폰을 흔들거나 우상단 아이콘을 더블클릭하면 현재 위치에 해당되는 재난 정보를 확인 하실 수 있습니다.
                            </p>
                        </div>
                        <button className="btn-noti" onClick={() => setIsNoticePopupOpen(true)}>
                            <span className="blind">공지사항 열기</span>
                        </button>
                    </div>
                    {/* 톡톡 */}
                    <button className="toktok">
                        <span className="blind">톡톡아이콘</span>
                    </button>
                    {/* 챗봇 윈도우 */}
                    <div className={`chatbot-window${isTextScaledUp ? ' text-scaled-up' : ''}`}>
                        {messages.map((msg) => (
                            <>
                                {msg.sender === 'user' && (
                                    <div className="user-message">
                                        {/* 심플 응답 메시지 */}
                                        {msg.type === 'text' && (
                                            <div>
                                                <div className="msg">{msg.content}</div>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {msg.sender === 'bot' && (
                                    <div className="bot-message">
                                        {/* 심플 응답 메시지 */}
                                        {msg.type === 'text' && (
                                            <div>
                                                <span className="name">안전 네비게이션</span>
                                                <div className="msg">{msg.content}</div>
                                            </div>
                                        )}
                                        {/* 기본 응답 메시지 */}
                                        {msg.type === 'card' && msg.title && msg.content && (
                                            <div className="msg md">
                                                <div>
                                                    <h4 className="title"> {msg.title}</h4>
                                                    <h6 className="subtitle">서브타이틀</h6>
                                                    <ul>
                                                        {msg.content.split('\n').map((line, index) => (
                                                            <li>{line}</li>
                                                        ))}
                                                    </ul>
                                                    {/* 버튼이 있을 경우 */}
                                                    {msg.buttons && msg.buttons.length > 0 && (
                                                        <div className="md">
                                                            {msg.buttons.map((btn, i) => (
                                                                <button
                                                                    className="btn-default"
                                                                    key={i}
                                                                    onClick={() => {
                                                                        btn.uri;
                                                                    }}
                                                                    // target="_blank"
                                                                    rel="noopener noreferrer"
                                                                >
                                                                    {btn.title}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                        {/* 제안 키워드 */}
                                        {msg.type === 'button' && (
                                            <div className="msg sm">
                                                <ul className="btn-list">
                                                    {msg.button?.map((btn, i) => (
                                                        <li
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
                                                        >
                                                            <button>{btn}</button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* 최근 질의 */}
                    <div className="recent-search">
                        <ul className="list">
                            <li>울산대병원 전화번호</li>
                            <li>울산대병원 전화번호</li>
                            <li>울산대병원 전화번호</li>
                        </ul>
                    </div>
                    {/* 인풋창 */}
                    <div className="chatbot-input">
                        {/* 1000px 미만일 때만 "메뉴 열기" 버튼 보이게 */}
                        {isMobile && (
                            <button className={`btn-mo-menu ${isSideMenuOpen ? 'open' : ''}`} onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}>
                                {isSideMenuOpen ? '메뉴 닫기' : '메뉴 열기'}
                            </button>
                        )}
                        <input type="text" ref={inputRef} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="내용을 입력해주세요." />
                        <button className="btn-send" onClick={handleSend}>
                            <span className="blind">보내기</span>
                        </button>
                    </div>
                </div>
            </main>

            {/* 공지사항 팝업 */}
            <NoticePopup isOpen={isNoticePopupOpen} onClose={() => setIsNoticePopupOpen(false)} />
        </>
    );
}

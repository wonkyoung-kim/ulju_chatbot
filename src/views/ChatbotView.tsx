import React, { useEffect, useRef, useState } from 'react';
import "../styles/chatbot.css";
import NoticePopup from "components/popup/notice-popup";
import SideMenu from "./SideMenu";

interface PageKindProps {
  pageKind: string | undefined;
}

export default function  ChatbotView ({ pageKind }: PageKindProps) {
  const [isNoticePopupOpen, setIsNoticePopupOpen] = useState(false);
  const [isSideMenuOpen, setIsSideMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);
  const [isTextScaledUp, setIsTextScaledUp] = useState(false);

  // 화면 크기 변경 감지 (1000px 미만일 때만 버튼 보이게)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
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

    updateAnimationDuration();
    window.addEventListener("resize", updateAnimationDuration);

    return () => window.removeEventListener("resize", updateAnimationDuration);
  }, []);

  return (
    <>
      {isMobile ? (
        <SideMenu
          isOpen={isSideMenuOpen}
          onClose={closeSideMenu}
          onTextScaleChange={setIsTextScaledUp} // 글씨 크기 변경 함수 전달
        />
      ) : (
        <SideMenu isOpen={true}  onClose={closeSideMenu} onTextScaleChange={setIsTextScaledUp} />
      )}
      <main className="chatbot-container">
        <div className="chatbot-content">
          {/* 공지 */}
          <div className="notice">
            <div className="marquee-text" ref={containerRef}>
              <p ref={marqueeRef} style={{ animationDuration: `${duration}s` }}>
                [알림] 휴대폰을 흔들거나 우상단 아이콘을 더블클릭하면 현재 위치에 해당되는 재난
                정보를 확인 하실 수 있습니다.
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
          <div className={`chatbot-window${isTextScaledUp ? " text-scaled-up" : ""}`}>
            <div className="bot-message">
              <span className="name">안전 네비게이션</span>
              <div className="msg">
                인근 원전 사고로 방사선비상이 발령되었습니다. 원전 주변지역 주민께서는
                주민행동요령에 따라 필요한 조치를 취한 후 신속히 구호소로 대피하시기 바랍니다.
              </div>
              <div className="msg md">
                <h4 className="title">타이틀</h4>
                <h6 className="subtitle">서브타이틀</h6>
                <div className="img">
                  <img src={"/assets/images/temp.jpg"} alt="강아지"  />
                </div>
                <ul className="num-list">
                  <li>
                    구호소 위치확인 : 채팅 창에 [읍/면 리 구호소](예: 서생면 신암리 구호소) 입력
                  </li>
                  <li>단계별 주민 행동 요령 : 채팅 창에 [주민 행동 요령] 입력</li>
                  <li>
                    구호소 지정 이동 경로 확인 : 채팅 창에 [읍/면 리 구호소 이동](예: 서생면 신암리
                    구호소 이동)
                  </li>
                  <li>
                    방사선 비상 관련 주요 기관 및 병원 전화번호 : 채팅 창에 [기관명 전화번호](예:
                    울산대 병원 전화번호)
                  </li>
                </ul>
                <ul className="dot-list">
                  <li>
                    구호소 위치확인 : 채팅 창에 [읍/면 리 구호소](예: 서생면 신암리 구호소) 입력
                  </li>
                  <li>단계별 주민 행동 요령 : 채팅 창에 [주민 행동 요령] 입력</li>
                  <li>
                    구호소 지정 이동 경로 확인 : 채팅 창에 [읍/면 리 구호소 이동](예: 서생면 신암리
                    구호소 이동)
                  </li>
                  <li>
                    방사선 비상 관련 주요 기관 및 병원 전화번호 : 채팅 창에 [기관명 전화번호](예:
                    울산대 병원 전화번호)
                  </li>
                </ul>
              </div>
              <div className="msg sm">
                <ul className="btn-list">
                  <li>
                    <button>원전까지 거리 확인</button>
                  </li>
                </ul>
              </div>
              <div className="msg md">
                <button className="btn-default">버튼 텍스트</button>
              </div>
              <div className="msg">
                <div className="loading">
                  <div className="dot"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div>
              </div>
            </div>
            <div className="user-message">
              <div className="msg">
                sdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹsdfsdfㅇㅇㄹ
              </div>
            </div>
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
              <button
                className={`btn-mo-menu ${isSideMenuOpen ? "open" : ""}`}
                onClick={() => setIsSideMenuOpen(!isSideMenuOpen)}
              >
                {isSideMenuOpen ? "메뉴 닫기" : "메뉴 열기"}
              </button>
            )}
            <input type="text" placeholder="내용을 입력해주세요." />
            <button className="btn-send">
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
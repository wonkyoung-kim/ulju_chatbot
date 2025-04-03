import React from "react";
import { useState, useEffect } from "react";

import EducationPopup from "components/popup/education-popup";
import SchedulePopup from "components/popup/schedule-popup";
import SummaryDownloadPopup from "components/popup/summary-download-popup";
import CalamityDownloadPopup from "components/popup/calamity-download-popup";

import "../styles/sidemenu.css";

const SideMenu = ({ isOpen, onClose, onTextScaleChange }) => {
  const [isEducationPopupOpen, setIsEducationPopupOpen] = useState(false);
  const [isSchedulePopupOpen, setIsSchedulePopupOpen] = useState(false);
  const [isSummaryDownloadPopupOpen, setIsSummaryDownloadPopupOpen] = useState(false);
  const [isCalamityDownloadPopupOpen, setIsCalamityDownloadPopupOpen] = useState(false);
  // const [isTextScaleUp, setIsTextScaleUp] = useState(false);
  const [isVisible, setIsVisible] = useState(window.innerWidth >= 1000);

  const [isTextScaledUp, setIsTextScaledUp] = useState(false);

  const toggleTextScale = () => {
    const newState = !isTextScaledUp;
    setIsTextScaledUp(newState);
    console.log("토글 버튼 클릭됨, 새로운 상태:", newState); // ✅ 상태 변경 확인
    if (typeof onTextScaleChange === "function") {
      onTextScaleChange(newState);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsVisible(window.innerWidth >= 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1000) {
      setIsVisible(isOpen);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <>
      <nav className="side-menu">
        <h2>메뉴</h2>
        <ul>
          <li className="menu1">
            <button>구호소 길안내</button>
          </li>
          <li className="menu2">
            <button>지정 구호소 확인</button>
          </li>
          <li className="menu3">
            <button
              onClick={() => {
                window.open("https://www.safemap.go.kr/main/smap.do");
              }}
            >
              생활 안전지도
            </button>
          </li>
          <li className="menu4">
            <button onClick={() => setIsEducationPopupOpen(true)}>교육모드</button>
          </li>
          <li className="menu5">
            <button onClick={() => setIsSchedulePopupOpen(true)}>주요일정</button>
          </li>
          <li className="menu6">
            <button onClick={() => setIsSummaryDownloadPopupOpen(true)}>요약본 다운로드</button>
          </li>
          <li className="menu7">
            <button onClick={() => setIsCalamityDownloadPopupOpen(true)}>사회재난 피해신고</button>
          </li>
          <li className="menu8">
            <button>이재민 사전등록</button>
          </li>
          <li className="menu9">
            <button onClick={toggleTextScale}>
              {isTextScaledUp ? "글씨크기 축소" : "글씨크기 확대"}
            </button>
            {/* 글씨크기 확대 누르면 폰트크기 업(20px => 27px, 16px => 22px) */}
          </li>
        </ul>
      </nav>
      {/* 교육모드 팝업 */}
      <EducationPopup
        isOpen={isEducationPopupOpen}
        onClose={() => setIsEducationPopupOpen(false)}
      />
      {/* 주요일정 팝업 */}
      <SchedulePopup isOpen={isSchedulePopupOpen} onClose={() => setIsSchedulePopupOpen(false)} />
      {/* 요약본 다운로드 팝업 */}
      <SummaryDownloadPopup
        isOpen={isSummaryDownloadPopupOpen}
        onClose={() => setIsSummaryDownloadPopupOpen(false)}
      />
      {/* 사회재난 피해신고 팝업 */}
      <CalamityDownloadPopup
        isOpen={isCalamityDownloadPopupOpen}
        onClose={() => setIsCalamityDownloadPopupOpen(false)}
      />
    </>
  );
};

export default SideMenu;

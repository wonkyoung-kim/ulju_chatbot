import React from "react";
import { useState } from "react";
import "../../styles/popup.css";

import EmergencyActionPopup from "./emergency-action-popup";
import WebtoonPopup from "./webtoon-popup";

const EducationPopup = ({ isOpen, onClose }) => {
  const [isEmergencyActionPopupOpen, setIsEmergencyActionPopupOpen] = useState(false);
  const [isWebtoonPopupOpen, setIsWebtoonPopupOpen] = useState(false);

  if (!isOpen) return null;

  return (
    <>
      <div className="popup-container">
        <div className="popup">
          <div className="popup-header">
            <h2 className="title">
              <span className="icon">
                <img src={"/assets/images/menu/menu_education.png"} alt="교육모드아이콘" />
              </span>
              교육모드
            </h2>
            <button className="btn-close" onClick={onClose}>
              <span className="blind">팝업닫기</span>
            </button>
          </div>
          <div className="popup-contents">
            <ul className="education-list">
              <li>
                <a
                  href="https://www.youtube.com/watch?v=IobcJrpex9g"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                  </span>
                  갑상샘방호약품이란?
                </a>
              </li>
              <li>
                <button onClick={() => setIsWebtoonPopupOpen(true)}>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_webtoon_icon.png"} alt="웹툰으로 이동하기" />
                  </span>
                  방사선비상이란?
                </button>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_webtoon_icon.png"} alt="웹툰으로 이동하기" />
                  </span>
                  방사선비상계획구역이란?
                </button>
              </li>
              <li>
                <a
                  href="https://www.youtube.com/watch?v=81SDlkmMpaU"
                  target="_blank"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                  </span>
                  방사선비상시(구호소지정)
                </a>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_webtoon_icon.png"} alt="웹툰으로 이동하기" />
                  </span>
                  방사선비상시(실내대피통보)
                </button>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_webtoon_icon.png"} alt="웹툰으로 이동하기" />
                  </span>
                  방사선비상시(안전지역대피)
                </button>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_chat_icon.png"} alt="챗봇으로 이동하기" />
                  </span>
                  주민행동요령
                </button>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_file_down_icon.png"} alt="파일 다운로드하기" />
                  </span>
                  방사능재난용어
                </button>
              </li>
              <li>
                <a href="https://www.youtube.com/watch?v=JVpbYynFWKw&t=7s">
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                  </span>
                  방호장구착용방법
                </a>
              </li>
              <li>
                <button>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_webtoon_icon.png"} alt="웹툰으로 이동하기" />
                  </span>
                  방사선비상행동요령 동화책
                </button>
              </li>
              <li>
                <button onClick={() => setIsEmergencyActionPopupOpen(true)}>
                  <span className="icon">
                    <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                  </span>
                  방사선비상행동요령
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* 방사선비상행동요령 팝업 */}
      <EmergencyActionPopup
        isOpen={isEmergencyActionPopupOpen}
        onClose={() => setIsEmergencyActionPopupOpen(false)}
      />

      {/* 웹툰 샘플 팝업 */}
      <WebtoonPopup isOpen={isWebtoonPopupOpen} onClose={() => setIsWebtoonPopupOpen(false)} />
    </>
  );
};

export default EducationPopup;

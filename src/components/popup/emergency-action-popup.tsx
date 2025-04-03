import React from "react";
import "../../styles/popup.css";

const EmergencyActionPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h2 className="title">
            <span className="icon">
              <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브 아이콘" />
            </span>
            방사선비상행동요령
          </h2>
          <button className="btn-close" onClick={onClose}>
            <span className="blind">팝업닫기</span>
          </button>
        </div>
        <div className="popup-contents">
          <ul className="education-list">
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_1.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                1.재난발생초기전화금지
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_2.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                2.방사선비상에 따른 용어 설명
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_3.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                3.방사선비상행동요령
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_4.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                4.대피시이동수단
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_5.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                5.실내대피요령
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_6.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                6.갑상샘방호약품 복용 및 주의사항
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_7.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                7.방호장구보다는대피가먼저
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_8.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                8.구호소 대피요령
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_9.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                9.지정대피로 이용 이유
              </a>
            </li>
            <li>
              <a
                href="https://devpdn.thubiot.com/uploads/chatbot/video/Radiation_Emergency_Action_Tips_10.mp4"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="icon">
                  <img src={"/assets/images/menu/education/education_youtube_icon.png"} alt="유튜브로 이동하기" />
                </span>
                10.울주군에는 챗봇이 있어요
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EmergencyActionPopup;

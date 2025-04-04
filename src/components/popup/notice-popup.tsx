import React from "react";
import "../../styles/popup.css";

const NoticePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup notice-popup">
        <div className="popup-header">
          <h2 className="title">
            <span className="icon">
              <img src={"/assets/images/notice_speaker.png"} alt="공지사항아이콘" />
            </span>
            공지사항
          </h2>
          <button className="btn-close" onClick={onClose}>
            <span className="blind">팝업닫기</span>
          </button>
        </div>
        <div className="popup-contents">
          <ul className="notice-list">
            <li>[알림] 방사능 재난 대응을 위한 주민용 안전 내비게이션입니다.</li>
            <li>
              휴대폰을 흔들거나 우상단 아이콘을 더블클릭하면 현재 위치에 해당되는 재난 정보를 확인
              하실 수 있습니다.
            </li>
          </ul>
        </div>
        <div className="popup-footer"></div>
      </div>
    </div>
  );
};

export default NoticePopup;

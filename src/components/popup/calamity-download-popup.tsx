import React from "react";
import "../../styles/popup.css";

const CalamityDownloadPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup dialog">
        <div className="popup-contents">사회재난 피해신고서를 다운로드 하시겠습니까?</div>
        <div className="popup-footer">
          <div className="btn-group">
            <button className="btn gray" onClick={onClose}>
              아니오
            </button>
            <button className="btn blue">예</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalamityDownloadPopup;

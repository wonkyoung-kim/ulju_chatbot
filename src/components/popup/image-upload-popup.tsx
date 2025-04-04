import React from "react";
import { useState } from "react";
import ReportPopup from "./report-popup";

import "../../styles/popup.css";

const ImageUploadPopup = ({ isOpen, onClose }) => {
  const [isReportPopupOpen, setIsReportPopupOpen] = useState(false);

  const handleConfirmClick = () => {
    onClose();
    setTimeout(() => {
      setIsReportPopupOpen(true);
    }, 100);
  };

  if (!isOpen && !isReportPopupOpen) return null;

  return (
    <>
      <div className="popup-container">
        <div className="popup dialog">
          <div className="popup-contents">
            이미지 파일만 업로드 가능하며, 이미지 최대 업로드 크기는 5MB입니다.
          </div>
          <div className="popup-footer">
            <div className="btn-group">
              <button className="btn blue" onClick={handleConfirmClick}>
                확인
              </button>
            </div>
          </div>
        </div>
      </div>
      {isReportPopupOpen && (
        <ReportPopup isOpen={isReportPopupOpen} onClose={() => setIsReportPopupOpen(false)} />
      )}
    </>
  );
};

export default ImageUploadPopup;

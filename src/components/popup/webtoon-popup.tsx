import React from "react";
import "../../styles/popup.css";

// import temp_webtoon from "/assets/images/webtoon_temp.png";

const WebtoonPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="webtoon-container">
      <div className="webtoon-header">
        <button className="btn-close" onClick={onClose}>
          <span className="blind">웹툰 닫기버튼</span>
        </button>
      </div>
      <div className="webtoon-view">
        <div className="img">
          <img src={"/assets/images/webtoon_temp.png"} alt="샘플 웹툰" />
        </div>
      </div>
    </div>
  );
};

export default WebtoonPopup;

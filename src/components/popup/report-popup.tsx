import React from "react";
import "../../styles/popup.css";


// Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import iconReport from "/assets/images/official_report_black.png";

const ReportPopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h2 className="title">
            <span className="icon">
              <img src={"/assets/images/temp.jpg"} alt="상황신고 아이콘" />
            </span>
            상황 신고
          </h2>
          <button className="btn-close" onClick={onClose}>
            <span className="blind">팝업닫기</span>
          </button>
        </div>
        <div className="popup-contents report-contents">
          <div className="report-swiper-container">
            <Swiper
              modules={[Pagination, Autoplay]}
              pagination={true}
              spaceBetween={16}
              slidesPerView={1}
              loop={true}
              centeredSlides={true}
              className="report-swiper"
            >
              <SwiperSlide>
                {/* <button className="btn-add">
                  <span className="blind">상황 신고 추가하기 버튼</span>
                </button> */}
                <div className="img-container">
                  <div className="img">
                    <img src={"/assets/images/temp.jpg"} alt="강아지" />
                  </div>
                  <button className="btn-delete">
                    <span className="blind">이미지취소 아이콘</span>
                  </button>
                </div>
              </SwiperSlide>
              <SwiperSlide>
                <button className="btn-add">
                  <span className="blind">상황 신고 추가하기 버튼</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="btn-add">
                  <span className="blind">상황 신고 추가하기 버튼</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="btn-add">
                  <span className="blind">상황 신고 추가하기 버튼</span>
                </button>
              </SwiperSlide>
              <SwiperSlide>
                <button className="btn-add">
                  <span className="blind">상황 신고 추가하기 버튼</span>
                </button>
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="form-card">
            <form action="">
              <div className="input-text">
                <span className="input-label require">작성자</span>
                <input type="text" name="name" id="name" />
              </div>
              <div className="input-text">
                <span className="input-label require">제목</span>
                <input type="text" name="title" id="title" />
              </div>
              <div className="input-text">
                <span className="input-label require">내용</span>
                <textarea name="description" id="description" rows={7}></textarea>
              </div>
            </form>
          </div>
          <div className="btn-group">
            <button className="btn gray" onClick={onClose}>
              닫기
            </button>
            <button className="btn blue">저장</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPopup;

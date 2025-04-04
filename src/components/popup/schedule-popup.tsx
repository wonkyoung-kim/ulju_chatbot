import React from "react";
import "../../styles/popup.css";
//import iconSchedule from "/assets/images/menu/menu_schedule.png";

const SchedulePopup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <h2 className="title">
            <span className="icon">
              <img src={"/assets/images/menu/menu_schedule.png"} alt="주요일정아이콘" />
            </span>
            주요일정
          </h2>
          <button className="btn-close" onClick={onClose}>
            <span className="blind">팝업닫기</span>
          </button>
        </div>
        <div className="popup-contents schedule-contents">
          <ul className="schedule-list">
            <li>
              <div className="schedule-card">
                <h4>2025년 GAP 단체인증 내부심사제 운영 알림</h4>
                <table>
                  <tbody>
                    <tr>
                      <th>작성자</th>
                      <td>[농업정책과] 홍반석 (052-204-1522)</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>2024-03-14 00:00:00</td>
                    </tr>
                    <tr>
                      <th>장소</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>주관</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>기간</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>내용</th>
                      <td>
                        <p className="scroll-box">내용</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="schedule-card">
                <h4>2025년 GAP 단체인증 내부심사제 운영 알림</h4>
                <table>
                  <tbody>
                    <tr>
                      <th>작성자</th>
                      <td>[농업정책과] 홍반석 (052-204-1522)</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>2024-03-14 00:00:00</td>
                    </tr>
                    <tr>
                      <th>장소</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>주관</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>기간</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>내용</th>
                      <td>
                        <p className="scroll-box">
                          국립농산물품질관리원에서 농수산물품질관리법에 근거하여 GAP 인증 농가의
                          <br />
                          인증기준 실천 역량 강화와 GAP 농산물의 위생 관리 및 품질 향상 도모를 위해
                          <br />
                          어쩌구 저쩌구
                          <br /> 그래서 참여 부탁드립니다.
                          <br /> 가. 지정원칙 : 블라블라 나. 블라블라
                          <br />ㅍ ㅍ 국립농산물품질관리원에서 농수산물품질관리법에 근거하여 GAP
                          인증 농가의
                          <br />
                          인증기준 실천 역량 강화와 GAP 농산물의 위생 관리 및 품질 향상 도모를 위해
                          <br />
                          어쩌구 저쩌구
                          <br /> 그래서 참여 부탁드립니다.
                          <br /> 가. 지정원칙 : 블라블라 나. 블라블라
                          <br />ㅍ ㅍ 국립농산물품질관리원에서 농수산물품질관리법에 근거하여 GAP
                          인증 농가의
                          <br />
                          인증기준 실천 역량 강화와 GAP 농산물의 위생 관리 및 품질 향상 도모를 위해
                          <br />
                          어쩌구 저쩌구
                          <br /> 그래서 참여 부탁드립니다.
                          <br /> 가. 지정원칙 : 블라블라 나. 블라블라
                          <br />ㅍ ㅍ 국립농산물품질관리원에서 농수산물품질관리법에 근거하여 GAP
                          인증 농가의
                          <br />
                          인증기준 실천 역량 강화와 GAP 농산물의 위생 관리 및 품질 향상 도모를 위해
                          <br />
                          어쩌구 저쩌구
                          <br /> 그래서 참여 부탁드립니다.
                          <br /> 가. 지정원칙 : 블라블라 나. 블라블라
                          <br />ㅍ ㅍ
                        </p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="schedule-card">
                <h4>2025년 GAP 단체인증 내부심사제 운영 알림</h4>
                <table>
                  <tbody>
                    <tr>
                      <th>작성자</th>
                      <td>[농업정책과] 홍반석 (052-204-1522)</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>2024-03-14 00:00:00</td>
                    </tr>
                    <tr>
                      <th>장소</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>주관</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>기간</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>내용</th>
                      <td>
                        <p className="scroll-box">내용</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
            <li>
              <div className="schedule-card">
                <h4>2025년 GAP 단체인증 내부심사제 운영 알림</h4>
                <table>
                  <tbody>
                    <tr>
                      <th>작성자</th>
                      <td>[농업정책과] 홍반석 (052-204-1522)</td>
                    </tr>
                    <tr>
                      <th>등록일</th>
                      <td>2024-03-14 00:00:00</td>
                    </tr>
                    <tr>
                      <th>장소</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>주관</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>기간</th>
                      <td>-</td>
                    </tr>
                    <tr>
                      <th>내용</th>
                      <td>
                        <p className="scroll-box">내용</p>-
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SchedulePopup;

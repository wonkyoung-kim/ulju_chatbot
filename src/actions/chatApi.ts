// endpoint back-end server url

// pageKind(citizen/official) 필요여부에 따라 호출 시 파라미터 생략가능
export const ULJUSAFE_API_URL = (pageKind?: string) => ({
  ...(pageKind && {
                    SUGGESTION: `/suggestion/${pageKind}`,  /* 제안질의 */
                    INIT: `/suggestion/${pageKind}`,        /* 초기 메시지 호출(제안질의와 같음) */
                  }),
  ASK: '/query/regident', /* 입력질의 */
  NOTI: '/getNotice',     /* 공지사항 */
  TOKTOK: '/toktok',      /* 톡톡모드 */
  CHECK_AID_REGIDENT: '/designatedAidRegident', /* 지정 구호소 확인 */
  EDU_LIST: '/getEdu/regident',   /* 교육모드 리스트 */
  SCHEDULE_LIST: '/getSchedule',  /* 주요일정 리스트 */
  FILE_LINK: '/getFileLink',      /* 요약본 다운로드 */
  REPORT_FILE_LINK: '/getSDFile', /* 사회재난 피해신고서 다운로드 */
});

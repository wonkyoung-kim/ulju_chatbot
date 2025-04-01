


/* ############################################################ */
/* ### [res] ################################################## */
/* ############################################################ */
export interface NoticeRes {
  success: boolean;
  code: number;
  msg: string;
  list: NoticeData[];
}

export interface NoticeData {
  id: string;
  content: string;
  sort: string;
  registDt: string;
  type: string;
  insertDt: string;
}

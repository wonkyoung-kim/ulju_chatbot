
//'U': 유투브, 'I': 이미지, 'C': 챗봇, 'F': 파일
export type EduType = 'U' | 'I' | 'C' | 'F';

/* ############################################################ */
/* ### [res] ################################################## */
/* ############################################################ */
export interface EducationRes {
  success: boolean;
  code: number;
  msg: string;
  list: EducationData[];
}

export interface EducationData {
  id: string;
  name: string;
  url: string;
  type: EduType;
  listUrl: string[];
}

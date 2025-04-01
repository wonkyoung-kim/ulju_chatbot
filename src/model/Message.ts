
export type MessageType = 'text' | 'button' | 'image' | 'card';

/* ############################################################ */
/* ### [res] ################################################## */
/* ############################################################ */
export interface ChatRes {
  code: number;
  msg: string;
  success: boolean;
  data: {
    result: resultResponses;
  }
}
export interface resultResponses {
  simpleResponses: simpleResponses;
  basicCard: basicCard[];
  suggestions: {
    suggestions: suggestions[];
  };
  param: string;
}
export interface simpleResponses {
  simpleResponses: textToSpeech[];
}
export interface textToSpeech {
  textToSpeech: string;
}
export interface basicCard {
  title: string;
  subtitle: string;
  formattedText: string;
  image: image;
  buttons: button[];
}
export interface image {
  imageUrl: string;
  altText: string;
}
export interface button {
  openUriAction: openUriAction;
  title: string;
}
export interface openUriAction {
  uri: string;
  type: string;
}
export interface suggestions {
  title: string;
}

/* ############################################################ */
/* ### [req] ################################################## */
/* ############################################################ */
export interface ChatReq {
  text: string | null;
  sessionId: string | null;
  lat: number | null;
  lon: number | null;
  param: string | null;
}



export interface ChatStateProps {
  error: object | string | null;
}



export interface ChatMessage {
  id: string;
  type: MessageType;
  content?: string;
  title?: string;
  buttons?: string[];
  sender: 'user' | 'bot';
  timestamp: string;
}




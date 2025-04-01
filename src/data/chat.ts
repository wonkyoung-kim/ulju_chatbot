import { createSlice } from '@reduxjs/toolkit';

import { ChatReq, ChatRes, ChatStateProps } from 'model/Message';
import { ULJUSAFE_API_URL } from 'actions/chatApi';
import { postMethod, getMethod } from 'utils/fetch';
import { dispatch } from 'store';
// ----------------------------------------------------------------------

const initialState: ChatStateProps = {
  error: null,
};

const slice = createSlice({
  name: 'chatslice',
  initialState,
  reducers: {
    // HAS ERROR
    hasError(state, action) {
      state.error = action.payload;
    },
  },
});

export default slice.reducer;

// ----------------------------------------------------------------------


/* 페이지 진입시 초기 챗봇 메시지 */
export function getInitMessage(chat: ChatReq, pageKind: string | undefined) {
  return async () => {
    try {
      const response: ChatRes | null = await getMethod(ULJUSAFE_API_URL(pageKind).INIT || ''
            , {
                text: chat.text,
                sessionId: null,
                param: null
            });
      console.log('### initMessage.response : ', response);
      return response == null ? null : response; // 응답 값을 반환합니다.
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      if (process.env.NODE_ENV !== 'production') {
        console.error('error : ', error);
      }
    }
  };
}

/* 챗봇 메시지 질의 */
export function getAnswerMessage(chat: ChatReq, pageKind: string | undefined) {
  return async () => {
    try {
      const response: ChatRes | null = await getMethod(ULJUSAFE_API_URL(pageKind).ASK || ''
          , {
              text: chat.text,
              sessionId: chat.sessionId,
              lat: chat.lat,
              lon: chat.lon,
              param: chat.param
            });
      console.log('### getAnswerMessage.response : ', response);
      return response == null ? null : response; // 응답 값을 반환합니다.
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      if (process.env.NODE_ENV !== 'production') {
        console.error('error : ', error);
      }
    }
  };
}

/* 챗봇 메시지 제안 */
export function getSuggestionMessage(chat: ChatReq, pageKind: string | undefined) {
  return async () => {
    try {
      const response: ChatRes | null = await getMethod(ULJUSAFE_API_URL(pageKind).SUGGESTION || ''
          , {
              text: chat.text,
              sessionId: chat.sessionId,
              lat: chat.lat,
              lon: chat.lon,
              param: chat.param
            });
      console.log('### getSuggestionMessage.response : ', response);
      return response == null ? null : response; // 응답 값을 반환합니다.
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      if (process.env.NODE_ENV !== 'production') {
        console.error('error : ', error);
      }
    }
  };
}

// export function getChatList(user_id: string | undefined) {
//   return async () => {
//     try {
//       const response: AxChatRes | null = await getMethod(AXHUB_CONVERSATION_API_URL.LIST, {
//         user_id: user_id,
//       });

//       if (response) {
//         return response == null ? null : response; // 응답 값을 반환합니다.
//       } else {
//         return response == null;
//       }
//     } catch (error) {
//       // dispatch(slice.actions.hasError(error));
//       if (process.env.NODE_ENV !== 'production') {
//         console.error('error : ', error);
//       }
//     }
//   };
// }


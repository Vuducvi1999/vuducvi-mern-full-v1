import { GET_ERRORS, CLEAR_ERRORS } from "./actionTypes";

/**
 * gửi lỗi khi có sự cố
 */
export const getError = (msg, status, id) => {
  return {
    type: GET_ERRORS,
    payload: {
      msg,
      status,
      id,
    },
  };
};

export const clearError = () => {
  return { type: CLEAR_ERRORS };
};
